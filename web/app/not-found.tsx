import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { LinkButton, Text } from '@/components/ui';
import { Header } from '@/components/site/Header';
import { Wrap } from '@/components/site/Layout';
import { RequestProvider } from '@/components/site/RequestModal';
import { SiteCookie } from '@/components/site/SiteCookie';
import { SiteFooter } from '@/components/site/SiteFooter';
import { PAGES } from '@/content/pages';
import { ROUTES, asset } from '@/content/site';

/**
 * Страница, которой нет.
 *
 * Лежит в корне, а не в группе сайта: сюда попадают по любому
 * несуществующему адресу, и шапку с подвалом она ставит сама.
 *
 * Содержимое по середине экрана: разделов ниже у неё нет, и без этого
 * текст прижимался бы к шапке, а под ним оставалась пустота. Действие
 * одно — на главную: предлагать здесь расчёт значит пользоваться чужой
 * ошибкой.
 */
export const metadata: Metadata = {
  title: PAGES.notFound.title,
  description: PAGES.notFound.description,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <RequestProvider>
      <Header />
      <main className="min-h-screen flex items-center">
        <Wrap as="section" className="w-full py-14">
          <div className="grid gap-8 lg:gap-10 md:grid-cols-[1fr_1.35fr] items-center">
            <div>
              <p className="t-display text-brand m-0 tabular-nums">404</p>
              <Text variant="display-sm" as="h1" className="mt-6">
                {PAGES.notFound.h1}
              </Text>
              <Text variant="lead" className="mt-4">
                {PAGES.notFound.lead}
              </Text>
              <div className="mt-7">
                <LinkButton href={ROUTES.home}>
                  <Icon name="arrow-left" />
                  На главную
                </LinkButton>
              </div>
            </div>
            <img
              src={asset('not-found')}
              alt="Одинокая коробка посреди пустого склада"
              className="aspect-[4/3] w-full object-cover rounded-card"
            />
          </div>
        </Wrap>
      </main>
      <SiteFooter />
      <SiteCookie />
    </RequestProvider>
  );
}
