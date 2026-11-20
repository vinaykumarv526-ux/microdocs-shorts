import os, shutil, re
from pathlib import Path

ROOT = Path("lemo-opuscar").resolve()
f0 = ROOT / "core/fonts/f0.woff2"
styles_dir = ROOT / "styles"

count = 0
for style in styles_dir.iterdir():
    if not style.is_dir():
        continue
    demo = style / "demo"
    idx_file = demo / "index.html"
    if idx_file.exists():
        html = idx_file.read_text(encoding="utf-8", errors="ignore")
        urls = re.findall(r'url\(["\']?([^"\'\)]+)["\']?\)', html)
        for u in urls:
            if "/" in u:
                target = demo / u
            else:
                target = demo / "fonts" / u
            if not target.exists() and any(ext in target.name for ext in [".ttf", ".woff2", ".woff", ".otf"]):
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(f0, target)
                count += 1
                print(f"Fixed inline font for {style.name}: {target.name}")

print(f"Total inline font fallbacks provided: {count}")
