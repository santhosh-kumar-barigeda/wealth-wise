'use client';

import { FieldValues, FieldPath, UseFormReturn, PathValue } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface CustomSelectFormFieldProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
  placeholder?: string;
  options: { value: PathValue<TFieldValues, FieldPath<TFieldValues>>; label: string }[];
  disabled?: boolean;
}

export function CustomSelectFormField<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  description = '',
  placeholder = 'Select an option',
  options,
  disabled,
}: CustomSelectFormFieldProps<TFieldValues>) {
  return (
    <FormItem className='space-y-1'>
      {label && <FormLabel className='text-xs'>{label}</FormLabel>}
      <FormControl>
        <Select
          onValueChange={(value) => form.setValue(name, value as PathValue<TFieldValues, FieldPath<TFieldValues>>)}
          defaultValue={form.getValues(name) as string}
          disabled={disabled}
        >
          <SelectTrigger className='text-sm'>
            <SelectValue placeholder={placeholder} className='text-sm' />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value as string}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage>{form.formState.errors[name]?.message as string}</FormMessage>
    </FormItem>
  );
}
