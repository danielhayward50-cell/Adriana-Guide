# 🚀 Deployment Guide for Adriana Guide

This guide will help you deploy the Adriana Guide application to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier works great!)
- Your repository pushed to GitHub

## Quick Deploy to Vercel (Recommended)

### Option 1: One-Click Deploy

Click this button to deploy directly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/danielhayward50-cell/Adriana-Guide)

### Option 2: Deploy via Vercel Dashboard

1. **Sign in to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Your Repository**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose `danielhayward50-cell/Adriana-Guide`
   - Click "Import"

3. **Configure Project (Auto-detected)**
   Vercel will automatically detect:
   - ✅ Framework: Vite
   - ✅ Build Command: `npm run build`
   - ✅ Output Directory: `dist`
   - ✅ Install Command: `npm install`

4. **Add Environment Variables (Optional)**
   If you need API keys:
   - Click "Environment Variables"
   - Add variables from `.env.example`:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - etc.

5. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes for deployment
   - Your app will be live! 🎉

## Your Deployment URL

After deployment, you'll get a URL like:
```
https://adriana-guide-xxxxx.vercel.app
```

You can:
- Share this URL with anyone
- View it on your phone
- Access it from anywhere in the world

## Custom Domain (Optional)

To use your own domain:
1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration steps

## Updating Your Deployment

Every time you push to your GitHub repository:
- Vercel will automatically rebuild and redeploy
- Changes go live in 1-2 minutes
- No manual action needed!

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify `npm run build` works locally
- Check Vercel deployment logs

### Environment Variables Not Working
- Ensure variables start with `VITE_` for frontend access
- Redeploy after adding variables
- Check variable names match exactly

### App Not Loading
- Clear browser cache
- Check browser console for errors
- Verify all files deployed correctly

## Local Testing Before Deploy

```bash
# Install dependencies
npm install

# Test build
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:4173` to see how it will look in production.

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify build works locally
3. Check Vercel status page
4. Contact Vercel support (free tier included)

## Mobile Access

Once deployed, you can:
- Open the URL on any mobile device
- Add to home screen (PWA-like)
- Share with friends and family
- Works on iOS, Android, and desktop

---

**Ready to deploy? Click the button above or follow the steps!** 🚀
