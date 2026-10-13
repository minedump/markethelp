'use client';

import { useEffect, useState } from 'react';
import { Choice } from '@/components/ui';
import { CHECKLIST, SECTIONS, TOTAL, type Section } from '@/content/checklist';

/**
 * Список к запуску: страница с галочками.
 *
 * Отметки живут в браузере того, кто читает, и больше нигде. Сервера
 * у сайта нет — он статический, — поэтому общего состояния быть и не
 * может; об этом сказано прямо на странице, чтобы никто не ждал, что
 * коллега увидит его галочки.
 *
 * Хранилище может быть недоступно — приватное окно, запрет на данные
 * сайта, — и тогда страница просто работает без памяти: читаем и
 * пишем через try/catch, и ни одна ошибка не роняет список.
 */

const KEY = 'markethelp-checklist-v1';

type Marks = Record<string, boolean>;

function readMarks(): Marks {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    /* Чужая или устаревшая запись не должна ломать страницу: берём
       только то, что похоже на наш объект. */
    return parsed && typeof parsed === 'object' ? (parsed as Marks) : {};
  } catch {
    return {};
  }
}

function writeMarks(marks: Marks) {
  try {
    localStorage.setItem(KEY, JSON.stringify(marks));
  } catch {
    /* память недоступна — отметки живут до перезагрузки, и это всё */
  }
}

/**
 * Единственная разметка в тексте пунктов — `код` в обратных кавычках.
 * Ссылок и начертаний здесь нет: список читают, а не ходят по нему.
 */
function Mono({ children }: { children: string }) {
  return (
    <>
      {children.split('`').map((part, i) =>
        i % 2 ? (
          <code key={i} className="rounded bg-surface px-1 py-0.5 text-[0.9em]">
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}

function Owner({ children }: { children: string }) {
  return <span className="font-semibold">{children}. </span>;
}

function Block({
  section,
  marks,
  toggle,
}: {
  section: Section;
  marks: Marks;
  toggle: (id: string, on: boolean) => void;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold sm:text-3xl">{section.title}</h2>

      {section.owner && (
        <p className="mt-2 text-sm text-ink/60">
          Весь раздел — <span className="font-semibold text-ink">{section.owner}</span>.
        </p>
      )}
      {section.note && <p className="mt-2 text-ink/70">{section.note}</p>}

      <ul className="mt-5 space-y-3">
        {section.items.map((item) => (
          <li key={item.id}>
            <Choice
              checked={Boolean(marks[item.id])}
              onChange={(e) => toggle(item.id, e.target.checked)}
            >
              <span className={marks[item.id] ? 'text-ink/45 line-through' : undefined}>
                {item.owner && <Owner>{item.owner}</Owner>}
                <Mono>{item.text}</Mono>
                {item.where && (
                  <span className="block text-sm text-ink/55 no-underline">{item.where}</span>
                )}
              </span>
            </Choice>
          </li>
        ))}
      </ul>

      {section.table && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-sm">
            <thead>
              <tr>
                {section.table.head.map((cell) => (
                  <th
                    key={cell}
                    className="border-b border-ink/15 px-3 py-2 text-left font-semibold"
                  >
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td key={i} className="border-b border-ink/10 px-3 py-2 align-top">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default function ChecklistPage() {
  const [marks, setMarks] = useState<Marks>({});
  /* До первой отрисовки в браузере хранилище недоступно, и страница
     должна совпасть с собранной — поэтому отметки появляются шагом
     позже, а счётчик до этого молчит. */
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMarks(readMarks());
    setReady(true);
  }, []);

  const toggle = (id: string, on: boolean) => {
    setMarks((prev) => {
      const next = { ...prev, [id]: on };
      if (!on) delete next[id];
      writeMarks(next);
      return next;
    });
  };

  const reset = () => {
    setMarks({});
    writeMarks({});
  };

  const done = Object.keys(marks).length;

  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <h1 className="text-3xl font-extrabold sm:text-4xl">{CHECKLIST.title}</h1>

      <p className="mt-3 text-sm text-ink/55">Обновлено {CHECKLIST.updated}</p>
      <p className="mt-5">{CHECKLIST.lead}</p>
      <p className="mt-2 text-ink/70">{CHECKLIST.storage}</p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <span className="font-semibold" aria-live="polite">
          {ready ? CHECKLIST.done(done, TOTAL) : `Пунктов: ${TOTAL}`}
        </span>
        {ready && done > 0 && (
          <button type="button" className="text-sm text-brand underline" onClick={reset}>
            {CHECKLIST.reset}
          </button>
        )}
      </div>

      {SECTIONS.map((section) => (
        <Block key={section.id} section={section} marks={marks} toggle={toggle} />
      ))}
    </main>
  );
}
