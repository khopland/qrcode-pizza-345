import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pizza',
  title: 'pizza',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'name',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'category',
      title: 'category',
      type: 'string',
      options: {
        list: ["LOS CLASICÓS", "3|4[5 PIZZAS"]
      },
      validation: rule => rule.required()
    }),
    defineField({
      name: 'description',
      title: 'description',
      type: 'text',
      rows: 2,
      validation: rule => rule.required()
    }),
    defineField({
      name: 'englishDescription',
      title: 'description english',
      type: 'text',
      rows: 2,
      validation: rule => rule.required()
    }),
    defineField({
      name: "price",
      type: "object",
      validation: rule => rule.required(),
      fields: [
        defineField({
          name: 'thinCrust',
          title: 'thin crust',
          type: "number",
          validation: rule => rule.required()
        }),
        defineField({
          name: 'thinCrustLarge',
          title: 'thin crust large',
          type: "number",
          validation: rule => rule.required()
        }),
        defineField({
          name: 'panPizza1p',
          title: 'pan pizza 1p',
          type: "number"
        }),
        defineField({
          name: 'panPizza2p',
          title: 'pan pizza 2p',
          type: "number"
        }),
        defineField({
          name: 'panPizza5p',
          title: 'pan pizza 4-5p',
          type: "number"
        }),
      ]
    }),
  ]
})
