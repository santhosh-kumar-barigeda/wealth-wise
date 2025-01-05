import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { axiosInstance } from '@/lib/axios-client';
import {
  FinanceAccountResponse,
  createFinanceAccountSchema,
  CreateFinanceAccountInput,
} from '@/features/finance-account/schemas/finance-account-schemas';
import { useCreateFinanceAccountState } from '@/features/finance-account/hooks/use-create-finance-account-state';

export const useCreateFinanceAccount = () => {
  const { onClose } = useCreateFinanceAccountState();

  const createFinanceAccountForm = useForm<CreateFinanceAccountInput>({
    resolver: zodResolver(createFinanceAccountSchema),
    defaultValues: {
      name: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateFinanceAccountInput) => {
      const res = await axiosInstance.post<{ success: boolean; message: string; data: FinanceAccountResponse }>('/finance-accounts', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance-accounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      onClose();
      toast.success('Account Created');
    },
    onError: () => {
      toast.error('Account Creation Failed');
    },
  });

  const createFinanceAccount = (data: CreateFinanceAccountInput) => {
    mutation.mutate(data);
  };

  return {
    createFinanceAccountForm,
    createFinanceAccount,
    isCreatingFinanceAccount: mutation.isPending,
    isCreatingFinanceAccountError: mutation.isError,
    isCreatingFinanceAccountSuccess: mutation.isSuccess,
  };
};
