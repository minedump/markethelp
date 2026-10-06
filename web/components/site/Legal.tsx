import { Rich } from '@/components/Rich';
import { LinkGo, Text } from '@/components/ui';
import { Section } from './Layout';
import { PageHead } from './PageHead';
import type { LegalSection } from '@/content/legal';
import type { PageMeta } from '@/content/pages';
import { ROUTES } from '@/content/site';

/**
 * Правовая страница: политика, согласие, оферта.
 *
 * Раскладка одна на три: слева закреплённое содержание, справа текст
 * в колонку 44rem. Разделы и абзацы пронумерованы сквозняком — на
 * «пункт 4.2» ссылаются в переписке и в суде, поэтому номер должен
 * быть виден и не зависеть от того, как страница свёрстана.
 *
 * Все три лежат под документами, и путь это показывает.
 */
export function LegalPage({
  page,
  edition,
  sections,
  slug,
}: {
  page: PageMeta;
  /** «Редакция от 15 сентября 2026» */
  edition: string;
  sections: LegalSection[];
  /** основа якорей: policy-1, offer-3 — по ним ссылаются снаружи */
  slug: string;
}) {
  return (
    <main>
      <PageHead
        page={page}
        parents={[{ title: 'Документы', href: ROUTES.documents }]}
        below={edition}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] items-start">
          <nav className="lg:sticky lg:top-32 flex flex-col gap-3" aria-label="Содержание">
            <Text variant="h4" as="p" className="m-0">
              Содержание
            </Text>
            {sections.map((s, i) => (
              <LinkGo key={s.title} href={`#${slug}-${i + 1}`} ink>
                {i + 1}. {s.title}
              </LinkGo>
            ))}
          </nav>

          <div className="max-w-[44rem]">
            {sections.map((s, i) => (
              <section key={s.title} id={`${slug}-${i + 1}`} className="pt-8 first:pt-0">
                <Text variant="h3" as="h2">
                  {i + 1}. {s.title}
                </Text>
                {s.paras.map((t, j) => (
                  <p key={j} className="text-[0.9375rem] leading-relaxed text-ink-soft mt-3">
                    {`${i + 1}.${j + 1}. `}
                    <Rich>{t}</Rich>
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
