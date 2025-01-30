import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  RefreshControl,
  View,
  StyleSheet,
} from "react-native";
import ListCards from "@/components/ListCards";
import useList from "@/hooks/useList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Index() {
  const { lists, getListsByUserId, loading } = useList();
  const [userID, setUserID] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUserLogged = async () => {
      try {
        const storedUserID = await AsyncStorage.getItem("userID");

        if (!storedUserID) {
          router.replace("/login");
        } else {
          setUserID(storedUserID);
        }
      } catch (error) {
        console.error("Erro ao verificar userID:", error);
        router.replace("/login");
      }
    };

    checkUserLogged();
  }, []);

  useEffect(() => {
    if (userID) {
      getListsByUserId(userID);
    }
  }, [userID]);

  const handleRefresh = async () => {
    console.log("refresh");
    if (!userID) return;
    setRefreshing(true);
    await getListsByUserId(userID);
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={lists}
        keyExtractor={(item) => item.list_id.toString()}
        renderItem={({ item }) => (
          <ListCards lists={[item]} loading={loading} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#FF6347"]}
            tintColor="#FF6347"
          />
        }
        style={styles.flatList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    backgroundColor: "#1c1c1e",
  },
});
