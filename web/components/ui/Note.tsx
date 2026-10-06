import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '@/components/Icon';

/**
 * Блок сообщения (.note). В отличие от тоста остаётся на странице:
 * им говорят то, что нужно видеть, пока человек читает или заполняет.
 */
export type NoteTone = 'info' | 'ok' | 'warn' | 'bad';

const TONE: Record<NoteTone, { cls: string; icon: IconName }> = {
  info: { cls: '', icon: 'info' },
  ok: { cls: 'note-ok', icon: 'circle-check' },
  warn: { cls: 'note-warn', icon: 'alert-triangle' },
  bad: { cls: 'note-bad', icon: 'alert-circle' },
};

type NoteProps = HTMLAttributes<HTMLDivElement> & {
  tone?: NoteTone;
  /** значок по виду сообщения; свой ставится только если он точнее */
  icon?: IconName;
  /** первая фраза полужирная — по ней сообщение узнают, не читая целиком */
  title?: ReactNode;
  children?: ReactNode;
};

export function Note({ tone = 'info', icon, title, className, children, ...rest }: NoteProps) {
  const { cls, icon: fallback } = TONE[tone];
  return (
    <div className={['note', cls, className].filter(Boolean).join(' ')} {...rest}>
      <Icon name={icon ?? fallback} />
      <span>
        {title ? <b className="font-semibold">{title}</b> : null}
        {title && children ? ' ' : null}
        {children}
      </span>
    </div>
  );
}
