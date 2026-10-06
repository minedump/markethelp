import type { HTMLAttributes, ReactNode, ElementType } from 'react';

/**
 * Плитка (.bento) — предмет в перечне: услуга, цифра, зона склада.
 * Ничего не обводит, у неё только своя заливка и мягкие пятна света.
 * Поля внутри задаёт сама плитка (1.75rem, от 640px — 2.25rem), поэтому
 * содержимое своих не добавляет: иначе поля складываются и ряд плиток
 * выглядит рваным.
 *
 * wide — плитка во всю ширину полосы: пятна там не ставятся, на такой
 * ширине они размазываются в бледное облако.
 * Плитка в плитке — нет: получается рамка в рамке.
 */
type BentoProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  wide?: boolean;
  children?: ReactNode;
};

export function Bento({ as: Tag = 'div', wide = false, className, ...rest }: BentoProps) {
  return (
    <Tag
      className={['bento', wide ? 'bento-wide' : '', className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
}

/**
 * Чёрный блок с подсветкой (.on-ink.glow) — один на страницу, обычно
 * первый экран. Слой света служебный: лежит под содержимым, курсором
 * по нему не попасть, читалке экрана он не нужен.
 */
type GlowProps = HTMLAttributes<HTMLElement> & { as?: ElementType; children?: ReactNode };

export function Glow({ as: Tag = 'div', className, children, ...rest }: GlowProps) {
  return (
    <Tag className={['on-ink', 'glow', className].filter(Boolean).join(' ')} {...rest}>
      {children}
      <div className="glow-lights" aria-hidden="true">
        <span className="glow-band" />
        <span className="glow-orb glow-orb-a" />
        <span className="glow-orb glow-orb-b" />
        <span className="glow-orb glow-orb-c" />
      </div>
    </Tag>
  );
}

/**
 * Выворотка на чернильном (.on-ink) и на фирменном синем (.on-brand).
 * Новых кнопок для них не нужно: бирюзовая и белая вторичная читаются
 * как есть. Меняются только текст, ссылки и метки.
 */
export function OnInk({ as: Tag = 'div', className, ...rest }: GlowProps) {
  return <Tag className={['on-ink', className].filter(Boolean).join(' ')} {...rest} />;
}

export function OnBrand({ as: Tag = 'div', className, ...rest }: GlowProps) {
  return <Tag className={['on-brand', className].filter(Boolean).join(' ')} {...rest} />;
}
