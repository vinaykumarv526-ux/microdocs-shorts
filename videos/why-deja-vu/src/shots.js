// 2D FLAT ARCHITECTURAL MODEL: Why Do You REALLY Get Déjà Vu? 🌀
import { ctx, C, W, H, clamp, lerp, seg, eo, eio, eob, rnd, bigText, rr, circle, ell, line, fillAll } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
import * as DJK from './core/dejavuKit.js';

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);

  // 1 · HOOK: Human brain profile with glowing temporal memory node
  {
    const st = cut(0);
    add({ id: 'S01', at: st, cam: [540, 780], zoom: 0.12, note: 'brain neural profile hook',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        DJK.brainProfile(540, 760, 1.1, lt);
        K.pill('THE DÉJÀ VU GLITCH', 540, 240, 52, C.ink, '#FFD43B', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 2 · THE ARCHITECTURAL SECRET: A temporary neural misfire
  {
    const st = cut(1);
    add({ id: 'S02', at: st, cam: [540, 780], note: 'temporary brain glitch detail',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        DJK.brainProfile(540, 760, 1.1, lt);
        K.pill('TEMPORARY BRAIN BUFFER LAG', 540, 240, 48, C.ink, '#38BDF8', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 3 · NORMAL SENSORY FLOW: Input to Short-term to Long-term
  {
    const st = cut(2);
    add({ id: 'S03', at: st, cam: [540, 780], zoom: 0.08, note: 'normal sensory flow diagram',
      draw(lt) {
        ctx.fillStyle = '#0F172A'; ctx.fillRect(-300, -300, W + 600, H + 600);
        DJK.memoryBypassDiagram(540, 760, 1.05, lt);
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'pop');
  }

  // 4 · THE 15ms BYPASS MISFIRE: Current sight routed straight into long-term memory
  {
    const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 780], note: '15ms memory bypass misfire',
      draw(lt) {
        ctx.fillStyle = '#0B132B'; ctx.fillRect(-300, -300, W + 600, H + 600);
        DJK.memoryBypassDiagram(540, 760, 1.05, lt);
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'slide', { dur: 2.0 });
  }

  // 5 · TEMPORAL LOBE ILLUSION: Brand new moment perceived as ancient memory
  {
    const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 780], note: 'temporal lobe illusion',
      draw(lt) {
        ctx.fillStyle = '#0B132B'; ctx.fillRect(-300, -300, W + 600, H + 600);
        DJK.memoryBypassDiagram(540, 760, 1.1, lt);
        K.pill('ANCIENT MEMORY ILLUSION', 540, 240, 46, '#EF4444', '#FFFFFF', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'slam');
  }

  // 6 · MEMORY BUFFER LAG: Filing system lagging by fraction of millisecond
  {
    const st = cut(5);
    add({ id: 'S06', at: st, cam: [540, 780], note: 'memory buffer lag explanation',
      draw(lt) {
        ctx.fillStyle = '#0F172A'; ctx.fillRect(-300, -300, W + 600, H + 600);
        DJK.brainProfile(540, 760, 1.1, lt);
        K.pill('FRACTION OF A MILLISECOND LAG', 540, 240, 46, C.ink, '#FBBF24', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'ding');
  }

  // 7 · LOOP OUTRO: Frontal lobe fact-checker healthy and active
  {
    const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 780], zoom: 0.1, note: 'loop outro frontal lobe fact checker',
      draw(lt) {
        ctx.fillStyle = '#0F172A'; ctx.fillRect(-300, -300, W + 600, H + 600);
        DJK.factCheckingOverride(540, 760, 1.05, lt);
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'ding');
  }

  return { shots: S, cues: CUES };
}
