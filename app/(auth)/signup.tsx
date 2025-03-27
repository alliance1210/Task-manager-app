import { useState } from 'react';
import { View, TouchableOpacity,Text } from 'react-native';
import { Button, TextInput  } from 'react-native-paper';
import { router } from 'expo-router';
import '../global.css'
export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Signup failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background p-6 justify-center">
      {/* Header Section */}
      <View className="mb-12 items-center">
        <Text className="text-primary font-bold text-4xl text-center mb-2">
          Create Account
        </Text>
        <Text className="text-textSecondary text-center text-lg">
          Join our community to get started
        </Text>
      </View>

      {/* Form Section */}
      <View className="space-y-6">
        <View className='p-2'>
          <TextInput
            mode="outlined"
            label="Name"
            value={name}
            onChangeText={setName}
            theme={{ colors: { primary: '#30a6d6' } }}
            left={<TextInput.Icon icon="account" color="#7d7d7d" />}
            style={{ height: 60 }}
            contentStyle={{ height: 60 }}
            autoComplete="name"
            textContentType="name"
            importantForAutofill="yes"
          />
        </View>

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
            value={password}
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

        <Button
          mode="contained"
          onPress={handleSignup}
          loading={loading}
          disabled={loading}
          className="py-3 rounded-lg mt-5"
          labelStyle={{ fontSize: 16 }}
          theme={{ colors: { primary: '#30a6d6' } }}
        >
          Sign Up
        </Button>
      </View>

      {/* Login Section */}
      <View className="flex-row justify-center mt-8">
        <Text className="text-textSecondary">Already have an account? </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-primary font-medium">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}