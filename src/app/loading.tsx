import { Loader2Icon } from 'lucide-react';

export default function LoadingPage() {
  return (
    <div className='min-h-screen flex items-center justify-center '>
      <div className='text-center space-y-4'>
        <div className='flex items-center justify-center gap-3'>
          <Loader2Icon className='size-5 text-primary animate-spin' />
          <div className='text-lg font-medium text-primary'>WealthWise is loading...</div>
        </div>

        <div className='text-sm text-muted-foreground'>Please wait while we prepare your dashboard.</div>
      </div>
    </div>
  );
}
