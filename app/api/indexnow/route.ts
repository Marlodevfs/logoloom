import { NextResponse } from 'next/server';
import sitemap from '@/app/sitemap';
import { siteConfig } from '@/config/site';

/**
 * IndexNow : prévient Bing, Yandex, Seznam, Naver… (et donc la recherche de
 * ChatGPT et DuckDuckGo, qui s'appuient sur Bing) que nos pages existent ou ont changé.
 * Appelé une fois par semaine par le cron Vercel (voir vercel.json).
 * La clé publique est servie par /public/dae2a8b1d5f1ff928b0d3c7e4b4bf5ef.txt, comme l'exige le protocole.
 */
const INDEXNOW_KEY = 'dae2a8b1d5f1ff928b0d3c7e4b4bf5ef';

export const dynamic = 'force-dynamic';

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (secret) return req.headers.get('authorization') === `Bearer ${secret}`;
  return (req.headers.get('user-agent') || '').startsWith('vercel-cron');
}

export async function GET(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const host = new URL(siteConfig.url).host;
  const urlList = sitemap().map((e) => e.url).slice(0, 10_000);

  let res: Response;
  try {
    res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
    });
  } catch (e) {
    return NextResponse.json({ submitted: 0, error: (e as Error).message }, { status: 502 });
  }

  // 200 = reçu, 202 = reçu (clé en cours de vérification). Le reste est une erreur.
  return NextResponse.json({ submitted: urlList.length, status: res.status }, { status: res.ok ? 200 : 502 });
}
