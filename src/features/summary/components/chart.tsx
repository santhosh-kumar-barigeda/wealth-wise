'use state';

import { useState } from 'react';
import { AreaChartIcon, BarChart3Icon, FileSearchIcon, LineChartIcon, Loader2Icon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { AreaChartVariant } from '@/features/summary/components/area-chart-variant';
import { BarChartVariant } from '@/features/summary/components/bar-chart-variant';
import { LineChartVariant } from '@/features/summary/components/line-chart-variant';

type Props = {
  data?: {
    date: Date;
    income: number;
    expenses: number;
  }[];
};

export const Chart = ({ data }: Props) => {
  const [chartType, setChartType] = useState('area');

  return (
    <Card className='border-0 drop-shadow-sm dark:border'>
      <CardHeader className='flex gap-y-2 lg:gap-y-0 lg:flex-row lg:items-center justify-between'>
        <CardTitle className='text-xl line-clamp-1'>Transactions</CardTitle>
        <Select value={chartType} onValueChange={(value) => setChartType(value)}>
          <SelectTrigger className='w-max focus-visible:ring-0'>
            <SelectValue placeholder='Select Chart' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='area'>
              <div className='flex items-center'>
                <AreaChartIcon className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>Area Chart</p>
              </div>
            </SelectItem>

            <SelectItem value='bar'>
              <div className='flex items-center'>
                <BarChart3Icon className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>Bar Chart</p>
              </div>
            </SelectItem>

            <SelectItem value='line'>
              <div className='flex items-center'>
                <LineChartIcon className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>Line Chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        {data?.length === 0 ? (
          <div className='flex flex-row gap-2 items-center justify-center h-[350px] w-full'>
            <FileSearchIcon className='size-6 text-muted-foreground' />
            <p className='text-muted-foreground text-sm'>No data for this period</p>
          </div>
        ) : (
          <>
            {chartType === 'area' && <AreaChartVariant data={data} />}
            {chartType === 'bar' && <BarChartVariant data={data} />}
            {chartType === 'line' && <LineChartVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const ChartLoading = () => {
  return (
    <Card className='border-0 drop-shadow-sm dark:border'>
      <CardHeader className='flex gap-y-2 lg:gap-y-0 lg:flex-row lg:items-center justify-between'>
        <Skeleton className='h-8 w-48' />
        <Skeleton className='h-6 w-full lg:w-[120px]' />
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-center h-[350px] w-full'>
          <Loader2Icon className='size-6 text-muted-foreground animate-spin' />
        </div>
      </CardContent>
    </Card>
  );
};
