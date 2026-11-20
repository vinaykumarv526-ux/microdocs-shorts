import os, sys, subprocess, json
from pathlib import Path

ROOT = Path("lemo-opuscar").resolve()
STYLES_DIR = ROOT / "styles"
OUT_REPORT = Path("style_test_report_v2.json")

print(f"Scanning styles in {STYLES_DIR} with resolved fonts...")
all_styles = sorted([d.name for d in STYLES_DIR.iterdir() if d.is_dir() and not d.name.startswith("_")])
print(f"Total style models found: {len(all_styles)}")

results = {
    "total": len(all_styles),
    "ready": [],
    "skipped_error": []
}

for idx, slug in enumerate(all_styles):
    demo_dir = STYLES_DIR / slug / "demo"
    index_file = demo_dir / "index.html"
    
    if not index_file.exists():
        print(f"[{idx+1}/{len(all_styles)}] SKIP {slug}: No demo index.html")
        results["skipped_error"].append({"style": slug, "reason": "No demo index.html"})
        continue

    # Attempt a quick 1-frame test render
    cmd = ["node", "core/render/still.mjs", f"styles/{slug}/demo", "1.0"]
    try:
        res = subprocess.run(cmd, cwd=str(ROOT), capture_output=True, text=True, timeout=8)
        if res.returncode == 0:
            print(f"[{idx+1}/{len(all_styles)}] SUCCESS {slug}: Model tested & functional!")
            results["ready"].append(slug)
        else:
            err = res.stderr.strip().split("\n")[-1] if res.stderr else "Unknown error"
            print(f"[{idx+1}/{len(all_styles)}] SKIP {slug}: {err[:80]}")
            results["skipped_error"].append({"style": slug, "reason": err[:120]})
    except subprocess.TimeoutExpired:
        print(f"[{idx+1}/{len(all_styles)}] SKIP {slug}: Timed out")
        results["skipped_error"].append({"style": slug, "reason": "Timeout"})
    except Exception as e:
        print(f"[{idx+1}/{len(all_styles)}] SKIP {slug}: Exception {e}")
        results["skipped_error"].append({"style": slug, "reason": str(e)})

with open(OUT_REPORT, "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)

print("\n================ TEST SUMMARY ================")
print(f"Total models scanned: {results['total']}")
print(f"Verified & Ready models: {len(results['ready'])}")
print(f"Skipped models: {len(results['skipped_error'])}")
print(f"Report saved to {OUT_REPORT}")
