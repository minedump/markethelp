import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { IconSprite } from '@/components/Icon';
import { Metrika } from '@/components/site/Metrika';
import { TipLayer } from '@/components/ui/Tip';
import { ToastProvider } from '@/components/ui/Toast';
import { ORG, SITE_URL } from '@/content/site';
import { PAGES } from '@/content/pages';
import './globals.css';

/**
 * Шрифт берётся сборкой и кладётся рядом с сайтом: при статике внешний
 * CDN — лишняя точка отказа, а начертания нужны ровно пять.
 */
const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});

/**
 * Общие метаданные. Заголовок страницы подставляется в шаблон, адрес
 * считается от SITE_URL — на тестовом домене он свой, иначе поисковик
 * склеил бы тестовые страницы с боевыми.
 *
 * Картинка для ссылок одна на весь сайт: её не нужно перерисовывать
 * под каждую страницу, а заголовок и описание мессенджер и так возьмёт
 * из мета-тегов.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${ORG.name} — фулфилмент для маркетплейсов`,
    template: `%s — ${ORG.name}`,
  },
  description: PAGES.home.description,
  applicationName: ORG.name,
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: ORG.name,
    title: `${ORG.name} — фулфилмент для маркетплейсов`,
    description: PAGES.home.description,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: ORG.name }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={manrope.variable}>
      {/* страница белая: серая подложка — это витрина кита, а не сайт */}
      <body className="bg-white">
        {/* спрайт со значками — один на страницу, до всего остального */}
        <IconSprite />
        {/* слой подсказок слушает [data-tip] у кого угодно */}
        <TipLayer />
        {/* тосты всплывают поверх страницы из любого её места */}
        <ToastProvider>{children}</ToastProvider>
        <Metrika />
      </body>
    </html>
  );
}
