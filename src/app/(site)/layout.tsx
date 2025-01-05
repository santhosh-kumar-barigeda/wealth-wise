import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/auth-actions';
import { Logo } from '@/components/shared/logo';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { HeaderNavigation } from '@/components/layouts/header-navigation';
import { WelcomeMessage } from '@/components/layouts/welcome-messages';
import { UserButton } from '@/features/user/components/user-button';
import { Filters } from '@/components/layouts/filters';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) return redirect('/sign-in');

  return (
    <div className='h-screen flex flex-col'>
      <header className='bg-gradient-to-b from-blue-700 to-blue-500 text-white'>
        <div className='py-8 px-4 lg:px-14 pb-36 w-full max-w-screen-2xl mx-auto '>
          <div className='flex items-center justify-between mb-14'>
            <div className='flex items-center lg:gap-x-16'>
              <div className='hidden lg:block'>
                <Logo />
              </div>
              <HeaderNavigation />
            </div>

            <div className='flex items-center gap-4'>
              <ThemeToggle />
              <UserButton />
            </div>
          </div>

          <WelcomeMessage />

          <Filters />
        </div>
      </header>

      <main className='flex-[1] px-4 lg:px-14 w-full max-w-screen-2xl mx-auto'>{children}</main>
    </div>
  );
}
