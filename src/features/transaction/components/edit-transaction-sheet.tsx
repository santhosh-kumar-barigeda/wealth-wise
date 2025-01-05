'use client';

import { useEditTransactionState } from '@/features/transaction/hooks/use-edit-transaction-state';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { EditTransactionForm } from '@/features/transaction/components/edit-transaction-form';
import { ScrollArea } from '@/components/ui/scroll-area';

export const EditTransactionSheet = () => {
  const { isOpen, onClose } = useEditTransactionState();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='p-0'>
        <ScrollArea className='h-screen'>
          <SheetHeader className='mb-8 space-y-0 px-6 pt-6'>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Modify your transaction</SheetDescription>
          </SheetHeader>

          <div className='px-6 pb-6'>
            <EditTransactionForm />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
