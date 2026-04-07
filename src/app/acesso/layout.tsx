"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/acesso";
  const [checking, setChecking] = useState(!isLogin);

  useEffect(() => {
    if (isLogin) {
      setChecking(false);
      return;
    }
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/acesso");
      } else {
        setChecking(false);
      }
    });
  }, [isLogin, pathname, router]);

  if (isLogin) {
    return <div className="min-h-screen bg-navy-950">{children}</div>;
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <div className="lg:pl-64">
        <main className="min-h-screen p-4 pt-16 lg:p-8 lg:pt-8 text-navy-950">{children}</main>
      </div>
    </div>
  );
}
