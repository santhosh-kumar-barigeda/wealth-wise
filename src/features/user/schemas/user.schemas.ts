import { User } from '@prisma/client';
import { z } from 'zod';

export const createUserType = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().optional(),
  image: z.string().optional(),
  emailVerified: z.date().optional(),
});

export const updateUserType = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  image: z.string().optional(),
  emailVerified: z.date().optional(),
});

export type CreateUserInput = z.infer<typeof createUserType>;
export type UpdateUserInput = z.infer<typeof updateUserType>;
export type UserResponse = User;
