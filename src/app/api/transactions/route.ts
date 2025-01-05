import { NextRequest, NextResponse } from 'next/server';
import { NextResponseSuccess, NextResponseFailure, tryCatchHandler } from '@/utils/next-api-utils';
import { createTransactionSchema, deleteTransactionsSchema } from '@/features/transaction/schemas/transaction-schemas';
import { getCurrentUser } from '@/actions/auth-actions';
import { prisma } from '@/lib/prisma';
import { parse, subDays } from 'date-fns';

// POST: Create a new transaction
export async function POST(req: NextRequest): Promise<NextResponse> {
  return tryCatchHandler(req, async (body) => {
    const user = await getCurrentUser();
    if (!user) return NextResponseFailure(403, 'Unauthorized');

    console.log(body);

    const { notes, amount, payee, date, categoryId, financeAccountId } = createTransactionSchema.parse(body);

    const financeAccount = await prisma.financeAccount.findUnique({
      where: { id: financeAccountId },
    });
    if (!financeAccount) return NextResponseFailure(404, 'Finance account not found');
    if (financeAccount.userId !== user.id) return NextResponseFailure(403, 'Unauthorized');

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) return NextResponseFailure(404, 'Category not found');
    if (category.userId !== user.id) return NextResponseFailure(403, 'Unauthorized');

    const transaction = await prisma.transaction.create({
      data: {
        notes,
        amount,
        payee,
        categoryId,
        financeAccountId,
        date,
      },
    });

    return NextResponseSuccess(201, 'Transaction created successfully', transaction);
  });
}

// GET: Retrieve all transactions for the user
export async function GET(req: NextRequest): Promise<NextResponse> {
  return tryCatchHandler(req, async (body, searchParams) => {
    const user = await getCurrentUser();
    if (!user) return NextResponseFailure(403, 'Unauthorized');

    const { accountId, from, to } = Object.fromEntries(searchParams.entries());

    const defaultEndDate = new Date();
    const defaultStartDate = subDays(defaultEndDate, 30);

    const startDate = from ? parse(from, 'yyyy-MM-dd', new Date()) : defaultStartDate;
    const endDate = to ? parse(to, 'yyyy-MM-dd', new Date()) : defaultEndDate;

    const transactions = await prisma.transaction.findMany({
      where: {
        financeAccount: {
          userId: user.id,
        },
        date: {
          gte: startDate,
          lt: endDate,
        },
        ...(accountId && { accountId }),
      },
      include: {
        category: true,
        financeAccount: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponseSuccess(200, 'Transactions retrieved successfully', transactions);
  });
}

// PUT: Bulk delete transactions
export async function PUT(req: NextRequest): Promise<NextResponse> {
  return tryCatchHandler(req, async (body) => {
    const user = await getCurrentUser();
    if (!user) return NextResponseFailure(403, 'Unauthorized');

    const { ids } = deleteTransactionsSchema.parse(body);

    if (!ids || ids.length === 0) {
      return NextResponseFailure(400, 'No transaction IDs provided for deletion');
    }

    await prisma.transaction.deleteMany({
      where: {
        id: { in: ids },
        financeAccount: {
          userId: user.id,
        },
      },
    });

    return NextResponseSuccess(200, 'Transactions deleted successfully');
  });
}
