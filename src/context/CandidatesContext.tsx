// src/context/CandidatesContext.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Candidate = {
  id: string;
  avatar: string;
  name: string;
  role: string;
  matchPercentage: number;
  confidenceScore: number;
  bio: string;
  easAttestations: string;
};

type CandidatesContextType = {
  candidates: Candidate[];
  setCandidates: (c: Candidate[]) => void;
};

const CandidatesContext = createContext<CandidatesContextType | undefined>(undefined);

export const CandidatesProvider = ({ children }: { children: ReactNode }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  return (
    <CandidatesContext.Provider value={{ candidates, setCandidates }}>
      {children}
    </CandidatesContext.Provider>
  );
};

export const useCandidates = () => {
  const context = useContext(CandidatesContext);
  if (!context) throw new Error("useCandidates must be used within a CandidatesProvider");
  return context;
};