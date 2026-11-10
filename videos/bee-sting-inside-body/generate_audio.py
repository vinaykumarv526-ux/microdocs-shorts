import asyncio, json, re
from pathlib import Path
import edge_tts
import numpy as np
import soundfile as sf
import soxr

VOICE = "en-US-GuyNeural"
RATE = "+6%"

PROJECT_DIR = Path(".")
SCRIPT_FILE = PROJECT_DIR / "script.json"
DATA_DIR = PROJECT_DIR / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)

with open(SCRIPT_FILE, "r", encoding="utf-8") as f:
    script = json.load(f)

lines_def = script["lines"]
lead = script.get("lead", 0.35)
gap = script.get("gap", 0.28)
outro = script.get("outro", 1.0)

async def generate():
    temp_wavs = []
    lines_out = []
    words_out = []
    cur_t = lead

    print(f"Generating speech lines with edge-tts ({VOICE}) for bee-sting-inside-body...")
    for idx, item in enumerate(lines_def):
        text = item["text"]
        mp3_path = DATA_DIR / f"line_{idx}.mp3"
        wav_path = DATA_DIR / f"line_{idx}.wav"

        comm = edge_tts.Communicate(text, VOICE, rate=RATE)
        await comm.save(str(mp3_path))

        data, sr = sf.read(str(mp3_path))
        if len(data.shape) > 1:
            data = data.mean(axis=1)

        thr = 0.008
        active = np.where(np.abs(data) > thr)[0]
        if len(active):
            a = max(0, active[0] - int(0.02 * sr))
            b = min(len(data), active[-1] + int(0.04 * sr))
            data = data[a:b]

        data_24k = soxr.resample(data, sr, 24000)
        dur = len(data_24k) / 24000.0

        sf.write(str(wav_path), data_24k, 24000, subtype="PCM_16")
        temp_wavs.append((data_24k, cur_t, cur_t + dur))

        lines_out.append({
            "i": idx,
            "text": text,
            "start": round(cur_t, 3),
            "end": round(cur_t + dur, 3)
        })

        words = re.findall(r"\b[\w']+\b", text)
        w_dur = dur / max(1, len(words))
        for w_idx, w in enumerate(words):
            words_out.append({
                "w": w,
                "line": idx,
                "s": round(cur_t + w_idx * w_dur, 3),
                "e": round(cur_t + (w_idx + 1) * w_dur - 0.02, 3)
            })

        cur_t += dur + item.get("gap", gap)

    total_dur = cur_t + outro
    full_audio = np.zeros(int(total_dur * 24000), dtype=np.float32)
    for data, start_t, end_t in temp_wavs:
        s_idx = int(start_t * 24000)
        e_idx = s_idx + len(data)
        if e_idx <= len(full_audio):
            full_audio[s_idx:e_idx] += data

    narration_wav = DATA_DIR / "narration.wav"
    sf.write(str(narration_wav), full_audio, 24000, subtype="PCM_16")

    with open(DATA_DIR / "lines.json", "w", encoding="utf-8") as f:
        json.dump({
            "duration": round(total_dur, 3),
            "voice": VOICE,
            "speed": 1.0,
            "lines": lines_out
        }, f, indent=1)

    with open(DATA_DIR / "words.json", "w", encoding="utf-8") as f:
        json.dump(words_out, f, indent=1)

    print(f"Generated voiceover audio ({round(total_dur, 2)}s) successfully.")

if __name__ == "__main__":
    asyncio.run(generate())
