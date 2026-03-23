import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker, type MapMarker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  HAZARD_COLORS,
  INITIAL_REGION,
  MAP_EDGE_PADDING,
} from "@/constants/mapConfig";
import { SAFE_ZONES, type SafeZone } from "@/constants/safeZones";
import {
  formatDistance,
  haversineDistanceKm,
} from "@/utils/distance";

type SafeZoneWithDistance = SafeZone & {
  distanceKm: number | null;
};

export default function MapScreen() {
  const mapRef = useRef<MapView | null>(null);
  const markerRefs = useRef<Record<string, MapMarker | null>>({});

  const [selectedZone, setSelectedZone] = useState<SafeZoneWithDistance | null>(
    null
  );
  const [userRegion, setUserRegion] = useState<Region | null>(null);
  const [hasLocationPermission, setHasLocationPermission] = useState<
    boolean | null
  >(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [showAllNearest, setShowAllNearest] = useState(false);

  useEffect(() => {
    void loadLocation();
  }, []);

  const loadLocation = async () => {
    try {
      setIsLoadingLocation(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      const granted = status === "granted";
      setHasLocationPermission(granted);

      if (!granted) {
        setIsLoadingLocation(false);
        return;
      }

      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const nextRegion: Region = {
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      };

      setUserRegion(nextRegion);
      setIsLoadingLocation(false);

      mapRef.current?.animateToRegion(nextRegion, 800);
    } catch (error) {
      console.warn("Failed to get location:", error);
      setIsLoadingLocation(false);
      setHasLocationPermission(false);
    }
  };

  const zonesWithDistance = useMemo<SafeZoneWithDistance[]>(() => {
    return SAFE_ZONES.map((zone) => {
      if (!userRegion) {
        return {
          ...zone,
          distanceKm: null,
        };
      }

      const distanceKm = haversineDistanceKm(
        userRegion.latitude,
        userRegion.longitude,
        zone.latitude,
        zone.longitude
      );

      return {
        ...zone,
        distanceKm,
      };
    }).sort((a, b) => {
      if (a.distanceKm === null && b.distanceKm === null) return 0;
      if (a.distanceKm === null) return 1;
      if (b.distanceKm === null) return -1;
      return a.distanceKm - b.distanceKm;
    });
  }, [userRegion]);

  const visibleNearestZones = useMemo(() => {
    return showAllNearest ? zonesWithDistance : zonesWithDistance.slice(0, 3);
  }, [showAllNearest, zonesWithDistance]);

  const focusOnUser = () => {
    if (!userRegion) return;
    mapRef.current?.animateToRegion(userRegion, 800);
  };

  const fitVisibleZones = () => {
    if (zonesWithDistance.length === 0) return;

    if (zonesWithDistance.length === 1) {
      const zone = zonesWithDistance[0];
      mapRef.current?.animateToRegion(
        {
          latitude: zone.latitude,
          longitude: zone.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        800
      );
      return;
    }

    mapRef.current?.fitToCoordinates(
      zonesWithDistance.map((zone) => ({
        latitude: zone.latitude,
        longitude: zone.longitude,
      })),
      {
        edgePadding: MAP_EDGE_PADDING,
        animated: true,
      }
    );
  };

  const focusOnZone = (zone: SafeZoneWithDistance) => {
    setSelectedZone(zone);

    mapRef.current?.animateToRegion(
      {
        latitude: zone.latitude,
        longitude: zone.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      },
      800
    );

    setTimeout(() => {
      markerRefs.current[zone.id]?.showCallout();
    }, 900);
  };

  const getMarkerColor = (zone: SafeZone) => {
    if (zone.hazards.includes("flood")) return HAZARD_COLORS.flood;
    if (zone.hazards.includes("fire")) return HAZARD_COLORS.fire;
    return HAZARD_COLORS.earthquake;
  };

  const formatCategory = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatHazard = (hazard: string) => {
    return hazard.charAt(0).toUpperCase() + hazard.slice(1);
  };

  const getHazardBadgeStyle = (hazard: string) => {
    if (hazard === "flood") return styles.hazardFlood;
    if (hazard === "fire") return styles.hazardFire;
    return styles.hazardEarthquake;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right", "bottom"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topCard}>
          <Text style={styles.title}>Offline Map</Text>
          <Text style={styles.subtitle}>
            View nearby safe zones and location details using on-device distance
            calculation.
          </Text>
        </View>

        <View style={styles.mapCard}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={INITIAL_REGION}
            showsUserLocation={hasLocationPermission === true}
            showsMyLocationButton={false}
            showsCompass
          >
            {zonesWithDistance.map((zone) => (
              <Marker
                key={zone.id}
                ref={(ref) => {
                  markerRefs.current[zone.id] = ref;
                }}
                coordinate={{
                  latitude: zone.latitude,
                  longitude: zone.longitude,
                }}
                pinColor={getMarkerColor(zone)}
                title={zone.name}
                description={
                  zone.distanceKm !== null
                    ? `${zone.address} • ${formatDistance(zone.distanceKm)} away`
                    : zone.address
                }
                onPress={() => setSelectedZone(zone)}
              />
            ))}
          </MapView>

          <View style={styles.mapActions}>
            <Pressable style={styles.mapButton} onPress={fitVisibleZones}>
              <Text style={styles.mapButtonText}>Fit zones</Text>
            </Pressable>

            <Pressable
              style={[
                styles.mapButton,
                !userRegion && styles.mapButtonDisabled,
              ]}
              onPress={focusOnUser}
              disabled={!userRegion}
            >
              <Text style={styles.mapButtonText}>My location</Text>
            </Pressable>
          </View>

          {isLoadingLocation && (
            <View style={styles.loadingBadge}>
              <ActivityIndicator size="small" color="#FFFFFF" />
              <Text style={styles.loadingText}>Getting location...</Text>
            </View>
          )}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Nearby safe zones</Text>
          <Text style={styles.infoCount}>
            {zonesWithDistance.length} location
            {zonesWithDistance.length === 1 ? "" : "s"}
          </Text>

          {userRegion && zonesWithDistance.length > 0 && (
            <View style={styles.nearbyBox}>
              <View style={styles.nearbyHeader}>
                <Text style={styles.nearbyTitle}>Nearest locations</Text>

                {zonesWithDistance.length > 3 && (
                  <Pressable
                    onPress={() => setShowAllNearest((prev) => !prev)}
                    style={styles.expandButton}
                  >
                    <Text style={styles.expandButtonText}>
                      {showAllNearest ? "Show less ▲" : "Show all ▼"}
                    </Text>
                  </Pressable>
                )}
              </View>

              {visibleNearestZones.map((zone, index) => {
                const isSelected = selectedZone?.id === zone.id;

                return (
                  <View
                    key={zone.id}
                    style={[
                      styles.nearbyItem,
                      isSelected && styles.nearbyItemSelected,
                    ]}
                  >
                    <Text style={styles.nearbyRank}>{index + 1}.</Text>
                    <View style={styles.nearbyTextWrap}>
                      <Text style={styles.nearbyName}>{zone.name}</Text>
                      <Text style={styles.nearbyMeta}>
                        {zone.distanceKm !== null
                          ? formatDistance(zone.distanceKm)
                          : "Distance unavailable"}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => focusOnZone(zone)}
                      style={[
                        styles.nearbyButton,
                        isSelected && styles.nearbyButtonSelected,
                      ]}
                    >
                      <Text style={styles.nearbyButtonText}>View</Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          )}

          {selectedZone ? (
            <View style={styles.detailCard}>
              <Text style={styles.zoneName}>{selectedZone.name}</Text>
              {selectedZone.distanceKm !== null && (
                <Text style={styles.zoneDistance}>
                  {formatDistance(selectedZone.distanceKm)} away
                </Text>
              )}
              <Text style={styles.zoneMeta}>{selectedZone.address}</Text>
              <Text style={styles.zoneMeta}>
                {formatCategory(selectedZone.category)}
              </Text>
              <Text style={styles.zoneDescription}>
                {selectedZone.description}
              </Text>

              <View style={styles.hazardSection}>
                <Text style={styles.hazardSectionTitle}>Hazards</Text>
                <View style={styles.hazardRow}>
                  {selectedZone.hazards.map((hazard) => (
                    <View
                      key={hazard}
                      style={[styles.hazardBadge, getHazardBadgeStyle(hazard)]}
                    >
                      <Text style={styles.hazardBadgeText}>
                        {formatHazard(hazard)}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ) : (
            <Text style={styles.helperText}>
              Tap a marker or a nearby location to view more information.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B1220",
  },
  container: {
    flex: 1,
    backgroundColor: "#0B1220",
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 20,
  },

  topCard: {
    backgroundColor: "#111A2E",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 12,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },
  subtitle: {
    color: "rgba(255,255,255,0.75)",
    marginTop: 6,
    lineHeight: 20,
  },

  mapCard: {
    height: 420,
    backgroundColor: "#111A2E",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 12,
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
  },

  mapActions: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  mapButton: {
    backgroundColor: "rgba(11,18,32,0.92)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  mapButtonDisabled: {
    opacity: 0.55,
  },
  mapButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 12,
  },

  loadingBadge: {
    position: "absolute",
    left: 12,
    top: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(11,18,32,0.92)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  loadingText: {
    color: "#FFFFFF",
    marginLeft: 8,
    fontSize: 12,
    fontWeight: "700",
  },

  infoCard: {
    backgroundColor: "#111A2E",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  infoTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
  infoCount: {
    color: "rgba(255,255,255,0.7)",
    marginTop: 4,
    marginBottom: 12,
  },

  nearbyBox: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 12,
  },
  nearbyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    gap: 12,
  },
  nearbyTitle: {
    color: "#FFFFFF",
    fontWeight: "900",
    flex: 1,
  },
  expandButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#132143",
  },
  expandButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },

  nearbyItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 12,
  },
  nearbyItemSelected: {
    backgroundColor: "rgba(19,33,67,0.9)",
    borderWidth: 1,
    borderColor: "rgba(124,255,178,0.25)",
  },
  nearbyRank: {
    color: "#FFFFFF",
    fontWeight: "900",
    width: 22,
  },
  nearbyTextWrap: {
    flex: 1,
  },
  nearbyName: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  nearbyMeta: {
    color: "rgba(255,255,255,0.72)",
    marginTop: 2,
    fontSize: 12,
  },
  nearbyButton: {
    backgroundColor: "#132143",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  nearbyButtonSelected: {
    backgroundColor: "#1B3A73",
  },
  nearbyButtonText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 12,
  },

  detailCard: {
    backgroundColor: "#132143",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  zoneName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
  zoneDistance: {
    color: "rgba(124,255,178,0.9)",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 4,
    marginBottom: 8,
  },
  zoneMeta: {
    color: "rgba(255,255,255,0.76)",
    marginBottom: 4,
    lineHeight: 18,
  },
  zoneDescription: {
    color: "rgba(255,255,255,0.84)",
    marginTop: 8,
    lineHeight: 20,
  },

  hazardSection: {
    marginTop: 12,
  },
  hazardSectionTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 8,
  },
  hazardRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  hazardBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  hazardFlood: {
    backgroundColor: "rgba(59,130,246,0.16)",
    borderColor: "rgba(59,130,246,0.35)",
  },
  hazardFire: {
    backgroundColor: "rgba(249,115,22,0.16)",
    borderColor: "rgba(249,115,22,0.35)",
  },
  hazardEarthquake: {
    backgroundColor: "rgba(234,179,8,0.16)",
    borderColor: "rgba(234,179,8,0.35)",
  },
  hazardBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },

  helperText: {
    color: "rgba(255,255,255,0.76)",
    lineHeight: 20,
  },
});