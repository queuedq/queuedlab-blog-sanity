/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */
import { StreamLanguage } from '@codemirror/language'
import { codeInput } from '@sanity/code-input'
import { colorInput } from '@sanity/color-input'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { latexInput } from 'sanity-plugin-latex-input'
import { media } from 'sanity-plugin-media'

import { draftUrl } from '@/app/utils/urls'
import { apiVersion, dataset, projectId } from '@/sanity/lib/api'
import { defaultDocumentNode } from '@/sanity/plugins/previewPane'
import { rootStructure } from '@/sanity/plugins/rootStructure'
import { singletonPlugin } from '@/sanity/plugins/singleton'
import StudioLayoutPlugin from '@/sanity/plugins/StudioLayoutPlugin'
import * as schemas from '@/sanity/schemas'

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
  studio: {
    components: { layout: StudioLayoutPlugin },
  },
  plugins: [
    structureTool({
      structure: rootStructure({
        singletonTypes: [schemas.settings],
        primaryTypes: [schemas.post, schemas.page, schemas.category],
      }),
      defaultDocumentNode, // Responsible for adding a “Preview” tab to the document pane
    }),
    presentationTool({
      previewUrl: {
        draftMode: { enable: draftUrl },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([schemas.settings.name]),
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
              StreamLanguage.define(c),
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
