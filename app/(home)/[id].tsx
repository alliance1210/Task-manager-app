import { Text, View } from "react-native";
import "../global.css"
import { useLocalSearchParams } from "expo-router";
export default function Details() {
    const {id} = useLocalSearchParams();
  return (
    <View className="flex-1 items-center justify-center">
      <Text>{id}</Text>
    </View>
  );
}
