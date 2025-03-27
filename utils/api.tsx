import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://10.100.2.34:5000/';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add request interceptor for auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Type Definitions for API Response Data
interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface SignupResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface GetTasksResponse {
  tasks: Task[];
}

interface AddTaskResponse {
  task: Task;
}

interface DeleteTaskResponse {
  message: string;
}

// API calls with correct typing

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await api.post('auth/login', { email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw error;
    }
  }
};

export const signup = async (name: string, email: string, password: string): Promise<SignupResponse> => {
  try {
    const response: AxiosResponse<SignupResponse> = await api.post('auth/signup', { name, email, password });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw error;
      }
    }
};

export const getTasks = async (): Promise<GetTasksResponse> => {
  try {
    const response: AxiosResponse<GetTasksResponse> = await api.get('tasks');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw error;
      }
  }
};

export const addTask = async (taskData: Omit<Task, 'id'>): Promise<AddTaskResponse> => {
  try {
    const response: AxiosResponse<AddTaskResponse> = await api.post('tasks', taskData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw error;
      }
  }
};

export const deleteTask = async (taskId: string): Promise<DeleteTaskResponse> => {
  try {
    const response: AxiosResponse<DeleteTaskResponse> = await api.delete(`tasks/${taskId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw error;
      }
  }
};
