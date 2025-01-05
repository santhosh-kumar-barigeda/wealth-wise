import { UserResponse } from '@/features/user/schemas/user.schemas';
import { format, parse, subDays } from 'date-fns';

export const sanitizeUser = (user: UserResponse) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

type Period = {
  from: Date | string | undefined;
  to: Date | string | undefined;
};

export const formatDateRange = (period?: Period) => {
  const defaultEndDate = new Date();
  const defaultStartDate = subDays(defaultEndDate, 30);

  if (!period?.from) {
    return `${format(defaultStartDate, 'LLL dd, y')} - ${format(defaultEndDate, 'LLL dd, y')}`;
  }

  if (period?.to) {
    return `${format(period.from, 'LLL dd, y')} - ${format(period.to, 'LLL dd, y')}`;
  }

  return format(period.from, 'LLL dd, y');
};

export const formatPercentage = (percentage: number, { addPrefix }: { addPrefix?: boolean }): string => {
  // Round the percentage to 2 decimal places
  const formattedPercentage = percentage.toFixed(2);

  // Determine the prefix based on the flag
  if (addPrefix) {
    return percentage >= 0 ? `+${formattedPercentage}%` : `${formattedPercentage}%`;
  }

  return `${formattedPercentage}%`;
};
