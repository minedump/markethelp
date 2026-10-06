// Сверяет страницу с китом: не переопределяет ли она свойства, которые
// элемент задаёт сам, и не изобретает ли своих классов вместо китовых.
const fs = require('fs');
const path = require('path');
// node kit/kit-lint.js site/index.html — кит берётся рядом со скриптом;
// вторым доводом можно подсунуть другой кит
const PAGE = process.argv[2];
const KIT = process.argv[3] || path.join(__dirname, 'markethelp-ui-kit.html');
if (!PAGE) { console.error('укажи страницу: node kit/kit-lint.js site/index.html'); process.exit(2); }
const kit = fs.readFileSync(KIT, 'utf8');
const page = fs.readFileSync(PAGE, 'utf8');

// 1. какие классы кит определяет сам
const css = kit.slice(kit.indexOf('<style type="text/tailwindcss">'),
                      kit.indexOf('</style>', kit.indexOf('<style type="text/tailwindcss">')));
const defined = new Set();
for (const m of css.matchAll(/(^|[\s,{}])\.([a-z][a-z0-9-]*)/gm)) defined.add(m[2]);

// 2. что каждый компонент задаёт про себя — по @apply
const owns = {};
const ruleRe = /\.([a-z][a-z0-9-]*)\s*\{\s*@apply([^;]+);/g;
let r;
while ((r = ruleRe.exec(css))) {
  const name = r[1];
  owns[name] = owns[name] || new Set();
  for (const u of r[2].split(/\s+/).filter(Boolean)) owns[name].add(u);
}
// плюс сырые правила вида .x { border-radius: … }
for (const m of css.matchAll(/\.([a-z][a-z0-9-]*)(\[[^\]]*\])?\s*\{([^}@]*?)\}/g)) {
  const name = m[1], body = m[3];
  if (!/:/.test(body)) continue;
  owns[name] = owns[name] || new Set();
  for (const d of body.split(';')) {
    const p = d.split(':')[0].trim();
    if (p) owns[name].add('css:' + p);
  }
}

// 3. к какой группе относится утилита
function family(u) {
  const c = u.replace(/^!/, '').split(':').pop();
  if (/^rounded(-|$)/.test(c)) return 'радиус';
  if (/^(h|min-h|max-h)-/.test(c)) return 'высота';
  if (/^(w|min-w|max-w)-/.test(c)) return 'ширина';
  if (/^(p|px|py|pt|pb|pl|pr)-/.test(c)) return 'внутренний отступ';
  if (/^bg-(?!clip|origin|repeat)/.test(c)) return 'заливка';
  // цвет текста менять разрешено — размер и начертание нет
  if (/^font-/.test(c)) return 'текст';
  if (/^text-\[/.test(c) || /^text-(xs|sm|base|lg|xl|\dxl)$/.test(c)) return 'текст';
  if (/^border(-|$)/.test(c)) return 'рамка';
  if (/^shadow(-|$)/.test(c)) return 'тень';
  return null;
}
const familyOf = {
  'радиус': /^rounded/, 'высота': /^(h|min-h|max-h)-/, 'ширина': /^(w|min-w|max-w)-/,
  'внутренний отступ': /^(p|px|py|pt|pb|pl|pr)-/, 'заливка': /^bg-(?!clip|origin|repeat)/,
  'текст': /^(text|font)-/, 'рамка': /^border/, 'тень': /^shadow/,
};
const cssFamily = {
  'радиус': /border-radius/, 'высота': /^height$/, 'ширина': /^width$/,
  'заливка': /background-color|^background$/, 'рамка': /^border/, 'тень': /box-shadow/,
};

// 4. проходим по разметке страницы
const body = page.slice(page.indexOf('<body'));
const problems = [];
const unknown = new Map();
for (const m of body.matchAll(/class="([^"]+)"/g)) {
  const list = m[1].split(/\s+/).filter(Boolean);
  const comps = list.filter(c => defined.has(c) && owns[c]);
  if (!comps.length) {
    for (const c of list) {
      // класс, похожий на компонент (не утилита), которого в ките нет
      if (/^[a-z][a-z-]*$/.test(c) && !defined.has(c) && !family(c) &&
          !/^(flex|grid|block|inline|hidden|relative|absolute|sticky|items|justify|gap|mx|my|mt|mb|ml|mr|space|order|col|row|list|overflow|object|aspect|truncate|shrink|grow|basis|z|opacity|transition|duration|ease|cursor|select|pointer|backdrop|antialiased|underline|uppercase|lowercase|capitalize|tabular|leading|tracking|whitespace|break|align|self|place|content|top|left|right|bottom|inset|translate|rotate|scale|origin|fill|stroke|ring|outline|divide|from|via|to|animate|group|peer|end)$/.test(c)) {
        unknown.set(c, (unknown.get(c) || 0) + 1);
      }
    }
    continue;
  }
  const extras = list.filter(c => !comps.includes(c));
  for (const comp of comps) {
    for (const ex of extras) {
      const fam = family(ex);
      if (!fam) continue;
      const own = owns[comp];
      let clash = false;
      for (const u of own) {
        if (u.startsWith('css:')) {
          const prop = u.slice(4);
          if (cssFamily[fam] && cssFamily[fam].test(prop)) { clash = true; break; }
        } else {
          const bare = u.replace(/^!/, '').split(':').pop();
          if (familyOf[fam] && familyOf[fam].test(bare)) { clash = true; break; }
        }
      }
      if (clash) problems.push(`.${comp} + «${ex}» — переопределяет ${fam}, который задан в ките`);
    }
  }
}

console.log('классов, определённых китом:', defined.size);
console.log('');
if (problems.length) {
  console.log('ПЕРЕОПРЕДЕЛЕНИЯ КИТА:', problems.length);
  [...new Set(problems)].forEach(p => console.log('  ✗', p));
} else {
  console.log('переопределений кита не найдено');
}
console.log('');
if (unknown.size) {
  console.log('классы, похожие на свои компоненты (в ките их нет):');
  [...unknown.entries()].sort((a, b) => b[1] - a[1]).forEach(([c, n]) => console.log('  ?', c, '×' + n));
} else {
  console.log('своих компонентов вне кита не найдено');
}
