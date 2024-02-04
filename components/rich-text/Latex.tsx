import 'katex/dist/katex.min.css'
import './katex-tweaks.css'

import { BlockMath, InlineMath } from 'react-katex'

export default function Latex({ value, isInline }) {
  return isInline ? (
    <InlineMath>{value.body}</InlineMath>
  ) : (
    // overflow-*   : For horizontal scroll
    //                (See https://katex.org/docs/issues.html#css-customization)
    // -mx-5 px-5   : For full width container in mobile
    // py-1         : To provide natural margin
    // For scroll margin at end, see katex-tweaks.css
    <div className="my-6 py-1 -mx-5 px-5 overflow-x-auto overflow-y-hidden">
      <BlockMath>{value.body}</BlockMath>
    </div>
  )
}

export function LatexRss({ value, isInline }) {
  return isInline ? (
    <span>{`$${value.body}$`}</span>
  ) : (
    <div>{`$$${value.body}$$`}</div>
  )
}
