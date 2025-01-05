import { NextRequest, NextResponse } from 'next/server';
import { NextResponseSuccess, NextResponseFailure, tryCatchHandler } from '@/utils/next-api-utils';
import { createFinanceAccountSchema, deleteFinanceAccountsSchema } from '@/features/finance-account/schemas/finance-account-schemas';
import { getCurrentUser } from '@/actions/auth-actions';
import { prisma } from '@/lib/prisma';

// POST: Create a new finance account
export async function POST(req: NextRequest): Promise<NextResponse> {
  return tryCatchHandler(req, async (body) => {
    const user = await getCurrentUser();
    if (!user) return NextResponseFailure(403, 'Unauthorized');

    const { name } = createFinanceAccountSchema.parse(body);

    const financeAccount = await prisma.financeAccount.create({
      data: {
        name,
        userId: user.id,
      },
    });

    return NextResponseSuccess(201, 'Account created successfully', financeAccount);
  });
}

// GET: Retrieve all finance accounts for the user
export async function GET(req: NextRequest): Promise<NextResponse> {
  return tryCatchHandler(req, async () => {
    const user = await getCurrentUser();
    if (!user) return NextResponseFailure(403, 'Unauthorized');

    const financeAccounts = await prisma.financeAccount.findMany({
      where: { userId: user.id },
    });

    return NextResponseSuccess(200, 'Accounts retrieved successfully', financeAccounts);
  });
}

// PUT: Bulk delete finance accounts
export async function PUT(req: NextRequest): Promise<NextResponse> {
  return tryCatchHandler(req, async (body) => {
    const user = await getCurrentUser();
    if (!user) return NextResponseFailure(403, 'Unauthorized');

    const { ids } = deleteFinanceAccountsSchema.parse(body);

    if (!ids || ids.length === 0) {
      return NextResponseFailure(400, 'No account IDs provided for deletion');
    }

    await prisma.financeAccount.deleteMany({
      where: {
        id: { in: ids },
        userId: user.id,
      },
    });

    return NextResponseSuccess(200, 'Accounts deleted successfully');
  });
}
