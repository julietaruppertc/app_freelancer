"use client";

import React from "react";
import OnboardingLogin from "@/components/OnboardingLogin";

export default function Home() {
  return (
    <OnboardingLogin
      onEmailLogin={(payload) => {
        console.log("Email login payload:", payload);
      }}
      onWalletConnect={() => {
        console.log("Connect wallet clicked");
      }}
    />
  );
}
