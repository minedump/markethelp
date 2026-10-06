'use client';

import { Rich } from '@/components/Rich';
import { CookieBanner } from '@/components/ui';
import { COOKIE_TEXT } from '@/content/site';

/**
 * Плашка cookie сайта. Стоит в раскладке, поэтому показывается на любой
 * странице — и на любой же пропадает, как только человек ответил.
 */
export function SiteCookie() {
  return (
    <CookieBanner>
      <Rich>{COOKIE_TEXT}</Rich>
    </CookieBanner>
  );
}
