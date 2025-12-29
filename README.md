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

🚀 **Ready to deploy?** See the complete [Deployment Guide](DEPLOYMENT.md) for detailed instructions!

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/danielhayward50-cell/Adriana-Guide)

**Steps:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Sign in with GitHub
4. Click "Add New Project" → Import your repository
5. Click "Deploy" (Vercel auto-detects Vite configuration)

Your app will be live at: `https://your-project.vercel.app`

**Check if ready to deploy:**
```bash
./check-deployment.sh
```

**For complete deployment instructions, troubleshooting, and mobile setup, see [DEPLOYMENT.md](DEPLOYMENT.md)**

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