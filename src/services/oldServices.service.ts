import { ApiResponse, ApiErrorResponse, HerbariumResponse, FamilyResponse, PlantResponse, PlantImageResponse } from "./types/ResponseTypes";
import * as BodyTypes from "./types/BodyTypes";

export const getHerbariumTypes = async (): Promise<HerbariumResponse[]> => {
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
};

export const getFamiliesByHerbariumId = async (id: number): Promise<FamilyResponse[]> => {
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
};

export const getPlantsByIds = async (herbariumTypeId: number, familyId: number): Promise<PlantResponse[]> => {
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
};

export const uploadPlantImage = async (
  plantId: number,
  data: BodyTypes.UploadPlantImagesData
): Promise<PlantImageResponse[]> => {
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
};

  export const getAllPlants = async (): Promise<PlantResponse[]> => {
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
  };

  export const getPlantImages = async (plantId: number): Promise<PlantImageResponse[]> => {
    try {
      const response = await fetch(`http://localhost:3000/img/getImgPlantsById/${plantId}`);
      const json = await response.json() as ApiResponse<PlantImageResponse[]> | ApiErrorResponse;
  
      if (json.statusCode === 404 || !json.data) {
        //console.warn(`No images found for plant ID: ${plantId}`);
        return [];
      }
  
      return (json as ApiResponse<PlantImageResponse[]>).data;
    } catch (error) {
      //console.error('Error fetching plant images:', error);
      return [];
    }
  };

  export const createHerbarium = async (data: BodyTypes.CreateHerbariumData): Promise<HerbariumResponse[]> => {
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
  };

  export const createFamily = async (data: BodyTypes.CreateFamilyData): Promise<FamilyResponse[]> => {
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
  };

  export const createPlant = async (data: BodyTypes.CreatePlantData): Promise<PlantResponse[]> => {
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
  };