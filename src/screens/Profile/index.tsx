import type { User } from "@/src/types";
import * as ImagePicker from "expo-image-picker";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

import Checkbox from "@/src/components/Checkbox";

import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthContext from "@/src/context/AuthContext";
import { validateEmail, validateName } from "@/src/utils";

export default function Profile() {
    const { user: contextUser, update, logout } = useContext(AuthContext);
    const [user, setUser] = useState<User>({
        firstName: "",
        email: "",
        lastName: "",
        phone: "",
        photo: "",
        ordersStatus: false,
        passwordChanges: false,
        offers: false,
        newsletter: false,
    });
    const [discard, setDiscard] = useState(false);

    useEffect(() => {
        (async () => {
            if (contextUser) {
                setUser({ ...user, ...contextUser });
                setDiscard(false);
            } else {
                try {
                    const userData = await AsyncStorage.getItem("user");
                    if (userData) {
                        const userJson = JSON.parse(userData);
                        setUser({ ...user, ...userJson });
                    }
                } catch (e) {
                    console.error(e);
                }
                setDiscard(false);
            }
        })();
    }, [contextUser, discard]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 1,
        });

        if (!result.canceled && result.assets?.[0] && result.assets[0].uri) {
            updateUser("photo", result.assets[0].uri);
        } else {
            Alert.alert("Error", "Failed to pick image");
        }
    };

    const updateUser = <K extends keyof User>(fieldName: K, value: User[K]) => {
        setUser((prevState) => ({
            ...prevState,
            [fieldName]: value,
        }));
    };

    const checkFormValidation = () => {
        return (
            validateName(user.firstName) &&
            validateName(user.lastName || "") &&
            validateEmail(user.email)
        );
    };

    const saveUser = () => {
        update(user);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView style={styles.main}>
                <Text style={styles.title}>Personal Information</Text>
                <View style={styles.form}>
                    <View style={styles.field}>
                        <Text style={styles.label}>Avatar</Text>
                        <View style={styles.avatarContainer}>
                            {user?.photo ? (
                                <Image source={{ uri: user.photo }} style={styles.avatar} />
                            ) : (
                                <View style={styles.avatar}>
                                    <Text>No avatar</Text>
                                </View>
                            )}
                            <Pressable style={styles.button} onPress={pickImage}>
                                <Text style={styles.buttonText}>Change</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonInverted]}
                                onPress={() => updateUser("photo", "")}
                            >
                                <Text style={[styles.buttonText, styles.buttonInvertedText]}>
                                    Remove
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>First name</Text>
                        <MaskedTextInput
                            value={user?.firstName}
                            onChangeText={(value) => updateUser("firstName", value)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Last name</Text>
                        <TextInput
                            value={user?.lastName}
                            onChangeText={(value) => updateUser("lastName", value)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            value={user?.email}
                            onChangeText={(value) => updateUser("email", value)}
                            keyboardType="email-address"
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.label}>Phone number</Text>
                        <MaskedTextInput
                            mask="(999) 999-9999"
                            value={user?.phone}
                            onChangeText={(value) => updateUser("phone", value)}
                            keyboardType="numeric"
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.groupTitle}>Email notifications</Text>
                        <Checkbox
                            checked={!!user.ordersStatus}
                            text="Orders Statuses"
                            onPress={(isChecked: boolean) => updateUser("ordersStatus", isChecked)}
                        />
                        <Checkbox
                            checked={!!user.passwordChanges}
                            text="Password Changes"
                            onPress={(isChecked: boolean) =>
                                updateUser("passwordChanges", isChecked)
                            }
                        />
                        <Checkbox
                            checked={!!user.offers}
                            text="Special Offers"
                            onPress={(isChecked: boolean) => updateUser("offers", isChecked)}
                        />
                        <Checkbox
                            checked={!!user.newsletter}
                            text="Newsletter"
                            onPress={(isChecked: boolean) => updateUser("newsletter", isChecked)}
                        />
                    </View>
                </View>
                <Pressable style={styles.logoutButton} onPress={logout}>
                    <Text style={[styles.buttonText, styles.buttonInvertedText]}>Logout</Text>
                </Pressable>
            </ScrollView>
            <View style={styles.bottom}>
                <Pressable
                    style={[styles.button, styles.buttonInverted]}
                    onPress={() => setDiscard(true)}
                >
                    <Text style={[styles.buttonText, styles.buttonInvertedText]}>
                        Discard changes
                    </Text>
                </Pressable>
                <Pressable
                    style={[styles.button, checkFormValidation() ? "" : styles.buttonDisabled]}
                    disabled={!checkFormValidation()}
                    onPress={saveUser}
                >
                    <Text style={styles.buttonText}>Save changes</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
    },
    form: {
        flex: 1,
        gap: 16,
        paddingVertical: 12,
    },
    field: {
        gap: 4,
    },
    label: {
        color: "#878893",
    },
    input: {
        fontSize: 16,
        padding: 8,
        backgroundColor: "#EDEFEE",
    },
    groupTitle: {
        fontSize: 16,
        fontWeight: "600",
    },
    avatarContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        marginBottom: 20,
    },
    avatar: {
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#EDEFEE",
    },
    button: {
        flex: 1,
        backgroundColor: "#495e56",
        minWidth: 100,
        padding: 12,
        borderRadius: 8,
    },
    buttonInverted: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#495e56",
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    logoutButton: {
        width: "100%",
        marginTop: 12,
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#f4ce12",
        borderWidth: 1,
        borderColor: "#dcac55",
    },
    buttonText: {
        fontSize: 16,
        color: "#ffffff",
        textAlign: "center",
    },
    buttonInvertedText: {
        color: "#495e56",
    },
    bottom: {
        flexDirection: "row",
        gap: 16,
        justifyContent: "center",
        padding: 20,
        paddingBottom: 40,
        backgroundColor: "#f1f4f7",
    },
});

export { Profile };
