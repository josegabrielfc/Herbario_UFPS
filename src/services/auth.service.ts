import { ApiResponse, ApiErrorResponse } from "./ApiResponse";

interface LoginCredentials {
    email: string;
    password: string;
  }
  
  interface LoginResponse {
    token: string;
  }
  
  export const login = async (credentials: LoginCredentials): Promise<string> => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
  
      const json = await response.json() as ApiResponse<LoginResponse>;
  
      if (!response.ok) {
        throw new Error(json.message || 'Error durante el login');
      }
  
      // Store token in localStorage
      localStorage.setItem('token', json.data.token);
  
      return json.data.token;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };
  
  export const logout = (): void => {
    localStorage.removeItem('token');
  };
  
  export const getToken = (): string | null => {
    return localStorage.getItem('token');
  };