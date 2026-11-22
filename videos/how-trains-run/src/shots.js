// HOW A TRAIN ACTUALLY RUNS: shot list and sound cues
import { ctx, C, W, H, clamp, lerp, seg, eo, eio, eob, rnd, bigText } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
import * as TK from './core/trainKit.js';

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);

  // ── 1 · HOOK: High-speed locomotive speeding across the landscape ─────────
  {
    const st = cut(0), derail = Wd('derail', 0) - st;
    add({
      id: 'S01', at: st, cam: [540, 850], zoom: 0.18, note: 'train rushing, camera zooms into wheels on derail',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        // Sky background tone
        ctx.fillStyle = '#E8F1F5'; ctx.fillRect(-300, -300, W + 600, 1100);

        // Train moving at high speed
        const t = lt + 0.5;
        TK.trainSide(540, 880, 0.95, t);

        // Speed alert on "derail"
        if (lt > derail) {
          K.shockLines(540, 880, 320, clamp((lt - derail) * 4));
        }
      }
    });
    cue(st, 'whoosh');
    cue(st + 0.3, 'slide', { dur: 3.5 });
    cue(st + derail, 'alarm', { dur: 1.2, gain: 0.5 });
  }

  // ── 2 · FLAT WHEEL ASSUMPTION: Cross-section of flat cylinders on rails ───
  {
    const st = cut(1), flatWd = Wd('flat', 1) - st;
    add({
      id: 'S02', at: st, cam: [540, 860], zoom: 0.08, note: 'front view, flat cylindrical wheels on rails',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        TK.wheelsetFront(540, 860, 1.15, { mode: 'flat', drift: 0, label: false });
        if (lt > flatWd) {
          K.tag('ASSUMPTION: FLAT WHEELS', 540, 480, 540, 720, 52, eob(seg(lt, flatWd, flatWd + 0.25)));
        } else {
          K.pill('FLAT CYLINDERS', 540, 480, 50, C.ink, C.white);
        }
      }
    });
    cue(st, 'whoosh');
    cue(st + flatWd, 'pop');
  }

  // ── 3 · THE DANGER: Violent oscillation and big RED X ────────────────────
  {
    const st = cut(2), shakeWd = Wd('shake', 2) - st, tracksWd = Wd('tracks', 2) - st;
    add({
      id: 'S03', at: st, cam: [540, 860], zoom: 0.12, note: 'violent shaking, red X slams down',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);

        // Violent oscillation shaking back and forth
        const shakeIntensity = clamp((lt - 0.2) * 1.5);
        const osc = Math.sin(lt * 48) * (50 * shakeIntensity);
        const tilt = Math.sin(lt * 48) * (0.08 * shakeIntensity);

        TK.wheelsetFront(540, 860, 1.15, { mode: 'flat', drift: osc, tilt, label: false });

        // Warning flashes
        if (lt > shakeWd) {
          K.warning(540, 480, eob(seg(lt, shakeWd, shakeWd + 0.25)));
        }

        // Red X slams down on "tracks"
        if (lt > tracksWd) {
          const xProgress = eo(seg(lt, tracksWd, tracksWd + 0.2));
          K.redX(540, 860, lerp(1.8, 1.1, xProgress), 1);
        }
      }
    });
    cue(st, 'whoosh');
    cue(st + shakeWd, 'alarm', { dur: 2.0, gain: 0.6 });
    cue(st + tracksWd, 'slam', { gain: 0.8 });
  }

  // ── 4 · THE SECRET: Tapered Conical Shape (1:20 angle) ───────────────────
  {
    const st = cut(3), taperWd = Wd('tapered', 3) - st, coneWd = Wd('cones', 3) - st;
    add({
      id: 'S04', at: st, cam: [540, 840], zoom: 0.1, note: 'wheel cross section revealing 1:20 conical slope',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);

        // Macro view of the conical wheel contacting the rail
        TK.wheelConeMacro(540, 840, 1.18, { contactU: 0.5 });

        // Taper highlight pop
        if (lt > taperWd) {
          K.pill('TAPERED CONE PROFILE', 540, 420, 56, C.yellow, C.ink, eob(seg(lt, taperWd, taperWd + 0.3)));
        }
      }
    });
    cue(st, 'whoosh');
    cue(st + taperWd, 'sparkle', { dur: 1.2 });
    cue(st + coneWd, 'pop');
  }

  // ── 5 · DYNAMICS: Drift to one side -> wheel widens ─────────────────────
  {
    const st = cut(4), driftsWd = Wd('drifts', 4) - st, widerWd = Wd('wider', 4) - st;
    add({
      id: 'S05', at: st, cam: [540, 840], zoom: 0.08, note: 'wheelset drifts left, left wheel radius increases',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);

        // Drift slowly leftward
        const driftP = eio(seg(lt, driftsWd, driftsWd + 1.6));
        const drift = lerp(0, -65, driftP);

        TK.wheelsetFront(540, 840, 1.15, { mode: 'cone', drift, label: false });

        // Indicators showing wheel radius difference (positioned within canvas bounds)
        if (lt > widerWd) {
          K.tag('WIDER RADIUS: FASTER', 300, 480, 240 + drift, 780, 38, eob(seg(lt, widerWd, widerWd + 0.25)));
          K.tag('NARROWER: SLOWER', 780, 480, 840 + drift, 780, 38, eob(seg(lt, widerWd, widerWd + 0.25)));
        }
      }
    });
    cue(st, 'whoosh');
    cue(st + driftsWd, 'slide', { dur: 1.6 });
    cue(st + widerWd, 'pop');
  }

  // ── 6 · SELF-STEERING: Top-down view around a curved track ──────────────
  {
    const st = cut(5), centerWd = Wd('center', 5) - st;
    add({
      id: 'S06', at: st, cam: [540, 800], zoom: 0.08, note: 'top view of curving rails, self-steering back to center',
      draw(lt, d) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);

        // Progress along the curve
        const progress = clamp(lt / d);
        TK.trackCurvingTop(540, 800, 1.05, { trainCurve: 1.0, progress });

        if (lt > centerWd) {
          K.pill('AUTOMATIC SELF-CENTERING', 540, 360, 50, C.cyanDark, C.white, eob(seg(lt, centerWd, centerWd + 0.3)));
        }
      }
    });
    cue(st, 'whoosh');
    cue(st + 0.3, 'slide', { dur: 2.2 });
    cue(st + centerWd, 'boing', { gain: 0.5 });
  }

  // ── 7 · TRACTION MOTOR: Electric motor x-ray cutaway ─────────────────────
  {
    const st = cut(6), motorWd = Wd('motors', 6) - st, axleWd = Wd('axles', 6) - st;
    add({
      id: 'S07', at: st, cam: [540, 850], zoom: 0.08, note: 'x-ray traction motor turning gears and drive axle',
      draw(lt, d, t) {
        ctx.fillStyle = '#08121E'; ctx.fillRect(-300, -300, W + 600, H + 600);
        TK.tractionMotorXray(540, 850, 1.02, t);
      }
    });
    cue(st, 'whoosh');
    cue(st + motorWd, 'pop');
    cue(st + axleWd, 'zip', { gain: 0.6 });
  }

  // ── 8 · CONTACT MACRO: Coin-sized contact patch with zero friction ───────
  {
    const st = cut(7), tonsWd = Wd('tons', 7) - st, frictionWd = Wd('friction', 7) - st;
    add({
      id: 'S08', at: st, cam: [540, 840], zoom: 0.1, note: 'macro rail-wheel contact point the size of a coin',
      draw(lt, d, t) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        TK.steelContactMacro(540, 840, 1.18, t);
      }
    });
    cue(st, 'whoosh');
    cue(st + tonsWd, 'thud');
    cue(st + frictionWd, 'sparkle', { dur: 1.5 });
  }

  // ── 9 · OUTRO: The train glides into the distance ────────────────────────
  {
    const st = cut(8), guideWd = Wd('guide', 8) - st;
    add({
      id: 'S09', at: st, cam: [540, 850], zoom: 0.12, note: 'full train smoothly cruising past, loop outro',
      draw(lt, d, t) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        ctx.fillStyle = '#E8F1F5'; ctx.fillRect(-300, -300, W + 600, 1100);

        TK.trainSide(540, 880, 0.95, t * 1.5);

        if (lt > guideWd) {
          K.pill('CONES STEER. RAILS GUIDE.', 540, 480, 56, C.yellow, C.ink, eob(seg(lt, guideWd, guideWd + 0.3)));
        }
      }
    });
    cue(st, 'whoosh');
    cue(st + 0.3, 'slide', { dur: 3.0 });
  }

  return { shots: S, cues: CUES };
}
