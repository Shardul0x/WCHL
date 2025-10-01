import { create } from 'zustand';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from '../../../declarations/idea_vault';
import toast from 'react-hot-toast';

export const useAuthStore = create((set, get) => ({
  isAuthenticated: false,
  principal: null,
  actor: null,
  loading: true,

  initialize: async () => {
    try {
      const authClient = await AuthClient.create();
      const isAuthenticated = await authClient.isAuthenticated();
      const identity = authClient.getIdentity();
      const principal = identity.getPrincipal();

      const canisterId = process.env.REACT_APP_IDEA_VAULT_CANISTER;
      if (!canisterId) throw new Error("REACT_APP_IDEA_VAULT_CANISTER not set");

      const actor = createActor(canisterId, {
        agentOptions: { identity },
      });

      set({ isAuthenticated, principal, actor, loading: false });
    } catch (error) {
      toast.error(`Initialization failed: ${error.message}`);
      set({ loading: false });
    }
  },

  login: async () => {
    set({ loading: true });
    try {
      const authClient = await AuthClient.create();
      await new Promise((resolve, reject) => {
        authClient.login({
          identityProvider:
            process.env.REACT_APP_DFX_NETWORK === "ic"
              ? "https://identity.ic0.app/#authorize"
              : `http://localhost:4943?canisterId=${process.env.REACT_APP_IDEA_VAULT_CANISTER}#authorize`,
          onSuccess: resolve,
          onError: reject,
        });
      });
      await get().initialize();
      toast.success('Login successful!');
    } catch {
      toast.error('Login failed. Please try again.');
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      const authClient = await AuthClient.create();
      await authClient.logout();
      set({ isAuthenticated: false, principal: null, actor: null });
      toast.success('Logged out successfully.');
    } catch {
      toast.error('Logout failed.');
    }
  },
}));
