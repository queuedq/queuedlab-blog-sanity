import { createClient } from '@sanity/client'
// Workaround for KaTeX CSS import
// https://github.com/vercel/next.js/issues/19936
// https://github.com/vercel/next.js/discussions/27953
// https://github.com/bem/next-global-css
import { patchWebpackConfig } from 'next-global-css'

async function fetchSanityRedirects() {
  // https://github.com/vercel/next.js/discussions/15344
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2023-06-21',
    useCdn: true,
  })

  const data = await client.fetch(`*[_type == "settings"][0] { redirects }`)

  const redirects = data.redirects.map((redirect) => {
    return {
      source: `/${redirect.from}`,
      destination: `/${redirect.to}`,
      permanent: redirect.statusCode === '308',
    }
  })

  return redirects
}

/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
      { hostname: 'source.unsplash.com' },
    ],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: process.env.VERCEL_ENV === 'production',
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
  },
  webpack: (config, options) => {
    // SVGR
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    // Global CSS
    patchWebpackConfig(config, options)

    return config
  },
  rewrites: () => [
    {
      source: '/feed.xml',
      destination: '/api/feed',
    },
  ],
  redirects: async () => [
    {
      source: '/api/feed',
      destination: '/feed.xml',
      permanent: true,
    },
    ...(await fetchSanityRedirects()),
  ],
}

export default config
