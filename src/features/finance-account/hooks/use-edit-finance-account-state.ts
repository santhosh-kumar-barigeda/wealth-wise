import { create } from 'zustand';
import { FinanceAccountResponse } from '@/features/finance-account/schemas/finance-account-schemas';

type EditFinanceAccountState = {
  financeAccount: FinanceAccountResponse;
  isOpen: boolean;
  onOpen: (financeAccount: FinanceAccountResponse) => void;
  onClose: () => void;
};

const initialState = {
  id: '',
  name: '',
  userId: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const useEditFinanceAccountState = create<EditFinanceAccountState>((set) => ({
  financeAccount: initialState,
  isOpen: false,
  onOpen: (financeAccount) => set({ isOpen: true, financeAccount }),
  onClose: () => set({ isOpen: false, financeAccount: initialState }),
}));
