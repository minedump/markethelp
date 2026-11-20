import type { MetadataRoute } from 'next';
import { PAGES } from '@/content/pages';
import { ROUTES, SITE_URL } from '@/content/site';

/**
 * Карта сайта. Собирается из тех же маршрутов, что и страницы, —
 * списка адресов отдельно от содержания нет, и забыть в нём страницу
 * нельзя.
 *
 * В карту не идут «Заявка принята» и 404: первая — страница-цель
 * после формы, вторая не страница вовсе. Блог скрыт с сайта — его тоже
 * нет: страницы отдают notFound(), в карте им делать нечего.
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
    ROUTES.policy,
    ROUTES.consent,
    ROUTES.offer,
  ];

  return pages.map((path) => ({
    url: url(path),
    changeFrequency: path === ROUTES.home ? 'weekly' : 'monthly',
    priority: path === PAGES.home.href ? 1 : 0.7,
  }));
}
