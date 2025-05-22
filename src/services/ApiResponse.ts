export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  timestamp: string;
  data: T;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  data: null;
}

export interface PlantResponse {
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