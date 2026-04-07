/**
 * Cloudflare Pages Function: POST /api/users/create
 *
 * Cria um novo usuário do CMS (auth.users + cms_admins_ija).
 * Requer que o caller seja um admin (verifica via JWT + cms_admins_ija).
 *
 * Env vars obrigatórias:
 *   - SUPABASE_URL (ou NEXT_PUBLIC_SUPABASE_URL)
 *   - SUPABASE_SERVICE_ROLE_KEY (segredo, só no Cloudflare)
 */

export async function onRequestPost({ request, env }) {
  try {
    const SUPABASE_URL = env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
    const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
    const ANON_KEY = env.SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SERVICE_KEY) {
      return json({ error: "Configuração do servidor ausente." }, 500);
    }

    // 1. Verifica JWT do caller
    const authHeader = request.headers.get("Authorization") || "";
    const token = authHeader.replace(/^Bearer\s+/i, "");
    if (!token) return json({ error: "Não autenticado." }, 401);

    // Valida token e pega user_id
    const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: ANON_KEY || SERVICE_KEY, Authorization: `Bearer ${token}` },
    });
    if (!userRes.ok) return json({ error: "Token inválido." }, 401);
    const caller = await userRes.json();
    if (!caller?.id) return json({ error: "Token inválido." }, 401);

    // 2. Checa se caller é admin
    const adminCheck = await fetch(
      `${SUPABASE_URL}/rest/v1/cms_admins_ija?id=eq.${caller.id}&select=role`,
      { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` } }
    );
    const adminRows = await adminCheck.json();
    if (!Array.isArray(adminRows) || adminRows[0]?.role !== "admin") {
      return json({ error: "Apenas admins podem criar usuários." }, 403);
    }

    // 3. Parse body
    const body = await request.json();
    const { email, password, name, role } = body || {};
    if (!email || !password || !name) {
      return json({ error: "Campos obrigatórios: email, password, name." }, 400);
    }
    if (!["admin", "editor"].includes(role)) {
      return json({ error: "Role inválida." }, 400);
    }
    if (password.length < 8) {
      return json({ error: "A senha precisa ter pelo menos 8 caracteres." }, 400);
    }

    // 4. Cria user via Auth Admin API (auto-confirma email)
    const createRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
      method: "POST",
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        email_confirm: true,
        user_metadata: { name },
      }),
    });

    if (!createRes.ok) {
      const err = await createRes.json().catch(() => ({}));
      return json(
        { error: err.msg || err.error_description || err.error || "Erro ao criar usuário." },
        createRes.status
      );
    }

    const newUser = await createRes.json();

    // 5. Insere em cms_admins_ija
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/cms_admins_ija`, {
      method: "POST",
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        id: newUser.id,
        email,
        name,
        role,
      }),
    });

    if (!insertRes.ok) {
      // Rollback: deleta o user auth que acabou de criar
      await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${newUser.id}`, {
        method: "DELETE",
        headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
      });
      const err = await insertRes.json().catch(() => ({}));
      return json({ error: err.message || "Erro ao registrar em cms_admins_ija." }, 500);
    }

    return json({ ok: true, user: { id: newUser.id, email, name, role } });
  } catch (err) {
    console.error("Erro /api/users/create:", err);
    return json({ error: "Erro interno." }, 500);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
