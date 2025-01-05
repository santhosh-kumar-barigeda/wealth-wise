'use client';

import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { AccountActions } from '@/features/finance-account/components/account-actions';
import { FinanceAccountResponse } from '@/features/finance-account/schemas/finance-account-schemas';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export const accountColumns: ColumnDef<FinanceAccountResponse>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label='Select row' />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          className='p-0 w-full justify-start hover:bg-transparent'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          className='p-0 w-full justify-start hover:bg-transparent'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created At
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return format(new Date(row.original.createdAt), 'MMM do, yyyy');
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <AccountActions account={row.original} />,
  },
];
