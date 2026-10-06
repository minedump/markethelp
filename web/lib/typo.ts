/**
 * Типографика: неразрывные пробелы в текстах сайта.
 *
 * Перенос pricelist/typo.py — тот же набор правил, та же очерёдность.
 * Макет прошивал пробелы при сборке страницы, здесь это делает сам
 * текст: содержимое лежит в TS и проходит через typo() один раз при
 * загрузке модуля, поэтому править тексты можно обычными пробелами,
 * а на странице они встанут уже прошитыми.
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

/** короткие слова, за которыми пробел неразрывный */
const BEFORE =
  ('в во на и а но с со к ко о об обо от до по за из у не ни как что для при ' +
    'без под над про или то уж из-за из-под то есть').split(' ');

/** частицы, перед которыми пробел неразрывный */
const AFTER = 'же ли бы б'.split(' ');

/* слово начинается: после пробела, скобки, кавычки или дефиса */
const LEAD = '(?<![^\\s («„"\\-])';

const before = new RegExp(LEAD + '(' + BEFORE.join('|') + ') (?=[' + W.slice(1, -1) + '«„"(+\\-—–№\\d])', 'giu');
const after = new RegExp('(?<=[' + W.slice(1, -1) + '»)]) (' + AFTER.join('|') + ')(?=[\\s .,;:!?)»])', 'giu');
const dash = / (?=—)/g;
const range = /(?<=\d) – (?=\d)/g;
const thousands = /(?<=\d) (?=\d{3}(?!\d))/g;
const unit = new RegExp(
  '(?<=[\\d%]) (?=(?:₽|кг|г|т|м²|м³|м|см|мм|л|шт|ед|дн|дней|дня|день|час|часа|часов|мин|' +
    'рабоч|недел|мес|лет|год|года|SKU|единиц|артикул|%)(?!' + W + '))',
  'giu',
);
const timeRange = /(?<![\d:])(\d{1,2}[:.]\d{2}) (до|—|–|-) (\d{1,2}[:.]\d{2})/g;
const numPrefix = new RegExp(
  '(?<!' + W + ')(№|стр\\.|г\\.|ул\\.|д\\.|с\\.|п\\.|от|до|с|по|за|около|более|свыше|через|каждые) (?=\\d)',
  'giu',
);
const phone = /\+7 (\d{3}) (\d{3})/g;
const pct = /(?<=\d) %/g;

/** Прошить неразрывные пробелы в одной строке. */
export function typo(s: string): string {
  return s
    .replace(dash, NB)
    .replace(range, NB + '–' + NB)
    .replace(thousands, NB)
    .replace(pct, NB + '%')
    .replace(unit, NB)
    .replace(phone, '+7' + NB + '$1' + NB + '$2')
    .replace(timeRange, (_m, a, mid, b) => a + NB + mid + NB + b)
    .replace(numPrefix, (_m, p) => p + NB)
    .replace(before, (_m, w) => w + NB)
    .replace(after, (_m, w) => NB + w);
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
