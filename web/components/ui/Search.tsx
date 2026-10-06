'use client';

import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import { Icon } from '@/components/Icon';

/**
 * Поиск с очисткой (.search). Единственное поле без подписи: его роль
 * читается по лупе и по тексту внутри. Крестик появляется, только когда
 * в поле что-то есть, и убирает текст одним нажатием — на телефоне это
 * заметно быстрее, чем зажимать backspace.
 */
type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  /** высота из общего ряда контролов */
  size?: 'sm' | 'md' | 'lg';
  wrapClassName?: string;
  onSearch?: (value: string) => void;
};

const SIZE = { sm: 'input-sm', md: '', lg: 'input-lg' } as const;

export function Search({
  size = 'md',
  wrapClassName,
  className,
  placeholder = 'Найти услугу',
  onSearch,
  ...rest
}: Props) {
  const [value, setValue] = useState('');
  return (
    <span className={['search', wrapClassName].filter(Boolean).join(' ')}>
      <Icon name="search" size={size === 'sm' ? 'sm' : 'md'} />
      <input
        className={['input', SIZE[size], className].filter(Boolean).join(' ')}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onSearch?.(e.target.value);
        }}
        {...rest}
      />
      <button
        className="clear"
        type="button"
        aria-label="Очистить поиск"
        hidden={value.length === 0}
        onClick={() => {
          setValue('');
          onSearch?.('');
        }}
      >
        <Icon name="x" size="sm" />
      </button>
    </span>
  );
}
