import shutil, json, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from topics_100 import TOPICS

SKILL_DIR = Path(r"C:\Users\vinay\.gemini\config\skills\faceless-shorts\styles\paper-atlas\example")
PROJ_DIR = Path("test_build/05_paper_atlas")

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

# Write tailored shots.js for Paper Atlas 2D
shots_js = """// PAPER ATLAS 2D: WHAT IF HUMANS COULD BREATHE UNDERWATER?
import { ctx, W, H, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);

  // 1 · World map: Parchment oceans open up
  add({ id: 'S01', at: 0, cam: [540, 960], note: 'world map oceans parchment', draw(lt, d, t) {
    K.parchment(42);
    // Draw parchment ocean continents
    ctx.fillStyle = '#C4A47C';
    rr(200, 600, 320, 500, 24); ctx.fill();
    rr(620, 700, 280, 420, 24); ctx.fill();
    K.ribbon('PACIFIC & ATLANTIC', 540, 300, eob(seg(lt, 0, 0.3)));
    K.figure({ x: 540, y: 1350, h: 420, role: 'sailor', walk: 0 });
  } });
  cue(0.2, 'pop', { gain: 0.5 });

  // 2 · 70% of Earth: Crimson route expanding across blue seas
  { const st = cut(1);
    add({ id: 'S02', at: st, cam: [540, 960], note: 'crimson routes across oceans', draw(lt, d, t) {
      K.parchment(13);
      K.map({ highlight: 'ocean', p: eio(seg(lt, 0, 0.8)) });
      K.seal(540, 500, eob(seg(lt, 0.1, 0.4)), '70%');
      K.slip('70% OF THE PLANET', 540, 320, eob(seg(lt, 0, 0.25)));
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop'); }

  // 3 · Submerged Cities: Gold compass & underwater architecture
  { const st = cut(2);
    add({ id: 'S03', at: st, cam: [540, 960], note: 'parchment city domes underwater', draw(lt, d, t) {
      K.parchment(88);
      // Undersea map features
      K.compass(820, 600, 0.9);
      // Cut-paper domes
      circle(400, 1100, 200, '#A38258');
      circle(680, 1150, 160, '#A38258');
      K.figure({ x: 540, y: 1400, h: 420, role: 'scholar' });
      K.slip('UNDERSEA CIVILIZATION', 540, 320, eob(seg(lt, 0, 0.25)));
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop'); }

  // 4 · The Threat: Deep ocean pressure abyss
  { const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 960], note: 'navy parchment abyss depth', draw(lt, d, t) {
      K.parchment(5);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.75)'; ctx.fillRect(-300, -300, W + 600, H + 600);
      K.ribbon('CRUSHING PRESSURE', 540, 320, eob(seg(lt, 0, 0.3)));
      K.figure({ x: 540, y: 1350, h: 420, role: 'guard' });
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'thud'); }

  // 5 · Titanium armor: 200 Feet limit
  { const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 960], note: 'depth limits on parchment scale', draw(lt, d, t) {
      K.parchment(19);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.6)'; ctx.fillRect(-300, -300, W + 600, H + 600);
      K.timeline(['SURFACE', '100 FT', '200 FT', 'CRUSH DEPTH'], 540, 900, 800, eio(seg(lt, 0, 0.8)), 3);
      K.slip('LIMIT: 200 FEET', 540, 320, eob(seg(lt, 0, 0.25)));
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop'); }

  // 6 · Sea Monsters: Ancient map sea serpents in dark waters
  { const st = cut(5);
    add({ id: 'S06', at: st, cam: [540, 960], note: 'ancient sea serpents on chart', draw(lt, d, t) {
      K.parchment(99);
      ctx.fillStyle = 'rgba(2, 6, 23, 0.85)'; ctx.fillRect(-300, -300, W + 600, H + 600);
      // Crimson monster eyes
      circle(380, 750, 32, '#DC2626'); circle(700, 750, 32, '#DC2626');
      K.slip('ABYSS PREDATORS', 540, 320, eob(seg(lt, 0, 0.25)));
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'thud'); }

  // 7 · Outro: The Atlantic Apartment
  { const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 960], note: 'parchment seal and closing question', draw(lt, d, t) {
      K.parchment(42);
      K.seal(540, 800, eob(seg(lt, 0.1, 0.5)), 'ATLANTIC');
      K.ribbon('WOULD YOU LIVE THERE?', 540, 320, eob(seg(lt, 0, 0.3)));
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop'); }

  return { S, CUES };
}
"""
with open(PROJ_DIR / "src/shots.js", "w", encoding="utf-8") as f:
    f.write(shots_js)

print("Paper Atlas project prepared at:", PROJ_DIR)
