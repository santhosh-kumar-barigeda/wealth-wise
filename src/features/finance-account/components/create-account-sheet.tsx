'use client';

import { useCreateFinanceAccountState } from '@/features/finance-account/hooks/use-create-finance-account-state';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { CreateAccountForm } from '@/features/finance-account/components/create-account-form';

export const CreateAccountSheet = () => {
  const { isOpen, onClose } = useCreateFinanceAccountState();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className='mb-8 space-y-0'>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>Create a new account to track your transactions.</SheetDescription>
        </SheetHeader>

        <CreateAccountForm />
      </SheetContent>
    </Sheet>
  );
};
