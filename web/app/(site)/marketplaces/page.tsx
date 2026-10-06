import type { Metadata } from 'next';
import Link from 'next/link';
import { Bento, Card, Chip, Table, Text } from '@/components/ui';
import { COLUMN_BARE, Head, Section, TILE } from '@/components/site/Layout';
import { PageHead } from '@/components/site/PageHead';
import { RequestButton } from '@/components/site/RequestButton';
import { Icon } from '@/components/Icon';
import { PLATFORMS, REQUIREMENTS, REQUIREMENTS_HEAD, SINGLE_STOCK } from '@/content/platforms';
import { PAGES } from '@/content/pages';
import { ROUTES, asset } from '@/content/site';

export const metadata: Metadata = {
  title: PAGES.marketplaces.title,
  description: PAGES.marketplaces.description,
  alternates: { canonical: ROUTES.marketplaces },
};

export default function MarketplacesPage() {
  return (
    <main>
      <PageHead page={PAGES.marketplaces} />

      {/* Площадки — карточками: их сравнивают между собой, выбирая, куда
          выходить, и карточка тут по делу. В каждой: знак, схемы, что
          делаем и главное требование площадки. */}
      <Section>
        <div className="swipe md:grid-cols-2 lg:grid-cols-4">
          {PLATFORMS.map((p) => (
            <Card key={p.title} className="flex flex-col gap-4">
              <div>
                {/* метка схем — под знаком, а не рядом: в четыре колонки
                    знак и метка не помещаются в одну строку */}
                <div className="flex items-center h-7">
                  {p.pic ? (
                    <img src={asset(p.pic.replace(/\.svg$/, ''), 'svg')} alt={p.title} className="h-7 w-auto" />
                  ) : (
                    <span className="t-h4">{p.title}</span>
                  )}
                </div>
                <Chip tone="brand" className="mt-3">
                  {p.schemes}
                </Chip>
              </div>
              <Text variant="small" className="m-0">
                {p.what}
              </Text>
              <Text variant="small" className="m-0 mt-auto pt-3 border-t border-line-soft">
                <b className="font-semibold text-ink">Требует:</b> {p.requires}
              </Text>
            </Card>
          ))}
        </div>
      </Section>

      {/* Требования — таблицей по видам, а не по площадкам: по сути они
          у всех одни, различаются формой этикетки и лимитами, а те
          меняются чаще, чем страница. Каждая строка ведёт в тарифы. */}
      <Section>
        <Head title={REQUIREMENTS_HEAD.title} lead={REQUIREMENTS_HEAD.lead} />
        <div className="mt-9">
          <Table
            narrow
            columns={[{ head: 'Требование площадки' }, { head: 'Что делаем' }, { head: 'Раздел тарифов' }]}
            rows={REQUIREMENTS.map((r) => [
              <span key="t" className="font-medium">{r.title}</span>,
              <span key="w" className="text-ink-soft">{r.what}</span>,
              <Link key="s" className="link" href={ROUTES.tariffs}>
                {r.section}
              </Link>,
            ])}
          />
        </div>
      </Section>

      {/* Единый остаток — главный довод страницы, ему широкая плитка */}
      <Section bleed>
        <Bento wide className={TILE}>
          <div className={`${COLUMN_BARE} grid gap-10 lg:grid-cols-[1fr_1.2fr] items-start`}>
            <div>
              <Text variant="display-sm" as="h2">
                {SINGLE_STOCK.title}
              </Text>
              <Text variant="lead" className="mt-4">
                {SINGLE_STOCK.lead}
              </Text>
              <RequestButton size="lg" className="mt-8">
                {SINGLE_STOCK.button}
              </RequestButton>
            </div>
            <ul className="list-none m-0 p-0 flex flex-col gap-5">
              {SINGLE_STOCK.rows.map((r) => (
                <li key={r.title} className="flex items-start gap-3">
                  <Icon name="check" className="text-brand shrink-0 mt-0.5" />
                  <span>
                    <b className="block font-semibold">{r.title}</b>
                    <span className="block t-small mt-0.5">{r.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Bento>
      </Section>
    </main>
  );
}
