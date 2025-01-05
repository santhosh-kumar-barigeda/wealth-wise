'use client';

import { Form } from '@/components/ui/form';
import { useCreateCategory } from '@/features/category/hooks/use-create-category';
import { CustomInputFormField } from '@/components/custom-ui/custom-input-form-field';
import { Button } from '@/components/ui/button';

export const CreateCategoryForm = () => {
  const { createCategoryForm, createCategory, isCreatingCategory } = useCreateCategory();

  return (
    <Form {...createCategoryForm}>
      <form onSubmit={createCategoryForm.handleSubmit(createCategory)}>
        <CustomInputFormField
          form={createCategoryForm}
          name='name'
          label='Category Name'
          placeholder='e.g. Groceries, Entertainment, Utilities'
          type='text'
        />
        <Button type='submit' disabled={isCreatingCategory} className='w-full mt-4' size='sm'>
          Create category
        </Button>
      </form>
    </Form>
  );
};
