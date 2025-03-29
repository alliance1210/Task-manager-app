import { useAuth } from "@/context/AuthContext";
import { router, Slot, Stack } from "expo-router";
import { useEffect } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
export default function Layout() {
  const { signOut, userToken } = useAuth();
  const isUserLoggedIn = () => {
    if (userToken === null) {
      router.replace("/(auth)/");
    }
  }
  useEffect(() => {
    isUserLoggedIn();
  }, [userToken]);
  return (
    <Stack initialRouteName="index" screenOptions={{
      headerRight: () => (
        <IconButton
        icon="logout"
        size={24}
        onPressIn={() => { 
          signOut(); 
        }}
        iconColor="black"
      />
      ),
    }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Task Manager", headerShown: true
        }}

      />
      <Stack.Screen
        name="[id]"
        options={{ title: "Details", headerShown: true }}
      />
      <Stack.Screen
        name="add"
        options={{ title: "Add", headerShown: true }}
      />

    </Stack>
  );
}
