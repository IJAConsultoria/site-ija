"use client";

import { useEffect, useState } from "react";
import { Loader2, Users, Trash2, Shield } from "lucide-react";
import {
  getAdmins,
  getCurrentAdmin,
  updateAdminRole,
  deleteAdmin,
  type CmsAdmin,
} from "@/lib/queries/admins";

export default function UsuariosPage() {
  const [admins, setAdmins] = useState<CmsAdmin[]>([]);
  const [me, setMe] = useState<CmsAdmin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAdmins(), getCurrentAdmin()])
      .then(([list, current]) => {
        setAdmins(list);
        setMe(current);
      })
      .finally(() => setLoading(false));
  }, []);

  const isAdmin = me?.role === "admin";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Usuários do CMS</h1>
        <p className="mt-1 text-sm text-navy-400">
          {isAdmin
            ? "Gerencie quem tem acesso ao painel"
            : "Apenas administradores podem gerenciar usuários"}
        </p>
      </div>

      {!isAdmin && me && (
        <div className="mb-4 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm text-yellow-400">
          Você está logado como <strong>{me.role}</strong> e não pode editar usuários.
        </div>
      )}

      <div className="mb-4 rounded-lg border border-blue-500/20 bg-blue-500/10 p-4 text-xs text-blue-300">
        <p className="font-semibold">Como adicionar um novo usuário:</p>
        <ol className="ml-4 mt-1 list-decimal space-y-0.5">
          <li>No painel do Supabase: Authentication → Add User</li>
          <li>Copie o UUID gerado</li>
          <li>Execute no SQL Editor: <code className="rounded bg-white/5 px-1">INSERT INTO cms_admins (id, email, name, role) VALUES (...)</code></li>
        </ol>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      ) : admins.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
          <Users size={36} className="mx-auto mb-3 text-navy-600" />
          <p className="text-sm text-navy-400">Nenhum usuário cadastrado.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 py-3 text-left text-xs uppercase text-navy-400">Nome</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-navy-400">Email</th>
                <th className="px-4 py-3 text-left text-xs uppercase text-navy-400">Role</th>
                <th className="w-20" />
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {admins.map((a) => (
                <tr key={a.id} className="hover:bg-white/5">
                  <td className="px-4 py-3 text-sm text-white">
                    {a.name}
                    {me?.id === a.id && (
                      <span className="ml-2 text-[10px] text-accent">(você)</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-navy-300">{a.email}</td>
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
                        className="rounded border border-white/10 bg-navy-950 px-2 py-1 text-xs text-white"
                      >
                        <option value="admin">admin</option>
                        <option value="editor">editor</option>
                      </select>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-navy-300">
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
                        className="rounded p-1 text-red-400 hover:bg-red-500/10"
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
    </div>
  );
}
