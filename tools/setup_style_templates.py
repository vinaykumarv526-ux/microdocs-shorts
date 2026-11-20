import os, shutil
from pathlib import Path

SKILL_STYLES = Path("C:/Users/vinay/.gemini/config/skills/faceless-shorts/styles").resolve()
OPUSCAR_STYLES = Path("lemo-opuscar/styles").resolve()
DEST_DIR = Path(".").resolve()

MAPPINGS = [
    ("inside-out", "template_inside_out", SKILL_STYLES / "inside-out/example"),
    ("night-file", "template_night_file", SKILL_STYLES / "night-file/example"),
    ("stick-story", "template_stick_story", SKILL_STYLES / "stick-story/example"),
    ("paper-atlas", "template_paper_atlas", SKILL_STYLES / "paper-atlas/example"),
    ("tall-tale", "template_tall_tale", SKILL_STYLES / "tall-tale/example"),
    ("pixel-rpg", "template_pixel_rpg", OPUSCAR_STYLES / "pixel-rpg/demo")
]

for name, target_name, src in MAPPINGS:
    dst = DEST_DIR / target_name
    if not dst.exists() and src.exists():
        print(f"Copying template for {name} from {src} to {dst}...")
        dst.mkdir(parents=True, exist_ok=True)
        for item in src.iterdir():
            if item.name in ["renders", "review", ".git", "node_modules", "__pycache__"]:
                continue
            t = dst / item.name
            if item.is_dir():
                shutil.copytree(item, t, dirs_exist_ok=True)
            else:
                shutil.copy2(item, t)
        print(f"  -> Created {target_name} successfully.")
    elif dst.exists():
        print(f"{target_name} already exists.")
    else:
        print(f"Warning: source {src} not found.")

print("All templates ready!")
