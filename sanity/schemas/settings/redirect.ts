import { EnterRightIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'redirect',
  title: 'Redirect',
  icon: EnterRightIcon,
  type: 'object',
  fields: [
    defineField({
      name: 'from',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'to',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'statusCode',
      type: 'string',
      options: {
        list: [
          { title: 'Permanent (308)', value: '308' },
          { title: 'Temporary (307)', value: '307' },
        ],
      },
      initialValue: '308',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      from: 'from',
      to: 'to',
      statusCode: 'statusCode',
    },
    prepare(selection) {
      const { from, to, statusCode } = selection
      return {
        title: from,
        subtitle: `(${statusCode}) ${to}`,
      }
    },
  },
})
