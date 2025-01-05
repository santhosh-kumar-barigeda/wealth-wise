import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { axiosInstance } from '@/lib/axios-client';
import { CategoryResponse, updateCategorySchema, UpdateCategoryInput } from '@/features/category/schemas/category-schemas';
import { useEditCategoryState } from '@/features/category/hooks/use-edit-category-state';

export const useUpdateCategory = () => {
  const { onClose, category } = useEditCategoryState();

  const categoryId = category.id;

  const updateCategoryForm = useForm<UpdateCategoryInput>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      name: category.name,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: UpdateCategoryInput) => {
      const res = await axiosInstance.put<{ success: boolean; message: string; data: CategoryResponse }>(`/categories/${categoryId}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      onClose();
      toast.success('Category Updated');
    },
    onError: () => {
      toast.error('Category Updation Failed');
    },
  });

  const updateCategory = (data: UpdateCategoryInput) => {
    mutation.mutate(data);
  };

  return {
    updateCategoryForm,
    updateCategory,
    isUpdatingCategory: mutation.isPending,
    isUpdatingCategoryError: mutation.isError,
    isUpdatingCategorySuccess: mutation.isSuccess,
    categoryId,
  };
};
