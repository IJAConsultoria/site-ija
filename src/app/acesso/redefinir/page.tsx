"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { KeyRound, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function RedefinirSenhaPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Supabase recovery link traz tokens no hash (#access_token=...&refresh_token=...&type=recovery)
    // ou erro (#error=access_denied&error_code=otp_expired&...).
    const hash =
      typeof window !== "undefined" ? window.location.hash.substring(1) : "";
    const params = new URLSearchParams(hash);

    const errorDescription = params.get("error_description");
    if (errorDescription) {
      setError(errorDescription.replace(/\+/g, " "));
      return;
    }

    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const type = params.get("type");

    if (type === "recovery" && accessToken && refreshToken) {
      const supabase = createClient();
      supabase.auth
        .setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(({ error }) => {
          if (error) {
            setError("Link inválido ou expirado. Solicite um novo.");
          } else {
            setReady(true);
            // limpa o hash da URL
            window.history.replaceState(null, "", window.location.pathname);
          }
        });
    } else {
      // Talvez já exista uma sessão de recovery (caso o usuário recarregue a página)
      const supabase = createClient();
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) {
          setReady(true);
        } else {
          setError("Link inválido ou expirado. Solicite um novo.");
        }
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (password.length < 8) {
      setError("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError("Não foi possível atualizar a senha. Tente novamente.");
      return;
    }

    setInfo("Senha atualizada! Redirecionando...");
    setTimeout(() => router.push("/acesso/painel"), 1200);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Image
            src="/images/logo/ija-icone-azul.png"
            alt="IJA"
            width={64}
            height={64}
            className="mx-auto h-16 w-16 brightness-0 invert"
          />
          <h1 className="mt-4 text-xl font-bold text-white">
            Redefinir senha
          </h1>
          <p className="mt-1 text-sm text-navy-400">
            Escolha uma nova senha para sua conta
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {info && (
            <div className="rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              {info}
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-navy-300">
              Nova senha
            </label>
            <input
              id="password"
              type="password"
              required
              disabled={!ready}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-navy-500 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-navy-300">
              Confirmar nova senha
            </label>
            <input
              id="confirm"
              type="password"
              required
              disabled={!ready}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-navy-500 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !ready}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-dark disabled:opacity-50"
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <>
                <KeyRound size={16} />
                Salvar nova senha
              </>
            )}
          </button>

          <div className="text-center">
            <a
              href="/acesso"
              className="text-xs font-medium text-navy-300 hover:text-accent"
            >
              Voltar para o login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
