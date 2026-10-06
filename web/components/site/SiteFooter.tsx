import { Footer } from '@/components/ui';
import { COPYRIGHT, FOOT_COLUMNS, FOOT_LEGAL } from '@/content/site';

/**
 * Подвал сайта — тот же подвал из кита, с содержанием сайта.
 *
 * Стоит тёмной плиткой: страница открывается чёрным блоком первого
 * экрана и им же закрывается, с теми же полями от краёв экрана.
 */
export function SiteFooter() {
  return <Footer columns={FOOT_COLUMNS} copy={COPYRIGHT} legal={FOOT_LEGAL} />;
}
