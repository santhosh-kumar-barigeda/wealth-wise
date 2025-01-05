import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { axiosInstance } from '@/lib/axios-client';
import { TransactionResponse, createTransactionSchema, CreateTransactionInput } from '@/features/transaction/schemas/transaction-schemas';
import { useCreateTransactionState } from '@/features/transaction/hooks/use-create-transaction-state';
import { useSearchParams } from 'next/navigation';

export const useCreateTransaction = () => {
  const { onClose } = useCreateTransactionState();

  const params = useSearchParams();

  const accountId = params.get('accountId') || '';
  const from = params.get('from') || '';
  const to = params.get('to') || '';

  const createTransactionForm = useForm<CreateTransactionInput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      financeAccountId: '',
      categoryId: '',
      date: new Date(),
      payee: '',
      amount: 0,
      notes: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateTransactionInput) => {
      const res = await axiosInstance.post<{ success: boolean; message: string; data: TransactionResponse }>('/transactions', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transactions', { accountId, from, to }] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      onClose();
      toast.success('Transaction Created');
    },
    onError: () => {
      toast.error('Transaction Creation Failed');
    },
  });

  const createTransaction = (data: CreateTransactionInput) => {
    mutation.mutate(data);
  };

  return {
    createTransactionForm,
    createTransaction,
    isCreatingTransaction: mutation.isPending,
    isCreatingTransactionError: mutation.isError,
    isCreatingTransactionSuccess: mutation.isSuccess,
  };
};
