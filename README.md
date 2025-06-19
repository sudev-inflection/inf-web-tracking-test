# Website Tracking Test Website

A multi-page static website designed for testing website tracking tools and analytics implementations. This website mimics a typical SaaS marketing landing page with various interactive elements and forms that can be used to test tracking functionality.

## Features

- Multi-page static website with a modern SaaS landing page layout
- Blog subdomain with sample articles
- Contact forms and interactive elements for testing tracking
- Responsive design
- Easy local development setup
- Vercel deployment support

## Tech Stack

- Node.js
- Express.js
- EJS templating engine
- Express EJS Layouts
- Express Subdomain for blog routing

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Local Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd website_track_test_website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   This will start the server with nodemon for automatic reloading.

4. Access the website:
   - Main site: http://localhost:3000
   - Blog subdomain: http://blog.localhost:3000

## Project Structure

```
├── api/              # Serverless API routes for Vercel deployment
├── blog/            # Blog content and assets
├── public/          # Static assets (CSS, JS, images)
├── views/           # EJS templates
│   ├── layout.ejs   # Main layout template
│   └── ...          # Other view templates
├── app.local.js     # Local development server
├── package.json     # Project dependencies and scripts
└── vercel.json      # Vercel deployment configuration
```

## Available Pages

- Home (`/`)
- Features (`/features`)
- Pricing (`/pricing`)
- Contact (`/contact`)
- Blog (`/blog`)
  - Getting Started (`/blog/getting-started`)

## Development Workflow

1. The main application logic is in `app.local.js` for local development
2. Templates are located in the `views/` directory
3. Static assets should be placed in the `public/` directory
4. Blog content is managed through the `blog/` directory
5. The server automatically handles subdomain routing for the blog

## Deployment

This project is configured for deployment on Vercel. The deployment uses serverless functions defined in the `api/` directory.

To deploy:

1. Push your changes to the repository
2. Vercel will automatically deploy the changes
3. The site will be available at your configured domain

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

ISC 