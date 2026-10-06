import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { LinkButton, Text } from '@/components/ui';
import { Head, Section } from '@/components/site/Layout';
import { NumberList } from '@/components/site/NumberList';
import { PAGES } from '@/content/pages';
import { THANKS_NEXT } from '@/content/thanks';
import { ROUTES, asset } from '@/content/site';

/**
 * Страница-цель: открывается после отправки формы, и её посещение
 * аналитика считает заявкой. Сама страница короткая — подтверждение,
 * что будет дальше, и одна кнопка: на главную. Других действий здесь
 * нет, человек уже сделал то, зачем приходил.
 *
 * Из поиска её открывать незачем — она ничего не рассказывает о услуге.
 */
export const metadata: Metadata = {
  title: PAGES.thanks.title,
  description: PAGES.thanks.description,
  robots: { index: false, follow: true },
};

export default function ThanksPage() {
  return (
    <main>
      <Section className="pt-14">
        <div className="grid gap-8 lg:gap-10 md:grid-cols-[1fr_1.35fr] items-center">
          <div>
            <Text variant="display-sm" as="h1">
              {PAGES.thanks.h1}
            </Text>
            <Text variant="lead" className="mt-4">
              {PAGES.thanks.lead}
            </Text>
            <div className="mt-7">
              <LinkButton href={ROUTES.home}>
                <Icon name="arrow-left" />
                На главную
              </LinkButton>
            </div>
          </div>
          <img
            src={asset('thanks')}
            alt="Коробка на упаковочном столе и поднятый большой палец"
            className="aspect-[4/3] w-full object-cover rounded-card"
          />
        </div>
      </Section>

      {/* Три шага крупными номерами — тот же приём, что «Если брак
          или недостача» в условиях работы. */}
      <Section>
        <Head title="Что будет дальше" />
        <NumberList items={THANKS_NEXT} className="grid gap-x-12 gap-y-10 md:grid-cols-3 mt-10" />
      </Section>
    </main>
  );
}
