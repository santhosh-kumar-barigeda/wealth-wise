import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { axiosInstance } from '@/lib/axios-client';
import { useEditFinanceAccountState } from '@/features/finance-account/hooks/use-edit-finance-account-state';

export const useDeleteAllFinanceAccounts = () => {
  const { onClose } = useEditFinanceAccountState();

  const mutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const res = await axiosInstance.put<{ success: boolean; message: string; data: any }>('/finance-accounts', { ids });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance-accounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      onClose();
      toast.success('Accounts Deleted');
    },
    onError: () => {
      toast.error('Accounts Deletion Failed');
    },
  });

  return {
    deleteAllFinanceAccounts: mutation.mutate,
    isDeletingAllFinanceAccounts: mutation.isPending,
    isDeletingAllFinanceAccountsError: mutation.isError,
    isDeletingAllFinanceAccountsSuccess: mutation.isSuccess,
  };
};
