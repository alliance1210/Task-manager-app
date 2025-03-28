import { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Button, Card, Text, Appbar } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { router } from 'expo-router';
import { getTasks } from '@/utils/api';

interface Task {
  _id: string;
  title: string;
  description: string;
}

// const mockTasks = [
//   { id: '1', title: 'Complete project', description: 'Finish the task manager app' },
//   { id: '2', title: 'Buy groceries', description: 'Milk, eggs, bread' },
// ];
export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);
 const {signOut} = useAuth();
  const fetchTasks = async () => {
    setRefreshing(true);
    try {
      const response = await getTasks();
      const formattedTasks: Task[] = Array.isArray(response)
        ? response.map((task: any) => ({
            _id: task._id,
            title: task.title,
            description: task.description,
          }))
        : [];
      setTasks(formattedTasks);
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
    <View className='flex-1 mt-5'>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchTasks} />
        }
        renderItem={({ item }) => (
          <Card
            style={{ margin: 8 }}
            onPress={() => router.push(`/(home)/${item.title}`)}
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
        style={{ margin: 5 }}
        mode="contained"
        onPress={() => router.push('/(home)/add')}
      >
        Add Task
      </Button>
      <Button
        style={{ margin: 5 }}
        mode="contained"
        onPress={() => signOut()}
      >
        Signout
      </Button>
    </View>
  );
}