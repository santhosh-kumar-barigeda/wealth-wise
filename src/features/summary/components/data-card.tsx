'use client';

import { IconType } from 'react-icons';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { CountUp } from '@/components/shared/count-up';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/utils/finance-utils';
import { formatPercentage } from '@/utils/utils';

const boxVariant = cva('rounded-md p-3', {
  variants: {
    variant: {
      default: 'bg-blue-500/20',
      sucess: 'bg-green-500/20',
      danger: 'bg-rose-500/20',
      warning: 'bg-yellow-500/20',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const iconVariant = cva('size', {
  variants: {
    variant: {
      default: 'fill-blue-500',
      sucess: 'fill-green-500',
      danger: 'fill-rose-500',
      warning: 'fill-yellow-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type BoxVarinats = VariantProps<typeof boxVariant>;
type IconVarinats = VariantProps<typeof iconVariant>;

interface Props extends BoxVarinats, IconVarinats {
  title: string;
  value?: number;
  percentageChange?: number;
  dateRange: string;
  icon: IconType;
}

export const DataCard = ({ icon: Icon, percentageChange, title, value, dateRange, variant }: Props) => {
  percentageChange = percentageChange ?? 0;
  value = value ?? 0;

  return (
    <Card className='border-0 drop-shadow-sm dark:border'>
      <CardHeader className='flex flex-row items-center justify-between gap-x-4'>
        <div className='space-y-2'>
          <CardTitle className='text-2xl line-clamp-1'>{title}</CardTitle>
          <CardDescription className='line-clamp-1'>{dateRange}</CardDescription>
        </div>

        <div className={cn('shrink-0', boxVariant({ variant }))}>
          <Icon className={cn(iconVariant({ variant }))} />
        </div>
      </CardHeader>

      <CardContent>
        <h1 className='font-bold text-2xl mb-2 line-clamp-1 break-all'>
          <CountUp preserveValue start={0} end={value} decimals={2} decimalPlaces={2} formattingFn={formatCurrency} />
        </h1>

        <p
          className={cn(
            'text-muted-foreground text-sm line-clamp-1',
            percentageChange > 0 && 'text-green-500',
            percentageChange < 0 && 'text-rose-500'
          )}
        >
          {formatPercentage(percentageChange, { addPrefix: true })} from last period
        </p>
      </CardContent>
    </Card>
  );
};

export const DataCardLoading = () => {
  return (
    <Card className='border-0 drop-shadow-sm dark:border h-[192px]'>
      <CardHeader className='flex flex-row items-center justify-between gap-x-4'>
        <div className='space-y-2'>
          <Skeleton className='h-6 w-24' />
          <Skeleton className='h-4 w-40' />
        </div>

        <Skeleton className='size-12' />
      </CardHeader>

      <CardContent className='space-y-4'>
        <Skeleton className='shrink-0 h-10 w-24 mb-2' />
        <Skeleton className='shrink-0 h-4 w-40' />
      </CardContent>
    </Card>
  );
};
