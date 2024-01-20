import 'katex/dist/katex.min.css'

import { BlockMath, InlineMath } from 'react-katex'

export default function Latex({ value, isInline }) {
  return isInline ? (
    <InlineMath>{value.body}</InlineMath>
  ) : (
    <BlockMath>{value.body}</BlockMath>
  )
}

export function LatexRss({ value, isInline }) {
  return isInline ? (
    <span>{`$${value.body}$`}</span>
  ) : (
    <div>{`$$${value.body}$$`}</div>
  )
}
