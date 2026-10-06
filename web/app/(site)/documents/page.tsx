import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { LinkGo, Text } from '@/components/ui';
import { Section } from '@/components/site/Layout';
import { PageHead } from '@/components/site/PageHead';
import { DOCUMENTS } from '@/content/documents';
import { PAGES } from '@/content/pages';
import { ROUTES } from '@/content/site';

export const metadata: Metadata = {
  title: PAGES.documents.title,
  description: PAGES.documents.description,
  alternates: { canonical: ROUTES.documents },
};

export default function DocumentsPage() {
  return (
    <main>
      <PageHead page={PAGES.documents} />

      {/* Списком во всю колонку: название ссылкой, строка о том, что
          внутри. Здесь действующие редакции; подписанная версия —
          в личном кабинете. */}
      <Section>
        {DOCUMENTS.map((d) => (
          <div key={d.title} className="flex items-start gap-4 py-6 border-b border-line">
            <Icon name="file" size="lg" className="text-brand shrink-0 mt-0.5" />
            <div className="min-w-0">
              <Text variant="h4" as="h2">
                <LinkGo href={d.href}>{d.title}</LinkGo>
              </Text>
              <Text variant="small" className="mt-1.5 max-w-[44rem]">
                {d.note}
              </Text>
            </div>
          </div>
        ))}
      </Section>
    </main>
  );
}
