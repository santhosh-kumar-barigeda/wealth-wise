'use client';

import { PlusIcon } from 'lucide-react';

import { useCreateTransactionState } from '@/features/transaction/hooks/use-create-transaction-state';
import { useGetAllTransactions } from '@/features/transaction/hooks/use-get-all-transactions';
import { useDeleteAllTransactions } from '@/features/transaction/hooks/use-delete-all-transactions';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTable } from '@/components/shared/data-table';
import { transactionColumns } from '@/features/transaction/components/transaction-columns';

export default function TransactionsPage() {
  const { onOpen } = useCreateTransactionState();
  const { transactions, isTransactionsLoading } = useGetAllTransactions();
  const { deleteAllTransactions, isDeletingAllTransactions } = useDeleteAllTransactions();

  const isLoading = isTransactionsLoading || isDeletingAllTransactions;

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
          <CardTitle className='text-xl line-clamp-1'>Transactions History</CardTitle>
          <Button onClick={onOpen} size='sm' disabled={isLoading}>
            <PlusIcon />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable columns={transactionColumns} data={transactions} filterKey='payee' OnDelete={(ids) => deleteAllTransactions(ids)} />
        </CardContent>
      </Card>
    </div>
  );
}
