import Script from 'next/script';
import { METRIKA, METRIKA_ON } from '@/content/site';

/**
 * Яндекс Метрика — тот же счётчик, что на действующем сайте.
 *
 * Включается переменной NEXT_PUBLIC_METRIKA=1 при сборке и по
 * умолчанию выключена: на тестовом домене её посещения попали бы
 * в ту же статистику, что и настоящие.
 *
 * Скрипт грузится после страницы: счётчик не должен задерживать
 * то, ради чего человек пришёл. Вебвизор и карта кликов включены —
 * без них от Метрики остаётся один счётчик посещений.
 */
export function Metrika() {
  if (!METRIKA_ON) return null;

  return (
    <>
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
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${METRIKA}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
