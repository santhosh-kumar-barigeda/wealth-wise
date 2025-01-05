'use client';

import { useRouter } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { handleSignOut } from '@/actions/auth-actions';

export function UserButton() {
  const { user, isLoading } = useCurrentUser();
  const router = useRouter();

  const onSignOut = async () => {
    await handleSignOut();
    router.push('/sign-in');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus-visible:outline-none'>
        {isLoading ? (
          <Loader2Icon className='size-5 animate-spin text-white' />
        ) : (
          <Avatar className='size-[34px] '>
            {user?.image && <AvatarImage src={user?.image || 'https://github.com/shadcn.png'} />}
            <AvatarFallback className='bg-violet-200 text-violet-600 font-medium'>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent side='bottom' align='end'>
        <DropdownMenuLabel className='text-center space-y-1'>
          <p className='text-sm font-semibold'>{user?.name || 'Guest'}</p>
          {user?.email && <p className='text-xs text-muted-foreground'>{user?.email}</p>}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='focus:bg-red-100 dark:focus:bg-destructive/50 justify-center text-rose-500 focus:text-rose-500'
          onClick={onSignOut}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
