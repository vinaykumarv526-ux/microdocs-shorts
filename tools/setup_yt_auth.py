"""One-time OAuth setup to authorize your YouTube Channel (@MicroDocsOfficial).
Run this command in your terminal:
    python tools/setup_yt_auth.py
"""
import os, sys, json, subprocess
from pathlib import Path
from google_auth_oauthlib.flow import InstalledAppFlow

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

SCOPES = ['https://www.googleapis.com/auth/youtube.upload']

def find_secrets():
    candidates = [
        Path("client_secret.json"),
        Path("client_secrets.json"),
        Path("../client_secret.json"),
        Path("../client_secrets.json"),
        Path(__file__).parent / "client_secret.json",
        Path(__file__).parent.parent / "client_secret.json",
    ]
    for p in candidates:
        if p.exists():
            return p.resolve()
    return None

def main():
    secrets_file = find_secrets()
    if not secrets_file:
        print("Error: 'client_secret.json' not found.")
        print("Please ensure client_secret.json is in your project folder.")
        sys.exit(1)

    print(f"Found credentials: {secrets_file}")
    with open(secrets_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        app_info = data.get('installed', data.get('web', {}))
        client_id = app_info.get('client_id')
        client_secret = app_info.get('client_secret')

    print("\nOpening your browser to authorize @MicroDocsOfficial...")
    print("Please select your Google account and click 'Continue' / 'Allow'.\n")

    flow = InstalledAppFlow.from_client_secrets_file(str(secrets_file), SCOPES)
    # port=0 lets the OS pick an available random port so it never conflicts with port 8080
    creds = flow.run_local_server(port=0, open_browser=True, prompt='consent', access_type='offline')

    refresh_token = creds.refresh_token

    print("\n" + "="*60)
    print("SUCCESSFULLY AUTHORIZED @MicroDocsOfficial!")
    print("="*60)

    # Save local token in both current dir and project root
    root_dir = secrets_file.parent
    token_path = root_dir / "yt_token.json"
    with open(token_path, 'w', encoding='utf-8') as f:
        json.dump({
            'client_id': client_id,
            'client_secret': client_secret,
            'refresh_token': refresh_token
        }, f, indent=2)
    print(f"✓ Saved local token to '{token_path}'")

    # Set GitHub Secrets automatically using gh CLI
    repo = "vinaykumarv526-ux/microdocs-shorts"
    print(f"\nSetting GitHub Secrets in {repo} via gh CLI...")
    try:
        subprocess.run(["gh", "secret", "set", "YOUTUBE_CLIENT_ID", "-b", client_id, "--repo", repo], check=True)
        print("✓ Set YOUTUBE_CLIENT_ID secret")
        subprocess.run(["gh", "secret", "set", "YOUTUBE_CLIENT_SECRET", "-b", client_secret, "--repo", repo], check=True)
        print("✓ Set YOUTUBE_CLIENT_SECRET secret")
        subprocess.run(["gh", "secret", "set", "YOUTUBE_REFRESH_TOKEN", "-b", refresh_token, "--repo", repo], check=True)
        print("✓ Set YOUTUBE_REFRESH_TOKEN secret")
        print("\n🎉 ALL GITHUB SECRETS ARE NOW CONFIGURED AND LIVE IN YOUR REPO!")
    except Exception as e:
        print(f"! Notice: Could not set secrets via gh automatically: {e}")
        print("You can paste these 3 secrets in GitHub -> Settings -> Secrets and variables -> Actions:")
        print(f"YOUTUBE_CLIENT_ID: {client_id}")
        print(f"YOUTUBE_CLIENT_SECRET: {client_secret}")
        print(f"YOUTUBE_REFRESH_TOKEN: {refresh_token}")

if __name__ == '__main__':
    main()
