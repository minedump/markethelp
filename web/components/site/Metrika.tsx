'use client';

import Script from 'next/script';
import { useConsent } from '@/lib/consent';
import { METRIKA, METRIKA_ON } from '@/content/site';

/**
 * Яндекс Метрика — тот же счётчик, что на действующем сайте.
 *
 * Включается переменной NEXT_PUBLIC_METRIKA=1 при сборке и по
 * умолчанию выключена: на тестовом домене её посещения попали бы
 * в ту же статистику, что и настоящие.
 *
 * Грузится только после «Принять все» на плашке cookie. Плашка
 * предлагает выбор, и выбор должен работать: Вебвизор записывает
 * сеанс целиком, и включать такое молчанием нельзя. Пока ответа нет
 * или выбраны «Только необходимые», счётчика на странице не
 * существует — ни скрипта, ни картинки-пикселя.
 *
 * Отсюда следствие, про которое надо помнить, глядя в статистику:
 * Метрика видит не всех посетителей, а тех, кто согласился.
 *
 * Скрипт грузится после страницы: счётчик не должен задерживать
 * то, ради чего человек пришёл. Вебвизор и карта кликов включены —
 * без них от Метрики остаётся один счётчик посещений.
 */
export function Metrika() {
  const consent = useConsent();

  if (!METRIKA_ON || consent !== 'all') return null;

  return (
    <Script id="metrika" strategy="afterInteractive">
      {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(${METRIKA}, "init", {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true
        });`}
    </Script>
  );
}
