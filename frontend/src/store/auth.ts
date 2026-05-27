import { create } from 'zustand';
import api from '@/lib/api';

interface AuthState {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: async (email, password) => {
    const res = await api.post('/auth/login/', { username: email, password });
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    set({ isAuthenticated: true });
  },
  signup: async (email, password) => {
    await api.post('/auth/signup/', { email, password });
    const res = await api.post('/auth/login/', { username: email, password });
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    set({ isAuthenticated: false });
  },
  checkAuth: () => {
    const token = localStorage.getItem('access_token');
    set({ isAuthenticated: !!token });
  },
}));
