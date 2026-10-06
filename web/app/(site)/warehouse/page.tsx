import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { Bento, LinkButton, LinkGo, Swipe, Text } from '@/components/ui';
import { Cta, Head, Section } from '@/components/site/Layout';
import { PageHead } from '@/components/site/PageHead';
import { PhotoBlock } from '@/components/site/PhotoBlock';
import { RequestButton } from '@/components/site/RequestButton';
import { WAREHOUSE_FACTS, WAREHOUSE_SECTIONS, WAREHOUSE_ZONES } from '@/content/warehouse';
import { CTA, PAGES } from '@/content/pages';
import { PHONE, ROUTES, WAREHOUSE, asset } from '@/content/site';

export const metadata: Metadata = {
  title: PAGES.warehouse.title,
  description: PAGES.warehouse.description,
  alternates: { canonical: ROUTES.warehouse },
};

export default function WarehousePage() {
  return (
    <main>
      <PageHead
        page={PAGES.warehouse}
        actions={
          <>
            <RequestButton>Записаться на осмотр</RequestButton>
            <LinkButton variant="secondary" href={WAREHOUSE.href} target="_blank" rel="noopener">
              Как проехать
            </LinkButton>
          </>
        }
      />

      {/* Общий вид — одно большое фото на всю колонку */}
      <Section>
        <img
          src={asset('wh-overview')}
          alt="Склад: стеллажи с паллетами"
          className="aspect-[2/1] w-full object-cover rounded-card"
        />
      </Section>

      {/* Зоны склада — четыре фото с подписями, в порядке движения товара */}
      <Section>
        <Head title={WAREHOUSE_SECTIONS.zones.title} lead={WAREHOUSE_SECTIONS.zones.lead} />
        <Swipe cols="sm:grid-cols-2 lg:grid-cols-4" className="gap-x-6 gap-y-10 mt-9">
          {WAREHOUSE_ZONES.map((z) => (
            <div key={z.pic}>
              <img
                src={asset(z.pic)}
                alt={z.title}
                className="aspect-[4/3] w-full object-cover rounded-card"
                loading="lazy"
              />
              <Text variant="h4" as="h3" className="mt-4">
                {z.title}
              </Text>
              <Text variant="small" className="mt-1.5">
                {z.note}
              </Text>
            </div>
          ))}
        </Swipe>
      </Section>

      {/* Площадь и оснащение — плитками, как цифры на главной */}
      <Section>
        <Head title={WAREHOUSE_SECTIONS.facts.title} />
        <div className="grid gap-4 sm:grid-cols-2 mt-9">
          {WAREHOUSE_FACTS.map((f) => (
            <Bento key={f.title}>
              <p className="t-h4 text-brand m-0">{f.title}</p>
              <p className="t-display-sm mt-4 m-0">{f.big}</p>
              <p className="t-small mt-2 m-0">{f.note}</p>
            </Bento>
          ))}
        </div>
      </Section>

      <Section>
        <PhotoBlock
          pic="wh-packing"
          alt="Стол упаковки под камерой"
          title={WAREHOUSE_SECTIONS.video.title}
          note={WAREHOUSE_SECTIONS.video.note}
          rows={WAREHOUSE_SECTIONS.video.rows}
        />
      </Section>

      {/* Как проехать: адрес с подробностями слева, карта справа */}
      <Section>
        <Head title={WAREHOUSE_SECTIONS.route.title} />
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] items-start mt-9">
          <div className="flex flex-col gap-3.5">
            <p className="flex items-center gap-2 m-0 font-semibold text-[0.9375rem] leading-snug">
              <Icon name="warehouse" className="shrink-0" />
              <span>{WAREHOUSE.title}</span>
            </p>
            <Text variant="small" className="m-0">
              {WAREHOUSE_SECTIONS.route.note}
            </Text>
            <LinkGo href={PHONE.href}>
              <Icon name="phone" />
              {PHONE.title}
            </LinkGo>
            <LinkGo href={WAREHOUSE.href} arrow target="_blank" rel="noopener">
              Открыть в Яндекс Картах
            </LinkGo>
          </div>
          {/* подложка и скругление — те же, что у фото, пока карта грузится */}
          <div className="aspect-[16/9] w-full rounded-card bg-surface overflow-hidden">
            <iframe
              src={WAREHOUSE_SECTIONS.route.map}
              className="block w-full h-full border-0"
              title="Склад MarketHelp на карте"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </Section>

      <Cta text={CTA.warehouse} />
    </main>
  );
}
