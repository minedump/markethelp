/**
 * Типографика: неразрывные пробелы в текстах сайта.
 *
 * Перенос pricelist/typo.py — тот же набор правил, та же очерёдность.
 * Макет прошивал пробелы при сборке страницы, здесь это делает сам
 * текст: содержимое лежит в TS и проходит через typo() один раз при
 * загрузке модуля, поэтому править тексты можно обычными пробелами,
 * а на странице они встанут уже прошитыми.
 *
 * Ретроспективных проверок (?<=…) здесь нет намеренно. Содержание
 * попадает и в клиентскую сборку — его тянут за собой шапка и формы, —
 * а Safari научился им только в 16.4; на айфоне постарше такой шаблон
 * не разбирается вовсе, и страница падает целиком ещё до отрисовки.
 * Вместо них правила смотрят на предыдущий знак сами, по его месту
 * в строке: поведение то же, а разбирается везде.
 *
 * Правила:
 *  - предлоги и союзы из одной-трёх букв не остаются в конце строки;
 *    цепочка «и в», «а не» прошивается целиком;
 *  - частицы «же», «ли», «бы», «б» прижаты к слову слева;
 *  - тире не начинает строку;
 *  - число не отрывается от единицы («55 ₽», «25 кг»), разряды тысяч
 *    («5 000») и диапазоны («1 – 5 кг») держатся вместе;
 *  - «№ 152», «стр. 22», «г. Подольск» и телефон не разрываются;
 *  - диапазон времени «с 9:00 до 21:00» не рвётся целиком.
 */
const NB = ' ';

/* В JS \w — только латиница, поэтому буква везде пишется явно. */
const W = '[\\p{L}\\p{N}_]';
const WORD = /[\p{L}\p{N}_]/u;

/** короткие слова, за которыми пробел неразрывный */
const BEFORE =
  ('в во на и а но с со к ко о об обо от до по за из у не ни как что для при ' +
    'без под над про или то уж из-за из-под то есть').split(' ');

/** частицы, перед которыми пробел неразрывный */
const AFTER = 'же ли бы б'.split(' ');

/* слово начинается: в начале строки либо после пробела, скобки,
   кавычки или дефиса */
const OPENS = /[\s («„"-]/;

const before = new RegExp('(' + BEFORE.join('|') + ') (?=[' + W.slice(1, -1) + '«„"(+\\-—–№\\d])', 'giu');
const after = new RegExp(' (' + AFTER.join('|') + ')(?=[\\s .,;:!?)»])', 'giu');
const afterPrev = /[\p{L}\p{N}_»)]/u;
const dash = / (?=—)/g;
const range = /(\d) – (?=\d)/g;
const thousands = /(\d) (?=\d{3}(?!\d))/g;
const unit = new RegExp(
  '([\\d%]) (?=(?:₽|кг|г|т|м²|м³|м|см|мм|л|шт|ед|дн|дней|дня|день|час|часа|часов|мин|' +
    'рабоч|недел|мес|лет|год|года|SKU|единиц|артикул|%)(?!' + W + '))',
  'giu',
);
const timeRange = /(\d{1,2}[:.]\d{2}) (до|—|–|-) (\d{1,2}[:.]\d{2})/g;
const numPrefix = new RegExp(
  '(№|стр\\.|г\\.|ул\\.|д\\.|с\\.|п\\.|от|до|с|по|за|около|более|свыше|через|каждые) (?=\\d)',
  'giu',
);
const phone = /\+7 (\d{3}) (\d{3})/g;
const pct = /(\d) %/g;

/** знак перед найденным куском — или пусто, если кусок в начале строки */
const prevChar = (s: string, at: number) => (at > 0 ? s[at - 1] : '');

/** Прошить неразрывные пробелы в одной строке. */
export function typo(s: string): string {
  return s
    .replace(dash, NB)
    .replace(range, (_m, d: string) => d + NB + '–' + NB)
    .replace(thousands, (_m, d: string) => d + NB)
    .replace(pct, (_m, d: string) => d + NB + '%')
    .replace(unit, (_m, d: string) => d + NB)
    .replace(phone, '+7' + NB + '$1' + NB + '$2')
    /* время: «9:00 до 21:00» целиком, но только если слева не цифра
       и не двоеточие — иначе зацепим кусок более длинной записи */
    .replace(timeRange, (m, a: string, mid: string, b: string, at: number, str: string) => {
      const p = prevChar(str, at);
      return /[\d:]/.test(p) ? m : a + NB + mid + NB + b;
    })
    /* «№ 152», «д. 4»: перед сокращением не должно быть буквы */
    .replace(numPrefix, (m, w: string, at: number, str: string) =>
      WORD.test(prevChar(str, at)) ? m : w + NB)
    /* предлог не повисает в конце строки */
    .replace(before, (m, w: string, at: number, str: string) => {
      const p = prevChar(str, at);
      return p === '' || OPENS.test(p) ? w + NB : m;
    })
    /* частица прижата к слову слева */
    .replace(after, (m, w: string, at: number, str: string) =>
      afterPrev.test(prevChar(str, at)) ? NB + w : m);
}

/**
 * Прошить всё содержимое разом: строки внутри объектов, массивов и
 * кортежей. Ссылки, адреса и значения, которые не текст, остаются как
 * есть — их узнаём по виду (href, url, src, id, icon, slug, tel, mail).
 */
const SKIP = /^(href|url|src|id|icon|slug|value|pic|file|tel|mail|anchor|rubric)$/;

export function typoDeep<T>(data: T): T {
  if (typeof data === 'string') return typo(data) as unknown as T;
  if (Array.isArray(data)) return data.map((v) => typoDeep(v)) as unknown as T;
  if (data && typeof data === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
      out[k] = SKIP.test(k) ? v : typoDeep(v);
    }
    return out as T;
  }
  return data;
}
