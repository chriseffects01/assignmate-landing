import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ConfirmOptions } from '../types/niotification.types';

interface OfflineHandlerOptions {
  err: unknown;
  OfflineErrorClass: any;
  confirm: (options: ConfirmOptions) => void;

  toast: {
    success: (msg: string, duration?: number) => void;
    error: (msg: string, duration?: number) => void;
    info: (msg: string, duration?: number) => void;
    warning: (msg: string, duration?: number) => void;
  };

  router: AppRouterInstance;
  onRetry: () => Promise<void>;
  setIsRetrying: (loading: boolean) => void;
  message: string;
  closeModal: () => void;
}

export function handleOfflineError({
  err,
  OfflineErrorClass,
  toast,
  router,
  message,
  onRetry,
  setIsRetrying,
  closeModal,
  confirm,
}: OfflineHandlerOptions): boolean {
  if (err instanceof OfflineErrorClass) {
    confirm({
      title: "You're Offline",
      message: message,

      confirmText: 'Go to drafts page',
      cancelText: 'Retry',
      type: 'warning',
      onConfirm: () => {
        toast.success('Moving to drafts page');
        closeModal();
        router.push('/dashboard/drafts');
      },

      onCancel: async () => {
        closeModal();

        setIsRetrying(true);

        try {
          await new Promise(resolve => setTimeout(resolve, 1500));
          await onRetry();
          toast.success("You're back online");
          closeModal();
        } catch (retryErr: any) {
          toast.warning('Still offline');
          closeModal();
          // handleOfflineError({
          //   err: retryErr,
          //   OfflineErrorClass,
          //   confirm,
          //   toast,
          //   router,
          //   onRetry,
          //   setIsRetrying,
          //   message,
          //   closeModal,
          // });
        } finally {
          setIsRetrying(false);
        }
      },
    });
    return true;
  }
  return false;
}
