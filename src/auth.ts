import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { signInSchema } from '@/features/auth/schemas/auth-schemas';
import { User } from '@prisma/client';

// Define types for the credentials
interface Credentials {
  email: string;
  password: string;
}

// Helper function for user authentication
const authenticateUser = async ({ email, password }: Credentials): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.password) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  return user;
};

// Auth options configuration
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    GitHub,
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'example@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials) throw new Error('No credentials provided.');

        // Validate input using Zod schema
        const { email, password } = signInSchema.parse(credentials);

        // Authenticate user
        const user = await authenticateUser({ email, password });

        if (!user) throw new Error('Invalid email or password.');

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
});
