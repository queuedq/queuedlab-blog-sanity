import { CogIcon } from '@sanity/icons'
import { getTimeZones } from '@vvo/tzdb'
import * as demo from 'lib/demo.data'
import { defineField, defineType } from 'sanity'
import category from 'schemas/category'
import page from 'schemas/page'
import { referenceArray } from 'schemas/utils/utils'

import OpenGraphInput from './OpenGraphInput'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  preview: { select: { title: 'title', subtitle: 'description' } },
  groups: [
    { name: 'general', title: 'General Info' },
    { name: 'header_footer', title: 'Header & Footer' },
  ],
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your blog.',
      title: 'Title',
      type: 'string',
      initialValue: demo.title,
      validation: (rule) => rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'description',
      description: 'Used for the <meta> description tag for SEO.',
      title: 'Descriprion',
      type: 'string',
      initialValue: demo.description,
      validation: (rule) => rule.max(155).required(),
      group: 'general',
    }),
    defineField({
      name: 'domain',
      title: 'Site Domain',
      description:
        'Domain or base URL for the site, without "https://" and trailing \'/\'.',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'timeZone',
      title: 'Time zone',
      description: 'Time zone used throughout the website',
      type: 'string',
      group: 'general',
      options: {
        list: getTimeZones({ includeUtc: true }).map((tz) => {
          return { title: tz.currentTimeFormat, value: tz.name }
        }),
      },
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      description:
        'Used for social media previews when linking to the index page.',
      type: 'object',
      components: {
        input: OpenGraphInput as any,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: demo.ogImageTitle,
        }),
      ],
      group: 'general',
    }),

    // TODO: use orderable document list instead
    // https://www.sanity.io/plugins/orderable-document-list
    defineField({
      name: 'headerPages',
      title: 'Header Page List',
      ...referenceArray(page.name),
      group: 'header_footer',
    }),
    defineField({
      name: 'headerCategories',
      title: 'Header Category List',
      ...referenceArray(category.name),
      group: 'header_footer',
    }),
    defineField({
      name: 'copyrightNotice',
      title: 'Copyright Notice',
      type: 'string',
      group: 'header_footer',
    }),
  ],
})
