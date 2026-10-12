'use client';

import { useSyncExternalStore } from 'react';

/**
 * Ответ на плашку cookie — один на весь сайт.
 *
 * Плашка обещает выбор, значит выбор должен что-то менять: пока
 * человек не нажал «Принять все», счётчик не загружается вовсе.
 * «Только необходимые» — это и есть необходимые: язык, ответ на эту
 * самую плашку, работа форм. Аналитики среди них нет.
 *
 * Ответ лежит в браузере посетителя и никуда не уходит. Хранилище
 * может быть недоступно — в приватном окне или при запрете на сайт, —
 * и тогда ответа просто нет: плашка покажется снова, счётчик не
 * загрузится. Молчание согласием не считаем.
 */
export type Consent = 'all' | 'required';

const KEY = 'cookie-consent';

/* Плашка и счётчик стоят в разных местах страницы и ничего друг
   о друге не знают. Связывает их событие: плашка объявляет ответ,
   счётчик слушает и появляется, не дожидаясь перезагрузки. */
const EVENT = 'markethelp:consent';

export function readConsent(): Consent | null {
  try {
    const saved = localStorage.getItem(KEY);
    return saved === 'all' || saved === 'required' ? saved : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* записать некуда — ответ живёт до конца этой страницы */
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  /* ответили в другой вкладке — здесь плашка тоже должна исчезнуть */
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

/**
 * Ответ посетителя; null — пока не отвечал. На сервере всегда null:
 * страницы собираются заранее, одни на всех, и знать ответ не могут.
 */
export function useConsent(): Consent | null {
  return useSyncExternalStore(subscribe, readConsent, () => null);
}
