import type { HTMLAttributes, ReactNode } from 'react';

/**
 * Обёртка таблицы (.tablewrap). Широкая таблица на телефоне едет вбок —
 * для восьми столбцов это правильно. Узкая (narrow) обходится без
 * минимальной ширины: два-три коротких столбца сожмутся и останутся
 * читаемыми, и такие ставят по две-три в ряд — лестницы цен в прайсе.
 *
 * Числовому столбцу ставится class="num": правое выравнивание и
 * табличные цифры, чтобы разряды стояли друг под другом.
 */
type WrapProps = HTMLAttributes<HTMLDivElement> & { narrow?: boolean; children?: ReactNode };

export function TableWrap({ narrow = false, className, children, ...rest }: WrapProps) {
  return (
    <div
      className={['tablewrap', narrow ? 'tablewrap-narrow' : '', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}

export type Column = {
  /** заголовок столбца */
  head: ReactNode;
  /** числовой столбец: правый край и табличные цифры */
  num?: boolean;
};

type TableProps = WrapProps & {
  columns: Column[];
  rows: ReactNode[][];
};

/** Готовая таблица по столбцам и строкам — для прайса и сравнений. */
export function Table({ columns, rows, narrow, className, ...rest }: TableProps) {
  return (
    <TableWrap narrow={narrow} className={className} {...rest}>
      <table>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i} className={c.num ? 'num' : undefined}>
                {c.head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, k) => (
                <td key={k} className={columns[k]?.num ? 'num' : undefined}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrap>
  );
}
