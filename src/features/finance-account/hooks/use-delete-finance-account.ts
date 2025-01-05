import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { axiosInstance } from '@/lib/axios-client';
import { useEditFinanceAccountState } from '@/features/finance-account/hooks/use-edit-finance-account-state';

export const useDeleteFinanceAccount = () => {
  const { onClose } = useEditFinanceAccountState();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      console.log(id);
      const res = await axiosInstance.delete<{ success: boolean; message: string; data: any }>(`/finance-accounts/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance-accounts'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      onClose();
      toast.success('Account Deleted');
    },
    onError: () => {
      toast.error('Account Deletion Failed');
    },
  });

  return {
    deleteFinanceAccount: mutation.mutate,
    isDeletingFinanceAccount: mutation.isPending,
    isDeletingFinanceAccountError: mutation.isError,
    isDeletingFinanceAccountSuccess: mutation.isSuccess,
  };
};
