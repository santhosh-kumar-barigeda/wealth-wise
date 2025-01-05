import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios-client';
import { CategoryResponse } from '@/features/category/schemas/category-schemas';

export const useGetAllCategories = () => {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axiosInstance.get<{ success: boolean; message: string; data: CategoryResponse[] }>('/categories');
      return res.data;
    },
  });

  return {
    categories: query.data?.data || [],
    categoriesError: query.error,
    isCategoriesLoading: query.isLoading,
    isCategoriesError: query.isError,
  };
};
