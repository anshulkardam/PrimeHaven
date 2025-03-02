import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { SplashScreen } from "expo-router";
import "./globals.css";
import GlobalProvider from "@/lib/global-provider";

export default function RootLayout() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            try {
                await Font.loadAsync({
                    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
                    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
                    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
                    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
                    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
                    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
                });
                setFontsLoaded(true);
                await SplashScreen.hideAsync();
            } catch (error) {
                console.error("Error loading fonts:", error);
            }
        }

        loadFonts();
    }, []);

    if (!fontsLoaded) return null;

    return (
        <GlobalProvider>
            <Stack screenOptions={{ headerShown: false }} />;
        </GlobalProvider>
    );
}
