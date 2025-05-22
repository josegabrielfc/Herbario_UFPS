import { ApiResponse, ApiErrorResponse, PlantResponse } from "./ApiResponse";

interface HerbariumType {
  id: number;
  name: string;
  description: string;
  status: boolean;
  is_deleted: boolean;
}

interface Family {
  id: number;
  herbarium_type_id: number;
  name: string;
  description: string;
  status: boolean;
  is_deleted: boolean;
}

interface Plant {
  id: number;
  family_id: number;
  common_name: string;
  scientific_name: string;
  quantity: number;
  description: string;
  status: boolean;
  is_deleted: boolean;
  family_name: string;
  herbarium_name: string;
  refs: string;
}

interface PlantImg {
    id: number;
    plant_id: number;
    image_url: string;
    description?: string;
    created_at: string;
}

interface CreateHerbariumData {
    name: string;
    description: string;
}

interface CreateFamilyData {
  herbarium_type_id: number;
  name: string;
  description: string;
}

interface CreatePlantData {
  family_id: number;
  common_name: string;
  scientific_name: string;
  quantity: number;
  description: string;
  refs: string;
}

export const getHerbariumTypes = async (): Promise<HerbariumType[]> => {
  try {
    const response = await fetch('http://localhost:3000/home/getHerbariums');
    const json = await response.json() as ApiResponse<HerbariumType[]>;
    return json.data;
  } catch (error) {
    console.error('Error fetching herbarium types:', error);
    return [];
  }
};

export const getFamiliesByHerbariumId = async (id: number): Promise<Family[]> => {
  try {
    const response = await fetch(`http://localhost:3000/home/getFamiliesById/${id}`);
    const json = await response.json() as ApiResponse<Family[]> | ApiErrorResponse;

    if (json.statusCode === 404 || !json.data) {
      console.warn(`No families found for herbarium ID: ${id}`);
      return [];
    }

    return (json as ApiResponse<Family[]>).data;
  } catch (error) {
    console.error('Error fetching families:', error);
    return [];
  }
};

export const getPlantsByIds = async (herbariumTypeId: number, familyId: number): Promise<Plant[]> => {
  try {
    const response = await fetch(`http://localhost:3000/home/getPlantByIds/${herbariumTypeId}/${familyId}`);
    const json = await response.json() as ApiResponse<Plant[]> | ApiErrorResponse;

    if (json.statusCode === 404 || !json.data) {
      console.warn(`No plants found for herbarium type ID: ${herbariumTypeId} and family ID: ${familyId}`);
      return [];
    }

    return (json as ApiResponse<Plant[]>).data;
  } catch (error) {
    console.error('Error fetching plants:', error);
    return [];
  }
};

export const uploadPlantImage = async (
    plantId: number,
    imageFile: File,
    description?: string
): Promise<PlantImg> => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);
        if (description) {
            formData.append('description', description);
        }

        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/img/plants/${plantId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        const json = await response.json() as ApiResponse<PlantImg>;
        
        if (!response.ok) {
            throw new Error(json.message);
        }

        return json.data;
    } catch (error) {
        console.error('Error uploading plant image:', error);
        throw error;
    }
};

export const createHerbarium = async (data: CreateHerbariumData): Promise<HerbariumType> => {
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
  
      const json = await response.json() as ApiResponse<HerbariumType>;
  
      if (!response.ok) {
        throw new Error(json.message || 'Error al crear el tipo de herbario');
      }
  
      return json.data;
    } catch (error) {
      console.error('Error creating herbarium:', error);
      throw error;
    }
  };

  export const getAllPlants = async (): Promise<PlantResponse[]> => {
    try {
      const response = await fetch('http://localhost:3000/home/getPlants');
      const json = await response.json() as ApiResponse<PlantResponse[]>;
  
      if (!response.ok) {
        throw new Error(json.message || 'Error fetching plants');
      }
  
      return json.data;
    } catch (error) {
      console.error('Error fetching all plants:', error);
      return [];
    }
  };

  export const getPlantImages = async (plantId: number): Promise<PlantImg[]> => {
    try {
      const response = await fetch(`http://localhost:3000/img/getImgPlantsById/${plantId}`);
      const json = await response.json() as ApiResponse<PlantImg[]> | ApiErrorResponse;
  
      if (json.statusCode === 404 || !json.data) {
        console.warn(`No images found for plant ID: ${plantId}`);
        return [];
      }
  
      return (json as ApiResponse<PlantImg[]>).data;
    } catch (error) {
      console.error('Error fetching plant images:', error);
      return [];
    }
  };

  export const createFamily = async (data: CreateFamilyData): Promise<any> => {
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
  
      const json = await response.json();
  
      if (!response.ok) {
        throw new Error(json.message || 'Error al crear la familia');
      }
  
      return json.data;
    } catch (error) {
      console.error('Error creating family:', error);
      throw error;
    }
  };

  export const createPlant = async (data: CreatePlantData): Promise<any> => {
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
  
      const json = await response.json();
  
      if (!response.ok) {
        throw new Error(json.message || 'Error al crear la planta');
      }
  
      return json.data;
    } catch (error) {
      console.error('Error creating plant:', error);
      throw error;
    }
  };