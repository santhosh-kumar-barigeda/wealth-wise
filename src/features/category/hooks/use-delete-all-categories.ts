import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { axiosInstance } from '@/lib/axios-client';
import { useEditCategoryState } from '@/features/category/hooks/use-edit-category-state';
import { toast } from 'sonner';

export const useDeleteAllCategories = () => {
  const { onClose } = useEditCategoryState();

  const mutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const res = await axiosInstance.put<{ success: boolean; message: string; data: any }>('/categories', { ids });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      onClose();
      toast.success('Categories Deleted');
    },
    onError: () => {
      toast.error('Categories Deletion Failed');
    },
  });

  return {
    ...mutation,
    deleteAllCategories: mutation.mutate,
    isDeletingAllCategories: mutation.isPending,
    isDeletingAllCategoriesError: mutation.isError,
    isDeletingAllCategoriesSuccess: mutation.isSuccess,
  };
};
