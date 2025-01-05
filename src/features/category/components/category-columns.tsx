'use client';

import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';

import { CategoryActions } from '@/features/category/components/category-actions';
import { CategoryResponse } from '@/features/category/schemas/category-schemas';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export const categoryColumns: ColumnDef<CategoryResponse>[] = [
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
    cell: ({ row }) => <CategoryActions category={row.original} />,
  },
];
