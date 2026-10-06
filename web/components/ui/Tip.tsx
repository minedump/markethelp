'use client';

import { useEffect, useRef } from 'react';
import { Icon } from '@/components/Icon';

/**
 * Подсказка (.tip). Одна строка пояснения к тому, что не подписано:
 * значок без слов, сокращение, поле с неочевидным правилом. Появляется
 * по наведению и по переходу табом, уходит сама. Всё, что длиннее
 * строки, — это уже не подсказка, а текст рядом с полем.
 *
 * Слой один на всю страницу и слушает [data-tip] у кого угодно: так
 * подсказку можно поставить любому элементу одним атрибутом, не заводя
 * вокруг него обёртку. Сторона — пожелание: если у выбранного края
 * не хватает места, подсказка разворачивается в противоположную, а
 * стрелка остаётся нацеленной на то, что поясняет.
 *
 * Ставится один раз в layout.
 */
const GAP = 10; /* до элемента */
const PAD = 8; /* до края окна */
const DELAY = 120; /* чтобы не мигала при проводке мышью по ряду значков */

type Side = 'top' | 'bottom' | 'left' | 'right';

const ORDERS: Record<Side, Side[]> = {
  top: ['top', 'bottom', 'right', 'left'],
  bottom: ['bottom', 'top', 'right', 'left'],
  left: ['left', 'right', 'top', 'bottom'],
  right: ['right', 'left', 'top', 'bottom'],
};

export function TipLayer() {
  const tip = useRef<HTMLDivElement | null>(null);
  const txt = useRef<HTMLSpanElement | null>(null);
  const arrow = useRef<HTMLElement | null>(null);
  const current = useRef<HTMLElement | null>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const box = document.createElement('div');
    box.className = 'tip';
    box.id = 'tip';
    box.setAttribute('role', 'tooltip');
    const t = document.createElement('span');
    const a = document.createElement('i');
    a.className = 'tip-arrow';
    box.appendChild(t);
    box.appendChild(a);
    tip.current = box;
    txt.current = t;
    arrow.current = a;

    function place(target: HTMLElement) {
      const el = tip.current;
      const ar = arrow.current;
      if (!el || !ar) return;
      const r = target.getBoundingClientRect();
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const vw = document.documentElement.clientWidth;
      const vh = document.documentElement.clientHeight;
      const want = (target.getAttribute('data-tip-pos') as Side) || 'top';

      const fits: Record<Side, boolean> = {
        top: r.top >= h + GAP + PAD,
        bottom: vh - r.bottom >= h + GAP + PAD,
        left: r.left >= w + GAP + PAD,
        right: vw - r.right >= w + GAP + PAD,
      };
      const order = ORDERS[want] ?? ORDERS.top;
      const side = order.find((s) => fits[s]) ?? order[0];

      let x: number;
      let y: number;
      if (side === 'top' || side === 'bottom') {
        x = r.left + r.width / 2 - w / 2;
        y = side === 'top' ? r.top - h - GAP : r.bottom + GAP;
      } else {
        y = r.top + r.height / 2 - h / 2;
        x = side === 'left' ? r.left - w - GAP : r.right + GAP;
      }
      x = Math.min(Math.max(x, PAD), Math.max(PAD, vw - w - PAD));
      y = Math.min(Math.max(y, PAD), Math.max(PAD, vh - h - PAD));

      el.dataset.side = side;
      el.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;

      /* стрелка целится в середину элемента, но не вылезает за углы */
      if (side === 'top' || side === 'bottom') {
        ar.style.top = '';
        ar.style.left = Math.round(Math.min(Math.max(r.left + r.width / 2 - x, 12), w - 12)) + 'px';
      } else {
        ar.style.left = '';
        ar.style.top = Math.round(Math.min(Math.max(r.top + r.height / 2 - y, 12), h - 12)) + 'px';
      }
    }

    function show(target: HTMLElement) {
      const el = tip.current;
      if (!el || !txt.current) return;
      /* внутри открытого окна браузер рисует всё поверх страницы,
         поэтому подсказку перекладываем в само окно */
      const host = target.closest('dialog[open]') ?? document.body;
      if (el.parentNode !== host) host.appendChild(el);
      if (current.current && current.current !== target) {
        current.current.removeAttribute('aria-describedby');
      }
      txt.current.textContent = target.getAttribute('data-tip');
      place(target);
      el.dataset.show = '1';
      current.current = target;
      target.setAttribute('aria-describedby', 'tip');
    }

    function hide() {
      if (timer.current) window.clearTimeout(timer.current);
      const el = tip.current;
      if (!el || !current.current) return;
      el.dataset.show = '0';
      current.current.removeAttribute('aria-describedby');
      current.current = null;
    }

    function trigger(e: Event) {
      const t = e.target;
      return t instanceof Element ? (t.closest('[data-tip]') as HTMLElement | null) : null;
    }

    function onOver(e: MouseEvent) {
      const t = trigger(e);
      if (!t || t === current.current) return;
      if (timer.current) window.clearTimeout(timer.current);
      if (current.current) show(t); /* уже открыта — просто переезжает */
      else timer.current = window.setTimeout(() => show(t), DELAY);
    }

    function onOut(e: MouseEvent) {
      const t = trigger(e);
      if (!t) return;
      if (e.relatedTarget instanceof Node && t.contains(e.relatedTarget)) return;
      hide();
    }

    function onFocusIn(e: FocusEvent) {
      const t = trigger(e);
      if (timer.current) window.clearTimeout(timer.current);
      if (t) {
        if (t !== current.current) show(t);
      } else hide();
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') hide();
    }
    function onMove() {
      if (current.current) place(current.current);
    }

    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', hide);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onMove, true);
    window.addEventListener('resize', onMove);

    return () => {
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', hide);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onMove, true);
      window.removeEventListener('resize', onMove);
      box.remove();
    };
  }, []);

  return null;
}

/**
 * Значок подсказки сам по себе (.tip-mark): рядом с заголовком, в шапке
 * таблицы, в строке текста. В покое это просто значок — круг проступает
 * только под курсором.
 */
export function TipMark({ tip, label }: { tip: string; label: string }) {
  return (
    <button className="tip-mark" type="button" aria-label={label} data-tip={tip}>
      <Icon name="info" size="sm" />
    </button>
  );
}
