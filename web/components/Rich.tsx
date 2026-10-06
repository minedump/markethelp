import { Fragment } from 'react';
import { TextLink } from '@/components/ui/Text';

/**
 * Абзац содержания со ссылками.
 *
 * В правовых текстах и в плашке cookie внутри абзаца встречаются
 * ссылки. Хранить их разметкой в содержании нельзя: тогда текст
 * приходилось бы вставлять в страницу как есть, минуя проверку, —
 * поэтому ссылка пишется как [текст](/адрес), а разворачивает её
 * отрисовка. Ничего другого этот разбор не понимает и не должен:
 * для оформления есть компоненты кита.
 */
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

export function Rich({ children }: { children: string }) {
  const out = [];
  let at = 0;
  for (const m of children.matchAll(LINK)) {
    const start = m.index ?? 0;
    if (start > at) out.push(children.slice(at, start));
    out.push(
      <TextLink key={start} href={m[2]}>
        {m[1]}
      </TextLink>,
    );
    at = start + m[0].length;
  }
  if (at < children.length) out.push(children.slice(at));

  return (
    <>
      {out.map((part, i) => (
        <Fragment key={i}>{part}</Fragment>
      ))}
    </>
  );
}
