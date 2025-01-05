'use client';

import { FieldValues, FieldPath, UseFormReturn } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface CustomTextareaFormFieldProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  description?: string;
  rows?: number;
  disabled?: boolean;
}

export function CustomTextareaFormField<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder = '',
  description = '',
  rows = 4,
  disabled,
}: CustomTextareaFormFieldProps<TFieldValues>) {
  return (
    <FormItem className='space-y-1'>
      {label && <FormLabel className='text-xs'>{label}</FormLabel>}
      <FormControl>
        <Textarea placeholder={placeholder} rows={rows} {...form.register(name)} disabled={disabled} className='text-sm' />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage>{form.formState.errors[name]?.message as string}</FormMessage>
    </FormItem>
  );
}
