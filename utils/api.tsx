import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosResponse } from 'axios';

// const API_BASE_URL = 'http://10.100.2.34:5000/';
// const API_BASE_URL = 'http://192.168.29.150:5000/';
const API_BASE_URL = 'https://task-manager-backend-uk3y.onrender.com/';

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

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?:Date;
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
    const response: AxiosResponse<GetTasksResponse> = await api.get('tasks/');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        throw error.response?.data || error.message;
      } else {
        throw error;
      }
  }
};
export const getTask = async (id: string): Promise<Task> => {
  try {
    const response: AxiosResponse<Task> = await api.get(`tasks/${id}`);
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
    const response: AxiosResponse<AddTaskResponse> = await api.post('tasks/', taskData);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.log(error.response?.data);
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
export const updateTask = async (id: string, { title, description }: { title: string; description: string }): Promise<Task> => {
  try {
    const response: AxiosResponse<Task> = await api.put(`tasks/${id}`, {
      title,
      description
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw error;
    }
  }
};