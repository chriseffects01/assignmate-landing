'use client';

import { useEffect, useState } from 'react';
import OfflineDraft from '@/src/types/draft.types';
import { draftService } from '@/src/services/drafts/draft.service';
import { useParams } from 'next/navigation';
import { useAuth } from '@/src/context/AuthContext';
import { EmptyState } from '../shared/EmptyState';
import { useNotification } from '@/src/context/NotificationContext';
import LoadingScreen from '../shared/LoadingScreen';
export default function DraftsWorkspace() {
  const [draft, setDraft] = useState<OfflineDraft | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const { user } = useAuth();
  const assignmentId = params?.id as string;
  const userId = user?._id;
  const { toast } = useNotification();

  useEffect(() => {
    const load = () => {
      if (!userId) return;

      setIsLoading(true);

      try {
        const data = draftService.get(userId, assignmentId);
        setDraft(data);
      } catch (e: any) {
        console.error('No draft with that id');
        toast.error('No draft with that id');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);
  console.log(draft);

  if (!draft) {
    return (
      <EmptyState
        isOffline={false}
        path=""
        context="Draft with that id"
        contextMessage="No draft with that id was stored locally"
        contextPath="/dashboard/drafts"
      />
    );
  }
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div>Workspace</div>
    </>
  );
}
