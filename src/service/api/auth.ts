// src/services/authService.ts
import axios from 'axios';
import api from './api';
import { LoginCredentials, RegisterCredentials, AuthResponse, User } from '../../types/User';
import { ApiResponse } from '../../types/api';

class AuthService {

  /**
   * Login a user
   * @param credentials User login credentials
   * @returns Promise with auth data including user and token
   */

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);  
      if (response.data.data) {
        localStorage.setItem('token', response.data.data.token);
      }
      
      return response.data.data;
    } catch (error) {
      // Better error handling
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to login');
      }
      throw new Error('Network error. Please try again later.');
    }
  }

  /**
   * Register a new user
   * @param userData User registration data
   * @returns Promise with auth data including user and token
   */

  async register(userData: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/register', userData);
      
      // Store the token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Registration failed');
      }
      throw new Error('Network error. Please try again later.');
    }
  }

  /**
   * Logout user
   */

  logout(): void {
    localStorage.removeItem('token');
    // Optional: call an API endpoint to invalidate the token on the server
    // api.post('/auth/logout');
  }

  /**
   * Get current user profile
   * @returns Promise with user data
   */

  async getCurrentUser(): Promise<User> {
    try {
      const response = await api.get<User>('/auth/me');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to get user profile');
      }
      throw new Error('Network error. Please try again later.');
    }
  }

  /**
   * Check if user is authenticated
   * @returns boolean
   */
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

export default new AuthService();