import shutil, json, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from topics_100 import TOPICS

SKILL_DIR = Path(r"C:\Users\vinay\.gemini\config\skills\faceless-shorts\styles\stick-story\example")
PROJ_DIR = Path("test_build/04_stick_story")

shutil.rmtree(PROJ_DIR, ignore_errors=True)
PROJ_DIR.mkdir(parents=True, exist_ok=True)

# Copy example files
for item in ["index.html", "src", "fonts", "tools"]:
    src = SKILL_DIR / item
    dst = PROJ_DIR / item
    if src.is_dir():
        shutil.copytree(src, dst, dirs_exist_ok=True)
    elif src.is_file():
        shutil.copy2(src, dst)

# Copy shared audio data
data_dir = PROJ_DIR / "data"
data_dir.mkdir(parents=True, exist_ok=True)
for f in ["narration.wav", "lines.json", "words.json"]:
    shutil.copy2(Path("test_audio") / f, data_dir / f)

# Write script.json
topic = next(t for t in TOPICS if t['id'] == 'breathe-underwater')
with open(PROJ_DIR / "script.json", "w", encoding="utf-8") as f:
    json.dump(topic["script"], f, indent=2)

# Write tailored shots.js for Stick Story 2D
shots_js = """// STICK STORY: WHAT IF HUMANS COULD BREATHE UNDERWATER?
import { ctx, W, H, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';
const { P, GROUND } = K;

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const blink = (t) => ((t % 3.1) < 0.12 ? 1 : 0);

  // 1 · Dive into the ocean with big curious eyes
  add({ id: 'S01', at: 0, cam: [540, 1100], note: 'stick diver splashing into ocean', draw(lt, d, t) {
    ctx.fillStyle = '#0284C7'; ctx.fillRect(-300, -300, W + 600, H + 600);
    // Ocean bubbles
    for (let i = 0; i < 12; i++) {
      const bx = (i * 88 + lt * 30) % W;
      const by = (i * 140 + Math.sin(lt * 2 + i) * 50) % H;
      circle(bx, by, 16, 'rgba(255,255,255,0.4)');
    }
    K.person({ glow: true, x: 520, y: GROUND, h: 840, mood: 'happy', look: [0.3, -0.4], blink: blink(t), arms: { L: [45, 20], R: [45, 20] } });
    K.counterPill('BREATHE UNDERWATER', 540, 300, eob(seg(lt, 0, 0.25)));
  } });
  cue(0.2, 'pop', { gain: 0.5 });

  // 2 · Step 1: Lungs turn into biological gills
  { const st = cut(1);
    add({ id: 'S02', at: st, cam: [540, 1050], note: 'lungs become gills', draw(lt, d, t) {
      ctx.fillStyle = '#0369A1'; ctx.fillRect(-300, -300, W + 600, H + 600);
      K.person({ glow: true, x: 520, y: GROUND, h: 840, mood: 'determined', look: [0, 0], blink: blink(t) });
      K.stepCard(1, "BIOLOGICAL GILLS", 540, 300, eob(seg(lt, 0.05, 0.3)));
      K.counterPill('INHABIT 70% OF EARTH', 540, 480, eob(seg(lt, 0.2, 0.45)));
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop'); }

  // 3 · Step 2: Build giant undersea glass domes
  { const st = cut(2);
    add({ id: 'S03', at: st, cam: [540, 1050], note: 'undersea city domes', draw(lt, d, t) {
      ctx.fillStyle = '#075985'; ctx.fillRect(-300, -300, W + 600, H + 600);
      // Domes in background
      circle(300, 1200, 240, 'rgba(255,255,255,0.15)');
      circle(780, 1250, 200, 'rgba(255,255,255,0.15)');
      K.person({ glow: true, x: 520, y: GROUND, h: 840, mood: 'happy', look: [0.5, -0.2], blink: blink(t) });
      K.stepCard(2, "UNDERSEA CITIES", 540, 300, eob(seg(lt, 0.05, 0.3)));
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop'); }

  // 4 · Danger: Hydrostatic pressure alert!
  { const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 1000], zoom: 0.1, note: 'scared of crushing pressure', draw(lt, d, t) {
      ctx.fillStyle = '#1E1B4B'; ctx.fillRect(-300, -300, W + 600, H + 600);
      K.person({ glow: true, x: 520, y: GROUND, h: 840, mood: 'scared', look: [0, -0.6], blink: 0, arms: { L: [-40, 60], R: [-40, 60] } });
      K.cross(540, 650, eob(seg(lt, 0.1, 0.35)));
      K.counterPill('HYDROSTATIC PRESSURE', 540, 300, eob(seg(lt, 0, 0.25)));
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'thud'); }

  // 5 · Step 3: Titanium suits needed past 200ft
  { const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 1050], note: 'crush warning past 200 ft', draw(lt, d, t) {
      ctx.fillStyle = '#0F172A'; ctx.fillRect(-300, -300, W + 600, H + 600);
      const shake = Math.sin(lt * 40) * 6;
      K.person({ glow: true, x: 520 + shake, y: GROUND, h: 840, mood: 'worried', look: [0, 0.3], blink: blink(t) });
      K.stepCard(3, "CRUSH DEPTH: 200 FT", 540, 300, eob(seg(lt, 0.05, 0.3)));
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop'); }

  // 6 · Beware: Giant deep sea trench predators!
  { const st = cut(5);
    add({ id: 'S06', at: st, cam: [540, 1000], note: 'monster eyes in pitch black trench', draw(lt, d, t) {
      ctx.fillStyle = '#020617'; ctx.fillRect(-300, -300, W + 600, H + 600);
      // Monster glowing eyes
      const eyeR = 36 + Math.sin(lt * 6) * 6;
      circle(340, 650, eyeR, '#EF4444'); circle(340, 650, 14, '#7F1D1D');
      circle(740, 650, eyeR, '#EF4444'); circle(740, 650, 14, '#7F1D1D');
      K.person({ glow: true, x: 520, y: GROUND, h: 840, mood: 'scared', look: [0, -0.8], blink: 0 });
      K.counterPill('TRENCH PREDATORS', 540, 300, eob(seg(lt, 0, 0.25)));
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'thud'); }

  // 7 · Outro: Would you live down here?
  { const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 1050], note: 'hero smiles determined', draw(lt, d, t) {
      ctx.fillStyle = '#0369A1'; ctx.fillRect(-300, -300, W + 600, H + 600);
      K.person({ glow: true, x: 520, y: GROUND, h: 840, mood: 'happy', look: [0, 0], blink: blink(t), arms: { L: [20, 10], R: [20, 10] } });
      K.counterPill('WOULD YOU MOVE HERE?', 540, 300, eob(seg(lt, 0, 0.25)));
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop'); }

  return { S, CUES };
}
"""
with open(PROJ_DIR / "src/shots.js", "w", encoding="utf-8") as f:
    f.write(shots_js)

print("Stick Story project prepared at:", PROJ_DIR)
