import { Fragment } from 'react';
import NextLink from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from '@/components/Icon';

/**
 * Хлебные крошки (.crumbs). Последний пункт — не ссылка: это страница,
 * на которой человек стоит, и помечена она aria-current.
 */
export type Crumb = { title: ReactNode; href?: string };

export function Crumbs({ items, label = 'Хлебные крошки' }: { items: Crumb[]; label?: string }) {
  return (
    <nav className="crumbs" aria-label={label}>
      {items.map((c, i) => (
        <Fragment key={i}>
          {i > 0 ? <Icon name="chevron-right" /> : null}
          {c.href ? (
            <NextLink href={c.href}>{c.title}</NextLink>
          ) : (
            <span aria-current="page">{c.title}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
