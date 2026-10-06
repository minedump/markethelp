/**
 * Кит одним входом: import { Button, Bento, Select } from '@/components/ui'.
 *
 * Правило то же, что в самом ките: элементы берутся отсюда целиком.
 * У каждого уже задан свой размер, радиус, заливка, рамка и тень —
 * дописывать их поверх нельзя. Если элемент выглядит не так, как нужно,
 * правится он сам: здесь и в kit/markethelp-ui-kit.html, а не на
 * странице. Раскладка — сетки, колонки, отступы между блоками, ширина
 * колонки содержимого — наоборот, живёт на странице.
 */
export { Button, LinkButton } from './Button';
export type { ButtonVariant, ButtonSize } from './Button';

export { Text, TextLink, LinkGo } from './Text';
export type { TextStyle } from './Text';

export { Chip, RemovableChip } from './Chip';
export type { ChipTone } from './Chip';

export { Note } from './Note';
export type { NoteTone } from './Note';

export { Card, CardTitle } from './Card';
export { Bento, Glow, OnInk, OnBrand } from './Bento';
export { Swipe } from './Swipe';
export { Scroller } from './Scroller';

export { Table, TableWrap } from './Table';
export type { Column } from './Table';

export { Crumbs } from './Crumbs';
export type { Crumb } from './Crumbs';
export { Pager } from './Pager';

export { Steps } from './Steps';
export type { Step } from './Steps';

export { Field, FloatInput, FloatTextarea } from './Field';
export { PhoneInput } from './PhoneInput';
export { Search } from './Search';
export { Choice, Switch } from './Choice';
export { Pick } from './Pick';
export { FileDrop } from './Files';
export { Tags } from './Tags';

export { Select } from './Select';
export type { Option } from './Select';

export { Tabs } from './Tabs';
export type { Tab } from './Tabs';

export { Accordion } from './Accordion';
export type { Fold } from './Accordion';

export { Modal } from './Modal';
export { Wizard } from './Wizard';
export type { WizardStep } from './Wizard';

export { Toast, ToastProvider, useToast } from './Toast';
export type { ToastTone, ToastInput } from './Toast';

export { TipLayer, TipMark } from './Tip';
export { Menu } from './Menu';

export { Notifications } from './Notifications';
export type { Notif, NotifKind } from './Notifications';

export { Footer } from './Footer';
export type { FootColumn, FootLink } from './Footer';

export { CookieBanner } from './CookieBanner';
