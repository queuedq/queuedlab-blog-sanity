'use client'
/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import { PortableText } from '@portabletext/react'

import BlockCode from './BlockCode'
import Figure from './Figure'
import Latex from './Latex'
import YouTubeEmbed from './YoutubeEmbed'

const components = {
  types: {
    code: BlockCode,
    figure: Figure,
    horizontalRule: () => <hr />,
    latex: Latex,
    youtube: YouTubeEmbed,
  },
}

export default function RichText({ content }) {
  // console.log(content)

  return <PortableText value={content} components={components} />
}
