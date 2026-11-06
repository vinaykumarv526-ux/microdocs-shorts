"""Job runner called by GitHub Actions twice daily.
Finds the next video in queue.json, uploads it to YouTube, and marks it as uploaded.
"""
import os, sys, json, subprocess
from datetime import datetime, timezone
from pathlib import Path
from youtube_upload import upload_video

QUEUE_FILE = Path("queue.json")

def main():
    if not QUEUE_FILE.exists():
        print("No queue.json found.")
        sys.exit(1)

    with open(QUEUE_FILE, "r", encoding="utf-8") as f:
        queue = json.load(f)

    item = next((x for x in queue if x.get("status") == "ready"), None)
    if not item:
        print("Queue is empty or all videos have been uploaded!")
        print("Please add more items to queue.json.")
        sys.exit(0)

    print(f"Processing scheduled item: {item['id']} ('{item['title']}')")

    video_path = Path(item["video_file"])
    # If video file doesn't exist yet, render it
    if not video_path.exists():
        folder = Path(item["folder"])
        print(f"Video file not found at {video_path}. Running render...")
        subprocess.run(["python", str(folder / "generate_audio.py")], check=True)
        subprocess.run(["node", str(folder / "tools/capture.mjs"), "cues"], check=True)
        subprocess.run(["python", str(folder / "tools/mix.py")], check=True)
        video_path.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(["node", str(folder / "tools/capture.mjs"), "video", str(video_path)], check=True)

    # Upload to YouTube
    video_id = upload_video(
        file_path=str(video_path),
        title=item["title"],
        description=item["description"],
        tags=item.get("tags", []),
        privacy="public"
    )

    # Mark as uploaded
    item["status"] = "uploaded"
    item["uploaded_at"] = datetime.now(timezone.utc).isoformat()
    item["youtube_url"] = f"https://youtu.be/{video_id}"

    with open(QUEUE_FILE, "w", encoding="utf-8") as f:
        json.dump(queue, f, indent=2)

    print(f"Successfully published '{item['title']}' -> https://youtu.be/{video_id}")

if __name__ == "__main__":
    main()
