import { MARKETS } from '@/content/home';
import { asset } from '@/content/site';

/**
 * Полоса знаков площадок под первым экраном — во всю ширину и без полей
 * по краям: строка едет от края окна до края.
 *
 * Ряд уезжает ровно на половину своей длины, поэтому половина обязана
 * быть шире самого широкого экрана — иначе на большом мониторе в конце
 * строки открывается пустое место. Один набор — около 1430 пикселей,
 * поэтому наборов шесть: половина ряда получается больше четырёх тысяч.
 * Скорость от ширины экрана не зависит: длина ряда задана содержимым.
 *
 * Все наборы, кроме первого, служебные — чтобы чтение с экрана не
 * произносило список шесть раз.
 *
 * Отступ у полосы только сверху: снизу его даёт верхний отступ
 * следующего раздела, и они равны. Эти два числа ходят парой.
 */
const COPIES = 6;

function Row({ copy }: { copy: number }) {
  const dup = copy > 0;
  return (
    <>
      {MARKETS.map((m) =>
        m.pic ? (
          <img
            key={`${copy}-${m.title}`}
            src={asset(m.pic.replace(/\.svg$/, ''), 'svg')}
            alt={dup ? '' : m.title}
            className={`${m.size ?? 'h-7'} w-auto shrink-0`}
            aria-hidden={dup || undefined}
          />
        ) : (
          <span
            key={`${copy}-${m.title}`}
            className="text-[1.5rem] font-semibold shrink-0"
            aria-hidden={dup || undefined}
          >
            {m.title}
          </span>
        ),
      )}
    </>
  );
}

export function Marquee() {
  return (
    <div className="marquee pt-12">
      <div className="marquee-row">
        {Array.from({ length: COPIES }, (_, i) => (
          <Row key={i} copy={i} />
        ))}
      </div>
    </div>
  );
}
