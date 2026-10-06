import type { ReactNode } from 'react';
import { Rich } from '@/components/Rich';
import { Crumbs, Text } from '@/components/ui';
import { Section } from './Layout';
import { BreadcrumbSchema } from './Schema';
import type { PageMeta } from '@/content/pages';
import { ROUTES } from '@/content/site';

/**
 * Начало внутренней страницы: путь, заголовок, подводка и — если есть —
 * действия.
 *
 * Подводка идёт через Rich: в ней бывает ссылка — например,
 * на страницу документов в условиях работы.
 *
 * Чёрного блока здесь нет: он один на сайт и стоит на главной. Путь
 * у большинства страниц один уровень, поэтому собирается из одного
 * названия; реквизиты лежат под документами и передают их сами.
 */
export function PageHead({
  page,
  actions,
  below,
  parents = [],
}: {
  page: PageMeta;
  actions?: ReactNode;
  /** строка под подводкой: редакция у правовых страниц */
  below?: ReactNode;
  /**
   * Разделы между главной и этой страницей: у реквизитов это
   * документы. Названия строками — их же забирает микроразметка.
   */
  parents?: { title: string; href: string }[];
}) {
  const crumbs = [
    { title: 'Главная', href: ROUTES.home },
    ...parents,
    { title: page.crumb ?? page.title, href: page.href },
  ];

  return (
    <Section className="pt-14">
      {/* путь и его разметка берутся из одного списка: разойтись им нечем */}
      <BreadcrumbSchema items={crumbs} />
      <Crumbs
        label="Путь"
        items={[...crumbs.slice(0, -1), { title: crumbs[crumbs.length - 1].title }]}
      />
      <Text variant="display-sm" as="h1" className="mt-6">
        {page.h1}
      </Text>
      <Text variant="lead" className="mt-4 max-w-[44rem]">
        <Rich>{page.lead}</Rich>
      </Text>
      {below ? (
        <Text variant="small" className="mt-5 m-0">
          {below}
        </Text>
      ) : null}
      {actions ? <div className="flex flex-wrap items-center gap-4 mt-7">{actions}</div> : null}
    </Section>
  );
}
