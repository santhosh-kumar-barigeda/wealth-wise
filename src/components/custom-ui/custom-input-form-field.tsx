'use client';

import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { FieldValues, FieldPath, UseFormReturn } from 'react-hook-form';

import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface CustomInputFormFieldProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  type?: 'text' | 'number' | 'email' | 'password';
  showPassword?: boolean;
  forgotPasswordHref?: string;
  disabled?: boolean;
}

export function CustomInputFormField<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder = '',
  description = '',
  type = 'text',
  showPassword = false,
  forgotPasswordHref,
  disabled,
}: CustomInputFormFieldProps<TFieldValues>) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  // Password visibility logic
  const inputType = showPassword && type === 'password' && isPasswordVisible ? 'text' : type;

  return (
    <FormItem className='space-y-1'>
      <div className='flex items-center justify-between'>
        {label && <FormLabel className='text-xs'>{label}</FormLabel>}
        {forgotPasswordHref && (
          <Link href={forgotPasswordHref} className='text-xs text-blue-500 hover:underline'>
            Forgot Password?
          </Link>
        )}
      </div>
      <FormControl>
        <div className='relative'>
          <Input type={inputType} placeholder={placeholder} {...form.register(name)} disabled={disabled} className='text-sm' />
          {showPassword && type === 'password' && (
            <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2' onClick={() => setPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? <EyeOffIcon className='size-4 text-muted-foreground' /> : <EyeIcon className='size-4 text-muted-foreground' />}
            </button>
          )}
        </div>
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage>{form.formState.errors[name]?.message as string}</FormMessage>
    </FormItem>
  );
}
