'use client';

import { PlusIcon } from 'lucide-react';

import { useCreateCategoryState } from '@/features/category/hooks/use-create-category-state';
import { useGetAllCategories } from '@/features/category/hooks/use-get-all-categories';
import { useDeleteAllCategories } from '@/features/category/hooks/use-delete-all-categories';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { DataTable } from '@/components/shared/data-table';
import { categoryColumns } from '@/features/category/components/category-columns';

export default function CategoriesPage() {
  const { onOpen } = useCreateCategoryState();
  const { categories, isCategoriesLoading } = useGetAllCategories();
  const { deleteAllCategories, isDeletingAllCategories } = useDeleteAllCategories();

  const isLoading = isCategoriesLoading || isDeletingAllCategories;

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
          <CardTitle className='text-xl line-clamp-1'>Categories</CardTitle>
          <Button onClick={onOpen} size='sm' disabled={isLoading}>
            <PlusIcon />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable columns={categoryColumns} data={categories} filterKey='name' OnDelete={(ids) => deleteAllCategories(ids)} />
        </CardContent>
      </Card>
    </div>
  );
}
