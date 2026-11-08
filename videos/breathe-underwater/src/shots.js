// AUTO-GENERATED TALL TALE 3D: What If Humans Could Breathe Underwater? 🌊 #Shorts
import * as THREE from 'three';
import { ctx, clamp, lerp, seg, eo, eio, eob } from './core/lib.js';
import { L, Wd, T } from './core/timing.js';
import { camera } from './core/engine.js';
import * as WD from './core/world.js';
import { Toon } from './core/toon.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const mix = (a, b, k) => a.clone().lerp(b, k);
const talk = (t, on = 1) => (on ? 0.25 + 0.75 * Math.abs(Math.sin(t * 13)) : 0);

export function buildShots(E) {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.06);
  const cam = camera(36);
  const LOOKS = { street: { bloom: 0.2, aperture: 0.001, maxblur: 0.008 } };

  const ST = WD.mainStreet(E, {});
  const hero = new Toon({ body: '#06B6D4', hat: 'cap', hatCol: '#0891B2', hairCol: '#1E293B' });
  const friend = new Toon({ body: '#F59E0B', hat: 'bowler', hatCol: '#D97706', extra: ['glasses'] });
  ST.scene.add(hero.group, friend.group);

  const shoot = (scene, people, from, to, at, k, look) => {
    cam.position.copy(mix(from, to, k)); cam.lookAt(at);
    people.forEach((p) => p.face(cam));
    E.render(scene, cam, { ...look, focus: cam.position.distanceTo(at) });
  };

  // 1 · SHOT
  {
    const st = cut(0);
    add({ id: 'S01', at: st, note: 'shot 1', draw(lt, d, t, blit) {
      hero.at(0, 0, -2); hero.set({ mood: 'happy', talk: talk(t) });
      friend.at(1.4, 0, -2.4); friend.set({ mood: 'smug' });
      shoot(ST.scene, [hero, friend], V3(0.2, 1.5, 1.2), V3(0.2, 1.3, 0.4), V3(0.5, 1.1, -2.2), eio(lt / d), LOOKS.street);
      blit();
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 2 · SHOT
  {
    const st = cut(1);
    add({ id: 'S02', at: st, note: 'shot 2', draw(lt, d, t, blit) {
      hero.at(0, 0, -2); hero.set({ mood: 'shock', talk: talk(t) });
      friend.at(1.4, 0, -2.4); friend.set({ mood: 'worried' });
      shoot(ST.scene, [hero, friend], V3(0.2, 1.5, 1.2), V3(0.2, 1.3, 0.4), V3(0.5, 1.1, -2.2), eio(lt / d), LOOKS.street);
      blit();
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 3 · SHOT
  {
    const st = cut(2);
    add({ id: 'S03', at: st, note: 'shot 3', draw(lt, d, t, blit) {
      hero.at(0, 0, -2); hero.set({ mood: 'happy', talk: talk(t) });
      friend.at(1.4, 0, -2.4); friend.set({ mood: 'smug' });
      shoot(ST.scene, [hero, friend], V3(0.2, 1.5, 1.2), V3(0.2, 1.3, 0.4), V3(0.5, 1.1, -2.2), eio(lt / d), LOOKS.street);
      blit();
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 4 · SHOT
  {
    const st = cut(3);
    add({ id: 'S04', at: st, note: 'shot 4', draw(lt, d, t, blit) {
      hero.at(0, 0, -2); hero.set({ mood: 'shock', talk: talk(t) });
      friend.at(1.4, 0, -2.4); friend.set({ mood: 'worried' });
      shoot(ST.scene, [hero, friend], V3(0.2, 1.5, 1.2), V3(0.2, 1.3, 0.4), V3(0.5, 1.1, -2.2), eio(lt / d), LOOKS.street);
      blit();
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 5 · SHOT
  {
    const st = cut(4);
    add({ id: 'S05', at: st, note: 'shot 5', draw(lt, d, t, blit) {
      hero.at(0, 0, -2); hero.set({ mood: 'happy', talk: talk(t) });
      friend.at(1.4, 0, -2.4); friend.set({ mood: 'smug' });
      shoot(ST.scene, [hero, friend], V3(0.2, 1.5, 1.2), V3(0.2, 1.3, 0.4), V3(0.5, 1.1, -2.2), eio(lt / d), LOOKS.street);
      blit();
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 6 · SHOT
  {
    const st = cut(5);
    add({ id: 'S06', at: st, note: 'shot 6', draw(lt, d, t, blit) {
      hero.at(0, 0, -2); hero.set({ mood: 'shock', talk: talk(t) });
      friend.at(1.4, 0, -2.4); friend.set({ mood: 'worried' });
      shoot(ST.scene, [hero, friend], V3(0.2, 1.5, 1.2), V3(0.2, 1.3, 0.4), V3(0.5, 1.1, -2.2), eio(lt / d), LOOKS.street);
      blit();
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  // 7 · SHOT
  {
    const st = cut(6);
    add({ id: 'S07', at: st, note: 'shot 7', draw(lt, d, t, blit) {
      hero.at(0, 0, -2); hero.set({ mood: 'happy', talk: talk(t) });
      friend.at(1.4, 0, -2.4); friend.set({ mood: 'smug' });
      shoot(ST.scene, [hero, friend], V3(0.2, 1.5, 1.2), V3(0.2, 1.3, 0.4), V3(0.5, 1.1, -2.2), eio(lt / d), LOOKS.street);
      blit();
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }

  return { shots: S, cues: CUES };
}
