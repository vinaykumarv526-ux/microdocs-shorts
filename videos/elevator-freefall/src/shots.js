// WHAT HAPPENS IF YOU FREEFALL IN AN ELEVATOR? : 3D Deep Dive Short
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
  const hero = new Human({ skin: '#E5AA88', shirt: '#D9534F', pants: '#2B3550', hair: '#221914' });
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
    hero.group.position.set(0.1, 0, -0.6);
    hero.group.rotation.set(0, 0, 0);
    xh.pose({});
    xh.group.position.set(0, 0, 0);
    xh.group.rotation.set(0, 0, 0);
    I.heart.scale.setScalar(1);
    xmat.uniforms.uCol.value.copy(CYAN);
  };
  const FACE = V3(0.1, 1.68, -0.6);

  // 1 · HOOK: Elevator Cable Snaps, Plunging into Freefall
  {
    const st = cut(0);
    add({
      id: 'S01', at: st, note: 'cable snaps, elevator drops with heavy shake',
      draw(lt, d, t, blit) {
        reset();
        const dropRumble = (Math.sin(lt * 40) + Math.cos(lt * 55)) * 0.012;
        hero.group.position.y = dropRumble;
        hero.pose({
          head: [-6 + Math.sin(lt * 8) * 4, 0, 0],
          shL: [12, 0, 16],
          shR: [12, 0, -16],
          lid: -0.4,
          look: [0, 6]
        });

        cam.position.copy(lerpV(V3(0.35, 1.75, 0.6), V3(0.15, 1.68, 0.2), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, { ...KLOOK, focus: cam.position.distanceTo(FACE), vignette: 0.4 });
        blit();

        pill('ELEVATOR FREEFALL', 540, 300, eob(seg(lt, 0.1, 0.45)), '#FF3B30', 'rgba(25,8,8,0.92)', 68);
        warning(540, 520, eob(seg(lt, 0.5, 0.95)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', { gain: 0.9 });
  }

  // 2 · THE MYTH: Jumping right before impact
  {
    const st = cut(1);
    add({
      id: 'S02', at: st, note: 'character crouches to jump',
      draw(lt, d, t, blit) {
        reset();
        const crouch = eo(seg(lt, 0.2, 1.4));
        hero.pose({
          head: [lerp(0, 15, crouch), 0, 0],
          spine: [lerp(0, 20, crouch), 0, 0],
          hipL: lerp(0, 45, crouch),
          knL: lerp(0, 65, crouch),
          hipR: lerp(0, 45, crouch),
          knR: lerp(0, 65, crouch),
          shL: [lerp(0, -30, crouch), 0, 0],
          shR: [lerp(0, -30, crouch), 0, 0]
        });
        hero.group.position.y = -lerp(0, 0.25, crouch);

        cam.position.copy(lerpV(V3(0.8, 1.5, 1.8), V3(0.4, 1.35, 1.2), eio(lt / d)));
        cam.lookAt(0.1, 1.2, -0.6);
        E.render(K.scene, cam, { ...KLOOK, focus: 1.5 });
        blit();

        pill('THE POPULAR MYTH', 540, 300, eob(seg(lt, 0, 0.35)), '#FFD43B', 'rgba(12,14,20,0.85)', 64);
        pill('JUST JUMP AT THE END?', 540, 1180, eob(seg(lt, 0.6, 1.0)), '#FFFFFF', 'rgba(15,18,24,0.9)', 58);
      }
    });
    cue(st, 'whoosh');
  }

  // 3 · PHYSICS: Completely Impossible
  {
    const st = cut(2);
    add({
      id: 'S03', at: st, note: 'physics impossible comparison',
      draw(lt, d, t, blit) {
        reset();
        hero.pose({ head: [4, -6, 0], lid: 0.1 });
        cam.position.set(0.1, 1.55, 1.1);
        cam.lookAt(FACE);
        E.render(K.scene, cam, { ...KLOOK, focus: 1.1, vignette: 0.55 });
        blit();

        pill('PHYSICS SAYS: IMPOSSIBLE', 540, 320, eob(seg(lt, 0, 0.35)), '#FF3B30', 'rgba(25,8,8,0.95)', 66);
      }
    });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.7 });
  }

  // 4 · SPEED CALCULATION: 50 MPH Fall vs 2 MPH Jump
  {
    const st = cut(3);
    add({
      id: 'S04', at: st, note: 'speed calculation pills breakdown',
      draw(lt, d, t, blit) {
        reset();
        const a = lerp(0.5, 0.15, eio(lt / d));
        cam.position.set(0.1 + Math.sin(a) * 1.8, 1.45, -0.6 + Math.cos(a) * 1.8);
        cam.lookAt(0.1, 1.3, -0.6);
        E.render(K.scene, cam, { ...KLOOK, focus: 1.8 });
        blit();

        pill('ELEVATOR SPEED: -50 MPH', 540, 480, eob(seg(lt, 0.1, 0.45)), '#FF3B30', 'rgba(25,8,8,0.9)', 62);
        pill('MAX HUMAN JUMP: +2 MPH', 540, 620, eob(seg(lt, 1.2, 1.6)), '#FFD43B', 'rgba(20,18,10,0.9)', 60);
        pill('NET CRASH SPEED: 48 MPH', 540, 780, eob(seg(lt, 2.5, 2.9)), '#FFFFFF', 'rgba(180,20,20,0.95)', 66);
      }
    });
    cue(st, 'whoosh'); cue(st + 1.2, 'pop', { gain: 0.5 }); cue(st + 2.5, 'pop', { gain: 0.8 });
  }

  // 5 · CEILING COLLISION RISK
  {
    const st = cut(4);
    add({
      id: 'S05', at: st, note: 'jumping slams head into ceiling',
      draw(lt, d, t, blit) {
        reset();
        const jumpUp = Math.sin(seg(lt, 0, 1.0) * Math.PI);
        hero.group.position.y = jumpUp * 0.35;
        hero.pose({
          head: [-25 * jumpUp, 0, 0],
          shL: [45, 0, 15],
          shR: [45, 0, -15],
          lid: 0.4
        });

        cam.position.copy(lerpV(V3(0.3, 1.8, 0.7), V3(0.15, 1.9, 0.4), eio(lt / d)));
        cam.lookAt(0.1, 1.85, -0.6);
        E.render(K.scene, cam, { ...KLOOK, focus: 0.8 });
        blit();

        pill('CEILING HEAD IMPACT', 540, 300, eob(seg(lt, 0, 0.35)), '#FF3B30', 'rgba(30,8,8,0.92)', 64);
        warning(540, 500, eob(seg(lt, 0.4, 0.8)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.4, 'pop', { gain: 0.8 });
  }

  // 6 · STANDING WITH BENT KNEES: Shatters Spine
  {
    const st = cut(5);
    add({
      id: 'S06', at: st, note: 'x-ray bent knees, spine snaps under G-force',
      draw(lt, d, t, blit) {
        reset();
        xmat.uniforms.uCol.value.copy(RED);
        xh.pose({
          head: [12, 0, 0],
          spine: [18, 0, 0],
          hipL: 35, knL: 55,
          hipR: 35, knR: 55
        });
        xh.group.position.y = -0.15;

        cam.position.copy(lerpV(V3(0.5, 1.25, 1.6), V3(0.2, 1.15, 1.0), eio(lt / d)));
        cam.lookAt(0, 1.0, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: cam.position.distanceTo(V3(0, 1.0, 0)) });
        blit();

        pill('STANDING: 10G FORCE', 540, 280, eob(seg(lt, 0, 0.35)), '#FF3B30', 'rgba(30,5,5,0.95)', 64);
        const [sx, sy] = screen(V3(0, 1.1, 0.05), cam);
        label('SPINE COMPRESSION FRACTURE', 720, 500, sx, sy, eob(seg(lt, 0.4, 0.8)));
        const [lx, ly] = screen(V3(0.08, 0.5, 0.05), cam);
        label('LEGS SHATTER', 340, 900, lx, ly, eob(seg(lt, 1.2, 1.6)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.4, 'pop', { gain: 0.9 });
  }

  // 7 · THE ONLY SURVIVAL SECRET: Lie Flat on Back
  {
    const st = cut(6);
    add({
      id: 'S07', at: st, note: 'hero lying flat on back on elevator floor',
      draw(lt, d, t, blit) {
        reset();
        // Lie flat on back
        hero.group.rotation.x = -Math.PI / 2;
        hero.group.position.set(0.1, 0.12, -0.6);
        hero.pose({
          head: [-8, 0, 0],
          shL: [-15, 0, 30],
          shR: [-15, 0, -30],
          lid: 0.1
        });

        cam.position.copy(lerpV(V3(0.1, 2.3, 0.2), V3(0.1, 1.8, -0.2), eio(lt / d)));
        cam.lookAt(0.1, 0.12, -0.6);
        E.render(K.scene, cam, { ...KLOOK, focus: 1.6 });
        blit();

        pill('SURVIVAL POSITION: LIE FLAT', 540, 300, eob(seg(lt, 0, 0.35)), '#4ADE80', 'rgba(10,25,15,0.95)', 66);
        pill('COVER YOUR FACE & HEAD', 540, 1180, eob(seg(lt, 1.2, 1.6)), '#FFD43B', 'rgba(20,18,10,0.9)', 58);
      }
    });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.6 });
  }

  // 8 · IMPACT DISSIPATION: Protects Organs
  {
    const st = cut(7);
    add({
      id: 'S08', at: st, note: 'x-ray lying flat, shockwave dissipates evenly',
      draw(lt, d, t, blit) {
        reset();
        xmat.uniforms.uCol.value.copy(CYAN);
        xh.group.rotation.x = -Math.PI / 2;
        xh.group.position.set(0, 0.12, 0);

        cam.position.copy(lerpV(V3(0.2, 2.1, 0.1), V3(0.1, 1.6, -0.2), eio(lt / d)));
        cam.lookAt(0, 0.12, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: 1.5 });
        blit();

        pill('FORCE DISTRIBUTED OVER 100%', 540, 280, eob(seg(lt, 0, 0.35)), '#4ADE80', 'rgba(10,25,15,0.92)', 62);
        pill('VITAL ORGANS PROTECTED', 540, 1180, eob(seg(lt, 1.2, 1.6)), '#FFFFFF', 'rgba(10,20,35,0.92)', 60);
      }
    });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', { gain: 0.5 });
  }

  // 9 · OUTRO: Never Jump, Always Lie Flat
  {
    const st = cut(8);
    add({
      id: 'S09', at: st, note: 'sitting safe hero, key survival rule',
      draw(lt, d, t, blit) {
        reset();
        hero.pose({
          head: [-4, 0, 0],
          spine: [-2, 0, 0],
          lid: -0.2,
          look: [0, 0]
        });

        cam.position.copy(lerpV(V3(0.1, 1.62, 0.9), V3(0.1, 1.66, 1.3), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, { ...KLOOK, focus: cam.position.distanceTo(FACE) });
        blit();

        pill('NEVER JUMP · LIE FLAT', 540, 1180, eob(seg(lt, 0.2, 0.7)), '#FFD43B', 'rgba(15,18,24,0.95)', 72);
      }
    });
    cue(st, 'whoosh');
  }

  return { shots: S, cues: CUES };
}
