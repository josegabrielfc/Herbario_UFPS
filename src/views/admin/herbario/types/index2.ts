export interface Plant {
    id: number;
    common_name: string;
    scientific_name: string;
    family_id: number;
    images: PlantImg[];
  }
  
  export interface Family {
    id: number;
    name: string;
    description?: string;
  }
  
  export interface HerbariumType {
    id: number;
    name: string;
    description?: string;
  }
  
  export interface PlantImg {
    id: number;
    plant_id: number;
    url: string;
    description?: string;
  }
  
  export interface CreateHerbariumData {
    name: string;
    description?: string;
  }
  
  export interface CreateFamilyData {
    name: string;
    description?: string;
  }
  
  export interface CreatePlantData {
    common_name: string;
    scientific_name: string;
    family_id: number;
    description?: string;
  }
  
  export interface UploadImagesData {
    plant_id: number;
    images: File[];
    descriptions: string[];
  }