import { useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios-client';
import { TransactionResponseWithExtras } from '@/features/transaction/schemas/transaction-schemas';

export const useGetAllTransactions = () => {
  const searchParams = useSearchParams();
  const { accountId, from, to } = Object.fromEntries(searchParams.entries());

  const url = qs.stringifyUrl(
    {
      url: '/transactions',
      query: {
        accountId,
        from,
        to,
      },
    },
    { skipNull: true, skipEmptyString: true }
  );

  const query = useQuery({
    queryKey: ['transactions', { accountId, from, to }],
    queryFn: async () => {
      const res = await axiosInstance.get<{ success: boolean; message: string; data: TransactionResponseWithExtras[] }>(url);
      return res.data;
    },
  });

  return {
    transactions: query.data?.data || [],
    transactionsError: query.error,
    isTransactionsLoading: query.isLoading,
    isTransactionsError: query.isError,
  };
};
