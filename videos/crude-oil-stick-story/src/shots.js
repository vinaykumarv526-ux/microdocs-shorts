// AUTO-GENERATED STICK STORY 2D: How Underground Rocks Turn Into Fuel! 🛢️ #Shorts
import { ctx, C, W, H, clamp, lerp, seg, eo, eio, eob, rnd, bigText, rr, circle, line, fillAll } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);

  // 1 · STEP CARD
  {
    const st = cut(0);
    add({ id: 'S01', at: st, cam: [540, 960], note: 'step 1',
      draw(lt) {
        fillAll('#18181B');
        K.room({ night: 0 });
        K.stick({ x: 540, y: 1300, pose: 'stand', eyes: 'wide' });
        K.stepCard(540, 420, 1, 'STEP 1', eob(seg(lt, 0, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'ding');
  }

  // 2 · STEP CARD
  {
    const st = cut(1);
    add({ id: 'S02', at: st, cam: [540, 960], note: 'step 2',
      draw(lt) {
        fillAll('#18181B');
        K.room({ night: 1 });
        K.stick({ x: 540, y: 1300, pose: 'run', eyes: 'shock' });
        K.stepCard(540, 420, 2, 'STEP 2', eob(seg(lt, 0, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'ding');
  }

  // 3 · STEP CARD
  {
    const st = cut(2);
    add({ id: 'S03', at: st, cam: [540, 960], note: 'step 3',
      draw(lt) {
        fillAll('#18181B');
        K.room({ night: 0 });
        K.stick({ x: 540, y: 1300, pose: 'stand', eyes: 'shock' });
        K.stepCard(540, 420, 3, 'STEP 3', eob(seg(lt, 0, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'ding');
  }

  // 4 · STEP CARD
  {
    const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 960], note: 'step 4',
      draw(lt) {
        fillAll('#18181B');
        K.room({ night: 1 });
        K.stick({ x: 540, y: 1300, pose: 'run', eyes: 'shock' });
        K.stepCard(540, 420, 4, 'STEP 4', eob(seg(lt, 0, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'ding');
  }

  // 5 · STEP CARD
  {
    const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 960], note: 'step 5',
      draw(lt) {
        fillAll('#18181B');
        K.room({ night: 0 });
        K.stick({ x: 540, y: 1300, pose: 'stand', eyes: 'shock' });
        K.stepCard(540, 420, 5, 'STEP 5', eob(seg(lt, 0, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'ding');
  }

  // 6 · STEP CARD
  {
    const st = cut(5);
    add({ id: 'S06', at: st, cam: [540, 960], note: 'step 6',
      draw(lt) {
        fillAll('#18181B');
        K.room({ night: 1 });
        K.stick({ x: 540, y: 1300, pose: 'run', eyes: 'shock' });
        K.stepCard(540, 420, 6, 'STEP 6', eob(seg(lt, 0, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'ding');
  }

  // 7 · STEP CARD
  {
    const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 960], note: 'step 7',
      draw(lt) {
        fillAll('#18181B');
        K.room({ night: 0 });
        K.stick({ x: 540, y: 1300, pose: 'stand', eyes: 'shock' });
        K.stepCard(540, 420, 7, 'STEP 7', eob(seg(lt, 0, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'ding');
  }

  return { shots: S, cues: CUES };
}
