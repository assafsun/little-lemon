// Author: Assaf
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Little Lemon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EE9972",
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    color: "#333",
    textAlign: "center",
  },
});

export default Header;