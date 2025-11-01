import { create } from 'zustand';
import { AnonymousIdentity } from '@dfinity/agent';
import toast from 'react-hot-toast';

import { createActor } from '../../../declarations/idea_vault';

const canisterId = process.env.CANISTER_ID_IDEA_VAULT;

if (!canisterId) {
  console.error("⚠️ CANISTER_ID_IDEA_VAULT not found in environment");
}

const anonymousIdentity = new AnonymousIdentity();
const anonymousPrincipal = anonymousIdentity.getPrincipal();

const createDefaultActor = () => {
  if (!canisterId) {
    console.error("Cannot create actor: canister ID is missing");
    return null;
  }
  
  const agentOptions = {
    host: process.env.DFX_NETWORK === 'ic'
      ? 'https://ic0.app'
      : 'http://127.0.0.1:4944',
    identity: anonymousIdentity,
  };

  return createActor(canisterId, { agentOptions });
};

export const useAuthStore = create((set, get) => ({
  isAuthenticated: false,
  principal: anonymousPrincipal,
  actor: null,
  loading: false,

  initialize: async () => {
    set({ loading: true });
    try {
      const actor = createDefaultActor();
      
      if (!actor) {
        throw new Error('Failed to create actor - check canister ID configuration');
      }

      // Don't call getStats - just create the actor
      set({ 
        actor, 
        isAuthenticated: false,
        loading: false 
      });
      
      console.log('✅ Actor initialized successfully');
      console.log('📍 Principal:', anonymousPrincipal.toText());
    } catch (error) {
      console.error('❌ Failed to initialize actor:', error);
      toast.error('Failed to connect to blockchain. Please check your local replica.');
      set({ loading: false });
    }
  },

  login: async () => {
    set({ isAuthenticated: true });
    toast.success('Connected to blockchain!');
  },

  logout: async () => {
    set({ isAuthenticated: false });
    toast.info('Disconnected from blockchain');
  },
}));
