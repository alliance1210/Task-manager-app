import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
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
      <Text variant="headlineSmall" style={styles.title}>
        Add New Task
      </Text>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
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