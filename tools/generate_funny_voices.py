import asyncio, os, sys, subprocess
from pathlib import Path
import edge_tts

OUT_DIR = Path("voice models sample").resolve()
OUT_DIR.mkdir(parents=True, exist_ok=True)
TEMP_DIR = Path("test_audio/tmp_voices").resolve()
TEMP_DIR.mkdir(parents=True, exist_ok=True)

# 20 Distinct Funny & Attention-Grabbing Voice Models
VOICE_MODELS = [
    {
        "id": "01_Helium_Chipmunk_Diver",
        "voice": "en-US-AnaNeural",
        "rate": "+22%",
        "pitch": "+45Hz",
        "text": "Wait! If humans could breathe underwater, why are our lungs squeaking like a toy dolphin?!",
        "ffmpeg_filter": "asetrate=24000*1.28,atempo=1/1.28*1.12,highpass=f=200"
    },
    {
        "id": "02_Mega_Bass_Titan_Narrator",
        "voice": "en-US-ChristopherNeural",
        "rate": "-10%",
        "pitch": "-25Hz",
        "text": "Deep in the pitch-black abyss... human lungs suddenly mutated into indestructible gills!",
        "ffmpeg_filter": "asetrate=24000*0.88,atempo=1/0.88*0.95,bass=g=14:f=110,lowpass=f=4500"
    },
    {
        "id": "03_Underwater_Scuba_Gurgle",
        "voice": "en-US-GuyNeural",
        "rate": "+0%",
        "pitch": "-5Hz",
        "text": "Mission control, I just took a full breath underwater... and the ocean tastes surprisingly salty!",
        "ffmpeg_filter": "lowpass=f=1200,highpass=f=350,flanger=delay=4:depth=2:regen=20:speed=0.5"
    },
    {
        "id": "04_Hyperactive_Cartoon_Speedster",
        "voice": "en-US-EricNeural",
        "rate": "+35%",
        "pitch": "+20Hz",
        "text": "Imagine diving straight to the bottom without oxygen tanks! Boom! You're racing dolphins right now!",
        "ffmpeg_filter": "asetrate=24000*1.15,atempo=1/1.15*1.2,treble=g=5"
    },
    {
        "id": "05_Eerie_Abyss_Whisper",
        "voice": "en-US-RogerNeural",
        "rate": "-12%",
        "pitch": "-15Hz",
        "text": "What if you breathed underwater... and realized you were not the only one breathing down here?",
        "ffmpeg_filter": "aecho=0.8:0.88:60|120:0.4|0.3,lowpass=f=3200,volume=1.4"
    },
    {
        "id": "06_Vintage_1940s_Radio_Host",
        "voice": "en-US-BrianNeural",
        "rate": "+10%",
        "pitch": "+10Hz",
        "text": "Extra! Extra! Read all about it! Human lungs sprout gills as mankind abandons land for the sea!",
        "ffmpeg_filter": "highpass=f=500,lowpass=f=2600,equalizer=f=1000:t=q:w=1:g=8,volume=1.3"
    },
    {
        "id": "07_Cyborg_Mecha_Submarine",
        "voice": "en-US-SteffanNeural",
        "rate": "+0%",
        "pitch": "-10Hz",
        "text": "Warning! Hydrostatic pressure detected. Activating synthetic aquatic bio-respiration gills now.",
        "ffmpeg_filter": "flanger=delay=8:depth=5:regen=60:speed=2,treble=g=4"
    },
    {
        "id": "08_Panicked_Nervous_Guy",
        "voice": "en-US-GuyNeural",
        "rate": "+25%",
        "pitch": "+30Hz",
        "text": "Wait, wait, wait! Are you telling me my lungs are filling with sea water right now?! Somebody help!",
        "ffmpeg_filter": "asetrate=24000*1.18,atempo=1/1.18*1.15,tremolo=f=6:d=0.3"
    },
    {
        "id": "09_Grumpy_Old_Sea_Captain",
        "voice": "en-GB-RyanNeural",
        "rate": "-15%",
        "pitch": "-22Hz",
        "text": "Arrgh! Ye landlubbers think breathing ocean water is fun, until a hundred-foot squid says hello!",
        "ffmpeg_filter": "asetrate=24000*0.85,atempo=1/0.85*0.95,bass=g=10:f=120"
    },
    {
        "id": "10_Crazy_Excited_Scientist",
        "voice": "en-US-BrianNeural",
        "rate": "+18%",
        "pitch": "+15Hz",
        "text": "Eureka! We have cracked genetic adaptation! Forget diving tanks, we're building Atlantis by Friday!",
        "ffmpeg_filter": "treble=g=8,equalizer=f=2500:t=q:w=1:g=5,volume=1.2"
    },
    {
        "id": "11_Stoned_Chill_Surfer_Dude",
        "voice": "en-US-ChristopherNeural",
        "rate": "-15%",
        "pitch": "-8Hz",
        "text": "Whoa bro... imagine just chilling with giant sea turtles, breathing underwater, totally tubular man.",
        "ffmpeg_filter": "asetrate=24000*0.92,atempo=1/0.92*0.9,aecho=0.8:0.7:80:0.3"
    },
    {
        "id": "12_Dramatic_Opera_Hero",
        "voice": "en-GB-RyanNeural",
        "rate": "-8%",
        "pitch": "-12Hz",
        "text": "Behold! No longer bound to land, humanity breathes the deep blue ocean as its new kingdom!",
        "ffmpeg_filter": "aecho=0.85:0.8:50|100:0.5|0.4,bass=g=6:f=150,volume=1.3"
    },
    {
        "id": "13_Little_Kid_Wonder",
        "voice": "en-US-AnaNeural",
        "rate": "+5%",
        "pitch": "+30Hz",
        "text": "Mommy, look at me! I can breathe under the waves just like a baby dolphin swimming by!",
        "ffmpeg_filter": "asetrate=24000*1.15,atempo=1/1.15,treble=g=4"
    },
    {
        "id": "14_Action_Movie_Hero",
        "voice": "en-US-ChristopherNeural",
        "rate": "-5%",
        "pitch": "-18Hz",
        "text": "Throw away the submarines. Down in the trenches... we are the new apex predators.",
        "ffmpeg_filter": "asetrate=24000*0.90,atempo=1/0.90,bass=g=12:f=100,volume=1.4"
    },
    {
        "id": "15_Sassy_British_Explorer",
        "voice": "en-GB-SoniaNeural",
        "rate": "+10%",
        "pitch": "+10Hz",
        "text": "Brilliant concept, really! Until you remember freezing ocean water will crush your ribs in seconds.",
        "ffmpeg_filter": "equalizer=f=3000:t=q:w=1:g=4,volume=1.2"
    },
    {
        "id": "16_Alien_Abduction_Modulator",
        "voice": "en-US-SteffanNeural",
        "rate": "+5%",
        "pitch": "-10Hz",
        "text": "Earth species adaptation detected. Humans have initiated liquid respiration protocol.",
        "ffmpeg_filter": "asetrate=24000*0.88,atempo=1/0.88,tremolo=f=12:d=0.7,flanger=delay=5:depth=4:regen=30:speed=1"
    },
    {
        "id": "17_Cave_Echo_Monster",
        "voice": "en-US-RogerNeural",
        "rate": "-20%",
        "pitch": "-30Hz",
        "text": "Down... down into the midnight abyss... breathe in the crushing dark!",
        "ffmpeg_filter": "asetrate=24000*0.80,atempo=1/0.80*0.9,aecho=0.9:0.8:120|240:0.5|0.4,bass=g=16:f=90"
    },
    {
        "id": "18_Fast_Talking_Auctioneer",
        "voice": "en-US-GuyNeural",
        "rate": "+45%",
        "pitch": "+15Hz",
        "text": "What if you could breathe underwater right now, no tank, no fins, going once, going twice, sold!",
        "ffmpeg_filter": "atempo=1.25,treble=g=4"
    },
    {
        "id": "19_Sarcastic_AI_Assistant",
        "voice": "en-US-JennyNeural",
        "rate": "+2%",
        "pitch": "+0Hz",
        "text": "Congratulations human. You can now inhale ocean water. Enjoy hypothermia and giant squid tentacles.",
        "ffmpeg_filter": "highpass=f=200,lowpass=f=4000,volume=1.2"
    },
    {
        "id": "20_Commercial_Infomercial_Hype",
        "voice": "en-US-BrianNeural",
        "rate": "+28%",
        "pitch": "+25Hz",
        "text": "Are you sick and tired of heavy scuba tanks?! Call now and upgrade your lungs to gills today!",
        "ffmpeg_filter": "asetrate=24000*1.10,atempo=1/1.10*1.15,treble=g=6,volume=1.3"
    }
]

async def make_sample(m, idx):
    raw_mp3 = TEMP_DIR / f"{m['id']}_raw.mp3"
    out_mp3 = OUT_DIR / f"{m['id']}.mp3"
    
    print(f"[{idx+1}/20] Generating {m['id']} with {m['voice']}...")
    try:
        comm = edge_tts.Communicate(m["text"], m["voice"], rate=m["rate"], pitch=m["pitch"])
        await comm.save(str(raw_mp3))
    except Exception as e:
        print(f"[SKIP] Voice model '{m['voice']}' not available ({e}). Skipping...")
        return None

    # Apply audio filter via ffmpeg for special character/bass/speed effect
    filt = m.get("ffmpeg_filter")
    if filt:
        cmd = [
            "ffmpeg", "-y", "-i", str(raw_mp3),
            "-af", filt,
            "-ar", "24000",
            str(out_mp3)
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"Warning: ffmpeg filter failed for {m['id']}, falling back to raw: {res.stderr[:100]}")
            import shutil
            shutil.copy2(raw_mp3, out_mp3)
    else:
        import shutil
        shutil.copy2(raw_mp3, out_mp3)

    # Check duration with ffprobe
    probe = subprocess.run([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=noprint_wrappers=1:nokey=1", str(out_mp3)
    ], capture_output=True, text=True)
    dur = float(probe.stdout.strip()) if probe.stdout.strip() else 0.0

    print(f"  -> SUCCESS: Created {out_mp3.name} (Duration: {dur:.2f}s)")
    return {"id": m["id"], "file": str(out_mp3), "duration": dur, "text": m["text"]}

async def main():
    successes = []
    for idx, m in enumerate(VOICE_MODELS):
        res = await make_sample(m, idx)
        if res:
            successes.append(res)
    
    print(f"\n==========================================")
    print(f"Total Funny Voice Models Created: {len(successes)}/20")
    print(f"Saved into: {OUT_DIR}")
    print(f"==========================================\n")

if __name__ == "__main__":
    asyncio.run(main())
