import { ApiResponse, ApiErrorResponse, HerbariumResponse } from "../types/ResponseTypes";
import { CreateHerbariumData, UpdateHerbariumData } from "../types/BodyTypes";

export class HerbariumsService {
  async getAll(): Promise<HerbariumResponse[]> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/home/getHerbariums', token ? {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      } : { });
      const json = await response.json() as ApiResponse<HerbariumResponse[]> | ApiErrorResponse;
      
      if (json.statusCode === 404 || !json.data) {
        console.warn('No herbarium types found');
        return [];
      }
  
      return (json as ApiResponse<HerbariumResponse[]>).data;
    } catch (error) {
      console.error('Error fetching herbarium types:', error);
      return [];
    }
  }

  async create(data: CreateHerbariumData): Promise<HerbariumResponse[]> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/home/createHerbarium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
  
      const json = await response.json() as ApiResponse<HerbariumResponse[]> | ApiErrorResponse;
  
      if (!response.ok) {
        throw new Error(json.message || 'Error al crear el tipo de herbario');
      }
  
      return (json as ApiResponse<HerbariumResponse[]>).data;
    } catch (error) {
      console.error('Error creating herbarium:', error);
      throw error;
    }
  }

  async update(id: number, data: UpdateHerbariumData): Promise<HerbariumResponse[]> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/home/updateHerbarium/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
  
      const json = await response.json() as ApiResponse<HerbariumResponse[]> | ApiErrorResponse;
  
      if (!response.ok) {
        throw new Error(json.message || 'Error al actualizar el herbario');
      }
  
      return (json as ApiResponse<HerbariumResponse[]>).data;
    } catch (error) {
      console.error('Error updating herbarium:', error);
      throw error;
    }
  }

  async toggleStatus(id: number): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/home/toggleHerbariumStatus/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const json = await response.json() as ApiErrorResponse;
        throw new Error(json.message || 'Error al cambiar el estado');
      }
    } catch (error) {
      console.error('Error toggling herbarium status:', error);
      throw error;
    }
  }

  async softDelete(id: number): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/home/softDelete/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const json = await response.json() as ApiErrorResponse;
        throw new Error(json.message || 'Error al cambiar el estado de eliminación');
      }
    } catch (error) {
      console.error('Error soft deleting herbarium:', error);
      throw error;
    }
  }
}
