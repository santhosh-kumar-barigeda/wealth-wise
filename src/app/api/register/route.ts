import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { NextResponseSuccess, NextResponseFailure, tryCatchHandler } from '@/utils/next-api-utils';
import { signUpSchema } from '@/features/auth/schemas/auth-schemas';

// POST API Route for user sign-up
export async function POST(req: NextRequest): Promise<NextResponse> {
  return tryCatchHandler(req, async (body) => {
    // Validate the request body
    const { name, email, password } = signUpSchema.parse(body);

    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponseFailure(400, 'Email is already in use.');
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // Respond with success
    return NextResponseSuccess(201, 'User created successfully', {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    });
  });
}
