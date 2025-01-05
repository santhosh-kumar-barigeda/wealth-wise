import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { axiosInstance } from '@/lib/axios-client';
import { TransactionResponse, updateTransactionSchema, UpdateTransactionInput } from '@/features/transaction/schemas/transaction-schemas';
import { useEditTransactionState } from '@/features/transaction/hooks/use-edit-transaction-state';
import { useSearchParams } from 'next/navigation';

export const useUpdateTransaction = () => {
  const { onClose, transaction } = useEditTransactionState();

  const params = useSearchParams();

  const accountId = params.get('accountId') || '';
  const from = params.get('from') || '';
  const to = params.get('to') || '';

  const transactionId = transaction.id;

  const updateTransactionForm = useForm<UpdateTransactionInput>({
    resolver: zodResolver(updateTransactionSchema),
    defaultValues: {
      financeAccountId: transaction.financeAccountId,
      categoryId: transaction?.categoryId || '',
      date: transaction.date || new Date(),
      payee: transaction.payee,
      amount: transaction.amount,
      notes: transaction.notes || '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: UpdateTransactionInput) => {
      const res = await axiosInstance.put<{ success: boolean; message: string; data: TransactionResponse }>(`/transactions/${transactionId}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transactions', { accountId, from, to }] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      onClose();
      toast.success('Transaction Updated');
    },
    onError: () => {
      toast.error('Transaction Updation Failed');
    },
  });

  const updateTransaction = (data: UpdateTransactionInput) => {
    mutation.mutate(data);
  };

  return {
    updateTransactionForm,
    updateTransaction,
    isUpdatingTransaction: mutation.isPending,
    isUpdatingTransactionError: mutation.isError,
    isUpdatingTransactionSuccess: mutation.isSuccess,
    transactionId,
  };
};
