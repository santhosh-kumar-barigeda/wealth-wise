import { create } from 'zustand';

type CreateTransactionState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCreateTransactionState = create<CreateTransactionState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
