'use client';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

type Props = {
  data?: {
    name: string;
    value: number;
  }[];
};

const chartConfig = {
  value: {
    label: 'Value',
    color: '#2662D9',
  },
} satisfies ChartConfig;

export const RadarChartVariant = ({ data }: Props) => {
  return (
    <ChartContainer config={chartConfig} className='w-full h-[350px]'>
      <RadarChart data={data}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey='name' />
        <PolarGrid />
        <Radar
          dataKey='value'
          fill='#2662D9'
          fillOpacity={0.6}
          dot={{
            r: 4,
            fillOpacity: 1,
          }}
        />
      </RadarChart>
    </ChartContainer>
  );
};
