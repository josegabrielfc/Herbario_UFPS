import { ApiResponse, ApiErrorResponse, PlantImageResponse, PlantWithImageResponse } from "../types/ResponseTypes";
import { UdpatePlantImage, UploadPlantImagesData } from "../types/BodyTypes";

export class PlantImagesService {

  async getAllPlantsWithImages(): Promise<PlantWithImageResponse[]> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/img/getAllPlantImages', token ? {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      } : {});

      const json = await response.json() as ApiResponse<PlantWithImageResponse[]> | ApiErrorResponse;

      if (!response.ok || !json.data) {
        console.warn('No plants with images found');
        return [];
      }

      return (json as ApiResponse<PlantWithImageResponse[]>).data;
    } catch (error) {
      console.error('Error fetching all plants with images:', error);
      return [];
    }
  }
  
  async getByPlantId(plantId: number): Promise<PlantImageResponse[]> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/img/getImgPlantsById/${plantId}`, token ? {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      } : { });
      const json = await response.json() as ApiResponse<PlantImageResponse[]> | ApiErrorResponse;
  
      if (json.statusCode === 404 || !json.data) {
        console.warn(`No images found for plant ID: ${plantId}`);
        return [];
      }
  
      return (json as ApiResponse<PlantImageResponse[]>).data;
    } catch (error) {
      console.error('Error fetching plant images:', error);
      return [];
    }
  }

  async upload(plantId: number, data: UploadPlantImagesData): Promise<PlantImageResponse[]> {
    try {
      const formData = new FormData();
      
      // Solo agregar las imágenes y descripciones que existan
      data.images.forEach((image, index) => {
        if (image) {
          formData.append('images', image);
          formData.append('descriptions', data.descriptions[index] || '');
        }
      });
  
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/img/plants/${plantId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
  
      const json = await response.json() as ApiResponse<PlantImageResponse[]> | ApiErrorResponse;
      
      if (!response.ok) {
        throw new Error(json.message);
      }
  
      return (json as ApiResponse<PlantImageResponse[]>).data;
    } catch (error) {
      console.error('Error uploading plant images:', error);
      throw error;
    }
  }

  async updateImage(id: number, data: UdpatePlantImage): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('image', data.image);
      
      if (data.description) {
        formData.append('description', data.description);
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/img/updateImage/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const json = await response.json() as ApiErrorResponse;
        throw new Error(json.message || 'Error al actualizar la imagen');
      }
    } catch (error) {
      console.error('Error updating plant image:', error);
      throw error;
    }
  }

  async toggleStatus(id: number): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/img/toggleImageStatus/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const json = await response.json() as ApiErrorResponse;
        throw new Error(json.message || 'Error al cambiar el estado de la imagen');
      }
    } catch (error) {
      console.error('Error toggling image status:', error);
      throw error;
    }
  }

  async softDelete(id: number): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/img/softDeleteImage/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const json = await response.json() as ApiErrorResponse;
        throw new Error(json.message || 'Error al cambiar el estado de eliminación de la imagen');
      }
    } catch (error) {
      console.error('Error soft deleting image:', error);
      throw error;
    }
  }
}
