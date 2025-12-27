import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import LoginScreen from "../components/loginScreen";
import MenuScreen from "../components/menuItems";
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import { Profile } from "../screens/Profile";
import { store } from "../store";

type UserInfo = {
  isLoggedIn: boolean;
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabRoutes = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap = "home-outline"; // Default value
        if (route.name === "Home") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Menu") {
          iconName = focused ? "list" : "list-outline";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "orange",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Menu" component={MenuScreen} />
  </Tab.Navigator>
);

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const userInfo: UserInfo | null = await store.getStore("userInfo");
      setIsLoggedIn(Boolean(userInfo?.isLoggedIn));
    };

    loadUser();

    const unsubscribe = store.subscribe("userInfo", (value) => {
      setIsLoggedIn(Boolean(value?.isLoggedIn));
    });

    return () => unsubscribe();
  }, []);

  if (isLoggedIn === null) {
    // Render a loading screen or null while determining login state
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? "Home" : "Onboarding"}
      screenOptions={{ headerShown: false }}
    >
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={TabRoutes} />
          <Stack.Screen name="Profile" component={Profile} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Router;