'use client';

import { useCreateCategoryState } from '@/features/category/hooks/use-create-category-state';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { CreateCategoryForm } from '@/features/category/components/create-category-form';

export const CreateCategorySheet = () => {
  const { isOpen, onClose } = useCreateCategoryState();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className='mb-8 space-y-0'>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>Create a new category to track your transactions.</SheetDescription>
        </SheetHeader>

        <CreateCategoryForm />
      </SheetContent>
    </Sheet>
  );
};
