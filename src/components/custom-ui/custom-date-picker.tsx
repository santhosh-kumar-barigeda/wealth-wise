'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { FieldValues, FieldPath, UseFormReturn, PathValue } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface CustomDatePickerFormFieldProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
}

export function CustomDatePickerFormField<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  description = '',
  placeholder = 'Pick a date',
  disabled,
}: CustomDatePickerFormFieldProps<TFieldValues>) {
  const [date, setDate] = React.useState<Date | undefined>(form.getValues(name));

  return (
    <FormItem className='space-y-1.5'>
      {label && <FormLabel className='text-xs'>{label}</FormLabel>}
      <FormControl>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'outline'} className='w-full justify-start text-left text-sm font-normal' disabled={disabled}>
              <CalendarIcon className='size-4' />
              {date ? format(date, 'PPP') : <span>{placeholder}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={(selectedDate) => {
                if (selectedDate instanceof Date) {
                  setDate(selectedDate);
                  // Adjust based on your schema
                  form.setValue(name, selectedDate as PathValue<TFieldValues, FieldPath<TFieldValues>>, { shouldValidate: true });
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage>{form.formState.errors[name]?.message as string}</FormMessage>
    </FormItem>
  );
}
