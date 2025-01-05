import { AuthCard } from '@/features/auth/components/auth-card';

export default function SignInPage() {
  return (
    <div className='w-full'>
      <AuthCard isSignIn={true} />
    </div>
  );
}
