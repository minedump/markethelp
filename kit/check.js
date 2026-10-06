const fs = require('fs');
const path = require('path');
// кит лежит рядом со скриптом — запускать можно из любой папки
const html = fs.readFileSync(path.join(__dirname, 'markethelp-ui-kit.html'), 'utf8');

// 1. вытащить конфиг
const cfgSrc = html.slice(html.indexOf('tailwind.config = '), html.indexOf('</script>', html.indexOf('tailwind.config = ')));
const tailwind = {};
eval(cfgSrc.replace('tailwind.config =', 'tailwind.config ='));
const ext = tailwind.config.theme.extend;

// 2. плоский список фирменных цветов
const colors = new Set();
for (const [k, v] of Object.entries(ext.colors)) {
  if (typeof v === 'string') { colors.add(k); continue; }
  for (const sub of Object.keys(v)) colors.add(sub === 'DEFAULT' ? k : k + '-' + sub);
}
const topColorKeys = Object.keys(ext.colors);

const sizes = {
  height: new Set(Object.keys(ext.height || {})),
  width: new Set(Object.keys(ext.width || {})),
  minHeight: new Set(Object.keys(ext.minHeight || {})),
  minWidth: new Set(Object.keys(ext.minWidth || {})),
  borderRadius: new Set(Object.keys(ext.borderRadius || {})),
  boxShadow: new Set(Object.keys(ext.boxShadow || {})),
  animation: new Set(Object.keys(ext.animation || {})),
  borderWidth: new Set(Object.keys(ext.borderWidth || {})),
};

// 3. все классы из @apply
const tokens = new Set();
const re = /@apply([^;]+);/g;
let m;
while ((m = re.exec(html))) {
  m[1].split(/\s+/).filter(Boolean).forEach(t => tokens.add(t));
}
// плюс классы из разметки
const markup = new Set();
const re2 = /class="([^"]+)"/g;
while ((m = re2.exec(html))) {
  m[1].split(/\s+/).filter(Boolean).forEach(t => { tokens.add(t); markup.add(t); });
}

// 4. проверка
const colorPrefixes = ['bg-', 'text-', 'border-', 'border-l-', 'border-t-', 'border-r-', 'border-b-',
  'decoration-', 'fill-', 'stroke-', 'ring-', 'placeholder-', 'divide-', 'outline-', 'accent-', 'caret-'];

const problems = [];
for (const raw of tokens) {
  const cls = raw.replace(/^!/, '').split(':').pop();      // снять варианты
  if (/\[.*\]/.test(cls)) continue;                          // произвольные значения всегда валидны

  const check = (prefix, set, family) => {
    if (!cls.startsWith(prefix)) return false;
    const name = cls.slice(prefix.length);
    if (set.has(name)) return true;
    // может быть родное значение Tailwind — считаем проблемой только если имя похоже на наше
    if (topColorKeys.includes(name.split('-')[0]) || /^ctl/.test(name)) {
      problems.push(`${cls} — нет «${name}» в ${family}`);
    }
    return true;
  };

  if (check('min-h-', sizes.minHeight, 'minHeight')) continue;
  if (check('min-w-', sizes.minWidth, 'minWidth')) continue;
  if (check('h-', sizes.height, 'height')) continue;
  if (check('w-', sizes.width, 'width')) continue;
  if (check('rounded-', sizes.borderRadius, 'borderRadius')) continue;
  if (check('shadow-', sizes.boxShadow, 'boxShadow')) continue;
  if (check('animate-', sizes.animation, 'animation')) continue;

  for (const pre of colorPrefixes.sort((a, b) => b.length - a.length)) {
    if (!cls.startsWith(pre)) continue;
    const name = cls.slice(pre.length);
    if (colors.has(name)) break;
    if (topColorKeys.includes(name.split('-')[0])) {
      problems.push(`${cls} — нет цвета «${name}» в палитре`);
    }
    break;
  }
}

console.log('проверено классов:', tokens.size, '(из них в разметке:', markup.size + ')');
console.log('фирменных цветов:', [...colors].join(', '));
console.log('');
if (problems.length) {
  console.log('НАЙДЕНО ПРОБЛЕМ:', problems.length);
  [...new Set(problems)].forEach(p => console.log('  ✗', p));
} else {
  console.log('несуществующих фирменных классов не найдено');
}
