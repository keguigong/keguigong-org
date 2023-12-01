This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Deployment Configuration

The app has two parts. Part 1 consiststing of static HTML files was deployed on GitHub Pages. Part 2 includes Next.js API routes, so it need Node runtime, I deployed this part on Vercel.

Use the following configration to differ

```ini
SITE_NAME=keguigong.org
SITE_URL=https://keguigong.org
OG_IMAGE_URL=https://blog-keguigong.vercel.app
STATIC_EXPORTS=true
```

Additional environment variables used in the project are listed below

- `CI` An indicator that the code is running in a Continuous Integration environment. Both [GitHub Action](https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables) and [Vercel](https://vercel.com/docs/projects/environment-variables/system-environment-variables#system-environment-variables) use the same variable name.
- `GITHUB_ACTION` The name of the action currently running, or the id of a step.
- `VERCEL` An indicator to show that System Environment Variables have been exposed to your project's Deployments.

## Puppeteer Installation Problem

```json
{
  "framework": "nextjs",
  "installCommand": "yarn install && node node_modules/puppeteer/install.mjs",
  "buildCommand": "bash prebuild.sh && yarn build:sitemap && yarn build"
}
```

```json
{
  "installCommand": "yarn install && cd node_modules/chrome-aws-lambda/ && npm install"
}
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
