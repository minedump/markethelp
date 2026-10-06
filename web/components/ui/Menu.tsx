'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Icon } from '@/components/Icon';

/**
 * Меню узкого экрана (.menu).
 *
 * Своей кнопки у меню нет: три черты ставятся обычной кнопкой-иконкой.
 * Какой именно — решает то, на чём стоит шапка: мягкая годится и на
 * заливке, тихая — только на ровном светлом фоне.
 *
 * Пока меню открыто, значок становится крестиком: закрывает его та же
 * кнопка, и это должно быть видно. Закрывается ещё и клавишей Esc,
 * нажатием мимо и по самой ссылке — страница под меню уже прокручена
 * к нужному месту, а меню осталось бы висеть поверх неё.
 *
 * Панель отсчитывается от шапки, а не от окна: стоит внутри неё и
 * прижата к нижнему краю, поэтому подстраивается под любую её высоту.
 */
type Props = {
  children: ReactNode;
  /** вид кнопки: на заливке — мягкая, на ровном светлом — тихая */
  button?: 'soft' | 'quiet';
  label?: string;
  className?: string;
};

export function Menu({ children, button = 'soft', label = 'Меню', className }: Props) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onAway = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', onAway);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onAway);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={box} className={['contents', className].filter(Boolean).join(' ')}>
      <button
        className={`btn btn-icon btn-sm btn-${button}`}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name={open ? 'x' : 'menu'} />
      </button>
      <nav
        id={id}
        className="menu"
        hidden={!open}
        aria-label={label}
        onClick={(e) => {
          if ((e.target as Element).closest('a, button')) setOpen(false);
        }}
      >
        {children}
      </nav>
    </div>
  );
}
