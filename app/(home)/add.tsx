import { useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { Button, TextInput, } from 'react-native-paper';
import { router } from 'expo-router';
import { addTask } from '@/utils/api';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleAddTask = async () => {
    setLoading(true);
    try {
      await addTask({ title, description });
      router.push('/(home)'); 
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };
 

  return (
    <View style={styles.container}>
      <Text className='text-4xl text-primary text-4xl font-bold' style={styles.title}>
        Add New Task
      </Text>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        theme={{ colors: { primary: '#30a6d6' } }}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        theme={{ colors: { primary: '#30a6d6' } }}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleAddTask}
        loading={loading}
        disabled={loading || !title}
        style={styles.button}
        theme={{ colors: { primary: '#30a6d6' } }}
      >
        Save Task
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});