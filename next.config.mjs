// Workaround for KaTeX CSS import
// https://github.com/vercel/next.js/issues/19936
// https://github.com/vercel/next.js/discussions/27953
// https://github.com/bem/next-global-css
import { withGlobalCss } from 'next-global-css'

/** @type {import('next').NextConfig} */
const config = withGlobalCss({
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
})

export default config
