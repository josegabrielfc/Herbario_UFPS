import { ApiResponse, ApiErrorResponse, FamilyResponse } from "../types/ResponseTypes";
import { CreateFamilyData } from "../types/BodyTypes";

export class FamiliesService {
  async getByHerbariumId(id: number): Promise<FamilyResponse[]> {
    try {
      const response = await fetch(`http://localhost:3000/home/getFamiliesById/${id}`);
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
      const response = await fetch('http://localhost:3000/home/createFamily', {
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
}