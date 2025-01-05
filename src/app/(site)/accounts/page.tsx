'use client';

import { PlusIcon } from 'lucide-react';

import { useCreateFinanceAccountState } from '@/features/finance-account/hooks/use-create-finance-account-state';
import { useGetAllFinanceAccounts } from '@/features/finance-account/hooks/use-get-all-finance-accounts';
import { useDeleteAllFinanceAccounts } from '@/features/finance-account/hooks/use-delete-all-finance-accounts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTable } from '@/components/shared/data-table';
import { accountColumns } from '@/features/finance-account/components/account-columns';

export default function AccountsPage() {
  const { onOpen } = useCreateFinanceAccountState();
  const { financeAccounts, isFinanceAccountsLoading } = useGetAllFinanceAccounts();
  const { deleteAllFinanceAccounts, isDeletingAllFinanceAccounts } = useDeleteAllFinanceAccounts();

  const isLoading = isFinanceAccountsLoading || isDeletingAllFinanceAccounts;

  if (isLoading) {
    return (
      <div className='pb-10 -mt-28'>
        <Card className='border-0 drop-shadow-sm dark:border'>
          <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
            <Skeleton className='h-9 w-40' />
            <Skeleton className='h-9 w-20' />
          </CardHeader>
          <CardContent>
            <Skeleton className='h-56 w-full' />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='pb-10 -mt-28'>
      <Card className='border-0 drop-shadow-sm dark:border'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between pb-0'>
          <CardTitle className='text-xl line-clamp-1'>Accounts</CardTitle>
          <Button onClick={onOpen} size='sm' disabled={isLoading}>
            <PlusIcon />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable columns={accountColumns} data={financeAccounts} filterKey='name' OnDelete={(ids) => deleteAllFinanceAccounts(ids)} />
        </CardContent>
      </Card>
    </div>
  );
}
