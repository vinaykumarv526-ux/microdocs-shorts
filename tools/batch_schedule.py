import os, sys, json, argparse, subprocess
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

STYLE_ROTATION = [
    "deep-dive",    # Zack D. Films 3D anatomy simulation
]

def get_next_slot(latest_str):
    if not latest_str:
        target = datetime.now(timezone.utc) + timedelta(days=1)
        hour = 16 if target.hour < 20 else 23
        return target.replace(hour=hour, minute=30, second=0, microsecond=0).strftime('%Y-%m-%dT%H:%M:%SZ')

    dt = datetime.fromisoformat(latest_str.replace('Z', '+00:00'))
    if dt.hour < 20:
        next_dt = dt.replace(hour=23, minute=30, second=0, microsecond=0)
    else:
        next_dt = (dt + timedelta(days=1)).replace(hour=16, minute=30, second=0, microsecond=0)
    return next_dt.strftime('%Y-%m-%dT%H:%M:%SZ')

def main():
    parser = argparse.ArgumentParser(description="Batch generate and schedule YouTube Shorts")
    parser.add_argument("--count", type=int, default=5, help="Number of videos to generate and schedule")
    args = parser.parse_args()

    # Pull latest from git to ensure queue is fresh
    try:
        subprocess.run(["git", "pull", "--rebase", "origin", "main"], check=False)
    except Exception as e:
        print(f"Git pull notice: {e}")

    if not QUEUE_FILE.exists():
        queue = []
    else:
        with open(QUEUE_FILE, "r", encoding="utf-8") as f:
            queue = json.load(f)

    now_utc = datetime.now(timezone.utc)
    print(f"Current UTC time: {now_utc.isoformat()}")

    # Find the latest scheduled slot time
    future_scheduled = [
        x for x in queue
        if x.get("publish_at") and datetime.fromisoformat(x["publish_at"].replace("Z", "+00:00")) > now_utc
    ]
    latest_slot = None
    if future_scheduled:
        latest_slot = max(x["publish_at"] for x in future_scheduled)
    elif queue:
        scheduled_all = [x["publish_at"] for x in queue if x.get("publish_at")]
        if scheduled_all:
            latest_slot = max(scheduled_all)

    print(f"Latest scheduled slot in queue: {latest_slot or 'None'}")
    print(f"Target count to produce and schedule: {args.count}")

    produced = 0
    while produced < args.count:
        existing_ids = {x["id"] for x in queue}
        available_topics = [t for t in TOPICS if t["id"] not in existing_ids]

        if not available_topics:
            print("All catalog topics have been produced!")
            break

        target_slot = get_next_slot(latest_slot)
        next_topic = available_topics[0]
        assigned_style = next_topic.get("style", STYLE_ROTATION[len(queue) % len(STYLE_ROTATION)])

        print(f"\n==========================================")
        print(f"[{produced + 1}/{args.count}] INITIATING VIDEO PRODUCTION")
        print(f"Topic: {next_topic['title']} (ID: {next_topic['id']})")
        print(f"Visual Style: {assigned_style.upper()}")
        print(f"Target YouTube Schedule Slot: {target_slot}")
        print(f"==========================================\n")

        try:
            # 1. Create project files
            project_dir = create_project_for_topic(next_topic, style=assigned_style)

            # 2. Render MP4 video
            video_file = render_project(project_dir, next_topic["id"])

            # 3. Locate or generate thumbnail
            thumb_file = project_dir / "thumbnail.jpg"
            if not thumb_file.exists():
                try:
                    from generate_thumbnail import create_thumbnail_for_project
                    thumb_file = create_thumbnail_for_project(project_dir, next_topic["id"], video_file)
                except Exception as e:
                    print(f"Thumbnail generation warning: {e}")

            # 4. Upload and schedule on YouTube
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

            # 5. Record in queue.json
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

            latest_slot = target_slot
            produced += 1
            print(f"\nSUCCESS! [{produced}/{args.count}] Scheduled on YouTube: https://youtu.be/{video_id} at {target_slot}\n")

        except Exception as e:
            print(f"Error during production of '{next_topic['id']}': {e}")
            import traceback
            traceback.print_exc()
            # If upload fails due to quota or other fatal issue, break to avoid wasting compute
            if "quota" in str(e).lower():
                print("YouTube API daily quota limit reached. Stopping batch.")
                break
            break

    print(f"\nBatch completed. Total produced and scheduled in this run: {produced}")

    # Commit and push updated queue
    if produced > 0:
        try:
            subprocess.run(["git", "add", "queue.json"], check=False)
            subprocess.run(["git", "commit", "-m", f"Batch-scheduled {produced} shorts on YouTube [skip ci]"], check=False)
            subprocess.run(["git", "pull", "--rebase", "origin", "main"], check=False)
            subprocess.run(["git", "push", "origin", "main"], check=False)
            print("Synced updated queue.json to GitHub repository.")
        except Exception as e:
            print(f"Notice during git sync: {e}")

if __name__ == "__main__":
    main()
