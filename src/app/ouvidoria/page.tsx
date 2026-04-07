"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Shield,
  Lock,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import { createOuvidoria, type OuvidoriaTipo } from "@/lib/queries/ouvidoria";

type Step = "intro" | "form" | "success";

export default function OuvidoriaPage() {
  const [step, setStep] = useState<Step>("intro");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [protocolo, setProtocolo] = useState("");

  const [empresa, setEmpresa] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [tipo, setTipo] = useState<OuvidoriaTipo | "outro" | "">("");
  const [tipoOutro, setTipoOutro] = useState("");
  const [respostaDesejada, setRespostaDesejada] = useState<string>("");
  const [mensagem, setMensagem] = useState("");
  const [sugestaoMelhoria, setSugestaoMelhoria] = useState("");
  const [gravidade, setGravidade] = useState<string>("");
  const [jaTentou, setJaTentou] = useState<string>("");
  const [acoesTomadas, setAcoesTomadas] = useState("");
  const [formaContato, setFormaContato] = useState("");
  const [aceiteLgpd, setAceiteLgpd] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!empresa.trim() || !tipo || !respostaDesejada) {
      setError("Preencha empresa, motivo e se deseja resposta.");
      return;
    }
    if (tipo === "outro" && !tipoOutro.trim()) {
      setError("Especifique o motivo em 'Outro'.");
      return;
    }
    if (!aceiteLgpd) {
      setError("Você precisa aceitar a Política de Privacidade para enviar.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      // Se for "outro", salva como reclamacao com prefixo no campo mensagem
      const tipoFinal: OuvidoriaTipo = tipo === "outro" ? "reclamacao" : tipo;
      const mensagemFinal =
        tipo === "outro"
          ? `[OUTRO MOTIVO: ${tipoOutro.trim()}]\n\n${mensagem.trim()}`
          : mensagem.trim();
      const result = await createOuvidoria({
        empresa: empresa.trim(),
        nome: nome.trim() || null,
        email: email.trim() || null,
        cargo: cargo.trim() || null,
        tipo: tipoFinal,
        resposta_desejada: respostaDesejada === "sim",
        mensagem: mensagemFinal,
        sugestao_melhoria: sugestaoMelhoria.trim() || null,
        gravidade: (gravidade as "alta" | "media" | "baixa") || null,
        ja_tentou_resolver: jaTentou ? jaTentou === "sim" : null,
        acoes_tomadas: acoesTomadas.trim() || null,
        forma_contato: formaContato || null,
      });
      setProtocolo(result.protocolo);
      // Notifica admins via email (fire-and-forget, não bloqueia)
      fetch("/api/ouvidoria/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          protocolo: result.protocolo,
          empresa: empresa.trim(),
          tipo: tipoFinal,
          identificado: !!(nome.trim() || email.trim()),
        }),
      }).catch(() => {});
      setStep("success");
    } catch (err) {
      console.error(err);
      setError("Erro ao enviar. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 noise-overlay py-12 lg:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <Image
            src="/images/logo/ija-icone-azul.png"
            alt="IJA"
            width={64}
            height={64}
            className="mx-auto h-16 w-16 brightness-0 invert"
          />
          <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            Canal de <span className="serif-italic gradient-text">Ouvidoria</span>
          </h1>
          <p className="mt-2 text-sm text-navy-400">Confidencial · Imparcial · Seguro</p>
        </div>

        {step === "intro" && (
          <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-10">
            {/* Vídeo */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
              <div className="relative" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/mKJxXv2PL4o"
                  title="Canal de Ouvidoria IJA"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-5 text-sm leading-relaxed text-navy-200">
              <div>
                <h2 className="mb-2 text-base font-bold text-white">INFORMAÇÕES IMPORTANTES</h2>
                <p>
                  Este é um canal <strong>seguro, confidencial e imparcial</strong>, criado para
                  ouvir você e contribuir para a melhoria contínua da empresa.
                </p>
              </div>

              <div className="rounded-2xl border border-accent/20 bg-accent/5 p-4">
                <p>
                  👉 Todas as respostas deste formulário são recebidas diretamente por uma{" "}
                  <strong>empresa de consultoria terceirizada</strong>, garantindo sigilo,
                  anonimato e imparcialidade no tratamento das informações.
                </p>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2 font-bold text-white">
                  🎯 Para que serve este canal?
                </h3>
                <p className="mb-2">Aqui você pode registrar, com responsabilidade:</p>
                <ul className="ml-5 list-disc space-y-0.5">
                  <li>Elogios</li>
                  <li>Sugestões</li>
                  <li>Reclamações</li>
                  <li>Denúncias</li>
                </ul>
                <p className="mt-3">
                  As manifestações podem se referir a qualquer pessoa ou parte envolvida na
                  operação, como: colegas, líderes ou diretores, subordinados, fornecedores,
                  prestadores de serviço, clientes externos ou parceiros.
                </p>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2 font-bold text-white">
                  <Lock size={16} /> Sigilo e confidencialidade
                </h3>
                <ul className="ml-5 list-disc space-y-1">
                  <li>O envio pode ser anônimo ou identificado, conforme sua preferência;</li>
                  <li>As informações são tratadas com sigilo total;</li>
                  <li>
                    Os conteúdos são incluídos nos relatórios de gestão apenas de forma
                    consolidada e anônima, sem exposição individual.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
                <h3 className="mb-1 flex items-center gap-2 font-bold text-yellow-400">
                  <AlertCircle size={16} /> Importante
                </h3>
                <p>Este canal não substitui o RH/DP para assuntos ou tarefas do dia a dia.</p>
              </div>

              <div>
                <h3 className="mb-2 flex items-center gap-2 font-bold text-white">
                  <Shield size={16} /> Gestão do canal
                </h3>
                <p>
                  Este Canal de Ouvidoria é desenvolvido e coordenado pelo{" "}
                  <strong>Instituto João Alves</strong>, consultoria independente e terceirizada,
                  responsável por garantir a confidencialidade, o tratamento técnico e a
                  imparcialidade do processo.
                </p>
              </div>

              <p className="text-center text-base font-medium text-accent">
                ✨ Sua participação é fundamental.
              </p>
              <p className="text-center text-xs text-navy-400">
                Falar com responsabilidade ajuda a construir um ambiente de trabalho mais ético,
                seguro e melhor para todos.
              </p>
            </div>

            <button
              onClick={() => setStep("form")}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-accent-dark"
            >
              Continuar para o formulário
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {step === "form" && (
          <form
            onSubmit={submit}
            className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-10"
          >
            <button
              type="button"
              onClick={() => setStep("intro")}
              className="mb-2 inline-flex items-center gap-1 text-xs text-navy-400 hover:text-white"
            >
              <ArrowLeft size={12} /> Voltar
            </button>

            <Field label="Qual o nome da empresa que você trabalha?" required>
              <input
                type="text"
                required
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Deseja se identificar? Escreva seu nome completo abaixo (deixe em branco se não quiser).">
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Se quiser receber contato, informe seu e-mail.">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Qual o seu cargo ou função na empresa?">
              <input
                type="text"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label="Qual é o motivo do seu contato?" required>
              <div className="space-y-2">
                {[
                  { v: "reclamacao", l: "Reclamação" },
                  { v: "sugestao", l: "Sugestão" },
                  { v: "denuncia", l: "Denúncia" },
                  { v: "elogio", l: "Elogio" },
                ].map((o) => (
                  <Radio
                    key={o.v}
                    name="tipo"
                    value={o.v}
                    label={o.l}
                    checked={tipo === o.v}
                    onChange={() => setTipo(o.v as OuvidoriaTipo)}
                  />
                ))}
                <Radio
                  name="tipo"
                  value="outro"
                  label="Outro:"
                  checked={tipo === "outro"}
                  onChange={() => setTipo("outro")}
                />
                {tipo === "outro" && (
                  <input
                    type="text"
                    value={tipoOutro}
                    onChange={(e) => setTipoOutro(e.target.value)}
                    placeholder="Especifique"
                    className={inputCls + " mt-2"}
                  />
                )}
              </div>
            </Field>

            <Field label="Deseja uma resposta da empresa ou este é apenas um desabafo?" required>
              <div className="space-y-2">
                <Radio
                  name="resposta"
                  value="sim"
                  label="Sim, gostaria de uma resposta"
                  checked={respostaDesejada === "sim"}
                  onChange={() => setRespostaDesejada("sim")}
                />
                <Radio
                  name="resposta"
                  value="nao"
                  label="Não, é apenas um desabafo"
                  checked={respostaDesejada === "nao"}
                  onChange={() => setRespostaDesejada("nao")}
                />
              </div>
            </Field>

            <Field label="Por favor, descreva detalhadamente o que você gostaria de relatar:">
              <textarea
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                rows={5}
                className={inputCls}
              />
            </Field>

            <Field label="Se for uma sugestão, o que você acredita que poderia melhorar na empresa?">
              <textarea
                value={sugestaoMelhoria}
                onChange={(e) => setSugestaoMelhoria(e.target.value)}
                rows={3}
                className={inputCls}
              />
            </Field>

            <Field label="Caso seja uma denúncia, qual é a gravidade do problema relatado?">
              <div className="space-y-2">
                <Radio
                  name="gravidade"
                  value="alta"
                  label="Alta (prejudica gravemente o ambiente de trabalho ou a segurança)."
                  checked={gravidade === "alta"}
                  onChange={() => setGravidade("alta")}
                />
                <Radio
                  name="gravidade"
                  value="media"
                  label="Média (impacta o ambiente, mas sem riscos imediatos)."
                  checked={gravidade === "media"}
                  onChange={() => setGravidade("media")}
                />
                <Radio
                  name="gravidade"
                  value="baixa"
                  label="Baixa (problema pontual, mas merece atenção)."
                  checked={gravidade === "baixa"}
                  onChange={() => setGravidade("baixa")}
                />
              </div>
            </Field>

            <Field label="Você já tentou resolver esse problema diretamente com algum superior ou colega?">
              <div className="flex gap-3">
                <Radio
                  name="jatentou"
                  value="sim"
                  label="Sim"
                  checked={jaTentou === "sim"}
                  onChange={() => setJaTentou("sim")}
                />
                <Radio
                  name="jatentou"
                  value="nao"
                  label="Não"
                  checked={jaTentou === "nao"}
                  onChange={() => setJaTentou("nao")}
                />
              </div>
            </Field>

            <Field label="Caso tenha tentado resolver, quais foram as ações tomadas até agora?">
              <textarea
                value={acoesTomadas}
                onChange={(e) => setAcoesTomadas(e.target.value)}
                rows={3}
                className={inputCls}
              />
            </Field>

            <Field label="Para relatos identificados, qual a melhor forma de entrarmos em contato com você?">
              <div className="space-y-2">
                <Radio
                  name="formaContato"
                  value="nao_contatar"
                  label="Não gostaria que entrasse em contato comigo."
                  checked={formaContato === "nao_contatar"}
                  onChange={() => setFormaContato("nao_contatar")}
                />
                <Radio
                  name="formaContato"
                  value="reuniao"
                  label="Gostaria de uma reunião."
                  checked={formaContato === "reuniao"}
                  onChange={() => setFormaContato("reuniao")}
                />
              </div>
            </Field>

            {/* LGPD */}
            <div className="rounded-2xl border border-white/15 bg-white/[0.05] p-4">
              <label className="flex cursor-pointer items-start gap-3 text-sm text-navy-200">
                <input
                  type="checkbox"
                  checked={aceiteLgpd}
                  onChange={(e) => setAceiteLgpd(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-accent"
                />
                <span>
                  Li e concordo com a{" "}
                  <a
                    href="/privacidade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline hover:text-accent-dark"
                  >
                    Política de Privacidade
                  </a>{" "}
                  do IJA. Autorizo o tratamento dos meus dados pessoais conforme a LGPD,
                  exclusivamente para análise desta manifestação.
                </span>
              </label>
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</div>
            )}

            <button
              type="submit"
              disabled={submitting || !aceiteLgpd}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-accent-dark disabled:opacity-50"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
              {submitting ? "Enviando..." : "Enviar manifestação"}
            </button>
          </form>
        )}

        {step === "success" && (
          <div className="rounded-3xl border border-green-500/20 bg-green-500/5 p-8 text-center backdrop-blur-sm sm:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-green-400">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-2xl font-bold text-white">Manifestação recebida</h2>
            <p className="mt-3 text-navy-300">
              Sua manifestação foi registrada com sucesso e será analisada pela nossa equipe com
              total sigilo e imparcialidade.
            </p>
            <div className="mt-6 inline-block rounded-2xl border border-white/10 bg-white/5 px-6 py-4">
              <p className="text-xs uppercase tracking-wider text-navy-400">Protocolo</p>
              <p className="mt-1 font-mono text-xl font-bold text-accent">{protocolo}</p>
              <p className="mt-2 text-[11px] text-navy-500">Guarde este número para acompanhamento</p>
            </div>
            <p className="mt-8 text-xs text-navy-500">
              Obrigado por contribuir para um ambiente de trabalho mais ético, seguro e melhor
              para todos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/[0.08] px-4 py-3 text-sm text-white placeholder-navy-400 focus:border-accent focus:bg-white/[0.12] focus:outline-none focus:ring-1 focus:ring-accent";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      {children}
    </div>
  );
}

function Radio({
  name,
  value,
  label,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-3 text-sm transition-colors ${
        checked
          ? "border-accent bg-accent/15 text-white"
          : "border-white/15 bg-white/[0.08] text-navy-200 hover:border-white/25 hover:bg-white/[0.12] hover:text-white"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="accent-accent"
      />
      {label}
    </label>
  );
}
