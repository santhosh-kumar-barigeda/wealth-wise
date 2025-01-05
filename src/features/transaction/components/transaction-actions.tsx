'use client';

import { EditIcon, MoreHorizontalIcon, TrashIcon } from 'lucide-react';

import { useConfirm } from '@/hooks/use-confirm';
import { useEditTransactionState } from '@/features/transaction/hooks/use-edit-transaction-state';
import { useDeleteTransaction } from '@/features/transaction/hooks/use-delete-transaction';
import { TransactionResponse } from '@/features/transaction/schemas/transaction-schemas';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface TransactionActionsProps {
  transaction: TransactionResponse;
}

export function TransactionActions({ transaction }: TransactionActionsProps) {
  const [ConfirmationDialog, confirm] = useConfirm('Are you sure?', 'This can not be undone');

  const { onOpen } = useEditTransactionState();
  const { deleteTransaction } = useDeleteTransaction();

  return (
    <>
      <ConfirmationDialog />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='size-8 p-0'>
            <MoreHorizontalIcon className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            disabled={false}
            onClick={() => {
              onOpen(transaction);
            }}
          >
            <EditIcon className='size-4' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={false}
            onClick={async () => {
              const ok = await confirm();

              if (ok) {
                deleteTransaction(transaction.id);
              }
            }}
          >
            <TrashIcon className='size-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
