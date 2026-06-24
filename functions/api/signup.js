import { hashPassword, createJWT, jsonResponse } from './_auth.js';

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid request body' }, 400);
  }

  const { name, email, password, business_name, business_category } = body;

  if (!name || !email || !password) {
    return jsonResponse({ error: 'Name, email and password are required' }, 400);
  }
  if (password.length < 8) {
    return jsonResponse({ error: 'Password must be at least 8 characters' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: 'Invalid email address' }, 400);
  }

  const passwordHash = await hashPassword(password);

  try {
    await env.DB.prepare(
      `INSERT INTO users (email, name, password_hash, business_name, business_category, plan)
       VALUES (?, ?, ?, ?, ?, 'free')`
    ).bind(email.toLowerCase(), name, passwordHash, business_name || null, business_category || null).run();
  } catch (e) {
    if (e.message && e.message.includes('UNIQUE')) {
      return jsonResponse({ error: 'That email address is already registered' }, 409);
    }
    console.error('Signup DB error:', e);
    return jsonResponse({ error: 'Account creation failed. Please try again.' }, 500);
  }

  const token = await createJWT(
    { email: email.toLowerCase(), name, business_name: business_name || null, plan: 'free' },
    env.JWT_SECRET
  );

  return jsonResponse(
    { success: true, user: { email: email.toLowerCase(), name, plan: 'free' } },
    201,
    { 'Set-Cookie': `bc_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800; Secure` }
  );
}
