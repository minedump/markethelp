'use client';

import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Rich } from '@/components/Rich';
import { Button, Choice, FloatInput, FloatTextarea, PhoneInput } from '@/components/ui';
import { CONTACT_FORM } from '@/content/contacts';
import { FORM } from '@/content/form';
import { APP, ROUTES } from '@/content/site';

/**
 * Форма обратной связи на странице контактов.
 *
 * Полей четыре: имя, телефон, почта и свободная строка. Подробные
 * вопросы задаёт квиз в окне заявки — здесь человек пишет, а не
 * заполняет анкету.
 */
export function ContactForm() {
  const router = useRouter();

  function submit(e: FormEvent) {
    e.preventDefault();
    /* Отправлять пока некуда: приёмник появится вместе
       с app.markethelp.ru. До запуска форма ведёт на «Заявка принята».
       Перед запуском: слать данные на app и открывать «спасибо» только
       после удачного ответа, а на неудачу показывать тост. */
    if (!APP.ready) router.push(ROUTES.thanks);
  }

  return (
    <form className="grid gap-4 sm:grid-cols-2 items-start" onSubmit={submit}>
      <FloatInput label={CONTACT_FORM.name} type="text" name="name" autoComplete="name" />
      <PhoneInput label={CONTACT_FORM.phone} name="phone" />
      <FloatInput
        label={CONTACT_FORM.mail}
        type="email"
        name="mail"
        inputMode="email"
        autoComplete="email"
        wrapClassName="sm:col-span-2"
      />
      <FloatTextarea label={CONTACT_FORM.note} name="note" wrapClassName="sm:col-span-2" />
      <Choice className="sm:col-span-2" name="consent" defaultChecked required>
        <Rich>{FORM.consent}</Rich>
      </Choice>
      <div className="sm:col-span-2">
        <Button type="submit">{CONTACT_FORM.submit}</Button>
      </div>
    </form>
  );
}
