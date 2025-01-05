import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { axiosInstance } from '@/lib/axios-client';
import { useEditCategoryState } from '@/features/category/hooks/use-edit-category-state';

export const useDeleteCategory = () => {
  const { onClose } = useEditCategoryState();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete<{ success: boolean; message: string; data: any }>(`/categories/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      onClose();
      toast.success('Category Deleted');
    },
    onError: () => {
      toast.error('Category Deletion Failed');
    },
  });

  return {
    deleteCategory: mutation.mutate,
    isDeletingCategory: mutation.isPending,
    isDeletingCategoryError: mutation.isError,
    isDeletingCategorySuccess: mutation.isSuccess,
  };
};
