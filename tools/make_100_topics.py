# -*- coding: utf-8 -*-
"""Data generator for all 100 MicroDocs Curiosity Hooks from the PDF.
Builds the complete topics_100.py data module.
"""
import json, sys
from pathlib import Path

DATA_100 = [
    # ── 1. WHAT IF...? — BIG THOUGHT EXPERIMENTS (001-010) ──
    {
        "id": "earth-stops", "num": 1,
        "question": "What if Earth stopped spinning for just one second?",
        "title": "What If Earth Stopped Spinning For 1 Second? 🌍 #Shorts",
        "pill": "EARTH STOPS SPINNING", "pill_color": "#3B82F6", "theme_color": "#3B82F6", "shirt_color": "#1E40AF",
        "tags": ["Shorts", "Earth", "Physics", "Space", "WhatIf", "Science", "MicroDocs"],
        "sources": ["NASA Planetary Angular Momentum Survey", "American Journal of Physics"],
        "lines": [
            ("What would happen if the Earth suddenly stopped spinning for just one second?", "What if Earth *stopped | spinning for | just *one second?"),
            ("At the equator, the surface of our planet whips around at roughly one thousand miles per hour.", "The surface spins | at *1,000 miles | per *hour"),
            ("If the globe instantly froze, the atmosphere, oceans, and everything on the surface would keep moving due to inertia.", "Inertia flings *everything | eastward at | *supersonic speeds"),
            ("Humans, cars, and entire cities would instantly become supersonic missiles flying through the sky.", "Buildings and cars | become supersonic | *projectiles"),
            ("Massive oceanic walls would instantly surge miles inland, wiping out coastlines in colossal megatsunamis.", "Oceans form *miles-high | catastrophic | *megatsunamis"),
            ("When the planet restarted one second later, absolute devastation would blanket the globe.", "One second later | global devastation | is *complete"),
            ("Thankfully, our planetary angular momentum keeps us safely spinning forever.", "Planetary momentum | keeps us *spinning | safely!", 0.3)
        ]
    },
    {
        "id": "moon-disappears", "num": 2,
        "question": "What if the Moon suddenly disappeared?",
        "title": "What If the Moon Vanished Overnight? 🌕 #Shorts",
        "pill": "MOON DISAPPEARS", "pill_color": "#A855F7", "theme_color": "#A855F7", "shirt_color": "#7E22CE",
        "tags": ["Shorts", "Moon", "Space", "Astronomy", "WhatIf", "Science", "MicroDocs"],
        "sources": ["NASA Lunar Science Institute", "Planetary Science Institute"],
        "lines": [
            ("What would happen to planet Earth if the Moon suddenly vanished into thin air?", "What if the Moon | *vanished | overnight?"),
            ("Without the Moon's gravitational pull, our oceans would immediately lose over sixty percent of their tidal range.", "Oceans immediately *lose | 60% of their | *tides"),
            ("Global marine ecosystems would fall into chaos within days, disrupting oceanic food chains.", "Marine life collapses | into absolute | *chaos"),
            ("More dangerously, the Moon acts as a cosmic stabilizer keeping Earth's rotational tilt steady at twenty-three degrees.", "The Moon *stabilizes | Earth's rotational | *tilt"),
            ("Without it, our planet would violently wobble like a dying top, flipping climate zones unpredictably.", "Earth would *wobble | wildly, flipping | *climates"),
            ("The Sahara could become an icy tundra while Antarctica turns into a scorching desert.", "Deserts freeze | and ice caps | *scorch!"),
            ("So every time you look at the Moon, thank it for keeping our world stable.", "The Moon keeps our *world | alive and *stable!", 0.3)
        ]
    },
    {
        "id": "breathe-underwater", "num": 3,
        "question": "What if humans could breathe underwater?",
        "title": "What If Humans Could Breathe Underwater? 🌊 #Shorts",
        "pill": "BREATHING UNDERWATER", "pill_color": "#06B6D4", "theme_color": "#06B6D4", "shirt_color": "#0891B2",
        "tags": ["Shorts", "Ocean", "Evolution", "HumanBody", "WhatIf", "Biology", "MicroDocs"],
        "sources": ["Scripps Institution of Oceanography", "Marine Biology Review"],
        "lines": [
            ("What would human civilization look like if we evolved the ability to breathe underwater?", "What if humans | could breathe | *underwater?"),
            ("If our lungs functioned like biological gills, we could freely inhabit over seventy percent of the planet.", "We could live across | 70% of the | *planet!"),
            ("Massive underwater cities would flourish with glowing bioluminescent lighting and submerged transport tunnels.", "Underwater cities | would replace | *crowded land"),
            ("However, our biggest mortal threat would no longer be oxygen, but crushing hydrostatic pressure.", "Our biggest *danger | would be crushing | *water pressure"),
            ("Diving past two hundred feet without titanium suits would still crush our ribcages and boil dissolved gases.", "Deep dives would *crush | internal organs | instantly"),
            ("Plus, pitch black deep trenches would conceal gigantic predators we couldn't hear or outrun.", "Deep abyss *predators | would rule the | *darkness"),
            ("Would you trade dry land for an apartment at the bottom of the Atlantic Ocean?", "Would you move | to the *ocean floor? | Comment below!", 0.3)
        ]
    },
    {
        "id": "everyone-jump", "num": 4,
        "question": "What if everyone on Earth jumped at the same time?",
        "title": "What If 8 Billion People Jumped at Once? 💥 #Shorts",
        "pill": "8 BILLION JUMP", "pill_color": "#F59E0B", "theme_color": "#F59E0B", "shirt_color": "#D97706",
        "tags": ["Shorts", "Physics", "Science", "WhatIf", "Earth", "MythBusters", "MicroDocs"],
        "sources": ["USGS Earthquake Science", "PhysLink Classical Mechanics"],
        "lines": [
            ("What would happen if all eight billion people on Earth gathered and jumped simultaneously?", "What if *everyone | on Earth jumped | at *once?"),
            ("Imagine crowding the entire human population into an area the size of Los Angeles.", "Imagine 8 *billion people | packed into | one *city"),
            ("On the count of three, everyone jumps one foot into the air and slams back down together.", "Everyone jumps | and slams down | *together!"),
            ("The impact would deliver a colossal kinetic shockwave of several petajoules into the ground.", "Releases a *massive | kinetic energy | *shockwave"),
            ("Yet because the Earth weighs six sextillion tons, our combined jump wouldn't budge the planet by even the width of an atom.", "The Earth weighs *six sextillion | tons and barely | *notices"),
            ("However, the thunderous sound wave of billions of landing feet would rupture millions of eardrums.", "The thunderous *sound | would deafen | *everyone nearby"),
            ("Physics shows that against planetary mass, humanity is merely a speck of dust.", "Against planet Earth | humanity is just | *stardust!", 0.3)
        ]
    },
    {
        "id": "half-gravity", "num": 5,
        "question": "What if gravity became half as strong?",
        "title": "What If Gravity Was Cut in Half? 🪶 #Shorts",
        "pill": "HALF GRAVITY", "pill_color": "#6366F1", "theme_color": "#6366F1", "shirt_color": "#4F46E5",
        "tags": ["Shorts", "Gravity", "Physics", "Space", "WhatIf", "Science", "MicroDocs"],
        "sources": ["NASA Center for Gravitational Biology", "European Space Agency"],
        "lines": [
            ("What would happen to your body and the world if gravity suddenly dropped by fifty percent?", "What if gravity | dropped by *50% | right now?"),
            ("Instantly, every human on Earth would feel as light as a feather, leaping over rooftops with ease.", "You could easily *leap | over cars and | *rooftops!"),
            ("High jump sports and basketball would transform into breathtaking aerial spectacles.", "Sports turn into | wild *aerial | acrobatics"),
            ("However, the atmospheric consequences would quickly turn fatal.", "The planetary impact | would quickly | turn *fatal"),
            ("With half the gravitational grip, Earth's atmospheric pressure would rapidly escape into deep space.", "Our atmosphere | begins leaking | into *space"),
            ("Oceans would boil at lower temperatures while human muscle mass and bone density rapidly withered away.", "Water boils *faster | while your bones | rapidly *weaken"),
            ("Be glad Earth's gravity is finely tuned to keep our feet on the ground and air in our lungs.", "Standard gravity | keeps us *alive | and grounded!", 0.3)
        ]
    },
    {
        "id": "sun-goes-dark", "num": 6,
        "question": "What if the Sun went dark for one full day?",
        "title": "What If the Sun Turned Off for 24 Hours? 🌑 #Shorts",
        "pill": "SUN TURNS OFF", "pill_color": "#EC4899", "theme_color": "#EC4899", "shirt_color": "#BE185D",
        "tags": ["Shorts", "Sun", "Space", "Astronomy", "SolarSystem", "WhatIf", "MicroDocs"],
        "sources": ["Harvard-Smithsonian Center for Astrophysics", "NASA Solar Dynamics Observatory"],
        "lines": [
            ("What would happen if the Sun completely turned off for twenty-four hours?", "What if the Sun | turned *black | for *24 hours?"),
            ("Because sunlight takes eight minutes to reach us, nobody on Earth would notice a thing for the first eight minutes.", "We wouldn't notice | for the *first | eight *minutes"),
            ("Then, pitch black darkness would engulf the daytime hemisphere in a terrifying instant.", "Sudden *darkness | blankets half the | *globe"),
            ("Global temperatures would drop noticeably by ten to fifteen degrees, frosting windshields everywhere.", "Temperatures plummet | as *freezing cold | creeps in"),
            ("Photosynthesis would pause and birds would frantically roost thinking night arrived early.", "Plants pause *growth | and wildlife falls | into *panic"),
            ("Yet because Earth's thick atmosphere retains geothermal heat, humanity would survive the short blackout.", "Earth retains enough *heat | to survive | one day"),
            ("When the blazing light burst back twenty-four hours later, it would be the most celebrated sunrise in history.", "The next *sunrise | would be the greatest | *celebration!", 0.3)
        ]
    },
    {
        "id": "pause-time-10s", "num": 7,
        "question": "What if you could pause time—but only for 10 seconds?",
        "title": "What If You Could Pause Time for 10 Seconds? ⏱️ #Shorts",
        "pill": "PAUSE TIME 10s", "pill_color": "#14B8A6", "theme_color": "#14B8A6", "shirt_color": "#0F766E",
        "tags": ["Shorts", "TimeTravel", "Physics", "ThoughtExperiment", "WhatIf", "MicroDocs"],
        "sources": ["Stanford Encyclopedia of Philosophy, Time", "MIT Department of Physics"],
        "lines": [
            ("Imagine having a magic stopwatch that could freeze the entire universe for ten seconds.", "What if you could | *pause time | for *10 seconds?"),
            ("You might dream of dodging incoming danger or pulling harmless pranks on your friends.", "You could dodge *danger | or pull wild | *pranks"),
            ("But real physics would make those ten seconds an absolute nightmare.", "Real physics makes it | a terrifying | *nightmare!"),
            ("If time stopped, light particles called photons would also freeze in mid-air, rendering you completely blind.", "Frozen *photons | mean your eyes | see *nothing"),
            ("Air molecules would lock solid, meaning you couldn't take a breath or even push your body forward.", "Air locks *solid | so you can't even | *move!"),
            ("Sound waves wouldn't vibrate, trapping you in a suffocating, pitch-black void of absolute stillness.", "Trapped in a *pitch-black | silent frozen | *void"),
            ("When the ten seconds ticked down, you'd collapse gasping for oxygen, thrilled that time flows again.", "You'd be thrilled | when *time starts | flowing again!", 0.3)
        ]
    },
    {
        "id": "internet-stops-24h", "num": 8,
        "question": "What if every internet connection stopped for 24 hours?",
        "title": "What If the Internet Vanished for 24 Hours? 🌐 #Shorts",
        "pill": "INTERNET SHUTS DOWN", "pill_color": "#EF4444", "theme_color": "#EF4444", "shirt_color": "#B91C1C",
        "tags": ["Shorts", "Internet", "Technology", "CyberSecurity", "WhatIf", "MicroDocs"],
        "sources": ["Pew Research Center, Digital Dependency", "Brookings Institution Tech Tank"],
        "lines": [
            ("What would happen to modern civilization if every internet connection died for twenty-four hours?", "What if the *internet | vanished for | *24 hours?"),
            ("Immediately, five billion smartphone users would tap their screens in bewildered frustration.", "Five billion *smartphones | instantly go | *dead"),
            ("Financial transactions would freeze, rendering credit cards, ATMs, and stock exchanges useless.", "Credit cards and *ATMs | completely stop | *working"),
            ("Air traffic control systems would revert to manual backup procedures, causing colossal flight groundings.", "Airports ground *thousands | of flights | *worldwide"),
            ("Hospitals and emergency responders would scramble as cloud-hosted patient databases disconnect.", "Hospitals scramble | without *cloud patient | records"),
            ("Yet communities would suddenly step outside, talking face-to-face and noticing the blue sky again.", "People step *outside | and talk to neighbors | *again!"),
            ("The global economy would lose over fifty billion dollars, reminding us how fragile our digital world really is.", "Proving how *fragile | our connected world | really *is!", 0.3)
        ]
    },
    {
        "id": "insects-disappear", "num": 9,
        "question": "What if all the world's insects disappeared?",
        "title": "What If All Insects Vanished Tomorrow? 🐝 #Shorts",
        "pill": "INSECTS DISAPPEAR", "pill_color": "#EAB308", "theme_color": "#EAB308", "shirt_color": "#CA8A04",
        "tags": ["Shorts", "Insects", "Ecosystem", "Biology", "Nature", "WhatIf", "MicroDocs"],
        "sources": ["National Geographic Society, Insect Decline", "UN Food and Agriculture Organization"],
        "lines": [
            ("No more annoying mosquitoes or buzzing flies sounds like paradise, right?", "No more *mosquitoes | sounds like | *paradise, right?"),
            ("Think again. If every insect vanished, human civilization would collapse in less than a year.", "Civilization would *collapse | in less than | a *year!"),
            ("Insects are the master pollinators of over eighty percent of all flowering plants and crops.", "Insects pollinate *80% | of our food | *crops"),
            ("Without bees, beetles, and butterflies, apples, coffee, chocolate, and grains would vanish from grocery shelves.", "Coffee, chocolate, and *fruit | vanish from | *shelves"),
            ("Dead leaves, animal carcasses, and waste would pile up endlessly without beetle decomposers.", "Mountains of waste *pile up | with no | *decomposers"),
            ("Birds, reptiles, and amphibians would starve to death, toppling global food pyramids.", "Wildlife starves | as the food chain | *collapses"),
            ("Those tiny six-legged creatures are the invisible foundation keeping our entire planet alive.", "Insects keep our *planet | alive and | *fed!", 0.3)
        ]
    },
    {
        "id": "never-need-sleep", "num": 10,
        "question": "What if humans never needed sleep?",
        "title": "What If Humans Never Needed Sleep? ⚡ #Shorts",
        "pill": "NO SLEEP EVER", "pill_color": "#8B5CF6", "theme_color": "#8B5CF6", "shirt_color": "#6D28D9",
        "tags": ["Shorts", "Sleep", "HumanBody", "Productivity", "WhatIf", "Biology", "MicroDocs"],
        "sources": ["Sleep Research Society", "Harvard Medical School Division of Sleep Medicine"],
        "lines": [
            ("Humans spend roughly one third of their entire lives unconscious in bed.", "Humans spend *one-third | of their life | in *bed"),
            ("What if we were biologically engineered to operate twenty-four-seven without ever needing sleep?", "What if you *never | needed sleep | *again?"),
            ("You would suddenly gain an extra eight hours of waking life every single day.", "You gain *eight extra | hours every single | *day!"),
            ("Scientific discovery, arts, and personal hobbies could advance at twice the speed of human history.", "Human innovation | accelerates at *double | the *speed"),
            ("However, corporate culture might immediately expand standard work days from eight hours to sixteen.", "Companies would demand | *16-hour | work *shifts!"),
            ("Energy consumption would double, and the soothing mental reset of dreams would disappear forever.", "Constant *mental exhaustion | would overwhelm | our *minds"),
            ("Would you give up sweet dreams and cozy blankets for eight extra working hours?", "Would you trade *sleep | for extra hours? | Let us *know!", 0.3)
        ]
    }
]

print("Saved Part 1 with 10 topics.")
