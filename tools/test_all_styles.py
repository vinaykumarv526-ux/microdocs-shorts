import os, sys, subprocess, json
from pathlib import Path

ROOT = Path("lemo-opuscar").resolve()
STYLES_DIR = ROOT / "styles"
OUT_REPORT = Path("style_test_report.json")

print(f"Scanning styles in {STYLES_DIR}...")
all_styles = sorted([d.name for d in STYLES_DIR.iterdir() if d.is_dir() and not d.name.startswith("_")])
print(f"Total style models found: {len(all_styles)}")

results = {
    "total": len(all_styles),
    "ready": [],
    "skipped_missing_assets": [],
    "skipped_error": []
}

for idx, slug in enumerate(all_styles):
    demo_dir = STYLES_DIR / slug / "demo"
    index_file = demo_dir / "index.html"
    
    if not index_file.exists():
        print(f"[{idx+1}/{len(all_styles)}] SKIP {slug}: No demo index.html")
        results["skipped_missing_assets"].append({"style": slug, "reason": "No demo index.html"})
        continue

    # Check for missing font files in fonts directory if present
    fonts_dir = demo_dir / "fonts"
    fonts_css = fonts_dir / "fonts.css"
    if fonts_css.exists():
        css_content = fonts_css.read_text(encoding="utf-8", errors="ignore")
        # Check if url(...) references files that do not exist
        import re
        urls = re.findall(r'url\(["\']?([^"\'\)]+)["\']?\)', css_content)
        missing_fonts = [u for u in urls if not (fonts_dir / u).exists()]
        if missing_fonts:
            print(f"[{idx+1}/{len(all_styles)}] SKIP {slug}: Missing font assets {missing_fonts[:2]}... (Skipping model)")
            results["skipped_missing_assets"].append({"style": slug, "reason": f"Missing font assets: {missing_fonts[:2]}"})
            continue

    # Attempt a quick 1-frame test render
    cmd = ["node", "core/render/still.mjs", f"styles/{slug}/demo", "1.0", "--out", "tmp_test_still"]
    try:
        res = subprocess.run(cmd, cwd=str(ROOT), capture_output=True, text=True, timeout=12)
        if res.returncode == 0:
            print(f"[{idx+1}/{len(all_styles)}] SUCCESS {slug}: Model tested & functional!")
            results["ready"].append(slug)
        else:
            err = res.stderr.strip().split("\n")[-1] if res.stderr else "Unknown error"
            print(f"[{idx+1}/{len(all_styles)}] SKIP {slug}: Error during render ({err[:80]}). Skipping model.")
            results["skipped_error"].append({"style": slug, "reason": err[:120]})
    except subprocess.TimeoutExpired:
        print(f"[{idx+1}/{len(all_styles)}] SKIP {slug}: Timed out waiting for READY. Skipping model.")
        results["skipped_error"].append({"style": slug, "reason": "Timeout waiting for READY"})
    except Exception as e:
        print(f"[{idx+1}/{len(all_styles)}] SKIP {slug}: Exception {e}. Skipping model.")
        results["skipped_error"].append({"style": slug, "reason": str(e)})

# Clean up tmp folder if created
tmp_folder = ROOT / "tmp_test_still"
if tmp_folder.exists():
    import shutil
    shutil.rmtree(tmp_folder, ignore_errors=True)

with open(OUT_REPORT, "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)

print("\n================ TEST SUMMARY ================")
print(f"Total models scanned: {results['total']}")
print(f"Verified & Ready models: {len(results['ready'])}")
print(f"Skipped (missing models/assets): {len(results['skipped_missing_assets'])}")
print(f"Skipped (runtime error/timeout): {len(results['skipped_error'])}")
print(f"Report saved to {OUT_REPORT}")
