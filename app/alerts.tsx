import React from "react";
import { StyleSheet, Pressable, Alert, View, ScrollView } from "react-native";
import * as Linking from "expo-linking";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ALERT_SOURCES } from "@/constants/alertSources";

function openUrl(url: string) {
  Linking.openURL(url).catch(() => {
    Alert.alert("Unable to open link", "Please check your internet connection and try again.");
  });
}

export default function AlertsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.container}>
          <ThemedText type="title">Alerts & Advisories (Online)</ThemedText>

          <ThemedView style={styles.notice}>
            <ThemedText style={styles.noticeTitle}>Requires internet</ThemedText>
            <ThemedText style={styles.noticeText}>
              These are authoritative sources. Tap &quot;Open in browser&quot; to view them.
            </ThemedText>
          </ThemedView>

          <View style={styles.list}>
            {ALERT_SOURCES.map((s) => (
              <ThemedView key={s.id} style={styles.card}>
                <ThemedText style={styles.cardTitle}>{s.title}</ThemedText>
                <ThemedText style={styles.cardDesc}>{s.description}</ThemedText>

                <ThemedText style={styles.meta}>
                  {s.category} • {s.region}
                </ThemedText>

                <Pressable style={styles.button} onPress={() => openUrl(s.url)}>
                  <ThemedText style={styles.buttonText}>Open in browser</ThemedText>
                </Pressable>
              </ThemedView>
            ))}
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },

  content: { padding: 16, paddingBottom: 28 },
  container: { flex: 1, gap: 12 },

  notice: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(150,150,150,0.25)",
    gap: 4,
  },
  noticeTitle: { fontWeight: "700" },
  noticeText: { opacity: 0.9 },

  list: { gap: 12 },

  card: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(150,150,150,0.25)",
    gap: 6,
  },
  cardTitle: { fontSize: 16, fontWeight: "700" },
  cardDesc: { opacity: 0.9 },
  meta: { fontSize: 12, opacity: 0.7 },

  button: {
    marginTop: 6,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(150,150,150,0.35)",
  },
  buttonText: { fontWeight: "700" },
});