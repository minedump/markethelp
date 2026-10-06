import type { Metadata } from 'next';
import { LinkButton, LinkGo, Steps, Table, Text } from '@/components/ui';
import { Cta, Head, Section } from '@/components/site/Layout';
import { PageHead } from '@/components/site/PageHead';
import { NumberList } from '@/components/site/NumberList';
import { PhotoBlock } from '@/components/site/PhotoBlock';
import {
  CHINA_OPS,
  CHINA_ROUTES,
  CHINA_SECTIONS,
  CHINA_STEPS,
  CHINA_WAREHOUSE,
} from '@/content/china';
import { CTA, PAGES } from '@/content/pages';
import { ROUTES } from '@/content/site';

export const metadata: Metadata = {
  title: PAGES.china.title,
  description: PAGES.china.description,
  alternates: { canonical: ROUTES.china },
};

export default function ChinaPage() {
  return (
    <main>
      <PageHead page={PAGES.china} />

      <Section>
        <PhotoBlock
          pic="china"
          alt="Склад в Гуанчжоу"
          title={CHINA_WAREHOUSE.title}
          note={CHINA_WAREHOUSE.note}
          rows={CHINA_WAREHOUSE.rows}
        />
      </Section>

      {/* Что делаем на месте — четыре пункта с крупными номерами
          в две колонки. Номер здесь и есть картинка: он говорит
          «это четыре шага подряд», и значок при нём был бы вторым
          украшением на ту же мысль. */}
      <Section>
        <Head title={CHINA_SECTIONS.ops.title} lead={CHINA_SECTIONS.ops.lead} />
        <NumberList items={CHINA_OPS} />
      </Section>

      {/* Консолидация и отправка — схемой шагов из кита */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] items-start">
          <Head
            className="lg:sticky lg:top-32"
            title={CHINA_SECTIONS.steps.title}
            lead={CHINA_SECTIONS.steps.lead}
          />
          <Steps items={CHINA_STEPS.map((s) => ({ title: s.title, text: s.note }))} />
        </div>
      </Section>

      <Section>
        <Head title={CHINA_SECTIONS.routes.title} lead={CHINA_SECTIONS.routes.lead} />
        <div className="mt-9">
          <Table
            narrow
            columns={[
              { head: 'Способ' },
              { head: 'Срок' },
              { head: 'Когда подходит' },
              { head: 'Стоимость', num: true },
            ]}
            rows={CHINA_ROUTES.map((r) => [
              <span key="t" className="font-medium">{r.title}</span>,
              <span key="d" className="whitespace-nowrap">{r.time}</span>,
              <span key="n" className="text-ink-soft">{r.note}</span>,
              r.price,
            ])}
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-9">
          <LinkButton variant="secondary" href={`${ROUTES.tariffs}#t-china`}>
            Тарифы на Китай
          </LinkButton>
          <LinkGo href={`${ROUTES.tariffs}#t-customs`} arrow>
            ВЭД и сертификация
          </LinkGo>
        </div>
      </Section>

      <Cta text={CTA.china} />
    </main>
  );
}
