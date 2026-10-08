import type { Metadata } from 'next';
import { Tabs } from '@/components/ui';
import { Section } from '@/components/site/Layout';
import { PageHead } from '@/components/site/PageHead';
import { PostGrid } from '@/components/site/PostGrid';
import { BLOG_SECTIONS, POSTS, filledRubrics } from '@/content/blog';
import { PAGES } from '@/content/pages';
import { ROUTES } from '@/content/site';

export const metadata: Metadata = {
  title: PAGES.blog.title,
  description: PAGES.blog.description,
  alternates: { canonical: ROUTES.blog },
};

export default function BlogPage() {
  return (
    <main>
      <PageHead page={PAGES.blog} />

      {/* Все статьи сразу, вкладками по рубрикам. Выделенной статьи нет:
          свежая просто первая в сетке. У каждой рубрики своя страница
          списка — переключение рубрики не сбрасывает чужую. Рубрики без
          записей не показываем: вкладка, за которой ничего нет, выглядит
          поломкой. */}
      <Section>
        <Tabs
          label={BLOG_SECTIONS.rubricLabel}
          items={filledRubrics().map((r) => ({
            value: r.id,
            title: r.title,
            panel: <PostGrid posts={r.id === 'all' ? POSTS : POSTS.filter((p) => p.rubric === r.id)} />,
          }))}
        />
      </Section>
    </main>
  );
}
