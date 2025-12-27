// Author: Assaf
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Order = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.title}>Title</Text>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.price}>R$0.00</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  descriptionContainer: {
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    color: "#666",
    fontSize: 14,
  },
  price: {
    fontWeight: "bold",
    color: "#666",
    fontSize: 14,
  },
});

export default Order;