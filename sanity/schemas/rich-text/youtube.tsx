import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { defineField, defineType } from 'sanity'

import YouTubePreview from '../components/preview/YouTubePreview'

const icon = (
  <FontAwesomeIcon icon={faYoutube} size="2xs" style={{ fontSize: '1em' }} />
)

export default defineType({
  name: 'youtube',
  type: 'object',
  icon: icon,
  title: 'YouTube',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
    }),
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
