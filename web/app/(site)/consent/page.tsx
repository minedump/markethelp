import type { Metadata } from 'next';
import { LegalPage } from '@/components/site/Legal';
import { EDITIONS, CONSENT } from '@/content/legal';
import { PAGES } from '@/content/pages';
import { ROUTES } from '@/content/site';

export const metadata: Metadata = {
  title: PAGES.consent.title,
  description: PAGES.consent.description,
  alternates: { canonical: ROUTES.consent },
};

export default function ConsentPage() {
  return (
    <LegalPage
      page={PAGES.consent}
      edition={EDITIONS.consent}
      sections={CONSENT}
      slug="consent"
    />
  );
}
