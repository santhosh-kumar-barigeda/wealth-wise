'use client';

import { useEditCategoryState } from '@/features/category/hooks/use-edit-category-state';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { EditCategoryForm } from '@/features/category/components/edit-account-form';

export const EditCategorySheet = () => {
  const { isOpen, onClose } = useEditCategoryState();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className='mb-8 space-y-0'>
          <SheetTitle>Edit Category</SheetTitle>
          <SheetDescription>Modify your category</SheetDescription>
        </SheetHeader>

        <EditCategoryForm />
      </SheetContent>
    </Sheet>
  );
};
