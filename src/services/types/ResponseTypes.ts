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

interface User {
  id: number;
  name: string;
  email: string;
  role_id: number;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface CreateUserResponse {
  user: User;
}

export interface HerbariumResponse {
  id: number;
  name: string;
  description: string;
  status: boolean;
  is_deleted: boolean;
}

export interface FamilyResponse {
  id: number;
  herbarium_type_id: number;
  name: string;
  description: string;
  status: boolean;
  is_deleted: boolean;
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
  refs: string;
  family_name: string;
  herbarium_name: string;
}

export interface PlantWithImageResponse extends PlantResponse {
  image_id: number,
  image_url: string;
}

export interface PlantImageResponse {
  id: number;
  plant_id: number;
  image_url: string;
  description?: string;
  created_at: string;
  is_deleted?: boolean;
  status?: boolean;
}
