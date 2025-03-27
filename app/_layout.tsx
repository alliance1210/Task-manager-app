import { AuthProvider } from "@/context/AuthContext";
import { Slot, SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Prevent auto-hiding splash screen
    SplashScreen.preventAutoHideAsync();
    
    // Simulate loading (replace with your actual initialization)
    const timer = setTimeout(() => {
      setIsReady(true);
      SplashScreen.hideAsync();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return null; // Or your custom splash screen component
  }

  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{headerShown:false}}/>
      {/* <Slot /> */}
    </AuthProvider>
  );
}