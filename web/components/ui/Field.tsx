'use client';

import { useId } from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';
import { Icon } from '@/components/Icon';

/**
 * Поле с подписью внутри (.float). Подпись стоит в поле, пока оно
 * пустое, и уезжает наверх, когда появился текст. Скрипта для этого
 * не нужно: браузер сам знает, показан ли плейсхолдер, — поэтому в поле
 * подставлен пробел вместо подсказки. Такие поля всегда крупные,
 * 3.25rem: иначе подписи некуда уехать.
 *
 * Пояснения и сообщения об ошибке живут снаружи, под полем, — внутри
 * для них нет места, а видеть их нужно, пока поле заполняют. Для этого
 * поле заворачивается в Field с hint или error.
 */
type FieldProps = {
  /** пояснение под полем: «перезвоним в течение часа» */
  hint?: ReactNode;
  /** ошибка под полем — вместо пояснения, со значком */
  error?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function Field({ hint, error, className, children }: FieldProps) {
  return (
    <div className={['field', className].filter(Boolean).join(' ')}>
      {children}
      {error ? (
        <span className="field-err">
          <Icon name="alert-circle" size="sm" />
          {error}
        </span>
      ) : hint ? (
        <span className="field-hint">{hint}</span>
      ) : null}
    </div>
  );
}

type FloatInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> & {
  label: ReactNode;
  /** значок пояснения у правого края поля — там же, где крестик в поиске */
  tip?: string;
  tipLabel?: string;
  /** красная рамка и красная подпись: значение не прошло проверку */
  invalid?: boolean;
  /** утилиты раскладки для самой обёртки поля */
  wrapClassName?: string;
};

export function FloatInput({
  label,
  tip,
  tipLabel,
  invalid = false,
  wrapClassName,
  className,
  id,
  ...rest
}: FloatInputProps) {
  const auto = useId();
  const fieldId = id ?? auto;
  const input = (
    <input
      id={fieldId}
      className={['input', 'peer', invalid ? 'input-bad' : '', className].filter(Boolean).join(' ')}
      placeholder=" "
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );

  /* Со значком пояснения обёртка — div, а подпись отдельный label:
     будь один общий label на всё поле, нажатие на значок всплывало бы
     подписью и уводило фокус в поле. */
  if (tip) {
    return (
      <div className={['float', wrapClassName].filter(Boolean).join(' ')}>
        {input}
        <label className="float-label" htmlFor={fieldId}>
          {label}
        </label>
        <button className="input-tip" type="button" aria-label={tipLabel ?? 'Пояснение'} data-tip={tip}>
          <Icon name="info" size="sm" />
        </button>
      </div>
    );
  }

  return (
    <label className={['float', wrapClassName].filter(Boolean).join(' ')}>
      {input}
      <span className="float-label">{label}</span>
    </label>
  );
}

type FloatTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'placeholder'> & {
  label: ReactNode;
  invalid?: boolean;
  wrapClassName?: string;
};

/** То же поле в несколько строк: подпись сама встаёт к верхнему краю. */
export function FloatTextarea({
  label,
  invalid = false,
  wrapClassName,
  className,
  ...rest
}: FloatTextareaProps) {
  return (
    <label className={['float', wrapClassName].filter(Boolean).join(' ')}>
      <textarea
        className={['input', 'peer', invalid ? 'input-bad' : '', className].filter(Boolean).join(' ')}
        placeholder=" "
        aria-invalid={invalid || undefined}
        {...rest}
      />
      <span className="float-label">{label}</span>
    </label>
  );
}
