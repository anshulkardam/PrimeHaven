import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";

const SignIn = () => {
    const { refetch, loading, isLoggedIn } = useGlobalContext();

    if (!loading && isLoggedIn) return <Redirect href={"/"} />;
    const handleLogin = async () => {
        const result = await Login();
        if (result) {
            refetch();
        } else {
            Alert.alert("Error", "Failed to Login");
        }
    };
    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
                <Image
                    source={images.onboarding}
                    className="w-full h-[500px]"
                    resizeMode="contain"
                />
                <View className="px-10">
                    <Text className="text-base text-center uppercase font-rubik text-black-200">
                        Welcome to ReState
                    </Text>
                    <Text className="text-3xl  font-rubik-bold text-black-300 text-center mt-2">
                        Let's Get you to closer {"\n"}
                        <Text className="text-primary-300">Your Ideal Home</Text>
                    </Text>
                    <Text className="text-lg font-rubik text-black-200 text-center mt-12">
                        Login to ReState with Google
                    </Text>
                    <TouchableOpacity
                        onPress={handleLogin}
                        className="bg-white shadow-md shadow-zinc-300 w-full rounded-full py-4 mt-5"
                    >
                        <View className="flex flex-row items-center justify-center">
                            <Image source={icons.google} className="w-5 h-5" resizeMode="contain" />
                            <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                                Continue with Google
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;

// import { Client, Account, ID } from 'react-native-appwrite';

// const client = new Client()
//     .setProject('67c3bf71002433ba88be')
//     .setPlatform('com.kzm.restate');
