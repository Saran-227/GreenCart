# GreenCart - Eco-Friendly Shopping Platform

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/ssaranjeet227-gmailcoms-projects/v0-general-inquiry)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/WZEYkyuCZ6O)

## Overview

GreenCart is a sustainable shopping platform that helps users make eco-conscious purchasing decisions through AI-powered product analysis, group shopping features, and a marketplace for pre-loved eco-friendly items.

## Features

- 🛍️ **Eco-Friendly Product Catalog** - Curated selection of sustainable products
- 🤖 **AI-Powered Analysis** - Detailed sustainability analysis using Google Gemini AI
- 👥 **Group Shopping** - Reduce carbon footprint through community orders
- ♻️ **EcoMarketplace** - Buy and sell pre-loved eco-friendly items
- 📊 **User Dashboard** - Track your environmental impact and rewards
- 🌱 **Sustainability Scoring** - AI-generated eco-friendliness ratings

## Environment Setup

### Required Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
GEMINI_API_KEY=your_google_gemini_api_key_here
\`\`\`

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key (starts with "AIzaSy")
5. Add it to your `.env.local` file

## Security

- ✅ **API keys are stored server-side only** - Never exposed to client
- ✅ **Environment variables are gitignored** - Safe for public repositories
- ✅ **Secure error handling** - No sensitive information leaked in errors
- ✅ **Server-side AI processing** - All API calls happen on the backend

## Deployment

Your project is live at:

**[https://vercel.com/ssaranjeet227-gmailcoms-projects/v0-general-inquiry](https://vercel.com/ssaranjeet227-gmailcoms-projects/v0-general-inquiry)**

### Deployment Environment Variables

When deploying to Vercel, make sure to add the environment variable:

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add `GEMINI_API_KEY` with your API key value
4. Redeploy the application

## Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
\`\`\`

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/WZEYkyuCZ6O](https://v0.dev/chat/projects/WZEYkyuCZ6O)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Important Notes

- Never commit `.env.local` or any files containing API keys
- The `.gitignore` file is configured to exclude all environment files
- API keys are only accessible on the server-side for security
- All AI analysis happens securely on the backend

## Contributing

When contributing to this project:

1. Never include API keys in your commits
2. Use environment variables for all sensitive configuration
3. Test the application without committing sensitive data
4. Follow the existing security patterns
