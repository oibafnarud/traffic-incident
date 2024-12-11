// src/hooks/useToast.ts
import { toast } from 'sonner';

interface ToastOptions {
  type?: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export const useToast = () => {
  const showToast = ({ type = 'info', message }: ToastOptions) => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      default:
        toast(message);
    }
  };

  return { toast: showToast };
};