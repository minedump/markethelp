'use client';

import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { FloatInput } from './Field';

/** Оставляем десять цифр номера: код страны подставляем сами. */
function digits(v: string) {
  let d = v.replace(/\D/g, '');
  if (d[0] === '7' || d[0] === '8') d = d.slice(1);
  return d.slice(0, 10);
}

function format(d: string) {
  let out = '+7';
  if (d.length) out += ' ' + d.slice(0, 3);
  if (d.length > 3) out += ' ' + d.slice(3, 6);
  if (d.length > 6) out += '-' + d.slice(6, 8);
  if (d.length > 8) out += '-' + d.slice(8, 10);
  return out;
}

/**
 * Поле телефона с маской. Номер набирается цифрами, разделители
 * расставляются сами, «+7» появляется по щелчку и исчезает, если
 * человек ушёл, не введя ничего.
 */
type Props = {
  label?: ReactNode;
  name?: string;
  required?: boolean;
  /** наружу отдаются только цифры — их и отправляем */
  onChange?: (ten: string) => void;
  invalid?: boolean;
  id?: string;
  wrapClassName?: string;
};

export function PhoneInput({ label = 'Телефон', onChange, ...rest }: Props) {
  const [value, setValue] = useState('');
  const prev = useRef('');

  return (
    <FloatInput
      label={label}
      type="tel"
      inputMode="numeric"
      autoComplete="tel"
      value={value}
      onFocus={() => {
        if (!value) {
          prev.current = '';
          setValue('+7 ');
        }
      }}
      onBlur={() => {
        if (digits(value).length === 0) setValue('');
      }}
      onChange={(e) => {
        const native = e.nativeEvent as InputEvent;
        let d = digits(e.target.value);
        /* стёрли разделитель — убираем цифру перед ним, иначе поле «залипает» */
        if (native.inputType === 'deleteContentBackward' && d === prev.current) d = d.slice(0, -1);
        prev.current = d;
        setValue(format(d));
        onChange?.(d);
      }}
      {...rest}
    />
  );
}
