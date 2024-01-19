import './prism-dracula-patched.css'

import Refractor from 'react-refractor'
import cpp from 'refractor/lang/cpp'
import js from 'refractor/lang/javascript'

// TODO: use other syntax highlighter that does not require registering common languages?
Refractor.registerLanguage(cpp)
Refractor.registerLanguage(js)

export default function BlockCode({ value }) {
  return (
    <Refractor
      language={value.language}
      value={value.code}
      markers={value.highlightedLines}
    />
  )
}
