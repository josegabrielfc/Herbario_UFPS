import { create } from 'zustand';
import { Services } from '../../../../services/services';

interface HerbariumType {
  id: number;
  name: string;
  status: boolean | undefined;
  is_deleted: boolean | undefined;
}

interface FamilyType {
  id: number;
  name: string;
  description: string;
  herbarium_type_id: number;
  status: boolean | undefined;
  is_deleted: boolean | undefined;
}

interface PlantType {
  id: number;
  common_name: string;
  scientific_name: string;
  family_id: number;
  quantity: number;
  description: string | undefined;
  refs: string | undefined;
  status: boolean | undefined;
  is_deleted: boolean | undefined;
}

interface HerbariumStore {
  herbariums: HerbariumType[];
  families: FamilyType[];
  plants: PlantType[];
  loading: boolean;
  error: string | null;
  // Actions
  fetchHerbariums: () => Promise<void>;
  fetchFamiliesByHerbarium: (herbariumId: number) => Promise<void>;
  fetchPlantsByFamily: (herbariumId: number, familyId: number) => Promise<void>;
  
  // Refresh actions
  refreshHerbariums: () => Promise<void>;
  refreshFamilies: (herbariumId: number) => Promise<void>;
  refreshPlants: (herbariumId: number, familyId: number) => Promise<void>;
  
  // Combined refresh
  refreshAll: (context?: { 
    herbariumId?: number; 
    familyId?: number; 
  }) => Promise<void>;
}

export const useHerbariumStore = create<HerbariumStore>((set, get) => ({
  herbariums: [],
  families: [],
  plants: [],
  loading: false,
  error: null,

  // Fetch actions
  fetchHerbariums: async () => {
    try {
      const types = await Services.herbariums.getAll();
      set({ herbariums: types });
    } catch (error) {
      set({ error: 'Error loading herbariums' });
    }
  },

  fetchFamiliesByHerbarium: async (herbariumId: number) => {
    try {
      const families = await Services.families.getByHerbariumId(herbariumId);
      set({ families });
    } catch (error) {
      set({ error: 'Error loading families' });
    }
  },

  fetchPlantsByFamily: async (herbariumId: number, familyId: number) => {
    try {
      const plants = await Services.plants.getByIds(herbariumId, familyId);
      set({ plants });
    } catch (error) {
      set({ error: 'Error loading plants' });
    }
  },

  // Refresh actions with loading states
  refreshHerbariums: async () => {
    set({ loading: true });
    await get().fetchHerbariums();
    set({ loading: false });
  },

  refreshFamilies: async (herbariumId: number) => {
    set({ loading: true });
    await get().fetchFamiliesByHerbarium(herbariumId);
    set({ loading: false });
  },

  refreshPlants: async (herbariumId: number, familyId: number) => {
    set({ loading: true });
    await get().fetchPlantsByFamily(herbariumId, familyId);
    set({ loading: false });
  },

  // Combined refresh that updates all relevant data
  refreshAll: async (context) => {
    set({ loading: true, error: null });
    
    try {
      await get().fetchHerbariums();
      
      if (context?.herbariumId) {
        await get().fetchFamiliesByHerbarium(context.herbariumId);
        
        if (context?.familyId) {
          await get().fetchPlantsByFamily(context.herbariumId, context.familyId);
        }
      }
    } catch (error) {
      set({ error: 'Error refreshing data' });
    } finally {
      set({ loading: false });
    }
  }
}));