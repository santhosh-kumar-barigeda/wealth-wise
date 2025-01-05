import { create } from 'zustand';

type CreateFinanceAccountState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCreateFinanceAccountState = create<CreateFinanceAccountState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
