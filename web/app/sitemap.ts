import type { MetadataRoute } from 'next';
import { ARTICLES, POSTS } from '@/content/blog';
import { PAGES } from '@/content/pages';
import { ROUTES, SITE_URL } from '@/content/site';

/**
 * Карта сайта. Собирается из тех же маршрутов, что и страницы, —
 * списка адресов отдельно от содержания нет, и забыть в нём страницу
 * нельзя.
 *
 * В карту не идут «Заявка принята» и 404: первая — страница-цель
 * после формы, вторая не страница вовсе.
 *
 * priority не выдумываем по ощущениям: главная выше остальных, прочее
 * равно между собой. Поисковики давно считают этот вес сами, и
 * расставленные наугад числа только вводят в заблуждение того, кто
 * будет читать этот файл потом.
 */
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, SITE_URL).toString();

  const pages = [
    ROUTES.home,
    ROUTES.services,
    ROUTES.tariffs,
    ROUTES.marketplaces,
    ROUTES.china,
    ROUTES.warehouse,
    ROUTES.about,
    ROUTES.start,
    ROUTES.terms,
    ROUTES.contacts,
    ROUTES.documents,
    ROUTES.requisites,
    ROUTES.blog,
    ROUTES.policy,
    ROUTES.consent,
    ROUTES.offer,
  ];

  /* в карту идут только написанные статьи: страниц у остальных нет */
  const posts = POSTS.filter((p) => p.slug in ARTICLES).map((p) => `${ROUTES.blog}${p.slug}/`);

  return [...pages, ...posts].map((path) => ({
    url: url(path),
    changeFrequency: path === ROUTES.blog || path === ROUTES.home ? 'weekly' : 'monthly',
    priority: path === PAGES.home.href ? 1 : 0.7,
  }));
}
