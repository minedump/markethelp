import type { HTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from '@/components/Icon';

/**
 * Метка (.chip). Показывает состояние записи, а не украшает блок:
 * статус поставки, выбранная услуга, схема работы. «Хит» и «Новинка»
 * метками не делаем — это подпись, а не данные.
 */
export type ChipTone = 'grey' | 'brand' | 'jade' | 'sun' | 'ok' | 'warn' | 'bad';

const TONE: Record<ChipTone, string> = {
  grey: '',
  brand: 'chip-brand',
  jade: 'chip-jade',
  sun: 'chip-sun',
  ok: 'chip-ok',
  warn: 'chip-warn',
  bad: 'chip-bad',
};

type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: ChipTone;
  icon?: IconName;
  children?: ReactNode;
};

export function Chip({ tone = 'grey', icon, className, children, ...rest }: ChipProps) {
  return (
    <span className={['chip', TONE[tone], className].filter(Boolean).join(' ')} {...rest}>
      {icon ? <Icon name={icon} /> : null}
      {children}
    </span>
  );
}

type RemovableChipProps = ChipProps & {
  /** крестик справа: чип в поле с несколькими ответами */
  onRemove: () => void;
  removeLabel?: string;
};

/** Тот же чип с крестиком — для поля, где ответов может быть несколько. */
export function RemovableChip({
  tone = 'brand',
  onRemove,
  removeLabel = 'Убрать',
  className,
  children,
  ...rest
}: RemovableChipProps) {
  return (
    <span className={['chip', TONE[tone], className].filter(Boolean).join(' ')} {...rest}>
      {children}
      <button className="tag-x" type="button" aria-label={removeLabel} onClick={onRemove}>
        <Icon name="x" size="sm" />
      </button>
    </span>
  );
}
