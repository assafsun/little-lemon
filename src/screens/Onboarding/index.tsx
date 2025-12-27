import React, { useMemo, useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { store } from "../../store";

const Onboarding = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const isNextEnabled = useMemo(() => name.length > 0 && email.length > 0, [name, email]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = async () => {
    if (validateEmail(email)) {
      await store.setStore("userInfo", { name, email, isLoggedIn: true });
      console.log("✅ User info saved to store");
    } else {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          resizeMode="contain"
          style={{ width: 250, height: 150 }}
          source={require("../../img/littleLemonLogo.png")}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>Let us get to know you</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="black"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="black"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleNext}
          style={[styles.button, !isNextEnabled && styles.disabledButton]}
          activeOpacity={0.7}
          disabled={!isNextEnabled}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 150,
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  },
  logo: {
    width: 250,
    height: 150,
  },
  body: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  footer: {
    height: 100,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Onboarding;