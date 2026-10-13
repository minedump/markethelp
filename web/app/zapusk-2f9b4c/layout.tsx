import type { Metadata } from 'next';
import { CHECKLIST } from '@/content/checklist';

/**
 * Обёртка списка к запуску.
 *
 * Страница служебная, и закрыта она тремя способами сразу, потому что
 * каждого по отдельности мало:
 *
 *   `noindex` — поисковик не возьмёт её в выдачу, даже если наткнётся;
 *   нет в `sitemap.ts` — сам он про неё не узнает;
 *   ниоткуда не связана ссылкой — и не придёт по чужой.
 *
 * В `robots.txt` её намеренно НЕ закрываем: запись в нём публичная и
 * сама по себе выдала бы адрес тому, кто туда заглянет.
 *
 * Адрес с нечитаемым хвостом — не защита, а только то, что его не
 * наберут наугад. Секретов на странице нет, но и показывать её всем
 * незачем.
 */
export const metadata: Metadata = {
  /* absolute — чтобы к заголовку не приклеилось «— MarketHelp» из
     общего шаблона: название компании в нём уже есть. */
  title: { absolute: CHECKLIST.title },
  robots: { index: false, follow: false },
};

export default function ChecklistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
