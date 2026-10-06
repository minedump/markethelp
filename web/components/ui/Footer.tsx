import type { ReactNode } from 'react';
import { Icon, Logo, type IconName } from '@/components/Icon';
import { LinkGo } from './Text';

/**
 * Подвал (.foot) в двух видах.
 *
 * Светлый — для страниц, у которых последний блок уже тёмный или
 * с подсветкой: иначе два тёмных сливаются в одно пятно.
 * Тёмный (dark) — под светлыми страницами: сайт начинается и
 * заканчивается одним цветом.
 *
 * tile делает из тёмного подвала плитку — с полями от краёв экрана
 * и снизу, как первый экран, и со свечением у нижнего края: страница
 * открывается и закрывается одной формой. Синего в подвале нет —
 * он остаётся цвету действия на странице.
 */
export type FootLink = { title: string; href: string; icon?: IconName; external?: boolean };
export type FootColumn = { title: string; links: FootLink[] };

type Props = {
  columns: FootColumn[];
  /** копирайт слева в нижней строке */
  copy: ReactNode;
  /** юридические ссылки справа в нижней строке */
  legal: FootLink[];
  dark?: boolean;
  /** подвал-плитка со свечением: поля от краёв экрана и скругление */
  tile?: boolean;
  /** ширина колонки содержимого — та же, что у страницы */
  inner?: string;
};

function Col({ title, links }: FootColumn) {
  return (
    <nav className="flex flex-col gap-3" aria-label={title}>
      <p className="t-h4 m-0">{title}</p>
      {links.map((l) => (
        <LinkGo
          key={l.href + l.title}
          href={l.href}
          ink
          target={l.external ? '_blank' : undefined}
          rel={l.external ? 'noopener' : undefined}
        >
          {l.icon ? <Icon name={l.icon} /> : null}
          {l.title}
        </LinkGo>
      ))}
    </nav>
  );
}

export function Footer({
  columns,
  copy,
  legal,
  dark = true,
  tile = true,
  inner = 'max-w-[75rem] mx-auto px-7 sm:px-9 lg:px-12',
}: Props) {
  return (
    <footer
      className={[
        'foot',
        dark ? 'foot-dark' : '',
        tile ? 'glow mx-4 sm:mx-8 mb-4 sm:mb-8' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {tile ? (
        /* Свечение у нижнего края — то же, что у первого экрана. */
        <div className="glow-lights" aria-hidden="true">
          <span className="glow-band" />
          <span className="glow-orb glow-orb-a" />
          <span className="glow-orb glow-orb-b" />
          <span className="glow-orb glow-orb-c" />
        </div>
      ) : null}

      <div className={inner}>
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 items-start">
          <div>
            {/* размеры заданы оба: у svg без своего viewBox ширина w-auto
                падает в стандартные 300px, и рисунок съезжает от края колонки */}
            <Logo className="w-[9.0625rem] h-20" />
          </div>
          {columns.map((c) => (
            <Col key={c.title} {...c} />
          ))}
        </div>

        <div className="foot-bar">
          <p className="m-0">{copy}</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {legal.map((l) => (
              <LinkGo key={l.href + l.title} href={l.href} ink>
                {l.title}
              </LinkGo>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
