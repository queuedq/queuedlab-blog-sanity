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

import YouTubeEmbed from './YouTubeEmbed'

const components = {
  types: {
    'youtube': YouTubeEmbed
  }
}

export default function RichText({ content }) {
  return (
    <PortableText value={content} components={components} />
  )
}
