import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack initialRouteName="home">
      <Stack.Screen
        name="home"
        options={{ title: "Task Manager", headerShown: true }}
      />
      <Stack.Screen
        name="[id]"
        options={{ title: "Details", headerShown: true }}
      />
    </Stack>
  );
}
