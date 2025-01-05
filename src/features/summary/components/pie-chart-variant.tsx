'use client';

import { Pie, PieChart } from 'recharts';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

type Props = {
  data?: {
    name: string;
    value: number;
  }[];
};

const COLORS = ['#2662D9', '#E23670', '#E88C30', '#AF57DB', '#2EB88A'];

export const PieChartVariant = ({ data }: Props) => {
  if (!data) {
    return null;
  }

  const chartConfig = data?.reduce((config, item, index) => {
    const label = item.name; // The category name
    config[label] = {
      label: label,
      color: COLORS[index % COLORS.length],
    };
    return config;
  }, {} as ChartConfig) satisfies ChartConfig;

  const dataUpdated = data?.map((item, i) => ({
    ...item,
    fill: COLORS[i % COLORS.length],
  }));

  return (
    <ChartContainer config={chartConfig} className='w-full h-[350px]'>
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie data={dataUpdated} dataKey='value' nameKey='name' innerRadius={80} />

        <ChartLegend className='flex-wrap' content={<ChartLegendContent />} />
      </PieChart>
    </ChartContainer>
  );
};
