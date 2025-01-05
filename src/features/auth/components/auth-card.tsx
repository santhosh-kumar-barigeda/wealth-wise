import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthSocialButtons } from '@/features/auth/components/auth-social-buttons';
import { SeparatorWithText } from '@/components/shared/separator-with-text';
import { AuthForm } from '@/features/auth/components/auth-form';

interface Props {
  isSignIn: boolean;
}

function getAuthCardContent(isSignIn: boolean) {
  return {
    headerTitle: isSignIn ? 'Welcome back!' : 'Join us today!',
    headerDescription: isSignIn ? 'Sign in to continue.' : 'Create an account to get started.',
    footerLinkLabel: isSignIn ? 'Sign Up' : 'Sign In',
    footerLinkHref: isSignIn ? '/sign-up' : '/sign-in',
    footerDescription: isSignIn ? "Don't have an account? " : 'Already a member? ',
  };
}

export function AuthCard({ isSignIn }: Props) {
  const { headerTitle, headerDescription, footerLinkLabel, footerLinkHref, footerDescription } = getAuthCardContent(isSignIn);

  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader className='text-center'>
        <CardTitle className='text-xl'>{headerTitle}</CardTitle>
        <CardDescription>{headerDescription}</CardDescription>
      </CardHeader>

      <CardContent>
        <AuthForm isSignIn={isSignIn} />
        <SeparatorWithText text='or continue with' className='my-5' />
        <AuthSocialButtons />
      </CardContent>

      <CardFooter>
        <div className='w-full text-center text-xs'>
          {footerDescription}
          <Link href={footerLinkHref} className='text-blue-500 hover:underline'>
            {footerLinkLabel}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
