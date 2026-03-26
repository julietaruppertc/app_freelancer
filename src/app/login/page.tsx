"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import OnboardingLogin from "@/components/OnboardingLogin";
import { useWallet } from "@/context/WalletContext"; // 🔥 IMPORTANTE

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextRoute = searchParams.get("next") || "/matchmaking";

  const { login, connecting } = useWallet(); // 🔥 TRAES LA WALLET

  const completeLogin = () => {
    localStorage.setItem("mvp_session_active", "true");
    router.push(nextRoute);
  };

  return (
    <OnboardingLogin
      onEmailLogin={async () => {
        completeLogin();
      }}
      onWalletConnect={async () => {
        await login(); // 🔥 ACÁ CONECTÁS METAMASK
        completeLogin(); // 🔥 DESPUÉS REDIRIGÍS
      }}
      isSubmitting={connecting}
    />
  );
}