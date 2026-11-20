import shutil, json, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from topics_100 import TOPICS

SKILL_DIR = Path(r"C:\Users\vinay\.gemini\config\skills\faceless-shorts\styles\tall-tale\example")
PROJ_DIR = Path("test_build/06_tall_tale")

shutil.rmtree(PROJ_DIR, ignore_errors=True)
PROJ_DIR.mkdir(parents=True, exist_ok=True)

# Copy example files
for item in ["index.html", "src", "vendor", "fonts", "tools"]:
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

print("Tall Tale project prepared at:", PROJ_DIR)
