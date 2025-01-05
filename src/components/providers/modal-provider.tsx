'use client';

import { useMountedState } from 'react-use';

import { CreateAccountSheet } from '@/features/finance-account/components/create-account-sheet';
import { EditAccountSheet } from '@/features/finance-account/components/edit-account-sheet';

import { CreateCategorySheet } from '@/features/category/components/create-category-sheet';
import { EditCategorySheet } from '@/features/category/components/edit-category-sheet';

import { CreateTransactionSheet } from '@/features/transaction/components/create-transaction-sheet';
import { EditTransactionSheet } from '@/features/transaction/components/edit-transaction-sheet';

export const ModalProvider = () => {
  const isMounted = useMountedState();
  if (!isMounted) return null;

  return (
    <>
      <CreateAccountSheet />
      <EditAccountSheet />

      <CreateCategorySheet />
      <EditCategorySheet />

      <CreateTransactionSheet />
      <EditTransactionSheet />
    </>
  );
};
