import { useEffect, useState } from 'react';
import { View, Alert, TouchableOpacity,Text } from 'react-native';
import { Button, TextInput  } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import '../global.css'
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading, error } = useAuth();

  // useEffect(() => {
  //   if (error) {
  //     Alert.alert('Login Error', error);
  //   }
  // }, [error]);

  return (
    <View className="flex-1 bg-background p-6 justify-center" >
      {/* Header Section */}
      <View className="mb-12 items-center">
        <Text className="text-primary text-4xl font-bold text-center mb-2">
          Welcome Back
        </Text>
        <Text className="text-textSecondary text-center text-lg ">
          Please sign in to continue
        </Text>
      </View>

      {/* Form Section */}
      <View className="space-y-6">
        <View className='p-2'>
          <TextInput
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={setEmail}
            theme={{ colors: { primary: '#30a6d6' } }}
            left={<TextInput.Icon icon="email" color="#7d7d7d" />}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ height: 60 }}
            contentStyle={{ height: 60 }}
            autoComplete="email"
            textContentType="emailAddress"
            importantForAutofill="yes"
            returnKeyType="next"
          />
        </View>
        <View className='p-2'>
          <TextInput
            mode="outlined"
            label="Password"
            defaultValue={password}
            onChangeText={setPassword}
            secureTextEntry
            theme={{ colors: { primary: '#30a6d6' } }}
            left={<TextInput.Icon icon="lock" color="#7d7d7d" />}
            style={{ height: 60 }}
            contentStyle={{ height: 60 }}
            autoComplete="password"
            textContentType="password"
            importantForAutofill="yes"
            returnKeyType="done"
          />
        </View>

        <TouchableOpacity className="items-end ">
          <Text className="text-primary text-m font-medium">
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <Button
          mode="contained"
          loading={isLoading}
          disabled={isLoading}
          onPress={() => signIn(email, password)}
          className="py-3 rounded-lg mt-5"
          labelStyle={{ fontSize: 16 }}
          theme={{ colors: { primary: '#30a6d6' } }}
        >
          Sign In
        </Button>
      </View>

      {/* Sign Up Section */}
      <View className="flex-row justify-center mt-8">
        <Text className="text-textSecondary">Don't have an account? </Text>
        <TouchableOpacity onPress={()=>router.push("/signup")}>
          <Text className="text-primary font-medium">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};