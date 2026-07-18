[![Netlify Status](https://api.netlify.com/api/v1/badges/5025d18e-eb2d-4cc4-ac5c-25250334c615/deploy-status)](https://app.netlify.com/sites/345pizza/deploys)

# Pizza 345 QR menus

Static Astro menu website with content managed in Sanity Studio. Menu content and images are fetched during the build, so the deployed site does not depend on Sanity at runtime.

## Local development

Requires Node.js 22.12+ and pnpm 11.

```sh
cp .env.example .env
cp studio/.env.example studio/.env.local
pnpm install --frozen-lockfile
pnpm dev
```

The website runs at <http://localhost:4321>.

Run the Studio separately:

```sh
pnpm studio:dev
```

The Studio runs at <http://localhost:3333>.

## Commands

```sh
pnpm build          # Build the static website
pnpm verify         # Check, test, and build everything
pnpm studio:build   # Build the Studio
pnpm studio:deploy  # Deploy the Studio to Sanity
```

## Deployment

Netlify builds the website from the repository. Add these variables in Netlify:

- `PUBLIC_SANITY_PROJECT_ID`
- `PUBLIC_SANITY_DATASET`
- `PUBLIC_SANITY_API_VERSION`
- `PUBLIC_SITE_URL`

The build fails if required Sanity content or images are unavailable, leaving the previous successful Netlify deployment live.

### Deploy button in Sanity Studio

1. Create a Netlify build hook for the `main` branch.
2. In Sanity Manage, create a `POST` webhook using the Netlify hook URL.
3. Use the GROQ filter `_id == "site-deployment-request"` and enable create/update events only.
4. Publish menu changes, then choose **Deploy website** from the document actions.

Keep the Netlify build-hook URL in the Sanity webhook only; do not add it to the repository or environment variables.
