// 2D FLAT ARCHITECTURAL MODEL: Why Are Traffic Lights Red, Yellow, and Green? 🚦
import { ctx, C, W, H, clamp, lerp, seg, eo, eio, eob, rnd, bigText, rr, circle, ell, line, fillAll } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
import * as TLK from './core/trafficKit.js';

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);

  // 1 · HOOK: The classic 3-lens traffic signal head with active red light
  {
    const st = cut(0);
    add({ id: 'S01', at: st, cam: [540, 780], zoom: 0.12, note: 'traffic signal housing hook',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        TLK.trafficSignalHousing(540, 760, 1.25, 'red', lt);
        K.pill('UNIVERSAL SIGNAL CODE', 540, 240, 52, C.ink, '#FFD43B', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 2 · THE 19TH CENTURY RAILWAY ORIGIN: British railroad semaphore mast
  {
    const st = cut(1);
    add({ id: 'S02', at: st, cam: [540, 780], note: '19th century British railway origins',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        TLK.trafficColorProtocol(540, 760, 0.95, lt);
        K.pill('1860s BRITISH RAILWAYS', 540, 260, 48, C.ink, '#38BDF8', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 3 · OPTICAL SPECTRUM: Longest wavelength of visible light
  {
    const st = cut(2);
    add({ id: 'S03', at: st, cam: [540, 780], zoom: 0.08, note: 'optical wavelength spectrum',
      draw(lt) {
        ctx.fillStyle = '#0F172A'; ctx.fillRect(-300, -300, W + 600, H + 600);
        TLK.wavelengthSpectrum(540, 750, 0.95, lt);
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'pop');
  }

  // 4 · FOG SCATTERING DYNAMICS: Rayleigh scattering resistance
  {
    const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 780], note: 'atmospheric fog scattering dynamics',
      draw(lt) {
        ctx.fillStyle = '#0B132B'; ctx.fillRect(-300, -300, W + 600, H + 600);
        TLK.fogScatteringSim(540, 760, 0.95, lt);
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'slide', { dur: 2.5 });
  }

  // 5 · THE FAILURE POINT: Clear white light railway disaster
  {
    const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 780], note: 'railway white light collision failure',
      draw(lt) {
        ctx.fillStyle = '#1A1829'; ctx.fillRect(-300, -300, W + 600, H + 600);
        TLK.railwayWhiteCrash(540, 760, 0.95, lt);
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'slam');
  }

  // 6 · STANDARDIZED ADOPTION: Green for proceed, Yellow for caution
  {
    const st = cut(5);
    add({ id: 'S06', at: st, cam: [540, 780], note: 'green and yellow adoption',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        TLK.trafficColorProtocol(540, 760, 0.95, lt);
        K.pill('CAUTION TRANSITION PROTOCOL', 540, 260, 48, C.ink, '#F59E0B', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'ding');
  }

  // 7 · LOOP OUTRO: Synchronized signal cycle saving millions
  {
    const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 780], zoom: 0.1, note: 'loop outro signal cycle',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        // Cycle green then yellow then red
        const active = lt < 1.4 ? 'green' : lt < 2.4 ? 'yellow' : 'red';
        TLK.trafficSignalHousing(540, 760, 1.25, active, lt);
        K.pill('KEEPING HUNDREDS OF MILLIONS SAFE', 540, 240, 46, C.ink, '#10B981', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'ding');
  }

  return { shots: S, cues: CUES };
}
