import { AuthCard } from '@/features/auth/components/auth-card';

export default function SignUpPage() {
  return (
    <div className='w-full'>
      <AuthCard isSignIn={false} />
    </div>
  );
}
