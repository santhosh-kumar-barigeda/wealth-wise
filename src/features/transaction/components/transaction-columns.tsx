'use client';

import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { formatCurrency } from '@/utils/finance-utils';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { TransactionResponseWithExtras } from '@/features/transaction/schemas/transaction-schemas';
import { TransactionActions } from '@/features/transaction/components/transaction-actions';
import { AccountColumn } from '@/features/transaction/components/account-cloumn';
import { CategoryColumn } from '@/features/transaction/components/category-cloumn';

export const transactionColumns: ColumnDef<TransactionResponseWithExtras>[] = [
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
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          className='p-0 w-full justify-start hover:bg-transparent'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue('date') as Date;
      return <span>{format(date, 'MMM do, yyyy')}</span>;
    },
  },

  {
    accessorKey: 'payee',
    header: ({ column }) => {
      return (
        <Button
          className='p-0 w-full justify-start hover:bg-transparent'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Payee
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },

  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          className='p-0 w-full justify-start hover:bg-transparent'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Category
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <CategoryColumn category={row.original.category} />;
    },
  },
  {
    accessorKey: 'account',
    header: ({ column }) => {
      return (
        <Button
          className='p-0 w-full justify-start hover:bg-transparent'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Account
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <AccountColumn account={row.original.financeAccount} />;
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          className='p-0 w-full justify-start hover:bg-transparent'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.original.amount;

      return (
        <Badge variant={amount < 0 ? 'destructive' : 'success'} className='text-xs font-medium py-2 rounded-full'>
          {formatCurrency(amount)}
        </Badge>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <TransactionActions transaction={row.original} />,
  },
];
