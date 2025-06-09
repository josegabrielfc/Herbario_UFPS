import { LoginCredentials, ValidateOtpCredentials, CreateUserFormData } from "../types";
import { ApiResponse, ApiErrorResponse, LoginResponse, CreateUserResponse } from "./types/ResponseTypes";

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

  export const sendOtpCode = async (email: string): Promise<ApiResponse<null>> => {
    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const json = await response.json() as ApiResponse<null> | ApiErrorResponse;

      if (json.statusCode !== 200) {
        throw new Error(json.message);
      }

      return json as ApiResponse<null>;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  };

  export const validateOtpCode = async (credentials: ValidateOtpCredentials): Promise< ApiResponse<LoginResponse> > => {
    try {
      const response = await fetch(`${API_URL}/auth/validate-code`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });
    
        const json = await response.json() as ApiResponse<LoginResponse> | ApiErrorResponse;
        
        if ('data' in json && json.data === null) throw new Error(json.message);

        const res = json as ApiResponse<LoginResponse>;
        
        // Guardar token en localStorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        return res;
    } catch (error) {
        console.error('Error al validar:', error);
        throw error;
    }
  }
  
  export const updatePassword = async (newPassword: string): Promise<ApiResponse<null>> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No hay token disponible');
      }

      const response = await fetch(`${API_URL}/auth/update-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ newPassword })
      });

      const json = await response.json() as ApiResponse<null> | ApiErrorResponse;

      if (json.statusCode !== 200) {
        throw new Error(json.message);
      }

      return json as ApiResponse<null>;
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      throw error;
    }
  }

  export const createUser = async (data: CreateUserFormData): Promise< ApiResponse<CreateUserResponse> > => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No hay token disponible');
      }

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const json = await response.json() as ApiResponse<CreateUserResponse> | ApiErrorResponse;

      if (json.statusCode !== 200) {
        throw new Error(json.message);
      }

      return json as ApiResponse<CreateUserResponse>;
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      throw error;
    }
  }