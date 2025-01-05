'use client';

import { EditIcon, MoreHorizontalIcon, TrashIcon } from 'lucide-react';

import { useEditFinanceAccountState } from '@/features/finance-account/hooks/use-edit-finance-account-state';
import { useDeleteFinanceAccount } from '@/features/finance-account/hooks/use-delete-finance-account';
import { FinanceAccountResponse } from '@/features/finance-account/schemas/finance-account-schemas';
import { useConfirm } from '@/hooks/use-confirm';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface AccountActionsProps {
  account: FinanceAccountResponse;
}

export function AccountActions({ account }: AccountActionsProps) {
  const [ConfirmationDialog, confirm] = useConfirm('Are you sure?', 'This can not be undone');
  const { onOpen } = useEditFinanceAccountState();
  const { deleteFinanceAccount } = useDeleteFinanceAccount();

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
              onOpen(account);
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
                deleteFinanceAccount(account.id);
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
