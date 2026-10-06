import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { Bento, Text } from '@/components/ui';
import { RequestButton } from './RequestButton';
import type { Cta as CtaText } from '@/content/pages';

/**
 * Раскладка страниц — одна на весь сайт.
 *
 * Колонка содержимого: max-w-[75rem] и охранное поле экрана 1rem на
 * телефоне, 2rem от 640px. Столько же отступают плитки во всю полосу —
 * первый экран, призыв, подвал, карта — и плашка cookie с окном заявки:
 * иначе всплывающее стоит не на одной линии со страницей.
 *
 * Отступ у раздела только снизу: тогда расстояние между соседями равно
 * одному шагу, а не сумме двух. Шаг на главной — pb-20, на внутренних
 * страницах — pb-14. Новый блок сверяется с этим правилом, а не
 * с соседним блоком на глаз.
 */
export const COLUMN = 'max-w-[75rem] mx-auto px-4 sm:px-8 lg:px-12';

/* Та же колонка, но без полей: внутри плитки их задаёт сама плитка,
   и свои поля содержимое не добавляет — иначе они складываются. */
export const COLUMN_BARE = 'max-w-[75rem] mx-auto';

/** Поля плитки во всю полосу — те же, что у охранного поля экрана. */
export const TILE = 'mx-4 sm:mx-8';

type WrapProps = HTMLAttributes<HTMLElement> & { as?: ElementType; children?: ReactNode };

/** Колонка содержимого без собственных отступов сверху и снизу. */
export function Wrap({ as: Tag = 'div', className, ...rest }: WrapProps) {
  return <Tag className={[COLUMN, className].filter(Boolean).join(' ')} {...rest} />;
}

type SectionProps = HTMLAttributes<HTMLElement> & {
  /** шаг до следующего раздела: главная крупнее внутренних страниц */
  step?: 'home' | 'page' | 'none';
  /** раздел во всю ширину: колонку внутри ставит сам раздел */
  bleed?: boolean;
  children?: ReactNode;
};

const STEP = { home: 'pb-20', page: 'pb-14', none: '' };

export function Section({ step = 'page', bleed = false, className, children, ...rest }: SectionProps) {
  const cls = [bleed ? '' : COLUMN, STEP[step], className].filter(Boolean).join(' ');
  return (
    <section className={cls} {...rest}>
      {children}
    </section>
  );
}

/**
 * Заголовок раздела с подводкой. Ступень и ширина закреплены: подводка
 * шириной в 44rem читается в две-три строки, а растянутая во всю полосу
 * распадается на ленту.
 */
export function Head({
  title,
  lead,
  as = 'h2',
  className,
}: {
  title: ReactNode;
  lead?: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  return (
    <div className={className}>
      <Text variant="display-sm" as={as}>
        {title}
      </Text>
      {lead ? (
        <Text variant="lead" className="mt-4 max-w-[44rem]">
          {lead}
        </Text>
      ) : null}
    </div>
  );
}

/**
 * Призыв перед подвалом: плитка во всю полосу с одним действием.
 * Контактов здесь нет — они в шапке и в подвале, а тут одно действие.
 */
export function Cta({ text, step = 'page' }: { text: CtaText; step?: 'home' | 'page' }) {
  return (
    <section className={step === 'home' ? 'pb-16' : 'pb-14'}>
      <Bento wide className={TILE}>
        <div className={`${COLUMN_BARE} flex flex-wrap items-center justify-between gap-8`}>
          <div className="max-w-[36rem]">
            <Text variant="display-sm" as="h2">
              {text.title}
            </Text>
            <Text variant="lead" className="mt-4">
              {text.lead}
            </Text>
          </div>
          <RequestButton size="lg" className="shrink-0">
            {text.button}
          </RequestButton>
        </div>
      </Bento>
    </section>
  );
}
