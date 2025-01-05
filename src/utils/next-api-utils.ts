import { getCurrentUser } from '@/actions/auth-actions';
import { NextRequest, NextResponse } from 'next/server';

// Utility functions for standardized responses
export const NextResponseSuccess = (status: number = 200, message: string = 'Success', data: unknown = null): NextResponse =>
  NextResponse.json({ success: true, message, data }, { status });

export const NextResponseFailure = (status: number = 500, message: string = 'Internal Server Error'): NextResponse =>
  NextResponse.json({ success: false, message }, { status });

// Try-Catch handler to wrap API logic
export const tryCatchHandler = async <TBody = any>(
  req: NextRequest,
  cb: (body: TBody, searchParams: URLSearchParams) => Promise<NextResponse>
): Promise<NextResponse> => {
  try {
    // Attempt to parse the JSON body
    const body = req.method === 'GET' || req.method === 'DELETE' ? ({} as TBody) : await req.json();
    const searchParams = req.nextUrl.searchParams;

    // Execute the callback and return its response
    return await cb(body, searchParams);
  } catch (error) {
    console.error(`'API Error: ${req.url}'`, error);

    // Return appropriate error response
    return NextResponseFailure(error instanceof SyntaxError ? 400 : 500, error instanceof Error ? error.message : 'Unexpected error occurred.');
  }
};

export const validateUser = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponseFailure(403, 'Unauthorized');
  }

  return user;
};
