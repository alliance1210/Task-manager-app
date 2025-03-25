import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card, Appbar } from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        // Replace with actual API call
        const mockTask = {
          id,
          title: `Task ${id}`,
          description: `Details for task ${id}`,
          createdAt: new Date().toISOString(),
        };
        setTask(mockTask);
      } catch (error) {
        console.error('Failed to fetch task', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      router.replace('/(tasks)');
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Task Details" />
      </Appbar.Header> */}
      <Card style={{ margin: 16 }}>
        <Card.Title title={task.title} />
        <Card.Content>
          <Text variant="bodyMedium" style={{ marginBottom: 16 }}>
            {task.description}
          </Text>
          <Text variant="labelSmall">
            Created: {new Date(task.createdAt).toLocaleString()}
          </Text>
        </Card.Content>
      </Card>
      <View style={styles.actions}>
        <Button
          mode="contained"
          onPress={() => router.push(`/(tasks)/${id}/edit`)}
          style={styles.button}
        >
          Edit
        </Button>
        <Button
          mode="outlined"
          onPress={handleDelete}
          style={styles.button}
          textColor="#ff0000"
        >
          Delete
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});