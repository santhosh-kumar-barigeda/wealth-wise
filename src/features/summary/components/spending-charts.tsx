'use state';

import { useState } from 'react';
import { FileSearchIcon, Loader2Icon, PieChartIcon, RadarIcon, TargetIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { PieChartVariant } from '@/features/summary/components/pie-chart-variant';
import { RadialChartVariant } from '@/features/summary/components/radial-chart-variant';
import { RadarChartVariant } from '@/features/summary/components/radar-chart-variant';

type Props = {
  data?: {
    name: string;
    value: number;
  }[];
};

export const SpendingCharts = ({ data }: Props) => {
  const [chartType, setChartType] = useState('pie');

  return (
    <Card className='border-0 drop-shadow-sm dark:border'>
      <CardHeader className='flex gap-y-2 lg:gap-y-0 lg:flex-row lg:items-center justify-between'>
        <CardTitle className='text-xl line-clamp-1'>Categories</CardTitle>
        <Select value={chartType} onValueChange={(value) => setChartType(value)}>
          <SelectTrigger className='w-max focus-visible:ring-0'>
            <SelectValue placeholder='Select Chart' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='pie'>
              <div className='flex items-center'>
                <PieChartIcon className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>Pie Chart</p>
              </div>
            </SelectItem>

            <SelectItem value='radial'>
              <div className='flex items-center'>
                <TargetIcon className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>Radial Chart</p>
              </div>
            </SelectItem>

            <SelectItem value='radar'>
              <div className='flex items-center'>
                <RadarIcon className='size-4 mr-2 shrink-0' />
                <p className='line-clamp-1'>Radar Chart</p>
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
            {chartType === 'pie' && <PieChartVariant data={data} />}
            {chartType === 'radial' && <RadialChartVariant data={data} />}
            {chartType === 'radar' && <RadarChartVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const SpendingChartLoading = () => {
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
