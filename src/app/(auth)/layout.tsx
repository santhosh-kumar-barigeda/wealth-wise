import { Logo } from '@/components/shared/logo';
import { ThemeToggle } from '@/components/shared/theme-toggle';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-screen flex flex-col'>
      <header className='py-4 px-4 lg:px-14 w-full max-w-screen-2xl mx-auto flex items-center justify-between'>
        <Logo />
        <ThemeToggle />
      </header>

      <main className='flex-[1] py-4 px-4 lg:px-14 w-full max-w-screen-2xl mx-auto flex items-center justify-center'>{children}</main>
    </div>
  );
}
