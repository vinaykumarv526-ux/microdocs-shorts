"""Autonomously executed by GitHub Actions twice daily (11:30 AM EST and 6:30 PM EST).
Ensures YouTube is always ahead scheduled for 2 days (rolling 48h buffer / 4 future scheduled slots).
Creates the video project, renders it headlessly with Three.js WebGL & FFmpeg,
and uploads & schedules it on YouTube using OAuth refresh token credentials.
"""
import os, sys, json
from datetime import datetime, timezone, timedelta
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

sys.path.insert(0, str(Path(__file__).parent))
from youtube_upload import upload_video
from catalog import TOPICS
from generate_topic_project import create_project_for_topic, render_project

QUEUE_FILE = Path("queue.json")
MIN_FUTURE_BUFFER = 4  # 4 slots = 2 full days ahead (morning + evening)

# 2 Proven, Highly-Reliable Flagship Styles (3D Deep Dive & 2D Inside Out)
STYLE_ROTATION = [
    "deep-dive",    # Zack D. Films 3D anatomy simulation (100% stable)
    "inside-out",   # Flat 2D X-Ray medical explainer (100% stable & fast)
]

def get_next_slot(latest_str):
    if not latest_str:
        # Schedule 48 hours from right now
        target = datetime.now(timezone.utc) + timedelta(days=2)
        hour = 16 if target.hour < 20 else 23
        return target.replace(hour=hour, minute=30, second=0, microsecond=0).strftime('%Y-%m-%dT%H:%M:%SZ')

    dt = datetime.fromisoformat(latest_str.replace('Z', '+00:00'))
    if dt.hour < 20:
        # If at 16:30 (11:30 AM EST), next slot is 23:30 (6:30 PM EST) same day
        next_dt = dt.replace(hour=23, minute=30, second=0, microsecond=0)
    else:
        # If at 23:30, next slot is 16:30 next day
        next_dt = (dt + timedelta(days=1)).replace(hour=16, minute=30, second=0, microsecond=0)
    return next_dt.strftime('%Y-%m-%dT%H:%M:%SZ')

def main():
    if not QUEUE_FILE.exists():
        print("No queue.json found. Creating new queue...")
        queue = []
    else:
        with open(QUEUE_FILE, "r", encoding="utf-8") as f:
            queue = json.load(f)

    now_utc = datetime.now(timezone.utc)
    print(f"Current UTC time: {now_utc.isoformat()}")

    # 1. Process any manually queued "ready" items first
    ready_item = next((x for x in queue if x.get("status") == "ready"), None)
    if ready_item:
        print(f"Found ready item: {ready_item['id']} ('{ready_item['title']}')")
        video_path = Path(ready_item["video_file"])
        if not video_path.exists():
            folder = Path(ready_item["folder"])
            render_project(folder, ready_item["id"])
        
        thumb_file = folder / "thumbnail.jpg"
        if not thumb_file.exists() and video_path.exists():
            try:
                from generate_thumbnail import create_thumbnail_for_project
                thumb_file = create_thumbnail_for_project(folder, ready_item["id"], video_path)
            except Exception as e:
                print(f"Thumbnail generation warning: {e}")

        publish_at = ready_item.get("publish_at")
        video_id = upload_video(
            file_path=str(video_path),
            title=ready_item["title"],
            description=ready_item["description"],
            tags=ready_item.get("tags", []),
            privacy="private" if publish_at else "public",
            publish_at=publish_at,
            thumbnail_path=str(thumb_file) if thumb_file and thumb_file.exists() else None
        )
        ready_item["status"] = "scheduled" if publish_at else "uploaded"
        ready_item["uploaded_at"] = datetime.now(timezone.utc).isoformat()
        ready_item["youtube_url"] = f"https://youtu.be/{video_id}"
        if thumb_file and thumb_file.exists():
            ready_item["thumbnail"] = f"videos/{ready_item['id']}/thumbnail.jpg"
        with open(QUEUE_FILE, "w", encoding="utf-8") as f:
            json.dump(queue, f, indent=2)
        print(f"Successfully processed ready item -> https://youtu.be/{video_id}")

    # 2. Check future scheduled items to ensure 2-day buffer
    future_scheduled = [
        x for x in queue
        if x.get("publish_at") and datetime.fromisoformat(x["publish_at"].replace("Z", "+00:00")) > now_utc
    ]
    print(f"Future scheduled videos count: {len(future_scheduled)}")
    for item in future_scheduled:
        print(f"  • {item['publish_at']}: {item['title']} ({item.get('youtube_url', 'N/A')})")

    # Find the latest scheduled slot time
    latest_slot = None
    if future_scheduled:
        latest_slot = max(x["publish_at"] for x in future_scheduled)
    elif queue:
        scheduled_all = [x["publish_at"] for x in queue if x.get("publish_at")]
        if scheduled_all:
            latest_slot = max(scheduled_all)

    # If future buffer is less than required (or during twice-daily schedule run)
    # create the next video and schedule it to keep the 2-day horizon
    if len(future_scheduled) < MIN_FUTURE_BUFFER or True:
        existing_ids = {x["id"] for x in queue}
        available_topics = [t for t in TOPICS if t["id"] not in existing_ids]

        if not available_topics:
            print("All catalog topics have been produced! Please add more topics to catalog.py.")
            return

        target_slot = get_next_slot(latest_slot)
        retry_count = 0
        for next_topic in available_topics:
            assigned_style = next_topic.get("style", STYLE_ROTATION[len(queue) % len(STYLE_ROTATION)])
            print(f"\n==========================================")
            print(f"AUTONOMOUS GENERATION INITIATED ON GIT SERVER")
            print(f"Topic: {next_topic['title']} (ID: {next_topic['id']})")
            print(f"Visual Style: {assigned_style.upper()} (Daily Rotation)")
            print(f"Scheduling Target Slot: {target_slot} (Rolling 2-Day Buffer)")
            print(f"==========================================\n")

            try:
                # Create project files with assigned rotating style
                project_dir = create_project_for_topic(next_topic, style=assigned_style)

                # Render video
                video_file = render_project(project_dir, next_topic["id"])

                # Locate or generate thumbnail
                thumb_file = project_dir / "thumbnail.jpg"
                if not thumb_file.exists():
                    try:
                        from generate_thumbnail import create_thumbnail_for_project
                        thumb_file = create_thumbnail_for_project(project_dir, next_topic["id"], video_file)
                    except Exception as e:
                        print(f"Thumbnail generation warning: {e}")

                # Upload and schedule on YouTube
                print(f"Uploading to YouTube and scheduling for {target_slot}...")
                video_id = upload_video(
                    file_path=str(video_file),
                    title=next_topic["title"],
                    description=next_topic["description"],
                    tags=next_topic["tags"],
                    privacy="private",
                    publish_at=target_slot,
                    thumbnail_path=str(thumb_file) if thumb_file and thumb_file.exists() else None
                )

                # Record in queue.json with style tag
                queue_entry = {
                    "id": next_topic["id"],
                    "style": assigned_style,
                    "folder": f"videos/{next_topic['id']}",
                    "video_file": f"videos/{next_topic['id']}/renders/{next_topic['id']}.mp4",
                    "thumbnail": f"videos/{next_topic['id']}/thumbnail.jpg" if thumb_file and thumb_file.exists() else None,
                    "title": next_topic["title"],
                    "description": next_topic["description"],
                    "tags": next_topic["tags"],
                    "status": "scheduled",
                    "youtube_url": f"https://youtu.be/{video_id}",
                    "publish_at": target_slot,
                    "uploaded_at": datetime.now(timezone.utc).isoformat()
                }
                queue.append(queue_entry)

                with open(QUEUE_FILE, "w", encoding="utf-8") as f:
                    json.dump(queue, f, indent=2)

                print(f"\nSUCCESS! Scheduled video on YouTube: https://youtu.be/{video_id} at {target_slot}\n")
                break # Successfully scheduled next slot
            except Exception as e:
                print(f"[SKIP] Model/topic '{next_topic['id']}' not available or failed ({e}). Skipping to next...")
                retry_count += 1
                if retry_count >= 2:
                    print("Reached maximum retry attempts for this scheduled run. Exiting to avoid timeout.")
                    raise e
                continue

if __name__ == "__main__":
    main()
