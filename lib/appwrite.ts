import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
export const config = {
    platform: "com.kzm.restate",
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client.setEndpoint(config.endpoint!).setProject(config.projectID!).setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function Login() {
    try {
        const redirectURI = Linking.createURL("/");
        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectURI);
        if (!response) throw new Error("Failed to Login");

        const browserResult = await openAuthSessionAsync(response.toString(), redirectURI);

        if (browserResult.type != "success") throw new Error("failed to login");

        const url = new URL(browserResult.url);

        const secret = url.searchParams.get("secret")?.toString();
        const userId = url.searchParams.get("userId")?.toString();

        if (!secret || !userId) throw new Error("Failed to Login");

        const session = await account.createSession(userId, secret);

        if (!session) throw new Error("Failed to create a session");

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function Logout() {
    try {
        await account.deleteSession("current");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getCurrentUser() {
    try {
        const response = await account.get();
        if (response.$id) {
            const userAvatar = avatar.getInitials(response.name);
            return {
                ...response,
                avatar: userAvatar.toString(),
            };
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}
