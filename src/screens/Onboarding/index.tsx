import type { User } from "@/src/types";

import { useContext, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import AuthContext from "@/src/context/AuthContext";

import { validateEmail, validateName } from "@/src/utils";

export default function Onboarding() {
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");

    const isValidName = validateName(firstName);
    const isValidEmail = validateEmail(email);

    const { onboard } = useContext(AuthContext);

    const handleNext = async () => {
        const data: User = { firstName, email, lastName: "", phone: "", photo: "" };
        onboard(data);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.header}>
                <Image
                    resizeMode="contain"
                    style={styles.logo}
                    source={require("../../img/littleLemonLogo.png")}
                />
            </View>
            <View style={styles.main}>
                <View style={styles.textBlock}>
                    <Text style={styles.title}>Let us get to know you</Text>
                </View>
                <View style={styles.form}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        value={firstName}
                        onChangeText={setFirstName}
                        placeholder="John"
                        placeholderTextColor="#999"
                        style={styles.input}
                    />
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="example@example.com"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        style={styles.input}
                    />
                </View>
            </View>
            <View style={styles.bottom}>
                <Pressable
                    style={[
                        styles.button,
                        !isValidName || !isValidEmail ? styles.buttonDisabled : "",
                    ]}
                    onPress={handleNext}
                    disabled={!isValidName || !isValidEmail}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    height: 150,
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dee3e9",
  },
  logo: {
    width: 250,
    height: 150,
  },
  main: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  textBlock: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    gap: 16,
    paddingVertical: 32,
    alignSelf: "stretch",
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    fontSize: 16,
    padding: 12,
    backgroundColor: "#EDEFEE",
    borderRadius: 8,
    color: "#333",
  },
  button: {
    alignSelf: "flex-end",
    backgroundColor: "#495E57",
    minWidth: 100,
    padding: 12,
    borderRadius: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
  },
  bottom: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#f1f4f7",
  },
});

export { Onboarding };
