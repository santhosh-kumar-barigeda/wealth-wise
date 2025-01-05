'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ModalProvider } from '@/components/providers/modal-provider';
import { queryClient } from '@/lib/query-client';
import { Toaster } from '@/components/ui/sonner';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <ModalProvider />
          <Toaster position='top-right' />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};
