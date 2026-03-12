import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-white py-20">
      <div className="mx-auto max-w-md text-center px-4">
        <p className="text-6xl font-bold text-accent">404</p>
        <h1 className="mt-4 text-2xl font-bold text-navy-950">
          Página não encontrada
        </h1>
        <p className="mt-2 text-navy-600">
          A página que você procura não existe ou foi movida.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          Voltar para a home
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
