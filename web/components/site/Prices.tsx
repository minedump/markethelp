import type { ReactNode } from 'react';
import { Table, Text } from '@/components/ui';
import type { CargoLine, Ladder, Line, Price } from '@/content/prices';

/**
 * Таблицы прайса — те же четыре вида, что в печатном прайсе и на
 * странице тарифов, чтобы число нигде не разошлось с бумагой.
 *
 * Единица стоит в заголовке столбца, а в ячейке только число: знак
 * рубля в каждой строке — это тринадцать одинаковых значков в столбик,
 * которые ничего не добавляют и мешают сравнивать разряды.
 */
function money(price: string) {
  return price.replace(/[\s ]*₽/, '');
}

/** Услуга — измерение — цена. Основной вид: им описаны операции. */
export function PriceTable({
  rows,
  head = ['Услуга', 'Измерение', 'Цена, ₽'],
}: {
  rows: Price[];
  head?: [string, string, string];
}) {
  return (
    <Table
      narrow
      columns={[{ head: head[0] }, { head: head[1] }, { head: head[2], num: true }]}
      rows={rows.map((r) => [r.title, <span key="u" className="text-ink-mute">{r.unit}</span>, money(r.price)])}
    />
  );
}

/** Услуга — пояснение — цена: там, где единицы мало, нужна оговорка. */
export function NoteTable({
  rows,
  head = ['Услуга', 'Пояснение', 'Цена, ₽'],
}: {
  rows: Line[];
  head?: [string, string, string];
}) {
  return (
    <Table
      narrow
      columns={[{ head: head[0] }, { head: head[1] }, { head: head[2], num: true }]}
      rows={rows.map((r) => [
        <span key="t" className="font-medium">{r.title}</span>,
        <span key="n" className="text-ink-mute">{r.note}</span>,
        money(r.price),
      ])}
    />
  );
}

/** Лестница по габариту или размеру — узкая таблица, их ставят по три в ряд. */
export function LadderTable({
  rows,
  head = ['Размер', 'Цена, ₽'],
}: {
  rows: Ladder[];
  head?: [string, string];
}) {
  return (
    <Table
      narrow
      columns={[{ head: head[0] }, { head: head[1], num: true }]}
      rows={rows.map((r) => [r.size, money(r.price)])}
    />
  );
}

/** Условия без цен: цена зависит от маршрута, и столбца для неё нет. */
export function DescTable({ rows, head }: { rows: CargoLine[]; head: [string, string] }) {
  return (
    <Table
      narrow
      columns={[{ head: head[0] }, { head: head[1] }]}
      rows={rows.map((r) => [
        <span key="t" className="font-medium">{r.title}</span>,
        <span key="n" className="text-ink-soft">{r.note}</span>,
      ])}
    />
  );
}

/**
 * Раздел прайса: заголовок, оговорка под ним и таблицы.
 * Ступень заголовка — t-h3: разделов на странице полтора десятка,
 * и крупнее они превратили бы её в череду титров.
 */
export function PriceSection({
  title,
  lead,
  id,
  children,
}: {
  title: string;
  lead?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <div id={id}>
      <Text variant="h3" as="h2" className="m-0">
        {title}
      </Text>
      {lead ? (
        <Text variant="small" className="mt-2 max-w-[44rem]">
          {lead}
        </Text>
      ) : null}
      <div className="mt-5">{children}</div>
    </div>
  );
}

/** Таблица внутри раздела со своей подписью. */
export function PriceSub({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Text variant="h4" as="h3" className="mb-3">
        {title}
      </Text>
      {children}
      {note ? (
        <Text variant="small" className="mt-2">
          {note}
        </Text>
      ) : null}
    </div>
  );
}
