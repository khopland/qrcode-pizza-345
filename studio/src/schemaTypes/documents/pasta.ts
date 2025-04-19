import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pasta',
  title: 'pasta',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'navn',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'beskrivelseES',
      title: 'beskrivelse Spansk',
      type: 'text',
      rows: 2,
      validation: rule => rule.required()
    }),
    defineField({
      name: 'beskrivelseEN',
      title: 'beskrivelse Engelsk',
      type: 'text',
      rows: 2,
      validation: rule => rule.required()
    }),
    defineField({
      name: 'pris',
      title: 'pris',
      type: "number",
      validation: rule => rule.required()
    })
  ]
})

