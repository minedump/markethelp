'use client';

import { useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { Icon } from '@/components/Icon';

/**
 * Аккордеон (.acc) — блок вопросов и ответов.
 *
 * Свой у браузера details открывается рывком: высоту он не анимирует.
 * Поэтому нажатие перехватывается и створка разводится от нуля до
 * натуральной высоты. Открытым элемент становится сразу, чтобы
 * содержимое было в поиске по странице и в доступности; анимируется
 * только створка.
 */
export type Fold = { question: ReactNode; answer: ReactNode };

const DUR = 260;

function Item({ question, answer, open = false }: Fold & { open?: boolean }) {
  const box = useRef<HTMLDetailsElement>(null);
  const fold = useRef<HTMLDivElement>(null);
  const anim = useRef<Animation | null>(null);

  function toggle(e: MouseEvent) {
    e.preventDefault();
    const d = box.current;
    const f = fold.current;
    if (!d || !f) return;
    const opening = !d.open;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      d.open = opening;
      return;
    }

    /* если предыдущая створка ещё едет — продолжаем с того места, где она */
    const from = anim.current ? f.getBoundingClientRect().height : opening ? 0 : f.offsetHeight;
    if (anim.current) {
      anim.current.cancel();
      anim.current = null;
    }
    if (opening) d.open = true;

    const to = opening ? f.offsetHeight : 0;
    const a = f.animate([{ height: from + 'px' }, { height: to + 'px' }], {
      duration: DUR,
      easing: 'cubic-bezier(.33, 1, .68, 1)',
    });
    anim.current = a;
    /* дожидаемся через обещание, а не через событие: во вкладке на заднем
       плане событие может не прийти, и створка осталась бы закрытой только
       на вид, а элемент — раскрытым */
    a.finished.then(
      () => {
        if (!opening) d.open = false;
        if (anim.current === a) anim.current = null;
      },
      () => {
        /* отменили: состояние доведёт следующее нажатие */
      },
    );
  }

  return (
    <details ref={box} open={open}>
      <summary onClick={toggle}>
        {question}
        <Icon name="chevron-down" />
      </summary>
      <div className="acc-fold" ref={fold}>
        <div className="body">{answer}</div>
      </div>
    </details>
  );
}

/** Первый вопрос раскрыт: по нему видно, как блок устроен. */
export function Accordion({ items, openFirst = true }: { items: Fold[]; openFirst?: boolean }) {
  return (
    <div className="acc">
      {items.map((f, i) => (
        <Item key={i} {...f} open={openFirst && i === 0} />
      ))}
    </div>
  );
}
