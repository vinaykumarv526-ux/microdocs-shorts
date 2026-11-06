# 🚀 YouTube API & GitHub Actions Automation Guide

This repository publishes 3D viral shorts to your YouTube channel (**@MicroDocsOfficial**) **twice every day (11:30 AM & 6:30 PM EST)** automatically in the cloud via GitHub Actions — without your laptop running!

---

## 🔑 Step 1: Get YouTube API Credentials (3 Minutes)

1. Open [Google Cloud Console](https://console.cloud.google.com/) and create a new project (e.g., `MicroDocs-Automation`).
2. Go to **APIs & Services** > **Library**, search for **YouTube Data API v3**, and click **Enable**.
3. Go to **APIs & Services** > **OAuth consent screen**:
   - Choose **External** and click **Create**.
   - App name: `MicroDocs Publisher`
   - User support email: Select your email.
   - Developer contact info: Enter your email.
   - Click **Save and Continue**.
   - Under **Test Users**, click **+ ADD USERS**, enter the Gmail address that manages `@MicroDocsOfficial`, and click **Save**.
4. Go to **APIs & Services** > **Credentials**:
   - Click **+ CREATE CREDENTIALS** > **OAuth client ID**.
   - Application type: **Desktop app**.
   - Name: `MicroDocs Desktop Client`.
   - Click **Create**.
   - Click **Download JSON** on the popup, rename the downloaded file to `client_secrets.json`, and place it in the root of this repository.

---

## ⚡ Step 2: Generate Your Permanent Refresh Token

Open your terminal in this repository and run:

```bash
python tools/setup_yt_auth.py
```

* A browser window will open asking you to sign in with your YouTube account.
* Approve the permissions.
* The script will output **3 credentials**:
  1. `YOUTUBE_CLIENT_ID`
  2. `YOUTUBE_CLIENT_SECRET`
  3. `YOUTUBE_REFRESH_TOKEN`

---

## ☁️ Step 3: Add Secrets to GitHub

1. Create a GitHub repository and push your project:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```
2. On your GitHub repository page:
   - Go to **Settings** > **Secrets and variables** > **Actions**.
   - Click **New repository secret** and add the 3 secrets from Step 2:
     - `YOUTUBE_CLIENT_ID`
     - `YOUTUBE_CLIENT_SECRET`
     - `YOUTUBE_REFRESH_TOKEN`

---

## 📅 Step 4: Fully Autonomous Cloud Publishing

* **GitHub Actions Workflow** is located at [`.github/workflows/daily_shorts.yml`](.github/workflows/daily_shorts.yml).
* **Schedule**:
  - **Slot 1**: 11:30 AM EST (15:30 UTC)
  - **Slot 2**: 6:30 PM EST (22:30 UTC)
* **Queue**: Items are managed in [`queue.json`](queue.json). Whenever a job runs, it automatically uploads the next ready video and marks it as uploaded.
* **Manual Trigger**: You can also go to the **Actions** tab on GitHub, select **Automated Twice-Daily YouTube Shorts Publisher**, and click **Run workflow** anytime to post immediately!
