// Captions: Clean, modern 1-3 words matching reference videos.
// Natural casing, centered lower-third, crisp stroke + soft drop shadow.
import { ctx, clamp, lerp, seg, eob } from './lib.js';
import { T, lineWords } from './timing.js';

export const CAP = { y: 1540, size: 88, maxW: 960 };
let caps = [];

function autoChunks(text) {
  const ws = text.split(/\s+/).filter(Boolean), out = [];
  for (let i = 0; i < ws.length;) {
    const n = ws.length - i === 4 ? 2 : Math.min(3, ws.length - i);
    out.push(ws.slice(i, i + n));
    i += n;
  }
  return out.map((c) => {
    const k = c.reduce((b, w, j) => (w.replace(/[^a-zA-Z]/g, '').length > c[b].replace(/[^a-zA-Z]/g, '').length ? j : b), 0);
    return c.map((w, j) => (j === k ? '*' + w : w)).join(' ');
  });
}

export function buildCaptions(script) {
  caps = [];
  script.lines.forEach((ln, i) => {
    const rawChunks = ln.caps ? ln.caps.split('|') : autoChunks(ln.text);
    const chunks = rawChunks.map((s) => s.trim()).filter(Boolean);
    const ws = lineWords(i);
    if (!ws.length) return;
    const counts = chunks.map((c) => c.split(/\s+/).length), N = counts.reduce((a, b) => a + b, 0);
    const nm = (w) => String(w).toLowerCase().replace(/[^a-z0-9']+/g, '');
    let acc = 0, from = 0;
    chunks.forEach((c, j) => {
      const first = nm(c.split(/\s+/)[0]);
      let idx = j === 0 ? 0 : ws.findIndex((w, k) => k > from && first && (nm(w.w) === first || (first.length > 2 && nm(w.w).startsWith(first))));
      if (idx < 0) idx = Math.max(from + (j ? 1 : 0), Math.min(ws.length - 1, Math.round(acc * ws.length / N)));
      acc += counts[j];
      from = idx;
      caps.push({
        line: i,
        s: ws[idx].s - 0.05,
        words: c.split(/\s+/).map((w) => ({ txt: w.replace('*', ''), hi: w.startsWith('*') }))
      });
    });
  });
  caps.forEach((c, k) => {
    const next = caps[k + 1], lineEnd = T.lines[c.line].end;
    c.e = next ? (next.s - lineEnd > 0.6 && next.line !== c.line ? lineEnd + 0.3 : next.s) : T.dur;
  });
  return caps;
}

export const captionList = () => caps;

export function drawCaption(t) {
  const c = caps.find((c) => t >= c.s && t < c.e);
  if (!c) return;
  const lt = t - c.s, size = CAP.size;
  ctx.save();
  ctx.font = `800 ${size}px Inter`;
  ctx.letterSpacing = '-0.5px';
  const sp = size * 0.24;
  c.words.forEach((w) => (w.w = ctx.measureText(w.txt).width));
  const width = (ws) => ws.reduce((a, w) => a + w.w, 0) + sp * (ws.length - 1);
  let lines = [c.words];
  if (width(c.words) > CAP.maxW && c.words.length > 1) {
    let best = null;
    for (let i = 1; i < c.words.length; i++) {
      const a = c.words.slice(0, i), b = c.words.slice(i), m = Math.max(width(a), width(b));
      if (!best || m < best.m) best = { m, l: [a, b] };
    }
    lines = best.l;
  }
  const fit = Math.min(1, CAP.maxW / Math.max(...lines.map(width)));
  const sc = (lt < 0.15 ? lerp(0.85, 1, eob(seg(lt, 0, 0.15))) : 1) * fit;
  ctx.translate(540, CAP.y);
  ctx.scale(sc, sc);
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.lineJoin = 'round';

  const lh = size * 1.1, y0 = -(lines.length - 1) * lh / 2;
  lines.forEach((ln, li) => {
    let x = -width(ln) / 2;
    const y = y0 + li * lh;
    for (const w of ln) {
      // Soft drop shadow + clean crisp outline
      ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 3;
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#050505';
      ctx.strokeText(w.txt, x, y);
      ctx.shadowColor = 'transparent';

      ctx.fillStyle = w.hi ? '#FFDF00' : '#FFFFFF';
      ctx.fillText(w.txt, x, y);
      x += w.w + sp;
    }
  });
  ctx.letterSpacing = '0px';
  ctx.restore();
}
