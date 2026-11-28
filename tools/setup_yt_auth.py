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

SCOPES = [
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube'
]

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
    root_dir = secrets_file.parent
    with open(secrets_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        app_info = data.get('installed', data.get('web', {}))
        client_id = app_info.get('client_id')
        client_secret = app_info.get('client_secret')

    print("\nOpening your browser to authorize @MicroDocsOfficial...")
    print("Please select your Google account and click 'Continue' / 'Allow'.\n")

    import wsgiref.simple_server
    from google_auth_oauthlib.flow import _RedirectWSGIApp, _ExclusiveWSGIServer, _WSGIRequestHandler
    import webbrowser

    flow = InstalledAppFlow.from_client_secrets_file(str(secrets_file), SCOPES)
    wsgi_app = _RedirectWSGIApp("✓ Authorization complete! You can close this tab and return to Antigravity.")
    local_server = wsgiref.simple_server.make_server(
        'localhost',
        8080,
        wsgi_app,
        server_class=_ExclusiveWSGIServer,
        handler_class=_WSGIRequestHandler
    )

    flow.redirect_uri = f"http://localhost:{local_server.server_port}/"
    auth_url, _ = flow.authorization_url(prompt='consent', access_type='offline')

    url_file = root_dir / "auth_url.txt" if 'root_dir' in locals() else Path("auth_url.txt")
    with open(url_file, "w", encoding="utf-8") as f:
        f.write(auth_url)

    print(f"OAUTH_URL_START\n{auth_url}\nOAUTH_URL_END\n", flush=True)

    try:
        webbrowser.open(auth_url)
    except Exception:
        pass

    print("Waiting for you to complete authorization in your browser on localhost:8080...", flush=True)
    local_server.handle_request()

    auth_response = wsgi_app.last_request_uri.replace("http", "https")
    flow.fetch_token(authorization_response=auth_response)
    creds = flow.credentials

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
