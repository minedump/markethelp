import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { LinkButton, TableWrap } from '@/components/ui';
import { Section } from '@/components/site/Layout';
import { PageHead } from '@/components/site/PageHead';
import { REQUISITES } from '@/content/contacts';
import { REQUISITES_FILE } from '@/content/documents';
import { PAGES } from '@/content/pages';
import { ROUTES } from '@/content/site';

export const metadata: Metadata = {
  title: PAGES.requisites.title,
  description: PAGES.requisites.description,
  alternates: { canonical: ROUTES.requisites },
};

export default function RequisitesPage() {
  return (
    <main>
      <PageHead
        page={PAGES.requisites}
        parents={[{ title: 'Документы', href: ROUTES.documents }]}
        actions={
          <LinkButton variant="secondary" href={REQUISITES_FILE.href}>
            <Icon name="download" />
            {REQUISITES_FILE.title}
          </LinkButton>
        }
      />

      {/* Таблица «параметр — значение» в узкую колонку: строк много,
          во всю ширину значения улетали бы от названий. */}
      <Section>
        <div className="max-w-[52rem]">
          <TableWrap narrow>
            <table>
              <tbody>
                {REQUISITES.map((r) => (
                  <tr key={r.key}>
                    <td className="font-medium whitespace-nowrap">{r.key}</td>
                    <td className="tabular-nums">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrap>
        </div>
      </Section>
    </main>
  );
}
