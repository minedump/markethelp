import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Crumbs, Swipe, Table, Text } from '@/components/ui';
import { Head, Section } from '@/components/site/Layout';
import { PostCard } from '@/components/site/PostCard';
import { ArticleSchema, BreadcrumbSchema } from '@/components/site/Schema';
import { ARTICLES, BLOG_RUBRICS, BLOG_SECTIONS, POSTS } from '@/content/blog';
import { ROUTES, asset } from '@/content/site';

/**
 * Статья блога.
 *
 * Страницы собираются только для написанных статей: пустая страница
 * в поиске хуже, чем её отсутствие. Остальные записи видны в списке
 * карточками без ссылки.
 *
 * Текст идёт во всю колонку, без оглавления сбоку: статья короткая,
 * и содержание в ней было бы длиннее самих разделов.
 */
export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

function find(slug: string) {
  const post = POSTS.find((p) => p.slug === slug);
  const article = ARTICLES[slug];
  return post && article ? { post, article } : null;
}

/* В Next 15 адрес приходит обещанием — отсюда await и async у страницы */
type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const found = find(slug);
  if (!found) return {};
  return {
    title: found.post.title,
    description: found.post.note,
    alternates: { canonical: `${ROUTES.blog}${slug}/` },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const found = find(slug);
  if (!found) notFound();
  const { post, article } = found;
  const rubric = BLOG_RUBRICS.find((r) => r.id === post.rubric);

  /* «Читайте также» — три соседние записи, кроме этой */
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const crumbs = [
    { title: 'Главная', href: ROUTES.home },
    { title: 'Блог', href: ROUTES.blog },
    { title: post.title, href: `${ROUTES.blog}${post.slug}/` },
  ];

  return (
    <main>
      <ArticleSchema post={post} cover={article.cover} />
      <BreadcrumbSchema items={crumbs} />

      <Section className="pt-14">
        {/* в видимом пути последним стоит рубрика, а не заголовок:
            заголовок статьи и так крупно под ним */}
        <Crumbs
          label="Путь"
          items={[...crumbs.slice(0, -1), { title: rubric?.title ?? 'Статья' }]}
        />
        {/* Рубрика и дата — одной строкой через разделитель: рубрика
            ссылкой на блог, остальное простым текстом. */}
        <p className="t-small mt-6 m-0 flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <Link className="link" href={ROUTES.blog}>
            {rubric?.title}
          </Link>
          <span aria-hidden="true">·</span>
          <span>{post.date}</span>
        </p>
        <Text variant="display-sm" as="h1" className="mt-4 max-w-[52rem]">
          {post.title}
        </Text>
        <Text variant="lead" className="mt-4 max-w-[44rem]">
          {post.note}
        </Text>
      </Section>

      <Section>
        <img
          src={asset(article.cover)}
          alt={article.coverAlt}
          className="aspect-[2/1] w-full object-cover rounded-card"
        />
      </Section>

      <Section>
        <article>
          {article.sections.map((s, i) => {
            const no = i + 1;
            return (
              <section key={s.title} id={`post-${no}`} className="pt-8 first:pt-0">
                <Text variant="h3" as="h2">
                  {s.title}
                </Text>
                {s.paras.map((t, j) => (
                  <p key={j} className="text-[0.9375rem] leading-relaxed text-ink-soft mt-3">
                    {t}
                  </p>
                ))}

                {article.illustration?.after === no ? (
                  <figure className="m-0 mt-6">
                    <img
                      src={asset(article.illustration.pic)}
                      alt={article.illustration.alt}
                      className="aspect-[3/2] w-full object-cover rounded-card"
                      loading="lazy"
                    />
                    <figcaption className="t-small mt-2">{article.illustration.caption}</figcaption>
                  </figure>
                ) : null}

                {article.results?.after === no ? (
                  <div className="mt-6">
                    <Table
                      narrow
                      columns={article.results.head.map((h) => ({ head: h }))}
                      rows={article.results.rows.map((r) => [
                        <span key="w" className="font-medium">{r.what}</span>,
                        <span key="b" className="text-ink-soft">{r.before}</span>,
                        <span key="a" className="font-semibold">{r.after}</span>,
                      ])}
                    />
                  </div>
                ) : null}
              </section>
            );
          })}
        </article>
      </Section>

      <Section>
        <Head title={BLOG_SECTIONS.related.title} />
        <Swipe cols="sm:grid-cols-2 lg:grid-cols-3" className="gap-x-6 gap-y-10 mt-9">
          {related.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </Swipe>
      </Section>
    </main>
  );
}
