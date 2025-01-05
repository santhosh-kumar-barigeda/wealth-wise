import { z } from 'zod';
import { FinanceAccount } from '@prisma/client';
import { nameSchema } from '@/schemas/base-schemas';

export const createFinanceAccountSchema = z.object({
  name: nameSchema,
});

export const updateFinanceAccountSchema = z.object({
  name: nameSchema,
});

export const deleteFinanceAccountsSchema = z.object({
  ids: z.array(z.string()),
});

export type CreateFinanceAccountInput = z.infer<typeof createFinanceAccountSchema>;
export type UpdateFinanceAccountInput = z.infer<typeof updateFinanceAccountSchema>;
export type FinanceAccountResponse = FinanceAccount;
