import { LoginCredentials } from "../types";
import { ApiResponse, ApiErrorResponse, LoginResponse } from "./types/ResponseTypes";

// En cualquier archivo donde uses la URL de la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  
  export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
  
      const json = await response.json() as ApiResponse<LoginResponse> | ApiErrorResponse;

      if ('data' in json && json.data === null) throw new Error(json.message);

      const loginResponse = json as ApiResponse<LoginResponse>;
      
      // Guardar token en localStorage
      localStorage.setItem('token', loginResponse.data.token);
      localStorage.setItem('user', JSON.stringify(loginResponse.data.user));

      return loginResponse.data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };
  
  export const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };
  
  export const getToken = (): string | null => {
    return localStorage.getItem('token');
  };

  export const getUser = (): LoginResponse['user'] | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };