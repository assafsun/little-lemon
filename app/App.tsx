import { initializeDatabase } from "@/src/database/initializeDatabase";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Router from "../src/router";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" translucent animated />
      <SQLiteProvider databaseName="littleLemon.db" onInit={initializeDatabase}>
        <Router />
      </SQLiteProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
});