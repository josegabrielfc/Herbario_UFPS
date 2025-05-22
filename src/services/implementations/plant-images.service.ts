import { ApiResponse, ApiErrorResponse, PlantImageResponse } from "../types/ResponseTypes";
import { UploadPlantImagesData } from "../types/BodyTypes";

export class PlantImagesService {
  async getByPlantId(plantId: number): Promise<PlantImageResponse[]> {
    try {
      const response = await fetch(`http://localhost:3000/img/getImgPlantsById/${plantId}`);
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
}
