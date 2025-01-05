import { NextRequest, NextResponse } from 'next/server';
import { NextResponseSuccess, NextResponseFailure, tryCatchHandler } from '@/utils/next-api-utils';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/actions/auth-actions';
import { updateTransactionSchema } from '@/features/transaction/schemas/transaction-schemas';

// Helper function to find a transaction by ID and user
const findTransactionByIdAndUser = async (id: string, userId: string) => {
  return prisma.transaction.findFirst({
    where: {
      id,
      financeAccount: {
        userId,
      },
    },
  });
};

// GET handler: Retrieve a specific transaction
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  return tryCatchHandler(req, async () => {
    const user = await getCurrentUser();
    if (!user) return NextResponseFailure(403, 'Unauthorized.');

    const id = (await params).id;
    const transaction = await findTransactionByIdAndUser(id, user.id);
    if (!transaction) return NextResponseFailure(404, 'Transaction not found.');

    return NextResponseSuccess(200, 'Transaction retrieved successfully.', transaction);
  });
}

// PUT handler: Update a specific transaction
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  return tryCatchHandler(req, async (body) => {
    const user = await getCurrentUser();
    if (!user) return NextResponseFailure(403, 'Unauthorized.');

    const id = (await params).id;

    // Validate request body
    const { notes, amount, payee, date, categoryId, financeAccountId } = updateTransactionSchema.parse(body);

    // Ensure the transaction exists and belongs to the user
    const transaction = await findTransactionByIdAndUser(id, user.id);
    if (!transaction) return NextResponseFailure(404, 'Transaction not found.');

    // Validate finance account if updated
    if (financeAccountId) {
      const financeAccount = await prisma.financeAccount.findUnique({
        where: { id: financeAccountId },
      });
      if (!financeAccount) return NextResponseFailure(404, 'Finance account not found.');
      if (financeAccount.userId !== user.id) return NextResponseFailure(403, 'Unauthorized.');
    }

    // Validate category if updated
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });
      if (!category) return NextResponseFailure(404, 'Category not found.');
      if (category.userId !== user.id) return NextResponseFailure(403, 'Unauthorized.');
    }

    // Update the transaction
    const updatedTransaction = await prisma.transaction.update({
      where: { id },
      data: {
        ...(notes && { notes }),
        ...(amount && { amount }),
        ...(payee && { payee }),
        ...(date && { date }),
        ...(categoryId && { categoryId }),
        ...(financeAccountId && { financeAccountId }),
      },
    });

    return NextResponseSuccess(200, 'Transaction updated successfully.', updatedTransaction);
  });
}

// DELETE handler: Delete a specific transaction
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  return tryCatchHandler(req, async () => {
    const user = await getCurrentUser();
    if (!user) return NextResponseFailure(403, 'Unauthorized.');

    const id = (await params).id;

    // Ensure the transaction exists and belongs to the user
    const transaction = await findTransactionByIdAndUser(id, user.id);
    if (!transaction) return NextResponseFailure(404, 'Transaction not found.');

    // Delete the transaction
    await prisma.transaction.delete({ where: { id } });
    return NextResponseSuccess(200, 'Transaction deleted successfully.');
  });
}
