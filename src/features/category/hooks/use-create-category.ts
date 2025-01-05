import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { axiosInstance } from '@/lib/axios-client';
import { CategoryResponse, createCategorySchema, CreateCategoryInput } from '@/features/category/schemas/category-schemas';
import { useCreateCategoryState } from '@/features/category/hooks/use-create-category-state';

export const useCreateCategory = () => {
  const { onClose } = useCreateCategoryState();

  const createCategoryForm = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateCategoryInput) => {
      const res = await axiosInstance.post<{ success: boolean; message: string; data: CategoryResponse }>('/categories', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      onClose();
      toast.success('Category Created');
    },
    onError: () => {
      toast.error('Category Creation Failed');
    },
  });

  const createCategory = (data: CreateCategoryInput) => {
    mutation.mutate(data);
  };

  return {
    createCategoryForm,
    createCategory,
    isCreatingCategory: mutation.isPending,
    isCreatingCategoryError: mutation.isError,
    isCreatingCategorySuccess: mutation.isSuccess,
  };
};
