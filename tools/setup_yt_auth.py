"""One-time OAuth setup to authorize your YouTube Channel (@MicroDocsOfficial).
Run this once locally to generate the permanent Refresh Token for GitHub Actions.

Prerequisites:
1. Go to Google Cloud Console (console.cloud.google.com).
2. Create a project and enable 'YouTube Data API v3'.
3. Go to 'APIs & Services' -> 'OAuth consent screen':
   - User Type: External
   - Add your Gmail as a Test User.
4. Go to 'Credentials' -> 'Create Credentials' -> 'OAuth client ID':
   - Application type: Desktop app
   - Download the JSON file and save it here as 'client_secrets.json'.
5. Run: python tools/setup_yt_auth.py
"""
import os, sys, json
from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = ['https://www.googleapis.com/auth/youtube.upload']

def main():
    secrets_file = 'client_secrets.json'
    if not os.path.exists(secrets_file):
        print(f"Error: '{secrets_file}' not found.")
        print("Please download your OAuth client JSON from Google Cloud Console and save it as 'client_secrets.json' in this folder.")
        sys.exit(1)

    flow = InstalledAppFlow.from_client_secrets_file(secrets_file, SCOPES)
    creds = flow.run_local_server(port=8080)

    with open(secrets_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        app_info = data.get('installed', data.get('web', {}))
        client_id = app_info.get('client_id')
        client_secret = app_info.get('client_secret')

    print("\n=================== AUTHORIZATION SUCCESSFUL! ===================")
    print("Add these 3 secrets to your GitHub Repository:")
    print("Go to GitHub -> Repo Settings -> Secrets and variables -> Actions -> 'New repository secret'\n")
    print(f"1. YOUTUBE_CLIENT_ID:\n{client_id}\n")
    print(f"2. YOUTUBE_CLIENT_SECRET:\n{client_secret}\n")
    print(f"3. YOUTUBE_REFRESH_TOKEN:\n{creds.refresh_token}\n")
    print("=================================================================\n")

    # Save to local token.json for local testing
    with open('yt_token.json', 'w', encoding='utf-8') as f:
        json.dump({
            'client_id': client_id,
            'client_secret': client_secret,
            'refresh_token': creds.refresh_token
        }, f, indent=2)
    print("Saved local backup to 'yt_token.json' (do not commit this file to git).")

if __name__ == '__main__':
    main()
