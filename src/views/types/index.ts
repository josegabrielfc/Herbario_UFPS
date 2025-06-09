export interface PlantImageType {
  url: string;
  description: string;
}

export interface PlantType {
  id: number;
  commonName: string;
  scientificName: string;
  quantity: string;
  description?: string;
  image: string;
  images: PlantImageType[];  // Cambiamos el tipo de string[] a PlantImageType[]
  refs?: string;
  herbarium_name: string;
  section: string;// Sección o family_name
  image_id: number;
  status?: boolean;
}

export interface Plant {
  herbarium_name: string;
  refs: string;
  id: number;
  common_name: string;
  scientific_name: string;
  quantity: { toString: () => string };
  description: string;
  family_name: string;
}
