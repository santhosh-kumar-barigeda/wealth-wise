import { NextRequest, NextResponse } from 'next/server';
import { NextResponseSuccess, NextResponseFailure, tryCatchHandler } from '@/utils/next-api-utils';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/actions/auth-actions';
import { updateCategorySchema } from '@/features/category/schemas/category-schemas';

// Helper function to find a category by ID and user
const findCategoryByIdAndUser = async (id: string, userId: string) => {
  return prisma.category.findUnique({
    where: { id, userId },
  });
};

// GET handler: Retrieve a category by ID
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  return tryCatchHandler(req, async () => {
    const user = await getCurrentUser();
    if (!user) return NextResponseFailure(403, 'Unauthorized');

    const id = (await params).id;
    const category = await findCategoryByIdAndUser(id, user.id);
    if (!category) return NextResponseFailure(404, 'Category not found');

    return NextResponseSuccess(200, 'Category retrieved successfully', category);
  });
}

// PUT handler: Update a category by ID
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  return tryCatchHandler(req, async (body) => {
    const user = await getCurrentUser();
    if (!user) return NextResponseFailure(403, 'Unauthorized');

    const id = (await params).id;
    const { name } = updateCategorySchema.parse(body);

    const category = await findCategoryByIdAndUser(id, user.id);
    if (!category) return NextResponseFailure(404, 'Category not found');

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { ...(name && { name }) },
    });

    return NextResponseSuccess(200, 'Category updated successfully', updatedCategory);
  });
}

// DELETE handler: Delete a category by ID
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  return tryCatchHandler(req, async () => {
    const user = await getCurrentUser();
    if (!user) return NextResponseFailure(403, 'Unauthorized');

    const id = (await params).id;
    const category = await findCategoryByIdAndUser(id, user.id);
    if (!category) return NextResponseFailure(404, 'Category not found');

    await prisma.category.delete({ where: { id } });
    return NextResponseSuccess(200, 'Category deleted successfully');
  });
}
