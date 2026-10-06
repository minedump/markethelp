import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { Bento, Glow, LinkButton, LinkGo, Steps, Swipe, Tabs, Text } from '@/components/ui';
import { Cta, Head, Section, TILE } from '@/components/site/Layout';
import { Marquee } from '@/components/site/Marquee';
import { PostCard } from '@/components/site/PostCard';
import { RequestButton } from '@/components/site/RequestButton';
import { OrganizationSchema } from '@/components/site/Schema';
import { COMPARE, FACTS, NICHES, SERVICES, STEPS } from '@/content/home';
import { POSTS } from '@/content/blog';
import { CTA, PAGES } from '@/content/pages';
import { ROUTES, asset } from '@/content/site';

export const metadata: Metadata = {
  title: PAGES.home.title,
  description: PAGES.home.description,
  alternates: { canonical: ROUTES.home },
};

export default function HomePage() {
  return (
    <main>
      <OrganizationSchema />

      {/* Первый экран. Чёрный блок с подсветкой на сайте один, и это он:
          приём держится на том, что второго такого нет. Поля как у плитки,
          отступы сверху и снизу одинаковые — содержимое ровно посередине. */}
      <Glow as="section" className={TILE}>
        <div className="relative max-w-[75rem] mx-auto px-7 sm:px-9 lg:px-12 py-20 sm:py-24">
          {/* по центру: текста немного и он один, делить строку не с чем */}
          <div className="max-w-[52rem] mx-auto text-center">
            <Text variant="display" as="h1" className="text-balance">
              {PAGES.home.h1}
            </Text>
            <Text variant="lead" className="mt-5 max-w-[44rem] mx-auto text-balance">
              {PAGES.home.lead}
            </Text>
            <RequestButton variant="jade" size="lg" className="mt-9">
              {CTA.home.button}
            </RequestButton>
          </div>
        </div>
      </Glow>

      <Marquee />

      {/* Главные доводы — на белом, а не на фирменном синем: синий занят
          первым экраном и подвалом, и если красить им ещё и этот блок,
          он перестанет что-либо выделять.
          По две плитки в ряд на любой ширине: вчетвером в строку они
          становятся узкими, и подпись ломается на четыре строки. */}
      <Section step="home" className="pt-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {FACTS.map((f) => (
            <Bento key={f.title}>
              <p className="t-h4 text-brand m-0">{f.title}</p>
              <p className="t-display-sm mt-4 m-0">{f.big}</p>
              <p className="t-small mt-2 m-0">{f.note}</p>
            </Bento>
          ))}
        </div>
      </Section>

      {/* Услуги — список-меню со ссылками на разделы. Карточек нет:
          сравнивать тут нечего, это оглавление. */}
      <Section step="home" id="services">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] items-start">
          <div className="lg:sticky lg:top-32">
            <Head
              title="Услуги"
              lead="Весь путь товара от поставщика до полки маркетплейса — по одному договору и в одном личном кабинете."
            />
            <LinkButton variant="secondary" href={ROUTES.services} className="mt-7">
              Весь список услуг
            </LinkButton>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-10">
            {SERVICES.map((s) => (
              <Link
                key={s.title}
                href={ROUTES.services}
                className="group flex items-start gap-4 py-6 border-b border-line"
              >
                <Icon name={s.icon} size="lg" className="text-brand shrink-0 mt-0.5" />
                <span className="flex-1">
                  <span className="block t-h4">{s.title}</span>
                  <span className="block t-small mt-1.5">{s.note}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Ниши: переключатель, под ним состав работ. На телефоне вкладки
          подменяются списком — четыре ниши в строку не помещаются. */}
      <Section step="home" id="niches">
        <Head
          title="Решения по нишам"
          lead="Разный товар требует разной обработки. Выберите свою нишу — покажем, что в неё обычно входит."
        />
        <Tabs
          className="mt-9"
          label="Выберите нишу"
          items={NICHES.map((n) => ({
            value: n.slug,
            title: n.title,
            panel: (
              /* фото — главное в плитке: занимает большую колонку во всю
                 её ширину, список стоит рядом и подписан названием ниши */
              <div className="grid gap-8 lg:gap-10 md:grid-cols-[1.35fr_1fr] items-center pt-1">
                <img
                  src={asset(`niche-${n.slug}`)}
                  alt={n.title}
                  className="aspect-[4/3] w-full object-cover rounded-card"
                  loading="lazy"
                />
                <div>
                  <Text variant="h3" as="h3" className="m-0">
                    {n.title}
                  </Text>
                  <ul className="list-none m-0 p-0 mt-5 flex flex-col gap-3 text-[0.9375rem] text-ink-soft">
                    {n.rows.map((r) => (
                      <li key={r} className="flex items-start gap-2.5">
                        <Icon name="check" size="sm" className="text-brand mt-0.5 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ),
          }))}
        />
      </Section>

      {/* Как начать работать — схема шагов; заголовок слева липнет */}
      <Section step="home" id="start">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] items-start">
          <Head
            className="lg:sticky lg:top-32"
            title="Как начать работать"
            lead="Пять шагов от заявки до первой отгрузки — около двух недель. После этого товар на складе, а остатки и статусы поставок — в личном кабинете."
          />
          <Steps items={STEPS.map((s) => ({ title: s.title, text: s.note }))} />
        </div>
      </Section>

      {/* Сравнение, а не список галочек: две плитки с одними и теми же
          пунктами в одном порядке — читают построчно. Левая приглушена
          и без подсветки: это то, от чего уходят. */}
      <Section step="home">
        <Head title="Свой склад или фулфилмент" />
        <Swipe cols="sm:grid-cols-2" className="mt-9">
          <Bento wide>
            <Text variant="h3" as="h3" className="m-0 text-ink-mute">
              Пока склад свой
            </Text>
            <ul className="list-none m-0 p-0 mt-6 flex flex-col gap-5 text-ink-soft">
              {COMPARE.map((c) => (
                <li key={c.what} className="flex items-start gap-3">
                  <Icon name="x" className="shrink-0 mt-0.5 text-ink-mute" />
                  <span>
                    <b className="block font-semibold">{c.what}</b>
                    <span className="block t-small mt-0.5">{c.before}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Bento>
          <Bento>
            <Text variant="h3" as="h3" className="m-0">
              С фулфилментом
            </Text>
            <ul className="list-none m-0 p-0 mt-6 flex flex-col gap-5">
              {COMPARE.map((c) => (
                <li key={c.what} className="flex items-start gap-3">
                  <Icon name="check" className="shrink-0 mt-0.5 text-brand" />
                  <span>
                    <b className="block font-semibold">{c.what}</b>
                    <span className="block t-small mt-0.5">{c.after}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Bento>
        </Swipe>
      </Section>

      {/* Блог — три последних статьи теми же карточками, что в блоге */}
      <Section step="home" id="home-blog">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <Head
            title="Блог MarketHelp"
            lead="Разбираем работу с площадками, изменения в регламентах и кейсы клиентов — в блоге."
          />
          <LinkGo href={ROUTES.blog} arrow>
            Все статьи
          </LinkGo>
        </div>
        <Swipe cols="sm:grid-cols-2 lg:grid-cols-3" className="gap-x-6 gap-y-10 mt-9">
          {POSTS.slice(0, 3).map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </Swipe>
      </Section>

      <Cta text={CTA.home} step="home" />
    </main>
  );
}

