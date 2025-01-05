'use client';

import { useConfirm } from '@/hooks/use-confirm';
import { useUpdateFinanceAccount } from '@/features/finance-account/hooks/use-update-finance-account';
import { useDeleteFinanceAccount } from '@/features/finance-account/hooks/use-delete-finance-account';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CustomInputFormField } from '@/components/custom-ui/custom-input-form-field';

export const EditAccountForm = () => {
  const { updateFinanceAccountForm, updateFinanceAccount, isUpdatingFinanceAccount, accountId } = useUpdateFinanceAccount();
  const { deleteFinanceAccount, isDeletingFinanceAccount } = useDeleteFinanceAccount();
  const [ConfirmationDialog, confirm] = useConfirm('Are you sure?', 'This can not be undone');

  const isLoading = isUpdatingFinanceAccount || isDeletingFinanceAccount;

  return (
    <>
      <ConfirmationDialog />

      <Form {...updateFinanceAccountForm}>
        <form onSubmit={updateFinanceAccountForm.handleSubmit(updateFinanceAccount)}>
          <CustomInputFormField form={updateFinanceAccountForm} name='name' label='Name' placeholder='e.g Cash, Bank, Credit Card' type='text' />
          <Button type='submit' disabled={isLoading} className='w-full mt-4' size='sm'>
            Save Changes
          </Button>

          <Button
            type='button'
            disabled={isLoading}
            onClick={async () => {
              const ok = await confirm();

              if (ok) {
                deleteFinanceAccount(accountId);
              }
            }}
            variant='destructive-outline'
            className='w-full mt-4'
            size='sm'
          >
            Delete account
          </Button>
        </form>
      </Form>
    </>
  );
};
