import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import AuthContext from "@/src/context/AuthContext";

export default function Header() {
    const { user } = useContext(AuthContext);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    function getUserFirstLetters() {
        return (user?.firstName?.[0] || "") + (user?.lastName?.[0] || "");
    }

    return (
        <Pressable onPress={() => navigation.navigate("Profile")}>
            {user?.photo ? (
                <Image style={styles.avatar} resizeMode="cover" source={{ uri: user.photo }} />
            ) : (
                user?.firstName && (
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{getUserFirstLetters()}</Text>
                    </View>
                )
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    avatar: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        backgroundColor: "#62d6c4",
        width: 36,
        height: 36,
    },
    avatarText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#333",
    },
});