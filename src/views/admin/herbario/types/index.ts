export interface BaseFormState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface ImageUpload {
  file: File | null;
  description: string;
}

export interface Plant {
  id: number;
  common_name: string;
  scientific_name: string;
}

export interface Family {
  id: number;
  name: string;
}

export interface SelectOption {
  id: number;
  name: string;
}

export interface SelectedIds {
  herbariumId: string;
  familyId: string;
  plantId: string;
}
