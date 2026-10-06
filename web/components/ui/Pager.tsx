'use client';

import { Icon } from '@/components/Icon';
import { Button } from './Button';

/**
 * Постраничная навигация (.pager). Своих кнопок у неё нет: текущая
 * страница — основная кнопка, остальные тихие, стрелки — кнопки-иконки.
 * Размер, радиус, свет по заливке и кольцо фокуса приходят с кнопкой.
 */
type PagerProps = {
  page: number;
  pages: number;
  onPage: (n: number) => void;
  label?: string;
};

export function Pager({ page, pages, onPage, label = 'Страницы' }: PagerProps) {
  const numbers = Array.from({ length: pages }, (_, i) => i + 1);
  return (
    <nav className="pager" aria-label={label}>
      <Button
        size="sm"
        variant="quiet"
        icon
        aria-label="Назад"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
      >
        <Icon name="arrow-left" />
      </Button>
      {numbers.map((n) => (
        <Button
          key={n}
          size="sm"
          variant={n === page ? 'primary' : 'quiet'}
          icon
          aria-current={n === page ? 'page' : undefined}
          onClick={() => onPage(n)}
        >
          {n}
        </Button>
      ))}
      <Button
        size="sm"
        variant="quiet"
        icon
        aria-label="Вперёд"
        disabled={page >= pages}
        onClick={() => onPage(page + 1)}
      >
        <Icon name="arrow-right" />
      </Button>
    </nav>
  );
}
