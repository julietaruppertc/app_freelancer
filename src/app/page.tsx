"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TaskCreation from "@/components/TaskCreation";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("mvp_session_active") === "true");
  }, []);

  return (
    <TaskCreation
      isAuthenticated={isAuthenticated}
      onRequireAuthentication={() => {
        router.push("/login?next=/matchmaking");
      }}
      onGenerateMatchmaking={async (payload) => {
        localStorage.setItem("mvp_last_task_prompt", payload.description);
        await new Promise((resolve) => setTimeout(resolve, 1800));
        router.push("/matchmaking");
      }}
    />
  );
}
