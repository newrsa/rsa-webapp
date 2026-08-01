import { AuthUser, AuthCredentials } from '../types/auth.types';

export const authService = {
  async login(credentials: AuthCredentials): Promise<AuthUser> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!credentials.email.includes('@')) {
      throw new Error('Please enter a valid email address');
    }

    const mockUser: AuthUser = {
      id: 'usr_10293',
      name: credentials.email.split('@')[0].toUpperCase(),
      email: credentials.email,
      token: 'jwt_mock_token_992123',
    };

    localStorage.setItem('auth_token', mockUser.token);
    return mockUser;
  },

  async logout(): Promise<void> {
    localStorage.removeItem('auth_token');
  },
};
