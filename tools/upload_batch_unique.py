"""Uploads the newly re-rendered, unique topic-specific architectural shorts to YouTube."""
import os, sys, json
from datetime import datetime, timezone
from pathlib import Path

tools_dir = Path(__file__).parent.resolve()
if str(tools_dir) not in sys.path:
    sys.path.insert(0, str(tools_dir))

from youtube_upload import upload_video

VIDEOS_TO_SCHEDULE = [
    {
        "id": "traffic-lights-colors",
        "title": "Why Are Traffic Lights Red, Yellow, and Green? 🚦 #Shorts",
        "description": "Why does almost every country on Earth use red, yellow, and green for traffic signals? The 2D architectural breakdown of optical physics, wavelength penetration, and railway safety!\n\n🔔 Subscribe to @MicroDocsOfficial for daily curiosity explainers!\n\n#Shorts #Science #TrafficLights #Optics #Physics #Engineering #MicroDocs",
        "tags": ["Shorts", "TrafficLights", "Optics", "Physics", "History", "Engineering", "MicroDocs"],
        "publish_at": "2026-11-27T16:30:00Z",
    },
    {
        "id": "why-popcorn-pops",
        "title": "Why Does Popcorn ACTUALLY Pop? 🍿 #Shorts",
        "description": "Why does popcorn explode into fluffy white foam while sweet corn just burns? The 2D technical breakdown of pericarp hull pressure vessels and superheated 135 PSI steam!\n\n🔔 Subscribe to @MicroDocsOfficial for daily curiosity explainers!\n\n#Shorts #Science #Popcorn #Physics #Thermodynamics #FoodScience #MicroDocs",
        "tags": ["Shorts", "Popcorn", "FoodScience", "Physics", "Thermodynamics", "Curiosity", "MicroDocs"],
        "publish_at": "2026-11-27T23:30:00Z",
    },
    {
        "id": "manhole-round",
        "title": "Why Are Manhole Covers Round? (Not Square!) ⭕ #Shorts",
        "description": "Why are sewer manhole covers always perfectly round? The 2D mathematical breakdown of constant diameter Reuleaux geometry and why square covers plunge down holes!\n\n🔔 Subscribe to @MicroDocsOfficial for daily curiosity explainers!\n\n#Shorts #Science #Manhole #Geometry #Engineering #UrbanCuriosity #MicroDocs",
        "tags": ["Shorts", "Geometry", "Engineering", "Math", "CivilEngineering", "UrbanCuriosity", "MicroDocs"],
        "publish_at": "2026-11-28T16:30:00Z",
    },
    {
        "id": "american-wood-frame-homes",
        "title": "Why Are Most American Houses Made of Wood? 🪵🏠 #Shorts",
        "description": "Why are homes across the United States built with wooden 2x4 framing instead of brick? The 2D architectural breakdown of seismic flexibility, pine timber ecology, and platform framing!\n\n🔔 Subscribe to @MicroDocsOfficial for daily curiosity explainers!\n\n#Shorts #Architecture #Construction #Homes #WoodFraming #Engineering #MicroDocs",
        "tags": ["Shorts", "Architecture", "Construction", "Homes", "Engineering", "USA", "MicroDocs"],
        "publish_at": "2026-11-28T23:30:00Z",
    },
    {
        "id": "why-deja-vu",
        "title": "Why Do You REALLY Get Déjà Vu? 🌀 #Shorts",
        "description": "Why do you suddenly feel like you've lived a brand new moment before? The 2D neurological breakdown of the 15-millisecond temporal lobe memory lag!\n\n🔔 Subscribe to @MicroDocsOfficial for daily curiosity explainers!\n\n#Shorts #Science #DejaVu #Neuroscience #Brain #Psychology #MicroDocs",
        "tags": ["Shorts", "DejaVu", "Brain", "Neuroscience", "Psychology", "Memory", "MicroDocs"],
        "publish_at": "2026-11-29T16:30:00Z",
    },
]

QUEUE_FILE = Path("queue.json")

def main():
    if not QUEUE_FILE.exists():
        queue = []
    else:
        with open(QUEUE_FILE, "r", encoding="utf-8") as f:
            queue = json.load(f)

    uploaded_count = 0
    for item in VIDEOS_TO_SCHEDULE:
        vid_id = item["id"]
        mp4_path = Path(f"videos/{vid_id}/renders/{vid_id}.mp4")
        thumb_path = Path(f"videos/{vid_id}/thumbnail.jpg")

        if not mp4_path.exists():
            print(f"Skipping {vid_id}: MP4 file not found at {mp4_path}")
            continue

        print(f"\n==========================================")
        print(f"Uploading '{item['title']}'...")
        print(f"Target slot: {item['publish_at']}")
        print(f"==========================================")

        try:
            yt_id = upload_video(
                file_path=str(mp4_path),
                title=item["title"],
                description=item["description"],
                tags=item["tags"],
                privacy="private",
                publish_at=item["publish_at"],
                thumbnail_path=str(thumb_path) if thumb_path.exists() else None,
            )
            yt_url = f"https://youtu.be/{yt_id}"
            print(f"SUCCESS! Uploaded & Scheduled: {yt_url} at {item['publish_at']}")

            queue_entry = {
                "id": vid_id,
                "style": "inside-out-architectural",
                "folder": f"videos/{vid_id}",
                "video_file": str(mp4_path).replace("\\", "/"),
                "thumbnail": str(thumb_path).replace("\\", "/"),
                "title": item["title"],
                "description": item["description"],
                "tags": item["tags"],
                "status": "scheduled",
                "youtube_url": yt_url,
                "publish_at": item["publish_at"],
                "uploaded_at": datetime.now(timezone.utc).isoformat(),
            }
            queue.append(queue_entry)

            with open(QUEUE_FILE, "w", encoding="utf-8") as f:
                json.dump(queue, f, indent=2)

            uploaded_count += 1
        except Exception as e:
            print(f"Error uploading {vid_id}: {e}")
            break

    print(f"\nFinished uploading batch. Total scheduled: {uploaded_count}/{len(VIDEOS_TO_SCHEDULE)}")

if __name__ == "__main__":
    main()
