
//src/app/matchmaking/page.tsx
import React from 'react';
import MatchmakingResults from '@/components/MatchmakingResults';
import { getMatchedFreelancers } from '@/ia/matchServices';

interface Props {
  searchParams: Promise<{ query?: string }>;
}

export default async function MatchmakingPage({ searchParams }: Props) {
  const { query = '' } = await searchParams;

  if (!query.trim()) {
    return <MatchmakingResults query="" results={[]} status="empty" />;
  }

  try {
    const results = await getMatchedFreelancers(query);
    return <MatchmakingResults query={query} results={results} status="success" />;
  } catch (error) {
    console.error('❌ Matchmaking falló:', error);
    return <MatchmakingResults query={query} results={[]} status="error" />;
  }
}