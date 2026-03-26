"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import OnboardingLogin from "@/components/OnboardingLogin";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextRoute = searchParams.get("next") || "/matchmaking";

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
        completeLogin();
      }}
    />
  );
}
