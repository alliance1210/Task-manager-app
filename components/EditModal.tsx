import { Task } from "@/utils/api";
import { useEffect, useState } from "react";
import { Alert, Modal, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { BlurView } from 'expo-blur';
import "../app/global.css"

export function EditModal({ visible, task, onDismiss, onUpdate }: {
    visible: boolean;
    task: Task | null;
    onDismiss: () => void;
    onUpdate: (updatedTask: { title: string; description: string }) => Promise<void>;
  }) {
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      setTitle(task?.title || '');
      setDescription(task?.description || '');
    }, [task]);
  
    const handleSubmit = async () => {
      setLoading(true);
      try {
        await onUpdate({ title, description });
        onDismiss();
      } catch (error) {
        Alert.alert('Update failed', error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Modal
            visible={visible}
            onDismiss={onDismiss}
            transparent
            animationType="slide"
        >
            <View className="flex-1 bg-gray-800/50 justify-center p-4">
                <View className="bg-white rounded-xl p-6 mx-4">
                    <Text className="text-primary text-2xl font-bold text-center mb-6">
                        Edit Task
                    </Text>
                    
                    <TextInput
                        label="Title"
                        value={title}
                        onChangeText={setTitle}
                        mode="outlined"
                        className="mb-4"
                        theme={{ colors: { primary: '#30a6d6' } }}
                        left={<TextInput.Icon icon="format-title" color="#7d7d7d" />}
                        disabled={loading}
                        style={{ height: 60 }}
                        contentStyle={{ height: 60 }}
                    />
                    
                    <TextInput
                        label="Description"
                        value={description}
                        onChangeText={setDescription}
                        mode="outlined"
                        multiline
                        numberOfLines={4}
                        className="mb-6"
                        theme={{ colors: { primary: '#30a6d6' } }}
                        left={<TextInput.Icon icon="text" color="#7d7d7d" />}
                        disabled={loading}
                        style={{ height: 100 }}
                        contentStyle={{ height: 100 }}
                    />
                    
                    <View className="flex-row justify-between  mt-5 ">
                        <Button
                            mode="outlined"
                            onPress={onDismiss}
                            disabled={loading}
                            theme={{ colors: { primary: '#30a6d6' } }}
                            style={{width:"45%"}}
                        >
                            Cancel
                        </Button>
                        <Button
                            mode="contained"
                            onPress={handleSubmit}
                            loading={loading}
                            disabled={loading}
                            theme={{ colors: { primary: '#30a6d6' } }}
                            style={{width:"45%"}}
                        >
                            Update
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
  }
  