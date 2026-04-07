"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Tipo = "acesso" | "portabilidade" | "exclusao" | "correcao" | "revogacao";

export default function LgpdRequestForm() {
  const [tipo, setTipo] = useState<Tipo | "">("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [descricao, setDescricao] = useState("");
  const [aceite, setAceite] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!tipo || !nome || !email || !aceite) {
      setError("Preencha os campos obrigatórios e aceite os termos.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const supabase = createClient();
      const { error } = await supabase.from("lgpd_requests_ija").insert({
        tipo,
        nome: nome.trim(),
        email: email.trim(),
        telefone: telefone.trim() || null,
        descricao: descricao.trim() || null,
      });
      if (error) throw error;
      setDone(true);
    } catch {
      setError("Erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <CheckCircle2 className="mx-auto mb-3 text-green-600" size={36} />
        <h3 className="font-bold text-green-800">Solicitação recebida</h3>
        <p className="mt-2 text-sm text-green-700">
          Vamos analisar seu pedido e responder em até 15 dias úteis, conforme exige a LGPD.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-navy-200 bg-white p-6">
      <div className="mb-4 flex items-center gap-2">
        <ShieldCheck className="text-accent" size={20} />
        <h3 className="text-lg font-bold text-navy-950">Exercer direitos LGPD</h3>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-navy-700">
          Tipo de solicitação <span className="text-accent">*</span>
        </label>
        <select
          required
          value={tipo}
          onChange={(e) => setTipo(e.target.value as Tipo)}
          className="w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-950"
        >
          <option value="">Selecione...</option>
          <option value="acesso">Acesso aos meus dados</option>
          <option value="portabilidade">Portabilidade</option>
          <option value="correcao">Correção de dados</option>
          <option value="exclusao">Exclusão / direito ao esquecimento</option>
          <option value="revogacao">Revogação de consentimento</option>
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-navy-700">
            Nome completo <span className="text-accent">*</span>
          </label>
          <input
            required
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-950"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy-700">
            E-mail <span className="text-accent">*</span>
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-950"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-navy-700">Telefone (opcional)</label>
        <input
          type="tel"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-950"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-navy-700">
          Descrição (opcional)
        </label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={3}
          placeholder="Descreva sua solicitação em detalhes..."
          className="w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-950"
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-navy-700">
        <input
          type="checkbox"
          checked={aceite}
          onChange={(e) => setAceite(e.target.checked)}
          className="mt-0.5 accent-accent"
        />
        Confirmo que sou o titular dos dados ou representante legal autorizado e estou
        solicitando o exercício de direitos garantidos pela LGPD.
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-50"
      >
        {submitting && <Loader2 size={14} className="animate-spin" />}
        Enviar solicitação
      </button>
    </form>
  );
}
