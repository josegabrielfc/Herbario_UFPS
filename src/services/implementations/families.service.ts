import { ApiResponse, ApiErrorResponse, FamilyResponse } from "../types/ResponseTypes";
import { CreateFamilyData, UpdateFamilyData } from "../types/BodyTypes";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export class FamiliesService {
  async getByHerbariumId(id: number): Promise<FamilyResponse[]> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/home/getFamiliesById/${id}`, token ? {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      } : { });
      const json = await response.json() as ApiResponse<FamilyResponse[]> | ApiErrorResponse;
  
      if (json.statusCode === 404 || !json.data) {
        console.warn(`No families found for herbarium ID: ${id}`);
        return [];
      }
  
      return (json as ApiResponse<FamilyResponse[]>).data;
    } catch (error) {
      console.error('Error fetching families:', error);
      return [];
    }
  }

  async create(data: CreateFamilyData): Promise<FamilyResponse[]> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/home/createFamily`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
  
      const json = await response.json() as ApiResponse<FamilyResponse[]> | ApiErrorResponse;
  
      if (!response.ok) {
        throw new Error(json.message || 'Error al crear la familia');
      }
  
      return (json as ApiResponse<FamilyResponse[]>).data;
    } catch (error) {
      console.error('Error creating family:', error);
      throw error;
    }
  }

  async update(id: number, data: Partial<UpdateFamilyData>): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/home/updateFamily/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const json = await response.json() as ApiErrorResponse;
        throw new Error(json.message || 'Error al actualizar la familia');
      }
    } catch (error) {
      console.error('Error updating family:', error);
      throw error;
    }
  }

  async toggleStatus(id: number): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/home/toggleFamilyStatus/${id}`, {
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
      console.error('Error toggling family status:', error);
      throw error;
    }
  }

  async softDelete(id: number): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/home/softDeleteFamily/${id}`, {
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
      console.error('Error soft deleting family:', error);
      throw error;
    }
  }
}