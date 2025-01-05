import { z } from 'zod';
import { Category } from '@prisma/client';
import { idSchema, nameSchema } from '@/schemas/base-schemas';

export const createCategorySchema = z.object({
  name: nameSchema,
});

export const updateCategorySchema = z.object({
  name: nameSchema,
});

export const deleteCategoriesSchema = z.object({
  ids: z.array(z.string()),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CategoryResponse = Category;
