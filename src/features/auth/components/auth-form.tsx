'use client';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { CustomInputFormField } from '@/components/custom-ui/custom-input-form-field';
import { useAuthForm } from '@/features/auth/hooks/use-auth-form';

interface Props {
  isSignIn: boolean;
}

export function AuthForm({ isSignIn }: Props) {
  const { form, onSubmit, isLoading } = useAuthForm(isSignIn);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {!isSignIn && <CustomInputFormField form={form} name='name' label='Name' placeholder='Enter your name' disabled={isLoading} />}
        <CustomInputFormField form={form} name='email' label='Email' placeholder='Enter your email' type='email' disabled={isLoading} />
        <CustomInputFormField
          form={form}
          name='password'
          label='Password'
          placeholder='Enter your password'
          type='password'
          showPassword
          disabled={isLoading}
        />
        <Button type='submit' className='w-full' disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
