import type { Config } from 'tailwindcss';

/**
 * Конфиг один в один из UI-кита (kit/markethelp-ui-kit.html).
 * Менять значения здесь и в ките разом: кит остаётся источником правды,
 * а этот файл — его перенос в сборку.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand:   { DEFAULT: '#0064E0', bright: '#0079FF', dark: '#00429B', wash: '#EAF2FE', edge: '#BBD5FA' },
        jade:    { DEFAULT: '#1ABC9D', dark: '#0B7A66', wash: '#E6F7F3' },
        sun:     { DEFAULT: '#FECD39', dark: '#8A5A00', wash: '#FFF5DC', edge: '#F2D08F' },
        ink:     { DEFAULT: '#101828', soft: '#475467', mute: '#667085', faint: '#98A2B3' },
        line:    { DEFAULT: '#DDE2E9', soft: '#EAEDF2', strong: '#C3CEDD', hard: '#B4BCC8', track: '#C3CAD5' },
        surface: '#F5F7FA',
        ok:      { DEFAULT: '#1F7A3A', wash: '#E8F4EB', edge: '#C3DFCB', text: '#155E2C' },
        warn:    { DEFAULT: '#D9880B', wash: '#FFF7E6', edge: '#F2D08F', text: '#101828' },
        bad:     { DEFAULT: '#C0362C', wash: '#FBECEA', edge: '#F0C7C2', text: '#8E241C' },
      },
      fontFamily: {
        // переменная приходит от next/font — шрифт лежит на своём хостинге
        sans: ['var(--font-manrope)', 'Manrope', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      /* все размеры в rem: 1rem = 16px */
      height:    { ctl: '2.75rem', 'ctl-sm': '2.25rem', 'ctl-lg': '3.25rem' },
      minHeight: { ctl: '2.75rem', 'ctl-sm': '2.25rem', 'ctl-lg': '3.25rem' },
      width:     { ctl: '2.75rem', 'ctl-sm': '2.25rem', 'ctl-lg': '3.25rem' },
      /* block — радиус крупного блока во всю ширину полосы. У карточки
         он меньше: карточка мелкая, и такое скругление съело бы ей углы */
      borderRadius: { field: '0.5rem', input: '0.75rem', card: '0.75rem', block: '2rem' },
      borderWidth: { DEFAULT: '0.0625rem', '2': '0.125rem', '3': '0.1875rem' },
      boxShadow: {
        /* три ступени высоты, подкрашенные фирменным синим */
        e1:    '0 0.0625rem 0.125rem rgba(16,24,40,.04), 0 0.0625rem 0.1875rem rgba(0,100,224,.07)',
        e2:    '0 0.25rem 0.875rem rgba(16,24,40,.08), 0 0.125rem 0.25rem rgba(0,100,224,.05)',
        e3:    '0 1.5rem 3rem rgba(16,24,40,.18), 0 0.5rem 1rem rgba(0,100,224,.07)',
        soft:  '0 0.0625rem 0.125rem rgba(16,24,40,.06), 0 0.0625rem 0.1875rem rgba(16,24,40,.08)',
        toast: '0 0.375rem 1.125rem rgba(16,24,40,.16)',
        ring:  '0 0 0 0.1875rem rgba(0,100,224,.22)',
      },
      /* Ярусы наложения. Чем выше число, тем ближе к человеку.
         Промежуточных значений не заводим: новый ярус добавляется сюда,
         а не пишется числом по месту. */
      zIndex: { drop: '30', toast: '50', tip: '60' },
      keyframes: {
        'toast-in': { from: { opacity: '0', transform: 'translateY(0.5rem)' } },
      },
      animation: { 'toast-in': 'toast-in .22s ease-out' },
    },
  },
  plugins: [],
};

export default config;
