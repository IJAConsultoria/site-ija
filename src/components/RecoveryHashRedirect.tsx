"use client";

import { useEffect } from "react";

/**
 * Quando o link de recovery do Supabase cai em qualquer página que não seja
 * /acesso/redefinir (porque o Site URL aponta pra raiz, ou redirectTo não bate
 * com a allowlist), este componente captura o hash com type=recovery e
 * redireciona pra página correta preservando os tokens.
 */
export default function RecoveryHashRedirect() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;
    if (!hash || !hash.includes("type=recovery")) return;

    const path = window.location.pathname;
    if (path === "/acesso/redefinir") return;

    window.location.replace("/acesso/redefinir" + hash);
  }, []);

  return null;
}
