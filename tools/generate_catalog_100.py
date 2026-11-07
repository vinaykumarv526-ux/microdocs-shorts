# -*- coding: utf-8 -*-
"""Generator for the complete 100 topics catalog from the MicroDocs PDF.
Writes tools/topics_100.py and integrates into tools/catalog.py.
"""
import sys, json
from pathlib import Path

# Load Batch 1 and Batch 2
from make_100_topics import DATA_100 as BATCH_1
from build_all_data import BATCH_2

BATCH_3 = [
    # ── 3. HOW DOES...? — HIDDEN SYSTEMS EXPLAINED (021-030) ──
    {
        "id": "phone-knows-location", "num": 21,
        "question": "How does your phone know where you are?",
        "title": "How Your Phone REALLY Tracks Your Location 📍 #Shorts",
        "pill": "HOW PHONE FINDS YOU", "pill_color": "#3B82F6", "theme_color": "#3B82F6", "shirt_color": "#1D4ED8",
        "tags": ["Shorts", "Smartphone", "GPS", "Tech", "HowItWorks", "MicroDocs"],
        "sources": ["FCC Wireless E911 Location Technologies", "IEEE Spectrum GPS Trilateration"],
        "lines": [
            ("How can a tiny smartphone in your pocket pinpoint your exact location down to a single foot?", "How does your phone *pinpoint | your exact | *location?"),
            ("It doesn't rely on just one sensor; it combines three invisible global systems simultaneously.", "Combines three *invisible | systems at | *once!"),
            ("First, a built-in GPS chip listens to atomic clocks ticking aboard thirty-one satellites in deep orbit.", "Listens to *atomic clocks | on 31 orbiting | *satellites"),
            ("By calculating the nanosecond delays from four different satellites, it calculates your coordinates using trilateration.", "Uses *trilateration | to calculate your | *coordinates"),
            ("When you step indoors where satellite signals fade, your phone scans surrounding Wi-Fi routers and cell towers.", "Indoors, it scans *Wi-Fi | routers and cell | *towers"),
            ("It cross-references their signal strength against massive geographic databases to find your hallway.", "Maps signal strength to *find | your exact | *room!"),
            ("You are constantly surrounded by an invisible matrix of navigation signals.", "An invisible *grid of signals | follows you *everywhere!", 0.3)
        ]
    },
    {
        "id": "airplane-stays-air", "num": 22,
        "question": "How does an airplane stay in the air?",
        "title": "How Does a 500-Ton Plane Stay in the Air? ✈️ #Shorts",
        "pill": "HOW AIRPLANES FLY", "pill_color": "#0284C7", "theme_color": "#0284C7", "shirt_color": "#0369A1",
        "tags": ["Shorts", "Aviation", "Physics", "Aerodynamics", "Airplanes", "MicroDocs"],
        "sources": ["NASA Glenn Research Center Aeronautics", "FAA Pilot's Handbook of Aeronautical Knowledge"],
        "lines": [
            ("How does a massive commercial airliner weighing over five hundred tons stay airborne without falling?", "How does a *500-ton plane | stay in the | *air?"),
            ("It all comes down to the curved aerodynamic shape of the wings, called an airfoil.", "The secret is the *curved | wing called an | *airfoil"),
            ("Jet engines blast the aircraft forward, forcing air to rush over and under the wings.", "Engines thrust the *plane | forward at high | *speed"),
            ("Air flowing over the curved top travels faster, creating an area of low pressure above the wing.", "Air moves *faster on top | creating low | *pressure"),
            ("Meanwhile, higher pressure beneath the wing physically pushes the entire aircraft upward.", "Higher pressure below *pushes | the plane | *skyward"),
            ("This aerodynamic upward force is called lift, and once it exceeds the airplane's weight, it flies.", "This upward force is *lift | overcoming total | *weight!"),
            ("At five hundred miles per hour, air turns into a solid, invisible cushion.", "Air turns into an *invisible | cushion of solid *support!", 0.3)
        ]
    },
    {
        "id": "gps-satellites-work", "num": 23,
        "question": "How does GPS work when satellites are so far away?",
        "title": "How Does GPS Work From 12,000 Miles Away? 🛰️ #Shorts",
        "pill": "HOW GPS WORKS", "pill_color": "#8B5CF6", "theme_color": "#8B5CF6", "shirt_color": "#6D28D9",
        "tags": ["Shorts", "GPS", "Satellites", "Relativity", "Einstein", "MicroDocs"],
        "sources": ["U.S. Space Force GPS Directorate", "Einstein's Theory of General Relativity in GPS"],
        "lines": [
            ("GPS satellites orbit twelve thousand miles above Earth, yet guide you to a restaurant doorway.", "How does *GPS work | from 12,000 miles | *away?"),
            ("Each satellite simply broadcasts a radio message saying: this is who I am, and this is the exact time.", "Satellites broadcast *time stamps | from atomic | *clocks"),
            ("Because radio waves travel at the speed of light, your phone calculates how long the signal took to arrive.", "Your phone measures *nanosecond | delays in the | *signal"),
            ("Multiply that time by light speed, and your phone knows its exact distance from the satellite.", "Calculates exact *distance | from four orbiting | *birds"),
            ("Here is the crazy part: because satellites move fast in weaker gravity, their clocks tick faster than Earth clocks.", "Satellite clocks tick *faster | due to Einstein's | *relativity!"),
            ("Engineers must program Einstein's theory of general relativity into GPS software every day, or navigation would fail by six miles.", "Without relativity, *maps | would fail by | *6 miles!"),
            ("Every GPS turn you make is living proof that Einstein was right.", "Every GPS turn *proves | Einstein was *right!", 0.3)
        ]
    },
    {
        "id": "credit-card-speed", "num": 24,
        "question": "How does a credit card payment happen in seconds?",
        "title": "What Happens in 2 Seconds When You Tap Card? 💳 #Shorts",
        "pill": "CREDIT CARD SWIPE", "pill_color": "#10B981", "theme_color": "#10B981", "shirt_color": "#047857",
        "tags": ["Shorts", "Money", "Fintech", "Banking", "CreditCard", "MicroDocs"],
        "sources": ["Visa Global Transaction Processing Overview", "Federal Reserve Payments Study"],
        "lines": [
            ("When you tap your credit card at a store register, the payment approves in under two seconds.", "What happens when | you *tap your | *credit card?"),
            ("In those two seconds, your data embarks on a worldwide journey across thousands of miles of fiber optics.", "Your data races *thousands | of miles across | *undersea fiber"),
            ("The card's microchip generates a one-time cryptographic token to prevent fraud.", "Generates a *unique | cryptographic *token"),
            ("The terminal beams this token to the merchant's bank, which routes it through Visa or Mastercard's global network.", "Beams data to *Visa | or Mastercard's global | *supercomputers"),
            ("Their supercomputers check for fraud algorithms, then ping your personal bank to verify your funds.", "Pings your *bank | to check funds and *fraud"),
            ("Your bank approves the charge, transmits the confirmation code back, and the register beeps approved.", "Sends approval back | and the *terminal | *beeps!"),
            ("All of that happened in less time than it took you to blink twice.", "Happened in *less time | than a single *blink!", 0.3)
        ]
    },
    {
        "id": "brain-recognize-face", "num": 25,
        "question": "How does your brain recognize a face?",
        "title": "How Your Brain Recognizes Any Face in 0.1s 👁️ #Shorts",
        "pill": "FACE RECOGNITION BRAIN", "pill_color": "#EC4899", "theme_color": "#EC4899", "shirt_color": "#BE185D",
        "tags": ["Shorts", "Brain", "Neuroscience", "HumanBody", "Psychology", "MicroDocs"],
        "sources": ["Nature Neuroscience Fusiform Face Area", "MIT Department of Brain and Cognitive Sciences"],
        "lines": [
            ("In less than one tenth of a second, your brain can spot your best friend in a crowded stadium.", "How does your brain *spot | a familiar *face | in 0.1s?"),
            ("Human brains have a dedicated biological supercomputer region called the fusiform face area.", "Processed by the *fusiform | face area in | your *brain"),
            ("Instead of scanning features one by one, your brain processes the entire face holistically in parallel.", "Scans eyes, nose, and *mouth | all at *once"),
            ("It calculates microscopic spatial distances between pupils, nose tip, and jawline curvature.", "Measures precise *angles | between facial | *features"),
            ("It matches this geometric matrix against tens of thousands of stored memory profiles.", "Compares against *thousands | of stored face | *memories"),
            ("This system is so aggressive that it often sees human faces in clouds, electrical outlets, and car grilles.", "It's why you see *faces | in toast and car | *grilles!"),
            ("Face recognition is the evolutionary superpower that helped humans survive in social tribes.", "Our ancient *superpower | that kept humanity *connected!", 0.3)
        ]
    },
    {
        "id": "noise-canceling-works", "num": 26,
        "question": "How does noise-canceling technology remove sound?",
        "title": "How Do Noise Canceling Headphones REALLY Work? 🎧 #Shorts",
        "pill": "NOISE CANCELING TECH", "pill_color": "#14B8A6", "theme_color": "#14B8A6", "shirt_color": "#0F766E",
        "tags": ["Shorts", "Headphones", "Audio", "Physics", "Tech", "MicroDocs"],
        "sources": ["Audio Engineering Society Journal", "Bose Acoustic Noise Cancelling Whitepaper"],
        "lines": [
            ("How do noise-canceling headphones make roaring airplane jet engines vanish into pure silence?", "How do *headphones | make loud noise | *vanish?"),
            ("They don't just physically block sound; they fight sound waves with more sound waves.", "They use *sound | to destroy *sound!"),
            ("Tiny external microphones on the earcups listen to incoming ambient noise hundreds of times per second.", "Microphones listen to *outside | noise in *real time"),
            ("An onboard digital processor instantly analyzes the exact sound wave's frequency and amplitude.", "Processors calculate the *incoming | sound *wavelength"),
            ("The headphone speakers then generate an exact inverted sound wave, shifting the phase by one hundred and eighty degrees.", "Speakers play an *opposite | mirror-image *wave"),
            ("When the peak of the background noise collides with the valley of the anti-noise wave, destructive interference deletes both.", "The waves *collide | and cancel each other out *completely!"),
            ("You are literally hearing silence created by mathematical physics.", "Hearing pure *silence | created by *physics!", 0.3)
        ]
    },
    {
        "id": "microwave-heats-food", "num": 27,
        "question": "How does a microwave heat food?",
        "title": "How Does a Microwave ACTUALLY Heat Food? 🍲 #Shorts",
        "pill": "HOW MICROWAVE HEATS", "pill_color": "#F97316", "theme_color": "#F97316", "shirt_color": "#C2410C",
        "tags": ["Shorts", "Microwave", "Physics", "Science", "Cooking", "MicroDocs"],
        "sources": ["American Journal of Physics Dielectric Heating", "FDA Microwave Oven Safety"],
        "lines": [
            ("Do microwaves heat food from the inside out like everyone always tells you?", "Does a microwave heat | food from the *inside | *out?"),
            ("The answer is no, and the actual science is far more fascinating.", "The truth is *no | and the science is *wild!"),
            ("Inside the oven, a component called a magnetron generates electromagnetic waves vibrating at two point four gigahertz.", "A magnetron blasts *waves | at 2.4 *billion | cycles"),
            ("Water, sugar, and fat molecules inside your food are polar, meaning they have positive and negative ends.", "Water molecules in *food | have positive and *negative poles"),
            ("As the electric field flips two point four billion times a second, the water molecules violently twist back and forth.", "Molecules twist *billions | of times per *second"),
            ("This molecular friction creates intense thermal heat, warming your food from the outer layers inward.", "Molecular friction *creates | blistering thermal | *heat!"),
            ("That is why thick burritos can be scalding hot outside and freezing in the center.", "Why hot *pockets | are boiling outside and *frozen inside!", 0.3)
        ]
    },
    {
        "id": "self-driving-car-vision", "num": 28,
        "question": "How does a self-driving car see the road?",
        "title": "How Does a Self-Driving Car See the Road? 🚗 #Shorts",
        "pill": "SELF DRIVING VISION", "pill_color": "#6366F1", "theme_color": "#6366F1", "shirt_color": "#4338CA",
        "tags": ["Shorts", "SelfDrivingCars", "AI", "Tesla", "Waymo", "Tech", "MicroDocs"],
        "sources": ["NHTSA Automated Vehicles Comprehensive Plan", "Waymo Safety Report & Sensor Suite"],
        "lines": [
            ("How can a self-driving car navigate bustling city streets without a human touching the wheel?", "How does an *autonomous | car see the *road?"),
            ("Autonomous vehicles use a superhuman fusion of cameras, radar, and laser LiDAR sensors.", "Combines cameras, *radar | and laser *LiDAR"),
            ("Roof-mounted LiDAR units fire millions of invisible laser beams every second, bouncing off surroundings.", "Fires millions of *laser beams | bouncing off every *object"),
            ("This creates a real-time, millimeter-accurate 3D point cloud map of the entire environment.", "Builds an instant *3D point-cloud | of the *world"),
            ("High-resolution AI neural networks classify every pixel into pedestrians, bicycles, lane lines, and stop signs.", "Neural networks *track | pedestrians and *cars"),
            ("The computer predicts where every moving object will be five seconds in the future to choose the safest path.", "Predicts future *movement | five seconds *ahead"),
            ("A self-driving car sees through darkness and rain far better than human eyes ever could.", "Sees through *darkness | and fog with ease!", 0.3)
        ]
    },
    {
        "id": "barcode-scanner-works", "num": 29,
        "question": "How does a barcode tell a scanner what you bought?",
        "title": "How Does a Barcode REALLY Work? 🏷️ #Shorts",
        "pill": "HOW BARCODES WORK", "pill_color": "#EAB308", "theme_color": "#EAB308", "shirt_color": "#A16207",
        "tags": ["Shorts", "Barcode", "Retail", "Technology", "Invention", "MicroDocs"],
        "sources": ["GS1 Barcode Architecture and Standards", "Smithsonian National Museum of American History"],
        "lines": [
            ("When you scan an item at the supermarket checkout, what is the red laser actually reading?", "What is the *red laser | actually reading on a *barcode?"),
            ("Most people think the scanner reads the black bars, but it is actually reading the white spaces.", "The scanner reads the *white spaces | not the black *bars!"),
            ("A red laser sweeps across the code, and a light sensor measures reflected light intensity.", "A red laser sweeps *across | measuring reflected *light"),
            ("Black bars absorb laser light while white spaces reflect it back as a pattern of ones and zeros.", "White spaces *reflect light | as binary *code"),
            ("This binary sequence translates into a twelve-digit Universal Product Code number.", "Translates into a *12-digit | product *number"),
            ("The register instantly looks up that code in the store database to pull up the product name and price.", "Matches the code to the *price | in the *database!"),
            ("That simple pattern of stripes automated the entire global retail economy.", "Stripes of ink that *power | the entire global *economy!", 0.3)
        ]
    },
    {
        "id": "submarine-buoyancy", "num": 30,
        "question": "How does a submarine stay underwater without sinking forever?",
        "title": "How Submarines Dive and Rise Without Sinking ⚓ #Shorts",
        "pill": "SUBMARINE BUOYANCY", "pill_color": "#06B6D4", "theme_color": "#06B6D4", "shirt_color": "#0E7490",
        "tags": ["Shorts", "Submarine", "Navy", "Physics", "Ocean", "MicroDocs"],
        "sources": ["Naval Sea Systems Command Submarine Fundamentals", "Archimedes' Principle of Buoyancy"],
        "lines": [
            ("How does a massive submarine weighing thousands of tons dive into the abyss and come back up safely?", "How does a *submarine | dive without sinking *forever?"),
            ("Submarines master Archimedes' principle of buoyancy using giant chambers called ballast tanks.", "Controls buoyancy using *massive | ballast *tanks"),
            ("On the surface, the ballast tanks are filled with air, making the submarine lighter than displaced water.", "Tanks filled with *air | keep it floating on *top"),
            ("To submerge, large vents open at the bottom, flooding the tanks with heavy seawater until the sub sinks.", "Vents open and *seawater | floods the *tanks"),
            ("To hover at a fixed depth, operators balance water and air to achieve neutral buoyancy.", "Balances air and *water | to hover *weightlessly"),
            ("To surface, high-pressure compressed air blasts all the seawater out, shooting the vessel back upward.", "Compressed air blasts the *water out | shooting it *upward!"),
            ("It is pure mechanical physics operating deep beneath the ocean waves.", "Mastering *physics | deep beneath the *waves!", 0.3)
        ]
    }
]

print(f"Batch 3 ready with {len(BATCH_3)} topics.")
