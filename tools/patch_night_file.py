with open('tools/generate_topic_project.py', 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = None
end_idx = None

for i, line in enumerate(lines):
    if line.startswith('def generate_shots_night_file(topic):'):
        start_idx = i
    if start_idx is not None and i > start_idx and line.startswith('def generate_shots_stick_story(topic):'):
        end_idx = i
        break

if start_idx is not None and end_idx is not None:
    new_func = """def generate_shots_night_file(topic):
    lines = topic["script"]["lines"]
    num_lines = len(lines)

    code = f\"\"\"// AUTO-GENERATED NIGHT FILE 3D: {topic['title']}
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
\"\"\"
    for i in range(num_lines):
        is_first = (i == 0)
        is_last = (i == num_lines - 1)

        if is_first:
            shot = f\"\"\"
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
\"\"\"
        elif is_last:
            shot = f\"\"\"
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
\"\"\"
        else:
            shot = f\"\"\"
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
\"\"\"
        code += shot

    code += \"\"\"
  return { shots: S, cues: CUES };
}
\"\"\"
    return code

\n"""
    lines[start_idx:end_idx] = [new_func]
    with open('tools/generate_topic_project.py', 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("SUCCESSFULLY PATCHED generate_shots_night_file")
else:
    print(f"FAILED: start_idx={start_idx}, end_idx={end_idx}")
