import { z } from 'zod';
import { Transaction } from '@prisma/client';
import { dateSchema, idSchema } from '@/schemas/base-schemas';
import { CategoryResponse } from '@/features/category/schemas/category-schemas';
import { FinanceAccountResponse } from '@/features/finance-account/schemas/finance-account-schemas';

export const createTransactionSchema = z.object({
  amount: z
    .union([z.string(), z.number()])
    .refine((value) => typeof value === 'number' || !isNaN(Number(value)), {
      message: 'Must be a valid number',
    })
    .transform((value) => (typeof value === 'string' ? Number(value) : value)),
  payee: z.string(),
  financeAccountId: idSchema,
  categoryId: idSchema.optional(),
  date: dateSchema.optional(),
  notes: z.string().optional(),
});

export const updateTransactionSchema = z.object({
  amount: z
    .union([z.string(), z.number()])
    .refine((value) => typeof value === 'number' || !isNaN(Number(value)), {
      message: 'Must be a valid number',
    })
    .transform((value) => (typeof value === 'string' ? Number(value) : value)),
  payee: z.string().optional(),
  financeAccountId: idSchema.optional(),
  categoryId: idSchema.optional(),
  date: dateSchema.optional(),
  notes: z.string().optional(),
});

export const deleteTransactionsSchema = z.object({
  ids: z.array(z.string()),
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
export type TransactionResponse = Transaction;

export interface TransactionResponseWithExtras extends TransactionResponse {
  category: CategoryResponse;
  financeAccount: FinanceAccountResponse;
}
