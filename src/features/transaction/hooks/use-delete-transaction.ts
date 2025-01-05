import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { axiosInstance } from '@/lib/axios-client';
import { useEditTransactionState } from '@/features/transaction/hooks/use-edit-transaction-state';
import { useSearchParams } from 'next/navigation';

export const useDeleteTransaction = () => {
  const { onClose } = useEditTransactionState();

  const params = useSearchParams();

  const accountId = params.get('accountId') || '';
  const from = params.get('from') || '';
  const to = params.get('to') || '';

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete<{ success: boolean; message: string; data: any }>(`/transactions/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transactions', { accountId, from, to }] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      onClose();
      toast.success('Transaction Deleted');
    },
    onError: () => {
      toast.error('Transaction Deletion Failed');
    },
  });

  return {
    deleteTransaction: mutation.mutate,
    isDeletingTransaction: mutation.isPending,
    isDeletingTransactionError: mutation.isError,
    isDeletingTransactionSuccess: mutation.isSuccess,
  };
};
