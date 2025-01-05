'use client';

import { EditIcon, MoreHorizontalIcon, TrashIcon } from 'lucide-react';

import { useEditCategoryState } from '@/features/category/hooks/use-edit-category-state';
import { useDeleteCategory } from '@/features/category/hooks/use-delete-category';
import { CategoryResponse } from '@/features/category/schemas/category-schemas';
import { useConfirm } from '@/hooks/use-confirm';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface CategoryActionsProps {
  category: CategoryResponse;
}

export function CategoryActions({ category }: CategoryActionsProps) {
  const { onOpen } = useEditCategoryState();
  const { deleteCategory } = useDeleteCategory();
  const [ConfirmationDialog, confirm] = useConfirm('Are you sure?', 'This can not be undone');

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
              onOpen(category);
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
                deleteCategory(category.id);
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
