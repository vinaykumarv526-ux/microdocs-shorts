// 2D FLAT ARCHITECTURAL MODEL: Why Airplane Windows Have Tiny Holes
import { ctx, C, W, H, clamp, lerp, seg, eo, eio, eob, rnd, bigText, rr, circle, ell, line, fillAll } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
import * as WK from './core/windowKit.js';

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);

  // 1 · HOOK: Airplane cabin window in flight with 2mm bleed hole callout
  {
    const st = cut(0);
    add({ id: 'S01', at: st, cam: [540, 960], zoom: 0.15, note: 'hook opening cabin window in flight',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        WK.airplaneWindowView(540, 960, 1.0, lt);
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 2 · THE FLAWED MYTH: Defect / crack assumption
  {
    const st = cut(1);
    add({ id: 'S02', at: st, cam: [540, 960], note: 'flawed myth defect crack assumption',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        WK.windowCrossSection(540, 960, 0.95, { showTags: false, showBleed: false });
        K.pill('DEFECT OR CRACK?', 540, 480, 56, C.ink, '#FFD43B', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 3 · THE FAILURE POINT: Violent cabin blowout / red hazard
  {
    const st = cut(2);
    add({ id: 'S03', at: st, cam: [540, 960], note: 'failure point pressure explosion alert',
      draw(lt) {
        ctx.fillStyle = '#0F172A'; ctx.fillRect(-300, -300, W + 600, H + 600);
        WK.windowFailure(540, 960, 0.95, lt);
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'slam');
  }

  // 4 · THE ARCHITECTURAL SECRET: 3-pane acrylic stack
  {
    const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 960], note: 'architectural secret 3-pane stack',
      draw(lt) {
        ctx.fillStyle = '#0B132B'; ctx.fillRect(-300, -300, W + 600, H + 600);
        WK.windowCrossSection(540, 960, 0.95, { showTags: true, showBleed: true, airFlow: lt * 0.5 });
      } });
    cue(st, 'whoosh'); cue(st + 0.35, 'pop');
  }

  // 5 · DYNAMICS / FLOW: 2mm bleed valve airflow
  {
    const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 960], note: 'dynamics flow 2mm bleed valve',
      draw(lt) {
        ctx.fillStyle = '#0F172A'; ctx.fillRect(-300, -300, W + 600, H + 600);
        WK.bleedHoleDynamics(540, 960, 1.0, lt);
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 6 · SELF-BALANCING LOOP: Pressure auto-equalization
  {
    const st = cut(5);
    add({ id: 'S06', at: st, cam: [540, 960], note: 'self balancing loop stress distribution',
      draw(lt) {
        ctx.fillStyle = '#080E18'; ctx.fillRect(-300, -300, W + 600, H + 600);
        WK.pressureBalanceLoop(540, 960, 0.95, lt);
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'ding');
  }

  // 7 · ENGINE X-RAY: Dessicant moisture-wicking matrix
  {
    const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 960], note: 'engine x-ray dessicant channel',
      draw(lt) {
        ctx.fillStyle = '#080E18'; ctx.fillRect(-300, -300, W + 600, H + 600);
        WK.dessicantXray(540, 960, 0.95, lt);
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'slam');
  }

  // 8 · EFFICIENCY METRIC: 2mm aperture holds 4.0 atmospheres
  {
    const st = cut(7);
    add({ id: 'S08', at: st, cam: [540, 960], note: 'efficiency metric 2mm vs 4 atmospheres',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        WK.windowMetric(540, 960, 1.0, lt);
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 9 · LOOP OUTRO: Cabin window in flight returning to Cut 1
  {
    const st = cut(8);
    add({ id: 'S09', at: st, cam: [540, 960], note: 'loop outro seamless return to hook',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        WK.airplaneWindowView(540, 960, 1.0, lt + 2.5);
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'ding');
  }

  return { shots: S, cues: CUES };
}
