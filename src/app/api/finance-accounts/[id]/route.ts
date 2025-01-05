import { NextRequest, NextResponse } from 'next/server';
import { NextResponseSuccess, NextResponseFailure, tryCatchHandler } from '@/utils/next-api-utils';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/actions/auth-actions';
import { updateFinanceAccountSchema } from '@/features/finance-account/schemas/finance-account-schemas';

// Helper function to find an account by ID and user
const findAccountByIdAndUser = async (id: string, userId: string) => {
  return prisma.financeAccount.findUnique({
    where: { id, userId },
  });
};

// GET handler
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  return tryCatchHandler(req, async () => {
    const user = await getCurrentUser();
    if (!user) return NextResponseFailure(403, 'Unauthorized');

    const id = (await params).id;
    const financeAccount = await findAccountByIdAndUser(id, user.id);
    if (!financeAccount) return NextResponseFailure(404, 'Account not found');

    return NextResponseSuccess(200, 'Success', financeAccount);
  });
}

// PUT handler
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  return tryCatchHandler(req, async (body) => {
    const user = await getCurrentUser();
    if (!user) return NextResponseFailure(403, 'Unauthorized');

    const id = (await params).id;
    const { name } = updateFinanceAccountSchema.parse(body);

    const financeAccount = await findAccountByIdAndUser(id, user.id);
    if (!financeAccount) return NextResponseFailure(404, 'Account not found');

    const updatedAccount = await prisma.financeAccount.update({
      where: { id },
      data: { ...(name && { name }) },
    });

    return NextResponseSuccess(200, 'Account updated successfully', updatedAccount);
  });
}

// DELETE handler
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  return tryCatchHandler(req, async () => {
    const user = await getCurrentUser();
    console.log(user);
    if (!user) return NextResponseFailure(403, 'Unauthorized');

    const id = (await params).id;
    const financeAccount = await findAccountByIdAndUser(id, user.id);
    if (!financeAccount) return NextResponseFailure(404, 'Account not found');

    await prisma.financeAccount.delete({ where: { id } });
    return NextResponseSuccess(200, 'Account deleted successfully');
  });
}
