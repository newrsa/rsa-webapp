import { useState } from 'react';
import { AuthUser, AuthState } from '../types/auth.types';
import { authService } from '../services/authService';

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: {
      id: 'usr_demo',
      name: 'Senior Frontend Architect',
      email: 'architect@pathway.io',
      token: 'mock_jwt_token',
    },
    isAuthenticated: true,
    isLoading: false,
    error: null,
  });

  const login = async (email: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const user = await authService.login({ email });
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Login failed',
      }));
    }
  };

  const logout = async () => {
    await authService.logout();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    logout,
  };
}
