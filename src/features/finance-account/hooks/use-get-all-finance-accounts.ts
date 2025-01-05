import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios-client';
import { FinanceAccountResponse } from '@/features/finance-account/schemas/finance-account-schemas';

export const useGetAllFinanceAccounts = () => {
  const query = useQuery<FinanceAccountResponse[]>({
    queryKey: ['finance-accounts'],
    queryFn: async () => {
      const res = await axiosInstance.get<{ success: boolean; message: string; data: FinanceAccountResponse[] }>('/finance-accounts');
      return res.data.data;
    },
  });

  return {
    financeAccounts: query.data || [],
    financeAccountsError: query.error,
    isFinanceAccountsLoading: query.isLoading,
    isFinanceAccountsError: query.isError,
  };
};
