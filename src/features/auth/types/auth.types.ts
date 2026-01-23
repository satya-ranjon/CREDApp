/**
 * Auth Types
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface AuthState {
  token: string | null;
  user: AuthResponse['user'] | null;
  isLoading: boolean;
  error: string | null;
}
