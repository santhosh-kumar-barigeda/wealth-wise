'use client';

import { useGetAllFinanceAccounts } from '@/features/finance-account/hooks/use-get-all-finance-accounts';
import { useGetAllCategories } from '@/features/category/hooks/use-get-all-categories';
import { useCreateTransaction } from '@/features/transaction/hooks/use-create-transaction';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CustomInputFormField } from '@/components/custom-ui/custom-input-form-field';
import { CustomSelectFormField } from '@/components/custom-ui/custom-select-form-field';
import { CustomTextareaFormField } from '@/components/custom-ui/custom-textarea-form-field';
import { CustomDatePickerFormField } from '@/components/custom-ui/custom-date-picker';

export const CreateTransactionForm = () => {
  const { createTransactionForm, createTransaction, isCreatingTransaction } = useCreateTransaction();
  const { categories, isCategoriesLoading } = useGetAllCategories();
  const { financeAccounts, isFinanceAccountsLoading } = useGetAllFinanceAccounts();

  const isLoading = isCategoriesLoading || isCreatingTransaction || isFinanceAccountsLoading;

  const financeAccountOptions = financeAccounts.map((financeAccount) => ({
    label: financeAccount.name,
    value: financeAccount.id,
  }));

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <Form {...createTransactionForm}>
      <form onSubmit={createTransactionForm.handleSubmit(createTransaction)} className='space-y-4'>
        <CustomSelectFormField
          form={createTransactionForm}
          name='financeAccountId'
          label='Account'
          placeholder='Choose an Account'
          options={financeAccountOptions}
        />

        <CustomSelectFormField
          form={createTransactionForm}
          name='categoryId'
          label='Category'
          placeholder='Choose a Category'
          options={categoryOptions}
        />
        <CustomDatePickerFormField form={createTransactionForm} name='date' label='Transaction Date' placeholder='Pick a start date' />
        <CustomInputFormField form={createTransactionForm} name='payee' label='Payee' placeholder='e.g. DMart, Myntra' type='text' />
        <CustomInputFormField form={createTransactionForm} name='amount' label='Amount' placeholder='e.g. 100.50' type='number' />

        <CustomTextareaFormField
          form={createTransactionForm}
          name='notes'
          label='Transaction Notes (Optinoal)'
          placeholder='e.g. Grocery Shopping, Monthly Rent'
          rows={3}
        />

        <Button type='submit' disabled={isLoading} className='w-full mt-4' size='sm'>
          Create transaction
        </Button>
      </form>
    </Form>
  );
};
