'use client';

import { format } from 'date-fns';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
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

export const BarChartVariant = ({ data }: Props) => {
  return (
    <ChartContainer config={chartConfig} className='w-full h-[350px]'>
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey='date' tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => format(value, 'dd MMM')} />
        <YAxis />
        <ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={(value) => format(value, 'PPP')} />} />
        <Bar dataKey='income' fill='var(--color-income)' radius={4} />
        <Bar dataKey='expenses' fill='var(--color-expenses)' radius={4} />

        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  );
};
