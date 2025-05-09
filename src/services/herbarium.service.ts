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
}

interface ApiResponse<T> {
  statusCode: number;
  message: string;
  timestamp: string;
  data: T;
}

interface ApiErrorResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  data: null;
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