import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Availability = "Offline" | "Online";

type ActionCardProps = {
  title: string;
  subtitle: string;
  availability: Availability;
  variant?: "primary" | "secondary";
  onPress: () => void;
};

const ONBOARDING_KEY = "preparedsg_seen_home_onboarding";

function ActionCard({
  title,
  subtitle,
  availability,
  variant = "secondary",
  onPress,
}: ActionCardProps) {
  const isPrimary = variant === "primary";
  const isOffline = availability === "Offline";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.cardBase,
        isPrimary ? styles.cardPrimary : styles.cardSecondary,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.cardHeaderRow}>
        <Text style={[styles.cardTitle, isPrimary && styles.cardTitlePrimary]}>
          {title}
        </Text>

        <View
          style={[
            styles.badge,
            isOffline ? styles.badgeOffline : styles.badgeOnline,
          ]}
        >
          <Text style={styles.badgeText}>{availability}</Text>
        </View>
      </View>

      <Text
        style={[
          styles.cardSubtitle,
          isPrimary && styles.cardSubtitlePrimary,
        ]}
      >
        {subtitle}
      </Text>

      <View style={styles.cardFooterRow}>
        <Text style={[styles.ctaText, isPrimary && styles.ctaTextPrimary]}>
          Open
        </Text>
        <Text style={[styles.ctaArrow, isPrimary && styles.ctaTextPrimary]}>
          ›
        </Text>
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const hasSeen = await AsyncStorage.getItem(ONBOARDING_KEY);
        if (!hasSeen) {
          setShowOnboarding(true);
        }
      } catch (error) {
        console.warn("Failed to load onboarding state:", error);
      }
    };

    checkOnboarding();
  }, []);

  const handleDismissOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, "true");
    } catch (error) {
      console.warn("Failed to save onboarding state:", error);
    }
    setShowOnboarding(false);
  };

  return (
    <>
      <Modal
        visible={showOnboarding}
        transparent
        animationType="fade"
        onRequestClose={handleDismissOnboarding}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Welcome to PreparedSG</Text>
            <Text style={styles.modalText}>
              Emergency Guidance, Offline Map, Checklist, and Contacts work offline.
            </Text>
            <Text style={styles.modalText}>
              Alerts & Advisories require internet access.
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.modalButton,
                pressed && styles.modalButtonPressed,
              ]}
              onPress={handleDismissOnboarding}
            >
              <Text style={styles.modalButtonText}>Got it</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.appName}>PreparedSG</Text>
            <Text style={styles.headline}>
              Disaster preparedness and response guidance
            </Text>
            <Text style={styles.description}>
              Designed to provide fast access to critical guidance even when
              connectivity is limited.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Features</Text>

          <ActionCard
            title="Emergency Guidance"
            subtitle="Step-by-step actions for floods, earthquakes, and fires."
            availability="Offline"
            variant="primary"
            onPress={() => router.push("/disasters")}
          />

          <ActionCard
            title="Preparedness Checklist"
            subtitle="Read-only reference checklist for planning and preparation."
            availability="Offline"
            onPress={() => router.push("/checklist")}
          />

          <ActionCard
            title="Emergency Contacts"
            subtitle="Quick access to key numbers and trusted contacts."
            availability="Offline"
            onPress={() => router.push("/contacts")}
          />

          <ActionCard
            title="Offline Map"
            subtitle="View nearby safe zones and location details offline."
            availability="Offline"
            onPress={() => router.push("/map")}
          />

          <ActionCard
            title="Alerts & Advisories"
            subtitle="Authoritative external emergency information sources."
            availability="Online"
            onPress={() => router.push("/alerts")}
          />
        </ScrollView>
      </SafeAreaView>
    </>
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
    paddingBottom: 28,
  },

  header: {
    marginBottom: 14,
  },
  appName: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  headline: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    marginTop: 4,
    marginBottom: 10,
  },
  description: {
    color: "rgba(255,255,255,0.7)",
    lineHeight: 20,
  },

  sectionTitle: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: "900",
    marginBottom: 10,
  },

  cardBase: {
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    marginBottom: 12,
  },
  cardPrimary: { backgroundColor: "#132143" },
  cardSecondary: { backgroundColor: "#111A2E" },
  cardPressed: { opacity: 0.92, transform: [{ scale: 0.99 }] },

  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 8,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    flex: 1,
  },
  cardTitlePrimary: { fontSize: 18 },

  cardSubtitle: {
    color: "rgba(255,255,255,0.75)",
    lineHeight: 20,
  },
  cardSubtitlePrimary: { color: "rgba(255,255,255,0.8)" },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeOffline: {
    backgroundColor: "rgba(124,255,178,0.12)",
    borderColor: "rgba(124,255,178,0.35)",
  },
  badgeOnline: {
    backgroundColor: "rgba(37,99,235,0.12)",
    borderColor: "rgba(37,99,235,0.35)",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },

  cardFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 14,
    gap: 8,
  },
  ctaText: {
    color: "rgba(255,255,255,0.85)",
    fontWeight: "800",
  },
  ctaArrow: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 20,
    fontWeight: "900",
    marginTop: -1,
  },
  ctaTextPrimary: { color: "#FFFFFF" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#111A2E",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 12,
  },
  modalText: {
    color: "rgba(255,255,255,0.8)",
    lineHeight: 22,
    marginBottom: 8,
  },
  modalButton: {
    marginTop: 14,
    backgroundColor: "#132143",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  modalButtonPressed: {
    opacity: 0.9,
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 15,
  },
});