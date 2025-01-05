import { create } from 'zustand';
import { CategoryResponse } from '@/features/category/schemas/category-schemas';

type EditCategoryState = {
  category: CategoryResponse;
  isOpen: boolean;
  onOpen: (category: CategoryResponse) => void;
  onClose: () => void;
};

const initialState = {
  id: '',
  name: '',
  userId: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const useEditCategoryState = create<EditCategoryState>((set) => ({
  category: initialState,
  isOpen: false,
  onOpen: (category) => set({ isOpen: true, category }),
  onClose: () => set({ isOpen: false, category: initialState }),
}));
