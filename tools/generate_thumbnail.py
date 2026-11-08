"""Thumbnail generator for MicroDocs YouTube Shorts.
Extracts the peak dramatic hook frame (around 1.8s) from the rendered 3D MP4,
enhances contrast and vibrancy with Pillow for mobile viewports,
and saves thumbnail.jpg for YouTube upload and repository display.
"""
import os, sys, subprocess, shutil
from pathlib import Path

def create_thumbnail_for_project(project_dir, topic_id, video_path=None, timestamp_sec=1.8):
    project_dir = Path(project_dir).resolve()
    if video_path is None:
        video_path = project_dir / f"renders/{topic_id}.mp4"
    else:
        video_path = Path(video_path).resolve()

    if not video_path.exists():
        print(f"Warning: Cannot generate thumbnail, video not found at {video_path}")
        return None

    # Determine output path: save in project root (videos/<id>/thumbnail.jpg) and in renders/
    thumb_path = project_dir / "thumbnail.jpg"
    thumb_renders_path = project_dir / "renders/thumbnail.jpg"
    thumb_renders_path.parent.mkdir(parents=True, exist_ok=True)

    print(f"Generating thumbnail for {topic_id} at {timestamp_sec}s...")

    # Run FFmpeg to extract high quality frame
    cmd = [
        "ffmpeg", "-y",
        "-ss", str(timestamp_sec),
        "-i", str(video_path),
        "-vframes", "1",
        "-update", "1",
        "-q:v", "2",
        str(thumb_path)
    ]
    try:
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception:
        # Fallback if ffmpeg version doesn't support -update
        cmd_fallback = [
            "ffmpeg", "-y",
            "-ss", str(timestamp_sec),
            "-i", str(video_path),
            "-vframes", "1",
            "-q:v", "2",
            str(thumb_path)
        ]
        subprocess.run(cmd_fallback, check=True)

    # Optional Pillow enhancement for maximum pop on mobile screens
    try:
        from PIL import Image, ImageEnhance
        with Image.open(thumb_path) as img:
            # Subtle boost in color saturation and contrast
            img = ImageEnhance.Color(img).enhance(1.12)
            img = ImageEnhance.Contrast(img).enhance(1.10)
            img = ImageEnhance.Sharpness(img).enhance(1.15)
            # Save optimized JPEG
            img.save(thumb_path, "JPEG", quality=92, optimize=True)
            img.save(thumb_renders_path, "JPEG", quality=92, optimize=True)
        print(f"Enhanced thumbnail saved to {thumb_path}")
    except Exception as e:
        print(f"Saved base frame thumbnail: {thumb_path} (Pillow enhancement: {e})")
        if thumb_path.exists():
            shutil.copy2(thumb_path, thumb_renders_path)

    return thumb_path

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("project_dir", help="Project directory")
    parser.add_argument("topic_id", help="Topic ID")
    parser.add_argument("--time", type=float, default=1.8, help="Timestamp in seconds")
    args = parser.parse_args()

    t = create_thumbnail_for_project(args.project_dir, args.topic_id, timestamp_sec=args.time)
    print(f"Result: {t}")
