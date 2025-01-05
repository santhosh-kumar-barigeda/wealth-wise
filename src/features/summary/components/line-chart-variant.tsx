'use client';

import { format } from 'date-fns';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
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

export const LineChartVariant = ({ data }: Props) => {
  return (
    <ChartContainer config={chartConfig} className='w-full h-[350px]'>
      <LineChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey='date' tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => format(value, 'dd MMM')} />
        <YAxis />
        <ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={(value) => format(value, 'PPP')} />} />
        <Line dataKey='income' type='monotone' stroke='var(--color-income)' strokeWidth={2} dot={false} />
        <Line dataKey='expenses' type='monotone' stroke='var(--color-expenses)' strokeWidth={2} dot={false} />

        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  );
};
