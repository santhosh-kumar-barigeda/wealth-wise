import { eachDayOfInterval, isSameDay } from 'date-fns';

export const formatCurrency = (amount: number, currency: string = 'INR', locale: string = 'en-US'): string => {
  if (typeof amount !== 'number') {
    throw new Error('Amount must be a number');
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

export const calculatePercentageChange = (current: number, previous: number) => {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }

  return ((current - previous) / previous) * 100;
};

export const fillMissingDays = (activeDays: { date: Date; income: number; expenses: number }[], startDate: Date, endDate: Date) => {
  if (activeDays.length === 0) {
    return [];
  }

  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));

    if (found) {
      return found;
    } else {
      return {
        date: day,
        income: 0,
        expenses: 0,
      };
    }
  });

  return transactionsByDay;
};
