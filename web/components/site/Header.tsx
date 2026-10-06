'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Icon, Logo } from '@/components/Icon';
import { LinkGo } from '@/components/ui';
import { APP, NAV_MAIN, PHONE, ROUTES } from '@/content/site';

/**
 * Шапка сайта.
 *
 * Закреплена всё время: меню и телефон под рукой на любой высоте
 * страницы. Пунктов четыре и они не переносятся — «Как начать» в две
 * строки задирает шапку и ломает ряд; остальные разделы живут в подвале.
 *
 * Логотип наверху страницы фирменный голубой и при прокрутке перетекает
 * в чернильный — признак data-scrolled ставится один раз на порог, а не
 * на каждый кадр прокрутки.
 *
 * Порог у меню и у номера один и тот же: они либо оба в строке, либо
 * оба в меню.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenu(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menu]);

  return (
    <header className="site-head z-drop" data-scrolled={scrolled ? '1' : '0'}>
      <div className="max-w-[75rem] mx-auto px-4 sm:px-8 lg:px-12 h-[4.25rem] flex items-center gap-6">
        <Link href={ROUTES.home} className="site-logo shrink-0" aria-label="MarketHelp, на главную">
          <Logo className="w-[4.53rem] h-10" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 ml-2 whitespace-nowrap" aria-label="Разделы сайта">
          {NAV_MAIN.map((l) => (
            <LinkGo key={l.href} href={l.href} ink>
              {l.title}
            </LinkGo>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-4 sm:gap-6">
          <span className="hidden lg:block whitespace-nowrap">
            <Phone />
          </span>

          {/* Вход в кабинет — вторичное действие: основное на странице
              одно, и это расчёт партии. Кнопка скрыта до запуска
              app.markethelp.ru: вести её некуда. */}
          {APP.ready ? (
            <a className="btn btn-sm shrink-0" href={APP.href}>
              Личный кабинет
            </a>
          ) : null}

          {/* Значок меню там, где пунктам не хватает места в строку.
              Кнопка обычная, мягкая, со значком: своего вида у меню нет.
              Пока меню открыто, значок становится крестиком — закрывает
              меню та же кнопка, и это должно быть видно. */}
          <button
            className="btn btn-icon btn-sm btn-soft shrink-0 lg:hidden"
            type="button"
            aria-expanded={menu}
            aria-controls="site-menu"
            aria-label="Меню"
            onClick={() => setMenu((v) => !v)}
          >
            <Icon name={menu ? 'x' : 'menu'} />
          </button>
        </div>
      </div>

      {/* Панель отсчитывается от шапки, а не от окна: стоит внутри неё
          и прижата к нижнему краю. По ссылке уходим и закрываем — иначе
          меню осталось бы висеть поверх прокрученной страницы. */}
      <nav
        className="menu lg:hidden"
        id="site-menu"
        hidden={!menu}
        aria-label="Меню сайта"
        onClick={(e) => {
          if ((e.target as Element).closest('a')) setMenu(false);
        }}
      >
        <Phone />
        {NAV_MAIN.map((l) => (
          <LinkGo key={l.href} href={l.href} ink>
            {l.title}
          </LinkGo>
        ))}
        {APP.ready ? (
          <a className="btn btn-sm mt-2" href={APP.href}>
            Личный кабинет
          </a>
        ) : null}
      </nav>
    </header>
  );
}

/**
 * Номер показан не полностью: последние цифры открываются по нажатию.
 * Это нажатие и есть событие для аналитики — по нему считается, сколько
 * человек дошли до звонка. В скрытой части нет и разделителей: чёрточки
 * подсказывали бы, сколько цифр за ними, — а до нажатия номер и не
 * должен читаться. Тем, кто читает с экрана, номер доступен сразу: он
 * в подписи ссылки.
 */
function Phone() {
  const [shown, setShown] = useState(false);

  if (shown) {
    return (
      <a className="link-go" href={PHONE.href} aria-label={`Позвонить: ${PHONE.title}`}>
        <Icon name="phone" />
        {PHONE.title}
      </a>
    );
  }

  return (
    <button
      className="link-go"
      type="button"
      aria-label="Показать телефон целиком"
      onClick={() => setShown(true)}
    >
      <Icon name="phone" />
      <span>
        {PHONE.head} <span aria-hidden="true">••••</span>
      </span>
    </button>
  );
}
