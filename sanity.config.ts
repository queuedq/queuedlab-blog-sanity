/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */
import { StreamLanguage } from '@codemirror/language'
import { codeInput } from '@sanity/code-input'
import { colorInput } from '@sanity/color-input'
import { visionTool } from '@sanity/vision'
import { apiVersion, dataset, previewSecretId, projectId } from 'lib/sanity.api'
import { previewDocumentNode } from 'plugins/previewPane'
import { productionUrl } from 'plugins/productionUrl'
import { settingsPlugin, settingsStructure } from 'plugins/settings'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { latexInput } from 'sanity-plugin-latex-input'
import { media } from 'sanity-plugin-media'
import * as schemas from 'schemas'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Next.js Blog with Sanity.io'

const config = defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: Object.values(schemas),
  },
  plugins: [
    deskTool({
      structure: settingsStructure(schemas.settings),
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      defaultDocumentNode: previewDocumentNode({ apiVersion, previewSecretId }),
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    settingsPlugin({ type: schemas.settings.name }),
    // Add the "Open preview" action
    productionUrl({
      apiVersion,
      previewSecretId,
      types: [schemas.post.name, schemas.settings.name],
    }),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),

    // Media browser
    media(),

    // Schema / Input
    codeInput({
      codeModes: [
        {
          name: 'c',
          loader: () =>
            import('@codemirror/legacy-modes/mode/clike').then(({ c }) =>
              StreamLanguage.define(c)
            ),
        },
        {
          name: 'cpp',
          loader: () => import('@codemirror/lang-cpp').then(({ cpp }) => cpp()),
        },
      ],
    }),
    latexInput(),
    colorInput(),
  ],
})

export default config
