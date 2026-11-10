// AUTO-GENERATED INSIDE OUT 2D: How Airports Sort 100,000 Bags Without Losing Them 🧳✈️ #Shorts
import { ctx, C, W, H, clamp, lerp, seg, eo, eio, eob, rnd, bigText, rr, circle, ell, line, fillAll } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);

  // 1 · HOOK
  {
    const st = cut(0);
    add({ id: 'S01', at: st, cam: [540, 820], note: 'hook opening',
      draw(lt) {
        fillAll('#0F172A');
        K.man({ x: 540, y: 1100, s: 1.5, mouth: 'o', eyes: 'wide', brow: 1 });
        bigText('AIRPORT BAGGAGE SYSTEM', 540, 420, 84, '#FFD43B', 0, eob(seg(lt, 0.1, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 2 · INTERNAL CUTAWAY
  {
    const st = cut(1);
    add({ id: 'S02', at: st, cam: [540, 960], note: 'internal cutaway',
      draw(lt) {
        fillAll('#1E1B4B');
        K.xrayBody(540, 960, 1.2, '#06B6D4');
        K.badge(540, 400, 'CRITICAL', '#EF4444', eob(seg(lt, 0, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'slam');
  }

  // 3 · PROGRESSION
  {
    const st = cut(2);
    add({ id: 'S03', at: st, cam: [540, 960], note: 'progression',
      draw(lt) {
        fillAll('#1E293B');
        K.man({ x: 540, y: 1150, s: 1.3, mouth: 'open', eyes: 'shock' });
        K.badge(540, 420, 'ALERT', '#F59E0B', eob(seg(lt, 0, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'pop');
  }

  // 4 · INTERNAL CUTAWAY
  {
    const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 960], note: 'internal cutaway',
      draw(lt) {
        fillAll('#1E1B4B');
        K.xrayBody(540, 960, 1.2, '#06B6D4');
        K.badge(540, 400, 'CRITICAL', '#EF4444', eob(seg(lt, 0, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'slam');
  }

  // 5 · PROGRESSION
  {
    const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 960], note: 'progression',
      draw(lt) {
        fillAll('#1E293B');
        K.man({ x: 540, y: 1150, s: 1.3, mouth: 'open', eyes: 'shock' });
        K.badge(540, 420, 'ALERT', '#F59E0B', eob(seg(lt, 0, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'pop');
  }

  // 6 · INTERNAL CUTAWAY
  {
    const st = cut(5);
    add({ id: 'S06', at: st, cam: [540, 960], note: 'internal cutaway',
      draw(lt) {
        fillAll('#1E1B4B');
        K.xrayBody(540, 960, 1.2, '#06B6D4');
        K.badge(540, 400, 'CRITICAL', '#EF4444', eob(seg(lt, 0, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'slam');
  }

  // 7 · OUTRO
  {
    const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 960], note: 'outro resolution',
      draw(lt) {
        fillAll('#064E3B');
        K.badge(540, 520, 'VERDICT', '#10B981', eob(seg(lt, 0, 0.4)));
        K.man({ x: 540, y: 1200, s: 1.4, mouth: 'smile', eyes: 'norm' });
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'ding');
  }

  return { shots: S, cues: CUES };
}
