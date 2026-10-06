import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { LinkGo, Text } from '@/components/ui';
import { Head, Section, TILE } from '@/components/site/Layout';
import { ContactForm } from '@/components/site/ContactForm';
import { PageHead } from '@/components/site/PageHead';
import { OrganizationSchema } from '@/components/site/Schema';
import { CONTACTS, CONTACT_FORM } from '@/content/contacts';
import { WAREHOUSE_SECTIONS } from '@/content/warehouse';
import { PAGES } from '@/content/pages';
import { ROUTES, WAREHOUSE } from '@/content/site';

export const metadata: Metadata = {
  title: PAGES.contacts.title,
  description: PAGES.contacts.description,
  alternates: { canonical: ROUTES.contacts },
};

export default function ContactsPage() {
  return (
    <main>
      <OrganizationSchema />
      <PageHead page={PAGES.contacts} />

      {/* Четыре строки в две колонки: значок, название, значение
          и пояснение под ним. У часов работы ссылки нет — по ним никуда
          не переходят, и подчёркивать их было бы обманом. */}
      <Section>
        <div className="grid gap-x-10 lg:grid-cols-2">
          {CONTACTS.map((c) => (
            <div key={c.title} className="flex items-start gap-4 py-6 border-b border-line">
              <Icon name={c.icon} size="lg" className="text-brand shrink-0 mt-0.5" />
              <div>
                <Text variant="small" className="m-0">
                  {c.title}
                </Text>
                <p className="mt-1 m-0">
                  {c.href ? (
                    <LinkGo
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel={c.href.startsWith('http') ? 'noopener' : undefined}
                    >
                      {c.value}
                    </LinkGo>
                  ) : (
                    <span className="font-semibold text-[0.9375rem] leading-snug">{c.value}</span>
                  )}
                </p>
                <Text variant="small" className="mt-1.5 m-0">
                  {c.note}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Карта — плиткой во всю ширину, как первый экран главной: те же
          поля от краёв и то же скругление. Кнопка маршрута в левом
          верхнем углу: внизу слева у виджета своя ссылка. */}
      <Section bleed>
        <div
          className={`relative rounded-block overflow-hidden bg-surface ${TILE} h-[24rem] md:h-[30rem] lg:h-[34rem]`}
        >
          <iframe
            src={WAREHOUSE_SECTIONS.route.map}
            className="block w-full h-full border-0"
            title="Склад MarketHelp на карте"
            loading="lazy"
            allowFullScreen
          />
          <a
            className="btn absolute left-5 top-5 md:left-8 md:top-8"
            href={WAREHOUSE.href}
            target="_blank"
            rel="noopener"
          >
            Как проехать
          </a>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] items-start">
          <Head className="lg:sticky lg:top-32" title={CONTACT_FORM.title} lead={CONTACT_FORM.lead} />
          <ContactForm />
        </div>
      </Section>
    </main>
  );
}
