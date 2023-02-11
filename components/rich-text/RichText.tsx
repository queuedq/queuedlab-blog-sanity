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

import Figure from './Figure'
import YouTubeEmbed from './YouTubeEmbed'

const components = {
  types: {
    figure: Figure,
    youtube: YouTubeEmbed
  }
}

export default function RichText({ content }) {
  // console.log(JSON.stringify(content))

  return (
    <PortableText value={content} components={components} />
  )
}
