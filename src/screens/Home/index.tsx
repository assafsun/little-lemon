import Menu from "@/src/components/Menu";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.welcome}>
                <Text style={styles.title}>Little Lemon</Text>
                <View style={styles.main}>
                    <View style={styles.content}>
                        <Text style={styles.subtitle}>Chicago</Text>
                        <Text style={styles.text}>
                            We are a family owned Mediterranean restaurant, focused on traditional
                            recipes served with a modern twist.
                        </Text>
                    </View>
                    <Image
                        style={styles.image}
                        source={require("../../img/hero-img.png")}
                        accessible={true}
                        accessibilityLabel={"Little Lemon Food"}
                    />
                </View>
            </View>
            <Menu />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#495E57",
    },
    welcome: {
        padding: 16,
    },
    title: {
        color: "#f4ce14",
        fontSize: 54,
    },
    subtitle: {
        color: "#fff",
        fontSize: 30,
    },
    text: {
        color: "#fff",
        fontSize: 14,
    },
    main: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    content: {
        flex: 1,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 12,
    },
});