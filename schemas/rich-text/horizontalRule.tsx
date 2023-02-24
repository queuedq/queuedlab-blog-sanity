import { RemoveIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'horizontalRule',
  type: 'object',
  icon: RemoveIcon,
  title: 'Horizontal Rule',
  fields: [
    // at least one field required, so add hidden temp field
    defineField({
      name: 'temp',
      type: 'boolean',
      hidden: () => true,
    }),
  ],
  components: {
    preview: () => <hr />,
  },
})
