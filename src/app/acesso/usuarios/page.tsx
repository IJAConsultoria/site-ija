"use client";

import { useEffect, useState } from "react";
import { Loader2, Users, Trash2, Shield, Plus, X } from "lucide-react";
import RequireAdmin from "@/components/admin/RequireAdmin";
import {
  getAdmins,
  getCurrentAdmin,
  updateAdminRole,
  deleteAdmin,
  type CmsAdmin,
} from "@/lib/queries/admins";
import { createClient } from "@/lib/supabase/client";

export default function UsuariosPageWrapper() {
  return (
    <RequireAdmin>
      <UsuariosPage />
    </RequireAdmin>
  );
}

function UsuariosPage() {
  const [admins, setAdmins] = useState<CmsAdmin[]>([]);
  const [me, setMe] = useState<CmsAdmin | null>(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const [list, current] = await Promise.all([getAdmins(), getCurrentAdmin()]);
      setAdmins(list);
      setMe(current);
    } finally {
      setLoading(false);
    }
  }

  const isAdmin = me?.role === "admin";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-950">Usuários do CMS</h1>
          <p className="mt-1 text-sm text-navy-600">
            {isAdmin
              ? "Gerencie quem tem acesso ao painel"
              : "Apenas administradores podem gerenciar usuários"}
          </p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setModal(true)}
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
          >
            <Plus size={16} />
            Novo usuário
          </button>
        )}
      </div>

      {!isAdmin && me && (
        <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700">
          Você está logado como <strong>{me.role}</strong> e não pode editar usuários.
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      ) : admins.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-12 text-center">
          <Users size={36} className="mx-auto mb-3 text-navy-600" />
          <p className="text-sm text-navy-600">Nenhum usuário cadastrado.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs uppercase text-navy-600">Nome</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-navy-600">Email</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-navy-600">Role</th>
                <th className="w-20" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {admins.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-navy-950">
                    {a.name}
                    {me?.id === a.id && (
                      <span className="ml-2 text-[10px] text-accent">(você)</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-navy-700">{a.email}</td>
                  <td className="px-4 py-3">
                    {isAdmin && me?.id !== a.id ? (
                      <select
                        value={a.role}
                        onChange={async (e) => {
                          await updateAdminRole(a.id, e.target.value as "admin" | "editor");
                          setAdmins((prev) =>
                            prev.map((x) =>
                              x.id === a.id ? { ...x, role: e.target.value as "admin" | "editor" } : x
                            )
                          );
                        }}
                        className="rounded border border-gray-200 bg-white px-2 py-1 text-xs text-navy-950"
                      >
                        <option value="admin">admin</option>
                        <option value="editor">editor</option>
                      </select>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-0.5 text-[10px] text-navy-700">
                        {a.role === "admin" && <Shield size={10} />}
                        {a.role}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {isAdmin && me?.id !== a.id && (
                      <button
                        onClick={async () => {
                          if (!confirm(`Remover ${a.name} do CMS?`)) return;
                          await deleteAdmin(a.id);
                          setAdmins((prev) => prev.filter((x) => x.id !== a.id));
                        }}
                        className="rounded p-1 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && <NovoUsuarioModal onClose={() => setModal(false)} onCreated={load} />}
    </div>
  );
}

function NovoUsuarioModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "editor">("editor");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    if (password.length < 8) {
      setError("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError("Sessão expirada. Faça login novamente.");
        return;
      }

      const res = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao criar usuário.");
        return;
      }

      onCreated();
      onClose();
    } catch {
      setError("Erro ao criar usuário. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-navy-950">Novo usuário</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-navy-600 hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-navy-700">
              Nome completo <span className="text-accent">*</span>
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-navy-950 focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-navy-700">
              Email <span className="text-accent">*</span>
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-navy-950 focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-navy-700">
              Senha <span className="text-accent">*</span>
            </label>
            <input
              required
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-navy-950 focus:border-accent focus:outline-none"
            />
            <p className="mt-1 text-[11px] text-navy-500">
              Anote a senha e envie ao usuário por canal seguro.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-navy-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "admin" | "editor")}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-navy-950"
            >
              <option value="editor">Editor (só artigos, banners, iscas, histórias)</option>
              <option value="admin">Admin Full (vê tudo, inclusive Ouvidoria e Usuários)</option>
            </select>
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-navy-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-50"
            >
              {submitting && <Loader2 size={14} className="animate-spin" />}
              Criar usuário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
