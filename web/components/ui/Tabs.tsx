'use client';

import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { Select } from './Select';

/**
 * Вкладки (.tabs) — переключатель прайса, рубрик, направлений.
 *
 * Четыре и больше вкладок на телефоне полоска не показывает вовсе:
 * вместо неё встаёт список с теми же вариантами. Прокрутка вбок прятала
 * половину рубрик — человек не видел, из чего выбирает. Подпись к списку
 * обязательна (label), иначе поле стояло бы безымянным. От двух вкладок
 * список не нужен — они помещаются в строку на любом экране.
 */
export type Tab = { value: string; title: string; panel: ReactNode };

type Props = {
  items: Tab[];
  /** подпись к списку на узком экране: «Выберите нишу», «Выберите рубрику» */
  label: string;
  defaultValue?: string;
  className?: string;
};

export function Tabs({ items, label, defaultValue, className }: Props) {
  const [value, setValue] = useState(defaultValue ?? items[0]?.value);
  const base = useId();
  /* список нужен от трёх вкладок: две встают в строку и так */
  const narrow = items.length >= 3;

  return (
    <div className={className}>
      {narrow ? (
        <Select
          className="tabs-sel"
          label={label}
          options={items.map((t) => ({ value: t.value, title: t.title }))}
          value={value}
          onChange={setValue}
        />
      ) : null}

      <div className="tabs" role="tablist" data-mobile={narrow ? '1' : undefined}>
        {items.map((t) => (
          <button
            key={t.value}
            className="tab"
            role="tab"
            type="button"
            id={`${base}-${t.value}-tab`}
            aria-selected={t.value === value}
            aria-controls={`${base}-${t.value}`}
            onClick={() => setValue(t.value)}
          >
            {t.title}
          </button>
        ))}
      </div>

      {items.map((t) => (
        <div
          key={t.value}
          id={`${base}-${t.value}`}
          role="tabpanel"
          aria-labelledby={`${base}-${t.value}-tab`}
          hidden={t.value !== value}
          className="pt-5"
        >
          {t.panel}
        </div>
      ))}
    </div>
  );
}
