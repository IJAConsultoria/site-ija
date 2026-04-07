"use client";

import { useEffect, useState } from "react";
import { getCurrentAdmin, type CmsAdmin } from "@/lib/queries/admins";

export function useCurrentAdmin() {
  const [admin, setAdmin] = useState<CmsAdmin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentAdmin()
      .then(setAdmin)
      .finally(() => setLoading(false));
  }, []);

  return { admin, loading, isAdmin: admin?.role === "admin" };
}
