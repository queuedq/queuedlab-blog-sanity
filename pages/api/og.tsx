import { ImageResponse } from '@vercel/og'
import { height, OpenGraphImage, width } from 'app/components/OpenGraphImage'
import * as demo from 'lib/demo.data'
import { getSettings } from 'lib/sanity.fetch'
import type { NextRequest, NextResponse } from 'next/server'
import type { PageConfig } from 'next/types'

export const config: PageConfig = { runtime: 'edge' }

export default async function og(req: NextRequest, res: NextResponse) {
  // TODO: Maybe separate this API into another service like AWS Lambda,
  // so that I can use more generous limit?

  // Cannot use many fonts due to Edge Runtime size limit
  const fonts = [
    new URL(
      'public/fonts/pretendard/woff/Pretendard-Bold.subset.woff',
      import.meta.url,
    ),
  ]

  const [fontBold] = await Promise.all(
    fonts.map((font) => fetch(font).then((res) => res.arrayBuffer())),
  )

  const { searchParams } = new URL(req.url)

  let title = searchParams.get('title')
  if (!title) {
    const settings = await getSettings()
    title = settings?.ogImage?.title!
  }

  return new ImageResponse(
    <OpenGraphImage title={title || demo.ogImageTitle} />,
    {
      width,
      height,
      fonts: [
        { name: 'Pretendard', data: fontBold, style: 'normal', weight: 700 },
      ],
    },
  )
}
