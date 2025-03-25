import { useAuth } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { Appbar } from "react-native-paper";

export default function Layout() {
  const { signOut } = useAuth();

  return (
    <Stack initialRouteName="home">
      <Stack.Screen
        name="home"
        options={{ title: "Task Manager", headerShown: true,headerRight: () => (
          <Appbar.Action icon="logout" onPress={signOut} />
        ), }}
        
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
