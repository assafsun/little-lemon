// Author: Assaf
import React, { useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubscribe = () => {
    if (emailValidationRegex.test(email)) {
      Alert.alert("Subscription Successful", `Subscribed with: ${email}`);
    } else {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../img/backgroundImage.png")}
        resizeMode="contain"
        accessible
        accessibilityLabel="Little Lemon Logo"
      />
      <Text style={styles.title}>
        Subscribe to our newsletter for the latest delicious recipes
      </Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        style={styles.input}
      />
      <TouchableOpacity
        disabled={!email}
        activeOpacity={0.7}
        onPress={handleSubscribe}
        style={[styles.button, !email && styles.disabledButton]}
      >
        <Text style={styles.buttonText}>Subscribe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    marginTop: 40,
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#144d16",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default Subscribe;