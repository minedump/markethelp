import type { ElementType, ReactNode } from 'react';
import { Icon } from '@/components/Icon';
import { Text } from '@/components/ui';
import { asset } from '@/content/site';

/**
 * Список с галочками: пункты, которые просто перечисляют, а не
 * сравнивают. Галочка здесь вместо маркера — она же стоит в правой
 * плитке сравнения на главной, и значение у неё одно: это есть.
 */
export function CheckList({ rows, className }: { rows: readonly string[]; className?: string }) {
  return (
    <ul
      className={[
        'list-none m-0 p-0 flex flex-col gap-3 text-[0.9375rem] text-ink-soft',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {rows.map((r) => (
        <li key={r} className="flex items-start gap-2.5">
          <Icon name="check" size="sm" className="text-brand mt-0.5 shrink-0" />
          <span>{r}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Фото с текстом: фото занимает большую колонку во всю её ширину,
 * текст стоит рядом. Плитки под этим блоком нет — фото со скруглением
 * держит его само, а плитка добавила бы рамку в рамке.
 *
 * Той же раскладкой идут ниши на главной, склад в Гуанчжоу и блок
 * про онлайн-трансляцию: один приём на три страницы.
 */
export function PhotoBlock({
  pic,
  alt,
  title,
  note,
  rows,
  as = 'h2',
  children,
}: {
  /** имя файла в public/assets без расширения */
  pic: string;
  alt: string;
  title: ReactNode;
  note?: ReactNode;
  rows?: readonly string[];
  as?: ElementType;
  children?: ReactNode;
}) {
  return (
    <div className="grid gap-8 lg:gap-10 md:grid-cols-[1.35fr_1fr] items-center">
      <img
        src={asset(pic)}
        alt={alt}
        className="aspect-[4/3] w-full object-cover rounded-card"
        loading="lazy"
      />
      <div>
        <Text variant="h3" as={as} className="m-0">
          {title}
        </Text>
        {note ? (
          <Text variant="small" className="mt-3">
            {note}
          </Text>
        ) : null}
        {rows ? <CheckList rows={rows} className="mt-5" /> : null}
        {children}
      </div>
    </div>
  );
}
