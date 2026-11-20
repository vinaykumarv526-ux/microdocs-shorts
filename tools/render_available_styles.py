import os, sys, subprocess, json
from pathlib import Path

ROOT = Path("lemo-opuscar").resolve()
OUT_DIR = Path("test for good style").resolve()
OUT_DIR.mkdir(parents=True, exist_ok=True)

# List of confirmed functional styles from test_all_styles_v2
STYLES_QUEUE = [
    ("blueprint", "09_Blueprint_Technical.mp4"),
    ("hologram-hud", "10_Hologram_HUD_SciFi.mp4"),
    ("ascii-crt", "11_ASCII_CRT_Terminal.mp4"),
    ("rubber-hose", "12_Rubber_Hose_1930s.mp4"),
    ("lowpoly-island", "13_LowPoly_3D_Island.mp4"),
    ("art-deco", "14_Art_Deco_1920s.mp4"),
    ("ukiyoe", "15_Ukiyoe_Japanese.mp4"),
    ("ink-wash", "16_Ink_Wash_Painting.mp4"),
    ("backrooms", "17_Backrooms_VHS.mp4"),
    ("cel-anime-80s", "18_Cel_Anime_80s.mp4"),
    ("crayon-book", "19_Crayon_Picture_Book.mp4"),
    ("dark-keynote", "20_Dark_Tech_Keynote.mp4"),
    ("dataviz", "21_Data_Viz_Motion.mp4"),
    ("hd-2d", "22_HD_2D_Pixel.mp4"),
    ("microgame", "23_Microgame_Frenzy.mp4"),
    ("midcentury-toon", "24_Midcentury_50s_Toon.mp4"),
    ("papercut-red", "25_Papercut_Red_Art.mp4"),
    ("risograph", "26_Risograph_Print.mp4"),
    ("scifi-toon", "27_SciFi_Sitcom_Toon.mp4"),
    ("shadow-puppet", "28_Shadow_Puppetry.mp4"),
    ("silent-film", "29_Silent_Film_1920s.mp4"),
    ("silkscreen-poster", "30_Silkscreen_Poster.mp4"),
    ("swiss-motion", "31_Swiss_Bauhaus_Motion.mp4"),
    ("woodcut", "32_Woodcut_Relief_Print.mp4")
]

print(f"Starting batch video render for {len(STYLES_QUEUE)} available styles...")

rendered = []
skipped = []

for idx, (slug, filename) in enumerate(STYLES_QUEUE):
    target_mp4 = OUT_DIR / filename
    if target_mp4.exists() and target_mp4.stat().st_size > 10000:
        print(f"[{idx+1}/{len(STYLES_QUEUE)}] ALREADY EXISTS: {filename}")
        rendered.append(filename)
        continue

    print(f"\n[{idx+1}/{len(STYLES_QUEUE)}] RENDERING STYLE: {slug} -> {filename}...")
    cmd = [
        "node", "core/render/video.mjs",
        f"styles/{slug}/demo",
        "--out", str(target_mp4),
        "--fps", "24",
        "--workers", "3"
    ]
    try:
        res = subprocess.run(cmd, cwd=str(ROOT), capture_output=True, text=True, timeout=120)
        if res.returncode == 0 and target_mp4.exists():
            size_mb = target_mp4.stat().st_size / (1024 * 1024)
            print(f"  -> SUCCESS: Rendered {filename} ({size_mb:.2f} MB)")
            rendered.append(filename)
        else:
            err = res.stderr.strip().split("\n")[-1] if res.stderr else "Unknown error"
            print(f"  -> [SKIP] Style '{slug}' render failed ({err[:80]}). Skipping model...")
            skipped.append((slug, err[:80]))
    except subprocess.TimeoutExpired:
        print(f"  -> [SKIP] Style '{slug}' timed out. Skipping model...")
        skipped.append((slug, "Timeout"))
    except Exception as e:
        print(f"  -> [SKIP] Style '{slug}' exception ({e}). Skipping model...")
        skipped.append((slug, str(e)))

print("\n==========================================")
print(f"Total Successfully Rendered in this batch: {len(rendered)}")
print(f"Total Skipped: {len(skipped)}")
print(f"All outputs in: {OUT_DIR}")
print("==========================================\n")
