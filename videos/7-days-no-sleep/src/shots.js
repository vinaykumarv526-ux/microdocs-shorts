// WHAT HAPPENS IF YOU DON'T SLEEP FOR 7 DAYS? : 3D Deep Dive Short
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

  const KLOOK = { aperture: 0.003, maxblur: 0.01, bloom: 0.25 };
  const XLOOK = { aperture: 0.0015, bloom: 0.6, bloomThreshold: 0.35, vignette: 0.5 };

  // ── Sets & Characters ───────────────────────────────────────────────────
  const K = SETS.kitchen(E);
  const hero = new Human({ skin: '#E5AA88', shirt: '#283648', pants: '#1A212D', hair: '#1C1510' });
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

  // 1 · HOOK: face close-up, extreme fatigue
  {
    const st = cut(0);
    add({
      id: 'S01', at: st, note: 'face close-up: tired eyes, droop',
      draw(lt, d, t, blit) {
        reset();
        const k = eo(seg(lt, 0, 1.2));
        hero.pose({
          head: [-4 + Math.sin(lt * 1.5) * 3, 2, 0],
          spine: [-2, 0, 0],
          lid: lerp(0.1, 0.45, k),
          look: [Math.sin(lt * 2) * 2, -4]
        });
        cam.position.copy(lerpV(V3(0.38, 1.74, 0.45), V3(0.24, 1.70, 0.15), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, { ...KLOOK, focus: cam.position.distanceTo(FACE) });
        blit();
        pill('7 DAYS NO SLEEP', 540, 320, eob(seg(lt, 0.1, 0.45)), '#FFD43B', 'rgba(12,14,20,0.85)', 68);
      }
    });
    cue(st, 'whoosh');
  }

  // 2 · DAY 1 (24 Hours): Adenosine in brain, intoxication level
  {
    const st = cut(1);
    add({
      id: 'S02', at: st, note: 'x-ray skull/upper body, adenosine glow',
      draw(lt, d, t, blit) {
        reset();
        xmat.uniforms.uCol.value.copy(AMBER);
        xh.pose({ head: [6, -4 + Math.sin(lt * 2) * 2, 0] });
        cam.position.copy(lerpV(V3(0.48, 1.65, 1.4), V3(0.2, 1.60, 0.95), eio(lt / d)));
        cam.lookAt(0.1, 1.55, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: cam.position.distanceTo(V3(0.1, 1.55, 0)) });
        blit();
        pill('DAY 1 · 24 HOURS', 540, 300, eob(seg(lt, 0, 0.35)), '#FFD43B', 'rgba(12,14,20,0.85)', 64);
        const [lx, ly] = screen(V3(0.1, 1.68, 0.05), cam);
        label('ADENOSINE FLOOD', 740, 520, lx, ly, eob(seg(lt, 0.3, 0.6)));
        pill('EQUIVALENT TO 0.10% BAC', 540, 1180, eob(seg(lt, 1.8, 2.2)), '#FF4444', 'rgba(20,10,10,0.85)', 52);
      }
    });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', { gain: 0.5 });
  }

  // 3 · DAY 2: Micro-sleeps (head drop and shock awake)
  {
    const st = cut(2);
    add({
      id: 'S03', at: st, note: 'micro-sleep head collapse then jolt awake',
      draw(lt, d, t, blit) {
        reset();
        const dropPhase = seg(lt, 1.2, 2.4);
        const drop = eo(dropPhase);
        const jolt = lt > 2.5 ? Math.exp(-(lt - 2.5) * 5) * Math.sin((lt - 2.5) * 25) : 0;
        const awake = lt >= 2.5;

        hero.pose({
          head: awake ? [-6 + jolt * 12, 0, 0] : [lerp(2, 28, drop), 0, 0],
          spine: awake ? [-2, 0, 0] : [lerp(-2, 14, drop), 0, 0],
          lid: awake ? -0.35 : lerp(0.3, 1.0, drop),
          look: awake ? [0, 0] : [0, -6]
        });

        cam.position.copy(lerpV(V3(0.42, 1.65, 0.9), V3(0.25, 1.58, 0.55), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, { ...KLOOK, focus: cam.position.distanceTo(FACE) });
        blit();

        pill('DAY 2 · 48 HOURS', 540, 300, eob(seg(lt, 0, 0.35)), '#FFD43B', 'rgba(12,14,20,0.85)', 64);
        if (awake) {
          pill('MICRO-SLEEP DETECTED', 540, 1180, eob(seg(lt, 2.5, 2.75)), '#FF3B30', 'rgba(25,8,8,0.9)', 62);
        } else if (lt > 1.2) {
          label('BRAIN ASLEEP (3 SEC)', 720, 520, ...screen(FACE, cam), eob(dropPhase));
        }
      }
    });
    cue(st, 'whoosh'); cue(st + 2.5, 'pop', { gain: 0.8 });
  }

  // 4 · DAY 3: Hallucinations and sensory detachment
  {
    const st = cut(3);
    add({
      id: 'S04', at: st, note: 'hallucinations, pupil shifts, shadow creeping',
      draw(lt, d, t, blit) {
        reset();
        const jitter = Math.sin(lt * 12) * 0.004;
        hero.group.position.x = 0.1 + jitter;
        hero.pose({
          head: [-2, Math.sin(lt * 3) * 14, Math.sin(lt * 4) * 4],
          lid: -0.15,
          look: [Math.sin(lt * 7) * 8, Math.cos(lt * 5) * 6]
        });

        const a = lerp(0.45, 0.1, eio(lt / d));
        cam.position.set(0.1 + Math.sin(a) * 1.5, 1.62, -0.6 + Math.cos(a) * 1.5);
        cam.lookAt(FACE);
        E.render(K.scene, cam, { ...KLOOK, focus: 1.5, vignette: 0.65 });
        blit();

        pill('DAY 3 · 72 HOURS', 540, 300, eob(seg(lt, 0, 0.35)), '#FFD43B', 'rgba(12,14,20,0.85)', 64);
        pill('VISUAL HALLUCINATIONS', 540, 1180, eob(seg(lt, 0.8, 1.2)), '#A855F7', 'rgba(18,10,25,0.9)', 58);
      }
    });
    cue(st, 'whoosh');
  }

  // 5 · DAY 4: Severe Paranoia & Stress Hormones Spike
  {
    const st = cut(4);
    add({
      id: 'S05', at: st, note: 'heart tachycardia, stress spikes red',
      draw(lt, d, t, blit) {
        reset();
        xmat.uniforms.uCol.value.copy(RED);
        const beat = 1 + 0.32 * Math.sin(lt * 16) * Math.sin(lt * 16);
        I.heart.scale.setScalar(beat);
        xh.pose({
          head: [4, -5, 0],
          shL: [8 + Math.sin(lt * 14) * 4, 0, 0],
          shR: [8 + Math.sin(lt * 14) * 4, 0, 0]
        });

        cam.position.copy(lerpV(V3(0.35, 1.48, 1.2), V3(0.18, 1.40, 0.75), eio(lt / d)));
        cam.lookAt(0.1, 1.34, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: cam.position.distanceTo(V3(0.1, 1.34, 0)) });
        blit();

        pill('DAY 4 · 96 HOURS', 540, 300, eob(seg(lt, 0, 0.35)), '#FFD43B', 'rgba(12,14,20,0.85)', 64);
        const [hx, hy] = screen(V3(0.04, 1.40, 0.05), cam);
        label('HEART: 150 BPM', 740, 500, hx, hy, eob(seg(lt, 0.2, 0.55)));
        pill('CORTISOL SPIKE +300%', 540, 1180, eob(seg(lt, 1.4, 1.8)), '#FF3B30', 'rgba(25,8,8,0.9)', 58);
      }
    });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.6 });
  }

  // 6 · DAY 5: Speech & Motor Skills Failure
  {
    const st = cut(5);
    add({
      id: 'S06', at: st, note: 'body tremors and muscle failure',
      draw(lt, d, t, blit) {
        reset();
        const shiver = (Math.sin(lt * 35) + Math.cos(lt * 47)) * 0.008;
        hero.group.position.x = 0.1 + shiver;
        hero.pose({
          head: [12 + Math.sin(lt * 5) * 5, -8, -6],
          spine: [8, 0, 0],
          shL: [14 + Math.sin(lt * 30) * 10, 0, 12],
          shR: [14 + Math.sin(lt * 30) * 10, 0, -12],
          lid: 0.55,
          look: [-4, -8]
        });

        cam.position.copy(lerpV(V3(0.5, 1.55, 1.3), V3(0.3, 1.50, 0.8), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, { ...KLOOK, focus: cam.position.distanceTo(FACE) });
        blit();

        pill('DAY 5 · 120 HOURS', 540, 300, eob(seg(lt, 0, 0.35)), '#FFD43B', 'rgba(12,14,20,0.85)', 64);
        pill('NEURAL MOTOR COLLAPSE', 540, 1180, eob(seg(lt, 0.7, 1.1)), '#FF6B2B', 'rgba(25,12,6,0.9)', 58);
      }
    });
    cue(st, 'whoosh');
  }

  // 7 · DAY 7: Organ Shutdown & Fatal Risk
  {
    const st = cut(6);
    add({
      id: 'S07', at: st, note: 'system crash, organ shutdown, red alert',
      draw(lt, d, t, blit) {
        reset();
        const alarm = (Math.sin(lt * 8) + 1) * 0.5;
        xmat.uniforms.uCol.value.copy(RED).multiplyScalar(0.7 + 0.3 * alarm);
        xh.pose({
          head: [18, 0, 0],
          spine: [16, 0, 0],
          lid: 0.8
        });

        cam.position.copy(lerpV(V3(0.65, 1.35, 2.2), V3(0.35, 1.25, 1.4), eio(lt / d)));
        cam.lookAt(0.1, 1.1, 0);
        E.render(X.scene, cam, { ...XLOOK, focus: cam.position.distanceTo(V3(0.1, 1.1, 0)), vignette: 0.75 });
        blit();

        blackout(0.25 + 0.15 * Math.sin(lt * 6));
        pill('DAY 7 · 168 HOURS', 540, 280, eob(seg(lt, 0, 0.35)), '#FFFFFF', 'rgba(180,20,20,0.95)', 68);
        warning(540, 680, eob(seg(lt, 0.3, 0.7)));
        pill('ORGAN FAILURE IMMINENT', 540, 1180, eob(seg(lt, 0.8, 1.2)), '#FF3B30', 'rgba(30,5,5,0.95)', 64);
      }
    });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', { gain: 0.9 });
  }

  // 8 · OUTRO: Sleep is survival
  {
    const st = cut(7);
    add({
      id: 'S08', at: st, note: 'hero awakens, calm warm sun',
      draw(lt, d, t, blit) {
        reset();
        const k = eo(seg(lt, 0, 1.0));
        hero.pose({
          head: [lerp(15, -2, k), 0, 0],
          spine: [lerp(10, 0, k), 0, 0],
          lid: lerp(0.8, -0.2, k),
          look: [0, 0]
        });

        cam.position.copy(lerpV(V3(0.1, 1.62, 0.9), V3(0.1, 1.66, 1.3), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, { ...KLOOK, focus: cam.position.distanceTo(FACE) });
        blit();

        pill('SLEEP IS SURVIVAL', 540, 1180, eob(seg(lt, 0.3, 0.8)), '#4ADE80', 'rgba(10,25,15,0.92)', 72);
      }
    });
    cue(st, 'whoosh');
  }

  return { shots: S, cues: CUES };
}
