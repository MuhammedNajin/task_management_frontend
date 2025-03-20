import axios from 'axios';
import api from './api'; 
import { Task, TaskAnalytics } from '../../types/Task';
import { ApiResponse } from '../../types/api';

class TaskService {
  async createTask(taskData: Partial<Task>): Promise<Task> {
    try {
      const response = await api.post<ApiResponse<Task>>('/tasks', taskData);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to create task');
      }
      throw new Error('Network error. Please try again later.');
    }
  }


  async updateSubtaskStatus(taskId: string, subtaskIndex: number, completed: boolean): Promise<Task> {
    try {
      const response = await api.patch<ApiResponse<Task>>(
        `/tasks/${taskId}/subtasks/${subtaskIndex}`,
        { completed }
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to update subtask status');
      }
      throw new Error('Network error. Please try again later.');
    }
  }

  async getTaskById(taskId: string): Promise<Task> {
    try {
      const response = await api.get<ApiResponse<Task>>(`/tasks/${taskId}`);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Task not found');
      }
      throw new Error('Network error. Please try again later.');
    }
  }

  async getUserTasks(
    userId: string,
    status?: string,
    priority?: string,
    search?: string
  ): Promise<Task[]> {
    try {
      const response = await api.get<ApiResponse<Task[]>>(`/users/${userId}/tasks`, {
        params: {
          status: status !== 'all' ? status : undefined,
          priority: priority !== 'all' ? priority : undefined,
          search,
        },
      });
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch user tasks');
      }
      throw new Error('Network error. Please try again later.');
    }
  }

  async updateTask(taskId: string, taskData: Partial<Task>): Promise<Task> {
    try {
      const response = await api.put<ApiResponse<Task>>(`/tasks/${taskId}`, taskData);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to update task');
      }
      throw new Error('Network error. Please try again later.');
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    try {
      await api.delete<ApiResponse<void>>(`/tasks/${taskId}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to delete task');
      }
      throw new Error('Network error. Please try again later.');
    }
  }

  async getTaskAnalytics(userId: string): Promise<TaskAnalytics> {
    try {
      const response = await api.get<ApiResponse<TaskAnalytics>>(`/users/${userId}/analytics`);
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch task analytics');
      }
      throw new Error('Network error. Please try again later.');
    }
  }
}

export default new TaskService();