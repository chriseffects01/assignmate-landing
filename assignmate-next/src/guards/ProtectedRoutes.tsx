"use client";

import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading, authenticated } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !authenticated) {
      router.replace("/auth/login");
    }
  }, [authenticated, loading, router]);
  if (loading) {
    return null;
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}
