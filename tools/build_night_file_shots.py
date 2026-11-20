from pathlib import Path

PROJ_DIR = Path("test_build/03_night_file")

shots_js = """// NIGHT FILE 3D: WHAT IF HUMANS COULD BREATHE UNDERWATER?
import * as THREE from 'three';
import { ctx, setCtx, W, H, clamp, lerp, seg, eo, eio, eob, rr } from './core/lib.js';
import { L, Wd, T } from './core/timing.js';
import { camera } from './core/engine.js';
import { Human } from './core/human.js';
import * as SETS from './core/sets3d.js';
import * as K from './core/kit.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z), lerpV = (a, b, k) => a.clone().lerp(b, k);
const NIGHT = { exposure: 1.25, bloom: 0.85, bloomThreshold: 0.55, vignette: 0.6, grain: 0.05, warm: 0 };

function paper(x, y, w, h, rot, lines, sc = 1) {
  if (sc <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.shadowColor = 'rgba(0,0,0,0.7)'; ctx.shadowBlur = 40;
  rr(-w / 2, -h / 2, w, h, 6); ctx.fillStyle = K.P.paper; ctx.fill(); ctx.shadowBlur = 0; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  lines.forEach(([txt, size, col, dy]) => { ctx.font = `700 ${size}px FreeMono`; ctx.fillStyle = col || K.P.ink; ctx.fillText(txt, -w / 2 + 40, -h / 2 + dy); });
  ctx.restore();
}

export function buildShots(E) {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.1);
  const cam = camera(34);
  const C = SETS.corridor();
  const person = (kind) => { const h = new Human({ face: false }); h.setAllMaterial(kind === 'subject' ? SETS.subjectMat() : SETS.witnessMat()); return h; };
  const diver = person('subject'); C.scene.add(diver.group);

  const render = (scene, focusP, extra = {}) => {
    if (cam.fov !== (extra.fov || 34)) { cam.fov = extra.fov || 34; cam.updateProjectionMatrix(); }
    E.render(scene, cam, { ...NIGHT, focus: cam.position.distanceTo(focusP), aperture: 0.0012, ...extra });
  };

  // 1 · Oceanic Classified Dossier: Depth 0 Meters
  add({ id: 'S01', at: 0, note: 'dark chamber date types on', draw(lt, d, t, blit) {
    diver.group.position.set(0, 0, -4);
    cam.position.copy(lerpV(V3(0.3, 1.55, 1.8), V3(0.15, 1.5, 0.6), eio(lt / d)));
    cam.lookAt(0, 1.1, -10);
    render(C.scene, V3(0, 1, -4)); blit();
    K.dateStamp('CLASSIFIED REPORT', 'OCEANIC DEPTH EXPERIMENT', clamp(lt / 1.6), 80, 300);
  } });
  cue(0.3, 'tock', { gain: 0.4 });

  // 2 · Glowing Subject: Human Gills Mutation
  { const st = cut(1);
    add({ id: 'S02', at: st, note: 'glowing crimson subject moves forward', draw(lt, d, t, blit) {
      diver.group.position.set(0, 0, lerp(-7, -3.2, lt / d));
      diver.walk(lt * 5.2, 0.8);
      cam.position.copy(lerpV(V3(0.25, 1.5, 0.4), V3(0.2, 1.45, -0.2), eio(lt / d)));
      cam.lookAt(0, 1.2, -6);
      render(C.scene, diver.group.position.clone().add(V3(0, 1.2, 0))); blit();
    } });
    cue(st, 'whoosh', { gain: 0.5 }); }

  // 3 · Case File: 70% Territorial Expansion
  { const st = cut(2);
    add({ id: 'S03', at: st, note: 'case file insert', draw(lt, d, t, blit) {
      cam.position.set(0.1, 1.4, -6.5); cam.lookAt(0, 1.0, -10);
      render(C.scene, V3(0, 1, -5), { aperture: 0.01, maxblur: 0.014 }); blit();
      const k = eo(clamp(lt / 0.5));
      paper(540, lerp(1100, 860, k), 820, 460, -0.04, [
        ['DEPARTMENT OF NAVAL RESEARCH', 34, K.P.redDeep, 70],
        ['FILE: UNDERWATER HABITATION', 40, null, 140],
        ['SUBJECT:', 34, '#6A6458', 230],
        ['GLOBAL SEAS: 70%', 74, null, 320],
        ['EXPANSION: UNLIMITED', 34, '#6A6458', 400]
      ], k);
    } });
    cue(st, 'whoosh', { gain: 0.5 }); }

  // 4 · Pressure Warning: Case Dossier Stamped DANGER
  { const st = cut(3);
    add({ id: 'S04', at: st, note: 'warning stamp on dossier', draw(lt, d, t, blit) {
      cam.position.set(0, 1.5, -4); cam.lookAt(0, 1.1, -10);
      render(C.scene, V3(0, 1, -4)); blit();
      K.caseFile(540, 880, eo(clamp(lt / 0.5)), 'HYDROSTATIC CRUSH', 'LETHAL');
    } });
    cue(st, 'whoosh', { gain: 0.5 }); cue(st + 0.4, 'thud'); }

  // 5 · 200 Feet: Deep Pressure Anomaly
  { const st = cut(4);
    add({ id: 'S05', at: st, note: 'subject in dark corridor with flicker', draw(lt, d, t, blit) {
      diver.group.position.set(0.3, 0, -4.5);
      cam.position.set(-0.2, 1.4, -2.5); cam.lookAt(0.3, 1.2, -4.5);
      render(C.scene, V3(0.3, 1.2, -4.5)); blit();
      K.redacted(200, 400, 680, 50, clamp(lt / 0.4));
    } });
    cue(st, 'whoosh', { gain: 0.5 }); }

  // 6 · Predators of the Mariana Trench: Polaroid evidence
  { const st = cut(5);
    add({ id: 'S06', at: st, note: 'polaroid evidence of abyss predator', draw(lt, d, t, blit) {
      cam.position.set(0, 1.4, -5); cam.lookAt(0, 1.0, -10);
      render(C.scene, V3(0, 1, -5), { aperture: 0.01 }); blit();
      K.polaroid(540, 850, eo(clamp(lt / 0.4)), -0.06, 'dark');
      K.redCircle(540, 850, 180, 180, clamp(lt / 0.8));
    } });
    cue(st, 'whoosh', { gain: 0.5 }); cue(st + 0.3, 'slide'); }

  // 7 · Outro: UNSOLVED Stamp
  { const st = cut(6);
    add({ id: 'S07', at: st, note: 'unsolved stamp over ocean file', draw(lt, d, t, blit) {
      cam.position.set(0, 1.5, -3); cam.lookAt(0, 1.2, -8);
      render(C.scene, V3(0, 1, -4)); blit();
      K.caseFile(540, 880, 1, 'ATLANTIC EXPEDITION', 'UNSOLVED');
    } });
    cue(st, 'whoosh', { gain: 0.5 }); cue(st + 0.3, 'thud'); }

  return { shots: S, cues: CUES };
}
"""

with open(PROJ_DIR / "src/shots.js", "w", encoding="utf-8") as f:
    f.write(shots_js)

print("Night File shots.js written successfully!")
