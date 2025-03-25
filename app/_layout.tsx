import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      {/* Set StatusBar style based on the theme */}
      <StatusBar style={"dark"} />
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: "Sign in", headerShown: false }}
          />
          <Stack.Screen
            name="signup"
            options={{ title: "Sign up", headerShown: false }}
          />
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </>
  );
}
