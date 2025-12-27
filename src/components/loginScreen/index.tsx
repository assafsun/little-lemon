// Author: Assaf
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleLogin = () => {
    const defaultCredentials = { email: "admin", password: "123321" };

    if (!email || !password) {
      Alert.alert("Login Error", "Email or password cannot be empty.");
      return;
    }

    if (email !== defaultCredentials.email || password !== defaultCredentials.password) {
      Alert.alert("Login Error", "Invalid email or password.");
      return;
    }

    Alert.alert("Success", "You are now logged in.");
    navigation.navigate("Home" as never);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Welcome to Little Lemon</Text>
      <Text style={styles.regularText}>Login to continue</Text>

      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.inputBox}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 30,
    color: "#EDEFEE",
    textAlign: "center",
    marginBottom: 20,
  },
  regularText: {
    fontSize: 18,
    color: "#EDEFEE",
    textAlign: "center",
    marginBottom: 20,
  },
  inputBox: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "#EDEFEE",
    backgroundColor: "#FFF",
    borderRadius: 5,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#e8a070",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
  },
});

export default LoginScreen;