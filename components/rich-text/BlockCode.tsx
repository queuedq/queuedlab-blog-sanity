import './prism-dracula-patched.css'

import { Refractor, registerLanguage } from 'react-refractor'
import cpp from 'refractor/lang/cpp'
import js from 'refractor/lang/javascript'
import xml from 'refractor/lang/xml-doc'

// TODO: use other syntax highlighter that does not require registering common languages?
registerLanguage(cpp)
registerLanguage(js)
registerLanguage(xml)

export default function BlockCode({ value }) {
  return (
    <Refractor
      language={value.language}
      value={value.code}
      markers={value.highlightedLines}
    />
  )
}
