"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import OnboardingLogin from "@/components/OnboardingLogin";
import TaskCreation from "@/components/TaskCreation"; // Traemos el componente del upstream
import { useWallet } from "@/context/WalletContext";

export default function Home() {
  const { login, address, connecting } = useWallet();
  const router = useRouter();
  
  // Estado para persistencia simple (del upstream)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    // Verificamos si hay sesión o wallet conectada
    const session = localStorage.getItem("mvp_session_active") === "true";
    setIsAuthenticated(session || !!address);
  }, [address]);

  // Lógica de generación de match (del upstream)
  const handleGenerateMatch = async (payload: any) => {
    localStorage.setItem("mvp_last_task_prompt", payload.description);
    // Simulamos delay de IA/Gemini
    await new Promise((resolve) => setTimeout(resolve, 1800));
    router.push("/matchmaking");
  };

  // Si ya está autenticado, mostramos la creación de tareas directamente
  if (isAuthenticated || address) {
    return (
      <TaskCreation
        isAuthenticated={true}
        onRequireAuthentication={() => {}} // Ya está autenticado
        onGenerateMatchmaking={handleGenerateMatch}
      />
    );
  }

  // Si no, mostramos el Onboarding (tu versión local)
  return (
    <OnboardingLogin
      onEmailLogin={async (payload) => {
        console.log("Email login:", payload);
        // Aquí podrías setear el localStorage para pruebas rápidas
        localStorage.setItem("mvp_session_active", "true");
        setIsAuthenticated(true);
      }}
      onWalletConnect={login}
      isSubmitting={connecting}
    />
  );
}