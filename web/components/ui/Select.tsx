'use client';

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Icon } from '@/components/Icon';

/**
 * Выпадающий список (.sel). Подпись у него поднята всегда — значение
 * есть с самого начала, и по одному выбранному непонятно, из чего был
 * выбор. Поэтому список всегда крупный, 3.25rem.
 *
 * Раскрытый список отсчитывается от окна, как подсказка: он не лежит
 * в поле, а ставится по его рамке — та же ширина, шесть пикселей ниже.
 * Поэтому его не режет ни окно заявки с прокруткой, ни плитка, ни
 * таблица — любой контейнер со скрытым переполнением. Если снизу места
 * нет, раскрывается вверх; при прокрутке и смене размера переставляется.
 */
export type Option = { value: string; title: ReactNode };

type Props = {
  label: ReactNode;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  /** первое значение, если список ничем не управляют снаружи */
  defaultValue?: string;
  name?: string;
  className?: string;
};

const GAP = 6;
const PAD = 8;

export function Select({ label, options, value, onChange, defaultValue, name, className }: Props) {
  const [own, setOwn] = useState(defaultValue ?? options[0]?.value);
  const current = value ?? own;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(current);

  const root = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const listId = useId();

  /* список лежит от окна: ширина — по кнопке, сторона — где есть место */
  const place = useCallback(() => {
    const b = btn.current;
    const l = list.current;
    if (!b || !l) return;
    const r = b.getBoundingClientRect();
    const vh = document.documentElement.clientHeight;
    l.style.left = Math.round(r.left) + 'px';
    l.style.width = Math.round(r.width) + 'px';
    l.style.top = 'auto';
    l.style.bottom = 'auto';
    const h = l.offsetHeight;
    const below = vh - r.bottom - GAP - PAD;
    const above = r.top - GAP - PAD;
    if (h <= below || below >= above) {
      l.style.top = Math.round(r.bottom + GAP) + 'px';
      l.style.maxHeight = Math.min(256, Math.max(96, below)) + 'px';
    } else {
      l.style.bottom = Math.round(vh - r.top + GAP) + 'px';
      l.style.maxHeight = Math.min(256, Math.max(96, above)) + 'px';
    }
  }, []);

  useLayoutEffect(() => {
    if (open) place();
  }, [open, place]);

  /* при прокрутке чего угодно и смене размера — переставляем */
  useEffect(() => {
    if (!open) return;
    const onScroll = () => place();
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onScroll);
    const onAway = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onAway);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('click', onAway);
    };
  }, [open, place]);

  function choose(v: string) {
    if (value === undefined) setOwn(v);
    onChange?.(v);
    setOpen(false);
    btn.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const i = options.findIndex((o) => o.value === active);
    if (e.key === 'Escape') {
      setOpen(false);
      btn.current?.focus();
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setActive(current);
        return;
      }
      const step = e.key === 'ArrowDown' ? 1 : -1;
      setActive(options[(i + step + options.length) % options.length].value);
    }
    if ((e.key === 'Enter' || e.key === ' ') && open) {
      e.preventDefault();
      choose(active);
    }
  }

  const shown = options.find((o) => o.value === current)?.title ?? options[0]?.title;

  return (
    <div
      ref={root}
      className={['sel', 'float', 'float-up', className].filter(Boolean).join(' ')}
      data-open={open ? '1' : '0'}
      onKeyDown={onKeyDown}
    >
      <button
        ref={btn}
        type="button"
        className="input sel-btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => {
          setActive(current);
          setOpen((v) => !v);
        }}
      >
        <span className="sel-value">{shown}</span>
        <span className="sel-caret">
          <Icon name="chevron-down" />
        </span>
      </button>
      <span className="float-label">{label}</span>
      <ul ref={list} id={listId} className="sel-list" role="listbox" hidden={!open}>
        {options.map((o) => (
          <li
            key={o.value}
            className="sel-opt"
            role="option"
            aria-selected={o.value === current}
            data-active={o.value === active ? '1' : undefined}
            onClick={() => choose(o.value)}
            onMouseMove={() => setActive(o.value)}
          >
            {o.title}
            <Icon name="check" />
          </li>
        ))}
      </ul>
      {/* значение уходит на сервер обычным полем: кнопка в форму не попадает */}
      {name ? <input type="hidden" name={name} value={current} /> : null}
    </div>
  );
}
