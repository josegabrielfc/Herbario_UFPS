export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ValidateOtpCredentials {
  email: string;
  code: string;
}

export interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  role_id: 1;
}