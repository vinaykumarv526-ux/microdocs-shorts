// AUTO-GENERATED PAPER ATLAS 2D: How Underground Rocks Turn Into Fuel! 🛢️ #Shorts
import { ctx, C, W, H, clamp, lerp, seg, eo, eio, eob, fillAll, rr, circle } from './core/lib.js';
import { L, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);

  // 1 · HISTORICAL MAP STAGE
  {
    const st = cut(0);
    add({ id: 'S01', at: st, cam: [540, 960], note: 'stage 1',
      draw(lt) {
        fillAll('#E5D9C5');
        K.map({ highlight: 0, route: eio(seg(lt, 0, 0.8)) });
        K.ribbon(540, 380, 'RECORD #01', eob(seg(lt, 0, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'slide');
  }

  // 2 · HISTORICAL MAP STAGE
  {
    const st = cut(1);
    add({ id: 'S02', at: st, cam: [540, 960], note: 'stage 2',
      draw(lt) {
        fillAll('#E5D9C5');
        K.map({ highlight: 1, route: eio(seg(lt, 0, 0.8)) });
        K.ribbon(540, 380, 'RECORD #02', eob(seg(lt, 0, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'slide');
  }

  // 3 · HISTORICAL MAP STAGE
  {
    const st = cut(2);
    add({ id: 'S03', at: st, cam: [540, 960], note: 'stage 3',
      draw(lt) {
        fillAll('#E5D9C5');
        K.map({ highlight: 2, route: eio(seg(lt, 0, 0.8)) });
        K.ribbon(540, 380, 'RECORD #03', eob(seg(lt, 0, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'slide');
  }

  // 4 · HISTORICAL MAP STAGE
  {
    const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 960], note: 'stage 4',
      draw(lt) {
        fillAll('#E5D9C5');
        K.map({ highlight: 0, route: eio(seg(lt, 0, 0.8)) });
        K.ribbon(540, 380, 'RECORD #04', eob(seg(lt, 0, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'slide');
  }

  // 5 · HISTORICAL MAP STAGE
  {
    const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 960], note: 'stage 5',
      draw(lt) {
        fillAll('#E5D9C5');
        K.map({ highlight: 1, route: eio(seg(lt, 0, 0.8)) });
        K.ribbon(540, 380, 'RECORD #05', eob(seg(lt, 0, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'slide');
  }

  // 6 · HISTORICAL MAP STAGE
  {
    const st = cut(5);
    add({ id: 'S06', at: st, cam: [540, 960], note: 'stage 6',
      draw(lt) {
        fillAll('#E5D9C5');
        K.map({ highlight: 2, route: eio(seg(lt, 0, 0.8)) });
        K.ribbon(540, 380, 'RECORD #06', eob(seg(lt, 0, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'slide');
  }

  // 7 · HISTORICAL MAP STAGE
  {
    const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 960], note: 'stage 7',
      draw(lt) {
        fillAll('#E5D9C5');
        K.map({ highlight: 0, route: eio(seg(lt, 0, 0.8)) });
        K.ribbon(540, 380, 'RECORD #07', eob(seg(lt, 0, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'slide');
  }

  return { shots: S, cues: CUES };
}
