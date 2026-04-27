"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  ClipboardCheck,
  FileText,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react";
import {
  getSessionId,
  getPageStartTime,
  getTimeOnPage,
  splitName,
  maskPhone,
  pushFormSubmit,
  getAllTrackingFields,
  trackLandingPage,
} from "@/lib/tracking";
import { createDiagnosticSession } from "@/lib/queries/diagnostico";
import { TOTAL_QUESTIONS, DIAGNOSTIC_SECTIONS } from "@/lib/diagnostico/questions";

export default function DiagnosticoEmpresarialPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    revenue: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const [sessionId, setSessionId] = useState("");
  const [pageStart, setPageStart] = useState(0);

  useEffect(() => {
    setSessionId(getSessionId());
    setPageStart(getPageStartTime());
    trackLandingPage();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const { nome, sobrenome } = splitName(formData.name);
    const timeOnPage = getTimeOnPage(pageStart);

    pushFormSubmit({
      email: formData.email,
      phoneNumber: formData.phone,
      nome,
      sobrenome,
      sessionId,
      timeOnPage,
      formName: "diagnostico-empresarial",
      extraData: {
        business_name: formData.business,
        revenue_range: formData.revenue,
      },
    });

    try {
      const tracking = getAllTrackingFields(sessionId, timeOnPage);

      const diagSessionId = await createDiagnosticSession({
        nome,
        sobrenome,
        email: formData.email.trim().toLowerCase(),
        phone_number: formData.phone.replace(/\D/g, ""),
        business_name: formData.business || null,
        revenue_range: formData.revenue || null,
        ...tracking,
      });

      router.push(`/diagnostico-empresarial/questionario?session=${diagSessionId}`);
      return;
    } catch (err) {
      console.error("Erro ao criar sessão:", err);
      setSubmitting(false);
    }
  };

  const bloco1Count = DIAGNOSTIC_SECTIONS.filter((s) => s.bloco === 1).reduce(
    (sum, s) => sum + s.questionCount,
    0
  );
  const bloco2Count = DIAGNOSTIC_SECTIONS.filter((s) => s.bloco === 2).reduce(
    (sum, s) => sum + s.questionCount,
    0
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 py-24 lg:py-32 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(166,133,35,0.12)_0%,_transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-5 py-2 text-sm font-medium text-accent">
              <Zap size={14} />
              Diagnóstico gratuito e completo
            </p>
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Diagnóstico Empresarial{" "}
              <span className="serif-italic gradient-text">Avançado</span>
            </h1>
            <p className="mt-6 text-lg text-navy-300">
              Avaliação completa de {TOTAL_QUESTIONS} perguntas que mapeia todas
              as áreas do seu negócio. Descubra exatamente onde estão os gaps
              que impedem o crescimento.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Info */}
            <div>
              <h2 className="text-3xl font-bold text-navy-950">
                O que você vai{" "}
                <span className="serif-italic gradient-text">descobrir</span>
              </h2>
              <div className="mt-10 space-y-6">
                {[
                  {
                    icon: BarChart3,
                    title: "Raio-X completo do negócio",
                    desc: "Finanças, estoque, planejamento, liderança, processos, marketing e vendas — tudo avaliado.",
                  },
                  {
                    icon: ClipboardCheck,
                    title: "Classificação por área",
                    desc: "Cada área recebe uma nota: Controlado, Atenção ou Crítico — com recomendações práticas.",
                  },
                  {
                    icon: FileText,
                    title: "Relatório completo em PDF",
                    desc: "Gráficos, scores e plano de prioridades para download imediato.",
                  },
                  {
                    icon: Shield,
                    title: "100% confidencial",
                    desc: "Seus dados são protegidos. O resultado é só seu.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-950">{item.title}</h3>
                      <p className="mt-1 text-navy-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Blocos */}
              <div className="mt-12 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-navy-400">
                  Estrutura do diagnóstico
                </h3>
                <div className="rounded-2xl border border-navy-100 bg-white p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-950 text-xs font-bold text-white">
                      1
                    </span>
                    <div>
                      <p className="font-bold text-navy-950">
                        Estruturação Empresarial
                      </p>
                      <p className="text-sm text-navy-500">
                        {bloco1Count} perguntas — Finanças, Estratégia,
                        Liderança, Marketing
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-navy-100 bg-white p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-xs font-bold text-navy-950">
                      2
                    </span>
                    <div>
                      <p className="font-bold text-navy-950">
                        Performance e Monitoramento
                      </p>
                      <p className="text-sm text-navy-500">
                        {bloco2Count} perguntas — KPIs, Decisões, Controle,
                        Crescimento
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-3xl border border-navy-100/50 bg-white p-8 shadow-lg shadow-navy-950/5 lg:p-10">
              <h2 className="text-2xl font-bold text-navy-950">
                Iniciar Diagnóstico
              </h2>
              <p className="mt-2 text-navy-600">
                Preencha seus dados para começar a avaliação.
              </p>
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-700">
                    Nome completo *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-950 transition-colors focus:border-accent focus:outline-none"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-700">
                    E-mail *
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-950 transition-colors focus:border-accent focus:outline-none"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-700">
                    WhatsApp *
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: maskPhone(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-950 transition-colors focus:border-accent focus:outline-none"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-700">
                    Nome da empresa
                  </label>
                  <input
                    type="text"
                    value={formData.business}
                    onChange={(e) =>
                      setFormData({ ...formData, business: e.target.value })
                    }
                    className="w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-950 transition-colors focus:border-accent focus:outline-none"
                    placeholder="Nome do seu negócio"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-navy-700">
                    Faturamento mensal estimado
                  </label>
                  <select
                    value={formData.revenue}
                    onChange={(e) =>
                      setFormData({ ...formData, revenue: e.target.value })
                    }
                    className="w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-950 transition-colors focus:border-accent focus:outline-none"
                  >
                    <option value="">Selecione</option>
                    <option value="ate-50k">Até R$ 50 mil</option>
                    <option value="50k-100k">R$ 50 mil – R$ 100 mil</option>
                    <option value="100k-300k">R$ 100 mil – R$ 300 mil</option>
                    <option value="300k-500k">R$ 300 mil – R$ 500 mil</option>
                    <option value="500k-1m">R$ 500 mil – R$ 1 milhão</option>
                    <option value="acima-1m">Acima de R$ 1 milhão</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl bg-accent px-6 py-4 text-base font-bold text-navy-950 transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? "Criando sessão..." : "Começar Diagnóstico"}
                </button>

                <p className="text-center text-xs text-navy-400">
                  Tempo estimado: 20–30 minutos. Você pode pausar e retomar.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
