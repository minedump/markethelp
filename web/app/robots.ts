import type { MetadataRoute } from 'next';
import { ROUTES, SITE_URL } from '@/content/site';

/**
 * robots.txt.
 *
 * Пока сайт стоит на тестовом домене, его нужно закрыть целиком:
 * иначе поисковик проиндексирует копию и склеит её с боевой. Признак
 * тот же, что у счётчика, — NEXT_PUBLIC_METRIKA=1 ставится только
 * на боевой сборке, поэтому отдельного флага не заводим.
 *
 * «Заявка принята» и витрина кита закрыты и на боевом: первая —
 * страница-цель после формы, вторая не для посетителей.
 */
export const dynamic = 'force-static';

const PUBLIC = process.env.NEXT_PUBLIC_METRIKA === '1';

export default function robots(): MetadataRoute.Robots {
  if (!PUBLIC) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: { userAgent: '*', allow: '/', disallow: [ROUTES.thanks, '/kit/'] },
    sitemap: new URL('/sitemap.xml', SITE_URL).toString(),
    host: SITE_URL,
  };
}
