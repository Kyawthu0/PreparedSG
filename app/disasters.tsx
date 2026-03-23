import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Card = {
  key: "flood" | "earthquake" | "fire";
  title: string;
  subtitle: string;
  image: any;
  severity: "High" | "Medium";
  availability: "Offline" | "Online";
};

const cards: Card[] = [
  {
    key: "flood",
    title: "Flood",
    subtitle: "Move to higher ground and avoid floodwater",
    image: require("../assets/disasters/flood.png"),
    severity: "High",
    availability: "Offline",
  },
  {
    key: "earthquake",
    title: "Earthquake",
    subtitle: "Drop, Cover, Hold On and prepare for aftershocks",
    image: require("../assets/disasters/earthquake.png"),
    severity: "High",
    availability: "Offline",
  },
  {
    key: "fire",
    title: "Fire",
    subtitle: "Evacuate early and follow fire safety guidance",
    image: require("../assets/disasters/fire.png"),
    severity: "High",
    availability: "Offline",
  },
];

export default function DisastersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Text style={styles.header}>Emergency Guidance</Text>
          <View style={styles.badgeOffline}>
            <Text style={styles.badgeText}>Offline</Text>
          </View>
        </View>

        <Text style={styles.subheader}>
          Select a scenario to view quick actions and step-by-step instructions.
        </Text>

        <View style={styles.grid}>
          {cards.map((c) => (
            <Pressable
              key={c.key}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
              onPress={() =>
                router.push({ pathname: "/guidance", params: { type: c.key } })
              }
            >
              <Image source={c.image} style={styles.cardImage} resizeMode="cover" />

              <View style={styles.cardBody}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.cardTitle}>{c.title}</Text>

                  <View style={styles.chipRow}>
                    <View style={[styles.chip, styles.chipSeverity]}>
                      <Text style={styles.chipText}>Severity: {c.severity}</Text>
                    </View>

                    <View style={[styles.chip, styles.chipOffline]}>
                      <Text style={styles.chipText}>{c.availability}</Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.cardSubtitle}>{c.subtitle}</Text>

                <View style={styles.pillRow}>
                  <Text style={styles.pill}>Quick actions</Text>
                  <Text style={styles.pill}>Step-by-step</Text>
                </View>

                <View style={styles.openRow}>
                  <Text style={styles.openText}>Open</Text>
                  <Text style={styles.openArrow}>›</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#0B1220" },
  container: { flex: 1, backgroundColor: "#0B1220" },
  content: { padding: 18, paddingBottom: 40 },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 6,
  },

  badgeOffline: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: "rgba(124,255,178,0.12)",
    borderColor: "rgba(124,255,178,0.35)",
  },
  badgeText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },

  header: { color: "#fff", fontSize: 22, fontWeight: "900", flex: 1 },
  subheader: { color: "rgba(255,255,255,0.7)", marginBottom: 14, lineHeight: 20 },

  grid: { gap: 12 },

  card: {
    backgroundColor: "#111A2E",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  cardPressed: { opacity: 0.92, transform: [{ scale: 0.99 }] },

  cardImage: { width: "100%", height: 150 },

  cardBody: { padding: 14 },

  cardTitleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 8,
  },

  cardTitle: { color: "#fff", fontSize: 18, fontWeight: "900", flex: 1 },

  chipRow: { flexDirection: "column", gap: 8, alignItems: "flex-end" },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  chipSeverity: {
    backgroundColor: "rgba(255,80,80,0.12)",
    borderColor: "rgba(255,80,80,0.28)",
  },
  chipOffline: {
    backgroundColor: "rgba(124,255,178,0.12)",
    borderColor: "rgba(124,255,178,0.35)",
  },
  chipText: { color: "#FFFFFF", fontSize: 11, fontWeight: "800" },

  cardSubtitle: { color: "rgba(255,255,255,0.75)", lineHeight: 18, marginBottom: 10 },

  pillRow: { flexDirection: "row", gap: 8, flexWrap: "wrap", marginBottom: 12 },
  pill: {
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    fontSize: 12,
    overflow: "hidden",
    fontWeight: "700",
  },

  openRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },
  openText: { color: "rgba(255,255,255,0.85)", fontWeight: "800" },
  openArrow: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 20,
    fontWeight: "900",
    marginTop: -1,
  },
});