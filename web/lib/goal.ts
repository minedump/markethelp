import { METRIKA } from '@/content/site';

/**
 * Цель Метрики.
 *
 * Счётчик стоит не на каждой сборке: на тестовой его нет вовсе. Поэтому
 * цель отправляется только если счётчик действительно загрузился —
 * иначе вызов молча пропускается, а не роняет обработчик нажатия.
 *
 * Сами цели в Метрике не заводятся из кода: идентификатор отсюда нужно
 * создать в интерфейсе счётчика как JS-цель, иначе события придут
 * в никуда.
 */
declare global {
  interface Window {
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

export function goal(name: string) {
  if (typeof window === 'undefined') return;
  window.ym?.(METRIKA, 'reachGoal', name);
}
