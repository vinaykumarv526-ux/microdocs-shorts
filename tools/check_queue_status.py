import json, sys
from pathlib import Path
from datetime import datetime, timezone

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

q = json.load(open("queue.json", encoding="utf-8"))
now = datetime.now(timezone.utc)

print(f"Total videos in queue: {len(q)}")
print(f"Current UTC time: {now.strftime('%Y-%m-%d %H:%M:%SZ')}\n")

print(f"{'STATUS':<10} | {'PUBLISH AT (UTC)':<20} | {'STYLE':<12} | {'YOUTUBE URL':<28} | {'TITLE'}")
print("-" * 115)

for item in q[-12:]:
    status = item.get("status", "unknown")
    pub = item.get("publish_at", item.get("uploaded_at", "N/A"))
    style = item.get("style", "deep-dive")
    url = item.get("youtube_url", "N/A")
    title = item.get("title", "")[:40]
    print(f"{status:<10} | {pub:<20} | {style:<12} | {url:<28} | {title}")
