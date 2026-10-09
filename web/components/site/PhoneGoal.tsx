'use client';

import { useEffect } from 'react';
import { goal } from '@/lib/goal';
import { GOALS } from '@/content/site';

/**
 * Звонок как цель Метрики.
 *
 * Номер стоит в шапке, в меню, в подвале и на двух страницах, и ещё
 * будет появляться дальше. Вешать обработчик на каждую такую ссылку
 * значит делать клиентским каждый блок, где она встретилась, — ради
 * одной строки аналитики. Поэтому слушаем нажатия один раз на всю
 * страницу и узнаём ссылку по самому адресу: tel: ни для чего другого
 * не используется.
 *
 * Раскрытие номера считает сама кнопка в шапке: это не переход
 * по ссылке, и поймать его здесь нечем.
 */
export function PhoneGoal() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.closest('a[href^="tel:"]')) goal(GOALS.phoneCall);
    };
    /* на перехвате: обработчик сработает даже если нажатие
       остановят по дороге наверх */
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
