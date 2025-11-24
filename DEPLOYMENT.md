# Deployment Guide for Render

This guide will help you deploy the Fantasy Scottish League app to Render.

## Prerequisites

- A GitHub account
- A Render account (sign up at https://render.com)
- Your code pushed to a GitHub repository

## Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your code is pushed to GitHub and includes:
- `package.json` with all dependencies
- `server.js` as the entry point
- All necessary files (views, public assets, etc.)

### 2. Create a PostgreSQL Database on Render

1. Log in to your Render dashboard
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: `fantasy-db` (or your preferred name)
   - **Database**: `fantasy`
   - **User**: `fantasy_user` (or auto-generated)
   - **Plan**: Free
4. Click "Create Database"
5. **Important**: Copy the "Internal Database URL" - you'll need this

### 3. Create a Web Service

1. In Render dashboard, click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `fantasy-scottish-league` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (or specify if your app is in a subdirectory)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 4. Set Environment Variables

In your Web Service settings, go to "Environment" and add:

- **NODE_ENV**: `production`
- **SESSION_SECRET**: Generate a strong random string (you can use: `openssl rand -hex 32`)
- **DATABASE_URL**: Paste the Internal Database URL from your PostgreSQL database
- **PORT**: Leave empty (Render sets this automatically)

Optional email settings (if you want real emails):
- **SMTP_HOST**: Your SMTP server
- **SMTP_PORT**: Usually `587` or `465`
- **SMTP_USER**: Your SMTP username
- **SMTP_PASS**: Your SMTP password
- **SMTP_SECURE**: `true` for port 465, `false` for port 587
- **MAIL_FROM**: Your sender email address

### 5. Deploy

1. Click "Create Web Service"
2. Render will automatically:
   - Install dependencies
   - Build your app
   - Create database tables
   - Start your service

### 6. Verify Deployment

1. Wait for the build to complete (usually 2-5 minutes)
2. Check the logs for any errors
3. Visit your app URL (Render provides a `.onrender.com` URL)
4. Test:
   - User registration
   - Login
   - Team creation
   - PDF generation

## Troubleshooting

### Database Connection Issues

- Verify `DATABASE_URL` is set correctly
- Check that the database is running (not paused)
- Ensure you're using the "Internal Database URL" (not external)

### Build Failures

- Check build logs for specific errors
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Session Issues

- Ensure `SESSION_SECRET` is set and is a strong random string
- Check that the session table was created in PostgreSQL

### Image Loading Issues

- Player photos are loaded from Scottish FA website
- If images fail, check network connectivity
- Images will fall back to placeholders if unavailable

## Free Tier Limitations

- **Web Service**: Spins down after 15 minutes of inactivity (cold starts)
- **Database**: 90 days of data retention on free tier
- **Build Time**: Limited build minutes per month

## Upgrading (Optional)

For production use, consider upgrading to:
- **Starter Plan** ($7/month): Always-on service, no cold starts
- **Standard Database** ($20/month): Better performance and reliability

## Continuous Deployment

Render automatically deploys when you push to your connected branch. To disable:
- Go to your service settings
- Toggle "Auto-Deploy" off

## Monitoring

- View logs in real-time in the Render dashboard
- Set up alerts for service failures
- Monitor database usage and performance

