import { Header } from '@/components/site/Header';
import { RequestProvider } from '@/components/site/RequestModal';
import { SiteCookie } from '@/components/site/SiteCookie';
import { SiteFooter } from '@/components/site/SiteFooter';

/**
 * Раскладка сайта: шапка, подвал, плашка cookie и окно заявки.
 *
 * Витрина кита стоит вне этой группы — на ней шапка и подвал только
 * мешали бы смотреть на элементы.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequestProvider>
      <Header />
      {children}
      <SiteFooter />
      <SiteCookie />
    </RequestProvider>
  );
}
