import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { LogBox, StatusBar } from "react-native";

LogBox. ignoreAllLogs(true);

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    if (!isAuthenticated && isMounted) {
      router.replace('/login');
    }
  }, [isAuthenticated, isMounted]);
  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{}} />
      </Stack>
    </>
  );
}
