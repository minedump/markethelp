import type { Metadata } from 'next';
import { LegalPage } from '@/components/site/Legal';
import { EDITIONS, POLICY } from '@/content/legal';
import { PAGES } from '@/content/pages';
import { ROUTES } from '@/content/site';

export const metadata: Metadata = {
  title: PAGES.policy.title,
  description: PAGES.policy.description,
  alternates: { canonical: ROUTES.policy },
};

export default function PolicyPage() {
  return (
    <LegalPage
      page={PAGES.policy}
      edition={EDITIONS.policy}
      sections={POLICY}
      slug="policy"
    />
  );
}
