export interface PlantType {
    id: number,
    section: string;
    commonName: string;
    scientificName: string;
    quantity: string;
    description?: string;
    image: string;
    images: string[];
    refs?: string;
    herbarium_name: string;
  }