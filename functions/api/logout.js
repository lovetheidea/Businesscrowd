import { jsonResponse } from './_auth.js';

export async function onRequestPost() {
  return jsonResponse(
    { success: true },
    200,
    { 'Set-Cookie': 'bc_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Secure' }
  );
}
