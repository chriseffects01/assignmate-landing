import { ConfirmOptions, Toast } from '../types/niotification.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { deleteAssignment } from '../services/assignmentService';
import { draftService } from '../services/drafts/draft.service';

export const handleDeleteAssignment = async (
  id: string,
  confirm: (options: ConfirmOptions) => void,
  closeConfirm: any,
  toast: {
    success: (msg: string, duration?: number) => void;
    error: (msg: string, duration?: number) => void;
    info: (msg: string, duration?: number) => void;
    warning: (msg: string, duration?: number) => void;
  },
  router: AppRouterInstance,
  userId: string
) => {
  confirm({
    title: 'Delete assignment?',
    message: 'This assignment will be deleted permanently!',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    type: 'danger',
    onConfirm: async () => {
      if (!userId) return;
      try {
        const res = await deleteAssignment(id);
        draftService.remove(userId, id);

        toast.success(
          res.success === true ? res.message : 'Failed to delete assignment'
        );
        router.push('/dashboard/assignments');
      } catch (e) {
        toast.error('Failed to delete assignment');
        console.error('Failed to delete assignment:', e);
      } finally {
        closeConfirm();
      }
    },
    onCancel: () => {
      closeConfirm();
    },
  });
};
