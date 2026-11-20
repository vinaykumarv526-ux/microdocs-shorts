import asyncio, json, re
from pathlib import Path
import edge_tts
import numpy as np
import soundfile as sf
import soxr

VOICE = "en-US-ChristopherNeural"
RATE = "+6%"

DATA_DIR = Path("test_audio")
DATA_DIR.mkdir(parents=True, exist_ok=True)

from topics_100 import TOPICS
topic = next(x for x in TOPICS if x['id'] == 'breathe-underwater')
lines_def = topic["script"]["lines"]
lead = topic["script"].get("lead", 0.35)
gap = topic["script"].get("gap", 0.28)
outro = topic["script"].get("outro", 1.0)

async def generate():
    temp_wavs = []
    lines_out = []
    words_out = []
    cur_t = lead

    print("Generating speech lines with edge-tts for breathe-underwater...")
    for idx, item in enumerate(lines_def):
        text = item["text"]
        mp3_path = DATA_DIR / f"line_{idx}.mp3"
        wav_path = DATA_DIR / f"line_{idx}.wav"

        comm = edge_tts.Communicate(text, VOICE, rate=RATE)
        await comm.save(str(mp3_path))

        # Convert to 24kHz mono PCM WAV
        data, sr = sf.read(str(mp3_path))
        if data.ndim > 1:
            data = data.mean(axis=1)
        if sr != 24000:
            data = soxr.resample(data, sr, 24000)
        sf.write(str(wav_path), data, 24000, subtype="PCM_16")

        dur = len(data) / 24000.0
        start_t = cur_t
        end_t = cur_t + dur
        temp_wavs.append((data, start_t, end_t))

        lines_out.append({
            "idx": idx,
            "text": text,
            "start": round(start_t, 3),
            "end": round(end_t, 3)
        })

        words = re.findall(r"\b[\w']+\b", text)
        if words:
            w_dur = dur / len(words)
            for w_idx, w in enumerate(words):
                words_out.append({
                    "word": w,
                    "start": round(start_t + w_idx * w_dur, 3),
                    "end": round(start_t + (w_idx + 1) * w_dur, 3),
                    "line": idx
                })

        line_gap = item.get("gap", gap)
        cur_t = end_t + line_gap

    total_dur = cur_t + outro
    total_samples = int(total_dur * 24000)
    full_audio = np.zeros(total_samples, dtype=np.float32)

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

    print(f"Generated shared voiceover audio ({round(total_dur, 2)}s) successfully in {DATA_DIR}!")

if __name__ == "__main__":
    asyncio.run(generate())
