// functions/api/gemini.ts — Cloudflare Pages Function
//
// Proxies Gemini API calls server-side so GEMINI_API_KEY never reaches the browser.
// Set the secret in Cloudflare Pages → Settings → Environment variables.

interface Env {
  GEMINI_API_KEY: string;
}

const GEMINI_BASE    = 'https://generativelanguage.googleapis.com';
const ALLOWED_ORIGIN = 'https://oncophenomics.pages.dev';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const origin = request.headers.get('origin') ?? '';
  const isDev  = origin.startsWith('http://localhost');

  if (!isDev && origin !== ALLOWED_ORIGIN) {
    return new Response('Forbidden', { status: 403 });
  }

  if (!env.GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: 'Server misconfiguration' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { model = 'gemini-2.0-flash', ...rest } = body as Record<string, unknown>;
  const geminiUrl = `${GEMINI_BASE}/v1beta/models/${model}:generateContent`;

  let upstream: Response;
  try {
    upstream = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': env.GEMINI_API_KEY,
      },
      body: JSON.stringify(rest),
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Upstream request failed' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: new Headers({
      'Content-Type': upstream.headers.get('Content-Type') ?? 'application/json',
      'Access-Control-Allow-Origin': isDev ? '*' : ALLOWED_ORIGIN,
    }),
  });
};

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
