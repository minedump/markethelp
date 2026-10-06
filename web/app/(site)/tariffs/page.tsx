import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { LinkButton, Tabs, Text } from '@/components/ui';
import { Cta, Section } from '@/components/site/Layout';
import { DeliveryTable } from '@/components/site/Delivery';
import { PageHead } from '@/components/site/PageHead';
import { RequestButton } from '@/components/site/RequestButton';
import {
  DescTable,
  LadderTable,
  NoteTable,
  PriceSection,
  PriceSub,
  PriceTable,
} from '@/components/site/Prices';
import {
  ASSEMBLY,
  BOPP,
  BUBBLE,
  CARGO,
  CHECKING,
  CHINA,
  COURIER,
  CUSTOMS,
  DROPSHIP,
  FBS,
  INTL,
  MARKING_CZ,
  OTHER,
  PICKUP,
  RECEIVING,
  RETAIL,
  RETURNS,
  SHRINK,
  SLEEVE,
  STORAGE,
  TK_NEXT,
  TK_SAME,
  VIDEO,
  ZIP,
} from '@/content/prices';
import { IDLE } from '@/content/tariffs';
import { CTA, PAGES, PRICELIST } from '@/content/pages';
import { ROUTES } from '@/content/site';

export const metadata: Metadata = {
  title: PAGES.tariffs.title,
  description: PAGES.tariffs.description,
  alternates: { canonical: ROUTES.tariffs },
};

/** разделы внутри схемы идут одной колонкой с общим шагом */
const COLUMN = 'pt-8 flex flex-col gap-12';

export default function TariffsPage() {
  return (
    <main>
      <PageHead
        page={PAGES.tariffs}
        actions={
          <>
            <LinkButton href={PRICELIST.href}>
              <Icon name="download" />
              {PRICELIST.title}
            </LinkButton>
            <RequestButton variant="secondary">Посчитать мою партию</RequestButton>
          </>
        }
      />

      {/* Переключатель схем: одни и те же операции стоят по-разному
          в зависимости от того, партиями товар уходит или поштучно.
          Тарифы FBS ещё не утверждены — вкладка есть, чтобы место было
          видно, и говорит об этом прямо. */}
      <Section>
        <Tabs
          label="Схема работы"
          items={[
            {
              value: 'fbo',
              title: 'Схема FBO',
              panel: (
                <div className={COLUMN}>
                  <PriceSection title="Приёмка груза">
                    <PriceTable rows={RECEIVING} />
                  </PriceSection>

                  <PriceSection title="Обработка товара">
                    <div className="flex flex-col gap-7">
                      <PriceSub title="Проверка">
                        <PriceTable rows={CHECKING} />
                      </PriceSub>
                      <PriceSub title="Комплектация и маркировка">
                        <PriceTable rows={[...ASSEMBLY, ...MARKING_CZ]} />
                      </PriceSub>
                    </div>
                  </PriceSection>

                  <PriceSection title="Упаковка">
                    <div className="grid gap-5 md:grid-cols-3 items-start">
                      <PriceSub title="Запайка в рукав" note="Цена зависит от габаритов товара.">
                        <LadderTable rows={SLEEVE} />
                      </PriceSub>
                      <PriceSub title="Термоусадка" note="Цена зависит от габаритов.">
                        <LadderTable rows={SHRINK} />
                      </PriceSub>
                      <PriceSub
                        title="Пупырчатая плёнка"
                        note="Считается по сумме трёх сторон. Материал и работа включены."
                      >
                        <LadderTable rows={BUBBLE} />
                      </PriceSub>
                    </div>
                  </PriceSection>

                  <PriceSection title="Хранение товара">
                    <PriceTable rows={STORAGE} />
                  </PriceSection>

                  <PriceSection title="Обработка возвратов">
                    <PriceTable rows={RETURNS} />
                  </PriceSection>

                  <PriceSection title="Прочие услуги">
                    <PriceTable rows={[...OTHER, ...VIDEO]} />
                  </PriceSection>
                </div>
              ),
            },
            {
              value: 'fbs',
              title: 'Схема FBS',
              panel: (
                <div className={COLUMN}>
                  <PriceSection
                    title="Сборка и отправка заказов"
                    lead="Приёмка, проверка, маркировка и упаковка — по тем же ценам, что для FBO. Здесь то, что добавляется при поштучной работе."
                  >
                    <PriceTable rows={FBS} />
                  </PriceSection>
                </div>
              ),
            },
          ]}
        />
      </Section>

      {/* Доставка — вне схем: на склад площадки едут и партии, и заказы */}
      <Section className="flex flex-col gap-12">
        <PriceSection
          id="t-delivery"
          title="Доставка на склады маркетплейсов"
          lead="Цена за рейс, ₽. Выберите направление, чтобы оставить в таблице только его."
        >
          <DeliveryTable />
          <Text variant="small" className="mt-3 max-w-[52rem]">
            Отправки больше пяти паллет считает отдел логистики. Другие адреса и кросс-докинг
            на региональные склады — по запросу.
          </Text>
        </PriceSection>

        <PriceSection id="t-pickup" title="Забор груза и карго">
          <div className="flex flex-col gap-7">
            <PriceSub title="Забор по Москве и области">
              <NoteTable rows={PICKUP} />
            </PriceSub>
            <PriceSub
              title="Международный забор"
              note="Подача автомобиля в день обращения. Точную стоимость сообщаем до подачи."
            >
              <NoteTable rows={INTL} />
            </PriceSub>
            <PriceSub title="Условия">
              <DescTable rows={CARGO} head={['Услуга', 'Что входит']} />
            </PriceSub>
          </div>
        </PriceSection>

        <PriceSection id="t-retail" title="Доставка в розницу">
          <NoteTable rows={RETAIL} />
        </PriceSection>

        <PriceSection
          id="t-customs"
          title="ВЭД и сертификация"
          lead="Маркируемые и подакцизные грузы — по запросу."
        >
          <NoteTable rows={CUSTOMS} />
        </PriceSection>

        <PriceSection id="t-drop" title="Прямая поставка — дропшиппинг">
          <PriceTable rows={DROPSHIP} />
        </PriceSection>

        <PriceSection id="t-china" title="Фулфилмент в Китае">
          <NoteTable rows={CHINA} />
        </PriceSection>

        <PriceSection
          id="t-tk"
          title="Доставка транспортной компанией"
          lead="Свыше 25 кг — плюс 100 ₽ за каждые 10 кг на следующий день и плюс 200 ₽ за каждые 10 кг день в день."
        >
          <div className="grid gap-5 md:grid-cols-2 items-start">
            <PriceSub title="На следующий день">
              <LadderTable rows={TK_NEXT} head={['Вес', 'Стоимость, ₽']} />
            </PriceSub>
            <PriceSub title="День в день">
              <LadderTable rows={TK_SAME} head={['Вес', 'Стоимость, ₽']} />
            </PriceSub>
          </div>
        </PriceSection>

        <PriceSection
          id="t-materials"
          title="Упаковка и материалы"
          lead="Цена за штуку, укладка включена. Размеры в сантиметрах."
        >
          <div className="grid gap-5 md:grid-cols-3 items-start">
            <PriceSub title="Зип-лок с бегунком">
              <LadderTable rows={ZIP} />
            </PriceSub>
            <PriceSub title="БОПП-пакет">
              <LadderTable rows={BOPP} />
            </PriceSub>
            <PriceSub title="Курьер-пакет">
              <LadderTable rows={COURIER} />
            </PriceSub>
          </div>
        </PriceSection>

        <PriceSection id="t-idle" title="Доплаты за простой">
          <NoteTable rows={IDLE} head={['Случай', 'Когда', 'Цена']} />
        </PriceSection>
      </Section>

      <Cta text={CTA.tariffs} />
    </main>
  );
}
