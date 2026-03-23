import { emergencyGuidance } from "@/constants/emergencyGuidance";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GuidanceScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type?: string }>();

  const guidance = type && emergencyGuidance[type as keyof typeof emergencyGuidance];

  if (!type || !guidance) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
        <View style={styles.container}>
          <Text style={styles.title}>Guidance not found</Text>
          <Text style={styles.body}>
            No guidance is available for this selection. Please return and choose a disaster type.
          </Text>

          <Pressable style={styles.secondaryBtn} onPress={() => router.back()}>
            <Text style={styles.secondaryBtnText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const callEmergency = () => {
    Linking.openURL("tel:995").catch(() => {});
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Text style={styles.title}>{guidance.title} Guidance</Text>
          <View style={styles.badgeOffline}>
            <Text style={styles.badgeText}>Offline</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>
          Use this as a quick reference. Prioritise personal safety and follow official instructions when available.
        </Text>

        <View style={styles.quickBox}>
          <Text style={styles.sectionTitle}>Quick actions</Text>

          {guidance.quickActions.map((action, index) => (
            <View key={index} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{action}</Text>
            </View>
          ))}

          <View style={styles.quickActionsRow}>
            <Pressable style={styles.callBtn} onPress={callEmergency}>
              <Text style={styles.callBtnText}>Call 995</Text>
              <Text style={styles.callBtnSub}>Emergency Services</Text>
            </Pressable>

            <Pressable style={styles.altBtn} onPress={() => router.push("/contacts")}>
              <Text style={styles.altBtnText}>Contacts</Text>
              <Text style={styles.altBtnSub}>Trusted people</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.sectionHeader}>Step by step</Text>

        {guidance.steps.map((section, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardHeader}>{section.label}</Text>

            {section.items.map((item, idx) => (
              <View key={idx} style={styles.stepRow}>
                <Text style={styles.stepNumber}>{idx + 1}.</Text>
                <Text style={styles.stepText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.card}>
          <Text style={styles.cardHeader}>Aftercare</Text>

          {guidance.aftercare.map((item, idx) => (
            <View key={idx} style={styles.stepRow}>
              <Text style={styles.stepNumber}>•</Text>
              <Text style={styles.stepText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.noteBox}>
          <Text style={styles.noteTitle}>Reminder</Text>
          <Text style={styles.noteText}>
            If you are in immediate danger, leave the area first. Guidance is helpful, but safety comes before using the
            phone.
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

  title: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", marginTop: 6, flex: 1 },
  subtitle: { color: "rgba(255,255,255,0.75)", marginBottom: 14, lineHeight: 20 },

  sectionHeader: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: "900",
    marginBottom: 10,
    marginTop: 2,
  },

  quickBox: {
    backgroundColor: "#111A2E",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 14,
  },
  sectionTitle: { color: "#FFFFFF", fontWeight: "900", marginBottom: 10 },

  bulletRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 8 },
  bullet: { color: "#7CFFB2", fontWeight: "900", width: 18, marginTop: 1 },
  bulletText: { color: "rgba(255,255,255,0.88)", flex: 1, lineHeight: 20 },

  quickActionsRow: { flexDirection: "row", gap: 10, marginTop: 12 },

  callBtn: {
    flex: 1,
    backgroundColor: "#2563EB",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  callBtnText: { color: "#FFFFFF", fontWeight: "900", fontSize: 16 },
  callBtnSub: { color: "rgba(255,255,255,0.85)", marginTop: 2, fontSize: 12 },

  altBtn: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  altBtnText: { color: "#FFFFFF", fontWeight: "900", fontSize: 16 },
  altBtnSub: { color: "rgba(255,255,255,0.75)", marginTop: 2, fontSize: 12 },

  card: {
    backgroundColor: "#111A2E",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  cardHeader: { color: "#FFFFFF", fontWeight: "900", marginBottom: 10 },

  stepRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 8 },
  stepNumber: { color: "#7CFFB2", fontWeight: "900", width: 22 },
  stepText: { color: "rgba(255,255,255,0.88)", flex: 1, lineHeight: 20 },

  noteBox: {
    marginTop: 6,
    backgroundColor: "rgba(124,255,178,0.08)",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(124,255,178,0.18)",
  },
  noteTitle: { color: "#FFFFFF", fontWeight: "900", marginBottom: 6 },
  noteText: { color: "rgba(255,255,255,0.78)", lineHeight: 20 },

  secondaryBtn: {
    marginTop: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  secondaryBtnText: { color: "#FFFFFF", fontWeight: "800" },
  body: { color: "rgba(255,255,255,0.75)", marginTop: 6, lineHeight: 20 },
});