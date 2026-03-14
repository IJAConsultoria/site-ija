"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
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
  eventType: string;
  eventDate: string;
  eventTime: string;
  segmentOrigin: string;
  segmentName: string;
};

function getDeviceType(): string {
  if (typeof window === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua))
    return "mobile";
  return "desktop";
}

export default function EventRegistrationForm({
  eventSlug,
  eventTitle,
  eventType,
  eventDate,
  eventTime,
  segmentOrigin,
  segmentName,
}: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    revenueRange: "",
  });
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
        event_type: eventType,
        segment_origin: segmentOrigin,
        business_name: formData.businessName,
        revenue_range: formData.revenueRange,
      },
    });

    // Save to Supabase
    try {
      const supabase = createClient();
      const params = new URLSearchParams(window.location.search);

      await supabase.from("event_waitlist").insert({
        nome,
        sobrenome,
        email: formData.email.trim().toLowerCase(),
        phone_number: formData.phone.replace(/\D/g, ""),
        event_slug: eventSlug,
        event_title: eventTitle,
        event_type: eventType,
        event_date: eventDate,
        event_time: eventTime,
        segment_origin: segmentOrigin,
        segment_name: segmentName,
        business_name: formData.businessName || null,
        revenue_range: formData.revenueRange || null,
        apex_session_id: sessionId,
        time_on_page_at_submit: timeOnPage,
        utm_source: params.get("utm_source") || null,
        utm_medium: params.get("utm_medium") || null,
        utm_campaign: params.get("utm_campaign") || null,
        utm_term: params.get("utm_term") || null,
        utm_content: params.get("utm_content") || null,
        page_url: window.location.href,
        referrer_url: document.referrer || null,
        user_agent: navigator.userAgent,
        device_type: getDeviceType(),
      });
    } catch (err) {
      console.error("Error saving to Supabase:", err);
    }

    // Redirect to thank you page with event context
    const thankYouParams = new URLSearchParams({
      evento: eventSlug,
      segmento: segmentOrigin,
      nome: formData.name.split(" ")[0],
    });
    router.push(`/eventos/obrigado?${thankYouParams.toString()}`);
  };

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

      {error && <p className="text-sm text-red-500">{error}</p>}

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
