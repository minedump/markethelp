/**
 * Проверка связности собранного сайта.
 *
 * Каждая внутренняя ссылка должна вести на существующую страницу или
 * файл, каждый якорь — на существующий элемент той страницы, куда он
 * ведёт. Ссылки наружу, телефон и почта не проверяются: за ними не
 * к нам.
 *
 * Запускается после сборки: npm run check — и он же стоит в CI, чтобы
 * битая ссылка не доехала до боевого адреса.
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'out');

if (!fs.existsSync(OUT)) {
  console.error('Нет папки out — сначала npm run build');
  process.exit(1);
}

/** все собранные страницы: адрес файла → содержимое */
function walk(dir, found = new Map()) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '_next') walk(full, found);
    } else if (entry.name.endsWith('.html')) {
      found.set(full, fs.readFileSync(full, 'utf8'));
    }
  }
  return found;
}

const pages = walk(OUT);
const ids = new Map();
for (const [file, html] of pages) {
  ids.set(file, new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1])));
}

const local = (href) => path.join(OUT, decodeURIComponent(href).split('/').join(path.sep));
const target = (href) => (href.endsWith('/') ? path.join(local(href), 'index.html') : local(href));
const exists = (href) => fs.existsSync(target(href));

const bad = [];
for (const [file, html] of [...pages].sort()) {
  const page = file.slice(OUT.length).split(path.sep).join('/') || '/';
  const hrefs = new Set([...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]));

  for (const raw of hrefs) {
    if (/^(https?:|mailto:|tel:|data:|#i-)/.test(raw)) continue;
    if (!raw.startsWith('/') && !raw.startsWith('#')) continue;

    /* у значков к адресу приписана метка версии */
    const [href] = raw.split('?');
    const [dest, anchor] = href.split('#');

    if (dest && !exists(dest)) {
      bad.push([page, href, 'нет страницы']);
      continue;
    }
    if (!anchor) continue;

    const where = dest ? target(dest) : file;
    const known = ids.get(where);
    if (known && !known.has(anchor)) {
      bad.push([page, href, dest ? 'нет якоря на целевой странице' : 'нет такого якоря']);
    }
  }
}

console.log(`страниц: ${pages.size}, битых ссылок: ${bad.length}`);
for (const [page, href, why] of bad) console.log(`  ${page}  ${href}  — ${why}`);
process.exit(bad.length ? 1 : 0);
