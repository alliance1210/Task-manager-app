import { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Button, Card, Text, Appbar } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { signOut } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTasks = async () => {
    setRefreshing(true);
    try {
      // Replace with actual API call
      const mockTasks = [
        { id: '1', title: 'Complete project', description: 'Finish the task manager app' },
        { id: '2', title: 'Buy groceries', description: 'Milk, eggs, bread' },
      ];
      setTasks(mockTasks);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="My Tasks" />
        <Appbar.Action icon="logout" onPress={signOut} />
      </Appbar.Header>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchTasks} />
        }
        renderItem={({ item }) => (
          <Card
            style={{ margin: 8 }}
            onPress={() => router.push(`/(tasks)/${item.id}`)}
          >
            <Card.Title title={item.title} subtitle={item.description} />
          </Card>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            No tasks found
          </Text>
        }
      />
      <Button
        mode="contained"
        style={{ margin: 16 }}
      >
        Add Task
      </Button>
    </View>
  );
}