export interface CreateHerbariumData {
  name: string;
  description?: string;
}

export interface UpdateHerbariumData {
  name?: string;
  description?: string;
}

export interface CreateFamilyData {
  herbarium_type_id: number;
  name: string;
  description: string;
}

export interface CreatePlantData {
  family_id: number;
  common_name: string;
  scientific_name: string;
  quantity: number;
  description?: string;
  refs?: string;
}

export interface UploadPlantImagesData {
  images: (File | null)[];
  descriptions: string[];
}
