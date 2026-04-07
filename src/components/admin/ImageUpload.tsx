"use client";

import { useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { uploadFile } from "@/lib/storage";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  label?: string;
  accept?: string;
}

export default function ImageUpload({
  value,
  onChange,
  folder = "uploads",
  label = "Imagem",
  accept = "image/*",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadFile(file, folder);
      onChange(url);
    } catch (err) {
      console.error(err);
      setError("Falha no upload");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-navy-600">
        {label}
      </label>

      {value ? (
        <div className="relative overflow-hidden rounded-lg border border-gray-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="h-40 w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute right-2 top-2 rounded-full bg-black/70 p-1.5 text-navy-950 hover:bg-red-500"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-navy-600 transition-colors hover:border-accent/50 hover:text-navy-950">
          {uploading ? (
            <Loader2 size={20} className="animate-spin text-accent" />
          ) : (
            <>
              <Upload size={20} />
              <span className="text-xs">Clique para enviar</span>
            </>
          )}
          <input
            type="file"
            accept={accept}
            onChange={handleFile}
            disabled={uploading}
            className="hidden"
          />
        </label>
      )}

      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value || null)}
        placeholder="ou cole uma URL"
        className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-navy-950 placeholder-gray-400 focus:border-accent focus:outline-none"
      />

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
