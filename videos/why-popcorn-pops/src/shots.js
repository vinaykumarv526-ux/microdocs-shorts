// 2D FLAT ARCHITECTURAL MODEL: Why Does Popcorn ACTUALLY Pop? 🍿
import { ctx, C, W, H, clamp, lerp, seg, eo, eio, eob, rnd, bigText, rr, circle, ell, line, fillAll } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
import * as PK from './core/popcornKit.js';

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);

  // 1 · HOOK: Raw popcorn kernel on hot plate
  {
    const st = cut(0);
    add({ id: 'S01', at: st, cam: [540, 780], zoom: 0.12, note: 'popcorn hook kernel',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        PK.kernelCrossSection(540, 760, 1.15, 'raw', lt);
        K.pill('THE POPCORN MYSTERY', 540, 240, 52, C.ink, '#FFD43B', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 2 · THE ARCHITECTURAL SECRET: Tough waterproof pericarp hull
  {
    const st = cut(1);
    add({ id: 'S02', at: st, cam: [540, 780], note: 'waterproof pericarp hull cutaway',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        PK.kernelCrossSection(540, 760, 1.15, 'raw', lt);
        K.pill('WATERPROOF PERICARP HULL', 540, 260, 48, C.ink, '#F59E0B', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 3 · THE DENSE STARCH & MOISTURE CORE: 14% trapped water droplet
  {
    const st = cut(2);
    add({ id: 'S03', at: st, cam: [540, 780], zoom: 0.08, note: '14 percent moisture core',
      draw(lt) {
        ctx.fillStyle = '#0F172A'; ctx.fillRect(-300, -300, W + 600, H + 600);
        PK.kernelCrossSection(540, 760, 1.25, 'raw', lt);
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'pop');
  }

  // 4 · DYNAMICS / FLOW: Heat past 400°F & trapped superheated steam
  {
    const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 780], note: 'heat superheated steam',
      draw(lt) {
        ctx.fillStyle = '#0F172A'; ctx.fillRect(-300, -300, W + 600, H + 600);
        PK.kernelCrossSection(540, 760, 1.2, 'heating', lt);
        K.pill('SUPERHEATED STEAM BUILDUP', 540, 240, 46, '#EF4444', '#FFFFFF', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'slide', { dur: 2.0 });
  }

  // 5 · GELATINIZATION: Molten starch dough
  {
    const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 780], note: 'molten starch dough gelatinization',
      draw(lt) {
        ctx.fillStyle = '#0F172A'; ctx.fillRect(-300, -300, W + 600, H + 600);
        PK.kernelCrossSection(540, 760, 1.2, 'molten', lt);
        K.pill('GELATINOUS MOLTEN STARCH', 540, 240, 46, C.ink, '#FBBF24', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 6 · THE RUPTURE POINT: 135 PSI explosive hull burst
  {
    const st = cut(5);
    add({ id: 'S06', at: st, cam: [540, 780], note: '135 PSI explosive burst',
      draw(lt) {
        ctx.fillStyle = '#080E1A'; ctx.fillRect(-300, -300, W + 600, H + 600);
        if (lt < 1.0) {
          PK.pressureGauge(540, 760, 1.05, 135, lt);
        } else {
          PK.ruptureExplosion(540, 760, 1.05, lt - 1.0);
        }
      } });
    cue(st, 'whoosh'); cue(st + 1.0, 'slam');
  }

  // 7 · LOOP OUTRO: Solidified crispy white popcorn flake
  {
    const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 780], zoom: 0.1, note: 'solidified crispy flake outro',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        PK.finishedPopcornFlake(540, 760, 1.15, lt);
        K.pill('DELICIOUS SOLIDIFIED STARCH FOAM', 540, 240, 46, C.ink, '#10B981', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'ding');
  }

  return { shots: S, cues: CUES };
}
