import { create } from 'zustand';
import toast from 'react-hot-toast';

export const useIdeaStore = create((set, get) => ({
  ideas: [],
  publicIdeas: [],
  stats: { totalIdeas: 0, publicIdeas: 0, totalUsers: 0 },
  loading: false,

  submitIdea: async (actor, ideaData) => {
    if (!actor) {
      toast.error('Authentication error. Please log in again.');
      return;
    }
    set({ loading: true });
    const toastId = toast.loading('Submitting your idea to the blockchain...');

    try {
      const result = await actor.submitIdea(ideaData);
      if ('ok' in result) {
        toast.success(`Idea secured! ID: ${result.ok}`, { id: toastId });
        get().loadUserIdeas(actor); // Refresh user ideas after submission
        get().loadStats(actor); // Refresh stats
        return result.ok;
      } else {
        throw new Error(result.err);
      }
    } catch (error) {
      toast.error(`Submission failed: ${error.message}`, { id: toastId });
    } finally {
      set({ loading: false });
    }
  },

  loadUserIdeas: async (actor) => {
    if (!actor) return;
    set({ loading: true });
    try {
      const userIdeas = await actor.getUserIdeas();
      set({ ideas: userIdeas, loading: false });
    } catch (error) {
      toast.error(`Failed to load your ideas: ${error.message}`);
      set({ loading: false });
    }
  },
  
  loadPublicIdeas: async (actor) => {
    if (!actor) return;
    set({ loading: true });
    try {
        const feed = await actor.getPublicFeed([], [], []); // No filters
        set({ publicIdeas: feed, loading: false });
    } catch (error) {
        toast.error(`Failed to load public feed: ${error.message}`);
        set({ loading: false });
    }
  },

  loadStats: async (actor) => {
    if (!actor) return;
    try {
      const platformStats = await actor.getStats();
      // Convert BigInts from Motoko to Numbers for JavaScript
      const formattedStats = {
        totalIdeas: Number(platformStats.totalIdeas),
        publicIdeas: Number(platformStats.publicIdeas),
        totalUsers: Number(platformStats.totalUsers),
      };
      set({ stats: formattedStats });
    } catch (error) {
      toast.error(`Failed to load platform stats: ${error.message}`);
    }
  },
}));
