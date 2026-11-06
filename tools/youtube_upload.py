"""Uploads an MP4 video to YouTube via YouTube Data API v3.
Reads credentials from GitHub Actions secrets / environment variables or local yt_token.json.
"""
import argparse, os, sys, json, time

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

import google.oauth2.credentials
import googleapiclient.discovery
import googleapiclient.errors
from googleapiclient.http import MediaFileUpload

SCOPES = ['https://www.googleapis.com/auth/youtube.upload']

def get_authenticated_service():
    client_id = os.environ.get('YOUTUBE_CLIENT_ID')
    client_secret = os.environ.get('YOUTUBE_CLIENT_SECRET')
    refresh_token = os.environ.get('YOUTUBE_REFRESH_TOKEN')

    if not (client_id and client_secret and refresh_token):
        if os.path.exists('yt_token.json'):
            with open('yt_token.json', 'r', encoding='utf-8') as f:
                d = json.load(f)
                client_id = d.get('client_id')
                client_secret = d.get('client_secret')
                refresh_token = d.get('refresh_token')

    if not (client_id and client_secret and refresh_token):
        raise ValueError("Missing YouTube credentials. Set YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, and YOUTUBE_REFRESH_TOKEN environment variables or run tools/setup_yt_auth.py.")

    creds = google.oauth2.credentials.Credentials(
        token=None,
        refresh_token=refresh_token,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=client_id,
        client_secret=client_secret,
        scopes=SCOPES
    )

    return googleapiclient.discovery.build('youtube', 'v3', credentials=creds)

def upload_video(file_path, title, description, tags=None, privacy="public", publish_at=None, category_id="28"):
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Video file not found: {file_path}")

    youtube = get_authenticated_service()

    body = {
        'snippet': {
            'title': title[:100],
            'description': description,
            'tags': tags or ['Shorts', 'Science', '3DAnimation', 'MicroDocs'],
            'categoryId': category_id
        },
        'status': {
            'privacyStatus': 'private' if publish_at else privacy,
            'selfDeclaredMadeForKids': False
        }
    }

    if publish_at:
        body['status']['publishAt'] = publish_at

    media = MediaFileUpload(file_path, chunksize=1024*1024*4, resumable=True, mimetype='video/mp4')
    request = youtube.videos().insert(
        part=','.join(body.keys()),
        body=body,
        media_body=media
    )

    print(f"Uploading '{title}' ({os.path.getsize(file_path) / (1024*1024):.1f} MB)...")
    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            print(f"Uploaded {int(status.progress() * 100)}%")

    video_id = response.get('id')
    print(f"Upload complete! Video URL: https://youtu.be/{video_id}")
    return video_id

def main():
    parser = argparse.ArgumentParser(description="Upload YouTube Short via YouTube Data API v3")
    parser.add_argument('--video', required=True, help="Path to MP4 video")
    parser.add_argument('--title', required=True, help="Video title")
    parser.add_argument('--description', default="", help="Video description")
    parser.add_argument('--tags', default="Shorts,Science,Anatomy,WhatIf,MicroDocs", help="Comma-separated tags")
    parser.add_argument('--privacy', default="public", choices=['public', 'private', 'unlisted'])
    parser.add_argument('--publish_at', default=None, help="ISO 8601 UTC date string to schedule publish")

    args = parser.parse_args()
    tags = [t.strip() for t in args.tags.split(',') if t.strip()]

    upload_video(
        file_path=args.video,
        title=args.title,
        description=args.description,
        tags=tags,
        privacy=args.privacy,
        publish_at=args.publish_at
    )

if __name__ == '__main__':
    main()
