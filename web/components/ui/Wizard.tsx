'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Icon } from '@/components/Icon';
import { Button } from './Button';
import { Modal } from './Modal';

/**
 * Заявка в несколько шагов.
 *
 * Когда полей больше трёх — шаги, а не длинное окно. На каждом шаге не
 * больше четырёх полей, полоска сверху показывает, сколько осталось,
 * а «Назад» возвращает без потери введённого. Порядок шагов — от лёгкого
 * к личному: сначала про товар, потом про схему, контакты в конце, когда
 * человек уже вложился в ответы. Кнопка «Отправить» появляется вместо
 * «Дальше» только на последнем шаге.
 *
 * Закрытое окно возвращается на первый шаг: заявку начинают заново,
 * а не с середины прошлой.
 */
export type WizardStep = {
  /** короткое название шага — оно же в подписи «Шаг 1 из 3 — Товар» */
  title: string;
  content: ReactNode;
};

type Props = {
  open: boolean;
  onClose: () => void;
  /** заголовок окна */
  title: ReactNode;
  steps: WizardStep[];
  submitLabel?: string;
  onSubmit?: () => void;
};

export function Wizard({
  open,
  onClose,
  title,
  steps,
  submitLabel = 'Отправить заявку',
  onSubmit,
}: Props) {
  const [step, setStep] = useState(0);
  const last = steps.length - 1;

  useEffect(() => {
    if (!open) setStep(0);
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      /* Окно в несколько шагов всегда широкое, 38rem: на шаге со схемой
         стоят три карточки выбора в ряд и площадки в две колонки —
         в обычные 28rem они не встают. Так же оно задано и в ките. */
      wide
      footer={
        <>
          {/* «Назад» уводится влево, иначе на первом шаге «Дальше»
              съезжает с правого края, где её ждут */}
          {step > 0 ? (
            <Button variant="quiet" className="mr-auto" onClick={() => setStep(step - 1)}>
              <Icon name="arrow-left" />
              Назад
            </Button>
          ) : null}
          {step < last ? (
            <Button onClick={() => setStep(step + 1)}>
              Дальше
              <Icon name="arrow-right" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                onSubmit?.();
                onClose();
              }}
            >
              {submitLabel}
            </Button>
          )}
        </>
      }
    >
      <div className="wiz-bar" aria-hidden="true">
        {steps.map((s, i) => (
          <span key={s.title} data-done={i <= step ? '1' : '0'} />
        ))}
      </div>
      <p className="wiz-cap" aria-live="polite">
        {`Шаг ${step + 1} из ${steps.length} — ${steps[step]?.title ?? ''}`}
      </p>

      {/* шаги остаются в разметке: введённое не теряется при возврате */}
      {steps.map((s, i) => (
        <div key={s.title} className="grid gap-4 items-start mt-5" hidden={i !== step}>
          {s.content}
        </div>
      ))}
    </Modal>
  );
}
