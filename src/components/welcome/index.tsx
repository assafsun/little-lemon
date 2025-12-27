// Author: Assaf
import { useDeviceOrientation } from "@react-native-community/hooks";
import React, { useEffect } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    useColorScheme,
    useWindowDimensions,
} from "react-native";

const Welcome = () => {
  const colorScheme = useColorScheme();
  const window = useWindowDimensions();
  const orientation = useDeviceOrientation();

  useEffect(() => {
    console.log("Color Scheme:", colorScheme);
  }, [colorScheme]);

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: colorScheme === "light" ? "#fff" : "#333" },
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../img/backgroundImage.png")}
          resizeMode="contain"
          accessible
          accessibilityLabel="Little Lemon Logo"
        />
      </View>

      <Text style={styles.infoText}>Window Dimensions</Text>
      <Text style={styles.infoText}>Height: {window.height}</Text>
      <Text style={styles.infoText}>Width: {window.width}</Text>
      <Text style={styles.infoText}>Font Scale: {window.fontScale}</Text>
      <Text style={styles.infoText}>Orientation: {orientation}</Text>

      <Text style={styles.title}>Little Lemon</Text>

      {["Picture1.png", "Picture2.png", "Picture3.png", "Picture4.png"].map(
        (image, index) => (
          <Image
            key={index}
            style={styles.image}
            source={require(`../../img/${image}`)}
            resizeMode="cover"
            accessible
            accessibilityLabel={`Little Lemon Image ${index + 1}`}
          />
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    alignItems: "center",
    gap: 10,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  logo: {
    height: 100,
    width: 100,
  },
  image: {
    width: 350,
    height: 250,
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#666",
    marginVertical: 5,
  },
});

export default Welcome;