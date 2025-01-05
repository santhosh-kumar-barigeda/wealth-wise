'use client';

import { RadialBar, RadialBarChart } from 'recharts';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from '@/components/ui/chart';

type Props = {
  data?: {
    name: string;
    value: number;
  }[];
};

const COLORS = ['#2662D9', '#E23670', '#E88C30', '#AF57DB', '#2EB88A'];

export const RadialChartVariant = ({ data }: Props) => {
  if (!data) {
    return null;
  }

  const chartConfig = data?.reduce((config, item, index) => {
    const label = item.name;
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
      <RadialBarChart data={dataUpdated} innerRadius={30} outerRadius={110}>
        <RadialBar dataKey='value' background />

        <ChartLegend className='flex-wrap' content={<ChartLegendContent />} />
      </RadialBarChart>
    </ChartContainer>
  );
};
