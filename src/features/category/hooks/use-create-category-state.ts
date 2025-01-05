import { create } from 'zustand';

type CreateCategoryState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCreateCategoryState = create<CreateCategoryState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
