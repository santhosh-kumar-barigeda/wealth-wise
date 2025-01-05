import { create } from 'zustand';
import { TransactionResponse } from '@/features/transaction/schemas/transaction-schemas';

type EditTransactionState = {
  transaction: TransactionResponse;
  isOpen: boolean;
  onOpen: (transaction: TransactionResponse) => void;
  onClose: () => void;
};

const initialState = {
  id: '',
  amount: 0,
  payee: '',
  notes: '',
  categoryId: '',
  financeAccountId: '',
  date: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const useEditTransactionState = create<EditTransactionState>((set) => ({
  transaction: initialState,
  isOpen: false,
  onOpen: (transaction) => set({ isOpen: true, transaction }),
  onClose: () => set({ isOpen: false, transaction: initialState }),
}));
