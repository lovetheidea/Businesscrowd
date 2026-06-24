import { verifyPassword, createJWT, parseCookies, jsonResponse } from './_auth.js';

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid request body' }, 400);
  }

  const { email, password } = body;
  if (!email || !password) {
    return jsonResponse({ error: 'Email and password are required' }, 400);
  }

  const row = await env.DB.prepare(
    'SELECT id, email, name, password_hash, business_name, business_category, plan FROM users WHERE email = ?'
  ).bind(email.toLowerCase()).first();

  if (!row) {
    return jsonResponse({ error: 'Incorrect email or password' }, 401);
  }

  const valid = await verifyPassword(password, row.password_hash);
  if (!valid) {
    return jsonResponse({ error: 'Incorrect email or password' }, 401);
  }

  const token = await createJWT(
    { email: row.email, name: row.name, business_name: row.business_name, plan: row.plan },
    env.JWT_SECRET
  );

  return jsonResponse(
    { success: true, user: { email: row.email, name: row.name, plan: row.plan } },
    200,
    { 'Set-Cookie': `bc_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800; Secure` }
  );
}
