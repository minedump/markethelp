'use client';

import { useState } from 'react';
import { Select, TableWrap } from '@/components/ui';
import { DELIVERY, DELIVERY_HEAD } from '@/content/prices';

/**
 * Доставка на склады маркетплейсов.
 *
 * Направлений одиннадцать, а человеку нужно одно: список над таблицей
 * оставляет в ней только выбранное. Это не поиск по сайту, а фильтр
 * одной таблицы, поэтому список стоит рядом с ней, а не в шапке
 * страницы, и подписан тем, что выбирают.
 *
 * Строки не перерисовываются, а прячутся: таблица не прыгает по высоте
 * при каждом выборе и возвращается в исходный вид мгновенно.
 */
const ALL = 'Все направления';

export function DeliveryTable() {
  const [place, setPlace] = useState(ALL);

  return (
    <>
      {/* ширину задаёт обёртка, а не сам список: у поля своя ширина в ките */}
      <div className="w-full sm:max-w-[22rem]">
        <Select
          label="Выберите направление"
          value={place}
          onChange={setPlace}
          options={[ALL, ...DELIVERY.map((r) => r.place)].map((v) => ({ value: v, title: v }))}
        />
      </div>

      <TableWrap narrow className="mt-5">
        <table>
          <thead>
            <tr>
              {DELIVERY_HEAD.map((h, i) => (
                <th key={h} className={i ? 'num' : undefined}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DELIVERY.map((row) => (
              <tr key={row.place} hidden={place !== ALL && place !== row.place}>
                <td className="font-medium">{row.place}</td>
                {row.prices.map((p, i) => (
                  <td key={i} className="num">
                    {p}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrap>
    </>
  );
}
