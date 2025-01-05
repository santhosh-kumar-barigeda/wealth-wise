'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';

import { useState } from 'react';
import { format, subDays } from 'date-fns';
import { Calendar as CalendarIcon, ChevronDownIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PopoverClose } from '@radix-ui/react-popover';
import { useGetSummary } from '@/features/summary/hooks/use-get-summary';
import { formatDateRange } from '@/utils/utils';

export const DateFilter = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  const accountId = params.get('accountId');
  const from = params.get('from') || '';
  const to = params.get('to') || '';

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const paramsState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  };

  const [date, setDate] = useState<DateRange | undefined>(paramsState);

  const { isSummaryLoading } = useGetSummary();

  const pushToURL = (dateRange: DateRange | undefined) => {
    const query = {
      accountId,
      from: format(dateRange?.from || defaultFrom, 'yyyy-MM-dd'),
      to: format(dateRange?.to || defaultTo, 'yyyy-MM-dd'),
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  const onReset = () => {
    setDate(undefined);
    pushToURL(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={isSummaryLoading}
          size='sm'
          variant='outline'
          className='w-full lg:w-auto h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-0 focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition'
        >
          <CalendarIcon />
          <span className='text-left w-full'>{formatDateRange(paramsState)}</span>
          <ChevronDownIcon className='size-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full lg:w-auto p-0' align='start'>
        <Calendar
          disabled={isSummaryLoading}
          initialFocus
          mode='range'
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
        <div className='p-4 w-full flex items-center gap-x-2'>
          <PopoverClose asChild>
            <Button disabled={!date?.from || !date.to || isSummaryLoading} onClick={onReset} className='w-full' variant='outline'>
              Reset
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button disabled={!date?.from || !date.to || isSummaryLoading} onClick={() => pushToURL(date)} className='w-full'>
              Apply
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
