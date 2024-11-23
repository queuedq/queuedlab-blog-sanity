import { at, defineMigration, setIfMissing, unset } from 'sanity/migrate'

const from = 'oldFieldName'
const to = 'newFieldName'

export default defineMigration({
  title: 'Use image schema type (not object) for figures',

  migrate: {
    node(node: any, path, context) {
      if (node._type === 'figure' && node.image) {
        return [
          at('asset', setIfMissing(node.image.asset)),
          at('image', unset()),
        ]
      }
    },
  },
})
