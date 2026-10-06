import type { Metadata } from 'next';
import { LegalPage } from '@/components/site/Legal';
import { EDITIONS, OFFER } from '@/content/legal';
import { PAGES } from '@/content/pages';
import { ROUTES } from '@/content/site';

export const metadata: Metadata = {
  title: PAGES.offer.title,
  description: PAGES.offer.description,
  alternates: { canonical: ROUTES.offer },
};

export default function OfferPage() {
  return (
    <LegalPage
      page={PAGES.offer}
      edition={EDITIONS.offer}
      sections={OFFER}
      slug="offer"
    />
  );
}
