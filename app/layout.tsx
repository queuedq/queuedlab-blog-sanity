import './global.css'

import { Roboto_Mono } from 'next/font/google'

import { cn } from '@/lib/utils'

// Switched to CDN instead of local "Pretendard Variable" font
// import '@/public/fonts/pretendard-variable/pretendardvariable-dynamic-subset.css'

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Pretendard Variable */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {/* Maruburi */}
        <link
          rel="stylesheet"
          href="https://hangeul.pstatic.net/hangeul_static/css/maru-buri.css"
        />
      </head>
      {/* Using Google Fonts */}
      {/* https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#with-tailwind-css */}
      {/* Roboto Mono */}
      <body className={cn(robotoMono.variable)}>{children}</body>
    </html>
  )
}
