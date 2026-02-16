'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      theme="light"
      richColors
      expand
      position="top-right"
      style={{
        '--sonner-color-background': 'hsl(var(--card))',
        '--sonner-color-foreground': 'hsl(var(--card-foreground))',
        '--sonner-color-success': 'hsl(120 50% 50%)',
        '--sonner-color-error': 'hsl(0 84.2% 60.2%)',
        '--sonner-color-info': 'hsl(217.2 91.2% 59.8%)',
        '--sonner-color-warning': 'hsl(38.6 92.1% 50.2%)',
      } as React.CSSProperties}
    />
  );
}
