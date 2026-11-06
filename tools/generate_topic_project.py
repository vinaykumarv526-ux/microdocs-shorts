"""Generator to instantiate a complete 3D Deep Dive video project from a topic dictionary.
Handles copying the template, writing script.json, generate_audio.py, shots.js, and running the pipeline.
"""
import os, sys, json, shutil, subprocess
from pathlib import Path

def generate_shots_js(topic):
    pill_text = topic.get("pill", "MEDICAL ALERT")
    pill_color = topic.get("pill_color", "#FF3B30")
    theme_color = topic.get("theme_color", "#4FD1E8")
    shirt_color = topic.get("shirt_color", "#2563EB")
    lines = topic["script"]["lines"]
    num_lines = len(lines)

    shots_code = f"""// AUTO-GENERATED 3D DEEP DIVE SHOTS: {topic['title']}
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

  // ── Sets & Characters ──
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
        is_xray = (i % 2 == 1) # Alternate between reality and anatomical internal x-ray

        if is_first:
            shot_body = f"""
  // {i+1} · HOOK
  {{
    const st = cut({i});
    add({{
      id: 'S01', at: st, note: 'hook opening',
      draw(lt, d, t, blit) {{
        reset();
        hero.pose({{
          head: [-4, 0, 0],
          shL: [22, 0, 12],
          shR: [22, 0, -12],
          lid: -0.2
        }});
        cam.position.copy(lerpV(V3(0.32, 1.74, 0.5), V3(0.18, 1.68, 0.18), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, {{ ...KLOOK, focus: cam.position.distanceTo(FACE), bloom: 0.5 }});
        blit();

        pill('{pill_text}', 540, 300, eob(seg(lt, 0.1, 0.45)), '{pill_color}', 'rgba(25,10,10,0.95)', 68);
        warning(540, 520, eob(seg(lt, 0.5, 0.9)));
      }}
    }});
    cue(st, 'whoosh'); cue(st + 0.45, 'pop', {{ gain: 0.8 }});
  }}
"""
        elif is_last:
            shot_body = f"""
  // {i+1} · OUTRO & ADVICE
  {{
    const st = cut({i});
    add({{
      id: 'S{i+1:02d}', at: st, note: 'outro warning and resolution',
      draw(lt, d, t, blit) {{
        reset();
        hero.pose({{
          head: [-2 + Math.sin(lt * 2) * 2, 0, 0],
          shL: [15, 0, 10],
          shR: [15, 0, -10],
          lid: 0.1
        }});
        cam.position.copy(lerpV(V3(0.25, 1.70, 0.45), V3(0.12, 1.68, 0.22), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, {{ ...KLOOK, focus: cam.position.distanceTo(FACE) }});
        blit();

        pill('DOCTOR ADVICE', 540, 300, eob(seg(lt, 0, 0.35)), '#10B981', 'rgba(10,25,15,0.92)', 64);
        warning(540, 520, eob(seg(lt, 0.4, 0.8)));
      }}
    }});
    cue(st, 'whoosh'); cue(st + 0.4, 'pop', {{ gain: 0.6 }});
  }}
"""
        elif is_xray:
            shot_body = f"""
  // {i+1} · INTERNAL ANATOMY & PHYSIOLOGY
  {{
    const st = cut({i});
    add({{
      id: 'S{i+1:02d}', at: st, note: 'x-ray internal reaction',
      draw(lt, d, t, blit) {{
        reset();
        xmat.uniforms.uCol.value.copy(RED);
        xh.pose({{ head: [4, -2, 0] }});
        cam.position.copy(lerpV(V3(0.40, 1.62, 1.1), V3(0.18, 1.58, 0.75), eio(lt / d)));
        cam.lookAt(0.1, 1.52, 0);
        E.render(X.scene, cam, {{ ...XLOOK, focus: cam.position.distanceTo(V3(0.1, 1.52, 0)) }});
        blit();

        pill('INTERNAL REACTION', 540, 300, eob(seg(lt, 0, 0.35)), '#FF2836', 'rgba(25,10,10,0.92)', 64);
        const [px, py] = screen(V3(0.1, 1.55, 0.1), cam);
        label('CRITICAL ZONE', 720, 500, px, py, eob(seg(lt, 0.3, 0.7)));
      }}
    }});
    cue(st, 'whoosh'); cue(st + 0.35, 'slam', {{ gain: 0.6 }});
  }}
"""
        else:
            shot_body = f"""
  // {i+1} · ESCALATION & SYMPTOMS
  {{
    const st = cut({i});
    add({{
      id: 'S{i+1:02d}', at: st, note: 'symptom progression',
      draw(lt, d, t, blit) {{
        reset();
        hero.pose({{
          head: [-5, 4, 0],
          shL: [30, 0, 15],
          shR: [20, 0, -10],
          lid: -0.1
        }});
        cam.position.copy(lerpV(V3(0.35, 1.72, 0.55), V3(0.15, 1.66, 0.25), eio(lt / d)));
        cam.lookAt(FACE);
        E.render(K.scene, cam, {{ ...KLOOK, focus: cam.position.distanceTo(FACE) }});
        blit();

        pill('SYMPTOMS ESCALATE', 540, 300, eob(seg(lt, 0, 0.35)), '#FFB020', 'rgba(25,20,10,0.92)', 64);
        const [fx, fy] = screen(FACE, cam);
        label('RAPID SPREAD', 720, 480, fx, fy, eob(seg(lt, 0.3, 0.7)));
      }}
    }});
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', {{ gain: 0.5 }});
  }}
"""
        shots_code += shot_body

    shots_code += """
  return { shots: S, cues: CUES };
}
"""
    return shots_code


def create_project_for_topic(topic):
    topic_id = topic["id"]
    project_dir = Path(f"videos/{topic_id}")
    template_dir = Path("template_deep_dive")

    if not template_dir.exists():
        raise RuntimeError("template_deep_dive directory not found!")

    # 1. Copy template files
    print(f"Creating project at {project_dir}...")
    project_dir.mkdir(parents=True, exist_ok=True)
    for item in ["index.html", "sheet.html", "src", "vendor", "fonts", "tools"]:
        src = template_dir / item
        dst = project_dir / item
        if src.is_dir():
            shutil.copytree(src, dst, dirs_exist_ok=True)
        elif src.is_file():
            shutil.copy2(src, dst)

    # 2. Write script.json
    script_path = project_dir / "script.json"
    with open(script_path, "w", encoding="utf-8") as f:
        json.dump(topic["script"], f, indent=2)

    # 3. Write dynamic shots.js
    shots_js_path = project_dir / "src/shots.js"
    shots_content = generate_shots_js(topic)
    with open(shots_js_path, "w", encoding="utf-8") as f:
        f.write(shots_content)

    # 4. Write generate_audio.py
    gen_audio_py = f"""import asyncio, json, re
from pathlib import Path
import edge_tts
import numpy as np
import soundfile as sf
import soxr

VOICE = "{topic['script'].get('voice', 'en-US-ChristopherNeural')}"
RATE = "+6%"

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

    print("Generating speech lines with edge-tts for {topic_id}...")
    for idx, item in enumerate(lines_def):
        text = item["text"]
        mp3_path = DATA_DIR / f"line_{{idx}}.mp3"
        wav_path = DATA_DIR / f"line_{{idx}}.wav"

        comm = edge_tts.Communicate(text, VOICE, rate=RATE)
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

    print(f"Project for {topic_id} created successfully!")
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

    print(f"Render complete: {video_out}")
    return video_out
