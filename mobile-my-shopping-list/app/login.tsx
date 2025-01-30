import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Failure", "Credentials missing");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3005/my_shopping_list/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok && data.user_id) {
        await AsyncStorage.clear();
        await AsyncStorage.setItem("authToken", data.token);
        await AsyncStorage.setItem("userID", String(data.user_id));
        router.replace("/");
      } else {
        Alert.alert("Failure", data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Fail to login:", error);
      Alert.alert("Failure", "Try again later!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.title}>Fazer Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.registerText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A2238",
  },
  loginBox: {
    width: "85%",
    padding: 20,
    backgroundColor: "#2C2F3E",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E4E7EB",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 50,
    backgroundColor: "#3A3F51",
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: "#E4E7EB",
    fontSize: 16,
  },
  button: {
    height: 50,
    backgroundColor: "#4CA7BF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  registerText: {
    color: "#4CA7BF",
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
