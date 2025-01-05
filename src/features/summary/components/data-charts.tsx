'use client';

import { useGetSummary } from '@/features/summary/hooks/use-get-summary';
import { Chart, ChartLoading } from '@/features/summary/components/chart';
import { SpendingChartLoading, SpendingCharts } from '@/features/summary/components/spending-charts';

export const DataCharts = () => {
  const { summary, isSummaryLoading } = useGetSummary();

  if (isSummaryLoading) {
    return (
      <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
        <div className='col-span-1 lg:col-span-3 xl:col-span-4'>
          <ChartLoading />
        </div>
        <div className='col-span-1 lg:col-span-3 xl:col-span-2'>
          <SpendingChartLoading />
        </div>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
      <div className='col-span-1 lg:col-span-3 xl:col-span-4'>
        <Chart data={summary?.days} />
      </div>
      <div className='col-span-1 lg:col-span-3 xl:col-span-2'>
        <SpendingCharts data={summary?.categories} />
      </div>
    </div>
  );
};
