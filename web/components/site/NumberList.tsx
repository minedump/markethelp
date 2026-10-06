import { Text } from '@/components/ui';
import type { IconName } from '@/components/Icon';
import { Icon } from '@/components/Icon';

/**
 * Пункты с крупными номерами: линия сверху, номер, заголовок, текст.
 *
 * Номер здесь и есть картинка — он говорит «это несколько шагов
 * подряд», и значок при нём был бы вторым украшением на ту же мысль.
 * Приём один на три страницы: что делаем в Китае, порядок при браке
 * и что будет после заявки.
 */
export function NumberList({
  items,
  className = 'grid gap-x-12 gap-y-10 md:grid-cols-2 mt-10',
}: {
  items: readonly { title: string; note: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      {items.map((it, i) => (
        <div key={it.title} className="flex gap-6 pt-6 border-t border-line">
          <span className="t-display-sm text-brand tabular-nums shrink-0 w-16">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <Text variant="h4" as="h3">
              {it.title}
            </Text>
            <Text variant="small" className="mt-2">
              {it.note}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Список «значок — заголовок — пояснение». Значок один на весь список
 * и говорит о его природе: галочка у вопросов, которые задаст менеджер,
 * лист — у документов.
 */
export function MarkList({
  items,
  icon = 'check',
  className = 'mt-9 grid gap-x-10 gap-y-5 md:grid-cols-2',
}: {
  items: readonly { title: string; note: string }[];
  icon?: IconName;
  className?: string;
}) {
  return (
    <ul className={`list-none m-0 p-0 ${className}`}>
      {items.map((it) => (
        <li key={it.title} className="flex items-start gap-3">
          <Icon name={icon} className="text-brand shrink-0 mt-0.5" />
          <span>
            <b className="block font-semibold">{it.title}</b>
            <span className="block t-small mt-0.5">{it.note}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
