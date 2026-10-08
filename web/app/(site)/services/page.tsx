import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { LinkButton, LinkGo, Text } from '@/components/ui';
import { Cta, Section } from '@/components/site/Layout';
import { PageHead } from '@/components/site/PageHead';
import { SERVICES_ALL } from '@/content/services';
import { CTA, PAGES, PRICELIST } from '@/content/pages';
import { ROUTES } from '@/content/site';

export const metadata: Metadata = {
  title: PAGES.services.title,
  description: PAGES.services.description,
  alternates: { canonical: ROUTES.services },
};

export default function ServicesPage() {
  return (
    <main>
      <PageHead
        page={PAGES.services}
        actions={
          <>
            <LinkButton variant="secondary" href={ROUTES.tariffs}>
              Смотреть тарифы
            </LinkButton>
            <LinkGo href={PRICELIST.href} download>
              <Icon name="download" />
              {PRICELIST.title}
            </LinkGo>
          </>
        }
      />

      {/* Все двадцать разделов одним списком, в две колонки. Тот же
          список-меню, что на главной: без карточек — сравнивать нечего,
          это перечень. Номер у раздела свой, по нему на него ссылаются. */}
      <Section>
        <div className="grid md:grid-cols-2 gap-x-10">
          {SERVICES_ALL.map((s, i) => {
            const no = String(i + 1).padStart(2, '0');
            return (
              <div key={s.title} id={`s-${no}`} className="flex items-start gap-4 py-6 border-b border-line">
                <Icon name={s.icon} size="lg" className="text-brand shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="t-small text-ink-mute tabular-nums">{no}</span>
                  <Text variant="h4" as="h3" className="mt-0.5">
                    {s.title}
                  </Text>
                  <Text variant="small" className="mt-1.5 max-w-[44rem]">
                    {s.note}
                  </Text>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Cta text={CTA.services} />
    </main>
  );
}
