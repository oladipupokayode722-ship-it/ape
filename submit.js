// Vercel serverless function: validates and saves a whitelist entry in Supabase.
// Env vars (set in Vercel, never in code): SUPABASE_URL, SUPABASE_SERVICE_KEY, TURNSTILE_SECRET (optional but recommended)
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const wallet = String(b.wallet || '').trim().toLowerCase();
  const x = String(b.x || '').trim().replace(/^@/, '').toLowerCase();
  const repost = String(b.repost || '').trim();
  if (!/^0x[a-f0-9]{40}$/.test(wallet)) return res.status(400).json({ error: 'Enter a valid wallet address.' });
  if (!/^[a-z0-9_]{1,15}$/.test(x)) return res.status(400).json({ error: 'Enter a valid X username.' });
  if (!/^https:\/\/(x|twitter)\.com\/[A-Za-z0-9_]+\/status\/\d+/.test(repost)) return res.status(400).json({ error: 'Paste the link to your repost.' });
  if (process.env.TURNSTILE_SECRET) {
    const t = b['cf-turnstile-response'];
    const v = t && await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET, response: t })
    }).then(r => r.json()).catch(() => null);
    if (!v || !v.success) return res.status(400).json({ error: 'Verification failed. Refresh and try again.' });
  }
  const r = await fetch(process.env.SUPABASE_URL + '/rest/v1/whitelist', {
    method: 'POST',
    headers: { apikey: process.env.SUPABASE_SERVICE_KEY, ...(process.env.SUPABASE_SERVICE_KEY.startsWith('eyJ') ? { Authorization: 'Bearer ' + process.env.SUPABASE_SERVICE_KEY } : {}), 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ wallet, x_handle: x, repost_url: repost })
  });
  if (r.status === 409) return res.status(409).json({ error: 'That wallet or X username is already registered.' });
  if (!r.ok) return res.status(500).json({ error: 'Could not save your entry. Please try again.' });
  return res.status(200).json({ ok: true });
}
