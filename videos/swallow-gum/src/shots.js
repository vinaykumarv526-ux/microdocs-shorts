// Zack D. Films 3D Explainer: What REALLY Happens If You Swallow Chewing Gum?
// 100% focused on 3D character animation, esophagus/stomach cutaways, zero 2D infographic badges.
import * as THREE from 'three';
import { ctx, W, H, clamp, lerp, seg, eo, eio, eob } from './core/lib.js';
import { L, Wd, T } from './core/timing.js';
import { camera } from './core/engine.js';
import { Human } from './core/human.js';
import * as SETS from './core/sets.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const lerpV = (a, b, k) => a.clone().lerp(b, k);

export function buildShots(E) {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const cam = camera(32);

  // Zack D. Films look: Natural balanced exposure, crisp depth of field, subtle bloom, clean colors
  const STUDIO_LOOK = { aperture: 0.0018, maxblur: 0.007, bloom: 0.22, exposure: 1.05, vignette: 0.16, grain: 0.012 };
  const ANATOMY_LOOK = { aperture: 0.002, maxblur: 0.008, bloom: 0.32, bloomThreshold: 0.65, exposure: 1.1, vignette: 0.24, grain: 0.015 };

  // ── Sets & Characters ──
  const K = SETS.kitchen(E);
  const hero = new Human({ skin: '#E8B391', shirt: '#2563EB', pants: '#1F2937', hair: '#2A1C12', iris: '#3D2817' });
  hero.group.position.set(0, 0, -0.4);
  K.scene.add(hero.group);

  // 3D Gum Prop
  const gumMat = new THREE.MeshPhysicalMaterial({ color: '#FF4D88', roughness: 0.3, clearcoat: 0.8, transmission: 0.2 });
  const gum = new THREE.Mesh(new THREE.CapsuleGeometry(0.016, 0.024, 8, 16), gumMat);
  gum.rotation.z = Math.PI / 2;
  hero.head.add(gum);
  gum.position.set(0, 0.038, 0.11); // at mouth

  // X-Ray Character with Organ Inside
  const X = SETS.xrayStage(E);
  // Warm up X-Ray stage background to studio dark slate
  X.scene.background = new THREE.Color('#0F172A');
  X.scene.fog = new THREE.FogExp2('#0F172A', 0.035);

  const xh = new Human({ skin: '#E8B391', shirt: '#1E293B', pants: '#0F172A' });
  const xmat = SETS.xrayMaterial('#38BDF8', 0.85); // soft cyan fresnel
  xh.setBodyMaterial(xmat);
  const I = SETS.insides();
  xh.spine.add(I.group);
  X.scene.add(xh.group);

  // 3D Internal Gum inside esophagus/stomach
  const internalGum = new THREE.Mesh(new THREE.SphereGeometry(0.022, 16, 16), gumMat);
  I.group.add(internalGum);
  internalGum.position.set(0, 0.45, 0.04);

  // Stomach Acid Fluid Glow
  const acidMat = new THREE.MeshPhysicalMaterial({
    color: '#84CC16',
    emissive: '#4D7C0F',
    emissiveIntensity: 0.4,
    roughness: 0.2,
    transparent: true,
    opacity: 0.7
  });
  const acid = new THREE.Mesh(new THREE.SphereGeometry(0.045, 24, 24), acidMat);
  acid.scale.set(1.4, 0.8, 1.0);
  acid.position.set(0.03, 0.12, 0.02);
  I.group.add(acid);

  const reset = () => {
    hero.pose({});
    xh.pose({});
    gum.visible = true;
    internalGum.visible = true;
  };

  const FACE = V3(0, 1.66, -0.4);

  // ── SHOT 01: THE HOOK (Does gum stay in your stomach for 7 years?) ───────────
  {
    const st = cut(0);
    add({ id: 'S01', at: st, note: 'Character chewing and swallowing gum', draw(lt, d, t, blit) {
      reset();
      const chew = Math.sin(lt * 10) * 0.008;
      gum.position.y = 0.038 + chew;
      // Head tilt back as if swallowing
      const swallowT = clamp((lt - 2.2) / 0.8, 0, 1);
      const headTilt = Math.sin(swallowT * Math.PI) * 16;
      hero.pose({
        head: [-headTilt, 0, 0],
        spine: [2, 0, 0],
        shL: [20, 0, 10], elL: [35, 0, 0],
        shR: [20, 0, -10], elR: [35, 0, 0]
      });
      if (lt > 2.6) gum.visible = false;

      const k = eio(lt / d);
      cam.position.copy(lerpV(V3(0.18, 1.72, 0.55), V3(0.05, 1.66, 0.32), k));
      cam.lookAt(FACE);
      E.render(K.scene, cam, { ...STUDIO_LOOK, focus: cam.position.distanceTo(FACE) });
      blit();
    } });
    cue(st, 'whoosh');
    cue(st + 2.5, 'gulp', { gain: 0.8 });
  }

  // ── SHOT 02: INTERNAL X-RAY REVEAL (That is completely false!) ──────────────
  {
    const st = cut(1);
    add({ id: 'S02', at: st, note: 'Camera swoops into chest cutaway showing esophagus', draw(lt, d, t, blit) {
      reset();
      xh.pose({ head: [2, 0, 0], spine: [0, 0, 0] });
      // Gum travels down esophagus into stomach
      const travel = clamp(lt / d, 0, 1);
      internalGum.position.y = lerp(0.48, 0.18, eo(travel));

      const k = eio(lt / d);
      cam.position.copy(lerpV(V3(0.24, 1.62, 0.95), V3(0.08, 1.54, 0.55), k));
      cam.lookAt(0.02, 1.48, 0);
      E.render(X.scene, cam, { ...ANATOMY_LOOK, focus: cam.position.distanceTo(V3(0.02, 1.48, 0)) });
      blit();
    } });
    cue(st, 'whoosh');
    cue(st + 0.3, 'slide', { d: 0.6 });
  }

  // ── SHOT 03: STOMACH ACID DIGESTING FLAVORING & SUGARS ────────────────────
  {
    const st = cut(2);
    add({ id: 'S03', at: st, note: 'Close-up of stomach acid breaking down sugars', draw(lt, d, t, blit) {
      reset();
      // Acid bubbles
      const bubble = Math.sin(lt * 8) * 0.005;
      acid.scale.set(1.4 + bubble, 0.8 - bubble, 1.0 + bubble);
      internalGum.position.set(0.03, 0.13 + bubble * 0.5, 0.02);

      const k = eio(lt / d);
      cam.position.copy(lerpV(V3(0.18, 1.46, 0.48), V3(0.04, 1.42, 0.34), k));
      cam.lookAt(0.03, 1.38, 0.02);
      E.render(X.scene, cam, { ...ANATOMY_LOOK, focus: cam.position.distanceTo(V3(0.03, 1.38, 0.02)) });
      blit();
    } });
    cue(st, 'bubbles', { d: 1.5 });
    cue(st + 0.8, 'sizzle', { gain: 0.5 });
  }

  // ── SHOT 04: INTESTINAL PERISTALSIS (Muscular Contractions) ────────────────
  {
    const st = cut(3);
    add({ id: 'S04', at: st, note: 'Intestinal tract pulsing and moving gum forward', draw(lt, d, t, blit) {
      reset();
      // Peristaltic wave
      const wave = Math.sin(lt * 6) * 0.02;
      internalGum.position.set(0.01, 0.02 - lt * 0.015, 0.02);

      const k = eio(lt / d);
      cam.position.copy(lerpV(V3(0.16, 1.38, 0.44), V3(0.02, 1.32, 0.32), k));
      cam.lookAt(0.01, 1.28, 0);
      E.render(X.scene, cam, { ...ANATOMY_LOOK, focus: cam.position.distanceTo(V3(0.01, 1.28, 0)) });
      blit();
    } });
    cue(st, 'whoosh');
    cue(st + 0.4, 'plop', { gain: 0.6 });
  }

  // ── SHOT 05: HARMLESS EXIT (Passes out naturally in 48 hours) ──────────────
  {
    const st = cut(4);
    add({ id: 'S05', at: st, note: 'Zoom back to smiling character showing body is healthy', draw(lt, d, t, blit) {
      reset();
      hero.pose({
        spine: [0, 0, 0],
        head: [2, 0, 0],
        shL: [15, 0, 10], elL: [25, 0, 0],
        shR: [15, 0, -10], elR: [25, 0, 0]
      });
      const k = eio(lt / d);
      cam.position.copy(lerpV(V3(0.0, 1.62, 0.95), V3(0.0, 1.64, 0.65), k));
      cam.lookAt(FACE);
      E.render(K.scene, cam, { ...STUDIO_LOOK, focus: cam.position.distanceTo(FACE) });
      blit();
    } });
    cue(st, 'pop', { gain: 0.7 });
  }

  // ── SHOT 06: DANGER WARNING (Large clumps forming blockage) ───────────────
  {
    const st = cut(5);
    add({ id: 'S06', at: st, note: 'Cutaway showing dangerous clump blockage in stomach', draw(lt, d, t, blit) {
      reset();
      // Large clump scale
      internalGum.scale.setScalar(2.4);
      internalGum.position.set(0.03, 0.14, 0.02);

      const k = eio(lt / d);
      cam.position.copy(lerpV(V3(0.2, 1.45, 0.48), V3(0.05, 1.41, 0.32), k));
      cam.lookAt(0.03, 1.38, 0.02);
      E.render(X.scene, cam, { ...ANATOMY_LOOK, focus: cam.position.distanceTo(V3(0.03, 1.38, 0.02)) });
      blit();
    } });
    cue(st, 'slam', { gain: 0.7 });
  }

  // ── SHOT 07: RESOLUTION & SPIT IT OUT ─────────────────────────────────────
  {
    const st = cut(6);
    add({ id: 'S07', at: st, note: 'Character spitting into trash bin with warning gesture', draw(lt, d, t, blit) {
      reset();
      hero.pose({
        spine: [8, 0, 0],
        head: [-4, 0, 0],
        shL: [25, 0, 20], elL: [50, 0, 0],
        shR: [35, 0, -15], elR: [70, 0, 0]
      });
      const k = eio(lt / d);
      cam.position.copy(lerpV(V3(0.25, 1.66, 0.8), V3(0.0, 1.64, 0.5), k));
      cam.lookAt(FACE);
      E.render(K.scene, cam, { ...STUDIO_LOOK, focus: cam.position.distanceTo(FACE) });
      blit();
    } });
    cue(st, 'whoosh');
  }

  return { shots: S, cues: CUES };
}
