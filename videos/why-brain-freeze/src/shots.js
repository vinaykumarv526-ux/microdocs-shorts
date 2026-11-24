// AUTO-GENERATED 2D FLAT ARCHITECTURAL MODEL: What REALLY Causes a Brain Freeze? 🍦🧠 #Shorts
import { ctx, C, W, H, clamp, lerp, seg, eo, eio, eob, rnd, bigText, rr, circle, ell, line, fillAll } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
import * as TK from './core/trainKit.js';

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);

  // 1 · HOOK: High speed streamlined motion & opening challenge
  {
    const st = cut(0);
    add({ id: 'S01', at: st, cam: [540, 850], zoom: 0.18, note: 'hook opening hero in motion',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        ctx.fillStyle = '#E8F1F5'; ctx.fillRect(-300, -300, W + 600, 1100);
        TK.trainSide(540, 880, 0.95, lt + 0.5);
        if (lt > 1.2) K.shockLines(540, 880, 320, clamp((lt - 1.2) * 4));
        K.pill('BRAIN FREEZE SCIENCE', 540, 420, 52, C.ink, C.yellow, eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'slide', { dur: 3.5 });
  }
  // 2 · THE FLAWED MYTH: Flat assumption cross-section
  {
    const st = cut(1);
    add({ id: 'S02', at: st, cam: [540, 860], zoom: 0.08, note: 'flawed myth flat cross section',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        TK.wheelsetFront(540, 860, 1.15, { mode: 'flat', drift: 0, label: false });
        K.pill('ASSUMPTION: FLAT PROFILE', 540, 480, 50, C.ink, C.white, eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }
  // 3 · THE FAILURE POINT: Violent breakdown & warning alert
  {
    const st = cut(2);
    add({ id: 'S03', at: st, cam: [540, 860], zoom: 0.12, note: 'failure point violent breakdown',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        const shakeIntensity = clamp((lt - 0.2) * 1.5);
        const osc = Math.sin(lt * 48) * (50 * shakeIntensity);
        const tilt = Math.sin(lt * 48) * (0.08 * shakeIntensity);
        TK.wheelsetFront(540, 860, 1.15, { mode: 'flat', drift: osc, tilt, label: false });
        if (lt > 0.4) K.warning(540, 480, eob(seg(lt, 0.4, 0.7)));
        if (lt > 0.9) K.redX(540, 860, 1.3, 0.9);
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'slam');
  }
  // 4 · THE ARCHITECTURAL SECRET: Technical cutaway & component tags
  {
    const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 840], zoom: 0.1, note: 'architectural secret schematic cutaway',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        TK.wheelConeMacro(540, 840, 1.18, { contactU: 0.5 });
        K.pill('1:20 TAPERED CONE PROFILE', 540, 420, 52, C.yellow, C.ink, eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.35, 'pop');
  }
  // 5 · DYNAMICS / FLOW: Conical geometry shift
  {
    const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 840], zoom: 0.08, note: 'dynamics flow geometry shift',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        const drift = lerp(0, -65, eio(seg(lt, 0.2, 1.8)));
        TK.wheelsetFront(540, 840, 1.15, { mode: 'cone', drift, label: false });
        if (lt > 0.6) {
          K.tag('WIDER RADIUS: FASTER', 300, 480, 240 + drift, 780, 36, eob(seg(lt, 0.6, 0.9)));
          K.tag('NARROWER: SLOWER', 780, 480, 840 + drift, 780, 36, eob(seg(lt, 0.6, 0.9)));
        }
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }
  // 6 · SELF-BALANCING LOOP: Feedback correction around curve
  {
    const st = cut(5);
    add({ id: 'S06', at: st, cam: [540, 800], zoom: 0.08, note: 'self balancing loop track curve',
      draw(lt, d) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        const prog = clamp(lt / (d || 3));
        TK.trackCurvingTop(540, 800, 1.05, { trainCurve: 1.0, progress: prog });
        K.pill('AUTOMATIC SELF-CENTERING', 540, 360, 48, '#06B6D4', C.white, eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'ding');
  }
  // 7 · LOOP OUTRO: High-speed resolution looping to Cut 1
  {
    const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 850], zoom: 0.15, note: 'loop outro seamless resolution',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        ctx.fillStyle = '#E8F1F5'; ctx.fillRect(-300, -300, W + 600, 1100);
        TK.trainSide(540, 880, 0.95, lt + 2.0);
        K.pill('THE ARCHITECTURAL PRINCIPLE', 540, 420, 48, C.ink, '#10B981', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'ding');
  }
  return { shots: S, cues: CUES };
}
