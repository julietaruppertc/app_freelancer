"use client";

import React, { useEffect, useState } from "react";
import MilestoneManagement from "@/components/MilestoneManagement";

export default function MilestonesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("mvp_session_active") === "true");
  }, []);

  return <MilestoneManagement isAuthenticated={isAuthenticated} />;
}
