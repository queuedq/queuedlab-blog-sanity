import { type DocumentDefinition } from 'sanity'
import { type ListItemBuilder, type StructureResolver } from 'sanity/desk'

import { singletonListItem } from './singleton'

export const deskStructure = ({
  singletonTypes,
  primaryTypes,
}: {
  singletonTypes: DocumentDefinition[]
  primaryTypes: DocumentDefinition[]
}): StructureResolver => {
  const hasType = (types: DocumentDefinition[], item: ListItemBuilder) =>
    !!types.find((typeDef) => typeDef.name == item.getId())

  return (S) => {
    // Singleton list items
    const singletonItems = singletonTypes.map((typeDef) =>
      singletonListItem(S, typeDef),
    )

    // Primary list items
    const primaryItems = primaryTypes.map((typeDef) =>
      S.documentTypeListItem(typeDef.name),
    )

    // The default root list items (except custom ones)
    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) =>
        !hasType(singletonTypes, listItem) && !hasType(primaryTypes, listItem),
    )

    return S.list()
      .title('Content')
      .items([
        ...singletonItems,
        singletonItems.length > 0 ? S.divider() : null,
        ...primaryItems,
        primaryItems.length > 0 ? S.divider() : null,
        ...defaultListItems,
      ])
  }
}
