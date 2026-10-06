import type { InputHTMLAttributes, ReactNode } from 'react';

/**
 * Флажок и радиокнопка (.choice). Коробка 1.5rem — ровно высота строки,
 * поэтому подпись стоит с ней на одной линии без подгоночных отступов,
 * и это не ломается, когда подпись переносится на вторую строку.
 */
type ChoiceProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  type?: 'checkbox' | 'radio';
  children: ReactNode;
  className?: string;
};

export function Choice({ type = 'checkbox', children, className, ...rest }: ChoiceProps) {
  return (
    <label className={['choice', className].filter(Boolean).join(' ')}>
      <input type={type} {...rest} />
      <span>{children}</span>
    </label>
  );
}

/**
 * Переключатель (.switch). Ставится там, где настройка срабатывает
 * сразу, без кнопки «Сохранить»; выбор из нескольких вариантов — это
 * по-прежнему радиокнопки.
 */
type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  children: ReactNode;
  className?: string;
};

export function Switch({ children, className, ...rest }: SwitchProps) {
  return (
    <label className={['switch', className].filter(Boolean).join(' ')}>
      <input type="checkbox" {...rest} />
      <span>{children}</span>
    </label>
  );
}
