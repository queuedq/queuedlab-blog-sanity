import { PortableTextComponent as PTReact } from '@portabletext/react'
import { PortableTextComponent as PTHtml } from '@portabletext/to-html'
import { PortableTextObject as PTObject } from 'sanity'

import BlockCode from './BlockCode'
import Figure, { FigureRss } from './Figure'
import Latex, { LatexRss } from './Latex'
import YouTubeEmbed from './YoutubeEmbed'

const components = {
  types: {
    code: BlockCode,
    fig: Figure,
    figure: Figure,
    horizontalRule: () => <hr />,
    latex: Latex,
    youtube: YouTubeEmbed,
  },
}
export default components

export async function getRssComponents() {
  // Use dynamic import to avoid "You're importing a component that imports react-dom/server" error
  // https://github.com/vercel/next.js/issues/43810
  const { renderToStaticMarkup } = await import('react-dom/server')

  const str = (Element: PTReact<PTObject>): PTHtml<PTObject> => {
    return (props) => renderToStaticMarkup(<Element {...props} />)
  }

  // https://github.com/portabletext/to-html?tab=readme-ov-file#available-components
  return {
    types: {
      code: str(BlockCode),
      fig: str(FigureRss),
      figure: str(FigureRss),
      horizontalRule: str(() => <hr />),
      latex: str(LatexRss),
      youtube: str(YouTubeEmbed),
    },
    unknownType: str(({ value, isInline }) => {
      return isInline ? (
        <span>{`[${value._type}]`}</span>
      ) : (
        <div>{`[${value._type}]`}</div>
      )
    }),
  }
}
