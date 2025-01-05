import { useEditFinanceAccountState } from '@/features/finance-account/hooks/use-edit-finance-account-state';
import { FinanceAccountResponse } from '@/features/finance-account/schemas/finance-account-schemas';

interface Props {
  account: FinanceAccountResponse;
}

export const AccountColumn = ({ account }: Props) => {
  const { onOpen: onEditAccount } = useEditFinanceAccountState();

  const onClick = () => {
    onEditAccount(account);
  };

  return (
    <div onClick={onClick} className='flex items-center cursor-pointer hover:underline'>
      {account.name}
    </div>
  );
};
