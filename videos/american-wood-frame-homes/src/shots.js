// 2D FLAT ARCHITECTURAL MODEL: Why Are Most American Houses Made of Wood? 🪵🏠
import { ctx, C, W, H, clamp, lerp, seg, eo, eio, eob, rnd, bigText, rr, circle, ell, line, fillAll } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
import * as WHK from './core/woodHouseKit.js';

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);

  // 1 · HOOK: Split elevation cutaway (siding vs 2x4 stud skeleton)
  {
    const st = cut(0);
    add({ id: 'S01', at: st, cam: [540, 780], zoom: 0.12, note: 'wood framing house cutaway hook',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        WHK.houseFramingCutaway(540, 760, 1.1, lt);
        K.pill('AMERICAN HOUSING ARCHITECTURE', 540, 240, 50, C.ink, '#FFD43B', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 2 · THE ARCHITECTURAL SECRET: Geography & engineering efficiency
  {
    const st = cut(1);
    add({ id: 'S02', at: st, cam: [540, 780], note: 'structural platform framing detail',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        WHK.houseFramingCutaway(540, 760, 1.1, lt);
        K.pill('ENGINEERING & EFFICIENCY', 540, 240, 48, C.ink, '#38BDF8', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 3 · VAST SUSTAINABLE TIMBERLAND: North American pine forests & milling
  {
    const st = cut(2);
    add({ id: 'S03', at: st, cam: [540, 780], zoom: 0.08, note: 'sustainable timber forestry',
      draw(lt) {
        ctx.fillStyle = '#064E3B'; ctx.fillRect(-300, -300, W + 600, H + 600);
        WHK.lumberForestry(540, 760, 1.05, lt);
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'pop');
  }

  // 4 · SPEED & MODULARITY: Framing in days vs months
  {
    const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 780], note: 'rapid light-frame construction speed',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        WHK.houseFramingCutaway(540, 760, 1.1, lt);
        K.pill('FRAMED IN JUST A FEW DAYS', 540, 240, 48, '#10B981', '#FFFFFF', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 5 · SEISMIC & WIND DYNAMICS: Flexible dissipation vs brittle brick collapse
  {
    const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 780], note: 'seismic flex comparison',
      draw(lt) {
        ctx.fillStyle = '#0F172A'; ctx.fillRect(-300, -300, W + 600, H + 600);
        WHK.seismicComparison(540, 760, 1.05, lt);
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'slam');
  }

  // 6 · WALL CAVITY ARCHITECTURE: Plumbing, Electrical & HVAC routing
  {
    const st = cut(5);
    add({ id: 'S06', at: st, cam: [540, 780], note: 'wall cavity utilities and insulation',
      draw(lt) {
        ctx.fillStyle = '#0F172A'; ctx.fillRect(-300, -300, W + 600, H + 600);
        WHK.wallCavityDetail(540, 760, 1.05, lt);
        K.pill('MODULAR UTILITIES & INSULATION', 540, 240, 46, C.ink, '#FBBF24', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'ding');
  }

  // 7 · LOOP OUTRO: Spacious affordable housing for millions
  {
    const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 780], zoom: 0.1, note: 'loop outro affordable housing',
      draw(lt) {
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        WHK.houseFramingCutaway(540, 760, 1.1, lt);
        K.pill('AFFORDABLE HOUSING FOR MILLIONS', 540, 240, 46, C.ink, '#10B981', eob(seg(lt, 0, 0.35)));
      } });
    cue(st, 'whoosh'); cue(st + 0.25, 'ding');
  }

  return { shots: S, cues: CUES };
}
