import type { HTMLAttributes, ReactNode } from 'react';

/**
 * Оформленная полоса прокрутки (.scroller). Системная на Windows
 * широкая, серая и с квадратными кнопками — здесь ползунок скруглён,
 * отступ от края даёт рамка его же цвета, дорожка прозрачная.
 *
 * Ставится только там, где прокрутка правда есть: списки, таблицы,
 * выпадающие списки, тело окна. grey — на серой подложке.
 * Направление и высоту задаёт место: overflow-y-auto h-56 и так далее.
 */
type ScrollerProps = HTMLAttributes<HTMLDivElement> & { grey?: boolean; children?: ReactNode };

export function Scroller({ grey = false, className, ...rest }: ScrollerProps) {
  return (
    <div
      className={['scroller', grey ? 'scroller-grey' : '', className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
}
