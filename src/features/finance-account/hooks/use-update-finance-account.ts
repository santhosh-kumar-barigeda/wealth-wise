import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { axiosInstance } from '@/lib/axios-client';
import {
  FinanceAccountResponse,
  updateFinanceAccountSchema,
  UpdateFinanceAccountInput,
} from '@/features/finance-account/schemas/finance-account-schemas';
import { useEditFinanceAccountState } from '@/features/finance-account/hooks/use-edit-finance-account-state';

export const useUpdateFinanceAccount = () => {
  const { onClose, financeAccount } = useEditFinanceAccountState();

  const updateFinanceAccountForm = useForm<UpdateFinanceAccountInput>({
    resolver: zodResolver(updateFinanceAccountSchema),
    defaultValues: {
      name: financeAccount.name,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: UpdateFinanceAccountInput) => {
      const res = await axiosInstance.put<{ success: boolean; message: string; data: FinanceAccountResponse }>(
        `/finance-accounts/${financeAccount.id}`,
        data
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance-accounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      onClose();
      toast.success('Account Updated');
    },
    onError: () => {
      toast.error('Account Updation Failed');
    },
  });

  const updateFinanceAccount = (data: UpdateFinanceAccountInput) => {
    mutation.mutate(data);
  };

  return {
    updateFinanceAccountForm,
    accountId: financeAccount.id,
    updateFinanceAccount,
    isUpdatingFinanceAccount: mutation.isPending,
    isUpdatingFinanceAccountError: mutation.isError,
    isUpdatingFinanceAccountSuccess: mutation.isSuccess,
  };
};
