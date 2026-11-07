// AUTO-GENERATED 3D DEEP DIVE SHOTS: What If Earth Stopped Spinning For 1 Second? 🌍 #Shorts
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

  const KLOOK = { aperture: 0.003, maxblur: 0.01, bloom: 0.35 };
  const XLOOK = { aperture: 0.0015, bloom: 0.7, bloomThreshold: 0.3, vignette: 0.5 };

  // ── Sets & Characters ──
  const K = SETS.kitchen(E);
  const hero = new Human({ skin: '#E5AA88', shirt: '#1E40AF', pants: '#1C1917', hair: '#1C1917' });
  hero.group.position.set(0.1, 0, -0.6);
  K.scene.add(hero.group);

  const X = SETS.xrayStage(E);
  const xh = new Human({ skin: '#E5AA88' });
  const xmat = SETS.xrayMaterial('#3B82F6');
  xh.setBodyMaterial(xmat);
  const I = SETS.insides();
  xh.spine.add(I.group);
  X.scene.add(xh.group);

  const CYAN = new THREE.Color('#3B82F6');
  const RED = new THREE.Color('#FF2836');
  const AMBER = new THREE.Color('#FFB020');

  const reset = () => {
    hero.pose({});
    xh.pose({});
    I.heart.scale.setScalar(1);
    xmat.uniforms.uCol.value.copy(CYAN);
  };
  const FACE = V3(0.1, 1.68, -0.6);

  // 1 · HOOK
  {
    const st = cut(0);
    add({
      id: 'S01', at: st, note: 'hook opening',
      draw(lt, d, t, blit) {
        reset();
        hero.pose({
          head: [-4, 0, 0],
          shL: [22, 0, 12],
          shR: [22, 0, -12],
          lid: -0.2
        });
        cam.position.copy(lerpV(V3(0.32, 1.74, 0.5), V3(0.18, 1.68, 0.18), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, { ...KLOOK, focus: cam.position.distanceTo(FACE), bloom: 0.5 });
        blit();

        pill('EARTH STOPS SPINNING', 540, 300, eob(seg(lt, 0.1, 0.45)), '#3B82F6', 'rgba(25,10,10,0.95)', 68);
        warning(540, 520, eob(seg(lt, 0.5, 0.9)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.45, 'pop', { gain: 0.8 });
  }

  // 2 · INTERNAL ANATOMY & PHYSIOLOGY
  {
    const st = cut(1);
    add({
      id: 'S02', at: st, note: 'x-ray internal reaction',
      draw(lt, d, t, blit) {
        reset();
        xmat.uniforms.uCol.value.copy(RED);
        xh.pose({ head: [4, -2, 0] });
        cam.position.copy(lerpV(V3(0.40, 1.62, 1.1), V3(0.18, 1.58, 0.75), eio(lt / d)));
        cam.lookAt(0.1, 1.52, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: cam.position.distanceTo(V3(0.1, 1.52, 0)) });
        blit();

        pill('INTERNAL REACTION', 540, 300, eob(seg(lt, 0, 0.35)), '#FF2836', 'rgba(25,10,10,0.92)', 64);
        const [px, py] = screen(V3(0.1, 1.55, 0.1), cam);
        label('CRITICAL ZONE', 720, 500, px, py, eob(seg(lt, 0.3, 0.7)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.35, 'slam', { gain: 0.6 });
  }

  // 3 · ESCALATION & SYMPTOMS
  {
    const st = cut(2);
    add({
      id: 'S03', at: st, note: 'symptom progression',
      draw(lt, d, t, blit) {
        reset();
        hero.pose({
          head: [-5, 4, 0],
          shL: [30, 0, 15],
          shR: [20, 0, -10],
          lid: -0.1
        });
        cam.position.copy(lerpV(V3(0.35, 1.72, 0.55), V3(0.15, 1.66, 0.25), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, { ...KLOOK, focus: cam.position.distanceTo(FACE) });
        blit();

        pill('SYMPTOMS ESCALATE', 540, 300, eob(seg(lt, 0, 0.35)), '#FFB020', 'rgba(25,20,10,0.92)', 64);
        const [fx, fy] = screen(FACE, cam);
        label('RAPID SPREAD', 720, 480, fx, fy, eob(seg(lt, 0.3, 0.7)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', { gain: 0.5 });
  }

  // 4 · INTERNAL ANATOMY & PHYSIOLOGY
  {
    const st = cut(3);
    add({
      id: 'S04', at: st, note: 'x-ray internal reaction',
      draw(lt, d, t, blit) {
        reset();
        xmat.uniforms.uCol.value.copy(RED);
        xh.pose({ head: [4, -2, 0] });
        cam.position.copy(lerpV(V3(0.40, 1.62, 1.1), V3(0.18, 1.58, 0.75), eio(lt / d)));
        cam.lookAt(0.1, 1.52, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: cam.position.distanceTo(V3(0.1, 1.52, 0)) });
        blit();

        pill('INTERNAL REACTION', 540, 300, eob(seg(lt, 0, 0.35)), '#FF2836', 'rgba(25,10,10,0.92)', 64);
        const [px, py] = screen(V3(0.1, 1.55, 0.1), cam);
        label('CRITICAL ZONE', 720, 500, px, py, eob(seg(lt, 0.3, 0.7)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.35, 'slam', { gain: 0.6 });
  }

  // 5 · ESCALATION & SYMPTOMS
  {
    const st = cut(4);
    add({
      id: 'S05', at: st, note: 'symptom progression',
      draw(lt, d, t, blit) {
        reset();
        hero.pose({
          head: [-5, 4, 0],
          shL: [30, 0, 15],
          shR: [20, 0, -10],
          lid: -0.1
        });
        cam.position.copy(lerpV(V3(0.35, 1.72, 0.55), V3(0.15, 1.66, 0.25), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, { ...KLOOK, focus: cam.position.distanceTo(FACE) });
        blit();

        pill('SYMPTOMS ESCALATE', 540, 300, eob(seg(lt, 0, 0.35)), '#FFB020', 'rgba(25,20,10,0.92)', 64);
        const [fx, fy] = screen(FACE, cam);
        label('RAPID SPREAD', 720, 480, fx, fy, eob(seg(lt, 0.3, 0.7)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', { gain: 0.5 });
  }

  // 6 · INTERNAL ANATOMY & PHYSIOLOGY
  {
    const st = cut(5);
    add({
      id: 'S06', at: st, note: 'x-ray internal reaction',
      draw(lt, d, t, blit) {
        reset();
        xmat.uniforms.uCol.value.copy(RED);
        xh.pose({ head: [4, -2, 0] });
        cam.position.copy(lerpV(V3(0.40, 1.62, 1.1), V3(0.18, 1.58, 0.75), eio(lt / d)));
        cam.lookAt(0.1, 1.52, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: cam.position.distanceTo(V3(0.1, 1.52, 0)) });
        blit();

        pill('INTERNAL REACTION', 540, 300, eob(seg(lt, 0, 0.35)), '#FF2836', 'rgba(25,10,10,0.92)', 64);
        const [px, py] = screen(V3(0.1, 1.55, 0.1), cam);
        label('CRITICAL ZONE', 720, 500, px, py, eob(seg(lt, 0.3, 0.7)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.35, 'slam', { gain: 0.6 });
  }

  // 7 · OUTRO & ADVICE
  {
    const st = cut(6);
    add({
      id: 'S07', at: st, note: 'outro warning and resolution',
      draw(lt, d, t, blit) {
        reset();
        hero.pose({
          head: [-2 + Math.sin(lt * 2) * 2, 0, 0],
          shL: [15, 0, 10],
          shR: [15, 0, -10],
          lid: 0.1
        });
        cam.position.copy(lerpV(V3(0.25, 1.70, 0.45), V3(0.12, 1.68, 0.22), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, { ...KLOOK, focus: cam.position.distanceTo(FACE) });
        blit();

        pill('DOCTOR ADVICE', 540, 300, eob(seg(lt, 0, 0.35)), '#10B981', 'rgba(10,25,15,0.92)', 64);
        warning(540, 520, eob(seg(lt, 0.4, 0.8)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.4, 'pop', { gain: 0.6 });
  }

  return { shots: S, cues: CUES };
}
