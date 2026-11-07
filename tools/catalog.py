# -*- coding: utf-8 -*-
"""Master Catalog of high-retention viral 3D explainers for MicroDocs Official.
Directly generated from the official MicroDocs 100 Curiosity Hooks framework.
Covers 50 straight days of automated video creation and YouTube scheduling.
"""
import sys
from pathlib import Path

tools_dir = Path(__file__).parent
if str(tools_dir) not in sys.path:
    sys.path.insert(0, str(tools_dir))

from topics_100 import TOPICS

if __name__ == "__main__":
    print(f"Catalog contains {len(TOPICS)} verified topics from the 100 curiosity hooks PDF.")
    print("Categories:")
    print("  • 001-010: What If...? — Big thought experiments")
    print("  • 011-020: What Happens If...? — Everyday science")
    print("  • 021-030: How Does...? — Hidden systems explained")
    print("  • 031-040: Why...? — Strange things with real answers")
    print("  • 041-050: When / What Would Happen...? — Timeline stories")
    print("  • 051-060: USA Life... — Familiar American curiosities")
    print("  • 061-070: Tech & Internet... — Click-worthy digital questions")
    print("  • 071-080: Space, Earth & Nature... — Visual explainers")
    print("  • 081-090: Money, Business & Consumer... — Useful curiosity")
    print("  • 091-100: History & Mysteries... — Quick context, no fake claims")
