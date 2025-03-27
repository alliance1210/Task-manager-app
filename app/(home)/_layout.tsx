import { useAuth } from "@/context/AuthContext";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { Appbar } from "react-native-paper";

export default function Layout() {
  const { signOut, userToken } = useAuth();
  const isUserLoggedIn = ()=>{
    if (userToken===null) {
      router.replace("/(auth)/");
    }
  }
  useEffect(() => {
    isUserLoggedIn();
  }, [userToken]);
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{ title: "Task Manager", headerShown: true,headerRight: () => (
          <Appbar.Action icon="logout" onPress={(()=>console.log("this"))} />
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
