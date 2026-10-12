/**
 * Сверка собранных страниц с китом.
 *
 * Правило кита: элементы берутся целиком, и свойства, которые элемент
 * задаёт сам — размер, радиус, заливку, рамку, тень, — поверх него не
 * дописывают. Кнопка с чужим радиусом или поле с чужой высотой ломают
 * ряд, где стоят рядом с обычными.
 *
 * Сам разбор живёт в kit/kit-lint.js — там же, где кит, и правится
 * вместе с ним. Кит в репозиторий не входит и лежит на диске рядом
 * с ним, поэтому проверка возможна не везде: без него она не падает
 * с невнятной ошибкой, а говорит, чего не хватает, и выходит с нулём —
 * сборку на сервере ей ронять не за что.
 *
 * Запускается после сборки: npm run kit-lint.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'out');
const LINT = path.join(process.cwd(), '..', 'kit', 'kit-lint.js');

if (!fs.existsSync(LINT)) {
  console.log('Кита рядом нет — пропускаю сверку.');
  console.log('Он лежит на диске у макета: ' + LINT);
  process.exit(0);
}

if (!fs.existsSync(OUT)) {
  console.error('Нет папки out — сначала npm run build');
  process.exit(1);
}

function walk(dir, found = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '_next') walk(full, found);
    } else if (entry.name === 'index.html' || entry.name === '404.html') {
      found.push(full);
    }
  }
  return found;
}

/* Витрина кита показывает элементы нарочно в особых состояниях —
   с кольцом фокуса, с заданной шириной поля для ряда, с мелкой
   ссылкой в панели. Это образцы, а не страница сайта, и те же
   переопределения стоят в самом ките. */
const SKIP = ['/kit/index.html'];

let total = 0;
for (const page of walk(OUT).sort()) {
  const name = page.slice(OUT.length).split(path.sep).join('/');
  if (SKIP.includes(name)) continue;
  const report = execFileSync('node', [LINT, page], { encoding: 'utf8' });
  const found = report.match(/ПЕРЕОПРЕДЕЛЕНИЯ КИТА: (\d+)/);
  if (found) {
    total += Number(found[1]);
    console.log(name);
    for (const line of report.split('\n')) {
      if (line.startsWith('  ✗')) console.log('   ' + line.trim());
    }
  }
}

console.log(total ? `\nпереопределений кита: ${total}` : 'переопределений кита не найдено');
process.exit(total ? 1 : 0);
