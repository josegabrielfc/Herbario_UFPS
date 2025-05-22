import { ApiResponse, ApiErrorResponse, HerbariumResponse } from "../types/ResponseTypes";
import { CreateHerbariumData } from "../types/BodyTypes";

export class HerbariumsService {
  async getAll(): Promise<HerbariumResponse[]> {
    try {
      const response = await fetch('http://localhost:3000/home/getHerbariums');
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
}
