import React from "react";
import { extractSkillsFromText, generateFreelancerScore } from "@/ia/gemini.service";
import MatchmakingResults from "@/components/MatchmakingResults"; 

interface MatchmakingPageProps {
  searchParams: Promise<{
    query?: string;
  }>;
}

export default async function MatchmakingPage({ searchParams }: MatchmakingPageProps) {
  // 1. ESPERAMOS los searchParams (¡Esta es la línea que faltaba!)
  const params = await searchParams;
  const clientQuery = params.query || "";

  // 2. Si alguien entra a /matchmaking sin buscar nada
  if (!clientQuery) {
    return <MatchmakingResults query="" results={[]} status="empty" />;
  }

  try {
    // 3. IA Paso 1: Extraemos las skills
    const requiredSkills = await extractSkillsFromText(clientQuery);

    // 4. Base de Datos Mock
    const dbFreelancers = [
      { 
        id: "f1", 
        name: "Santi Dev", 
        role: "Desarrollador Smart Contracts",
        description: "Auditorías de contratos en Solidity. Experiencia creando protocolos DeFi seguros en Ethereum y BNB.", 
        skills: ["SOLIDITY", "WEB3", "DEFI"] 
      },
      { 
        id: "f2", 
        name: "Laura Design", 
        role: "UI/UX Web3",
        description: "Diseño de interfaces en Figma, muy orientada a la experiencia de usuario para dApps.", 
        skills: ["FIGMA", "UX", "UI"] 
      }
    ];

    // 5. IA Paso 2: Calculamos el Score
    const scoredFreelancers = await Promise.all(
      dbFreelancers.map(async (freelancer) => {
        const score = await generateFreelancerScore(freelancer.description, requiredSkills);
        return {
          ...freelancer,
          matchScore: score,
        };
      })
    );

    // 6. Ordenamos y renderizamos
    const sortedResults = scoredFreelancers.sort((a, b) => b.matchScore - a.matchScore);

    return (
      <MatchmakingResults 
        query={clientQuery} 
        results={sortedResults} 
        status="success" 
      />
    );

  } catch (error) {
    console.error("❌ Fallo crítico en el pipeline de Matchmaking:", error);
    return <MatchmakingResults query={clientQuery} results={[]} status="error" />;
  }
}