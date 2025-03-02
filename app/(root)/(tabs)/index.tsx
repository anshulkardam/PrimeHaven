import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text className="text-5xl font-rubik font-bold text-pink-500">Hi Mambo.</Text>
            <Link href="/sign-in">Sign In</Link>
            <Link href="/explore">Explore</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/properties/1">Propertees</Link>
        </View>
    );
}
