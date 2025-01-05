'use client';

import { Form } from '@/components/ui/form';
import { useCreateFinanceAccount } from '@/features/finance-account/hooks/use-create-finance-account';
import { CustomInputFormField } from '@/components/custom-ui/custom-input-form-field';
import { Button } from '@/components/ui/button';

export const CreateAccountForm = () => {
  const { createFinanceAccountForm, createFinanceAccount, isCreatingFinanceAccount } = useCreateFinanceAccount();

  return (
    <Form {...createFinanceAccountForm}>
      <form onSubmit={createFinanceAccountForm.handleSubmit(createFinanceAccount)}>
        <CustomInputFormField form={createFinanceAccountForm} name='name' label='Name' placeholder='e.g Cash, Bank, Credit Card' type='text' />
        <Button type='submit' disabled={isCreatingFinanceAccount} className='w-full mt-4' size='sm'>
          Create account
        </Button>
      </form>
    </Form>
  );
};
