'use client';

import { useConfirm } from '@/hooks/use-confirm';
import { useGetAllFinanceAccounts } from '@/features/finance-account/hooks/use-get-all-finance-accounts';
import { useGetAllCategories } from '@/features/category/hooks/use-get-all-categories';
import { useUpdateTransaction } from '@/features/transaction/hooks/use-update-transaction';
import { useDeleteTransaction } from '@/features/transaction/hooks/use-delete-transaction';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CustomInputFormField } from '@/components/custom-ui/custom-input-form-field';
import { CustomSelectFormField } from '@/components/custom-ui/custom-select-form-field';
import { CustomTextareaFormField } from '@/components/custom-ui/custom-textarea-form-field';
import { CustomDatePickerFormField } from '@/components/custom-ui/custom-date-picker';

export const EditTransactionForm = () => {
  const [ConfirmationDialog, confirm] = useConfirm('Are you sure?', 'This can not be undone');

  const { updateTransactionForm, updateTransaction, isUpdatingTransaction, transactionId } = useUpdateTransaction();
  const { deleteTransaction, isDeletingTransaction } = useDeleteTransaction();
  const { categories, isCategoriesLoading } = useGetAllCategories();
  const { financeAccounts, isFinanceAccountsLoading } = useGetAllFinanceAccounts();

  const isLoading = isCategoriesLoading || isUpdatingTransaction || isFinanceAccountsLoading || isDeletingTransaction;

  const financeAccountOptions = financeAccounts.map((financeAccount) => ({
    label: financeAccount.name,
    value: financeAccount.id,
  }));

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <>
      <ConfirmationDialog />

      <Form {...updateTransactionForm}>
        <form onSubmit={updateTransactionForm.handleSubmit(updateTransaction)} className='space-y-4'>
          <CustomSelectFormField
            form={updateTransactionForm}
            name='financeAccountId'
            label='Account'
            placeholder='Choose an Account'
            options={financeAccountOptions}
          />

          <CustomSelectFormField
            form={updateTransactionForm}
            name='categoryId'
            label='Category'
            placeholder='Choose a Category'
            options={categoryOptions}
          />

          <CustomDatePickerFormField form={updateTransactionForm} name='date' label='Transaction Date' placeholder='Pick a start date' />

          <CustomInputFormField form={updateTransactionForm} name='payee' label='Payee' placeholder='e.g. DMart, Myntra' type='text' />

          <CustomInputFormField form={updateTransactionForm} name='amount' label='Amount' placeholder='e.g. 100.50' type='number' />

          <CustomTextareaFormField
            form={updateTransactionForm}
            name='notes'
            label='Transaction Notes (Optional)'
            placeholder='e.g. Grocery Shopping, Monthly Rent'
            rows={3}
          />

          <div>
            <Button type='submit' disabled={isLoading} className='w-full mt-4' size='sm'>
              Save changes
            </Button>
            <Button
              type='button'
              disabled={isLoading}
              onClick={async () => {
                const ok = await confirm();

                if (ok) {
                  deleteTransaction(transactionId);
                }
              }}
              variant='destructive-outline'
              className='w-full mt-4'
              size='sm'
            >
              Delete account
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
