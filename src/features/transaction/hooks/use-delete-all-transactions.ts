import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { axiosInstance } from '@/lib/axios-client';
import { useEditTransactionState } from '@/features/transaction/hooks/use-edit-transaction-state';
import { useSearchParams } from 'next/navigation';

export const useDeleteAllTransactions = () => {
  const { onClose } = useEditTransactionState();

  const params = useSearchParams();

  const accountId = params.get('accountId') || '';
  const from = params.get('from') || '';
  const to = params.get('to') || '';

  const mutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const res = await axiosInstance.put<{ success: boolean; message: string; data: any }>('/transactions', { ids });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transactions', { accountId, from, to }] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      onClose();
      toast.success('Transactions Deleted');
    },
    onError: () => {
      toast.error('Transactions Deletion Failed');
    },
  });

  return {
    deleteAllTransactions: mutation.mutate,
    isDeletingAllTransactions: mutation.isPending,
    isDeletingAllTransactionsError: mutation.isError,
    isDeletingAllTransactionsSuccess: mutation.isSuccess,
  };
};
