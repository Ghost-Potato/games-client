This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

COMP2068G Game Library Client

This is a Next.js project bootstrapped with create-next-app.
Installing the Next.js React CLI and Creating the project using default options

npx create-next-app@latest {appName} --yes

Getting Started

First, run the development server:

npm run dev

Open http://localhost:3000 with your browser to see the result.
Lesson 10 Commands & Notes

Vercel deployment fails due to a package conflict in eslint-config-next, a package used to validation JS/TS. We need to update to the newest version:

npm i --save-dev eslint-config-next@latest
npm audit fix

Then we need to push again to GitHub to trigger a Vercel redeployment.

Vercel Pre-Render Bug Fix During Build:

// skip pre-rendering to fix vercel build bug. On list page that fetches data automatically

export const dynamic = 'force-dynamic';

