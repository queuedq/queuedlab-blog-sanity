import { ImageResponse } from '@vercel/og'
import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import type { NextRequest, NextResponse } from 'next/server'
import type { PageConfig } from 'next/types'
import { createClient } from 'next-sanity'

export const config: PageConfig = { runtime: 'experimental-edge' }

import { height, OpenGraphImage, width } from 'components/OpenGraphImage'
import * as demo from 'lib/demo.data'
import { Settings, settingsQuery } from 'lib/sanity.queries'

export default async function og(req: NextRequest, res: NextResponse) {
  const fonts = [
    new URL(
      'public/fonts/pretendard/woff/Pretendard-Regular.subset.woff',
      import.meta.url
    ),
    new URL(
      'public/fonts/pretendard/woff/Pretendard-Bold.subset.woff',
      import.meta.url
    ),
  ]

  const [fontRegular, fontBold] = await Promise.all(
    fonts.map((font) => fetch(font).then((res) => res.arrayBuffer()))
  )

  const { searchParams } = new URL(req.url)

  let title = searchParams.get('title')
  if (!title) {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
    const settings = (await client.fetch<Settings>(settingsQuery)) || {}
    title = settings?.ogImage?.title
  }

  return new ImageResponse(
    <OpenGraphImage title={title || demo.ogImageTitle} />,
    {
      width,
      height,
      fonts: [
        { name: 'Pretendard', data: fontRegular, style: 'normal', weight: 400 },
        { name: 'Pretendard', data: fontBold, style: 'normal', weight: 700 },
      ],
    }
  )
}
