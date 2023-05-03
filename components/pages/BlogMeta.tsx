import { Settings } from 'lib/sanity.queries'
import { feedUrl } from 'lib/urls'
import Head from 'next/head'

export default function BlogMeta({ settings }: { settings: Settings }) {
  // `next/head` does not support subcomponent,
  // so we need to wrap the components in <Head> instead of <>.
  // https://github.com/vercel/next.js/issues/9126#issuecomment-543783543
  return (
    <Head>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />
      {/* RSS feed */}
      <link
        type="application/atom+xml"
        rel="alternate"
        href={feedUrl(settings.domain)}
        title={settings.title}
      />
    </Head>
  )
}
