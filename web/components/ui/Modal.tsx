'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Icon } from '@/components/Icon';

/**
 * Окно (.modal). Перекрывает страницу и требует ответа, поэтому
 * появляется только тогда, когда без ответа дальше нельзя. Всё, что
 * можно сказать не перебивая, говорит тост или блок сообщения.
 *
 * Шапка и подвал устроены одинаково во всех окнах: поля те же, что
 * у плитки, и тонкая линия, отделяющая их от содержимого. Заголовок
 * никогда не живёт в теле окна, иначе при прокрутке уезжает вместе
 * с ним. Заголовок — это вопрос, а кнопка отвечает на него глаголом:
 * не «ОК», а «Удалить».
 *
 * Окно — настоящий dialog: Esc, фокус внутри и затемнение страницы
 * приходят от браузера, а не дописываются скриптом.
 */
type Props = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  /** значок слева от заголовка, когда он добавляет смысл */
  icon?: ReactNode;
  /** кнопки в подвале окна */
  footer?: ReactNode;
  /** подвал с текстом слева и кнопкой справа — «Редакция от…» */
  footerSplit?: boolean;
  /** шире обычного: длинный текст, таблица */
  wide?: boolean;
  bodyClassName?: string;
  children: ReactNode;
};

export function Modal({
  open,
  onClose,
  title,
  icon,
  footer,
  footerSplit = false,
  wide = false,
  bodyClassName,
  children,
}: Props) {
  const box = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = box.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={box}
      className={['modal', wide ? 'modal-wide' : ''].filter(Boolean).join(' ')}
      /* Esc и нажатие мимо закрывают окно — обычные ожидания от всего,
         что раскрывается поверх страницы */
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === box.current) onClose();
      }}
    >
      <div className="modal-head">
        <span className="modal-head-main">
          {icon}
          <p className="modal-title">{title}</p>
        </span>
        <button className="modal-x" type="button" aria-label="Закрыть" onClick={onClose}>
          <Icon name="x" />
        </button>
      </div>
      <div className={['modal-body', bodyClassName].filter(Boolean).join(' ')}>{children}</div>
      {footer ? (
        <div className={['modal-foot', footerSplit ? 'modal-foot-split' : ''].filter(Boolean).join(' ')}>
          {footer}
        </div>
      ) : null}
    </dialog>
  );
}
