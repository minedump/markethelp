import type { HTMLAttributes, ReactNode, ElementType } from 'react';

/**
 * Карточка (.card) — предмет, который сравнивают с соседним: тариф,
 * статья, площадка. Отделяется рамкой и высотой. Там, где предметы
 * просто перечисляют, вместо карточки стоит плитка — Bento.
 *
 * Внутренние поля карточка не задаёт: у тарифа и у статьи они разные,
 * и ставятся они на месте утилитами.
 */
type CardProps = HTMLAttributes<HTMLElement> & { as?: ElementType; children?: ReactNode };

export function Card({ as: Tag = 'div', className, ...rest }: CardProps) {
  return <Tag className={['card', className].filter(Boolean).join(' ')} {...rest} />;
}

/** Заголовок карточки (.card-title) — одна ступень на все карточки. */
export function CardTitle({ as: Tag = 'h3', className, ...rest }: CardProps) {
  return <Tag className={['card-title', className].filter(Boolean).join(' ')} {...rest} />;
}
