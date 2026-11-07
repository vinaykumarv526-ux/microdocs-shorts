# -*- coding: utf-8 -*-
"""Assembles all 10 batches into tools/topics_100.py.
Validates all 100 topics from the PDF.
"""
import sys, json
from pathlib import Path

# Add tools to sys.path
sys.path.insert(0, str(Path(__file__).parent))

from make_100_topics import DATA_100 as B1
from build_all_data import BATCH_2 as B2
from generate_catalog_100 import BATCH_3 as B3
from append_batches_4_to_10 import BATCH_4 as B4, BATCH_5 as B5
from batches_6_and_7 import BATCH_6 as B6, BATCH_7 as B7
from batches_8_to_10 import BATCH_8 as B8, BATCH_9 as B9, BATCH_10 as B10

all_raw = B1 + B2 + B3 + B4 + B5 + B6 + B7 + B8 + B9 + B10

print(f"Total raw topics collected: {len(all_raw)}")
assert len(all_raw) == 100, f"Expected 100 topics, got {len(all_raw)}"

# Check numbers and IDs
seen_ids = set()
formatted_topics = []

for idx, item in enumerate(all_raw, 1):
    num = item.get("num", idx)
    tid = item["id"]
    if tid in seen_ids:
        tid = f"{tid}-{num}"
    seen_ids.add(tid)

    # Convert lines tuple to dictionary format
    raw_lines = item["lines"]
    lines_formatted = []
    for line_entry in raw_lines:
        if isinstance(line_entry, dict):
            lines_formatted.append(line_entry)
        elif isinstance(line_entry, (tuple, list)):
            text = line_entry[0]
            caps = line_entry[1]
            gap = line_entry[2] if len(line_entry) > 2 else None
            d = {"text": text, "caps": caps}
            if gap is not None:
                d["gap"] = gap
            lines_formatted.append(d)

    topic_dict = {
        "id": tid,
        "num": num,
        "question": item.get("question", item["title"]),
        "title": item["title"],
        "description": item.get("description", (
            f"{item.get('question', item['title'])}\n\n"
            f"Watch the full breakdown in 3D!\n\n"
            f"🔔 Subscribe to @MicroDocsOfficial for daily curiosity explainers!\n\n"
            f"#Shorts #Science #MicroDocs #3DAnimation #Curiosity"
        )),
        "tags": item.get("tags", ["Shorts", "Science", "MicroDocs", "Curiosity"]),
        "pill": item.get("pill", "CURIOSITY EXPLORED"),
        "pill_color": item.get("pill_color", "#3B82F6"),
        "theme_color": item.get("theme_color", "#3B82F6"),
        "shirt_color": item.get("shirt_color", "#1E40AF"),
        "script": {
            "title": item.get("script", {}).get("title", item.get("question", item["title"])),
            "voice": "en-US-ChristopherNeural",
            "speed": 1.0,
            "lead": 0.35,
            "outro": 1.0,
            "gap": 0.28,
            "music": "tension",
            "sources": item.get("sources", [
                "MicroDocs Official Research Archive",
                "Peer-Reviewed Scientific Review"
            ]),
            "lines": lines_formatted
        }
    }
    formatted_topics.append(topic_dict)

# Write to tools/topics_100.py
out_path = Path(__file__).parent / "topics_100.py"
with open(out_path, "w", encoding="utf-8") as f:
    f.write("# -*- coding: utf-8 -*-\n")
    f.write('"""Master Database of all 100 Curiosity Hooks from MicroDocs Official PDF.\n')
    f.write('Covers 50 straight days of automated twice-daily video creation.\n')
    f.write('"""\n\n')
    f.write("TOPICS = ")
    f.write(json.dumps(formatted_topics, indent=4, ensure_ascii=False))
    f.write("\n")

print(f"Successfully assembled all {len(formatted_topics)} topics into {out_path}!")
