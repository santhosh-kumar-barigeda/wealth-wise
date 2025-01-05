'use client';

import { format } from 'date-fns';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

type Props = {
  data?: {
    date: Date;
    income: number;
    expenses: number;
  }[];
};

const chartConfig = {
  income: {
    label: 'Income',
    color: '#2662D9',
  },
  expenses: {
    label: 'Expenses',
    color: '#e23670',
  },
} satisfies ChartConfig;

export const AreaChartVariant = ({ data }: Props) => {
  return (
    <ChartContainer config={chartConfig} className='w-full h-[350px]'>
      <AreaChart data={data}>
        <CartesianGrid />
        <XAxis dataKey='date' tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => format(value, 'dd MMM')} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={(value) => format(value, 'PPP')} />} />
        <defs>
          <linearGradient id='fillIncome' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='var(--color-income)' stopOpacity={0.8} />
            <stop offset='95%' stopColor='var(--color-income)' stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id='fillExpenses' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='var(--color-expenses)' stopOpacity={0.8} />
            <stop offset='95%' stopColor='var(--color-expenses)' stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area dataKey='expenses' type='natural' fill='url(#fillExpenses)' fillOpacity={0.4} stroke='var(--color-expenses)' stackId='a' />
        <Area dataKey='income' type='natural' fill='url(#fillIncome)' fillOpacity={0.4} stroke='var(--color-income)' stackId='a' />

        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
};
