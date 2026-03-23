import { getJSON, setJSON } from "@/constants/storage";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STORAGE_KEY = "emergency_contacts_v1";

type Contact = {
  id: string;
  name: string;
  phone: string;
};

export default function ContactsScreen() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    (async () => {
      const saved = await getJSON<Contact[]>(STORAGE_KEY, []);
      setContacts(saved);
    })();
  }, []);

  useEffect(() => {
    setJSON(STORAGE_KEY, contacts).catch(() => {});
  }, [contacts]);

  const canAdd = useMemo(() => {
    const n = name.trim();
    const p = phone.trim();
    return n.length >= 2 && p.length >= 3;
  }, [name, phone]);

  const add = () => {
    const n = name.trim();
    const p = phone.trim();

    if (!n || !p) return;

    const newContact: Contact = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: n,
      phone: p,
    };

    setContacts((prev) => [newContact, ...prev]);
    setName("");
    setPhone("");
  };

  const remove = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const call = async (number: string) => {
    const url = `tel:${number}`;
    const can = await Linking.canOpenURL(url);
    if (!can) {
      Alert.alert("Cannot place call on this device.");
      return;
    }
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["left", "right"]}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Text style={styles.header}>Emergency Contacts</Text>
          <View style={styles.badgeOffline}>
            <Text style={styles.badgeText}>Offline</Text>
          </View>
        </View>

        <Text style={styles.subheader}>
          Store key contacts on-device so they remain available during connectivity loss.
        </Text>

        <View style={styles.quickStack}>
          <Pressable
            style={({ pressed }) => [styles.quickPrimary, pressed && styles.pressed]}
            onPress={() => call("995")}
          >
            <Text style={styles.quickPrimaryTitle}>Call 995</Text>
            <Text style={styles.quickPrimarySub}>Emergency services (Singapore)</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.quickSecondary, pressed && styles.pressed]}
            onPress={() =>
              Alert.alert(
                "Tip",
                "Add family or trusted contacts so you can reach them quickly during emergencies."
              )
            }
          >
            <Text style={styles.quickSecondaryTitle}>Suggested contacts</Text>
            <Text style={styles.quickSecondarySub}>Family, neighbours, close friends</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Add a contact</Text>

          <Text style={styles.label}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g., Mum"
            placeholderTextColor="rgba(255,255,255,0.45)"
            style={styles.input}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="e.g., 91234567"
            placeholderTextColor="rgba(255,255,255,0.45)"
            style={styles.input}
            keyboardType="phone-pad"
          />

          <Pressable
            onPress={add}
            disabled={!canAdd}
            style={({ pressed }) => [
              styles.addBtn,
              !canAdd && { opacity: 0.5 },
              pressed && canAdd && { opacity: 0.92 },
            ]}
          >
            <Text style={styles.addBtnText}>Add Contact</Text>
          </Pressable>

          <Text style={styles.helperText}>
            Note: Numbers are stored locally on this device for offline access.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Saved contacts</Text>

          {contacts.length === 0 ? (
            <Text style={styles.emptyText}>
              No contacts yet. Add at least one trusted contact for quick access.
            </Text>
          ) : (
            contacts.map((c) => (
              <View key={c.id} style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowName}>{c.name}</Text>
                  <Text style={styles.rowPhone}>{c.phone}</Text>
                </View>

                <Pressable style={styles.rowBtn} onPress={() => call(c.phone)}>
                  <Text style={styles.rowBtnText}>Call</Text>
                </Pressable>

                <Pressable
                  style={[styles.rowBtn, styles.rowBtnDanger]}
                  onPress={() =>
                    Alert.alert("Remove contact?", `Remove ${c.name}?`, [
                      { text: "Cancel", style: "cancel" },
                      { text: "Remove", style: "destructive", onPress: () => remove(c.id) },
                    ])
                  }
                >
                  <Text style={styles.rowBtnText}>Delete</Text>
                </Pressable>
              </View>
            ))
          )}
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

  header: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", flex: 1 },
  subheader: { color: "rgba(255,255,255,0.7)", marginBottom: 14, lineHeight: 20 },

  quickStack: { gap: 12, marginBottom: 14 },

  quickPrimary: {
    backgroundColor: "#132143",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  quickPrimaryTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "900", marginBottom: 4 },
  quickPrimarySub: { color: "rgba(255,255,255,0.75)" },

  quickSecondary: {
    backgroundColor: "#111A2E",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  quickSecondaryTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "900", marginBottom: 4 },
  quickSecondarySub: { color: "rgba(255,255,255,0.65)" },

  pressed: { opacity: 0.92, transform: [{ scale: 0.99 }] },

  card: {
    backgroundColor: "#111A2E",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 14,
  },

  cardTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "900", marginBottom: 10 },

  label: { color: "rgba(255,255,255,0.7)", marginBottom: 6, marginTop: 10 },
  input: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },

  addBtn: {
    marginTop: 14,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  addBtnText: { color: "#FFFFFF", fontWeight: "900" },

  helperText: {
    marginTop: 10,
    color: "rgba(255,255,255,0.60)",
    lineHeight: 18,
    fontSize: 12,
  },

  emptyText: { color: "rgba(255,255,255,0.65)", lineHeight: 18 },

  row: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },
  rowName: { color: "#FFFFFF", fontWeight: "900" },
  rowPhone: { color: "rgba(255,255,255,0.7)" },

  rowBtn: {
    backgroundColor: "rgba(255,255,255,0.10)",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  rowBtnDanger: { backgroundColor: "rgba(255,80,80,0.18)" },
  rowBtnText: { color: "#FFFFFF", fontWeight: "900", fontSize: 12 },
});