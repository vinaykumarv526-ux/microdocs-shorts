// WHY YOU SHOULD NEVER POP A PIMPLE IN THE DANGER TRIANGLE : 3D Deep Dive Short
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
  const hero = new Human({ skin: '#E5AA88', shirt: '#3B82F6', pants: '#1E293B', hair: '#1A1410' });
  hero.group.position.set(0.1, 0, -0.6);
  K.scene.add(hero.group);

  const X = SETS.xrayStage(E);
  const xh = new Human({ skin: '#E5AA88' });
  const xmat = SETS.xrayMaterial('#4FD1E8');
  xh.setBodyMaterial(xmat);
  const I = SETS.insides();
  xh.spine.add(I.group);
  X.scene.add(xh.group);

  const VS = SETS.vessel(E);

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

  // 1 · HOOK: Danger Triangle on Face
  {
    const st = cut(0);
    add({
      id: 'S01', at: st, note: 'face close-up, danger triangle highlight',
      draw(lt, d, t, blit) {
        reset();
        hero.pose({
          head: [-2 + Math.sin(lt * 2) * 2, 0, 0],
          lid: 0.05
        });

        cam.position.copy(lerpV(V3(0.3, 1.74, 0.45), V3(0.18, 1.70, 0.15), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, { ...KLOOK, focus: cam.position.distanceTo(FACE) });
        blit();

        pill('THE DANGER TRIANGLE', 540, 300, eob(seg(lt, 0.1, 0.45)), '#FF3B30', 'rgba(25,8,8,0.92)', 68);
        warning(540, 520, eob(seg(lt, 0.5, 0.9)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.5, 'pop', { gain: 0.8 });
  }

  // 2 · NOSE BRIDGE TO MOUTH CORNERS
  {
    const st = cut(1);
    add({
      id: 'S02', at: st, note: 'close-up nose to lips, anatomical boundary',
      draw(lt, d, t, blit) {
        reset();
        hero.pose({ head: [2, 0, 0], lid: 0.1 });
        cam.position.copy(lerpV(V3(0.1, 1.68, 0.35), V3(0.1, 1.67, 0.18), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, { ...KLOOK, focus: cam.position.distanceTo(FACE) });
        blit();

        pill('ANATOMICAL ZONE', 540, 300, eob(seg(lt, 0, 0.35)), '#FFD43B', 'rgba(12,14,20,0.85)', 64);
        const [nx, ny] = screen(V3(0.1, 1.70, -0.5), cam);
        label('NOSE BRIDGE TO MOUTH', 740, 500, nx, ny, eob(seg(lt, 0.4, 0.8)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.4, 'pop', { gain: 0.5 });
  }

  // 3 · ZERO VALVES IN FACIAL VEINS
  {
    const st = cut(2);
    add({
      id: 'S03', at: st, note: 'x-ray head: facial veins have zero valves',
      draw(lt, d, t, blit) {
        reset();
        xmat.uniforms.uCol.value.copy(AMBER);
        xh.pose({ head: [6, -4, 0] });
        cam.position.copy(lerpV(V3(0.42, 1.65, 1.2), V3(0.2, 1.60, 0.8), eio(lt / d)));
        cam.lookAt(0.1, 1.55, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: cam.position.distanceTo(V3(0.1, 1.55, 0)) });
        blit();

        pill('FACIAL VEINS: ZERO VALVES', 540, 300, eob(seg(lt, 0, 0.35)), '#FFD43B', 'rgba(12,14,20,0.85)', 64);
        const [vx, vy] = screen(V3(0.1, 1.64, 0.05), cam);
        label('NO BACKFLOW PREVENTION', 740, 520, vx, vy, eob(seg(lt, 0.3, 0.7)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', { gain: 0.6 });
  }

  // 4 · BLOOD FLOWS STRAIGHT INTO BRAIN (Cavernous Sinus)
  {
    const st = cut(3);
    add({
      id: 'S04', at: st, note: 'x-ray orbit up to base of skull',
      draw(lt, d, t, blit) {
        reset();
        xmat.uniforms.uCol.value.copy(RED);
        xh.pose({ head: [10, 0, 0] });
        cam.position.copy(lerpV(V3(0.35, 1.68, 0.9), V3(0.12, 1.72, 0.5), eio(lt / d)));
        cam.lookAt(0.1, 1.65, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: 0.6 });
        blit();

        pill('DIRECT LINK TO BRAIN', 540, 300, eob(seg(lt, 0, 0.35)), '#FF3B30', 'rgba(30,8,8,0.92)', 64);
        const [bx, by] = screen(V3(0.1, 1.72, 0.02), cam);
        label('CAVERNOUS SINUS (BASE OF BRAIN)', 720, 500, bx, by, eob(seg(lt, 0.3, 0.7)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', { gain: 0.7 });
  }

  // 5 · SQUEEZING PUSHES BACTERIA (Vessel Macro)
  {
    const st = cut(4);
    add({
      id: 'S05', at: st, note: 'blood vessel macro: bacteria invasion',
      draw(lt, d, t, blit) {
        const dark = clamp(lt / d, 0, 1);
        VS.update(lt, cam.position.z, dark * 0.9, dark * 0.7);
        cam.position.z = 2.5 - lt * 0.8;
        cam.position.x = Math.sin(lt * 0.7) * 0.12;
        cam.position.y = Math.cos(lt * 0.6) * 0.1;
        cam.lookAt(0, 0, cam.position.z - 4);
        E.render(VS.scene, cam, { aperture: 0.005, maxblur: 0.012, bloom: 0.6, bloomThreshold: 0.5, focus: 3.2 });
        blit();

        pill('SQUEEZING PORES', 540, 300, eob(seg(lt, 0, 0.35)), '#FF3B30', 'rgba(25,8,8,0.9)', 64);
        pill('BACTERIA ENTERS BLOODSTREAM', 540, 1180, eob(seg(lt, 0.6, 1.0)), '#FFD43B', 'rgba(20,18,10,0.9)', 58);
      }
    });
    cue(st, 'whoosh');
  }

  // 6 · CAVERNOUS SINUS THROMBOSIS
  {
    const st = cut(5);
    add({
      id: 'S06', at: st, note: 'infected blood clot behind eye sockets',
      draw(lt, d, t, blit) {
        reset();
        const pulse = (Math.sin(lt * 10) + 1) * 0.5;
        xmat.uniforms.uCol.value.copy(RED).multiplyScalar(0.7 + 0.3 * pulse);
        xh.pose({ head: [8, 0, 0], lid: 0.7 });

        cam.position.copy(lerpV(V3(0.28, 1.70, 0.75), V3(0.12, 1.66, 0.4), eio(lt / d)));
        cam.lookAt(0.1, 1.65, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: 0.5, vignette: 0.65 });
        blit();

        pill('BLOOD CLOT IN BRAIN', 540, 280, eob(seg(lt, 0, 0.35)), '#FF3B30', 'rgba(30,5,5,0.95)', 66);
        warning(540, 500, eob(seg(lt, 0.4, 0.8)));
        const [ex, ey] = screen(V3(0.1, 1.68, 0.05), cam);
        label('CAVERNOUS SINUS THROMBOSIS', 720, 720, ex, ey, eob(seg(lt, 0.5, 0.9)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.4, 'pop', { gain: 0.9 });
  }

  // 7 · BLINDNESS, ABSCESS, FATAL
  {
    const st = cut(6);
    add({
      id: 'S07', at: st, note: 'dark blackout, blindness and stroke risk',
      draw(lt, d, t, blit) {
        reset();
        xh.pose({ head: [14, 0, 0], spine: [10, 0, 0], lid: 1.0 });
        cam.position.copy(lerpV(V3(0.4, 1.5, 1.4), V3(0.2, 1.4, 0.9), eio(lt / d)));
        cam.lookAt(0.1, 1.3, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: 1.1, vignette: 0.75 });
        blit();

        blackout(0.3 + 0.2 * Math.sin(lt * 4));
        pill('CRITICAL COMPLICATIONS', 540, 280, eob(seg(lt, 0, 0.35)), '#FFFFFF', 'rgba(180,20,20,0.95)', 66);
        pill('PERMANENT BLINDNESS & STROKE', 540, 1180, eob(seg(lt, 0.5, 0.9)), '#FF3B30', 'rgba(30,5,5,0.95)', 62);
      }
    });
    cue(st, 'whoosh');
  }

  // 8 · OUTRO: Leave It Alone
  {
    const st = cut(7);
    add({
      id: 'S08', at: st, note: 'hero smiling in sunlight, clear face',
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

        pill('NEVER POP · LET IT HEAL', 540, 1180, eob(seg(lt, 0.2, 0.7)), '#4ADE80', 'rgba(10,25,15,0.95)', 72);
      }
    });
    cue(st, 'whoosh');
  }

  return { shots: S, cues: CUES };
}
