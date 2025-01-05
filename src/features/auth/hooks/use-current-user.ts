import { getCurrentUser } from '@/actions/auth-actions';
import { useQuery } from '@tanstack/react-query';

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
  });

  return {
    ...query,
    user: query.data,
  };
};
