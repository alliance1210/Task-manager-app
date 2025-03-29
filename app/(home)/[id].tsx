import { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import { useLocalSearchParams, router } from 'expo-router';
import { deleteTask, getTask, Task, updateTask } from '@/utils/api';
import { EditModal } from '@/components/EditModal';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    try {
      if (typeof id === 'string') {
        await deleteTask(id);
        router.replace('/');
      }
    } catch (error) {
      Alert.alert('Failed to delete task', error instanceof Error ? error.message : String(error));
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (typeof id === 'string') {
          const data = await getTask(id);
          setTask(data);
        }
      } catch (error) {
        Alert.alert('Loading failed', error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };
    
    fetchTask();
  }, [id]); 

  const handleUpdate = async (updateData: { title: string; description: string }) => {
    if (typeof id !== 'string') return;
    
    try {
      const updatedTask = await updateTask(id, updateData);
      setTask(updatedTask);
    } catch (error) {
      Alert.alert('Update failed', error instanceof Error ? error.message : String(error));
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <Text className="text-primary">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
    {/* Dark overlay when modal is visible */}
    {showEditModal && (
      <View className="absolute inset-0 bg-black opacity-50 z-10" />
    )}

    <View className={`flex-1 bg-background p-4 ${showEditModal ? 'opacity-100' : ''}`}>
      <Card className="m-4 bg-white">
        <Card.Title 
          title={task?.title} 
          titleStyle={{ color: '#30a6d6', fontSize: 24 }}
          className="border-b border-gray-200"
        />
        <Card.Content className="p-4">
          <Text className="text-textSecondary text-base mb-4">
            {task?.description}
          </Text>
          <Text className="text-gray-500 text-sm">
            Created: {new Date(task?.createdAt || '').toLocaleString()}
          </Text>
          <Text className="text-gray-500 text-sm">
            Last Update: {new Date(task?.updatedAt || '').toLocaleString()}
          </Text>
        </Card.Content>
      </Card>

      <View className="flex-row justify-around px-4 gap-4 mt-5">
        <Button
          mode="contained"
          onPress={() => setShowEditModal(true)}
          className="flex-1 rounded-lg py-2"
          theme={{ colors: { primary: '#30a6d6' } }}
        >
          Edit
        </Button>
        <Button
          mode="outlined"
          onPress={handleDelete}
          className="flex-1 rounded-lg py-2"
          textColor="#ff0000"
          theme={{ colors: { primary: '#ff0000' } }}
        >
          Delete
        </Button>
      </View>

      <EditModal 
        visible={showEditModal}
        task={task}
        onDismiss={() => setShowEditModal(false)}
        onUpdate={handleUpdate}
      />
    </View>
  </View>
);
}