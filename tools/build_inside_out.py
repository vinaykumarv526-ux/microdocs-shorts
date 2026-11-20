import shutil, json
from pathlib import Path

SKILL_DIR = Path(r"C:\Users\vinay\.gemini\config\skills\faceless-shorts\styles\inside-out\example")
PROJ_DIR = Path("test_build/02_inside_out")

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
import sys
sys.path.insert(0, str(Path(__file__).parent))
from topics_100 import TOPICS
topic = next(t for t in TOPICS if t['id'] == 'breathe-underwater')
with open(PROJ_DIR / "script.json", "w", encoding="utf-8") as f:
    json.dump(topic["script"], f, indent=2)

# Write tailored shots.js for Inside Out 2D
shots_js = """// INSIDE OUT 2D: WHAT IF HUMANS COULD BREATHE UNDERWATER?
import { ctx, C, W, H, clamp, lerp, seg, eo, eio, eob, rnd, bigText, rr, circle, ell, line, fillAll } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);

  // ── 1 · HOOK: Human submerged, bubbles floating ──────────────────────────
  {
    const st = cut(0);
    add({ id: 'S01', at: st, cam: [540, 820], note: 'diver in water, bubbles',
      draw(lt) {
        fillAll('#1E3A8A');
        // Undersea water caustics
        ctx.fillStyle = '#06B6D4';
        for (let i = 0; i < 15; i++) {
          const bx = (i * 74 + lt * 25) % 1080;
          const by = (i * 120 + Math.sin(lt * 3 + i) * 60) % 1920;
          circle(bx, by, 12 + (i % 8) * 4, 'rgba(79, 209, 232, 0.4)');
        }
        K.man({ x: 540, y: 1100, s: 1.5, mouth: 'o', eyes: 'wide', brow: 1 });
        bigText('BREATHE UNDERWATER?', 540, 420, 84, '#FFD43B', 0, eob(seg(lt, 0.1, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'bubbles', { dur: 2.0 });
  }

  // ── 2 · X-RAY: Gills & Lungs glowing cyan ────────────────────────────────
  {
    const st = cut(1);
    add({ id: 'S02', at: st, cam: [540, 950], zoom: 0.25, note: 'xray lungs as gills',
      draw(lt, d, t) {
        K.xray(t);
        K.man({ x: 540, y: 1120, s: 1.5, xray: true, mouth: 'smile', eyes: 'n', brow: 0 });
        // Glowing gill slits along the neck and ribs
        ctx.save();
        ctx.strokeStyle = '#4FD1E8'; ctx.lineWidth = 14; ctx.lineCap = 'round';
        for (let i = 0; i < 4; i++) {
          const gy = 680 + i * 35 + Math.sin(lt * 6 + i) * 6;
          line(460, gy, 500, gy + 15);
          line(620, gy, 580, gy + 15);
        }
        ctx.restore();
        bigText('70% OF EARTH', 540, 360, 96, '#4FD1E8', 0, eob(seg(lt, 0.2, 0.6)));
      } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.7 });
  }

  // ── 3 · UNDERWATER CITIES: Domes & Submerged tunnels ─────────────────────
  {
    const st = cut(2);
    add({ id: 'S03', at: st, cam: [540, 960], note: 'bioluminescent city domes',
      draw(lt, d, t) {
        fillAll('#0F172A');
        // Undersea city domes
        circle(320, 1100, 260, 'rgba(6, 182, 212, 0.3)');
        circle(760, 1150, 220, 'rgba(59, 130, 246, 0.3)');
        circle(540, 950, 320, 'rgba(16, 185, 129, 0.3)');
        // Dome frames
        ctx.strokeStyle = '#4FD1E8'; ctx.lineWidth = 12;
        ctx.beginPath(); ctx.arc(540, 950, 320, Math.PI, 0); ctx.stroke();
        ctx.beginPath(); ctx.arc(320, 1100, 260, Math.PI, 0); ctx.stroke();
        ctx.beginPath(); ctx.arc(760, 1150, 220, Math.PI, 0); ctx.stroke();
        // Bioluminescent windows
        for (let i = 0; i < 20; i++) {
          const wx = 380 + (i % 6) * 60;
          const wy = 800 + Math.floor(i / 6) * 70;
          rr(wx, wy, 35, 45, 8); ctx.fillStyle = '#FFD43B'; ctx.fill();
        }
        K.man({ x: 540, y: 1450, s: 1.2, mouth: 'smile', eyes: 'n' });
      } });
    cue(st, 'whoosh'); cue(st + 0.4, 'magic', { gain: 0.8 });
  }

  // ── 4 · HYDROSTATIC PRESSURE: Crushing red meter ─────────────────────────
  {
    const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 900], note: 'pressure gauge in danger zone',
      draw(lt, d, t) {
        fillAll('#1E1B4B');
        K.man({ x: 540, y: 1200, s: 1.4, mouth: 'o', eyes: 'wide', brow: 1 });
        K.stopwatch(540, 600, 1.4, Math.min(Math.PI * 1.5, lt * 3));
        bigText('CRUSHING PRESSURE!', 540, 320, 80, '#D62839', 0, eob(seg(lt, 0.1, 0.5)));
        K.shockLines(540, 600, 400, clamp(lt * 2));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'danger', { gain: 0.9 });
  }

  // ── 5 · ORGANS CRUSHED: Ribcage stress X-ray ────────────────────────────
  {
    const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 950], zoom: 0.2, note: 'ribcage under stress, boiling gases',
      draw(lt, d, t) {
        K.xray(t);
        const shake = Math.sin(lt * 50) * 8;
        K.man({ x: 540 + shake, y: 1100, s: 1.5, xray: true, mouth: 'o', eyes: 'wide', brow: 1 });
        K.heart(540 + shake, 780, 1.6, Math.sin(lt * 12));
        bigText('DEPTH > 200 FT', 540, 360, 92, '#D62839', -0.05, eob(seg(lt, 0.1, 0.45)));
      } });
    cue(st, 'whoosh'); cue(st + 0.4, 'heartbeat');
  }

  // ── 6 · PREDATORS IN TRENCHES: Glowing monster eyes in blackness ─────────
  {
    const st = cut(5);
    add({ id: 'S06', at: st, cam: [540, 920], note: 'giant eyes in total darkness',
      draw(lt, d, t) {
        fillAll('#030712');
        // Giant terrifying red predator eyes in deep trench
        const eyePulse = 1 + Math.sin(lt * 4) * 0.15;
        circle(340, 750, 45 * eyePulse, '#EF4444');
        circle(340, 750, 18, '#7F1D1D');
        circle(740, 750, 45 * eyePulse, '#EF4444');
        circle(740, 750, 18, '#7F1D1D');
        // Tooth outline
        ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 10; ctx.lineCap = 'round';
        for (let i = 0; i < 6; i++) {
          const tx = 420 + i * 50;
          line(tx, 900, tx + 25, 960);
          line(tx + 25, 960, tx + 50, 900);
        }
        K.man({ x: 540, y: 1450, s: 1.1, mouth: 'o', eyes: 'wide', brow: 1 });
        bigText('DEEP ABYSS PREDATORS', 540, 360, 72, '#EF4444', 0, eob(seg(lt, 0.1, 0.4)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'creak', { gain: 0.8 });
  }

  // ── 7 · OUTRO: Would you trade dry land? ─────────────────────────────────
  {
    const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 850], note: 'hero smirks to camera',
      draw(lt) {
        fillAll('#0E7490');
        K.man({ x: 540, y: 1100, s: 1.5, mouth: 'smile', eyes: 'n', brow: 0 });
        bigText('WOULD YOU LIVE HERE?', 540, 380, 78, '#FFD43B', 0, eob(seg(lt, 0.1, 0.45)));
      } });
    cue(st, 'whoosh'); cue(st + 0.3, 'chime', { gain: 0.7 });
  }

  return { S, CUES };
}
"""
with open(PROJ_DIR / "src/shots.js", "w", encoding="utf-8") as f:
    f.write(shots_js)

print("Inside Out 2D project prepared successfully at:", PROJ_DIR)
