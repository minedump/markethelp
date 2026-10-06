'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Button } from './Button';

/**
 * Согласие на cookie (.cookie).
 *
 * Плашка, а не окно: стоит внизу слева на ярусе тостов и не запирает
 * страницу — читать можно, не отвечая. Две кнопки, потому что выбор
 * должен быть: «Принять все» основная, «Только необходимые» тихая.
 * Крестика и кнопки «Понятно» нет — они выглядят как согласие, но им
 * не являются.
 *
 * Ответ запоминается в браузере, и плашка больше не показывается.
 * Охранное поле от краёв экрана то же, что у всего остального: 1rem
 * на телефоне, 2rem от 640px.
 */
const KEY = 'cookie-consent';

type Props = {
  children: ReactNode;
  /** для витрины: плашка стоит в потоке, ответ не запоминается */
  demo?: boolean;
  onAnswer?: (answer: 'all' | 'required') => void;
};

export function CookieBanner({ children, demo = false, onAnswer }: Props) {
  /* до первой отрисовки в браузере ответа мы не знаем, а показать
     плашку и сразу её убрать — хуже, чем показать на кадр позже */
  const [show, setShow] = useState(demo);

  useEffect(() => {
    if (demo) return;
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {
      /* приватное окно или запрет на хранилище: спрашиваем каждый раз */
    }
    if (!saved) setShow(true);
  }, [demo]);

  if (!show) return null;

  function answer(value: 'all' | 'required') {
    if (!demo) {
      try {
        localStorage.setItem(KEY, value);
      } catch {
        /* записать некуда — плашка просто закроется до конца сеанса */
      }
      setShow(false);
    }
    onAnswer?.(value);
  }

  return (
    <div
      className={['cookie', demo ? 'cookie-static' : ''].filter(Boolean).join(' ')}
      role="region"
      aria-label="Файлы cookie"
    >
      <p className="txt">{children}</p>
      <div className="acts">
        <Button size="sm" onClick={() => answer('all')}>
          Принять все
        </Button>
        <Button size="sm" variant="quiet" onClick={() => answer('required')}>
          Только необходимые
        </Button>
      </div>
    </div>
  );
}
