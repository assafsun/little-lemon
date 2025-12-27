// Author: Assaf
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>LITTLE</Text>
        <Image
          style={styles.logo}
          source={require("../../img/backgroundImage.png")}
          resizeMode="contain"
          accessible
          accessibilityLabel="Little Lemon Logo"
        />
        <Text style={styles.title}>LEMON</Text>
      </View>
      <Text style={styles.subtitle}>Little Lemon, your local</Text>
      <Text style={styles.subtitle}>Mediterranean bistro</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Subscribe" as never)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Newsletter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    height: 100,
    width: 100,
    marginVertical: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#144d16",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});

export default Welcome;