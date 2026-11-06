// WHAT HAPPENS IF YOU DRINK LAVA? : 3D Deep Dive Short
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

  // ── Sets & Characters ───────────────────────────────────────────────────
  const K = SETS.kitchen(E);
  const hero = new Human({ skin: '#E5AA88', shirt: '#EA580C', pants: '#1C1917', hair: '#1C1917' });
  hero.group.position.set(0.1, 0, -0.6);
  K.scene.add(hero.group);

  const X = SETS.xrayStage(E);
  const xh = new Human({ skin: '#E5AA88' });
  const xmat = SETS.xrayMaterial('#FF6B2B');
  xh.setBodyMaterial(xmat);
  const I = SETS.insides();
  xh.spine.add(I.group);
  X.scene.add(xh.group);

  const CYAN = new THREE.Color('#4FD1E8');
  const RED = new THREE.Color('#FF2836');
  const LAVA = new THREE.Color('#FF5500');

  const reset = () => {
    hero.pose({});
    xh.pose({});
    I.heart.scale.setScalar(1);
    xmat.uniforms.uCol.value.copy(LAVA);
  };
  const FACE = V3(0.1, 1.68, -0.6);

  // 1 · HOOK: Drink Molten Lava
  {
    const st = cut(0);
    add({
      id: 'S01', at: st, note: 'what happens if you drink molten lava',
      draw(lt, d, t, blit) {
        reset();
        hero.pose({
          head: [-4, 0, 0],
          shL: [25, 0, 15],
          shR: [25, 0, -15],
          lid: -0.2
        });

        cam.position.copy(lerpV(V3(0.32, 1.74, 0.5), V3(0.18, 1.68, 0.18), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, { ...KLOOK, focus: cam.position.distanceTo(FACE), bloom: 0.5 });
        blit();

        pill('DRINKING MOLTEN LAVA', 540, 300, eob(seg(lt, 0.1, 0.45)), '#FF5500', 'rgba(30,10,5,0.95)', 68);
        warning(540, 520, eob(seg(lt, 0.5, 0.9)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.5, 'pop', { gain: 0.8 });
  }

  // 2 · TEMPERATURE: 2,000°F
  {
    const st = cut(1);
    add({
      id: 'S02', at: st, note: 'lava is liquid rock at 2000 degrees',
      draw(lt, d, t, blit) {
        reset();
        cam.position.set(0.1, 1.65, 0.7);
        cam.lookAt(FACE);
        E.render(K.scene, cam, { ...KLOOK, focus: 0.7 });
        blit();

        pill('LIQUID ROCK: 2,000°F', 540, 300, eob(seg(lt, 0, 0.35)), '#FF3B30', 'rgba(30,8,8,0.95)', 66);
        const [fx, fy] = screen(V3(0.1, 1.68, -0.6), cam);
        label('1,100°C MOLTEN BASALT', 720, 520, fx, fy, eob(seg(lt, 0.4, 0.8)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.4, 'pop', { gain: 0.6 });
  }

  // 3 · RADIANT HEAT: Blisters Face & Airway
  {
    const st = cut(2);
    add({
      id: 'S03', at: st, note: 'radiant heat scorches face and airway',
      draw(lt, d, t, blit) {
        reset();
        hero.pose({
          head: [6, 0, 0],
          lid: 0.6,
          shL: [30, 0, 20],
          shR: [30, 0, -20]
        });

        cam.position.copy(lerpV(V3(0.28, 1.70, 0.4), V3(0.15, 1.68, 0.15), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, { ...KLOOK, focus: 0.25, vignette: 0.6 });
        blit();

        pill('RADIANT HEAT BLISTERS FACE', 540, 280, eob(seg(lt, 0, 0.35)), '#FF5500', 'rgba(30,10,5,0.95)', 64);
        warning(540, 500, eob(seg(lt, 0.3, 0.7)));
        pill('AIRWAY FLASH-BURNS', 540, 1180, eob(seg(lt, 0.6, 1.0)), '#FF3B30', 'rgba(30,5,5,0.92)', 60);
      }
    });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', { gain: 0.7 });
  }

  // 4 · ENTERS THROAT: Incinerates Esophagus
  {
    const st = cut(3);
    add({
      id: 'S04', at: st, note: 'x-ray throat: molten rock incinerates esophagus',
      draw(lt, d, t, blit) {
        reset();
        xmat.uniforms.uCol.value.copy(RED);
        xh.pose({ head: [8, 0, 0] });
        cam.position.copy(lerpV(V3(0.35, 1.6, 1.1), V3(0.18, 1.5, 0.65), eio(lt / d)));
        cam.lookAt(0.1, 1.45, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: 0.75 });
        blit();

        pill('ESOPHAGUS INCINERATION', 540, 280, eob(seg(lt, 0, 0.35)), '#FF3B30', 'rgba(30,5,5,0.95)', 66);
        const [tx, ty] = screen(V3(0.1, 1.52, 0.05), cam);
        label('INSTANT THERMAL DESTRUCTION', 720, 500, tx, ty, eob(seg(lt, 0.3, 0.7)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', { gain: 0.8 });
  }

  // 5 · STOMACH WATER FLASH-BOILS: 1700x Steam Expansion
  {
    const st = cut(4);
    add({
      id: 'S05', at: st, note: 'stomach water flash boils, 1700x steam expansion',
      draw(lt, d, t, blit) {
        reset();
        xmat.uniforms.uCol.value.copy(LAVA);
        const steamGlow = (Math.sin(lt * 12) + 1) * 0.5;
        I.stomach.scale.setScalar(1 + 0.35 * steamGlow);

        cam.position.set(0.1, 1.35, 0.8);
        cam.lookAt(0, 1.25, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: 0.8, bloom: 0.85 });
        blit();

        pill('WATER FLASH-BOILS TO STEAM', 540, 280, eob(seg(lt, 0, 0.35)), '#FFFFFF', 'rgba(30,10,5,0.95)', 64);
        pill('1,700× VOLUME EXPANSION', 540, 1180, eob(seg(lt, 0.5, 0.9)), '#FFD43B', 'rgba(30,20,5,0.92)', 66);
      }
    });
    cue(st, 'whoosh'); cue(st + 0.4, 'pop', { gain: 0.9 });
  }

  // 6 · EXPLOSIVE SHOCKWAVE RUPTURES STOMACH
  {
    const st = cut(5);
    add({
      id: 'S06', at: st, note: 'internal steam explosion blows stomach apart',
      draw(lt, d, t, blit) {
        reset();
        xmat.uniforms.uCol.value.copy(RED);
        xh.pose({ head: [14, 0, 0], spine: [12, 0, 0], lid: 0.8 });

        cam.position.copy(lerpV(V3(0.4, 1.35, 1.2), V3(0.2, 1.25, 0.7), eio(lt / d)));
        cam.lookAt(0, 1.2, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: 0.75, vignette: 0.7 });
        blit();

        pill('INTERNAL STEAM EXPLOSION', 540, 280, eob(seg(lt, 0, 0.35)), '#FF3B30', 'rgba(30,5,5,0.95)', 66);
        warning(540, 500, eob(seg(lt, 0.3, 0.7)));
        pill('STOMACH WALL RUPTURE', 540, 1180, eob(seg(lt, 0.6, 1.0)), '#FFFFFF', 'rgba(180,20,20,0.95)', 64);
      }
    });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', { gain: 1.0 });
  }

  // 7 · SOLIDIFIES INTO OBSIDIAN VOLCANIC GLASS
  {
    const st = cut(6);
    add({
      id: 'S07', at: st, note: 'lava cools into black obsidian glass in chest',
      draw(lt, d, t, blit) {
        reset();
        xh.pose({ head: [18, 0, 0], spine: [16, 0, 0], lid: 1.0 });
        cam.position.set(0.1, 1.35, 0.9);
        cam.lookAt(0, 1.2, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: 0.9 });
        blit();

        pill('SOLIDIFIES INTO OBSIDIAN', 540, 280, eob(seg(lt, 0, 0.35)), '#FFD43B', 'rgba(15,18,24,0.95)', 66);
        const [ox, oy] = screen(V3(0.04, 1.25, 0.05), cam);
        label('SHARP VOLCANIC GLASS IN CHEST', 720, 520, ox, oy, eob(seg(lt, 0.4, 0.8)));
      }
    });
    cue(st, 'whoosh'); cue(st + 0.4, 'pop', { gain: 0.6 });
  }

  // 8 · INSTANT DEATH WITHIN SECONDS
  {
    const st = cut(7);
    add({
      id: 'S08', at: st, note: 'instant cardiac and respiratory collapse',
      draw(lt, d, t, blit) {
        reset();
        cam.position.set(0.1, 1.4, 1.2);
        cam.lookAt(0, 1.25, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: 1.2 });
        blit();

        blackout(0.4 + 0.3 * Math.sin(lt * 4));
        pill('FATAL WITHIN SECONDS', 540, 600, eob(seg(lt, 0.1, 0.5)), '#FF3B30', 'rgba(30,5,5,0.95)', 70);
      }
    });
    cue(st, 'whoosh');
  }

  // 9 · OUTRO: Lava is Not a Drink
  {
    const st = cut(8);
    add({
      id: 'S09', at: st, note: 'hero safe in room, key takeaway',
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

        pill('LAVA IS LIQUID ROCK', 540, 1180, eob(seg(lt, 0.2, 0.7)), '#FF5500', 'rgba(15,18,24,0.95)', 72);
      }
    });
    cue(st, 'whoosh');
  }

  return { shots: S, cues: CUES };
}
