import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { Bento, Text } from '@/components/ui';
import { Cta, Head, Section } from '@/components/site/Layout';
import { PageHead } from '@/components/site/PageHead';
import { CheckList, PhotoBlock } from '@/components/site/PhotoBlock';
import { ABOUT_FACTS, ABOUT_SECTIONS, TEAM } from '@/content/about';
import { CTA, PAGES } from '@/content/pages';
import { ROUTES } from '@/content/site';

export const metadata: Metadata = {
  title: PAGES.about.title,
  description: PAGES.about.description,
  alternates: { canonical: ROUTES.about },
};

export default function AboutPage() {
  const { who, clients, facts, manager, team } = ABOUT_SECTIONS;

  return (
    <main>
      <PageHead page={PAGES.about} />

      {/* Кто мы и с кем работаем — два столбца связного текста, без
          плиток: плитка разрезала бы его на карточки без надобности. */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <Text variant="display-sm" as="h2">
              {who.title}
            </Text>
            <Text variant="lead" className="mt-4">
              {who.lead}
            </Text>
            <Text variant="small" className="mt-4">
              {who.note}
            </Text>
          </div>
          <div>
            <Text variant="display-sm" as="h2">
              {clients.title}
            </Text>
            <Text variant="lead" className="mt-4">
              {clients.lead}
            </Text>
            <CheckList rows={clients.rows} className="mt-5" />
          </div>
        </div>
      </Section>

      {/* Цифры — плитками, как на главной; они там же и взяты */}
      <Section>
        <Head title={facts.title} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-9">
          {ABOUT_FACTS.map((f) => (
            <Bento key={f.title}>
              <p className="t-h4 text-brand m-0">{f.title}</p>
              <p className="t-display-sm mt-4 m-0">{f.big}</p>
              <p className="t-small mt-2 m-0">{f.note}</p>
            </Bento>
          ))}
        </div>
      </Section>

      {/* Персональный менеджер, ниже — роли списком */}
      <Section>
        <PhotoBlock
          pic="team"
          alt="Менеджер на связи с клиентом"
          title={manager.title}
          note={manager.note}
          rows={manager.rows}
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] items-start mt-14">
          <Head className="lg:sticky lg:top-32" title={team.title} lead={team.lead} />
          <div>
            {TEAM.map((r) => (
              <div key={r.title} className="flex items-start gap-4 py-6 border-b border-line">
                <Icon name={r.icon} size="lg" className="text-brand shrink-0 mt-0.5" />
                <div>
                  <Text variant="h4" as="h3">
                    {r.title}
                  </Text>
                  <Text variant="small" className="mt-1.5">
                    {r.note}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Cta text={CTA.about} />
    </main>
  );
}
