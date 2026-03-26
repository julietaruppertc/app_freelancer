"use client";

import React, { useEffect, useState } from "react";
import MatchmakingResults from "@/components/MatchmakingResults";

export default function MatchmakingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("mvp_session_active") === "true");
  }, []);

  return <MatchmakingResults isAuthenticated={isAuthenticated} />;
}
