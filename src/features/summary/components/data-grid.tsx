'use client';

import { FaPiggyBank } from 'react-icons/fa';
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';

import { useGetSummary } from '@/features/summary/hooks/use-get-summary';
import { formatDateRange } from '@/utils/utils';

import { DataCard, DataCardLoading } from '@/features/summary/components/data-card';

export const DataGrid = () => {
  const { from, to, summary, isSummaryLoading } = useGetSummary();
  const dateRangeLabel = formatDateRange({ from, to });

  if (isSummaryLoading) {
    return (
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8'>
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8'>
      <DataCard
        title='Remaining'
        value={summary?.remainingAmount}
        percentageChange={summary?.remainingChange}
        icon={FaPiggyBank}
        variant='default'
        dateRange={dateRangeLabel}
      />
      <DataCard
        title='Income'
        value={summary?.incomeAmount}
        percentageChange={summary?.incomeChange}
        icon={FaArrowTrendUp}
        variant='sucess'
        dateRange={dateRangeLabel}
      />
      <DataCard
        title='Expenses'
        value={summary?.expensesAmount}
        percentageChange={summary?.expensesChange}
        icon={FaArrowTrendDown}
        variant='danger'
        dateRange={dateRangeLabel}
      />
    </div>
  );
};
