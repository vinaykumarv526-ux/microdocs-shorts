"""Multi-style video project generator for autonomous YouTube Shorts production.
Supports rotating across all 6 flagship styles:
- deep-dive (3D Zack D. Films style)
- inside-out (2D flat cutaway explainer)
- night-file (3D dark mystery dossier)
- stick-story (2D survival step cards)
- paper-atlas (2D historical cut-paper map)
- tall-tale (3D diorama town with 2D cartoon people)
"""
import os, sys, json, shutil, subprocess
from pathlib import Path

# --- 1. DEEP DIVE 3D SHOTS GENERATOR ---
def generate_shots_deep_dive(topic):
    pill_text = topic.get("pill", "MEDICAL ALERT")
    pill_color = topic.get("pill_color", "#FF3B30")
    theme_color = topic.get("theme_color", "#4FD1E8")
    shirt_color = topic.get("shirt_color", "#2563EB")
    lines = topic["script"]["lines"]
    num_lines = len(lines)

    code = f"""// AUTO-GENERATED 3D DEEP DIVE SHOTS: {topic['title']}
import * as THREE from 'three';
import {{ ctx, W, H, clamp, lerp, seg, eo, eio, eob }} from './core/lib.js';
import {{ L, Wd, T }} from './core/timing.js';
import {{ camera }} from './core/engine.js';
import {{ Human }} from './core/human.js';
import * as SETS from './core/sets.js';
import {{ label, pill, warning, blackout }} from './core/look2d.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const lerpV = (a, b, k) => a.clone().lerp(b, k);
function screen(p, cam) {{ const v = p.clone().project(cam); return [(v.x + 1) / 2 * W, (1 - v.y) / 2 * H]; }}

export function buildShots(E) {{
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {{}}) => CUES.push({{ t: +t.toFixed(3), type, ...o }});
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const cam = camera(30);

  const KLOOK = {{ aperture: 0.003, maxblur: 0.01, bloom: 0.35 }};
  const XLOOK = {{ aperture: 0.0015, bloom: 0.7, bloomThreshold: 0.3, vignette: 0.5 }};

  const K = SETS.kitchen(E);
  const hero = new Human({{ skin: '#E5AA88', shirt: '{shirt_color}', pants: '#1C1917', hair: '#1C1917' }});
  hero.group.position.set(0.1, 0, -0.6);
  K.scene.add(hero.group);

  const X = SETS.xrayStage(E);
  const xh = new Human({{ skin: '#E5AA88' }});
  const xmat = SETS.xrayMaterial('{theme_color}');
  xh.setBodyMaterial(xmat);
  const I = SETS.insides();
  xh.spine.add(I.group);
  X.scene.add(xh.group);

  const CYAN = new THREE.Color('{theme_color}');
  const RED = new THREE.Color('#FF2836');
  const AMBER = new THREE.Color('#FFB020');

  const reset = () => {{
    hero.pose({{}});
    xh.pose({{}});
    I.heart.scale.setScalar(1);
    xmat.uniforms.uCol.value.copy(CYAN);
  }};
  const FACE = V3(0.1, 1.68, -0.6);
"""
    for i, line in enumerate(lines):
        is_first = (i == 0)
        is_last = (i == num_lines - 1)
        is_xray = (i % 2 == 1)

        if is_first:
            shot = f"""
  // {i+1} · HOOK
  {{
    const st = cut({i});
    add({{
      id: 'S01', at: st, note: 'hook opening',
      draw(lt, d, t, blit) {{
        reset();
        hero.pose({{ head: [-4, 0, 0], shL: [22, 0, 12], shR: [22, 0, -12], lid: -0.2 }});
        cam.position.copy(lerpV(V3(0.32, 1.74, 0.5), V3(0.18, 1.68, 0.18), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, {{ ...KLOOK, focus: cam.position.distanceTo(FACE), bloom: 0.5 }});
        blit();
      }}
    }});
    cue(st, 'whoosh'); cue(st + 0.45, 'pop', {{ gain: 0.8 }});
  }}
"""
        elif is_last:
            shot = f"""
  // {i+1} · RESOLUTION & OUTRO
  {{
    const st = cut({i});
    add({{
      id: 'S{i+1:02d}', at: st, note: 'outro resolution',
      draw(lt, d, t, blit) {{
        reset();
        hero.pose({{ head: [-2 + Math.sin(lt * 2) * 2, 0, 0], shL: [15, 0, 10], shR: [15, 0, -10], lid: 0.1 }});
        cam.position.copy(lerpV(V3(0.25, 1.70, 0.45), V3(0.12, 1.68, 0.22), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, {{ ...KLOOK, focus: cam.position.distanceTo(FACE) }});
        blit();
      }}
    }});
    cue(st, 'whoosh'); cue(st + 0.4, 'pop', {{ gain: 0.6 }});
  }}
"""
        elif is_xray:
            shot = f"""
  // {i+1} · INTERNAL REACTION
  {{
    const st = cut({i});
    add({{
      id: 'S{i+1:02d}', at: st, note: 'internal xray analysis',
      draw(lt, d, t, blit) {{
        reset();
        xmat.uniforms.uCol.value.copy(RED);
        xh.pose({{ head: [4, -2, 0] }});
        cam.position.copy(lerpV(V3(0.40, 1.62, 1.1), V3(0.18, 1.58, 0.75), eio(lt / d)));
        cam.lookAt(0.1, 1.52, 0);
        E.render(X.scene, cam, {{ ...XLOOK, focus: cam.position.distanceTo(V3(0.1, 1.52, 0)) }});
        blit();
      }}
    }});
    cue(st, 'whoosh'); cue(st + 0.35, 'slam', {{ gain: 0.6 }});
  }}
"""
        else:
            shot = f"""
  // {i+1} · ESCALATION
  {{
    const st = cut({i});
    add({{
      id: 'S{i+1:02d}', at: st, note: 'external progression',
      draw(lt, d, t, blit) {{
        reset();
        hero.pose({{ head: [-5, 4, 0], shL: [30, 0, 15], shR: [20, 0, -10], lid: -0.1 }});
        cam.position.copy(lerpV(V3(0.35, 1.72, 0.55), V3(0.15, 1.66, 0.25), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, {{ ...KLOOK, focus: cam.position.distanceTo(FACE) }});
        blit();
      }}
    }});
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', {{ gain: 0.5 }});
  }}
"""
        code += shot

    code += """
  return { shots: S, cues: CUES };
}
"""
    return code


# --- 2. INSIDE OUT 2D SHOTS GENERATOR ---
def generate_shots_inside_out(topic):
    title = topic['title'].upper().replace('?', '')
    pill_text = topic.get("pill", "HOW IT WORKS")

    code = f"""// AUTO-GENERATED 2D FLAT ARCHITECTURAL MODEL (9-CUT RETENTION LOOP): {topic['title']}
import {{ ctx, C, W, H, clamp, lerp, seg, eo, eio, eob, rnd, bigText, rr, circle, ell, line, fillAll }} from './core/lib.js';
import {{ L, Le, Wd, T }} from './core/timing.js';
import * as K from './core/kit.js';
import * as TK from './core/trainKit.js';

export function buildShots() {{
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {{}}) => CUES.push({{ t: +t.toFixed(3), type, ...o }});
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);

  // 1 · HOOK: The counter-intuitive challenge / hero in motion
  {{
    const st = cut(0);
    add({{ id: 'S01', at: st, cam: [540, 850], zoom: 0.18, note: 'hook opening hero in motion',
      draw(lt) {{
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        ctx.fillStyle = '#E8F1F5'; ctx.fillRect(-300, -300, W + 600, 1100);
        TK.trainSide(540, 880, 0.95, lt + 0.5);
        if (lt > 1.2) K.shockLines(540, 880, 320, clamp((lt - 1.2) * 4));
      }} }});
    cue(st, 'whoosh'); cue(st + 0.3, 'slide', {{ dur: 3.5 }});
  }}

  // 2 · THE FLAWED MYTH: What people assume (flat cross-section)
  {{
    const st = cut(1);
    add({{ id: 'S02', at: st, cam: [540, 960], note: 'flawed myth flat cross section',
      draw(lt) {{
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        TK.wheelsetCrossFlat(540, 980, 0.95, {{ tilt: 0, shake: 0 }});
        K.pill('FLAT WHEELS', 540, 480, 56, C.ink, C.white, eob(seg(lt, 0, 0.35)));
      }} }});
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }}

  // 3 · THE FAILURE POINT: Violent breakdown / red alert
  {{
    const st = cut(2);
    add({{ id: 'S03', at: st, cam: [540, 960], note: 'failure point violent breakdown',
      draw(lt) {{
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        const shake = Math.sin(lt * 45) * clamp(lt * 8, 0, 14);
        const tilt = Math.sin(lt * 18) * 0.12;
        TK.wheelsetCrossFlat(540 + shake, 980, 0.95, {{ tilt, shake: 1 }});
        K.hazard(540, 480, 160, eob(seg(lt, 0, 0.35)));
      }} }});
    cue(st, 'whoosh'); cue(st + 0.25, 'slam');
  }}

  // 4 · THE ARCHITECTURAL SECRET: Technical cutaway & component tags
  {{
    const st = cut(3);
    add({{ id: 'S04', at: st, cam: [540, 960], note: 'architectural secret schematic cutaway',
      draw(lt) {{
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        TK.wheelCloseUpTaper(540, 980, 1.05, {{ contactU: seg(lt, 0.2, 1.0), showTags: true }});
      }} }});
    cue(st, 'whoosh'); cue(st + 0.35, 'pop');
  }}

  // 5 · DYNAMICS / FLOW: Conical geometry shift
  {{
    const st = cut(4);
    add({{ id: 'S05', at: st, cam: [540, 960], note: 'dynamics flow geometry shift',
      draw(lt) {{
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        const drift = Math.sin(lt * 3) * 0.4;
        TK.wheelsetCrossConical(540, 980, 0.95, {{ drift, showDiff: true }});
      }} }});
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }}

  // 6 · SELF-BALANCING LOOP: Feedback correction around curve
  {{
    const st = cut(5);
    add({{ id: 'S06', at: st, cam: [540, 960], note: 'self balancing loop track curve',
      draw(lt) {{
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        const prog = seg(lt, 0, 2.5);
        TK.trackCurvingTop(540, 960, 1.0, {{ trainCurve: 1, progress: prog }});
      }} }});
    cue(st, 'whoosh'); cue(st + 0.25, 'ding');
  }}

  // 7 · ENGINE X-RAY: Blueprint internal motor & drive axle
  {{
    const st = cut(6);
    add({{ id: 'S07', at: st, cam: [540, 960], note: 'engine x-ray blueprint',
      draw(lt) {{
        ctx.fillStyle = '#080E18'; ctx.fillRect(-300, -300, W + 600, H + 600);
        TK.tractionMotorXray(540, 980, 0.95, lt);
      }} }});
    cue(st, 'whoosh'); cue(st + 0.3, 'slam');
  }}

  // 8 · EFFICIENCY METRIC: Macro close-up leverage point (<0.1% friction)
  {{
    const st = cut(7);
    add({{ id: 'S08', at: st, cam: [540, 960], note: 'efficiency metric dime sized contact',
      draw(lt) {{
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        TK.contactPatchExtreme(540, 960, 1.1, {{ contactPulse: Math.sin(lt * 8) * 0.5 + 0.5 }});
      }} }});
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }}

  // 9 · LOOP OUTRO: Seamless resolution returning to opening hook
  {{
    const st = cut(8);
    add({{ id: 'S09', at: st, cam: [540, 850], note: 'loop outro seamless resolution',
      draw(lt) {{
        ctx.fillStyle = C.bg; ctx.fillRect(-300, -300, W + 600, H + 600);
        ctx.fillStyle = '#E8F1F5'; ctx.fillRect(-300, -300, W + 600, 1100);
        TK.trainSide(540, 880, 0.95, lt + 2.0);
      }} }});
    cue(st, 'whoosh'); cue(st + 0.25, 'ding');
  }}

  return {{ shots: S, cues: CUES }};
}}
"""
    return code


# --- 3. NIGHT FILE 3D SHOTS GENERATOR ---
def generate_shots_night_file(topic):
    lines = topic["script"]["lines"]
    num_lines = len(lines)

    code = f"""// AUTO-GENERATED NIGHT FILE 3D: {topic['title']}
import * as THREE from 'three';
import {{ ctx, setCtx, W, H, clamp, lerp, seg, eo, eio, eob, rr }} from './core/lib.js';
import {{ L, Wd, T }} from './core/timing.js';
import {{ camera }} from './core/engine.js';
import {{ Human }} from './core/human.js';
import * as SETS from './core/sets3d.js';
import * as K from './core/kit.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z), lerpV = (a, b, k) => a.clone().lerp(b, k);
const NIGHT = {{ exposure: 1.25, bloom: 0.85, bloomThreshold: 0.55, vignette: 0.6, grain: 0.05, warm: 0 }};

export function buildShots(E) {{
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {{}}) => CUES.push({{ t: +t.toFixed(3), type, ...o }});
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const cam = camera(34);
  const C = SETS.planeCabin();
  const person = (kind) => {{ const h = new Human({{ face: false }}); h.setAllMaterial(kind === 'subject' ? SETS.subjectMat() : SETS.witnessMat()); return h; }};
  const cooper = person('subject');
  C.scene.add(cooper.group);
  const render = (scene, focusP, extra = {{}}) => {{
    if (cam.fov !== (extra.fov || 34)) {{ cam.fov = extra.fov || 34; cam.updateProjectionMatrix(); }}
    E.render(scene, cam, {{ ...NIGHT, focus: cam.position.distanceTo(focusP), aperture: 0.0012, ...extra }});
  }};
"""
    for i in range(num_lines):
        is_first = (i == 0)
        is_last = (i == num_lines - 1)

        if is_first:
            shot = f"""
  // {i+1} · CASE OPENING
  {{
    const st = cut({i});
    add({{ id: 'S01', at: st, note: 'evidence opening', draw(lt, d, t, blit) {{
      cam.position.copy(lerpV(V3(0.3, 1.55, 1.8), V3(0.15, 1.5, 0.6), eio(lt / d)));
      cam.lookAt(0, 1.1, -10);
      render(C.scene, V3(0, 1, -5));
      blit();
      K.dateStamp('CLASSIFIED DOSSIER', 'FILE #84-PETROLEUM', clamp(lt / 1.5), 80, 300);
    }} }});
    cue(st, 'whoosh'); cue(st + 0.3, 'thud');
  }}
"""
        elif is_last:
            shot = f"""
  // {i+1} · VERDICT
  {{
    const st = cut({i});
    add({{ id: 'S{i+1:02d}', at: st, note: 'case stamp', draw(lt, d, t, blit) {{
      cam.position.set(0, 1.4, -2.5);
      cam.lookAt(0, 1.1, -6);
      render(C.scene, V3(0, 1, -4));
      blit();
      K.caseFile(540, 880, 1, 'VERDICT DOSSIER', clamp(lt / 0.5));
    }} }});
    cue(st, 'whoosh'); cue(st + 0.3, 'thud');
  }}
"""
        else:
            shot = f"""
  // {i+1} · EVIDENCE & REDACTION
  {{
    const st = cut({i});
    add({{ id: 'S{i+1:02d}', at: st, note: 'redacted file', draw(lt, d, t, blit) {{
      cam.position.set(0.15, 1.4, -1.0 - {i * 0.4});
      cam.lookAt(0, 1.1, -8);
      render(C.scene, V3(0, 1, -4));
      blit();
      K.redacted(200, 400, [680, 520, 600], clamp(lt / 0.4));
    }} }});
    cue(st, 'whoosh');
  }}
"""
        code += shot

    code += """
  return { shots: S, cues: CUES };
}
"""
    return code


def generate_shots_stick_story(topic):
    title = topic['title'].upper().replace('?', '')
    lines = topic["script"]["lines"]
    num_lines = len(lines)

    code = f"""// AUTO-GENERATED STICK STORY 2D: {topic['title']}
import {{ ctx, C, W, H, clamp, lerp, seg, eo, eio, eob, rnd, bigText, rr, circle, line, fillAll }} from './core/lib.js';
import {{ L, Le, Wd, T }} from './core/timing.js';
import * as K from './core/kit.js';

export function buildShots() {{
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {{}}) => CUES.push({{ t: +t.toFixed(3), type, ...o }});
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
"""
    for i in range(num_lines):
        step_num = i + 1
        code += f"""
  // {step_num} · STEP CARD
  {{
    const st = cut({i});
    add({{ id: 'S{step_num:02d}', at: st, cam: [540, 960], note: 'step {step_num}',
      draw(lt) {{
        fillAll('#18181B');
        K.room({{ night: {1 if i % 2 == 1 else 0} }});
        K.stick({{ x: 540, y: 1300, pose: '{'run' if i % 2 == 1 else 'stand'}', eyes: '{'shock' if i > 0 else 'wide'}' }});
        K.stepCard(540, 420, {step_num}, 'STEP {step_num}', eob(seg(lt, 0, 0.4)));
      }} }});
    cue(st, 'whoosh'); cue(st + 0.3, 'ding');
  }}
"""
    code += """
  return { shots: S, cues: CUES };
}
"""
    return code


# --- 5. TALL TALE 3D SHOTS GENERATOR ---
def generate_shots_tall_tale(topic):
    lines = topic["script"]["lines"]
    num_lines = len(lines)

    code = f"""// AUTO-GENERATED TALL TALE 3D: {topic['title']}
import * as THREE from 'three';
import {{ ctx, clamp, lerp, seg, eo, eio, eob }} from './core/lib.js';
import {{ L, Wd, T }} from './core/timing.js';
import {{ camera }} from './core/engine.js';
import * as WD from './core/world.js';
import {{ Toon }} from './core/toon.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const mix = (a, b, k) => a.clone().lerp(b, k);
const talk = (t, on = 1) => (on ? 0.25 + 0.75 * Math.abs(Math.sin(t * 13)) : 0);

export function buildShots(E) {{
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {{}}) => CUES.push({{ t: +t.toFixed(3), type, ...o }});
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.06);
  const cam = camera(36);
  const LOOKS = {{ street: {{ bloom: 0.2, aperture: 0.001, maxblur: 0.008 }} }};

  const ST = WD.mainStreet(E, {{}});
  const hero = new Toon({{ body: '#06B6D4', hat: 'cap', hatCol: '#0891B2', hairCol: '#1E293B' }});
  const friend = new Toon({{ body: '#F59E0B', hat: 'bowler', hatCol: '#D97706', extra: ['glasses'] }});
  ST.scene.add(hero.group, friend.group);

  const shoot = (scene, people, from, to, at, k, look) => {{
    cam.position.copy(mix(from, to, k)); cam.lookAt(at);
    people.forEach((p) => p.face(cam));
    E.render(scene, cam, {{ ...look, focus: cam.position.distanceTo(at) }});
  }};
"""
    for i in range(num_lines):
        is_first = (i == 0)
        code += f"""
  // {i+1} · SHOT
  {{
    const st = cut({i});
    add({{ id: 'S{i+1:02d}', at: st, note: 'shot {i+1}', draw(lt, d, t, blit) {{
      hero.at(0, 0, -2); hero.set({{ mood: '{'happy' if i%2==0 else 'shock'}', talk: talk(t) }});
      friend.at(1.4, 0, -2.4); friend.set({{ mood: '{'smug' if i%2==0 else 'worried'}' }});
      shoot(ST.scene, [hero, friend], V3(0.2, 1.5, 1.2), V3(0.2, 1.3, 0.4), V3(0.5, 1.1, -2.2), eio(lt / d), LOOKS.street);
      blit();
    }} }});
    cue(st, 'whoosh'); cue(st + 0.3, 'pop');
  }}
"""
    code += """
  return { shots: S, cues: CUES };
}
"""
    return code


# --- 6. PAPER ATLAS 2D SHOTS GENERATOR ---
def generate_shots_paper_atlas(topic):
    lines = topic["script"]["lines"]
    num_lines = len(lines)

    code = f"""// AUTO-GENERATED PAPER ATLAS 2D: {topic['title']}
import {{ ctx, C, W, H, clamp, lerp, seg, eo, eio, eob, fillAll, rr, circle }} from './core/lib.js';
import {{ L, Wd, T }} from './core/timing.js';
import * as K from './core/kit.js';

export function buildShots() {{
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {{}}) => CUES.push({{ t: +t.toFixed(3), type, ...o }});
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
"""
    for i in range(num_lines):
        code += f"""
  // {i+1} · HISTORICAL MAP STAGE
  {{
    const st = cut({i});
    add({{ id: 'S{i+1:02d}', at: st, cam: [540, 960], note: 'stage {i+1}',
      draw(lt) {{
        fillAll('#E5D9C5');
        K.map({{ highlight: {i % 3}, route: eio(seg(lt, 0, 0.8)) }});
        K.ribbon(540, 380, 'RECORD #{i+1:02d}', eob(seg(lt, 0, 0.4)));
      }} }});
    cue(st, 'whoosh'); cue(st + 0.3, 'slide');
  }}
"""
    code += """
  return { shots: S, cues: CUES };
}
"""
    return code


# Master dispatcher dictionary
STYLE_GENERATORS = {
    "deep-dive": generate_shots_deep_dive,
    "inside-out": generate_shots_inside_out,
    "night-file": generate_shots_night_file,
    "stick-story": generate_shots_stick_story,
    "paper-atlas": generate_shots_paper_atlas,
    "tall-tale": generate_shots_tall_tale
}

VOICE_MAP = {
    "deep-dive": "en-US-GuyNeural",
    "inside-out": "en-US-GuyNeural",
    "night-file": "en-US-RogerNeural",
    "stick-story": "en-US-EricNeural",
    "paper-atlas": "en-GB-RyanNeural",
    "tall-tale": "en-US-BrianNeural"
}

def create_project_for_topic(topic, style="inside-out"):
    topic_id = topic["id"]
    project_dir = Path(f"videos/{topic_id}")
    
    # Pick template directory based on style
    template_name = f"template_{style.replace('-', '_')}"
    template_dir = Path(template_name)
    if not template_dir.exists():
        print(f"Warning: {template_name} not found, falling back to template_deep_dive")
        template_dir = Path("template_deep_dive")

    print(f"Creating project at {project_dir} using style '{style}' (template: {template_dir})...")
    project_dir.mkdir(parents=True, exist_ok=True)
    for item in ["index.html", "sheet.html", "src", "vendor", "fonts", "tools"]:
        src = template_dir / item
        dst = project_dir / item
        if src.is_dir():
            shutil.copytree(src, dst, dirs_exist_ok=True)
        elif src.is_file():
            shutil.copy2(src, dst)

    # Write script.json
    script_path = project_dir / "script.json"
    with open(script_path, "w", encoding="utf-8") as f:
        json.dump(topic["script"], f, indent=2)

    # Generate shots.js using the appropriate style generator
    shots_generator = STYLE_GENERATORS.get(style, generate_shots_deep_dive)
    shots_content = shots_generator(topic)
    shots_js_path = project_dir / "src/shots.js"
    with open(shots_js_path, "w", encoding="utf-8") as f:
        f.write(shots_content)

    # Pick voice for style
    voice_name = topic.get("voice", VOICE_MAP.get(style, "en-US-ChristopherNeural"))

    # Write generate_audio.py
    gen_audio_py = f"""import asyncio, json, re
from pathlib import Path
import edge_tts
import numpy as np
import soundfile as sf
import soxr

VOICE = "{voice_name}"
RATE = "+12%"
PITCH = "+3Hz"

PROJECT_DIR = Path(".")
SCRIPT_FILE = PROJECT_DIR / "script.json"
DATA_DIR = PROJECT_DIR / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)

with open(SCRIPT_FILE, "r", encoding="utf-8") as f:
    script = json.load(f)

lines_def = script["lines"]
lead = script.get("lead", 0.35)
gap = script.get("gap", 0.28)
outro = script.get("outro", 1.0)

async def generate():
    temp_wavs = []
    lines_out = []
    words_out = []
    cur_t = lead

    print(f"Generating speech lines with edge-tts ({{VOICE}}) for {topic_id}...")
    for idx, item in enumerate(lines_def):
        text = item["text"]
        mp3_path = DATA_DIR / f"line_{{idx}}.mp3"
        wav_path = DATA_DIR / f"line_{{idx}}.wav"

        comm = edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH)
        await comm.save(str(mp3_path))

        data, sr = sf.read(str(mp3_path))
        if len(data.shape) > 1:
            data = data.mean(axis=1)

        thr = 0.008
        active = np.where(np.abs(data) > thr)[0]
        if len(active):
            a = max(0, active[0] - int(0.02 * sr))
            b = min(len(data), active[-1] + int(0.04 * sr))
            data = data[a:b]

        data_24k = soxr.resample(data, sr, 24000)
        dur = len(data_24k) / 24000.0

        sf.write(str(wav_path), data_24k, 24000, subtype="PCM_16")
        temp_wavs.append((data_24k, cur_t, cur_t + dur))

        lines_out.append({{
            "i": idx,
            "text": text,
            "start": round(cur_t, 3),
            "end": round(cur_t + dur, 3)
        }})

        words = re.findall(r"\\b[\\w']+\\b", text)
        w_dur = dur / max(1, len(words))
        for w_idx, w in enumerate(words):
            words_out.append({{
                "w": w,
                "line": idx,
                "s": round(cur_t + w_idx * w_dur, 3),
                "e": round(cur_t + (w_idx + 1) * w_dur - 0.02, 3)
            }})

        cur_t += dur + item.get("gap", gap)

    total_dur = cur_t + outro
    full_audio = np.zeros(int(total_dur * 24000), dtype=np.float32)
    for data, start_t, end_t in temp_wavs:
        s_idx = int(start_t * 24000)
        e_idx = s_idx + len(data)
        if e_idx <= len(full_audio):
            full_audio[s_idx:e_idx] += data

    narration_wav = DATA_DIR / "narration.wav"
    sf.write(str(narration_wav), full_audio, 24000, subtype="PCM_16")

    with open(DATA_DIR / "lines.json", "w", encoding="utf-8") as f:
        json.dump({{
            "duration": round(total_dur, 3),
            "voice": VOICE,
            "speed": 1.0,
            "lines": lines_out
        }}, f, indent=1)

    with open(DATA_DIR / "words.json", "w", encoding="utf-8") as f:
        json.dump(words_out, f, indent=1)

    print(f"Generated voiceover audio ({{round(total_dur, 2)}}s) successfully.")

if __name__ == "__main__":
    asyncio.run(generate())
"""
    with open(project_dir / "generate_audio.py", "w", encoding="utf-8") as f:
        f.write(gen_audio_py)

    print(f"Project for {topic_id} ({style}) created successfully!")
    return project_dir

def render_project(project_dir, topic_id):
    project_dir = Path(project_dir).resolve()
    video_out = project_dir / f"renders/{topic_id}.mp4"
    if video_out.exists():
        print(f"Video already rendered at {video_out}")
        return video_out

    print(f"--- 1. Generating audio for {topic_id} ---")
    subprocess.run([sys.executable, "generate_audio.py"], cwd=str(project_dir), check=True)

    print(f"--- 2. Generating sound cues ---")
    subprocess.run(["node", "tools/capture.mjs", "cues"], cwd=str(project_dir), check=True)

    print(f"--- 3. Mixing procedural audio bed & SFX ---")
    subprocess.run([sys.executable, "tools/mix.py"], cwd=str(project_dir), check=True)

    print(f"--- 4. Rendering MP4 video with headless Chrome & FFmpeg ---")
    video_out.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(["node", "tools/capture.mjs", "video", f"renders/{topic_id}.mp4"], cwd=str(project_dir), check=True)

    print(f"--- 5. Generating high-impact thumbnail for {topic_id} ---")
    try:
        from generate_thumbnail import create_thumbnail_for_project
        create_thumbnail_for_project(project_dir, topic_id, video_out)
    except Exception as e:
        print(f"Warning: Failed to generate thumbnail: {e}")

    print(f"Render complete: {video_out}")
    return video_out
