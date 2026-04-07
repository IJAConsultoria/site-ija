"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldOff } from "lucide-react";
import { useCurrentAdmin } from "@/lib/useCurrentAdmin";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { admin, loading, isAdmin } = useCurrentAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!loading && admin && !isAdmin) {
      // Editor tentando acessar — manda pro painel após 2s
      const t = setTimeout(() => router.replace("/acesso/painel"), 2500);
      return () => clearTimeout(t);
    }
  }, [loading, admin, isAdmin, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <ShieldOff size={36} className="mx-auto mb-3 text-red-600" />
        <h2 className="text-lg font-bold text-red-700">Acesso restrito</h2>
        <p className="mt-2 text-sm text-red-600">
          Esta área é exclusiva para administradores. Você será redirecionado.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
