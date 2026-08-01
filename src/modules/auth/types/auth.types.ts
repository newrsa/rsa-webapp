export interface AuthUser {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface AuthCredentials {
  email: string;
  password?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
