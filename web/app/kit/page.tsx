'use client';

import { useState } from 'react';
import { Icon, Logo, type IconName } from '@/components/Icon';
import {
  Accordion,
  Bento,
  Button,
  Card,
  CardTitle,
  Chip,
  Choice,
  CookieBanner,
  Crumbs,
  Field,
  FileDrop,
  FloatInput,
  FloatTextarea,
  Footer,
  Glow,
  LinkGo,
  Menu,
  Modal,
  Note,
  Notifications,
  OnBrand,
  OnInk,
  Pager,
  PhoneInput,
  Pick,
  Scroller,
  Search,
  Select,
  Steps,
  Swipe,
  Switch,
  Table,
  Tabs,
  Tags,
  Text,
  TextLink,
  TipMark,
  Toast,
  useToast,
  Wizard,
} from '@/components/ui';

/**
 * Витрина кита: те же образцы, что в kit/markethelp-ui-kit.html, но
 * собранные из компонентов. Нужна для двух проверок — что перенос
 * ничего не потерял и что элемент из кита работает в сборке.
 *
 * Подложки разделов, их заголовки и пояснения под примерами — это
 * витрина, а не кит: на страницы сайта они не переносятся.
 */
function Section({ no, title, lede, children }: {
  no: string;
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-11">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-semibold text-[0.8125rem] text-ink-mute tabular-nums">{no}</span>
        <h2 className="t-h3 tracking-tight m-0">{title}</h2>
      </div>
      {lede ? <p className="lede">{lede}</p> : null}
      {children}
    </section>
  );
}

function Sheet({ title, className, children }: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={['sheet', className].filter(Boolean).join(' ')}>
      <CardTitle>{title}</CardTitle>
      {children}
    </div>
  );
}

const ICONS: IconName[] = [
  'package', 'packages', 'barcode', 'warehouse', 'return', 'world', 'clipboard', 'photo',
  'truck', 'ship', 'plane', 'building-store', 'shopping-cart', 'coins', 'list-check', 'loader',
  'file', 'video', 'user', 'send', 'phone', 'message', 'bell', 'search',
  'upload', 'download', 'calculator', 'trash', 'menu', 'x', 'check', 'checks',
  'chevron-down', 'chevron-right', 'arrow-left', 'arrow-right', 'clock', 'info', 'circle-check', 'alert-triangle',
];

const NICHES = [
  { value: 'clothes', title: 'Одежда и текстиль' },
  { value: 'tech', title: 'Техника и электроника' },
  { value: 'fragile', title: 'Хрупкое: посуда, косметика, декор' },
  { value: 'big', title: 'Крупногабарит: мебель, инструмент' },
  { value: 'other', title: 'Другое' },
];

const VOLUMES = [
  { value: 'small', title: 'до 500 единиц' },
  { value: 'mid', title: '500 – 5 000' },
  { value: 'big', title: 'больше 5 000' },
];

const UNITS = [
  { value: 'light', title: 'до 1 кг, до 30 см' },
  { value: 'mid', title: '1 – 5 кг' },
  { value: 'heavy', title: '5 – 25 кг' },
  { value: 'over', title: 'свыше 25 кг' },
];

const MARKETS = [
  'Wildberries', 'OZON', 'Яндекс Маркет', 'Мегамаркет',
  'AliExpress', 'Lamoda', 'ВсеИнструменты',
];

const SERVICES = [
  'Приёмка груза', 'Проверка на брак', 'Сверка размерников', 'Маркировка «Честный знак»',
  'Двойной код «Честный знак»', 'Комплектация', 'Копакинг и промо-наборы', 'Запайка в рукав',
  'Термоусадка', 'Упаковка в зип-лок', 'Хранение', 'Обработка возвратов',
  'Забор от поставщика', 'Забор с ПВЗ', 'Доставка на маркетплейсы', 'Доставка в розницу',
  'Паллетирование', 'Инвентаризация', 'Фото товара', 'Замеры одежды',
];

export default function KitPage() {
  const toast = useToast();
  const [confirm, setConfirm] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <div className="bg-surface min-h-screen pb-20">
      <div className="max-w-[60rem] mx-auto px-5 pt-8">

        <header className="flex flex-wrap items-end justify-between gap-6 pb-2">
          <span className="flex flex-col gap-4">
            <Logo className="w-[9.5rem] h-[5.25rem] shrink-0 text-brand" />
            <Text as="h1" variant="h1" className="text-[clamp(1.9rem,5vw,2.6rem)] leading-tight text-balance">
              UI-кит в сборке
            </Text>
          </span>
          <span className="flex gap-2 pb-2">
            <span className="w-11 h-11 rounded-full bg-brand" />
            <span className="w-11 h-11 rounded-full bg-jade" />
            <span className="w-11 h-11 rounded-full bg-sun" />
            <span className="w-11 h-11 rounded-full bg-ink" />
          </span>
        </header>

        <Note className="mt-8" title="Это та же витрина, что в ките.">
          Каждый образец собран из компонента: если он здесь выглядит как в ките, перенос
          ничего не потерял. Подложки разделов и пояснения под примерами на сайт не идут.
        </Note>

        {/* ============ ТИПОГРАФИКА ============ */}
        <Section no="01" title="Шрифт" lede="Manrope, пять начертаний. Размер задаёт ступень, а тег выбирается по месту.">
          <Sheet title="Иерархия">
            <div className="flex flex-col gap-3">
              <Text variant="display" as="p">Один склад на все площадки</Text>
              <Text variant="display-sm" as="p">Услуги фулфилмента</Text>
              <Text variant="h1" as="p">Заголовок страницы</Text>
              <Text variant="h2" as="p">Заголовок раздела</Text>
              <Text variant="h3" as="p">Заголовок блока</Text>
              <Text variant="h4" as="p">Подзаголовок</Text>
              <Text variant="lead">Подводка под заголовком: одна-две строки о том, что внутри.</Text>
              <Text variant="small">Пояснение мелким: сноска, подпись, уточнение.</Text>
              <p className="t-small">
                а внутри текста работает <TextLink href="#">обычная ссылка</TextLink>
              </p>
            </div>
          </Sheet>
        </Section>

        {/* ============ ИКОНКИ ============ */}
        <Section no="02" title="Иконки" lede="Один спрайт в разметке страницы, значок красится currentColor.">
          <Sheet title="Набор для сайта">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] gap-2">
              {ICONS.map((n) => (
                <span key={n} className="icon-cell">
                  <Icon name={n} />
                  {n}
                </span>
              ))}
            </div>
          </Sheet>
        </Section>

        {/* ============ КНОПКИ ============ */}
        <Section no="03" title="Кнопки" lede="Одна основная кнопка на экран. Вторичная — для действия рядом с основным, тихая — для служебного.">
          <Sheet title="Виды">
            <div className="flex flex-wrap items-center gap-3">
              <Button icon={false}><Icon name="calculator" />Получить расчёт</Button>
              <Button variant="jade"><Icon name="phone" />Оставить заявку</Button>
              <Button variant="sun"><Icon name="download" />Скачать прайс</Button>
              <Button variant="secondary">Все услуги</Button>
              <Button variant="quiet">Сравнить схемы</Button>
              <Button variant="soft">Мягкая</Button>
              <Button variant="danger"><Icon name="trash" />Удалить поставку</Button>
            </div>
            <p className="why mt-4">
              Синяя, бирюзовая и жёлтая — равные по силе, но разные по смыслу: расчёт, заявка,
              скачивание. Вместе на одном экране появляются максимум две.
            </p>
          </Sheet>

          <Sheet title="Три высоты на всё" className="mt-4">
            <div className="flex flex-wrap items-center gap-3">
              <Search size="lg" wrapClassName="flex-1 min-w-[14rem]" placeholder="Найти услугу" />
              <Select className="w-52" label="Площадка" options={[
                { value: 'all', title: 'Все площадки' },
                { value: 'wb', title: 'Wildberries' },
                { value: 'ozon', title: 'OZON' },
              ]} />
              <Button size="lg">Найти</Button>
              <Button size="lg" variant="quiet" icon aria-label="Сбросить"><Icon name="x" /></Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <Search size="sm" wrapClassName="w-52" placeholder="Найти" />
              <Button size="sm">Мелкая — 2.25rem</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <Search wrapClassName="w-56" />
              <Button>Средняя — 2.75rem</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <FloatInput label="Услуга" defaultValue="Приёмка паллеты" wrapClassName="w-56" />
              <Button size="lg">Крупная — 3.25rem</Button>
            </div>
          </Sheet>

          <Sheet title="Состояния" className="mt-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Обычная</Button>
              <Button data-state="hover">Наведение</Button>
              <Button data-state="press">Нажатие</Button>
              <Button className="shadow-ring">Фокус с клавиатуры</Button>
              <Button disabled>Недоступна</Button>
              <Button><Icon name="loader" className="animate-spin" />Отправляем…</Button>
            </div>
          </Sheet>

          <Sheet title="На фирменном синем" className="mt-4">
            <OnBrand className="rounded-card p-6">
              <Text variant="h3" as="h4">Услуги по размещению товаров</Text>
              <Text variant="small" className="mt-1.5">Шапка и первый экран сайта стоят на этом синем.</Text>
              <div className="flex flex-wrap items-center gap-3 mt-5">
                <Button variant="jade">Оставить заявку</Button>
                <Button variant="secondary">Смотреть тарифы</Button>
                <LinkGo href="#" arrow>Подробнее</LinkGo>
              </div>
            </OnBrand>
          </Sheet>

          <Sheet title="На фирменном чёрном" className="mt-4">
            <OnInk className="rounded-card p-6">
              <Text variant="h3" as="h4">Один склад на все площадки</Text>
              <Text variant="small" className="mt-1.5">Чёрным начинается страница и им же разделяются белые разделы.</Text>
              <div className="flex flex-wrap items-center gap-3 mt-5">
                <Button variant="jade">Оставить заявку</Button>
                <Button variant="secondary">Смотреть тарифы</Button>
                <LinkGo href="#" arrow>Подробнее</LinkGo>
              </div>
            </OnInk>
          </Sheet>
        </Section>

        {/* ============ ПЛИТКИ ============ */}
        <Section no="04" title="Плитки и свечение">
          <Sheet title="Светлая плитка с подсветкой">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['Приёмка', '3', 'вида тары: паллета, мешок, короб'],
                ['Хранение', '1', 'остаток на семь площадок сразу'],
                ['Отгрузка', '2', 'модели с одного склада: FBO и FBS'],
              ].map(([head, num, note]) => (
                <Bento key={head}>
                  <p className="t-h4 text-brand m-0">{head}</p>
                  <p className="t-display-sm mt-4 m-0">{num}</p>
                  <p className="t-small mt-2 m-0">{note}</p>
                </Bento>
              ))}
            </div>

            <Bento wide className="mt-4">
              <Text variant="h3" as="h4" className="m-0">Одежда и текстиль</Text>
              <Text variant="small" className="mt-2 m-0 max-w-[42rem]">
                Плитка во всю ширину полосы: пятен нет вовсе — на такой ширине они перестают
                читаться как свет. Широкой плитке хватает подложки.
              </Text>
            </Bento>

            <Swipe cols="sm:grid-cols-2" className="mt-4">
              <Bento wide>
                <Text variant="h3" as="h3" className="m-0 text-ink-mute">Пока склад свой</Text>
                <Text variant="small" className="mt-3">
                  Остаток разложен по складам разных площадок, и часть его месяцами лежит без движения.
                </Text>
              </Bento>
              <Bento>
                <Text variant="h3" as="h3" className="m-0">С фулфилментом</Text>
                <Text variant="small" className="mt-3">
                  Один остаток на все площадки: отгружаем оттуда, где он есть.
                </Text>
              </Bento>
            </Swipe>
            <p className="why mt-5">
              <b>Две плитки рядом на узком экране едут вбок, а не встают друг под друга.</b> Сузьте
              окно, чтобы увидеть полосу с привязкой.
            </p>
          </Sheet>

          <Sheet title="Чёрный блок с подсветкой" className="mt-4">
            <Glow className="px-6 py-12 sm:px-12 sm:py-16 text-center">
              <Text variant="display-sm" as="h3" className="text-balance">Один склад на все площадки</Text>
              <Text variant="lead" className="mt-4 max-w-[34rem] mx-auto text-balance">
                Приёмка, проверка, маркировка, упаковка, хранение и отгрузка — от поставщика
                до полки маркетплейса.
              </Text>
              <Button size="lg" variant="jade" className="mt-8">Посчитать мою партию</Button>
            </Glow>
            <p className="why mt-5">
              <b>Для одного блока на странице.</b> Приём держится на том, что он один.
            </p>
          </Sheet>
        </Section>

        {/* ============ ПОЛЯ ============ */}
        <Section no="05" title="Поля ввода" lede="Подпись живёт внутри поля, поэтому такие поля всегда крупные — 3.25rem.">
          <Sheet title="Поиск с очисткой">
            <Search placeholder="Найти услугу или тариф" />
          </Sheet>

          <Sheet title="Поля формы" className="mt-4">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] items-start gap-4">
              <FloatInput label="Имя" type="text" />
              <Field hint="Перезвоним в течение часа">
                <PhoneInput />
              </Field>
              <FloatInput label="Компания" defaultValue="ООО «Ромашка»" />
              <Field error="Проверьте адрес — не хватает домена">
                <FloatInput label="Почта" type="email" defaultValue="ivanov@" invalid />
              </Field>
              <Select label="Маркетплейс" options={[
                { value: 'wb', title: 'Wildberries' },
                { value: 'ozon', title: 'OZON' },
                { value: 'ym', title: 'Яндекс Маркет' },
                { value: 'many', title: 'Несколько площадок' },
              ]} />
              <Field hint="Подставится из карточки организации">
                <FloatInput label="ИНН" defaultValue="7736207543" disabled />
              </Field>
              <FloatInput
                label="Штрихкод"
                defaultValue="4630123456789"
                tip="EAN-13: тринадцать цифр без пробелов. Если своего нет — выдаём наш."
                tipLabel="Что такое штрихкод"
              />
              <FloatTextarea label="Что нужно сделать с товаром" wrapClassName="col-span-full" />
            </div>
          </Sheet>

          <Sheet title="Подсказки и чипы" className="mt-4">
            <Tags label="Нужные услуги" options={SERVICES} className="max-w-[32rem]"
                  defaultValue={['Проверка на брак', 'Маркировка «Честный знак»']} />
            <p className="why mt-5">
              Поле, в котором ответов может быть несколько. Выбранное превращается в чип
              и остаётся на виду. Стрелки водят по списку, Enter добавляет, Backspace в пустом
              поле снимает последний чип.
            </p>
          </Sheet>

          <Sheet title="Загрузка файлов" className="mt-4">
            <FileDrop />
          </Sheet>
        </Section>

        {/* ============ ВЫБОР ============ */}
        <Section no="06" title="Выбор">
          <Sheet title="Флажки и переключатели">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-4">
              <div className="flex flex-col gap-3">
                <Choice defaultChecked>Проверка на брак</Choice>
                <Choice defaultChecked>Маркировка «Честный знак»</Choice>
                <Choice>Переупаковка в зип-лок</Choice>
                <Choice disabled>Фулфилмент в Гуанчжоу</Choice>
              </div>
              <div className="flex flex-col gap-3">
                <Choice type="radio" name="ship" defaultChecked>Забрать у поставщика</Choice>
                <Choice type="radio" name="ship">Привезу сам на склад</Choice>
                <Choice type="radio" name="ship">Приедет транспортной компанией</Choice>
              </div>
              <div className="flex flex-col gap-4">
                <Switch defaultChecked>Показывать цены без НДС</Switch>
                <Switch>Уведомлять о статусе поставки</Switch>
              </div>
            </div>
          </Sheet>

          <Sheet title="Карточки выбора — для квиза" className="mt-4">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-3">
              <Pick name="scheme" defaultChecked title="FBO" note="Отгружаем партии на склад маркетплейса" />
              <Pick name="scheme" title="FBS" note="Собираем заказы поштучно, везём до СЦ" />
              <Pick name="scheme" title="Прямая поставка" note="Отправляем покупателю из вашего магазина" />
            </div>
            <p className="why mt-4">
              Крупные зоны нажатия важнее аккуратности: квиз чаще заполняют с телефона, стоя на складе.
            </p>
          </Sheet>
        </Section>

        {/* ============ НАВИГАЦИЯ И ДАННЫЕ ============ */}
        <Section no="07" title="Навигация и данные">
          <Sheet title="Вкладки — переключатель прайса">
            <Tabs
              label="Схема работы"
              items={[
                {
                  value: 'fbo',
                  title: 'По схеме FBO',
                  panel: (
                    <Table
                      columns={[{ head: 'Услуга' }, { head: 'Единица' }, { head: 'Цена', num: true }]}
                      rows={[
                        ['Приёмка палеты', 'палета', '550 ₽'],
                        ['Приёмка короба или мешка', 'шт', '50 ₽'],
                        ['Визуальная отбраковка', 'шт', '6 ₽'],
                        ['Хранение', 'м³ в сутки', '55 ₽'],
                        ['Паллетирование', 'палета', '750 ₽'],
                      ]}
                    />
                  ),
                },
                {
                  value: 'fbs',
                  title: 'По схеме FBS',
                  panel: (
                    <Table
                      columns={[{ head: 'Услуга' }, { head: 'Единица' }, { head: 'Цена', num: true }]}
                      rows={[
                        ['Сборка заказа', 'шт', '—'],
                        ['Отправка с доставкой до СЦ', 'шт', '—'],
                        ['Каждый следующий литр', 'литр', '—'],
                      ]}
                    />
                  ),
                },
                {
                  value: 'pack',
                  title: 'Упаковка',
                  panel: (
                    <div className="grid gap-4 sm:grid-cols-3">
                      <Table narrow columns={[{ head: 'Запайка в рукав' }, { head: 'Цена', num: true }]}
                             rows={[['до 20 см', '13 ₽'], ['до 30 см', '18 ₽'], ['до 40 см', '25 ₽']]} />
                      <Table narrow columns={[{ head: 'Термоусадка' }, { head: 'Цена', num: true }]}
                             rows={[['до 20 см', '15 ₽'], ['до 30 см', '22 ₽'], ['до 40 см', '30 ₽']]} />
                      <Table narrow columns={[{ head: 'Пупырчатая плёнка' }, { head: 'Цена', num: true }]}
                             rows={[['до 20 см', '20 ₽'], ['до 40 см', '30 ₽'], ['до 60 см', '40 ₽']]} />
                    </div>
                  ),
                },
              ]}
            />
            <p className="why mt-4">
              <b>От трёх вкладок на телефоне</b> вместо полоски встаёт список с теми же вариантами
              и подписью. Сузьте окно до 640px, чтобы увидеть.
            </p>
          </Sheet>

          <Sheet title="Схема работы" className="mt-4">
            <Steps
              items={[
                { title: 'Заявка и расчёт', text: 'Собираем вводные по товару и считаем стоимость под ваш объём.' },
                { title: 'Договор и забор товара', text: 'Подписываем документы и забираем товар у поставщика или с рынка.' },
                { title: 'Обработка на складе', text: 'Проверяем, маркируем, упаковываем по регламенту площадки.' },
                { title: 'Отгрузка', text: 'Везём на склад маркетплейса или отправляем заказы покупателям.' },
              ]}
            />
          </Sheet>

          <Sheet title="Схема с чередованием сторон" className="mt-4">
            <Steps
              split
              className="max-w-[52rem] mx-auto"
              items={[
                { title: 'Заявка и расчёт', text: 'Собираем вводные по товару и считаем стоимость под ваш объём.', pic: <Icon name="calculator" size="xl" className="text-brand" /> },
                { title: 'Договор и забор товара', text: 'Подписываем документы и забираем товар у поставщика.', pic: <Icon name="file" size="xl" className="text-brand" /> },
                { title: 'Обработка на складе', text: 'Проверяем, маркируем, упаковываем по регламенту площадки.', pic: <Icon name="checks" size="xl" className="text-brand" /> },
                { title: 'Отгрузка', text: 'Везём на склад маркетплейса или отправляем заказы покупателям.', pic: <Icon name="truck" size="xl" className="text-brand" /> },
                { title: 'Готовы начать?', text: 'Оставьте заявку — посчитаем стоимость под ваш объём.', call: true, pic: <Icon name="message" size="xl" className="text-brand" /> },
              ]}
            />
          </Sheet>

          <Sheet title="Полоса прокрутки" className="mt-4">
            <div className="border border-line rounded-card overflow-hidden max-w-[22rem]">
              <Scroller className="h-56 overflow-y-auto p-1.5">
                <ul className="list-none m-0 p-0 flex flex-col">
                  {[
                    ['Коледино', '3 900 ₽'], ['Подольск', '3 900 ₽'], ['Обухово', '5 000 ₽'],
                    ['Чехов', '5 000 ₽'], ['Тула', '12 000 ₽'], ['Хоругвино', '6 000 ₽'],
                    ['Пушкино', '4 500 ₽'], ['Саларьево', '4 500 ₽'], ['Тверь', '11 000 ₽'],
                  ].map(([place, price]) => (
                    <li key={place} className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-field text-[0.9375rem] transition-colors duration-150 hover:bg-surface">
                      <span>{place}</span>
                      <span className="text-ink-mute tabular-nums">{price}</span>
                    </li>
                  ))}
                </ul>
              </Scroller>
            </div>
          </Sheet>

          <Sheet title="Меню узкого экрана" className="mt-4">
            <div className="relative bg-white rounded-card border border-line max-w-[26rem]">
              <div className="flex items-center gap-4 px-4 h-[4.25rem]">
                <span className="font-extrabold text-[1.0625rem] text-brand">MarketHelp</span>
                <span className="ml-auto flex">
                  <Menu>
                    <LinkGo href="#" ink>Услуги</LinkGo>
                    <LinkGo href="#" ink>Тарифы</LinkGo>
                    <LinkGo href="#" ink>Работа с маркетплейсами</LinkGo>
                    <LinkGo href="#" ink>Контакты</LinkGo>
                    <LinkGo href="tel:+74959551879"><Icon name="phone" />+7 495 955-18-79</LinkGo>
                  </Menu>
                </span>
              </div>
            </div>
          </Sheet>

          <Sheet title="Крошки и постраничная навигация" className="mt-4">
            <Crumbs items={[
              { title: 'Главная', href: '/' },
              { title: 'Услуги', href: '#' },
              { title: 'Обработка возвратов' },
            ]} />
            <div className="mt-5">
              <Pager page={page} pages={3} onPage={setPage} />
            </div>
          </Sheet>

          <Sheet title="Ссылка перехода" className="mt-4">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <LinkGo href="#" arrow>Подробнее</LinkGo>
              <LinkGo href="#"><Icon name="download" />Скачать прайс</LinkGo>
              <LinkGo href="#" arrow>Все уведомления</LinkGo>
            </div>
            <nav className="flex flex-wrap items-center gap-x-7 gap-y-3 mt-6" aria-label="Пример меню">
              <LinkGo href="#">Услуги</LinkGo>
              <LinkGo href="#">Тарифы</LinkGo>
              <LinkGo href="#">Контакты</LinkGo>
            </nav>
            <nav className="flex flex-wrap items-center gap-x-7 gap-y-3 mt-4" aria-label="Пример тёмного меню">
              <LinkGo href="#" ink>Услуги</LinkGo>
              <LinkGo href="#" ink>Тарифы</LinkGo>
              <LinkGo href="#" ink>Контакты</LinkGo>
            </nav>
          </Sheet>

          <Sheet title="Метки и статусы" className="mt-4">
            <div className="flex flex-wrap items-center gap-3">
              <Chip tone="ok" icon="circle-check">Принято на склад</Chip>
              <Chip tone="warn" icon="alert-triangle">Ожидает документов</Chip>
              <Chip tone="bad" icon="alert-circle">Брак</Chip>
              <Chip tone="brand">FBO</Chip>
              <Chip tone="jade">Отгружено</Chip>
              <Chip tone="sun">Частичная приёмка</Chip>
              <Chip>Черновик</Chip>
            </div>
          </Sheet>

          <Sheet title="Сообщения" className="mt-4">
            <div className="flex flex-col gap-2.5">
              <Note title="Все цены без НДС.">Итоговая стоимость рассчитывается индивидуально под ваш объём.</Note>
              <Note tone="ok" title="Заявка отправлена.">Менеджер перезвонит в течение часа, ежедневно с 09:00 до 21:00.</Note>
              <Note tone="warn" title="Поставка задерживается.">Склад Коледино не принимает — ожидание у ворот больше часа.</Note>
              <Note tone="bad" title="Не удалось отправить форму.">Проверьте телефон и попробуйте ещё раз.</Note>
            </div>
          </Sheet>

          <Sheet title="Аккордеон — вопросы и ответы" className="mt-4">
            <Accordion items={[
              {
                question: 'Какой минимальный объём?',
                answer: 'Работаем от 100 единиц. На объёме от 5 000 единиц в месяц считаем по индивидуальным тарифам.',
              },
              {
                question: 'Кто платит штраф маркетплейса за неверную маркировку?',
                answer: 'Если ошибка на нашей стороне — компенсируем штраф. Условия зафиксированы в договоре.',
              },
              {
                question: 'Что происходит с браком?',
                answer: 'Фотографируем, показываем в личном кабинете и ждём вашего решения: вернуть поставщику, уценить или утилизировать.',
              },
            ]} />
          </Sheet>
        </Section>

        {/* ============ ОКНА И ТОСТЫ ============ */}
        <Section no="08" title="Окна, тосты и подсказки">
          <Sheet title="Открыть по-настоящему">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary" onClick={() => setConfirm(true)}>Подтверждение</Button>
              <Button variant="secondary" onClick={() => setQuiz(true)}>Заявка в несколько шагов</Button>
              <Button size="sm" onClick={() => toast({ tone: 'ok', title: 'Заявка отправлена', text: 'Перезвоним в течение часа' })}>Тост: успех</Button>
              <Button size="sm" variant="quiet" onClick={() => toast({ title: 'Файл прикреплён', text: 'Габариты и фото товара.pdf' })}>Нейтральный</Button>
              <Button size="sm" variant="quiet" onClick={() => toast({ tone: 'warn', title: 'Сохранено как черновик', text: 'Не хватает габаритов короба' })}>Внимание</Button>
              <Button size="sm" variant="quiet" onClick={() => toast({ tone: 'bad', title: 'Не удалось загрузить файл', text: 'Больше 25 МБ' })}>Ошибка</Button>
            </div>

            <Modal
              open={confirm}
              onClose={() => setConfirm(false)}
              title="Удалить поставку?"
              footer={
                <>
                  <Button variant="quiet" onClick={() => setConfirm(false)}>Отмена</Button>
                  <Button variant="danger" onClick={() => setConfirm(false)}>Удалить</Button>
                </>
              }
            >
              <p className="m-0">
                Поставка от 7 сентября на склад Коледино, 340 единиц. Отменить это действие
                не получится.
              </p>
            </Modal>

            <Wizard
              open={quiz}
              onClose={() => setQuiz(false)}
              title="Рассчитать стоимость"
              steps={[
                {
                  title: 'Товар',
                  content: (
                    <>
                      <Select label="Что за товар" options={NICHES} />
                      <Select label="Объём в месяц" options={VOLUMES} />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FloatInput label="Число артикулов" type="number" inputMode="numeric" min={1} />
                        <Select label="Типовая единица" options={UNITS} />
                      </div>
                    </>
                  ),
                },
                {
                  title: 'Схема и площадки',
                  content: (
                    <>
                      <div className="grid grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))] gap-3">
                        <Pick name="k-scheme" defaultChecked title="FBO" note="Партии на склад площадки" />
                        <Pick name="k-scheme" title="FBS" note="Заказы поштучно с нашего склада" />
                        <Pick name="k-scheme" title="Обе" note="Один остаток на две схемы" />
                      </div>
                      <div className="field">
                        <p className="font-semibold text-ink m-0">Площадки</p>
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {MARKETS.map((m) => (
                            <Choice key={m}>{m}</Choice>
                          ))}
                        </div>
                      </div>
                    </>
                  ),
                },
                {
                  title: 'Контакты',
                  content: (
                    <>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FloatInput label="Ваше имя" type="text" />
                        <PhoneInput />
                      </div>
                      <FloatInput label="Почта — пришлём расчёт" type="email" inputMode="email" />
                      <FileDrop hint="PDF, XLSX, JPG, MP4 — до 25 МБ. Необязательно" />
                      <Choice defaultChecked>
                        Даю <TextLink href="#">согласие на обработку персональных данных</TextLink> и
                        принимаю <TextLink href="#">политику конфиденциальности</TextLink>
                      </Choice>
                    </>
                  ),
                },
              ]}
            />
          </Sheet>

          <Sheet title="Виды тостов" className="mt-4">
            <div className="flex flex-col gap-2.5">
              <Toast tone="ok" title="Заявка отправлена" text="Перезвоним в течение часа" />
              <Toast title="Файл прикреплён" text="ТЗ на проверку брака.docx" />
              <Toast tone="warn" title="Поставка сохранена как черновик" text="Не хватает габаритов короба" />
              <Toast tone="bad" title="Не удалось загрузить файл" text="Больше 25 МБ" />
            </div>
          </Sheet>

          <Sheet title="Подсказки" className="mt-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="quiet" icon aria-label="Скачать прайс" data-tip="Скачать прайс в PDF"><Icon name="download" /></Button>
              <Button variant="quiet" icon aria-label="Позвонить" data-tip="Звонок на колл-центр, до 21:00"><Icon name="phone" /></Button>
              <Button variant="quiet" icon aria-label="Удалить" data-tip="Убрать позицию из поставки"><Icon name="trash" /></Button>
              <span className="t-small text-ink-mute">наведите или пройдите табом</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <Button variant="soft" size="sm" data-tip="Открылась сверху" data-tip-pos="top">сверху</Button>
              <Button variant="soft" size="sm" data-tip="Открылась снизу" data-tip-pos="bottom">снизу</Button>
              <Button variant="soft" size="sm" data-tip="Открылась слева" data-tip-pos="left">слева</Button>
              <Button variant="soft" size="sm" data-tip="Открылась справа" data-tip-pos="right">справа</Button>
            </div>
            <Card className="overflow-hidden p-4 mt-5 max-w-[22rem]">
              <div className="flex items-center justify-between gap-3">
                <b className="font-semibold text-[0.9375rem]">Приёмка паллеты</b>
                <TipMark label="Что входит" tip="Разгрузка, пересчёт мест, сверка с накладной" />
              </div>
              <p className="t-small text-ink-mute mt-1">карточка со скрытым переполнением</p>
            </Card>
          </Sheet>
        </Section>

        {/* ============ УВЕДОМЛЕНИЯ И COOKIE ============ */}
        <Section no="09" title="Уведомления и cookie">
          <Sheet title="Колокольчик и список">
            <Notifications
              side="right"
              items={[
                { id: '1', kind: 'people', icon: 'message', title: 'Сообщение от менеджера', text: 'Уточните габариты короба — без них не посчитаю отгрузку', time: '5 минут назад' },
                { id: '2', kind: 'ok', icon: 'truck', title: 'Поставка № 1417 принята', text: 'Склад Коледино, 340 единиц. Расхождений при приёмке нет', time: '40 минут назад' },
                { id: '3', kind: 'warn', icon: 'alert-triangle', title: 'Отгрузка задерживается', text: 'Ожидание у ворот склада больше часа', time: '2 часа назад', read: true },
                { id: '4', kind: 'routine', icon: 'file', title: 'Готовы закрывающие документы', text: 'Акт и счёт-фактура за август', time: 'вчера', read: true },
              ]}
            />
          </Sheet>

          <Sheet title="Согласие на cookie" className="mt-4">
            <CookieBanner demo>
              Сайт использует cookie: без них не работают формы и кабинет, а аналитика помогает
              понять, что читают. Как храним данные — в <TextLink href="#">политике</TextLink>.
            </CookieBanner>
          </Sheet>
        </Section>

        {/* ============ ПОДВАЛ ============ */}
        <Section no="10" title="Подвал">
          <Sheet title="Светлый — для страниц с тёмным последним блоком">
            <div className="rounded-card overflow-hidden border border-line">
              <Footer
                dark={false}
                tile={false}
                inner="px-7 sm:px-9"
                columns={FOOT_COLUMNS}
                copy="MarketHelp © 2026"
                legal={FOOT_LEGAL}
              />
            </div>
          </Sheet>
        </Section>
      </div>

      {/* тёмный подвал-плитка стоит так, как стоит на сайте — во всю страницу */}
      <div className="mt-11">
        <Footer columns={FOOT_COLUMNS} copy="MarketHelp © 2026" legal={FOOT_LEGAL} />
      </div>
    </div>
  );
}

const FOOT_COLUMNS = [
  {
    title: 'Услуги',
    links: [
      { title: 'Все услуги', href: '#' },
      { title: 'Тарифы', href: '#' },
      { title: 'Работа с маркетплейсами', href: '#' },
      { title: 'Склад', href: '#' },
    ],
  },
  {
    title: 'Компания',
    links: [
      { title: 'О компании', href: '#' },
      { title: 'Как начать работать', href: '#' },
      { title: 'Блог', href: '#' },
      { title: 'Контакты', href: '#' },
    ],
  },
  {
    title: 'Связаться',
    links: [
      { title: '+7 495 955-18-79', href: 'tel:+74959551879', icon: 'phone' as const },
      { title: 'info@markethelp.ru', href: 'mailto:info@markethelp.ru', icon: 'message' as const },
      { title: 'Москва, Котляковская улица, 6с3', href: '#', icon: 'warehouse' as const },
    ],
  },
];

const FOOT_LEGAL = [
  { title: 'Договор и оферта', href: '#' },
  { title: 'Политика обработки данных', href: '#' },
  { title: 'Реквизиты', href: '#' },
];
