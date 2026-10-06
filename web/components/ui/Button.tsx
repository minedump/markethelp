import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

/**
 * Кнопка кита (.btn и её виды).
 *
 * Вид: primary — основная синяя, jade — бирюзовая для первого экрана,
 * secondary — белая с рамкой, quiet — без фона, soft — на серой
 * подложке, sun — жёлтая, danger — красная.
 * Размер: sm 2.25rem, md 2.75rem, lg 3.25rem — те же три высоты, что
 * у полей, поэтому кнопка и поле в одной строке совпадают.
 * icon — квадратная кнопка со значком без подписи.
 */
export type ButtonVariant = 'primary' | 'jade' | 'secondary' | 'quiet' | 'soft' | 'sun' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT: Record<ButtonVariant, string> = {
  primary: '',
  jade: 'btn-jade',
  secondary: 'btn-secondary',
  quiet: 'btn-quiet',
  soft: 'btn-soft',
  sun: 'btn-sun',
  danger: 'btn-danger',
};

const SIZE: Record<ButtonSize, string> = { sm: 'btn-sm', md: '', lg: 'btn-lg' };

function cls(variant: ButtonVariant, size: ButtonSize, icon: boolean, extra?: string) {
  return ['btn', VARIANT[variant], SIZE[size], icon ? 'btn-icon' : '', extra]
    .filter(Boolean)
    .join(' ');
}

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** квадратная кнопка со значком без подписи */
  icon?: boolean;
  children?: ReactNode;
};

type ButtonProps = Common & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = 'primary', size = 'md', icon = false, className, type = 'button', ...rest }: ButtonProps) {
  return <button type={type} className={cls(variant, size, icon, className)} {...rest} />;
}

type LinkButtonProps = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/** Та же кнопка, но ссылкой: внутренние адреса идут через next/link. */
export function LinkButton({ variant = 'primary', size = 'md', icon = false, className, href, ...rest }: LinkButtonProps) {
  const classes = cls(variant, size, icon, className);
  const external = /^(https?:|tel:|mailto:|#)/.test(href);
  if (external) return <a href={href} className={classes} {...rest} />;
  return <Link href={href} className={classes} {...rest} />;
}
