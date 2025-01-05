import { DataGrid } from '@/features/summary/components/data-grid';
import { DataCharts } from '@/features/summary/components/data-charts';

export default function Home() {
  return (
    <div className='pb-10 -mt-28'>
      <DataGrid />
      <DataCharts />
    </div>
  );
}
