import type { ReactNode } from 'react';
import { Icon } from '@/components/Icon';

/**
 * Схема работы (.steps). Кружки пустые с синей обводкой, первый залит —
 * читается как «здесь начинается». Линия бледная, поэтому взгляд идёт
 * по заголовкам шагов, а не по украшению.
 *
 * split — линия по середине, текст встаёт то справа, то слева. Такой
 * блок ставится во всю ширину и держит внимание сам; освободившуюся
 * сторону занимает картинка (pic) — она не обязательна.
 *
 * Последний пункт может обращаться к человеку (call): кружок у него
 * залит и внутри галочка вместо номера — нумеровать призыв наравне
 * с шагами было бы неправдой. Размеры текста внутри схемы закреплены
 * и у призыва те же: вес ему добавляет кружок, а не кегль.
 */
export type Step = {
  title: ReactNode;
  text: ReactNode;
  /** картинка или значок на свободной стороне — только в split */
  pic?: ReactNode;
  /** заключительный пункт: залитый кружок с галочкой вместо номера */
  call?: boolean;
};

type StepsProps = {
  items: Step[];
  /** чередование сторон — для блока во всю ширину */
  split?: boolean;
  className?: string;
};

export function Steps({ items, split = false, className }: StepsProps) {
  return (
    <ol
      className={['steps', 'steps-outline', split ? 'steps-split' : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      {items.map((s, i) => (
        <li key={i} className={s.call ? 'end' : undefined}>
          <div className="marker">
            <div className="dot">{s.call ? <Icon name="check" /> : i + 1}</div>
            <div className="rail" />
          </div>
          <div className="txt">
            <b>{s.title}</b>
            <small>{s.text}</small>
          </div>
          {split && s.pic ? <div className="pic">{s.pic}</div> : null}
        </li>
      ))}
    </ol>
  );
}
