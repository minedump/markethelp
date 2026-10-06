import type { InputHTMLAttributes, ReactNode } from 'react';
import { Icon } from '@/components/Icon';

/**
 * Карточка выбора (.pick) — для квиза. Крупная зона нажатия важнее
 * аккуратности: заявку чаще заполняют с телефона, стоя на складе.
 * Отметку показывает кружок с галочкой в углу, а не флажок сбоку.
 */
type PickProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  /** короткое название: FBO, FBS, «Обе» */
  name?: string;
  title: ReactNode;
  /** строка пояснения под названием */
  note?: ReactNode;
  /** один вариант из нескольких — radio; несколько сразу — checkbox */
  multiple?: boolean;
  className?: string;
};

export function Pick({ title, note, multiple = false, className, ...rest }: PickProps) {
  return (
    <label className={['pick', className].filter(Boolean).join(' ')}>
      <input type={multiple ? 'checkbox' : 'radio'} {...rest} />
      <Icon name="circle-check" className="tick" />
      <b className="pick-name">{title}</b>
      {note ? <small className="pick-note">{note}</small> : null}
    </label>
  );
}
