# Report Dashboard

A modern dashboard for viewing and analyzing business reports with AI confidence scoring and source tracing.

## Features

- Interactive report browsing with filters and search
- AI confidence scoring for report reliability
- Source tracing with citations and ratings
- User authentication (viewer/reviewer roles)
- Feedback system for reports
- Dark/light theme toggle
- Request middleware with latency logging and UUID trace headers

## Tech Stack

**Frontend** - Next.js,TypeScript, TailwindCSS, shadcn/ui
**Backend** - Next API , mock json api

## Quick Start

1. **Clone and navigate**

   ```bash
   git clone <repository-url>
   cd report-dashboard/client
   ```

2. **Install and run**

   ```bash
   npm install
   npm run dev
   ```

3. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - Lint code

## Project Structure

```
client/src/
├── app/           # Next.js App Router
├── components/    # React components
├── lib/          # Utilities
└── types/        # TypeScript types
```

## Authentication

Used JWT based auth with hardcoded tokens and roles.

- **Viewer**
- **Reviewer**

## Deployment

Deployed to Vercel
