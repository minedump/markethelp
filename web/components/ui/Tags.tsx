'use client';

import { useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { Icon } from '@/components/Icon';

/**
 * Поле с чипами и подсказками. Ответов здесь может быть несколько:
 * выбранное превращается в чип и остаётся на виду, поэтому не нужно
 * помнить, что уже отметил. Подсказки появляются с первой буквы,
 * совпавшая часть подсвечена — видно, почему подсказка попала в список.
 *
 * С клавиатуры работает целиком: стрелки водят по списку, Enter
 * добавляет, Backspace в пустом поле снимает последний чип, Esc
 * закрывает подсказки. Уже добавленное из списка исчезает — дважды одну
 * услугу не выберешь.
 *
 * Подпись здесь поднимает не только текст, но и любой поставленный чип,
 * поэтому float-up ставится вручную, а не приходит от плейсхолдера.
 */
type Props = {
  label: ReactNode;
  /** из чего выбирают: услуги, площадки, рубрики */
  options: string[];
  placeholder?: string;
  defaultValue?: string[];
  onChange?: (chosen: string[]) => void;
  name?: string;
  className?: string;
  /** сколько подсказок показывать разом */
  limit?: number;
};

export function Tags({
  label,
  options,
  placeholder = 'Начните вводить услугу',
  defaultValue = [],
  onChange,
  name,
  className,
  limit = 8,
}: Props) {
  const [chosen, setChosen] = useState<string[]>(defaultValue);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const q = query.trim().toLowerCase();
  const hits = options
    .filter((n) => !chosen.includes(n) && (q === '' || n.toLowerCase().includes(q)))
    .slice(0, limit);

  function set(next: string[]) {
    setChosen(next);
    onChange?.(next);
  }

  function add(title: string) {
    set([...chosen, title]);
    setQuery('');
    setOpen(false);
    setActive(0);
    input.current?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (e.key === 'Backspace' && query === '' && chosen.length) {
      set(chosen.slice(0, -1));
      return;
    }
    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && hits.length) {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const step = e.key === 'ArrowDown' ? 1 : -1;
      setActive((i) => (i + step + hits.length) % hits.length);
    }
    if (e.key === 'Enter' && open && hits[active]) {
      e.preventDefault();
      add(hits[active]);
    }
  }

  /* подсветка совпавшей части: видно, почему подсказка попала в список */
  function mark(n: string) {
    const at = q ? n.toLowerCase().indexOf(q) : -1;
    if (at < 0) return n;
    return (
      <>
        {n.slice(0, at)}
        <b>{n.slice(at, at + q.length)}</b>
        {n.slice(at + q.length)}
      </>
    );
  }

  const busy = chosen.length > 0 || query.length > 0;

  return (
    <div className={['float', busy ? 'float-up' : '', className].filter(Boolean).join(' ')}>
      <div className="tags-box" onClick={() => input.current?.focus()}>
        {chosen.map((n) => (
          <span key={n} className="chip chip-brand">
            {n}
            <button
              className="tag-x"
              type="button"
              aria-label="Убрать"
              onMouseDown={(e) => {
                e.preventDefault();
                set(chosen.filter((x) => x !== n));
              }}
            >
              <Icon name="x" size="sm" />
            </button>
          </span>
        ))}
        <input
          ref={input}
          className="tags-input"
          type="text"
          placeholder={placeholder}
          autoComplete="off"
          value={query}
          onFocus={() => setOpen(true)}
          onBlur={() => window.setTimeout(() => setOpen(false), 120)}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onKeyDown={onKeyDown}
        />
      </div>
      <span className="float-label">{label}</span>
      <ul className="hints" role="listbox" hidden={!open}>
        {hits.length ? (
          hits.map((n, i) => (
            <li
              key={n}
              className="hint"
              role="option"
              aria-selected={false}
              data-active={i === active ? '1' : undefined}
              onMouseDown={(e) => {
                e.preventDefault();
                add(n);
              }}
              onMouseMove={() => setActive(i)}
            >
              {mark(n)}
            </li>
          ))
        ) : (
          <li className="hints-empty">
            {q ? 'Ничего не нашлось — опишите задачу в поле ниже' : 'Всё уже выбрано'}
          </li>
        )}
      </ul>
      {/* выбранное уходит на сервер обычными полями */}
      {name ? chosen.map((n) => <input key={n} type="hidden" name={name} value={n} />) : null}
    </div>
  );
}
