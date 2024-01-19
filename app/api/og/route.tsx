import { ImageResponse } from '@vercel/og'

import { height, OpenGraphImage, width } from '@/components/OpenGraphImage'
import * as demo from '@/sanity/lib/demo'
import { loadSettings } from '@/sanity/loader/loadQuery'

export async function GET(req: Request) {
  // // TODO: Maybe separate this API into another service like AWS Lambda,
  // // so that I can use more generous limit?

  // // Cannot use many fonts due to Edge Runtime size limit
  // const fonts = [
  //   new URL(
  //     'public/fonts/pretendard/woff/Pretendard-Bold.subset.woff',
  //     import.meta.url,
  //   ),
  // ]

  // const [fontBold] = await Promise.all(
  //   fonts.map((font) => fetch(font).then((res) => res.arrayBuffer())),
  // )

  const { searchParams } = new URL(req.url)

  let title = searchParams.get('title')
  if (!title) {
    const { data: settings } = await loadSettings()
    title = settings?.ogImage?.title!
  }

  return new ImageResponse(
    <OpenGraphImage title={title || demo.ogImageTitle} />,
    {
      width,
      height,
      // fonts: [
      //   { name: 'Pretendard', data: fontBold, style: 'normal', weight: 700 },
      // ],
    },
  )
}
