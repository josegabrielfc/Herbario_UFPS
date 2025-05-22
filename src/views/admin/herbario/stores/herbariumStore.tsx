import { create } from 'zustand';
import { getHerbariumTypes } from '../../../../services/herbarium.service';

interface HerbariumType {
  id: number;
  name: string;
}

interface HerbariumStore {
  herbariums: HerbariumType[];
  loading: boolean;
  error: string | null;
  fetchHerbariums: () => Promise<void>;
}

export const useHerbariumStore = create<HerbariumStore>((set) => ({
  herbariums: [],
  loading: false,
  error: null,
  fetchHerbariums: async () => {
    set({ loading: true, error: null });
    try {
      const types = await getHerbariumTypes();
      set({ herbariums: types });
    } catch (error) {
      set({ error: 'Error loading herbariums' });
    } finally {
      set({ loading: false });
    }
  },
}));