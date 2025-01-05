import { cn } from '@/lib/utils';

type Props = {
  text: string;
  className?: string;
};

export const SeparatorWithText = ({ text, className }: Props) => {
  return (
    <div
      className={cn(
        `relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border`,
        className
      )}
    >
      <span className='relative z-10 bg-background px-2 text-muted-foreground'>{text}</span>
    </div>
  );
};
