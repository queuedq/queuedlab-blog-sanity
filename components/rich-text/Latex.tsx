import 'katex/dist/katex.min.css'
import './katex-tweaks.css'

import { BlockMath, InlineMath } from 'react-katex'

export default function Latex({ value, isInline }) {
  return isInline ? (
    <InlineMath>{value.body}</InlineMath>
  ) : (
    <p>
      <BlockMath>{value.body}</BlockMath>
    </p>
  )
}

export function LatexRss({ value, isInline }) {
  return isInline ? (
    <span>{`$${value.body}$`}</span>
  ) : (
    <div>{`$$${value.body}$$`}</div>
  )
}
