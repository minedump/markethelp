import Link from 'next/link';
import { Chip, LinkGo, Text } from '@/components/ui';
import { BLOG_RUBRICS, isWritten, type Post } from '@/content/blog';
import { ROUTES, asset } from '@/content/site';

/**
 * Карточка статьи — одна и для блога, и для главной.
 *
 * Метка рубрики стоит на картинке и приглушена: в списке из восьми
 * карточек восемь ярких меток перебивают заголовки, ради которых
 * список и читают.
 *
 * Пока статья не написана, карточка не ссылка: в блоге видно, что
 * готовится, но нажатие не ведёт на пустую страницу.
 */
export function PostCard({ post }: { post: Post }) {
  const href = `${ROUTES.blog}${post.slug}/`;
  const rubric = BLOG_RUBRICS.find((r) => r.id === post.rubric);
  const written = isWritten(post.slug);

  const cover = (
    <>
      <img
        src={asset(post.pic)}
        alt=""
        className="aspect-[3/2] w-full object-cover rounded-card"
        loading="lazy"
      />
      {rubric ? <Chip className="absolute top-3 left-3">{rubric.title}</Chip> : null}
    </>
  );

  return (
    <article>
      {written ? (
        <Link href={href} className="relative block">
          {cover}
        </Link>
      ) : (
        <div className="relative block">{cover}</div>
      )}
      <Text variant="small" className="mt-4 m-0">
        {post.date}
      </Text>
      <Text variant="h4" as="h3" className="mt-3">
        {written ? <LinkGo href={href}>{post.title}</LinkGo> : post.title}
      </Text>
      <Text variant="small" className="mt-1.5">
        {post.note}
      </Text>
    </article>
  );
}
