# Vercel Deployment Guide (100% Free)

Deploying your project to Vercel is fast, free, and includes automated updates whenever you change your code.

## 1. Prepare your Project
Ensure all your changes are pushed to a **GitHub repository**.

## 2. Connect to Vercel
- Go to [vercel.com](https://vercel.com/) and sign up with your GitHub account.
- Click **Add New** > **Project**.
- Import your repository.

## 3. Configure Build Settings
Vercel should detect Angular automatically, but double-check these settings:
- **Framework Preset**: `Angular`
- **Build Command**: `npm run build`
- **Output Directory**: `dist/advogada-site/browser` (Wait for a build to confirm the path)

## 4. Deploy
Click **Deploy**. Vercel will build your app and provide you with a production URL (e.g., `advogada-site.vercel.app`).

## 5. (Optional) Custom Domain
You can add your own domain (e.g., `www.conceicaolopes.pt`) in the **Project Settings** > **Domains** section.

> [!NOTE]
> Vercel's Hobby plan is 100% free for personal/small professional projects and includes a free SSL certificate.
