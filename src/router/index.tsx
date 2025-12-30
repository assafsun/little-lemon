import type { User } from "@/src/types";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useMemo, useReducer } from "react";
import { Image } from "react-native";

import Header from "../components/header";
import AuthContext from "../context/AuthContext";
import Home from "../screens/Home";
import { Onboarding } from "../screens/Onboarding";
import { Profile } from "../screens/Profile";

type State = {
    isLoading: boolean;
    isOnboardingCompleted: boolean;
    user: User | null;
};

type Action =
    | { type: "onboard"; isOnboardingCompleted: boolean; user: User | null }
    | { type: "update_user"; user: User };

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabRoutes = () => (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName: keyof typeof Ionicons.glyphMap = "home-outline";
                if (route.name === "Home") {
                    iconName = focused ? "home" : "home-outline";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#495E57",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
        })}
    >
        <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
);

const Router = () => {
    const [state, dispatch] = useReducer(
        (prevState: State, action: Action) => {
            switch (action.type) {
                case "onboard":
                    return {
                        ...prevState,
                        isLoading: false,
                        isOnboardingCompleted: action.isOnboardingCompleted,
                        user: action.user,
                    };
                case "update_user":
                    return {
                        ...prevState,
                        user: action.user,
                    };
                default:
                    return prevState;
            }
        },
        {
            isLoading: true,
            isOnboardingCompleted: false,
            user: null,
        }
    );

    useEffect(() => {
        (async () => {
            let user: User | null = null;
            let isOnboardingCompleted = false;
            try {
                const userData = await AsyncStorage.getItem("user");

                if (userData) {
                    user = JSON.parse(userData);
                }
            } finally {
                if (user && Object.keys(user).length != 0) {
                    isOnboardingCompleted = true;
                }

                dispatch({
                    type: "onboard",
                    isOnboardingCompleted: isOnboardingCompleted,
                    user: user,
                });
            }
        })();
    }, []);

    const authContext = useMemo(
        () => ({
            user: state.user,
            onboard: async (data: User) => {
                try {
                    const jsonValue = JSON.stringify(data);
                    await AsyncStorage.setItem("user", jsonValue);
                } catch (e) {
                    console.error(e);
                }

                dispatch({ type: "onboard", isOnboardingCompleted: true, user: data });
            },
            update: async (data: User) => {
                try {
                    const jsonValue = JSON.stringify(data);
                    await AsyncStorage.setItem("user", jsonValue);
                } catch (e) {
                    console.error(e);
                }

                dispatch({ type: "update_user", user: data });
            },
            logout: async () => {
                try {
                    await AsyncStorage.clear();
                } catch (e) {
                    console.error(e);
                }

                dispatch({ type: "onboard", isOnboardingCompleted: false, user: null });
            },
        }),
        [state.user]
    );

    if (state.isLoading) {
        return null;
    }

    return (
        <AuthContext.Provider value={authContext}>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#dee3e9",
                    },
                    contentStyle: {
                        flex: 1,
                        backgroundColor: "#cad2d9",
                    },
                    headerBackButtonDisplayMode: "minimal",
                    headerTitle: () => (
                        <Image
                            style={{ width: 200, height: 50 }}
                            resizeMode="contain"
                            source={require("../img/littleLemonLogo.png")}
                        />
                    ),
                    headerRight: () => <Header />,
                }}
            >
                {state.isOnboardingCompleted ? (
                    <>
                        <Stack.Screen name="Home" component={TabRoutes} />
                        <Stack.Screen name="Profile" component={Profile} />
                    </>
                ) : (
                    <Stack.Screen
                        name="Onboarding"
                        component={Onboarding}
                        options={{ title: "Onboarding", headerRight: undefined }}
                    />
                )}
            </Stack.Navigator>
        </AuthContext.Provider>
    );
};

export default Router;