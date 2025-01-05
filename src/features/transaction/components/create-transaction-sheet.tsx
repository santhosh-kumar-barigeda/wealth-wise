'use client';

import { useCreateTransactionState } from '@/features/transaction/hooks/use-create-transaction-state';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { CreateTransactionForm } from '@/features/transaction/components/create-transaction-form';

export const CreateTransactionSheet = () => {
  const { isOpen, onClose } = useCreateTransactionState();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className='mb-8 space-y-0'>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Create a new transaction to track.</SheetDescription>
        </SheetHeader>

        <CreateTransactionForm />
      </SheetContent>
    </Sheet>
  );
};
