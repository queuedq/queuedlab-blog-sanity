// This plugin is responsible for adding a “Preview” tab to the document pane
// You can add any React component to `S.view.component` and it will be rendered in the pane
// and have access to content in the form in real-time.
// It's part of the Studio's “Structure Builder API” and is documented here:
// https://www.sanity.io/docs/structure-builder-reference

import { SanityDocument } from 'sanity'
import { DefaultDocumentNodeResolver } from 'sanity/structure'
import { Iframe } from 'sanity-plugin-iframe-pane'

import { draftUrl, postUrl } from '@/app/utils/urls'
import authorType from '@/sanity/schemas/author'
import postType from '@/sanity/schemas/post'

import AuthorAvatarPreviewPane from './AuthorAvatarPreviewPane'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) => {
  switch (schemaType) {
    case authorType.name:
      return S.document().views([
        S.view.form(),
        // Author preview tab
        S.view
          .component(({ document }) => (
            <AuthorAvatarPreviewPane
              name={document.displayed.name as any}
              picture={document.displayed.picture as any}
            />
          ))
          .title('Preview'),
      ])

    case postType.name:
      return S.document().views([
        S.view.form(),
        // Post preview tab
        // https://www.sanity.io/docs/previewing-content-in-sanity-studio
        // https://www.sanity.io/plugins/iframe-pane
        S.view
          .component(Iframe)
          .options({
            url: {
              preview: getPreviewUrl,
              draftMode: draftUrl,
            },
            reload: { button: true },
          })
          .title('Preview'),
      ])

    default:
      return null
  }
}

function getPreviewUrl(doc: SanityDocument) {
  return postUrl((doc?.slug as any)?.current)
}
