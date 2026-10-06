import { CONTACTS } from '@/content/contacts';
import { FAQ } from '@/content/start';
import type { Post } from '@/content/blog';
import { MAIL, ORG, PHONE, ROUTES, SITE_URL, WAREHOUSE, asset } from '@/content/site';

/**
 * Микроразметка Schema.org — то же, что на странице, только на языке
 * поисковика.
 *
 * Правило одно: размечаем только то, что человек на странице видит.
 * Разметка, которой нет в тексте, — это обещание поисковику, которое
 * страница не выполняет, и за него снимают сниппет целиком.
 */
function Json({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      /* JSON-LD вставляется строкой: это данные, а не разметка,
         и React не должен их экранировать */
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const url = (path: string) => new URL(path, SITE_URL).toString();

/**
 * Организация и склад — на главной и на контактах. Часы работы и
 * адрес те же, что в подвале и на странице контактов.
 */
export function OrganizationSchema() {
  const hours = CONTACTS.find((c) => c.icon === 'clock')?.value ?? WAREHOUSE.hours;

  return (
    <Json
      data={{
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': url(ROUTES.home) + '#org',
        name: ORG.name,
        legalName: ORG.legal,
        description:
          'Фулфилмент для маркетплейсов: приёмка, проверка, маркировка, упаковка, хранение и отгрузка на площадки.',
        url: url(ROUTES.home),
        logo: url('/og.png'),
        image: url(asset('wh-overview')),
        telephone: PHONE.title,
        email: MAIL.title,
        taxID: ORG.inn,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'RU',
          addressRegion: 'Московская область',
          addressLocality: 'Подольск',
          streetAddress: 'Комсомольская улица, 1с22',
          postalCode: '142100',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 55.426064, longitude: 37.55575 },
        openingHours: 'Mo-Su 09:00-21:00',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '09:00',
          closes: '21:00',
          name: hours,
        },
        areaServed: 'RU',
      }}
    />
  );
}

/**
 * Хлебные крошки: тот же путь, что нарисован на странице. Поисковик
 * показывает его вместо адреса в выдаче.
 */
export function BreadcrumbSchema({
  items,
}: {
  items: { title: string; href?: string }[];
}) {
  return (
    <Json
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((it, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: it.title,
          ...(it.href ? { item: url(it.href) } : {}),
        })),
      }}
    />
  );
}

/** Вопросы и ответы со страницы «Как начать работать» — те же семь. */
export function FaqSchema() {
  return (
    <Json
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ.map((q) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: { '@type': 'Answer', text: q.answer },
        })),
      }}
    />
  );
}

/** Статья блога: заголовок, дата, обложка и кто написал. */
export function ArticleSchema({ post, cover }: { post: Post; cover: string }) {
  /* дата в содержании человеческая — «9 сентября 2026»;
     для поисковика её нужно в машинном виде */
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
  ];
  const m = post.date.match(/(\d{1,2})\s+(\S+)\s+(\d{4})/);
  const published = m
    ? `${m[3]}-${String(months.indexOf(m[2]) + 1).padStart(2, '0')}-${m[1].padStart(2, '0')}`
    : undefined;

  return (
    <Json
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.note,
        image: url(asset(cover)),
        ...(published ? { datePublished: published } : {}),
        author: { '@type': 'Organization', name: ORG.name, url: url(ROUTES.home) },
        publisher: { '@id': url(ROUTES.home) + '#org' },
        mainEntityOfPage: url(`${ROUTES.blog}${post.slug}/`),
      }}
    />
  );
}
