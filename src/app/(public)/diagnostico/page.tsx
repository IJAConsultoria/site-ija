"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Clock, BarChart3, Shield, Zap } from "lucide-react";
import { WHATSAPP_URL, NUMBERS } from "@/lib/constants";
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
import { createClient } from "@/lib/supabase/client";

export default function DiagnosticoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    restaurant: "",
    revenue: "",
    pain: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [pageStart, setPageStart] = useState(0);

  useEffect(() => {
    setSessionId(getSessionId());
    setPageStart(getPageStartTime());
    trackLandingPage();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { nome, sobrenome } = splitName(formData.name);
    const timeOnPage = getTimeOnPage(pageStart);

    // Push GTM dataLayer
    pushFormSubmit({
      email: formData.email,
      phoneNumber: formData.phone,
      nome,
      sobrenome,
      sessionId,
      timeOnPage,
      formName: "diagnostico",
      extraData: {
        restaurant_name: formData.restaurant,
        revenue_range: formData.revenue,
        main_pain: formData.pain,
      },
    });

    // Save to Supabase
    try {
      const supabase = createClient();
      const tracking = getAllTrackingFields(sessionId, timeOnPage);

      await supabase.from("leads-falar-com-especialista-form-ija").insert({
        nome,
        sobrenome,
        email: formData.email.trim().toLowerCase(),
        phone_number: formData.phone.replace(/\D/g, ""),
        business_name: formData.restaurant || null,
        revenue_range: formData.revenue || null,
        main_challenge: formData.pain || null,
        ...tracking,
      });
    } catch (err) {
      console.error("Error saving to Supabase:", err);
    }

    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-950 py-24 lg:py-32 noise-overlay">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(166,133,35,0.12)_0%,_transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-5 py-2 text-sm font-medium text-accent">
              <Zap size={14} />
              100% gratuito — sem compromisso
            </p>
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Descubra o que está{" "}
              <span className="serif-italic gradient-text">travando</span> seu restaurante
            </h1>
            <p className="mt-6 text-lg text-navy-300">
              Sessão de 30-45 minutos com consultor do IJA. Análise das 8 áreas
              de gestão + plano de ação personalizado.
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
                O que você <span className="serif-italic gradient-text">recebe</span>
              </h2>
              <div className="mt-10 space-y-6">
                {[
                  {
                    icon: BarChart3,
                    title: "Análise das 8 áreas de gestão",
                    desc: "Finanças, estratégia, pessoas, marketing, vendas, estoque, infraestrutura e jurídico.",
                  },
                  {
                    icon: CheckCircle,
                    title: "Plano de ação personalizado",
                    desc: "Identificamos o que está travando e mostramos por onde começar.",
                  },
                  {
                    icon: Clock,
                    title: "30-45 minutos direto ao ponto",
                    desc: "Sem enrolação. Diagnóstico prático e objetivo.",
                  },
                  {
                    icon: Shield,
                    title: "Sem compromisso",
                    desc: "É realmente gratuito. Você decide se quer seguir.",
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

              <div className="mt-12">
                <h3 className="text-sm font-bold uppercase tracking-widest text-navy-400">
                  Para quem é
                </h3>
                <ul className="mt-4 space-y-3">
                  {[
                    "Donos de restaurante, hamburgueria, pizzaria, cafeteria ou similar",
                    "Faturamento a partir de R$ 100 mil/mês",
                    "1 a 10 unidades",
                    "Quer organizar, crescer ou expandir",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-navy-700">
                      <CheckCircle size={16} className="mt-1 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-4 rounded-3xl bg-white p-8 border border-navy-100/50">
                <div className="text-center">
                  <p className="text-2xl font-bold text-navy-950">{NUMBERS.businesses}</p>
                  <p className="text-xs text-navy-500">Negócios</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-navy-950">{NUMBERS.revenue}</p>
                  <p className="text-xs text-navy-500">Lucro gerado</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-navy-950">{NUMBERS.years} anos</p>
                  <p className="text-xs text-navy-500">Experiência</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-3xl border border-navy-100/50 bg-white p-8 shadow-lg shadow-navy-950/5 lg:p-10">
              <h2 className="text-2xl font-bold text-navy-950">
                Agende seu diagnóstico
              </h2>
              <p className="mt-2 text-navy-600">
                Preencha o formulário e entraremos em contato em até 24h.
              </p>
              {submitted ? (
                <div className="mt-8 rounded-2xl bg-accent/10 border border-accent/20 p-10 text-center">
                  <CheckCircle size={48} className="mx-auto text-accent" />
                  <p className="mt-4 text-xl font-semibold text-navy-950">
                    Recebemos sua solicitação!
                  </p>
                  <p className="mt-2 text-navy-600">
                    Nossa equipe entrará em contato em até 24 horas úteis para
                    agendar seu diagnóstico.
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-accent font-semibold hover:text-accent-dark"
                  >
                    Ou fale agora pelo WhatsApp
                    <ArrowRight size={16} />
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="d-name" className="block text-sm font-medium text-navy-700">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="d-name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 w-full rounded-2xl border border-navy-200 bg-white px-4 py-3.5 text-navy-950 placeholder-navy-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="d-email" className="block text-sm font-medium text-navy-700">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="d-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 w-full rounded-2xl border border-navy-200 bg-white px-4 py-3.5 text-navy-950 placeholder-navy-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors"
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="d-phone" className="block text-sm font-medium text-navy-700">
                        WhatsApp *
                      </label>
                      <input
                        type="tel"
                        id="d-phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: maskPhone(e.target.value) })}
                        className="mt-1 w-full rounded-2xl border border-navy-200 bg-white px-4 py-3.5 text-navy-950 placeholder-navy-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="d-restaurant" className="block text-sm font-medium text-navy-700">
                      Nome do restaurante *
                    </label>
                    <input
                      type="text"
                      id="d-restaurant"
                      required
                      value={formData.restaurant}
                      onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                      className="mt-1 w-full rounded-2xl border border-navy-200 bg-white px-4 py-3.5 text-navy-950 placeholder-navy-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors"
                      placeholder="Nome do seu negócio"
                    />
                  </div>
                  <div>
                    <label htmlFor="d-revenue" className="block text-sm font-medium text-navy-700">
                      Faturamento mensal estimado *
                    </label>
                    <select
                      id="d-revenue"
                      required
                      value={formData.revenue}
                      onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                      className="mt-1 w-full rounded-2xl border border-navy-200 bg-white px-4 py-3.5 text-navy-950 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors"
                    >
                      <option value="">Selecione</option>
                      <option value="50-100k">R$ 50 mil - R$ 100 mil</option>
                      <option value="100-300k">R$ 100 mil - R$ 300 mil</option>
                      <option value="300-500k">R$ 300 mil - R$ 500 mil</option>
                      <option value="500k-1M">R$ 500 mil - R$ 1 milhão</option>
                      <option value="1M-2M">R$ 1 milhão - R$ 2 milhões</option>
                      <option value="2M+">Acima de R$ 2 milhões</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="d-pain" className="block text-sm font-medium text-navy-700">
                      Qual sua maior dor hoje? *
                    </label>
                    <select
                      id="d-pain"
                      required
                      value={formData.pain}
                      onChange={(e) => setFormData({ ...formData, pain: e.target.value })}
                      className="mt-1 w-full rounded-2xl border border-navy-200 bg-white px-4 py-3.5 text-navy-950 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors"
                    >
                      <option value="">Selecione</option>
                      <option value="financeiro">Não sei meu lucro real</option>
                      <option value="operacao">Preso na operação do dia a dia</option>
                      <option value="equipe">Problemas com equipe e rotatividade</option>
                      <option value="crescimento">Quero expandir mas não sei como</option>
                      <option value="vendas">Preciso de mais clientes</option>
                      <option value="processos">Falta de padronização</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-accent px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all hover:bg-accent-dark hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/25"
                  >
                    Quero meu diagnóstico gratuito
                  </button>
                  <p className="text-center text-xs text-navy-400">
                    Seus dados estão seguros. Não compartilhamos com terceiros.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-navy-950">
            Perguntas <span className="serif-italic gradient-text">frequentes</span>
          </h2>
          <div className="mt-12 space-y-4">
            {[
              {
                q: "É realmente gratuito?",
                a: "Sim, 100%. O diagnóstico é sem custo e sem compromisso. É nossa forma de mostrar o valor do nosso trabalho.",
              },
              {
                q: "Quanto tempo dura?",
                a: "Entre 30 e 45 minutos. Direto ao ponto, sem enrolação.",
              },
              {
                q: "Preciso me preparar?",
                a: "Não é obrigatório, mas se tiver números básicos (faturamento, custos, número de funcionários), ajuda a tornar o diagnóstico mais preciso.",
              },
              {
                q: "É online ou presencial?",
                a: "Pode ser online (Google Meet/Zoom) ou presencial para clientes no RJ. Combinamos o que for melhor para você.",
              },
              {
                q: "O que acontece depois do diagnóstico?",
                a: "Você recebe um resumo da análise e recomendações. Se fizer sentido, apresentamos uma proposta personalizada. Sem pressão.",
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-3xl border border-navy-100/50 bg-cream/50 p-6 lg:p-8">
                <h3 className="text-lg font-bold text-navy-950">{faq.q}</h3>
                <p className="mt-2 text-navy-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
