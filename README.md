# Where in the world?

A single-page app for browsing countries of the world: search them by name, filter by region and open a detail page with native name, currencies, languages and clickable border countries. Built with React, TypeScript and Redux Toolkit on top of the [REST Countries](https://restcountries.com) v5 API.

**Live demo:** https://dmitriyyaroshchuk.github.io/countries/

![Home page preview](docs/design/desktop-preview.jpg)

## Features

- List of all 250+ countries with flag, population, region and capital
- Search by country name and filter by region (Africa, Americas, Asia, Europe, Oceania)
- "Load more" pagination: 12 cards at a time, reset on every new search or filter
- Detail page with native name, sub region, top level domain, currencies, languages and border countries
- Navigation between neighbouring countries straight from the detail page
- Light and dark theme
- Responsive layout from mobile to desktop
- Loading and error states

## Tech stack

| Area | Tools |
|---|---|
| UI | React 19, styled-components, Radix UI (Select), react-icons |
| Language | TypeScript |
| State | Redux Toolkit, React Redux (thunks) |
| Routing | React Router 7 |
| HTTP | axios |
| Tooling | Vite 7, ESLint 9 |
| Deploy | GitHub Actions, GitHub Pages |

## Getting started

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/DmitriyYaroshchuk/countries.git
cd countries
npm ci
```

### API key

REST Countries v5 requires a free API key.

1. Sign up at [restcountries.com](https://restcountries.com/sign-up) and copy your key from the **API Keys** page.
2. Open **Edit** on the key and add `localhost` to **CORS allowed origins** (hostnames only, comma-separated). Without it the browser gets `403 Forbidden`.
3. Create `.env.local` in the project root (see `.env.example`):

   ```bash
   VITE_RESTCOUNTRIES_API_KEY=rc_live_your_key_here
   ```

4. Start the dev server and open http://localhost:5173:

   ```bash
   npm run dev
   ```

The free plan allows 1,000 requests per month. The home page uses 3 requests (100 countries per page), a detail page uses 1–2.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check with `tsc -b` and build for production into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint over the project |

## Project structure

```
countries/
├── .github/workflows/deploy.yml   # Build and deploy to GitHub Pages
├── docs/design/                   # Design mockups (desktop/mobile, light/dark)
├── public/                        # Static files (favicon)
├── src/
│   ├── assets/styles/             # Global CSS and theme variables
│   ├── components/                # UI components (Card, List, Search, Loader, ...)
│   ├── engine/
│   │   ├── config.ts              # API base URL, endpoints, axios client
│   │   ├── adaptV5Country.ts      # Maps API v5 responses to app types
│   │   ├── transformCountryData.ts
│   │   ├── routers.ts             # Route table
│   │   ├── slices/                # Redux slice
│   │   ├── store/                 # Store and typed hooks
│   │   └── thunks/                # Async data loading
│   ├── pages/                     # HomePage, Details, NotFound
│   ├── types/                     # Shared TypeScript types
│   └── main.tsx                   # Entry point
├── index.html
└── vite.config.ts
```

## Deployment

The app is deployed to GitHub Pages by [GitHub Actions](.github/workflows/deploy.yml) on every push to `main`.
