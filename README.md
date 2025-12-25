# Adriana-Guide

A comprehensive guide to Colombian culture, news, and community.

## Features

- 🏠 **Home** - Welcome page with quick navigation
- 🎬 **Reels Hub** - Trending Colombian content and culture
- 📰 **News Hub** - Latest news from Colombia and around the world
- 💬 **Debates** - Join conversations on important topics
- 📊 **Surveys** - Share your opinion on various topics
- 📈 **Tendencies** - Explore what's trending in Colombian culture
- 👥 **Community Hub** - Connect with fellow Colombians

### Quick Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Fill in your API keys and configuration in `.env`.
3. Restart the dev server.

Note: Do NOT commit `.env` to the repository. Use `.env.example` for placeholders and instructions.

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/danielhayward50-cell/Adriana-Guide)

**Option 1: Deploy via GitHub (Recommended)**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Sign in with GitHub
4. Click "Add New Project"
5. Import your repository
6. Vercel will auto-detect the Vite framework and configure the build
7. Click "Deploy"

**Option 2: Deploy via Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

The app will be available at a URL like: `https://your-project.vercel.app`

**Environment Variables on Vercel:**
- Add your environment variables in Vercel dashboard under Project Settings → Environment Variables
- Use the same variable names from `.env.example`

## Development

This project uses:
- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- ESLint for code quality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.