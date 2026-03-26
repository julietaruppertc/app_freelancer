"use client";

import React from "react";
import TaskCreation from "@/components/TaskCreation";

export default function CreateTaskPage() {
  return (
    <TaskCreation
      onGenerateMatchmaking={async (payload) => {
        // Placeholder for Supabase/Edge Function integration with Gemini.
        // Example target: invoke a backend endpoint with `payload.description`.
        console.log("Task payload ready for AI backend:", payload);

        await new Promise((resolve) => setTimeout(resolve, 2400));

        return [
          {
            title: "Blockchain Security Lead",
            confidence: 97,
            summary: "Auditor senior con experiencia verificable en protocolos DeFi complejos.",
          },
          {
            title: "Smart Contracts Threat Analyst",
            confidence: 88,
            summary: "Especialista en modelado de amenazas y pruebas de explotabilidad.",
          },
          {
            title: "Rust + Solidity Integrator",
            confidence: 81,
            summary: "Perfil hibrido para integraciones entre capas EVM y servicios de soporte.",
          },
        ];
      }}
    />
  );
}
