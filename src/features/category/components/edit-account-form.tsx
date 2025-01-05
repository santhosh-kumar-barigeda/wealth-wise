'use client';

import { useConfirm } from '@/hooks/use-confirm';
import { useUpdateCategory } from '@/features/category/hooks/use-update-category';
import { useDeleteCategory } from '@/features/category/hooks/use-delete-category';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CustomInputFormField } from '@/components/custom-ui/custom-input-form-field';

export const EditCategoryForm = () => {
  const { updateCategoryForm, updateCategory, isUpdatingCategory, categoryId } = useUpdateCategory();
  const { deleteCategory, isDeletingCategory } = useDeleteCategory();
  const [ConfirmationDialog, confirm] = useConfirm('Are you sure?', 'This can not be undone');

  const isLoading = isUpdatingCategory || isDeletingCategory;

  return (
    <>
      <ConfirmationDialog />

      <Form {...updateCategoryForm}>
        <form onSubmit={updateCategoryForm.handleSubmit(updateCategory)}>
          <CustomInputFormField
            form={updateCategoryForm}
            name='name'
            label='Category Name'
            placeholder='e.g. Groceries, Entertainment, Utilities'
            type='text'
          />
          <Button type='submit' disabled={isLoading} className='w-full mt-4' size='sm'>
            Save Changes
          </Button>

          <Button
            type='button'
            disabled={isLoading}
            onClick={async () => {
              const ok = await confirm();

              if (ok) {
                deleteCategory(categoryId);
              }
            }}
            variant='destructive-outline'
            className='w-full mt-4'
            size='sm'
          >
            Delete category
          </Button>
        </form>
      </Form>
    </>
  );
};
