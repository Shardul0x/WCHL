import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
  isAuthenticated: false,
  principal: null,
  actor: null,
  loading: false,

  initialize: async () => {
    // Mock initialization
    set({ loading: false });
  },

  login: async () => {
    set({ loading: true });
    // Mock login
    setTimeout(() => {
      set({
        isAuthenticated: true,
        principal: { toString: () => 'demo-principal-123' },
        actor: {},
        loading: false
      });
    }, 1000);
  },

  logout: async () => {
    set({
      isAuthenticated: false,
      principal: null,
      actor: null,
    });
  },
}));
