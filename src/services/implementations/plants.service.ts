import { ApiResponse, ApiErrorResponse, PlantResponse } from "../types/ResponseTypes";
import { CreatePlantData } from "../types/BodyTypes";

export class PlantsService {
  async getAll(): Promise<PlantResponse[]> {
    try {
      const response = await fetch('http://localhost:3000/home/getPlants');
      const json = await response.json() as ApiResponse<PlantResponse[]> | ApiErrorResponse;
  
      if (!response.ok) {
        throw new Error(json.message || 'Error fetching plants');
      }
  
      return (json as ApiResponse<PlantResponse[]>).data;
    } catch (error) {
      console.error('Error fetching all plants:', error);
      return [];
    }
  }

  async getByIds(herbariumTypeId: number, familyId: number): Promise<PlantResponse[]> {
    try {
      const response = await fetch(`http://localhost:3000/home/getPlantByIds/${herbariumTypeId}/${familyId}`);
      const json = await response.json() as ApiResponse<PlantResponse[]> | ApiErrorResponse;
  
      if (json.statusCode === 404 || !json.data) {
        console.warn(`No plants found for herbarium type ID: ${herbariumTypeId} and family ID: ${familyId}`);
        return [];
      }
  
      return (json as ApiResponse<PlantResponse[]>).data;
    } catch (error) {
      console.error('Error fetching plants:', error);
      return [];
    }
  }

  async create(data: CreatePlantData): Promise<PlantResponse[]> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/createPlant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
  
      const json = await response.json() as ApiResponse<PlantResponse[]> | ApiErrorResponse;
  
      if (!response.ok) {
        throw new Error(json.message || 'Error al crear la planta');
      }
  
      return (json as ApiResponse<PlantResponse[]>).data;
    } catch (error) {
      console.error('Error creating plant:', error);
      throw error;
    }
  }
}
