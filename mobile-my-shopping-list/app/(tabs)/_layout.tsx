import { Tabs, router } from "expo-router";
import { LogBox } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

LogBox.ignoreAllLogs(true);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#25292e",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#25292e",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "My Shopping List",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={24}
              color={color}
            />
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              name="plus"
              size={32}
              color={"white"}
              style={{ marginRight: 15 }}
              onPress={() => router.push("./addList")}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="items"
        options={{
          headerTitle: "Items",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "bag-handle-outline" : "bag-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="not-found"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
