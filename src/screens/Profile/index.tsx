import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  //------ HEADER
  containerHeader: {
    flex: 1,
    paddingTop: 60,
    width: "100%",
  },
  avatarContainer: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    // justifyContent: "center",
  },
  editButton: {
    marginLeft: 10,
    padding: 5,
    width: 80,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  //------ FORM
  containerForm: {
    flex: 3,

    alignItems: "center",
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
  },
  //------ FOOTER
  containerFooter: {
    paddingBottom: 50,
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
  },
  changeButton: {
    padding: 10,
    borderRadius: 5,
  },
  textChangeButton: {
    color: "white",
    fontWeight: "bold",
  },
});

export { Profile };
