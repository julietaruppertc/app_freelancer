'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import TaskCreation from '@/components/TaskCreation';

export default function CreateTaskPage() {
  const router = useRouter();

  return (
    <TaskCreation
      onGenerateMatchmaking={async (payload) => {
        localStorage.setItem('mvp_last_task_prompt', payload.description);
        router.push(`/matchmaking?query=${encodeURIComponent(payload.description)}`);
      }}
    />
  );
}