import { NextRequest, NextResponse } from 'next/server';
import { NextResponseSuccess, NextResponseFailure, tryCatchHandler } from '@/utils/next-api-utils';
import { createCategorySchema, deleteCategoriesSchema } from '@/features/category/schemas/category-schemas';
import { getCurrentUser } from '@/actions/auth-actions';
import { prisma } from '@/lib/prisma';

// POST: Create a new category
export async function POST(req: NextRequest): Promise<NextResponse> {
  return tryCatchHandler(req, async (body) => {
    const user = await getCurrentUser();
    if (!user) return NextResponseFailure(403, 'Unauthorized');

    const { name } = createCategorySchema.parse(body);

    const category = await prisma.category.create({
      data: {
        name,
        userId: user.id,
      },
    });

    return NextResponseSuccess(201, 'Category created successfully', category);
  });
}

// GET: Retrieve all categories for the user
export async function GET(req: NextRequest): Promise<NextResponse> {
  return tryCatchHandler(req, async () => {
    const user = await getCurrentUser();
    if (!user) return NextResponseFailure(403, 'Unauthorized');

    const categories = await prisma.category.findMany({
      where: { userId: user.id },
    });

    return NextResponseSuccess(200, 'Categories retrieved successfully', categories);
  });
}

// PUT: Bulk delete categories
export async function PUT(req: NextRequest): Promise<NextResponse> {
  return tryCatchHandler(req, async (body) => {
    const user = await getCurrentUser();
    if (!user) return NextResponseFailure(403, 'Unauthorized');

    const { ids } = deleteCategoriesSchema.parse(body);

    if (!ids || ids.length === 0) {
      return NextResponseFailure(400, 'No category IDs provided for deletion');
    }

    await prisma.category.deleteMany({
      where: {
        id: { in: ids },
        userId: user.id,
      },
    });

    return NextResponseSuccess(200, 'Categories deleted successfully');
  });
}
