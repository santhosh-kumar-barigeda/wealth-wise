'use client';

import { useCurrentUser } from '@/features/auth/hooks/use-current-user';

export const WelcomeMessage = () => {
  const { user } = useCurrentUser();
  const userName = user?.name?.split(' ')[0];
  const message = userName ? `Welcome, ${userName}👋🏼` : 'Welcome';

  return (
    <div className='space-y-2 mb-4'>
      <h2 className='text-2xl lg:text-4xl text-white font-medium'>{message}</h2>
      <p className='text-sm lg:text-base text-[#89b6fd]'>Take a look at your financial overview below.</p>{' '}
    </div>
  );
};
