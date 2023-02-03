import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { defineType } from 'sanity'

import YouTubePreview from './components/YouTubePreview'

const icon = (<FontAwesomeIcon icon={faYoutube} size="2xs" style={{ fontSize: '1em' }} />)

export default defineType({
  name: 'youtube',
  type: 'object',
  icon: icon,
  title: 'YouTube',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'YouTube video URL'
    }
  ],
  preview: {
    select: {
      url: 'url',
    },
  },
  components: {
    preview: YouTubePreview,
  },
})
