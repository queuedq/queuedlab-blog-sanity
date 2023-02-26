import {NextStudio} from 'next-sanity/studio'
import {ReactElement} from 'react'

import config from '../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}

StudioPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>
}
