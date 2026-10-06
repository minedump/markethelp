'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Icon, type IconName } from '@/components/Icon';

/**
 * Тост (.toast) — короткое сообщение о том, что произошло прямо сейчас:
 * заявка ушла, файл прикрепился. Всплывает в правом нижнем углу, живёт
 * пять секунд и уходит само. Тем, что требует решения, тост быть не
 * может — для этого блок сообщения на странице (Note).
 *
 * Цвет несёт только левая полоса и значок: полностью залитый цветом
 * тост перекрикивает страницу и хуже читается.
 */
export type ToastTone = 'info' | 'ok' | 'warn' | 'bad';

const TONE: Record<ToastTone, { cls: string; icon: IconName }> = {
  info: { cls: '', icon: 'file' },
  ok: { cls: 'toast-ok', icon: 'circle-check' },
  warn: { cls: 'toast-warn', icon: 'alert-triangle' },
  bad: { cls: 'toast-bad', icon: 'alert-circle' },
};

export type ToastInput = {
  tone?: ToastTone;
  title: ReactNode;
  /** вторая строка: что именно случилось */
  text?: ReactNode;
  icon?: IconName;
};

type Item = ToastInput & { id: number };

const LIFE = 5000;

const Ctx = createContext<((t: ToastInput) => void) | null>(null);

/** Ставится один раз в layout: показывать тосты может любая страница. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const next = useRef(1);

  const kill = useCallback((id: number) => {
    setItems((list) => list.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (t: ToastInput) => {
      const id = next.current++;
      /* новый сверху: последнее событие читают первым */
      setItems((list) => [{ ...t, id }, ...list]);
      window.setTimeout(() => kill(id), LIFE);
    },
    [kill],
  );

  const value = useMemo(() => show, [show]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="toaster" role="status" aria-live="polite">
        {items.map((t) => (
          <Toast key={t.id} {...t} onClose={() => kill(t.id)} />
        ))}
      </div>
    </Ctx.Provider>
  );
}

/** const toast = useToast(); toast({ tone: 'ok', title: 'Заявка отправлена' }) */
export function useToast() {
  const show = useContext(Ctx);
  if (!show) throw new Error('useToast: нет ToastProvider — он ставится в layout');
  return show;
}

/** Тот же тост как обычный блок — для витрины кита и для образцов. */
export function Toast({
  tone = 'info',
  title,
  text,
  icon,
  onClose,
}: ToastInput & { onClose?: () => void }) {
  const { cls, icon: fallback } = TONE[tone];
  return (
    <div className={['toast', cls].filter(Boolean).join(' ')}>
      <Icon name={icon ?? fallback} />
      <span className="txt">
        <b>{title}</b>
        {text ? <small>{text}</small> : null}
      </span>
      {onClose ? (
        <button className="close" type="button" aria-label="Закрыть" onClick={onClose}>
          <Icon name="x" size="sm" />
        </button>
      ) : null}
    </div>
  );
}
