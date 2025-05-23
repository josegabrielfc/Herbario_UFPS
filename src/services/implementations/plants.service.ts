import { ApiResponse, ApiErrorResponse, PlantResponse } from "../types/ResponseTypes";
import { CreatePlantData, UpdatePlantData } from "../types/BodyTypes";

export class PlantsService {
  async getAll(): Promise<PlantResponse[]> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/home/getPlants', token ? {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      } : { });
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
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/home/getPlantByIds/${herbariumTypeId}/${familyId}`, token ? {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      } : { });
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

  async update(id: number, data: UpdatePlantData): Promise<void> {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/updatePlant/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const json = await response.json() as ApiErrorResponse;
            throw new Error(json.message || 'Error al actualizar la planta');
        }
    } catch (error) {
        console.error('Error updating plant:', error);
        throw error;
    }
  }

  async toggleStatus(id: number): Promise<void> {
    try {
      console.log('Toggling status for plant with ID:', id);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/togglePlantStatus/${id}`, {
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
      console.error('Error toggling plant status:', error);
      throw error;
    }
  }

  async softDelete(id: number): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/softDeletePlant/${id}`, {
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
      console.error('Error soft deleting plant:', error);
      throw error;
    }
  }
}
