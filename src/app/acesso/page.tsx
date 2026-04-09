"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogIn, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async () => {
    setError("");
    setInfo("");
    if (!email) {
      setError("Digite seu email acima e clique novamente em 'Esqueci minha senha'.");
      return;
    }
    setResetLoading(true);
    const supabase = createClient();
    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/acesso/redefinir`
        : "https://www.ijaconsultoria.com.br/acesso/redefinir";
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    setResetLoading(false);
    if (error) {
      setError("Não foi possível enviar o email. Tente novamente.");
      return;
    }
    setInfo("Enviamos um link de redefinição para o seu email.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email ou senha incorretos.");
      setLoading(false);
      return;
    }

    router.push("/acesso/painel");
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
            Painel Administrativo
          </h1>
          <p className="mt-1 text-sm text-navy-400">
            Instituto João Alves
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
            <label htmlFor="email" className="block text-sm font-medium text-navy-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-navy-500 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-navy-300">
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-navy-500 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={resetLoading}
              className="text-xs font-medium text-navy-300 hover:text-accent disabled:opacity-50"
            >
              {resetLoading ? "Enviando..." : "Esqueci minha senha"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-dark disabled:opacity-50"
          >
            {loading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <>
                <LogIn size={16} />
                Entrar
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
