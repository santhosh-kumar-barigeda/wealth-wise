// Next.js modules
import { useRouter } from 'next/navigation';

// External libraries
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

// Application-specific modules
import { signInSchema, signUpSchema } from '@/features/auth/schemas/auth-schemas';
import { handleCredentialsSignIn } from '@/actions/auth-actions';
import { axiosInstance } from '@/lib/axios-client';
import { useState } from 'react';

export const useAuthForm = (isSignIn: boolean) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  type SignUpType = z.infer<typeof signUpSchema>;
  type SignInType = z.infer<typeof signInSchema>;
  type FormType = SignUpType | SignInType;

  // Adjust default values based on the form type
  const signUpDefaults = { name: '', email: '', password: '' };
  const signInDefaults = { email: '', password: '' };

  const form = useForm<FormType>({
    resolver: zodResolver(isSignIn ? signInSchema : signUpSchema),
    defaultValues: isSignIn ? signInDefaults : signUpDefaults,
  });

  async function onSubmit(values: FormType) {
    setIsLoading(true);
    try {
      if (isSignIn) {
        const { success } = await handleCredentialsSignIn(values);

        if (success) {
          toast.success('Signed In!');
          router.push('/');
        }
      } else {
        const res = await axiosInstance.post('/register', values);

        if (res.data) {
          const { success } = await handleCredentialsSignIn(values);
          if (success) {
            toast.success('Registered!');
            router.push('/');
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(isSignIn ? 'Sign In Failed' : 'Registration Failed');
    } finally {
      setIsLoading(false);
    }
  }

  return { form, onSubmit, isLoading };
};
