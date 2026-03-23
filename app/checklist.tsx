import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ChecklistSection = {
  title: string;
  items: string[];
  context?: string;
};

const checklist: ChecklistSection[] = [
  {
    title: "Essential supplies",
    context: "Prepare before emergencies",
    items: [
      "Water (at least 3 days supply)",
      "Non-perishable food",
      "Torchlight and spare batteries",
      "Portable power bank",
      "Basic first aid kit",
      "Masks and hand sanitiser",
    ],
  },
  {
    title: "Important documents",
    context: "Keep copies accessible",
    items: [
      "Copy of NRIC / passport",
      "Emergency cash",
      "Medical prescriptions",
      "Insurance details",
      "Key contact numbers written down",
    ],
  },
  {
    title: "Home preparation",
    context: "Reduce household risk",
    items: [
      "Know where the electrical mains and gas valves are",
      "Secure heavy objects that may fall",
      "Identify safe exits and meeting points",
      "Keep a small emergency bag near the door",
    ],
  },
];

export default function ChecklistScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Text style={styles.title}>Preparedness Checklist</Text>
          <View style={styles.badgeOffline}>
            <Text style={styles.badgeText}>Offline</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>
          This is a read-only checklist for reference. It is intended to support planning and preparation before a disaster
          occurs.
        </Text>

        {checklist.map((section, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardHeader}>{section.title}</Text>
              {section.context ? (
                <View style={styles.contextPill}>
                  <Text style={styles.contextPillText}>{section.context}</Text>
                </View>
              ) : null}
            </View>

            {section.items.map((item, idx) => (
              <View key={idx} style={styles.row}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.text}>{item}</Text>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.noteBox}>
          <Text style={styles.noteTitle}>Practical tip</Text>
          <Text style={styles.noteText}>
            Preparing early reduces decision pressure during emergencies. Keep supplies together and review this list from
            time to time, especially before travel or severe weather periods.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#0B1220" },
  container: { flex: 1, backgroundColor: "#0B1220" },
  content: { padding: 18, paddingBottom: 28 },

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

  title: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", marginBottom: 0, flex: 1 },
  subtitle: { color: "rgba(255,255,255,0.75)", marginBottom: 10, lineHeight: 20 },

  card: {
    backgroundColor: "#111A2E",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },

  cardHeader: {
    color: "#FFFFFF",
    fontWeight: "900",
    textTransform: "capitalize",
    flex: 1,
  },

  contextPill: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  contextPillText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 11,
    fontWeight: "800",
  },

  row: { flexDirection: "row", alignItems: "flex-start", marginBottom: 8 },
  bullet: { color: "#7CFFB2", fontWeight: "900", width: 18, marginTop: 1 },
  text: { color: "rgba(255,255,255,0.88)", flex: 1, lineHeight: 20 },

  noteBox: {
    marginTop: 6,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  noteTitle: { color: "#FFFFFF", fontWeight: "900", marginBottom: 6 },
  noteText: { color: "rgba(255,255,255,0.75)", lineHeight: 20 },
});