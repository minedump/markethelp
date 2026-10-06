'use client';

import { useState } from 'react';
import { Pager } from '@/components/ui';
import { PostCard } from './PostCard';
import { PAGE_SIZE, type Post } from '@/content/blog';

/**
 * Сетка статей рубрики с постраничной навигацией.
 *
 * Карточки стоят по две в ряд на любом экране, а не полосой: это
 * список, по которому листают глазами. На телефоне пара помещается,
 * если подпись короткая, — длинные заголовки переносятся в три-четыре
 * строки, и это нормально.
 *
 * Страницы считаются от настоящего числа статей: пока рубрика
 * помещается на один экран, навигации под ней нет — кнопки, которые
 * никуда не ведут, обманывают.
 */
export function PostGrid({ posts }: { posts: Post[] }) {
  const [page, setPage] = useState(1);
  const pages = Math.ceil(posts.length / PAGE_SIZE);
  const shown = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 mt-9">
        {shown.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
      {pages > 1 ? (
        <div className="mt-12">
          <Pager page={page} pages={pages} onPage={setPage} />
        </div>
      ) : null}
    </>
  );
}
