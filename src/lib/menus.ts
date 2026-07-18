import { getEntry } from "astro:content";

export type MenuId = "carta" | "bebidas" | "daily" | "holiday";

const permanentMenus = new Set<MenuId>(["carta", "bebidas"]);

export async function getMenu(id: MenuId) {
  const entry = await getEntry("menus", id);

  if (!entry) throw new Error(`Missing menu content: ${id}`);
  if (permanentMenus.has(id) && entry.data.enabled !== undefined) {
    throw new Error(`${id} must not have an enabled switch`);
  }

  const enabled = permanentMenus.has(id) || entry.data.enabled === true;
  if (enabled && entry.data.images.length === 0) {
    throw new Error(`${id} cannot be enabled without at least one image`);
  }

  return { ...entry.data, enabled };
}
