import { toast } from 'sonner';

export const showToast = {
  success: (message: string) =>
    toast.success(message, {
      duration: 3000,
      position: 'top-right',
    }),

  error: (message: string) =>
    toast.error(message, {
      duration: 3000,
      position: 'top-right',
    }),

  info: (message: string) =>
    toast.info(message, {
      duration: 3000,
      position: 'top-right',
    }),

  loading: (message: string) =>
    toast.loading(message, {
      position: 'top-right',
    }),
};
