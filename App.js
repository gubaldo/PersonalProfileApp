import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const STORAGE_KEY = "m02:probe-count";

function Probe() {
  const insets = useSafeAreaInsets();
  const [count, setCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (!cancelled && stored !== null) {
          setCount(Number(stored));
        }
      } catch (error) {
        console.warn("Failed to load the probe count", error);
      } finally {
        if (!cancelled) {
          setLoaded(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const increment = async () => {
    const next = count + 1;
    setCount(next);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, String(next));
    } catch (error) {
      console.warn("Failed to save the probe count", error);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.content}>
        <Ionicons name="person-circle-outline" size={72} color="#2563eb" />
        <Text style={styles.title}>M02 probe</Text>
        <Text style={styles.insets}>
          insets: top {insets.top} / bottom {insets.bottom}
        </Text>
        <Text style={styles.count}>{loaded ? count : "..."}</Text>
        <Pressable style={styles.button} onPress={increment}>
          <Text style={styles.buttonText}>Increment and save</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Probe />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fee2e2",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  insets: {
    fontSize: 14,
    color: "#475569",
  },
  count: {
    fontSize: 48,
    fontWeight: "700",
  },
  button: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
