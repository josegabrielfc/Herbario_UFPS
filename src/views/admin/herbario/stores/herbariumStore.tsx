import { create } from 'zustand';
import { Services } from '../../../../services/services';

interface HerbariumType {
  id: number;
  name: string;
  status: boolean | undefined;
  is_deleted: boolean | undefined;
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
      const types = await Services.herbariums.getAll();
      set({ herbariums: types });
    } catch (error) {
      set({ error: 'Error loading herbariums' });
    } finally {
      set({ loading: false });
    }
  },
}));