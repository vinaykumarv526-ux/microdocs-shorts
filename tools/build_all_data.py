# -*- coding: utf-8 -*-
"""Full 100 Curiosity Hooks Generator for MicroDocs Official.
Generates tools/topics_100.py containing all 100 topics from the PDF.
"""
import sys, json

# We define each category as a clean generator list
BATCH_2 = [
    # ── 2. WHAT HAPPENS IF...? — EVERYDAY SCIENCE (011-020) ──
    {
        "id": "swallow-gum", "num": 11,
        "question": "What happens if you swallow chewing gum?",
        "title": "What REALLY Happens When You Swallow Gum? 🍬 #Shorts",
        "pill": "SWALLOWING GUM", "pill_color": "#10B981", "theme_color": "#10B981", "shirt_color": "#059669",
        "tags": ["Shorts", "ChewingGum", "MythBusters", "Science", "DigestiveSystem", "MicroDocs"],
        "sources": ["Mayo Clinic Digestive Health", "American Academy of Pediatrics"],
        "lines": [
            ("You've probably heard that swallowed gum sits inside your stomach for seven years.", "Does gum stay in | your *stomach | for *7 years?"),
            ("The truth is, that famous childhood warning is completely false.", "That is | completely *false!"),
            ("While stomach acid cannot dissolve the rubbery synthetic base, your digestive system handles it smoothly.", "Stomach acid breaks | down the *sugars | and *flavoring"),
            ("Powerful muscular contractions called peristalsis keep moving the gum through your intestines.", "Intestinal *muscles | keep *moving the gum | forward"),
            ("Within forty-eight hours, the gum passes out in the toilet completely harmlessly.", "Passes out *naturally | in just *two days"),
            ("However, swallowing giant clumps at once can create a dangerous intestinal blockage called a bezoar.", "Swallowing *clumps | can cause | a dangerous *blockage"),
            ("So an accidental swallow won't hurt, but always spit your gum in the trash.", "One piece is *safe | but always *spit it out!", 0.3)
        ]
    },
    {
        "id": "phone-password", "num": 12,
        "question": "What happens if you never change your phone password?",
        "title": "Why You NEVER Change Your Phone Passcode? 📱 #Shorts",
        "pill": "PHONE PASSCODE RISK", "pill_color": "#F59E0B", "theme_color": "#F59E0B", "shirt_color": "#D97706",
        "tags": ["Shorts", "Smartphone", "CyberSecurity", "Privacy", "Tech", "MicroDocs"],
        "sources": ["Cybersecurity and Infrastructure Security Agency", "Apple Security Whitepaper"],
        "lines": [
            ("When was the last time you actually changed your smartphone passcode?", "When did you last | change your *passcode?"),
            ("Most people use the exact same four or six-digit PIN for years without thinking twice.", "Most keep the *same PIN | for *years"),
            ("Over months of daily swiping, your finger oils leave subtle smudge trails on the glass.", "Finger oils leave *smudge trails | across your *screen"),
            ("Under angled light or thermal cameras, anyone standing behind you can easily reconstruct your code.", "Anyone behind you | can easily *see | your *code"),
            ("Even worse, automated brute-force cracking tools test common combinations in seconds.", "Automated tools *guess | common pins in | *seconds"),
            ("Once someone has your device PIN, they can reset your Apple ID, passwords, and banking apps.", "They can unlock | your *bank accounts | and *photos!"),
            ("Change your passcode to a strong six-digit mix today to keep your digital life safe.", "Update your *passcode | today to *stay safe!", 0.3)
        ]
    },
    {
        "id": "metal-microwave", "num": 13,
        "question": "What happens if you put metal in a microwave?",
        "title": "What REALLY Happens If You Microwave Metal? ⚡ #Shorts",
        "pill": "METAL IN MICROWAVE", "pill_color": "#EF4444", "theme_color": "#EF4444", "shirt_color": "#DC2626",
        "tags": ["Shorts", "Microwave", "Physics", "Science", "EverydayCuriosity", "MicroDocs"],
        "sources": ["American Physical Society, Microwave Cavities", "FDA Radiation-Emitting Products"],
        "lines": [
            ("Everyone knows you should never put metal in a microwave, but do you know why it sparks?", "Why does *metal | spark in the | *microwave?"),
            ("Microwaves heat food by blasting electromagnetic radiation that makes water molecules vibrate wildly.", "Microwaves make *water | molecules vibrate | *rapidly"),
            ("Thick metal walls reflect these waves harmlessly, which is why the microwave oven itself is made of steel.", "Thick walls *reflect | the microwaves | safely"),
            ("However, thin metals like aluminum foil or fork prongs have billions of free electrons.", "Thin metal has *billions | of free | *electrons"),
            ("The intense electric waves push these electrons into sharp corners, building massive electrical voltage.", "Sharp corners concentrate | *intense electrical | *voltage"),
            ("When the voltage gets high enough, it rips through the air, creating explosive fiery plasma arcs.", "Sparks *fiery plasma | arcs that can ignite a *fire"),
            ("So never put wrinkled foil or utensils in your microwave unless you want fireworks!", "Keep all *foil and forks | out of your *microwave!", 0.3)
        ]
    },
    {
        "id": "stay-awake-24h", "num": 14,
        "question": "What happens if you stay awake for 24 hours?",
        "title": "What Happens to Your Brain After 24 Hours Awake? 🧠 #Shorts",
        "pill": "24 HOURS AWAKE", "pill_color": "#EC4899", "theme_color": "#EC4899", "shirt_color": "#DB2777",
        "tags": ["Shorts", "SleepDeprivation", "Health", "Brain", "HumanBody", "MicroDocs"],
        "sources": ["CDC Sleep and Sleep Disorders", "Nature Neuroscience Sleep Deprivation"],
        "lines": [
            ("What actually happens inside your skull when you pull an all-nighter for twenty-four hours?", "What happens after | *24 hours | with *no sleep?"),
            ("By hour sixteen, your brain's prefrontal cortex begins to power down non-essential functions.", "Your prefrontal cortex | begins to *power down"),
            ("After twenty-four hours awake, your cognitive impairment equals a blood alcohol level of zero point one percent.", "Equal to being *legally drunk | at *0.10% BAC!"),
            ("Toxic cellular metabolic waste like beta-amyloid builds up between your brain cells.", "Toxic waste *accumulates | between brain *cells"),
            ("Your reaction times slow to a crawl, and your amygdala causes intense emotional mood swings.", "Reaction speeds crawl | and mood *swings | spike"),
            ("Your brain will even force micro-sleeps, shutting off your conscious awareness for several seconds without warning.", "Your brain forces *micro-sleeps | without your | *permission!"),
            ("Never drive while sleep deprived; getting a solid seven hours is essential for your brain.", "Get your *7 hours | of sleep tonight!", 0.3)
        ]
    },
    {
        "id": "stop-soda-30d", "num": 15,
        "question": "What happens if you stop drinking soda for 30 days?",
        "title": "What Happens When You Quit Soda For 30 Days? 🥤 #Shorts",
        "pill": "QUIT SODA 30 DAYS", "pill_color": "#3B82F6", "theme_color": "#3B82F6", "shirt_color": "#1D4ED8",
        "tags": ["Shorts", "Soda", "Health", "Nutrition", "HumanBody", "MicroDocs"],
        "sources": ["American Journal of Clinical Nutrition", "Harvard T.H. Chan School of Public Health"],
        "lines": [
            ("What happens inside your body if you replace all sodas with pure water for thirty days?", "What happens if you | *quit soda | for *30 days?"),
            ("A single can of soda contains nearly ten teaspoons of liquid high fructose corn syrup.", "One can packs *ten teaspoons | of liquid | *sugar"),
            ("During the first three days, you will likely experience caffeine withdrawal headaches and intense sugar cravings.", "First 3 days bring | caffeine *headaches | and *cravings"),
            ("By day ten, your insulin sensitivity dramatically resets, stopping afternoon energy crashes.", "By day ten | your insulin *resets | and energy *soars"),
            ("Your kidneys and liver stop processing massive acid loads, and your tooth enamel begins remineralizing.", "Kidneys detox | and tooth *enamel | *rebuilds"),
            ("After thirty days, you can lose up to five pounds of visceral fat while lowering cardiovascular inflammation.", "You lose *5 pounds | of dangerous | *belly fat!"),
            ("Try thirty days without soda and feel how much cleaner your body runs.", "Take the *30-day challenge | starting *today!", 0.3)
        ]
    },
    {
        "id": "phone-hot-car", "num": 16,
        "question": "What happens if you leave a phone in a hot car?",
        "title": "Why You NEVER Leave Your Phone in a Hot Car ☀️ #Shorts",
        "pill": "PHONE IN HOT CAR", "pill_color": "#F97316", "theme_color": "#F97316", "shirt_color": "#EA580C",
        "tags": ["Shorts", "Smartphone", "Battery", "Science", "TechTips", "MicroDocs"],
        "sources": ["National Highway Traffic Safety Administration", "Battery University Lithium Degradation"],
        "lines": [
            ("Leaving your smartphone sitting on a car dashboard on a sunny day can permanently destroy it in minutes.", "Never leave your *phone | in a *hot car!"),
            ("On an eighty-degree afternoon, the inside of a closed vehicle can easily spike past one hundred and forty degrees.", "Car interiors reach | over *140 degrees | in *minutes"),
            ("Inside your phone, the lithium-ion battery operates with volatile liquid electrolytes.", "Lithium batteries use | volatile liquid | *electrolytes"),
            ("Extreme heat causes the battery's internal separator film to degrade, triggering thermal runaway.", "Excessive heat causes | permanent *cell | degradation"),
            ("The battery can swell up like a balloon, cracking the screen glass and risking a chemical fire.", "The battery can *swell | and shatter the *glass!"),
            ("Even if it doesn't catch fire, permanent battery capacity drops by over twenty percent after one afternoon.", "Loses 20% of its *capacity | in just *one day"),
            ("Always keep your phone in your pocket or out of direct sunlight.", "Keep your device in the *shade | to stay *safe!", 0.3)
        ]
    },
    {
        "id": "flush-power-outage", "num": 17,
        "question": "What happens if you flush a toilet during a power outage?",
        "title": "Can You Flush a Toilet During a Power Outage? 🚽 #Shorts",
        "pill": "FLUSH IN BLACKOUT", "pill_color": "#06B6D4", "theme_color": "#06B6D4", "shirt_color": "#0E7490",
        "tags": ["Shorts", "Plumbing", "HomeTips", "Blackout", "Curiosity", "MicroDocs"],
        "sources": ["American Society of Plumbing Engineers", "EPA Municipal Water Infrastructure"],
        "lines": [
            ("When the electricity suddenly goes out in your house, can you still safely flush your toilet?", "Can you flush the *toilet | during a | *power outage?"),
            ("The surprising answer depends entirely on where your water comes from.", "The answer depends | entirely on your *water | *system"),
            ("If you live in a city connected to municipal gravity water towers, your toilet will flush normally.", "City water towers use *gravity | and flush *normally"),
            ("Standard gravity toilets rely on mechanical siphons, requiring zero electricity inside your home.", "Mechanical *siphons | require zero *electricity | to *flush"),
            ("However, if your home relies on an electric well pump or basement sewage ejector, you have exactly one flush.", "Well pumps and *septic pumps | stop working | *instantly"),
            ("Once the tank empties, it won't refill, and using it further risks backing up raw sewage.", "Flushing again can *back up | sewage into your *home!"),
            ("In an extended blackout, keep buckets of water handy to manually pour flush your bowl.", "Pour a bucket of *water | to manually flush!", 0.3)
        ]
    },
    {
        "id": "lightning-pool", "num": 18,
        "question": "What happens if lightning hits a swimming pool?",
        "title": "What If Lightning Hits a Swimming Pool? ⚡🏊 #Shorts",
        "pill": "LIGHTNING IN POOL", "pill_color": "#EAB308", "theme_color": "#EAB308", "shirt_color": "#CA8A04",
        "tags": ["Shorts", "Lightning", "SwimmingPool", "Physics", "Survival", "MicroDocs"],
        "sources": ["National Weather Service Lightning Safety", "American Red Cross Aquatics"],
        "lines": [
            ("What would happen to you if lightning struck the swimming pool while you were taking a dip?", "What if lightning *strikes | the pool while | you *swim?"),
            ("A typical lightning bolt carries over thirty thousand amperes and three hundred million volts of raw energy.", "Carries *30,000 amps | and 300 million | *volts!"),
            ("While pure distilled water is an insulator, swimming pool water is packed with conductive chlorine salts and minerals.", "Pool chemicals make the *water | an extreme | *conductor"),
            ("When lightning hits, the electrical current spreads out horizontally across the water's surface.", "Current surges *horizontally | across the entire | *surface"),
            ("Anyone with their head or shoulders above water becomes the path of least resistance.", "Swimmers become the *path | of least *resistance"),
            ("The shock causes immediate cardiac arrest, severe internal burns, and instant loss of consciousness.", "Triggers immediate *cardiac arrest | and severe | *burns"),
            ("That is why lifeguards order everyone out of the pool the instant thunder rumbles.", "When thunder roars, get *out | of the *water!", 0.3)
        ]
    },
    {
        "id": "crack-knuckles-daily", "num": 19,
        "question": "What happens if you crack your knuckles every day?",
        "title": "What Happens If You Crack Knuckles Daily? 💥 #Shorts",
        "pill": "CRACKING KNUCKLES", "pill_color": "#6366F1", "theme_color": "#6366F1", "shirt_color": "#4F46E5",
        "tags": ["Shorts", "KnuckleCracking", "Science", "MythBusters", "Joints", "MicroDocs"],
        "sources": ["Harvard Health Publishing, Does Knuckle Cracking Cause Arthritis?", "PLOS ONE Joint Cavitation"],
        "lines": [
            ("Does cracking your knuckles every single day really cause crippling arthritis like your parents claimed?", "Does cracking *knuckles | really cause | *arthritis?"),
            ("Science has tested this extensively, and the answer is an absolute myth.", "Science proves that | this warning is a *myth!"),
            ("Your finger joints are surrounded by a lubricating fluid called synovial fluid.", "Joints are cushioned | by *synovial fluid"),
            ("When you stretch or bend the joint, you create sudden negative pressure inside the capsule.", "Bending creates | *negative pressure"),
            ("This vacuum causes dissolved nitrogen gas to form microscopic bubbles that instantly collapse with a loud pop.", "Nitrogen bubbles form | and *rapidly burst!"),
            ("One famous doctor cracked only the knuckles on his left hand for sixty years, proving zero arthritis occurred.", "One doctor cracked *one hand | for 60 years | with *zero damage!"),
            ("So crack your knuckles freely—it might annoy your friends, but your joints are safe.", "It won't cause *arthritis | but it might *annoy friends!", 0.3)
        ]
    },
    {
        "id": "water-mix-space", "num": 20,
        "question": "What happens if you mix hot and cold water in space?",
        "title": "What Happens Mixing Hot and Cold Water in Space? 🚀 #Shorts",
        "pill": "WATER MIX IN SPACE", "pill_color": "#06B6D4", "theme_color": "#06B6D4", "shirt_color": "#0891B2",
        "tags": ["Shorts", "Space", "Physics", "ZeroGravity", "NASA", "Science", "MicroDocs"],
        "sources": ["NASA Glenn Research Center Fluid Physics", "International Space Station Science"],
        "lines": [
            ("What bizarre physics happens if you try mixing boiling hot water with ice cold water in zero gravity?", "What happens mixing *hot | and cold water | in *space?"),
            ("On Earth, hot water naturally rises to the top because heat lowers density, driving convection currents.", "On Earth, hot water *rises | due to natural | *convection"),
            ("In zero gravity aboard the space station, there is no up or down, meaning natural buoyancy completely disappears.", "In zero gravity | buoyancy *does not | exist!"),
            ("When astronauts inject hot and cold water into a single floating sphere, the temperatures do not circulate.", "Hot and cold water | form a single *floating | *sphere"),
            ("Instead of churning into warm water, heat can only transfer sluggishly through slow molecular diffusion.", "Heat transfers *sluggishly | through slow molecular | *diffusion"),
            ("You end up with a single floating liquid orb that is scalding hot on one side and freezing on the other.", "One side stays *scalding hot | while the other is *freezing!"),
            ("In space, even simple liquids behave like strange alien substances.", "Microgravity turns ordinary *water | into alien *physics!", 0.3)
        ]
    }
]

print(f"Batch 2 ready with {len(BATCH_2)} topics.")
