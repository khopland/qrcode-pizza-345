import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {createDeployWebsiteAction} from './deployAction'
import {schemaTypes} from './schemaTypes'
import {menus} from './menus'
import {menuStructure} from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'pizza-345',
  title: 'Pizza 345 · Menus',
  projectId,
  dataset,
  releases: {enabled: false},
  scheduledDrafts: {enabled: false},
  plugins: [structureTool({structure: menuStructure})],
  schema: {
    types: schemaTypes,
    templates: (previous) => [
      ...previous.filter(({schemaType}) => schemaType !== 'menuPage'),
      ...menus.map(([id, routeKey, title]) => ({
        id,
        title,
        schemaType: 'menuPage',
        value: {
          routeKey,
          title,
          enabled: false,
          images: [],
        },
      })),
    ],
  },
  document: {
    actions: (previous, context) => {
      if (context.schemaType === 'menuPage') {
        return [
          ...previous.filter(({action}) => action !== 'delete' && action !== 'duplicate'),
          createDeployWebsiteAction(context.getClient),
        ]
      }
      return previous
    },
    newDocumentOptions: (previous) => previous.filter(({templateId}) =>
      templateId !== 'menuPage' && !menus.some(([id]) => id === templateId),
    ),
  },
})
