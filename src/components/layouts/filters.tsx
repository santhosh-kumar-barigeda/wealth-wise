'use client';

import { useParams, usePathname } from 'next/navigation';
import { AccountFilter } from './account-filter';
import { DateFilter } from './date-filter';

export const Filters = () => {
  const pathanme = usePathname();

  const isSettingsPage = pathanme.startsWith('/settings');
  const isCategoriesPage = pathanme.startsWith('/categories');
  const isAccountsPage = pathanme.startsWith('/accounts');

  const hideFilters = isSettingsPage || isCategoriesPage || isAccountsPage;

  if (hideFilters) {
    return null;
  }

  return (
    <div className='flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2'>
      <AccountFilter />
      <DateFilter />
    </div>
  );
};
