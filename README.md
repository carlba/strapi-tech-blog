# Strapi Tech Blog

A modern tech blog built with Next.js and Strapi CMS, featuring HeroUI components and the official Strapi SDK.

## Quick Start

```bash
# Terminal 1 - Start the backend
cd backend
npm install
npm run develop

# Terminal 2 - Start the frontend  
cd frontend
npm install
npm run dev
```

Then:
1. Visit http://localhost:1337/admin to create your admin user
2. Configure API permissions in Strapi (Settings > Users & Permissions Plugin > Roles > Public)
3. Visit http://localhost:3000 to see your blog

## Project Structure

This project consists of two main parts:

- **Backend**: Strapi CMS (`/backend`)
- **Frontend**: Next.js application (`/frontend`)

## Features

- 📝 Create and manage blog articles
- 👤 Author profiles
- 🏷️ Category organization
- 🖼️ Image uploads for cover images and avatars
- 📱 Responsive design with Tailwind CSS and HeroUI components
- 🚀 Server-side rendering with Next.js
- 🔌 Official Strapi SDK for type-safe API calls

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 6.x or higher

### Backend Setup (Strapi)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Strapi development server:
   ```bash
   npm run develop
   ```

4. The Strapi admin panel will be available at http://localhost:1337/admin

5. Create your first admin user when prompted

6. Configure content permissions:
   - Go to Settings > Users & Permissions Plugin > Roles > Public
   - Enable find and findOne permissions for Articles, Authors, and Categories

### Frontend Setup (Next.js)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file (if not already created):
   ```bash
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   ```

4. Start the Next.js development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser

## Content Types

### Article
- Title
- Slug (auto-generated from title)
- Content (rich text)
- Excerpt
- Cover Image
- Author (relation to Author)
- Categories (relation to Category)
- Published Date

### Author
- Name
- Email
- Bio
- Avatar

### Category
- Name
- Slug (auto-generated from name)
- Description

## Development

### Backend Development

The Strapi backend runs on port 1337 by default. You can customize this in `backend/config/server.ts`.

### Frontend Development

The Next.js frontend runs on port 3000 by default. It fetches data from the Strapi API at runtime.

### Docker Development

You can also run both services using Docker Compose:

```bash
docker-compose up
```

**Note:** When using Docker Compose, the frontend uses `http://backend:1337` for internal container communication. The services are still accessible from your host machine at `http://localhost:3000` (frontend) and `http://localhost:1337` (backend).

## Deployment

### Backend Deployment

Strapi can be deployed to various platforms:
- Railway
- Heroku
- DigitalOcean
- AWS
- Self-hosted

Refer to the [Strapi deployment documentation](https://docs.strapi.io/dev-docs/deployment) for detailed instructions.

### Frontend Deployment

The Next.js frontend can be deployed to:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Self-hosted

Update the `NEXT_PUBLIC_STRAPI_URL` environment variable to point to your production Strapi instance.

## License

UNLICENSED

