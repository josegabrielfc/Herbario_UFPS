export interface PlantType {
  id: number;
  commonName: string;
  scientificName: string;
  quantity: string;
  description?: string;
  image: string;
  images: string[];
  refs?: string;
  herbarium_name: string;
  section: string;// Sección o family_name
  image_id: number;
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
