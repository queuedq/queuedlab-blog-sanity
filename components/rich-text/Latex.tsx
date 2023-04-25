import 'katex/dist/katex.min.css'

import { BlockMath, InlineMath } from 'react-katex'

export default function Latex({ value, isInline }) {
  return isInline ? (
    <InlineMath>{value.body}</InlineMath>
  ) : (
    <BlockMath>{value.body}</BlockMath>
  )
}
