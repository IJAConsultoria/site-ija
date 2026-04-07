"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import ArticleEditor from "@/components/admin/ArticleEditor";
import { getArticle, type Article } from "@/lib/queries/blog";

function EditArticleInner() {
  const params = useSearchParams();
  const id = params.get("id");
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    getArticle(id)
      .then(setArticle)
      .catch(() => setError("Artigo não encontrado"));
  }, [id]);

  if (!id) return <p className="text-sm text-red-400">ID do artigo ausente.</p>;
  if (error) return <div className="rounded-lg bg-red-500/10 p-4 text-sm text-red-400">{error}</div>;
  if (!article)
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );

  return <ArticleEditor article={article} />;
}

export default function EditArticlePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      }
    >
      <EditArticleInner />
    </Suspense>
  );
}
