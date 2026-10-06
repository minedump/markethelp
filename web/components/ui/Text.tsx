import type { ElementType, HTMLAttributes, ReactNode, AnchorHTMLAttributes } from 'react';
import NextLink from 'next/link';
import { Icon } from '@/components/Icon';

/**
 * Типографика кита. Размер задаётся классом, а тег выбирается по месту:
 * заголовок раздела может быть h2 и h3 — на вид это одна ступень.
 *
 * display — первый экран, display-sm — заголовок страницы,
 * h1…h4 — заголовки внутри, lead — подводка, small — пояснение.
 */
export type TextStyle = 'display' | 'display-sm' | 'h1' | 'h2' | 'h3' | 'h4' | 'lead' | 'small';

const STYLE: Record<TextStyle, string> = {
  display: 't-display',
  'display-sm': 't-display-sm',
  h1: 't-h1',
  h2: 't-h2',
  h3: 't-h3',
  h4: 't-h4',
  lead: 't-lead',
  small: 't-small',
};

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  variant: TextStyle;
  children?: ReactNode;
};

export function Text({ as, variant, className, ...rest }: TextProps) {
  const Tag: ElementType = as ?? (variant.startsWith('h') ? (variant as ElementType) : 'p');
  return <Tag className={[STYLE[variant], className].filter(Boolean).join(' ')} {...rest} />;
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode };

/** Ссылка в тексте: подчёркнутая, фирменного синего. */
export function TextLink({ href, className, ...rest }: LinkProps) {
  const classes = ['link', className].filter(Boolean).join(' ');
  if (/^(https?:|tel:|mailto:|#)/.test(href)) return <a href={href} className={classes} {...rest} />;
  return <NextLink href={href} className={classes} {...rest} />;
}

type GoProps = LinkProps & {
  /** тёмный ряд: для меню и столбцов подвала, где ссылок много подряд */
  ink?: boolean;
  /** стрелка справа — «ведёт дальше» */
  arrow?: boolean;
};

/** Ссылка-переход (.link-go): полужирная, со значком или стрелкой. */
export function LinkGo({ href, ink = false, arrow = false, className, children, ...rest }: GoProps) {
  const classes = ['link-go', ink ? 'link-go-ink' : '', className].filter(Boolean).join(' ');
  const body = (
    <>
      {children}
      {arrow ? <Icon name="chevron-right" /> : null}
    </>
  );
  if (/^(https?:|tel:|mailto:|#)/.test(href)) {
    return <a href={href} className={classes} {...rest}>{body}</a>;
  }
  return <NextLink href={href} className={classes} {...rest}>{body}</NextLink>;
}
