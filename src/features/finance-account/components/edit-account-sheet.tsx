'use client';

import { useEditFinanceAccountState } from '@/features/finance-account/hooks/use-edit-finance-account-state';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { EditAccountForm } from '@/features/finance-account/components/edit-account-form';

export const EditAccountSheet = () => {
  const { isOpen, onClose } = useEditFinanceAccountState();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className='mb-8 space-y-0'>
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>Modify your account</SheetDescription>
        </SheetHeader>

        <EditAccountForm />
      </SheetContent>
    </Sheet>
  );
};
