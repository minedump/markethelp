'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Rich } from '@/components/Rich';
import { Choice, FileDrop, FloatInput, PhoneInput, Pick, Select, Wizard } from '@/components/ui';
import { FORM } from '@/content/form';
import { APP, ROUTES } from '@/content/site';

/**
 * Окно заявки — одно на весь сайт.
 *
 * Кнопок, которые его открывают, много: первый экран, призыв перед
 * подвалом, страницы услуг и тарифов. Держать на каждой странице свою
 * копию формы незачем — окно живёт в раскладке, а страницы зовут его
 * через useRequest().
 */
const Ctx = createContext<(() => void) | null>(null);

export function useRequest() {
  const open = useContext(Ctx);
  if (!open) throw new Error('useRequest: нет RequestProvider — он стоит в раскладке');
  return open;
}

function opts(list: readonly string[]) {
  return list.map((title) => ({ value: title, title }));
}

export function RequestProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const show = useMemo(() => () => setOpen(true), []);

  function submit() {
    /* Отправлять пока некуда: приёмник заявок появится вместе
       с app.markethelp.ru. До запуска окно просто ведёт на страницу
       «Заявка принята» — чтобы путь был виден целиком.
       Перед запуском: отправить данные на app и открывать «спасибо»
       только после удачного ответа, а на неудачу показывать тост. */
    if (!APP.ready) {
      router.push(ROUTES.thanks);
      return;
    }
  }

  return (
    <Ctx.Provider value={show}>
      {children}
      <Wizard
        open={open}
        onClose={() => setOpen(false)}
        title={FORM.title}
        submitLabel={FORM.submit}
        onSubmit={submit}
        steps={[
          {
            title: FORM.steps.goods,
            content: (
              <>
                <Select label={FORM.niche.label} options={opts(FORM.niche.options)} />
                <Select label={FORM.volume.label} options={opts(FORM.volume.options)} />
                <div>
                  <Select label={FORM.unit.label} options={opts(FORM.unit.options)} />
                </div>
                <div className="field">
                  <p className="font-semibold text-ink m-0">{FORM.operations.label}</p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {FORM.operations.options.map((o) => (
                      <Choice
                        key={o}
                        name="operation"
                        defaultChecked={FORM.operations.checked.includes(o)}
                      >
                        {o}
                      </Choice>
                    ))}
                  </div>
                </div>
              </>
            ),
          },
          {
            title: FORM.steps.scheme,
            content: (
              <>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))] gap-3">
                  {FORM.scheme.options.map((s, i) => (
                    <Pick
                      key={s.title}
                      name="scheme"
                      defaultChecked={i === 0}
                      title={s.title}
                      note={s.note}
                    />
                  ))}
                </div>
                <div className="field">
                  <p className="font-semibold text-ink m-0">{FORM.markets.label}</p>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {FORM.markets.options.map((m) => (
                      <Choice key={m} name="market" defaultChecked={FORM.markets.checked.includes(m)}>
                        {m}
                      </Choice>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <p className="font-semibold text-ink m-0">{FORM.from.label}</p>
                  <div className="grid gap-2.5">
                    {FORM.from.options.map((f, i) => (
                      <Choice key={f} type="radio" name="from" defaultChecked={i === 0}>
                        {f}
                      </Choice>
                    ))}
                  </div>
                </div>
              </>
            ),
          },
          {
            title: FORM.steps.contacts,
            content: (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FloatInput label={FORM.name.label} type="text" autoComplete="name" />
                  <PhoneInput label={FORM.phone.label} />
                </div>
                <FloatInput
                  label={FORM.mail.label}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                />
                <FileDrop title={FORM.files.title} hint={FORM.files.hint} />
                <Choice defaultChecked>
                  <Rich>{FORM.consent}</Rich>
                </Choice>
              </>
            ),
          },
        ]}
      />
    </Ctx.Provider>
  );
}
