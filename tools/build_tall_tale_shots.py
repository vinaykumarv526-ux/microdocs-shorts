from pathlib import Path

PROJ_DIR = Path("test_build/06_tall_tale")

shots_js = """// TALL TALE 3D: WHAT IF HUMANS COULD BREATHE UNDERWATER?
import * as THREE from 'three';
import { ctx, clamp, lerp, seg, eo, eio, eob } from './core/lib.js';
import { L, Wd, T } from './core/timing.js';
import { camera } from './core/engine.js';
import * as WD from './core/world.js';
import * as PR from './core/props.js';
import { Toon, PROPS } from './core/toon.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const mix = (a, b, k) => a.clone().lerp(b, k);
const talk = (t, on = 1) => (on ? 0.25 + 0.75 * Math.abs(Math.sin(t * 13)) * (0.6 + 0.4 * Math.sin(t * 5.3)) : 0);
const blink = (t, off = 0) => (((t + off) % 3.3) < 0.12 ? 1 : 0);

const LOOK = {
  hero: { body: '#06B6D4', hat: 'cap', hatCol: '#0891B2', hairCol: '#1E293B', pattern: 'stripes', patCol: '#FFFFFF' },
  friend: { body: '#F59E0B', hat: 'bowler', hatCol: '#D97706', pattern: 'vest', patCol: '#1E293B', extra: ['glasses'] },
  diver: { body: '#10B981', hat: 'beanie', hatCol: '#047857', pattern: 'plain' }
};
const person = (k, opts) => new Toon({ ...LOOK[k], extra: [...(LOOK[k].extra || [])] }, opts);

export function buildShots(E) {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.06);
  const cam = camera(36);
  const LOOKS = { street: { bloom: 0.2, aperture: 0.001, maxblur: 0.008 } };

  const shoot = (scene, people, from, to, at, at2, k, look, focus) => {
    if (cam.fov !== (look.fov || 36)) { cam.fov = look.fov || 36; cam.updateProjectionMatrix(); }
    cam.position.copy(mix(from, to, k)); cam.lookAt(at2 ? mix(at, at2, k) : at);
    people.forEach((p) => p.face(cam));
    E.render(scene, cam, { ...look, focus: focus ?? cam.position.distanceTo(at2 ? mix(at, at2, k) : at) });
  };

  const SHOP_ORDER = [
    ['OCEAN DOCK', '#0284C7', 'wood', '#0369A1'],
    ['SEAFOOD', '#E11D48', 'brick', '#BE123C'],
    ['SUBMARINE SHOP', '#0D9488', 'wood', '#0F766E'],
    ['DIVE GEAR', '#F59E0B', 'brick', '#D97706']
  ];
  const ST = WD.mainStreet(E, { shops: SHOP_ORDER });
  const hero = person('hero'), friend = person('friend');
  ST.scene.add(hero.group, friend.group);
  const streetPeople = () => [hero, friend];

  // 1 · Hero at the dock, looking into the water
  add({ id: 'S01', at: 0, note: 'hero talking at ocean dock', draw(lt, d, t, blit) {
    hero.at(0, 0, -2); hero.set({ mood: 'happy', talk: talk(t), blink: blink(t), armL: [20, 10], armR: [45, 30] });
    friend.at(1.5, 0, -2.5); friend.set({ mood: 'shock', blink: blink(t, 1), armL: [10, 10], armR: [70, 40] });
    shoot(ST.scene, streetPeople(), V3(0, 1.4, 2), V3(0.3, 1.3, 0.8), V3(0.5, 1.1, -2.2), null, eio(lt / d), LOOKS.street);
    blit();
  } });
  cue(0.2, 'pop', { gain: 0.6 });

  // 2 · Lungs as gills: 70% of Earth inhabited
  { const st = cut(1);
    add({ id: 'S02', at: st, note: 'hero points proudly at water', draw(lt, d, t, blit) {
      hero.at(0, 0, -2); hero.set({ mood: 'smug', talk: talk(t), armL: [10, 10], armR: [100, 30] });
      friend.at(1.5, 0, -2.5); friend.set({ mood: 'laugh', talk: talk(t, 0.4) });
      shoot(ST.scene, streetPeople(), V3(-0.5, 1.5, 1.5), V3(-0.2, 1.4, 0.6), V3(0.4, 1.1, -2.2), null, eio(lt / d), LOOKS.street);
      blit();
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop'); }

  // 3 · Underwater Cities
  { const st = cut(2);
    add({ id: 'S03', at: st, note: 'hero describes underwater domes', draw(lt, d, t, blit) {
      hero.at(0, 0, -2); hero.set({ mood: 'happy', talk: talk(t), armL: [60, 40], armR: [60, 40] });
      friend.at(1.5, 0, -2.5); friend.set({ mood: 'happy' });
      shoot(ST.scene, streetPeople(), V3(1.8, 1.6, 0.8), V3(1.2, 1.4, 0.4), V3(0.6, 1.1, -2.2), null, eio(lt / d), LOOKS.street);
      blit();
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'ding'); }

  // 4 · The Threat: Crushing Pressure
  { const st = cut(3);
    add({ id: 'S04', at: st, note: 'friends panic at crushing depth', draw(lt, d, t, blit) {
      hero.at(0, 0, -2); hero.set({ mood: 'worried', talk: talk(t), armL: [-30, 40], armR: [-30, 40] });
      friend.at(1.4, 0, -2.4); friend.set({ mood: 'shock', armL: [80, 50], armR: [80, 50] });
      shoot(ST.scene, streetPeople(), V3(0.2, 1.5, 1.2), V3(0.2, 1.3, 0.3), V3(0.6, 1.0, -2.2), null, eio(lt / d), LOOKS.street);
      blit();
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'boing'); }

  // 5 · 200 Feet limit
  { const st = cut(4);
    add({ id: 'S05', at: st, note: 'hero sweating from pressure', draw(lt, d, t, blit) {
      hero.at(0, 0, -2); hero.set({ mood: 'dizzy', sweat: 1, armL: [10, 10], armR: [10, 10] });
      shoot(ST.scene, [hero], V3(0, 1.3, -0.4), V3(0, 1.2, -1.0), V3(0, 1.1, -2), null, eio(lt / d), LOOKS.street);
      blit();
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'thud'); }

  // 6 · Deep Sea Monsters
  { const st = cut(5);
    add({ id: 'S06', at: st, note: 'friends spot giant predator', draw(lt, d, t, blit) {
      hero.at(-0.4, 0, -2); hero.set({ mood: 'shock', armL: [90, 40], armR: [90, 40] });
      friend.at(0.8, 0, -2.2); friend.set({ mood: 'worried', armL: [70, 30], armR: [70, 30] });
      shoot(ST.scene, streetPeople(), V3(0.2, 1.6, 1.8), V3(0.2, 1.3, 0.4), V3(0.2, 1.0, -2.1), null, eio(lt / d), LOOKS.street);
      blit();
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'whoosh', { gain: 0.8 }); }

  // 7 · Outro: Closing joke to camera
  { const st = cut(6);
    add({ id: 'S07', at: st, note: 'hero laughs to camera', draw(lt, d, t, blit) {
      hero.at(0, 0, -2); hero.set({ mood: 'laugh', talk: talk(t), armL: [20, 10], armR: [45, 20] });
      friend.at(1.4, 0, -2.4); friend.set({ mood: 'smug' });
      shoot(ST.scene, streetPeople(), V3(0.2, 1.4, 0.6), V3(0.1, 1.3, 0.0), V3(0.5, 1.1, -2.2), null, eio(lt / d), LOOKS.street);
      blit();
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', { gain: 0.8 }); }

  return { shots: S, cues: CUES };
}
"""

with open(PROJ_DIR / "src/shots.js", "w", encoding="utf-8") as f:
    f.write(shots_js)

print("Tall Tale shots.js written successfully!")
