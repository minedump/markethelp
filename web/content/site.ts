import type { IconName } from '@/components/Icon';
import { typoDeep } from '@/lib/typo';

/**
 * Сайт целиком: организация, адреса страниц и навигация.
 *
 * Маршруты живут здесь, а не строками по месту: ссылки стоят в шапке,
 * подвале, крошках, правовых текстах и списке документов — и когда
 * адрес меняется, менять его нужно в одном месте.
 */

export const ORG = {
  /** как компания называется на сайте */
  name: 'MarketHelp',
  /** юридическое лицо — для правовых текстов и реквизитов */
  legal: 'ООО «КРАФТ ОПТ»',
  inn: '7708313243',
  ogrn: '1177746288147',
  /** домен без протокола: подставляется в метаданные и в правовые тексты */
  host: 'markethelp.ru',
  site: 'https://markethelp.ru',
} as const;

/**
 * Телефон один на весь сайт. До нажатия он показан не полностью:
 * нажатие и есть событие для аналитики — по нему считается, сколько
 * человек дошли до звонка. В скрытой части нет и разделителей: чёрточки
 * подсказывали бы, сколько цифр за ними. Тем, кто читает с экрана,
 * номер доступен сразу — он в подписи ссылки.
 */
export const PHONE = {
  /** как показываем целиком */
  title: '+7 495 955-18-79',
  href: 'tel:+74959551879',
  /** видимая часть до нажатия */
  head: '+7 495 955',
} as const;

export const MAIL = {
  title: 'info@markethelp.ru',
  href: 'mailto:info@markethelp.ru',
} as const;

/** Склад: адрес ведёт на маршрут в Яндекс Картах, а не на точку. */
export const WAREHOUSE = {
  title: 'Москва, Котляковская улица, 6с3',
  full: '115201, Москва, Котляковская улица, 6с3',
  href: 'https://yandex.ru/maps/?mode=routes&rtext=~%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D1%83%D0%BB%D0%B8%D1%86%D0%B0%20%D0%9A%D0%BE%D1%82%D0%BB%D1%8F%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%2C%206%D1%813&rtt=auto',
  hours: 'Ежедневно с 9:00 до 21:00',
} as const;

/**
 * Адрес, от которого считаются канонические ссылки, карта сайта и
 * картинка для мессенджеров. На тестовом домене он задаётся
 * переменной NEXT_PUBLIC_SITE_URL при сборке — иначе поисковик
 * увидит в разметке боевой адрес и склеит тестовый с ним.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? ORG.site;

/**
 * Яндекс Метрика с действующего сайта. Google Analytics не переносим.
 *
 * Счётчик включается переменной NEXT_PUBLIC_METRIKA=1 и по умолчанию
 * выключен: на тестовом домене его посещения попали бы в ту же
 * статистику, что и настоящие, и испортили бы её.
 */
export const METRIKA = 66434122;
export const METRIKA_ON = process.env.NEXT_PUBLIC_METRIKA === '1';

/**
 * Цели Метрики. Имена заданы здесь, чтобы те же строки стояли в коде
 * и в интерфейсе счётчика: в Метрике их нужно завести как JS-цели
 * с этими идентификаторами.
 *
 * Два события про телефон, а не одно: раскрытие номера говорит
 * об интересе, нажатие на сам номер — о звонке. Между ними отваливается
 * заметная часть людей, и мерить их одним событием значит не узнать,
 * где именно.
 *
 * Заявку целью не заводим: «Заявка принята» — отдельный адрес,
 * и цель на посещение страницы надёжнее любого события.
 */
export const GOALS = {
  phoneReveal: 'phone-reveal',
  phoneCall: 'phone-call',
} as const;

/**
 * Личный кабинет живёт на своём поддомене и запускается позже сайта.
 * Пока ready: false, кнопка входа скрыта и заявка никуда не уходит —
 * приёмник появится вместе с кабинетом.
 */
export const APP = {
  href: 'https://app.markethelp.ru/',
  ready: false,
} as const;

export const ROUTES = {
  home: '/',
  services: '/services/',
  tariffs: '/tariffs/',
  marketplaces: '/marketplaces/',
  china: '/china/',
  warehouse: '/warehouse/',
  about: '/about/',
  start: '/start/',
  terms: '/terms/',
  contacts: '/contacts/',
  documents: '/documents/',
  requisites: '/requisites/',
  blog: '/blog/',
  thanks: '/thanks/',
  policy: '/policy/',
  consent: '/consent/',
  offer: '/offer/',
} as const;

/**
 * Картинки макета лежат рядом с сайтом, в public/assets. В содержании
 * хранится только имя — путь собирается здесь, чтобы при переезде
 * картинок правилась одна строка.
 */
export function asset(name: string, ext = 'jpg') {
  return `/assets/${name}.${ext}`;
}

export type NavLink = { title: string; href: string; icon?: IconName; external?: boolean };

/**
 * Шапка. Пунктов четыре: они не переносятся, а «Как начать» в две
 * строки задирает шапку и ломает ряд. Остальные разделы — в подвале,
 * он стоит на всех страницах, и в нём есть всё, чего нет в шапке.
 */
export const NAV_MAIN: NavLink[] = typoDeep([
  { title: 'Услуги', href: ROUTES.services },
  { title: 'Тарифы', href: ROUTES.tariffs },
  { title: 'Маркетплейсы', href: ROUTES.marketplaces },
  { title: 'Контакты', href: ROUTES.contacts },
]);

export const FOOT_COLUMNS: { title: string; links: NavLink[] }[] = typoDeep([
  {
    title: 'Услуги',
    links: [
      { title: 'Все услуги', href: ROUTES.services },
      { title: 'Тарифы', href: ROUTES.tariffs },
      { title: 'Работа с маркетплейсами', href: ROUTES.marketplaces },
      { title: 'Фулфилмент в Китае', href: ROUTES.china },
      { title: 'Склад', href: ROUTES.warehouse },
    ],
  },
  {
    title: 'Компания',
    links: [
      { title: 'О компании', href: ROUTES.about },
      { title: 'Как начать работать', href: ROUTES.start },
      { title: 'Условия работы', href: ROUTES.terms },
      { title: 'Блог', href: ROUTES.blog },
      { title: 'Контакты', href: ROUTES.contacts },
    ],
  },
  {
    title: 'Связаться',
    links: [
      { title: PHONE.title, href: PHONE.href, icon: 'phone' },
      { title: MAIL.title, href: MAIL.href, icon: 'message' },
      { title: WAREHOUSE.title, href: WAREHOUSE.href, icon: 'warehouse', external: true },
    ],
  },
]);

export const FOOT_LEGAL: NavLink[] = typoDeep([
  { title: 'Договор и оферта', href: ROUTES.offer },
  { title: 'Политика обработки данных', href: ROUTES.policy },
  { title: 'Согласие на обработку ПД', href: ROUTES.consent },
  { title: 'Реквизиты', href: ROUTES.requisites },
]);

/**
 * Год копирайта — числом, а не из даты в браузере: страница собрана
 * заранее, и вычисленный на лету год разошёлся бы с тем, что в HTML.
 * Меняется раз в год вместе с правовыми текстами.
 */
export const COPYRIGHT = `${ORG.name} © 2026`;

/**
 * Текст плашки cookie. Ссылка внутри абзаца пишется как [текст](/адрес)
 * и разворачивается при отрисовке — так же, как в правовых текстах.
 */
export const COOKIE_TEXT: string = typoDeep(
  'Сайт использует cookie: без них не работают формы и кабинет, а аналитика помогает ' +
    'понять, что читают. Как храним данные — в [политике](/policy/).',
);
