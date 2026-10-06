import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { Accordion, LinkGo, Steps, Table } from '@/components/ui';
import { Cta, Head, Section } from '@/components/site/Layout';
import { MarkList } from '@/components/site/NumberList';
import { PageHead } from '@/components/site/PageHead';
import { RequestButton } from '@/components/site/RequestButton';
import { FaqSchema } from '@/components/site/Schema';
import { ASK, DOCS, FAQ, START_SECTIONS, STEP_ICONS, TIMELINE } from '@/content/start';
import { STEPS } from '@/content/home';
import { CTA, PAGES } from '@/content/pages';
import { ROUTES } from '@/content/site';

export const metadata: Metadata = {
  title: PAGES.start.title,
  description: PAGES.start.description,
  alternates: { canonical: ROUTES.start },
};

export default function StartPage() {
  const { ask, docs, timeline, faq } = START_SECTIONS;

  return (
    <main>
      <FaqSchema />
      <PageHead page={PAGES.start} />

      {/* Шаги — схема с чередованием сторон: здесь она главная, а не
          подпорка к тексту, как на главной. Значки стоят вместо будущих
          фотографий склада и кабинета. */}
      <Section>
        <Steps
          split
          className="max-w-[52rem] mx-auto"
          items={STEPS.map((s, i) => ({
            title: s.title,
            text: s.note,
            pic: <Icon name={STEP_ICONS[i]} size="xl" className="text-brand" />,
          }))}
        />
        {/* действия — после схемы, когда шаги прочитаны; по центру, как она сама */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <RequestButton>Оставить заявку</RequestButton>
          <LinkGo href={ROUTES.tariffs} arrow>
            Смотреть тарифы
          </LinkGo>
        </div>
      </Section>

      <Section>
        <Head title={ask.title} lead={ask.lead} />
        <MarkList items={ASK} />
      </Section>

      <Section>
        <Head title={docs.title} lead={docs.lead} />
        <MarkList items={DOCS} icon="file" />
      </Section>

      <Section>
        <Head title={timeline.title} lead={timeline.lead} />
        <div className="mt-9">
          <Table
            narrow
            columns={[{ head: 'Этап' }, { head: 'Срок' }, { head: 'Что происходит' }]}
            rows={TIMELINE.map((t) => [
              <span key="s" className="font-medium">{t.title}</span>,
              <span key="w" className="tabular-nums whitespace-nowrap">{t.time}</span>,
              <span key="n" className="text-ink-soft">{t.note}</span>,
            ])}
          />
        </div>
      </Section>

      {/* Вопросы и ответы — аккордеон во всю колонку */}
      <Section>
        <Head title={faq.title} lead={faq.lead} />
        <div className="mt-9">
          <Accordion items={FAQ.map((q) => ({ question: q.question, answer: q.answer }))} />
        </div>
      </Section>

      <Cta text={CTA.start} />
    </main>
  );
}
