/**
 * This plugin contains all the logic for setting up the singletons (such as `Settings`)
 */

import { type DocumentDefinition } from 'sanity'
import { type StructureBuilder } from 'sanity/desk'

export const singletonPlugin = (types: string[]) => {
  return {
    name: 'singletonPlugin',
    document: {
      // Hide 'Singletons (such as Settings)' from new document options
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === 'global') {
          return prev.filter(
            (templateItem) => !types.includes(templateItem.templateId)
          )
        }

        return prev
      },
      // Removes the "duplicate" action on the Singletons (such as Settings)
      actions: (prev, { schemaType }) => {
        if (types.includes(schemaType)) {
          return prev.filter(({ action }) => action !== 'duplicate')
        }

        return prev
      },
    },
  }
}

// A singleton not using `documentListItem`, eg no built-in preview
export const singletonListItem = (
  S: StructureBuilder,
  typeDef: DocumentDefinition
) =>
  S.listItem()
    .title(typeDef.title)
    .icon(typeDef.icon)
    .child(
      S.editor()
        .id(typeDef.name)
        .schemaType(typeDef.name)
        .documentId(typeDef.name)
    )
