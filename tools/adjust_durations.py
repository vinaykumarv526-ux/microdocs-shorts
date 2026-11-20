import subprocess
from pathlib import Path

DIR = Path("voice models sample").resolve()

# 09: Grumpy Captain - speed up slightly to bring from 8.87s to ~7.2s
f09 = DIR / "09_Grumpy_Old_Sea_Captain.mp3"
subprocess.run(["ffmpeg", "-y", "-i", str(f09), "-filter:a", "atempo=1.20", str(DIR / "tmp09.mp3")], capture_output=True)
(DIR / "tmp09.mp3").replace(f09)

# 11: Surfer Dude - bring from 10.54s to ~7.4s
f11 = DIR / "11_Stoned_Chill_Surfer_Dude.mp3"
subprocess.run(["ffmpeg", "-y", "-i", str(f11), "-filter:a", "atempo=1.42", str(DIR / "tmp11.mp3")], capture_output=True)
(DIR / "tmp11.mp3").replace(f11)

# 18: Auctioneer - stretch from 3.58s to ~5.4s
f18 = DIR / "18_Fast_Talking_Auctioneer.mp3"
subprocess.run(["ffmpeg", "-y", "-i", str(f18), "-filter:a", "atempo=0.66", str(DIR / "tmp18.mp3")], capture_output=True)
(DIR / "tmp18.mp3").replace(f18)

# 20: Infomercial - stretch from 4.20s to ~5.6s
f20 = DIR / "20_Commercial_Infomercial_Hype.mp3"
subprocess.run(["ffmpeg", "-y", "-i", str(f20), "-filter:a", "atempo=0.75", str(DIR / "tmp20.mp3")], capture_output=True)
(DIR / "tmp20.mp3").replace(f20)

# Check all durations
for p in sorted(DIR.glob("*.mp3")):
    probe = subprocess.run([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", str(p)
    ], capture_output=True, text=True)
    dur = float(probe.stdout.strip())
    print(f"{p.name}: {dur:.2f}s")
