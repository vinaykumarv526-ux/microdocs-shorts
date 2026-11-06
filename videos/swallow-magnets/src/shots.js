// WHAT HAPPENS IF YOU SWALLOW MAGNETIC BALLS? : 3D Deep Dive Short
import * as THREE from 'three';
import { ctx, W, H, clamp, lerp, seg, eo, eio, eob } from './core/lib.js';
import { L, Wd, T } from './core/timing.js';
import { camera } from './core/engine.js';
import { Human } from './core/human.js';
import * as SETS from './core/sets.js';
import { label, pill, warning, blackout } from './core/look2d.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const lerpV = (a, b, k) => a.clone().lerp(b, k);
function screen(p, cam) { const v = p.clone().project(cam); return [(v.x + 1) / 2 * W, (1 - v.y) / 2 * H]; }

export function buildShots(E) {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const cam = camera(30);

  const KLOOK = { aperture: 0.003, maxblur: 0.01, bloom: 0.3 };
  const XLOOK = { aperture: 0.0015, bloom: 0.65, bloomThreshold: 0.35, vignette: 0.5 };

  // ── Sets & Characters ───────────────────────────────────────────────────
  const K = SETS.kitchen(E);
  const hero = new Human({ skin: '#E5AA88', shirt: '#10B981', pants: '#1F2937', hair: '#2E1F16' });
  hero.group.position.set(0.1, 0, -0.6);
  K.scene.add(hero.group);

  const X = SETS.xrayStage(E);
  const xh = new Human({ skin: '#E5AA88' });
  const xmat = SETS.xrayMaterial('#4FD1E8');
  xh.setBodyMaterial(xmat);
  const I = SETS.insides();
  xh.spine.add(I.group);
  X.scene.add(xh.group);

  const CYAN = new THREE.Color('#4FD1E8');
  const RED = new THREE.Color('#FF2836');
  const AMBER = new THREE.Color('#FFB020');

  const reset = () => {
    hero.pose({});
    xh.pose({});
    I.heart.scale.setScalar(1);
    xmat.uniforms.uCol.value.copy(CYAN);
  };
  const FACE = V3(0.1, 1.68, -0.6);

  // 1 · HOOK: Swallow Two Magnetic Balls
  {
    const st = cut(0);
    add({
      id: 'S01', at: st, note: 'swallowing magnetic balls, shock and concern',
      draw(lt, d, t, blit) {
        reset();
        hero.pose({
          head: [-4, 0, 0],
          shL: [20, 0, 10],
          shR: [20, 0, -10],
          lid: -0.2
        });

        cam.position.copy(lerpV(V3(0.32, 1.72, 0.5), V3(0.18, 1.68, 0.18), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, { ...KLOOK, focus: cam.position.distanceTo(FACE) });
        blit();

        pill('SWALLOWING MAGNETS', 540, 300, eob(seg(lt, 0.1, 0.45)), '#FF3B30', 'rgba(25,8,8,0.92)', 68);
        warning(540, 520, eob(seg(lt, 0.5, 0.9)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.5, 'pop', { gain: 0.8 });
  }

  // 2 · SINGLE MAGNET: Passes Harmlessly
  {
    const st = cut(1);
    add({
      id: 'S02', at: st, note: 'x-ray abdomen: 1 magnet passes harmlessly',
      draw(lt, d, t, blit) {
        reset();
        xh.pose({ head: [4, 0, 0] });
        cam.position.copy(lerpV(V3(0.4, 1.3, 1.4), V3(0.2, 1.25, 0.9), eio(lt / d)));
        cam.lookAt(0, 1.15, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: 1.1 });
        blit();

        pill('SINGLE MAGNET: SAFE', 540, 300, eob(seg(lt, 0, 0.35)), '#4ADE80', 'rgba(10,25,15,0.92)', 64);
        const [mx, my] = screen(V3(0.02, 1.15, 0.05), cam);
        label('PASSES NATURALLY', 720, 520, mx, my, eob(seg(lt, 0.4, 0.8)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.4, 'pop', { gain: 0.5 });
  }

  // 3 · TWO OR MORE: Disaster Begins
  {
    const st = cut(2);
    add({
      id: 'S03', at: st, note: 'two magnets swallowed, danger begins',
      draw(lt, d, t, blit) {
        reset();
        xmat.uniforms.uCol.value.copy(AMBER);
        xh.pose({ head: [8, 0, 0] });
        cam.position.copy(lerpV(V3(0.35, 1.35, 1.2), V3(0.15, 1.25, 0.75), eio(lt / d)));
        cam.lookAt(0, 1.15, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: 0.9 });
        blit();

        pill('TWO OR MORE: CATASTROPHIC', 540, 300, eob(seg(lt, 0, 0.35)), '#FF3B30', 'rgba(30,8,8,0.95)', 64);
        warning(540, 520, eob(seg(lt, 0.4, 0.8)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.4, 'pop', { gain: 0.7 });
  }

  // 4 · DIFFERENT LOOPS OF INTESTINES
  {
    const st = cut(3);
    add({
      id: 'S04', at: st, note: 'magnets travel into separate bowel loops',
      draw(lt, d, t, blit) {
        reset();
        xmat.uniforms.uCol.value.copy(AMBER);
        cam.position.copy(lerpV(V3(0.3, 1.28, 0.9), V3(0.1, 1.22, 0.5), eio(lt / d)));
        cam.lookAt(0, 1.15, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: 0.65 });
        blit();

        pill('SEPARATE INTESTINAL LOOPS', 540, 280, eob(seg(lt, 0, 0.35)), '#FFD43B', 'rgba(15,18,24,0.9)', 62);
        const [p1x, p1y] = screen(V3(-0.06, 1.18, 0.05), cam);
        label('MAGNET 1', 280, 500, p1x, p1y, eob(seg(lt, 0.3, 0.7)));
        const [p2x, p2y] = screen(V3(0.06, 1.12, 0.05), cam);
        label('MAGNET 2', 780, 600, p2x, p2y, eob(seg(lt, 0.5, 0.9)));
      }
    });
    cue(st, 'whoosh');
  }

  // 5 · MAGNETIC SNAP TOGETHER
  {
    const st = cut(4);
    add({
      id: 'S05', at: st, note: 'powerful neodymium attraction snaps tissue shut',
      draw(lt, d, t, blit) {
        reset();
        xmat.uniforms.uCol.value.copy(RED);
        cam.position.set(0.05, 1.2, 0.45);
        cam.lookAt(0, 1.15, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: 0.45, bloom: 0.8 });
        blit();

        pill('NEODYMIUM ATTRACTION', 540, 280, eob(seg(lt, 0, 0.35)), '#FF3B30', 'rgba(30,5,5,0.95)', 66);
        pill('PINCHES INTESTINAL WALLS', 540, 1180, eob(seg(lt, 0.5, 0.9)), '#FFFFFF', 'rgba(25,10,10,0.92)', 62);
      }
    });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', { gain: 0.9 });
  }

  // 6 · ISCHEMIA: BLOOD SUPPLY CUT OFF
  {
    const st = cut(5);
    add({
      id: 'S06', at: st, note: 'clamped tissue turns necrotic',
      draw(lt, d, t, blit) {
        reset();
        const alarm = (Math.sin(lt * 8) + 1) * 0.5;
        xmat.uniforms.uCol.value.copy(RED).multiplyScalar(0.7 + 0.3 * alarm);
        xh.pose({ head: [10, 0, 0], spine: [8, 0, 0], lid: 0.6 });

        cam.position.copy(lerpV(V3(0.35, 1.3, 1.1), V3(0.15, 1.2, 0.65), eio(lt / d)));
        cam.lookAt(0, 1.15, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: 0.8, vignette: 0.65 });
        blit();

        pill('BLOOD SUPPLY CUT OFF', 540, 280, eob(seg(lt, 0, 0.35)), '#FF3B30', 'rgba(30,5,5,0.95)', 66);
        warning(540, 500, eob(seg(lt, 0.3, 0.7)));
        pill('TISSUE NECROSIS IN HOURS', 540, 1180, eob(seg(lt, 0.6, 1.0)), '#FF8020', 'rgba(25,12,6,0.92)', 58);
      }
    });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', { gain: 0.8 });
  }

  // 7 · BOWEL PERFORATION & SEPTIC SHOCK
  {
    const st = cut(6);
    add({
      id: 'S07', at: st, note: 'holes bored through intestine, septic shock',
      draw(lt, d, t, blit) {
        reset();
        xh.pose({ head: [16, 0, 0], spine: [14, 0, 0], lid: 0.9 });
        cam.position.copy(lerpV(V3(0.4, 1.4, 1.3), V3(0.2, 1.3, 0.8), eio(lt / d)));
        cam.lookAt(0, 1.15, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: 0.9, vignette: 0.75 });
        blit();

        blackout(0.25 + 0.2 * Math.sin(lt * 5));
        pill('BOWEL PERFORATION', 540, 280, eob(seg(lt, 0, 0.35)), '#FFFFFF', 'rgba(180,20,20,0.95)', 68);
        pill('SEPTIC SHOCK & INFECTION', 540, 1180, eob(seg(lt, 0.5, 0.9)), '#FF3B30', 'rgba(30,5,5,0.95)', 62);
      }
    });
    cue(st, 'whoosh');
  }

  // 8 · EMERGENCY SURGERY REQUIRED
  {
    const st = cut(7);
    add({
      id: 'S08', at: st, note: 'emergency hospital surgical intervention',
      draw(lt, d, t, blit) {
        reset();
        cam.position.set(0.1, 1.35, 1.2);
        cam.lookAt(0, 1.2, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: 1.2 });
        blit();

        pill('EMERGENCY SURGERY REQUIRED', 540, 600, eob(seg(lt, 0.1, 0.5)), '#FF3B30', 'rgba(30,5,5,0.95)', 68);
      }
    });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.7 });
  }

  // 9 · OUTRO: Never Play With Magnets Near Mouth
  {
    const st = cut(8);
    add({
      id: 'S09', at: st, note: 'hero safe in room, life saving reminder',
      draw(lt, d, t, blit) {
        reset();
        hero.pose({
          head: [-2, 0, 0],
          lid: -0.2,
          look: [0, 0]
        });

        cam.position.copy(lerpV(V3(0.1, 1.64, 0.7), V3(0.1, 1.66, 1.1), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, { ...KLOOK, focus: cam.position.distanceTo(FACE) });
        blit();

        pill('NEVER PUT MAGNETS IN MOUTH', 540, 1180, eob(seg(lt, 0.2, 0.7)), '#FFD43B', 'rgba(15,18,24,0.95)', 68);
      }
    });
    cue(st, 'whoosh');
  }

  return { shots: S, cues: CUES };
}
