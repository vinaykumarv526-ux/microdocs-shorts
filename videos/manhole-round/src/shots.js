// 2D FLAT ARCHITECTURAL MODEL: Why Are Manhole Covers Round? ⭕
import { ctx, C, W, H, clamp, lerp, seg, eo, eio, eob, rnd, bigText, rr, circle, ell, line, fillAll } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
import * as MK from './core/manholeKit.js';

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);

  // 1 · HOOK: Round cast-iron manhole cover on street
  {
    const st = cut(0);
    add({ id: 'S01', at: st, cam: [540, 780], zoom: 0.12, note: 'manhole street view hook',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        MK.manholeCoverTop(540, 760, 1.15, lt);
        K.pill('CITY STREET GEOMETRY', 540, 240, 52, C.ink, '#FFD43B', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 2 · THE ARCHITECTURAL SECRET: Constant diameter principle
  {
    const st = cut(1);
    add({ id: 'S02', at: st, cam: [540, 780], note: 'constant diameter geometric rule',
      draw(lt) {
        ctx.fillStyle = '#0F172A'; ctx.fillRect(-300, -300, W + 600, H + 600);
        MK.constantDiameterProof(540, 760, 1.05, lt);
        K.pill('AN INGENIOUS SAFETY RULE', 540, 240, 48, C.ink, '#38BDF8', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 3 · THE FLAWED MYTH: Square cover diagonal drop
  {
    const st = cut(2);
    add({ id: 'S03', at: st, cam: [540, 780], zoom: 0.08, note: 'square cover diagonal drop',
      draw(lt) {
        ctx.fillStyle = '#1A1829'; ctx.fillRect(-300, -300, W + 600, H + 600);
        MK.squareDiagonalFailure(540, 760, 1.05, lt);
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'slam');
  }

  // 4 · THE FAILURE POINT: Slipped square plunging into workers
  {
    const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 780], note: 'square crush failure alert',
      draw(lt) {
        ctx.fillStyle = '#1A1829'; ctx.fillRect(-300, -300, W + 600, H + 600);
        MK.squareDiagonalFailure(540, 760, 1.1, lt);
        K.warning(540, 240, 1.0);
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'slam');
  }

  // 5 · CONSTANT DIAMETER PROOF: Circle never falls through
  {
    const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 780], note: 'circle cannot fall in proof',
      draw(lt) {
        ctx.fillStyle = '#0F172A'; ctx.fillRect(-300, -300, W + 600, H + 600);
        MK.constantDiameterProof(540, 760, 1.05, lt);
        K.pill('CAN NEVER FALL THROUGH!', 540, 240, 46, '#10B981', '#FFFFFF', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'ding');
  }

  // 6 · WORKER EFFICIENCY: Rolling 250 lbs on edge
  {
    const st = cut(5);
    add({ id: 'S06', at: st, cam: [540, 780], note: 'rolling mechanics efficiency',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        MK.rollingMechanics(540, 760, 1.05, lt);
        K.pill('ROLL INSTEAD OF LIFTING', 540, 240, 46, C.ink, '#FBBF24', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'ding');
  }

  // 7 · LOOP OUTRO: Geometric safety saving lives
  {
    const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 780], zoom: 0.1, note: 'loop outro safety lives',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        MK.manholeCoverTop(540, 760, 1.15, lt);
        K.pill('GEOMETRY SAVING LIVES DAILY', 540, 240, 46, C.ink, '#10B981', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'ding');
  }

  return { shots: S, cues: CUES };
}
