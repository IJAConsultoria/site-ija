"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";
import {
  getSessionId,
  getPageStartTime,
  getTimeOnPage,
  splitName,
  maskPhone,
  pushFormSubmit,
} from "@/lib/tracking";
import { createClient } from "@/lib/supabase/client";

type Props = {
  eventSlug: string;
  eventTitle: string;
  segmentOrigin: string;
  segmentName: string;
};

export default function EventRegistrationForm({
  eventSlug,
  eventTitle,
  segmentOrigin,
  segmentName,
}: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    revenueRange: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [pageStart, setPageStart] = useState(0);

  useEffect(() => {
    setSessionId(getSessionId());
    setPageStart(getPageStartTime());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
      formName: "evento_waitlist",
      extraData: {
        event_slug: eventSlug,
        event_title: eventTitle,
        segment_origin: segmentOrigin,
        business_name: formData.businessName,
        revenue_range: formData.revenueRange,
      },
    });

    // Save to Supabase
    try {
      const supabase = createClient();

      // Get UTMs from URL
      const params = new URLSearchParams(window.location.search);
      const utmSource = params.get("utm_source") || "";
      const utmMedium = params.get("utm_medium") || "";
      const utmCampaign = params.get("utm_campaign") || "";
      const utmTerm = params.get("utm_term") || "";
      const utmContent = params.get("utm_content") || "";

      const { error: dbError } = await supabase
        .from("event_waitlist")
        .insert({
          nome,
          sobrenome,
          email: formData.email.trim().toLowerCase(),
          phone_number: formData.phone.replace(/\D/g, ""),
          event_slug: eventSlug,
          event_title: eventTitle,
          segment_origin: segmentOrigin,
          business_name: formData.businessName || null,
          revenue_range: formData.revenueRange || null,
          apex_session_id: sessionId,
          time_on_page_at_submit: timeOnPage,
          utm_source: utmSource || null,
          utm_medium: utmMedium || null,
          utm_campaign: utmCampaign || null,
          utm_term: utmTerm || null,
          utm_content: utmContent || null,
          page_url: window.location.href,
        });

      if (dbError) {
        console.error("Supabase error:", dbError);
        // Still show success — GTM captured the data
      }
    } catch (err) {
      console.error("Error saving to Supabase:", err);
      // Still show success — GTM captured the data
    }

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10 p-10 text-center">
        <CheckCircle size={48} className="mx-auto text-accent" />
        <p className="mt-4 text-xl font-semibold text-navy-950">
          Inscrição confirmada!
        </p>
        <p className="mt-2 text-navy-600">
          Você receberá todos os detalhes do evento no seu e-mail e WhatsApp.
          Fique atento!
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-dark"
        >
          Ou fale conosco pelo WhatsApp
          <ArrowRight size={16} />
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="ev-name"
          className="block text-sm font-medium text-navy-700"
        >
          Nome completo *
        </label>
        <input
          type="text"
          id="ev-name"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="mt-1 w-full rounded-2xl border border-navy-200 bg-white px-4 py-3.5 text-navy-950 placeholder-navy-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors"
          placeholder="Seu nome completo"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="ev-email"
            className="block text-sm font-medium text-navy-700"
          >
            E-mail *
          </label>
          <input
            type="email"
            id="ev-email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="mt-1 w-full rounded-2xl border border-navy-200 bg-white px-4 py-3.5 text-navy-950 placeholder-navy-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors"
            placeholder="seu@email.com"
          />
        </div>
        <div>
          <label
            htmlFor="ev-phone"
            className="block text-sm font-medium text-navy-700"
          >
            WhatsApp *
          </label>
          <input
            type="tel"
            id="ev-phone"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: maskPhone(e.target.value),
              })
            }
            className="mt-1 w-full rounded-2xl border border-navy-200 bg-white px-4 py-3.5 text-navy-950 placeholder-navy-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors"
            placeholder="(00) 00000-0000"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="ev-business"
          className="block text-sm font-medium text-navy-700"
        >
          Nome do seu negócio
        </label>
        <input
          type="text"
          id="ev-business"
          value={formData.businessName}
          onChange={(e) =>
            setFormData({ ...formData, businessName: e.target.value })
          }
          className="mt-1 w-full rounded-2xl border border-navy-200 bg-white px-4 py-3.5 text-navy-950 placeholder-navy-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors"
          placeholder={`Nome da sua ${segmentName.toLowerCase()}`}
        />
      </div>

      <div>
        <label
          htmlFor="ev-revenue"
          className="block text-sm font-medium text-navy-700"
        >
          Faturamento mensal estimado
        </label>
        <select
          id="ev-revenue"
          value={formData.revenueRange}
          onChange={(e) =>
            setFormData({ ...formData, revenueRange: e.target.value })
          }
          className="mt-1 w-full rounded-2xl border border-navy-200 bg-white px-4 py-3.5 text-navy-950 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors"
        >
          <option value="">Selecione (opcional)</option>
          <option value="50-100k">R$ 50 mil - R$ 100 mil</option>
          <option value="100-300k">R$ 100 mil - R$ 300 mil</option>
          <option value="300-500k">R$ 300 mil - R$ 500 mil</option>
          <option value="500k-1M">R$ 500 mil - R$ 1 milhão</option>
          <option value="1M-2M">R$ 1 milhão - R$ 2 milhões</option>
          <option value="2M+">Acima de R$ 2 milhões</option>
        </select>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-accent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-accent-dark hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/25 disabled:opacity-70 disabled:hover:scale-100"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 size={18} className="animate-spin" />
            Inscrevendo...
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            Garantir minha vaga gratuita
            <ArrowRight size={18} />
          </span>
        )}
      </button>

      <p className="text-center text-xs text-navy-400">
        Evento 100% gratuito e online. Seus dados estão seguros.
      </p>
    </form>
  );
}
