'use server';

import { auth, signIn, signOut } from '@/auth';
import { prisma } from '@/lib/prisma';
import { sanitizeUser } from '@/utils/utils';

export const getCurrentUser = async () => {
  const session = await auth();

  const userEmail = session?.user?.email;

  if (!userEmail) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    return null;
  }

  return sanitizeUser(user);
};

export async function handleCredentialsSignIn({ email, password }: { email: string; password: string }) {
  try {
    const result = await signIn('credentials', { email, password, redirect: false });

    if (result?.error) {
      return { success: false, message: result.error };
    }

    return { success: true, message: 'Logged In.', data: result };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

export async function handleGithubSignIn() {
  await signIn('github', { redirect: true, redirectTo: '/' });
}

export async function handleGoogleSignIn() {
  await signIn('google', { redirect: true, redirectTo: '/' });
}

export async function handleSignOut() {
  await signOut({ redirect: true, redirectTo: '/sign-in' });
}
