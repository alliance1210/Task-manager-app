import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";
import { login, signup } from "../utils/api";

type AuthContextType = {
  userToken: string | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType>({
  userToken: null,
  isLoading: true,
  error: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  clearError: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setUserToken(token);
      } catch (e) {
        handleError("Failed to load authentication data", e);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  const handleError = (defaultMessage: string, error: any) => {
    const errorMessage =
      error?.response?.data?.message || error?.message || defaultMessage;
    setError(errorMessage);
    Alert.alert("Error", errorMessage);
  };

  const clearError = () => setError(null);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    clearError();
    try {
      const data = await login(email, password);
      const token = data.token;
      await AsyncStorage.setItem("userToken", token);
      setUserToken(token);
      router.replace("/(home)/");
    } catch (error) {
      console.log(error)
      handleError("Login failed. Please check your credentials.", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    clearError();

    try {
      await signup(name, email, password);
      Alert.alert(
        "Success",
        "Registration successful! Please login with your credentials.",
        [{ text: "OK", onPress: () => router.replace("/login") }]
      );
    } catch (error) {
      handleError("Registration failed. Please try again.", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem("userToken");
      setUserToken(null);
      // router.replace("../(auth)/index");
    } catch (error) {
      handleError("Logout failed. Please try again.", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        isLoading,
        error,
        signIn,
        signUp,
        signOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
