import { verifyJWT, parseCookies, jsonResponse } from './_auth.js';

export async function onRequestGet({ request, env }) {
  const cookies = parseCookies(request.headers.get('Cookie'));
  const token = cookies['bc_token'];
  if (!token) return jsonResponse({ error: 'Not authenticated' }, 401);

  const payload = await verifyJWT(token, env.JWT_SECRET);
  if (!payload) return jsonResponse({ error: 'Session expired' }, 401);

  const row = await env.DB.prepare(
    'SELECT email, name, business_name, business_category, plan, created_at FROM users WHERE email = ?'
  ).bind(payload.email).first();

  if (!row) return jsonResponse({ error: 'User not found' }, 404);

  return jsonResponse({ ...row });
}

export async function onRequestPatch({ request, env }) {
  const cookies = parseCookies(request.headers.get('Cookie'));
  const token = cookies['bc_token'];
  if (!token) return jsonResponse({ error: 'Not authenticated' }, 401);

  const payload = await verifyJWT(token, env.JWT_SECRET);
  if (!payload) return jsonResponse({ error: 'Session expired' }, 401);

  let body;
  try { body = await request.json(); } catch { return jsonResponse({ error: 'Invalid body' }, 400); }

  const { name, business_name, business_category } = body;

  await env.DB.prepare(
    'UPDATE users SET name = ?, business_name = ?, business_category = ? WHERE email = ?'
  ).bind(name || null, business_name || null, business_category || null, payload.email).run();

  return jsonResponse({ success: true });
}
