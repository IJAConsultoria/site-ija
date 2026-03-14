"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Instagram, Youtube, Linkedin, Send, CheckCircle } from "lucide-react";
import { EMAIL, PHONE, LOCATION, STATES, SOCIAL, WHATSAPP_URL } from "@/lib/constants";
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

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
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
      formName: "contato",
      extraData: {
        subject: formData.subject,
        message: formData.message,
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
        message: formData.message || null,
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
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Fale <span className="serif-italic gradient-text">conosco</span>
            </h1>
            <p className="mt-6 text-lg text-navy-300">
              Tire suas dúvidas, agende uma conversa ou envie uma mensagem.
              Estamos prontos para ajudar.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-navy-950">
                Envie uma mensagem
              </h2>
              {submitted ? (
                <div className="mt-8 rounded-3xl bg-accent/10 border border-accent/20 p-10 text-center">
                  <CheckCircle size={48} className="mx-auto text-accent" />
                  <p className="mt-4 text-xl font-semibold text-navy-950">
                    Mensagem enviada!
                  </p>
                  <p className="mt-2 text-navy-600">
                    Entraremos em contato em até 24 horas úteis.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-navy-700">
                        Nome completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1 w-full rounded-2xl border border-navy-200 bg-white px-4 py-3.5 text-navy-950 placeholder-navy-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-navy-700">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 w-full rounded-2xl border border-navy-200 bg-white px-4 py-3.5 text-navy-950 placeholder-navy-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-navy-700">
                        WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: maskPhone(e.target.value) })}
                        className="mt-1 w-full rounded-2xl border border-navy-200 bg-white px-4 py-3.5 text-navy-950 placeholder-navy-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-navy-700">
                        Assunto *
                      </label>
                      <select
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="mt-1 w-full rounded-2xl border border-navy-200 bg-white px-4 py-3.5 text-navy-950 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors"
                      >
                        <option value="">Selecione</option>
                        <option value="diagnostico">Diagnóstico gratuito</option>
                        <option value="consultoria">Consultoria</option>
                        <option value="mentoria">Mentoria online</option>
                        <option value="parceria">Parceria</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-navy-700">
                      Mensagem *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1 w-full rounded-2xl border border-navy-200 bg-white px-4 py-3.5 text-navy-950 placeholder-navy-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none resize-none transition-colors"
                      placeholder="Como podemos ajudar?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all hover:bg-accent-dark hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
                  >
                    Enviar mensagem
                    <Send size={18} />
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-navy-950">
                  Informações de contato
                </h2>
                <p className="mt-2 text-navy-600">
                  Prefere falar diretamente? Use um dos canais abaixo.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded-3xl border border-navy-100/50 bg-white p-6 transition-all hover:border-accent/20 hover:shadow-md"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366]/10 text-[#25D366]">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-navy-950">WhatsApp</p>
                    <p className="text-navy-600">{PHONE}</p>
                    <p className="mt-1 text-sm font-semibold text-accent">Clique para abrir</p>
                  </div>
                </a>

                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-start gap-4 rounded-3xl border border-navy-100/50 bg-white p-6 transition-all hover:border-accent/20 hover:shadow-md"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-navy-950">E-mail</p>
                    <p className="text-navy-600">{EMAIL}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 rounded-3xl border border-navy-100/50 bg-white p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-100 text-navy-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-navy-950">Localização</p>
                    <p className="text-navy-600">{LOCATION}</p>
                    <p className="text-sm text-navy-500">
                      Atendimento presencial e remoto em {STATES}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-navy-400">
                  Redes sociais
                </h3>
                <div className="mt-4 flex gap-3">
                  {[
                    { href: SOCIAL.instagram, icon: Instagram, label: "Instagram" },
                    { href: SOCIAL.youtube, icon: Youtube, label: "YouTube" },
                    { href: SOCIAL.linkedin, icon: Linkedin, label: "LinkedIn" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-navy-100/50 text-navy-500 transition-all hover:border-accent hover:text-accent hover:scale-110"
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
