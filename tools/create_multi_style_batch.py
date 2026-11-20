import os, sys, json, subprocess
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

sys.path.insert(0, str(Path(__file__).parent))
from generate_topic_project import create_project_for_topic, render_project

TOPIC_BASE = {
    "title": "How Underground Rocks Turn Into Fuel! 🛢️ #Shorts",
    "description": "How does thick black crude oil trapped inside underground rock get turned into gasoline, jet fuel, and diesel? Here is how fractional distillation works! #Science #Refinery #Engineering #Shorts",
    "pill": "PETROLEUM SCIENCE",
    "pill_color": "#F59E0B",
    "theme_color": "#10B981",
    "shirt_color": "#2563EB",
    "tags": ["CrudeOil", "Petroleum", "Science", "Refining", "Distillation", "Engineering", "Shorts"],
    "script": {
        "lead": 0.35,
        "gap": 0.28,
        "outro": 1.0,
        "lines": [
            {
                "text": "Did you know that black sludge trapped inside rocks powers the modern world?",
                "caps": "SLUDGE INSIDE *ROCKS | POWERS THE *WORLD"
            },
            {
                "text": "Millions of years ago, prehistoric plankton was crushed under extreme heat and pressure.",
                "caps": "CRUSHED BY *HEAT | AND *PRESSURE"
            },
            {
                "text": "It transformed into crude petroleum, soaked deep inside porous reservoir rocks.",
                "caps": "CRUDE *PETROLEUM | INSIDE *ROCKS"
            },
            {
                "text": "Massive drills pump this raw oil into a giant fractional distillation tower.",
                "caps": "PUMPED INTO A *TOWER | AT *HIGH HEAT"
            },
            {
                "text": "The crude is boiled over seven hundred degrees, separating vapors by boiling point.",
                "caps": "BOILED TO *700 DEGREES | VAPORS *SEPARATE"
            },
            {
                "text": "Lighter vapors condense into gasoline and jet fuel, while diesel settles below.",
                "caps": "GASOLINE AND *JET FUEL | DIESEL *BELOW"
            },
            {
                "text": "The heaviest residue at the bottom becomes asphalt to pave our highways!",
                "caps": "HEAVIEST *RESIDUE | BECOMES *ASPHALT"
            }
        ]
    }
}

STYLES = [
    ("deep-dive", "3D Zack D. Films Simulation"),
    ("inside-out", "2D Flat Cutaway Explainer"),
    ("tall-tale", "3D Diorama + 2D Toons"),
    ("stick-story", "2D Stick Figure Survival Cards"),
    ("night-file", "3D Mystery Dossier"),
    ("paper-atlas", "2D Cut-Paper Historical Map")
]

def main():
    print(f"Creating videos across all 6 styles for topic: '{TOPIC_BASE['title']}'\n")

    results = []
    for style_id, style_name in STYLES:
        topic_copy = dict(TOPIC_BASE)
        topic_copy["id"] = f"crude-oil-{style_id.replace('_', '-')}"
        
        print(f"\n{'='*60}")
        print(f"PRODUCING STYLE: {style_name.upper()} ({style_id})")
        print(f"Target folder: videos/{topic_copy['id']}")
        print(f"{'='*60}\n")
        
        try:
            # 1. Create project
            project_dir = create_project_for_topic(topic_copy, style=style_id)
            
            # 2. Render MP4
            video_file = render_project(project_dir, topic_copy["id"])
            print(f"SUCCESS: Rendered {style_name} -> {video_file}")
            results.append((style_id, style_name, str(video_file), "SUCCESS"))
        except Exception as e:
            print(f"ERROR rendering {style_name} ({style_id}): {e}")
            import traceback
            traceback.print_exc()
            results.append((style_id, style_name, None, f"FAILED: {e}"))

    print("\n" + "="*70)
    print("FINAL SUMMARY - VIDEO CREATION OF EACH TYPE:")
    print("="*70)
    for style_id, name, path, status in results:
        print(f"• {name:<35} [{style_id:<12}]: {status} {('-> ' + path) if path else ''}")

if __name__ == "__main__":
    main()
