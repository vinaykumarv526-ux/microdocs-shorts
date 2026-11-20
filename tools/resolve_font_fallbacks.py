import os, shutil, re
from pathlib import Path

ROOT = Path("lemo-opuscar").resolve()
f0 = ROOT / "core/fonts/f0.woff2"
if not f0.exists():
    print("Base font f0.woff2 not found!")
    exit(1)

styles_dir = ROOT / "styles"
count = 0
for style in styles_dir.iterdir():
    if not style.is_dir():
        continue
    fonts_dir = style / "demo/fonts"
    fonts_css = fonts_dir / "fonts.css"
    if fonts_css.exists():
        css = fonts_css.read_text(encoding="utf-8", errors="ignore")
        urls = re.findall(r'url\(["\']?([^"\'\)]+)["\']?\)', css)
        for u in urls:
            u_name = Path(u).name
            target = fonts_dir / u_name
            if not target.exists():
                shutil.copy2(f0, target)
                count += 1

print(f"Provided font fallbacks for {count} missing font references across styles!")
