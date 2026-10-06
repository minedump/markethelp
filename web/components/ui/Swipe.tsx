import type { HTMLAttributes, ReactNode } from 'react';

/**
 * Полоса с вылетом (.swipe). На узком экране соседние предметы едут
 * вбок, а не встают друг под друга: второй выглядывает за правым краем
 * экрана, и по нему видно, что есть продолжение. Полоса выходит за поля
 * колонки намеренно — обрезанная по полям, она читалась бы как ошибка
 * вёрстки. Прокрутка с привязкой: предмет останавливается у левого края.
 *
 * От 640px полоса превращается в обычную сетку. Число колонок задаётся
 * утилитами прямо по месту — например cols="sm:grid-cols-2 lg:grid-cols-4".
 */
type SwipeProps = HTMLAttributes<HTMLDivElement> & {
  /** утилиты сетки для широкого экрана */
  cols?: string;
  children?: ReactNode;
};

export function Swipe({ cols, className, ...rest }: SwipeProps) {
  return <div className={['swipe', cols, className].filter(Boolean).join(' ')} {...rest} />;
}
