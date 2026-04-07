import Link from "next/link";
import { Shield, Lock, Eye, FileText, Mail } from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import LgpdRequestForm from "@/components/LgpdRequestForm";

export const metadata = generatePageMetadata({
  title: "Política de Privacidade",
  description:
    "Política de Privacidade do Instituto João Alves — como tratamos seus dados conforme a LGPD.",
  path: "/privacidade",
});

export default function PrivacidadePage() {
  return (
    <article className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <Shield size={40} className="mx-auto mb-4 text-accent" />
          <h1 className="text-3xl font-bold text-navy-950 sm:text-4xl">
            Política de <span className="serif-italic gradient-text">Privacidade</span>
          </h1>
          <p className="mt-3 text-sm text-navy-600">
            Última atualização: 07 de abril de 2026
          </p>
        </header>

        <div className="space-y-8 rounded-3xl border border-navy-100 bg-white p-8 sm:p-12">
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-navy-950">
              <FileText size={20} className="text-accent" />
              1. Quem somos
            </h2>
            <p className="text-sm leading-relaxed text-navy-700">
              O <strong>Instituto João Alves (IJA)</strong> é uma consultoria empresarial
              especializada em gestão de restaurantes e food service. Esta política descreve
              como tratamos os dados pessoais coletados em nossos canais digitais, incluindo
              site, formulários e canal de ouvidoria, em conformidade com a{" "}
              <strong>Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018)</strong>.
            </p>
          </section>

          <section>
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-navy-950">
              <Eye size={20} className="text-accent" />
              2. Quais dados coletamos
            </h2>
            <ul className="ml-5 list-disc space-y-1 text-sm leading-relaxed text-navy-700">
              <li>
                <strong>Dados de contato</strong> — nome, e-mail, telefone, empresa, cargo
                (quando você preenche um formulário)
              </li>
              <li>
                <strong>Dados de manifestação</strong> — conteúdo das mensagens enviadas via
                canal de ouvidoria
              </li>
              <li>
                <strong>Dados de navegação</strong> — endereço IP, navegador, páginas
                visitadas, parâmetros UTM (anônimos por padrão)
              </li>
              <li>
                <strong>Cookies essenciais</strong> — para funcionamento do site e analytics
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-navy-950">
              <Lock size={20} className="text-accent" />
              3. Como usamos seus dados
            </h2>
            <ul className="ml-5 list-disc space-y-1 text-sm leading-relaxed text-navy-700">
              <li>Responder solicitações de contato e enviar materiais solicitados</li>
              <li>Processar e responder manifestações do canal de ouvidoria</li>
              <li>Enviar comunicações sobre nossos serviços (com seu consentimento)</li>
              <li>Melhorar a experiência no site (analytics agregado)</li>
              <li>Cumprir obrigações legais e contratuais</li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-navy-700">
              <strong>Não vendemos, alugamos ou compartilhamos</strong> seus dados com
              terceiros para fins comerciais.
            </p>
          </section>

          <section>
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-navy-950">
              <Shield size={20} className="text-accent" />
              4. Canal de Ouvidoria — sigilo e confidencialidade
            </h2>
            <ul className="ml-5 list-disc space-y-1 text-sm leading-relaxed text-navy-700">
              <li>O envio pode ser <strong>anônimo ou identificado</strong></li>
              <li>
                As manifestações são tratadas com <strong>sigilo total</strong> e acesso
                restrito apenas a administradores autorizados
              </li>
              <li>
                Conteúdos são incluídos em relatórios de gestão apenas de forma{" "}
                <strong>consolidada e anônima</strong>, sem exposição individual
              </li>
              <li>
                Dados são armazenados em servidores com criptografia em trânsito e em repouso
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-navy-950">5. Seus direitos (LGPD)</h2>
            <p className="mb-2 text-sm leading-relaxed text-navy-700">
              Conforme a LGPD, você pode a qualquer momento solicitar:
            </p>
            <ul className="ml-5 list-disc space-y-1 text-sm leading-relaxed text-navy-700">
              <li>Confirmação da existência de tratamento dos seus dados</li>
              <li>Acesso aos dados que possuímos sobre você</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
              <li>Portabilidade dos dados a outro fornecedor</li>
              <li>Eliminação dos dados tratados com seu consentimento</li>
              <li>Revogação do consentimento</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-navy-950">6. Retenção de dados</h2>
            <p className="text-sm leading-relaxed text-navy-700">
              Mantemos seus dados pelo tempo necessário para cumprir as finalidades para as
              quais foram coletados, salvo quando houver obrigação legal de retenção mais
              longa. Manifestações de ouvidoria são mantidas por até 5 anos para fins de
              auditoria e gestão, após o que são anonimizadas ou eliminadas.
            </p>
          </section>

          <section>
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-navy-950">
              <Mail size={20} className="text-accent" />
              7. Encarregado de Dados (DPO)
            </h2>
            <p className="text-sm leading-relaxed text-navy-700">
              Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento dos seus
              dados, entre em contato com nosso encarregado:
            </p>
            <p className="mt-2 text-sm font-medium text-navy-950">
              📧{" "}
              <a
                href="mailto:contato@institutojoaoalves.com.br"
                className="text-accent hover:underline"
              >
                contato@institutojoaoalves.com.br
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-navy-950">8. Alterações nesta política</h2>
            <p className="text-sm leading-relaxed text-navy-700">
              Esta política pode ser atualizada a qualquer momento. Recomendamos revisitá-la
              periodicamente. Mudanças significativas serão comunicadas pelos canais oficiais.
            </p>
          </section>
        </div>

        <div className="mt-10">
          <LgpdRequestForm />
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark"
          >
            Voltar para o site
          </Link>
        </div>
      </div>
    </article>
  );
}
