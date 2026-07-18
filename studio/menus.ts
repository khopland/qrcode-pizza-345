export const menus = [
  ['menu-carta', 'carta', 'Food menu (Carta)'],
  ['menu-bebidas', 'bebidas', 'Drinks (Bebidas)'],
  ['menu-daily', 'daily', 'Daily menu'],
  ['menu-holiday', 'holiday', 'Holiday menu'],
] as const

export const menuKeyForDocumentId = (id: unknown) =>
  menus.find(([documentId]) => documentId === String(id).replace(/^drafts\./, ''))?.[1]
