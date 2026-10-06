'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Icon, type IconName } from '@/components/Icon';
import { LinkGo } from './Text';

/**
 * Колокольчик и панель уведомлений.
 *
 * Непрочитанные видно двумя способами сразу: синей точкой справа и более
 * тёмным жирным заголовком. Прочитанные не исчезают и не сереют целиком —
 * гаснет только заголовок, иначе человек теряет то, что уже видел.
 *
 * Значок слева говорит о типе события цветом из статусной палитры:
 * синий — люди, зелёный — успешная приёмка, жёлтый — задержка, серый —
 * документы и рутина. Красный не используется: уведомление сообщает,
 * а не требует.
 *
 * Счётчик считает только непрочитанные и исчезает, когда их нет. Пока
 * цифра одна, он ровный круг; от десяти вытягивается в таблетку, после
 * девяноста девяти показывает «99+».
 */
export type NotifKind = 'people' | 'ok' | 'warn' | 'routine';

const MARK: Record<NotifKind, string> = {
  people: 'bg-brand-wash text-brand',
  ok: 'bg-ok-wash text-ok',
  warn: 'bg-warn-wash text-warn',
  routine: 'bg-surface text-ink-soft',
};

export type Notif = {
  id: string;
  kind: NotifKind;
  icon: IconName;
  title: ReactNode;
  text: ReactNode;
  /** «5 минут назад», «вчера» — человеческим языком, а не датой */
  time: ReactNode;
  read?: boolean;
};

type Props = {
  items: Notif[];
  /** адрес страницы со всеми уведомлениями */
  allHref?: string;
  /**
   * Сторона раскрытия. В шапке колокольчик справа, и панель уезжала бы
   * за край экрана — поэтому по умолчанию она раскрывается влево.
   */
  side?: 'left' | 'right';
};

export function Notifications({ items, allHref = '#', side = 'left' }: Props) {
  const [list, setList] = useState(items);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  const unread = list.filter((n) => !n.read).length;

  useEffect(() => {
    if (!open) return;
    const onAway = (e: MouseEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onAway);
    return () => document.removeEventListener('click', onAway);
  }, [open]);

  return (
    /* w-fit — чтобы счётчик и панель отсчитывались от самого
       колокольчика, а не от всей строки, в которой он стоит */
    <div className="bell w-fit" ref={box}>
      <button
        className="btn btn-quiet btn-icon"
        type="button"
        aria-label="Уведомления"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="bell" />
        {unread ? (
          <span className="bell-badge" data-wide={unread > 9 ? '1' : undefined}>
            {unread > 99 ? '99+' : unread}
          </span>
        ) : null}
      </button>

      <div
        className={['notif-panel', side === 'right' ? 'left-0 right-auto' : ''].filter(Boolean).join(' ')}
        style={{ display: open ? undefined : 'none' }}
      >
        <div className="notif-head">
          <span className="font-semibold text-[0.9375rem]">Уведомления</span>
          <button
            className="link-go text-[0.875rem]"
            type="button"
            onClick={() => setList((l) => l.map((n) => ({ ...n, read: true })))}
          >
            Прочитать все
          </button>
        </div>
        <div className="notif-list">
          {list.map((n) => (
            <button
              key={n.id}
              className="notif"
              type="button"
              data-read={n.read ? '1' : '0'}
              onClick={() =>
                setList((l) => l.map((x) => (x.id === n.id ? { ...x, read: true } : x)))
              }
            >
              <span className={`notif-mark ${MARK[n.kind]}`}>
                <Icon name={n.icon} />
              </span>
              <span className="notif-body">
                <span className="notif-title">{n.title}</span>
                <span className="notif-text">{n.text}</span>
                <span className="notif-time">{n.time}</span>
              </span>
              <span className="notif-dot" />
            </button>
          ))}
        </div>
        <div className="notif-foot">
          <LinkGo href={allHref} arrow className="text-[0.875rem]">
            Все уведомления
          </LinkGo>
        </div>
      </div>
    </div>
  );
}
