import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import {menus} from './menus'

const menuItem = (S: StructureBuilder, id: string, title: string) =>
  S.listItem()
    .id(id)
    .title(title)
    .child(
      S.document()
        .schemaType('menuPage')
        .documentId(id)
        .initialValueTemplate(id)
        .title(title),
    )

export const menuStructure: StructureResolver = (S) =>
  S.list()
    .title('Pizza 345 content')
    .items(menus.map(([id, , title]) => menuItem(S, id, title)))
