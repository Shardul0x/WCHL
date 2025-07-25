import { create } from 'zustand';

export const useIdeaStore = create((set, get) => ({
  ideas: [],
  publicIdeas: [],
  stats: { totalIdeas: 0, publicIdeas: 0, totalUsers: 0 },
  loading: false,

  submitIdea: async (actor, ideaData) => {
    set({ loading: true });
    // Mock submission
    setTimeout(() => {
      set({ loading: false });
    }, 1000);
    return 'idea_' + Date.now();
  },

  loadUserIdeas: async (actor) => {
    set({ loading: true });
    setTimeout(() => {
      set({ ideas: [], loading: false });
    }, 500);
  },

  loadStats: async (actor) => {
    set({ stats: { totalIdeas: 0, publicIdeas: 0, totalUsers: 1 } });
  },
}));
