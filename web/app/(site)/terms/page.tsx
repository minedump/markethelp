import type { Metadata } from 'next';
import { Table, Text } from '@/components/ui';
import { Cta, Head, Section } from '@/components/site/Layout';
import { NumberList } from '@/components/site/NumberList';
import { PageHead } from '@/components/site/PageHead';
import { CheckList } from '@/components/site/PhotoBlock';
import { DEFECTS, OURS, TERMS_SECTIONS, TERMS_TIMING, YOURS } from '@/content/terms';
import { CTA, PAGES } from '@/content/pages';
import { ROUTES } from '@/content/site';

export const metadata: Metadata = {
  title: PAGES.terms.title,
  description: PAGES.terms.description,
  alternates: { canonical: ROUTES.terms },
};

export default function TermsPage() {
  const { timing, defects, ours, yours } = TERMS_SECTIONS;

  return (
    <main>
      <PageHead page={PAGES.terms} />

      <Section>
        <Head title={timing.title} lead={timing.lead} />
        <div className="mt-9">
          <Table
            narrow
            columns={[{ head: 'Операция' }, { head: 'Срок' }, { head: 'Условие' }]}
            rows={TERMS_TIMING.map((t) => [
              <span key="o" className="font-medium">{t.title}</span>,
              <span key="w" className="tabular-nums whitespace-nowrap">{t.time}</span>,
              <span key="c" className="text-ink-soft">{t.note}</span>,
            ])}
          />
        </div>
      </Section>

      {/* Порядок при браке и недостаче — четыре шага крупными номерами */}
      <Section>
        <Head title={defects.title} lead={defects.lead} />
        <NumberList items={DEFECTS} />
      </Section>

      {/* Ответственность сторон — два списка рядом, читают построчно */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <Text variant="display-sm" as="h2">
              {ours.title}
            </Text>
            <CheckList rows={OURS} className="mt-7" />
          </div>
          <div>
            <Text variant="display-sm" as="h2">
              {yours.title}
            </Text>
            <CheckList rows={YOURS} className="mt-7" />
          </div>
        </div>
      </Section>

      <Cta text={CTA.terms} />
    </main>
  );
}
