'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useMedia } from 'react-use';
import { MenuIcon } from 'lucide-react';

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { HeaderNavButton } from '@/components/layouts/header-nav-button';

const routes = [
  { href: '/', label: 'Overview' },
  { href: '/transactions', label: 'Transactions' },
  { href: '/accounts', label: 'Accounts' },
  { href: '/categories', label: 'Categories' },
];

export const HeaderNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const isMobile = useMedia('(max-width:1024px)', false);

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            className={`font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none outline-none text-white
          focus-visible:ring-offset-0 focus-visible:ring-transparent focus:bg-white/30 transition`}
          >
            <MenuIcon className='size-4' />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='px-2 border-none'>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          <nav className='flex flex-col gap-y-2 pt-6'>
            {routes.map(({ href, label }) => (
              <Button variant={pathname === href ? 'secondary' : 'ghost'} key={href} onClick={() => onClick(href)} className='w-full justify-start'>
                {label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className='hidden lg:flex items-center gap-2 overflow-x-auto'>
      {routes.map(({ href, label }) => (
        <HeaderNavButton key={href} href={href} label={label} isActive={pathname === href} />
      ))}
    </nav>
  );
};
