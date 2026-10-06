// Проверка расчёта стороны и координат подсказки — тем же кодом, что в ките.
// Геометрию подставляем руками, потому что панель просмотра здесь скрыта
// и настоящих размеров окна не даёт.
const fs = require('fs');
const path = require('path');
// кит лежит рядом со скриптом — запускать можно из любой папки
const html = fs.readFileSync(path.join(__dirname, 'markethelp-ui-kit.html'), 'utf8');

// вырезаем тело place() из файла, чтобы проверять именно его, а не копию
const start = html.indexOf('    function place(t) {');
const end = html.indexOf('\n    }', html.indexOf('arrow.style.top = Math.round', start));
const body = html.slice(start, end + 6);
if (start < 0 || body.length < 500) throw new Error('не нашёл place() в файле');

const GAP = 10, PAD = 8;

function makePlace(vw, vh, tipW, tipH) {
  const tip = { style: {}, dataset: {}, offsetWidth: tipW, offsetHeight: tipH };
  const arrow = { style: {} };
  const document = { documentElement: { clientWidth: vw, clientHeight: vh } };
  const fn = new Function('GAP', 'PAD', 'tip', 'arrow', 'document', Math0 = `
    ${body}
    return place;
  `);
  return { place: fn(GAP, PAD, tip, arrow, document), tip, arrow };
}

function rect(x, y, w, h) {
  return {
    getBoundingClientRect: () => ({ left: x, top: y, width: w, height: h, right: x + w, bottom: y + h }),
    getAttribute: (n) => (n === 'data-tip-pos' ? rect.pos : null)
  };
}

const VW = 1200, VH = 800, TW = 220, TH = 40;
let fails = 0;

function check(name, trig, wantSide, expect) {
  const { place, tip, arrow } = makePlace(VW, VH, TW, TH);
  place(trig);
  const m = /translate\((-?\d+)px, (-?\d+)px\)/.exec(tip.style.transform);
  const x = +m[1], y = +m[2];
  const side = tip.dataset.side;
  const problems = [];
  if (side !== wantSide) problems.push(`сторона ${side}, ожидалась ${wantSide}`);
  if (x < PAD || x + TW > VW - PAD) problems.push(`ушла за край по x: ${x}..${x + TW}`);
  if (y < PAD || y + TH > VH - PAD) problems.push(`ушла за край по y: ${y}..${y + TH}`);
  const a = side === 'top' || side === 'bottom' ? parseInt(arrow.style.left) : parseInt(arrow.style.top);
  const lim = side === 'top' || side === 'bottom' ? TW : TH;
  if (!(a >= 12 && a <= lim - 12)) problems.push(`стрелка вне рамки: ${a}`);
  if (expect) expect({ x, y, side, arrow: a, problems });
  if (problems.length) { fails++; console.log('  ✗', name, '—', problems.join('; ')); }
  else console.log('  ✓', name, `→ ${side}, x=${x}, y=${y}, стрелка=${a}`);
}

console.log('окно', VW + '×' + VH, '/ подсказка', TW + '×' + TH, '\n');

console.log('по умолчанию сверху:');
rect.pos = null;
check('элемент в середине', rect(600, 400, 44, 44), 'top');
check('элемент у верхнего края → разворот вниз', rect(600, 4, 44, 44), 'bottom');
check('элемент в левом верхнем углу', rect(4, 4, 44, 44), 'bottom');
check('элемент в правом нижнем углу', rect(1152, 752, 44, 44), 'top');

console.log('\nпросили сторону явно:');
rect.pos = 'left';
check('слева есть место', rect(600, 400, 44, 44), 'left');
check('слева места нет → вправо', rect(10, 400, 44, 44), 'right');
rect.pos = 'right';
check('справа есть место', rect(600, 400, 44, 44), 'right');
check('справа места нет → влево', rect(1146, 400, 44, 44), 'left');
rect.pos = 'bottom';
check('снизу есть место', rect(600, 400, 44, 44), 'bottom');
check('снизу места нет → вверх', rect(600, 750, 44, 44), 'top');

console.log('\nтесное окно (места нет нигде):');
(function () {
  const vw = 260, vh = 120;
  const { place, tip } = makePlace(vw, vh, TW, TH);
  rect.pos = null;
  place(rect(120, 50, 44, 44));
  const m = /translate\((-?\d+)px, (-?\d+)px\)/.exec(tip.style.transform);
  const x = +m[1], y = +m[2];
  const ok = x >= PAD && y >= PAD && x + TW <= vw - PAD && y + TH <= vh - PAD;
  console.log(ok ? '  ✓' : '  ✗', `прижата к экрану: x=${x}, y=${y}, сторона=${tip.dataset.side}`);
  if (!ok) fails++;
})();

console.log('\n' + (fails ? 'ПРОВАЛОВ: ' + fails : 'все проверки прошли'));
process.exit(fails ? 1 : 0);
