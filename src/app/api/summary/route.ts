import { NextRequest, NextResponse } from 'next/server';
import { NextResponseSuccess, NextResponseFailure, tryCatchHandler } from '@/utils/next-api-utils';
import { getCurrentUser } from '@/actions/auth-actions';
import { differenceInDays, parse, subDays } from 'date-fns';
import { prisma } from '@/lib/prisma';
import { calculatePercentageChange, fillMissingDays } from '@/utils/finance-utils';
import { TransactionResponse } from '@/features/transaction/schemas/transaction-schemas';

export async function GET(req: NextRequest): Promise<NextResponse> {
  return tryCatchHandler(req, async (body, searchParams) => {
    const user = await getCurrentUser();
    if (!user) return NextResponseFailure(403, 'Unauthorized');

    const { accountId, from, to } = Object.fromEntries(searchParams.entries());

    const defaultEndDate = new Date();
    const defaultStartDate = subDays(defaultEndDate, 30);

    const startDate = from ? parse(from, 'yyyy-MM-dd', new Date()) : defaultStartDate;
    const endDate = to ? parse(to, 'yyyy-MM-dd', new Date()) : defaultEndDate;

    const periodLength = differenceInDays(endDate, startDate) + 1;
    const lastPeriodStart = subDays(startDate, periodLength);
    const lastPeriodEnd = subDays(endDate, periodLength);

    const fetchFinancialData = async (userId: string, startDate: Date, endDate: Date, financeAccountId?: string) => {
      const transactions = await prisma.transaction.findMany({
        where: {
          financeAccount: {
            userId,
          },
          date: {
            gt: startDate,
            lt: endDate,
          },
          ...(financeAccountId && { financeAccountId: accountId }),
        },
      });

      const income = transactions.filter((data) => data.amount >= 0).reduce((acc, data) => acc + data.amount, 0);
      const expenses = transactions.filter((data) => data.amount < 0).reduce((acc, data) => acc + data.amount, 0);
      const remaining = transactions.reduce((acc, data) => acc + data.amount, 0);

      return {
        income,
        expenses,
        remaining,
      };
    };

    const currentPeriod = await fetchFinancialData(user.id, startDate, endDate, accountId);
    const lastPeriod = await fetchFinancialData(user.id, lastPeriodStart, lastPeriodEnd, accountId);

    const incomeChange = calculatePercentageChange(currentPeriod.income, lastPeriod.income);
    const expensesChange = calculatePercentageChange(currentPeriod.expenses, lastPeriod.expenses);
    const remainingChange = calculatePercentageChange(currentPeriod.remaining, lastPeriod.remaining);

    console.log({
      currentPeriod,
      lastPeriod,
      incomeChange,
      expensesChange,
      remainingChange,
    });

    const transactions = await prisma.transaction.findMany({
      where: {
        financeAccount: {
          userId: user.id,
        },
        amount: {
          lt: 0,
        },
        date: {
          gt: startDate,
          lt: endDate,
        },
        ...(accountId && { financeAccountId: accountId }),
      },
      include: {
        category: true,
        financeAccount: true,
      },
    });

    const santizedTransactions = transactions.map((t) => ({ name: t.category?.name || 'Unacategorized', value: Math.abs(t.amount) }));

    type GroupedData = { [key: string]: { name: string; value: number } };

    const groupedData = santizedTransactions.reduce<GroupedData>((acc, { name, value }) => {
      if (!acc[name]) {
        acc[name] = { name, value: 0 };
      }
      acc[name].value += value;
      return acc;
    }, {});

    const groupedTransactions = Object.values(groupedData).sort((a, b) => b.value - a.value);

    const topCategories = groupedTransactions.slice(0, 3);
    const otherCategories = groupedTransactions.slice(3);

    const otherSum = otherCategories.reduce((sum, curr) => sum + curr.value, 0);

    const finalCategories = topCategories;

    if (otherCategories.length > 0) {
      finalCategories.push({
        name: 'Other',
        value: otherSum,
      });
    }

    const dailyTransactions = await prisma.transaction.findMany({
      where: {
        financeAccount: {
          userId: user.id,
        },
        date: {
          gt: startDate,
          lt: endDate,
        },
        ...(accountId && { financeAccountId: accountId }),
      },
      include: {
        category: true,
        financeAccount: true,
      },
    });

    type GroupedTransaction = {
      date: Date;
      income: number;
      expenses: number;
    };

    function groupTransactionsByDate(transactions: TransactionResponse[]): GroupedTransaction[] {
      const groupedData = transactions.reduce<Record<string, { income: number; expenses: number }>>((acc, transaction) => {
        if (!transaction.date) {
          return acc; // Skip transactions without a valid date
        }

        const dateKey = transaction.date.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'

        if (!acc[dateKey]) {
          acc[dateKey] = { income: 0, expenses: 0 };
        }

        if (transaction.amount > 0) {
          acc[dateKey].income += transaction.amount;
        } else {
          acc[dateKey].expenses += transaction.amount;
        }

        return acc;
      }, {});

      return Object.entries(groupedData).map(([date, { income, expenses }]) => ({
        date: new Date(date),
        income: Math.abs(income),
        expenses: Math.abs(expenses),
      }));
    }

    const activeDays = groupTransactionsByDate(dailyTransactions);
    const days = fillMissingDays(activeDays, startDate, endDate);

    return NextResponseSuccess(200, 'Success', {
      remainingAmount: Number(currentPeriod.remaining.toFixed(2)),
      incomeAmount: Number(currentPeriod.income.toFixed(2)),
      expensesAmount: Number(currentPeriod.expenses.toFixed(2)),
      remainingChange: Number(remainingChange.toFixed(2)),
      incomeChange: Number(incomeChange.toFixed(2)),
      expensesChange: Number(expensesChange.toFixed(2)),
      categories: finalCategories,
      days,
    });
  });
}
