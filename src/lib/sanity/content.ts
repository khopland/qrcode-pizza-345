import {createClient, type QueryParams} from '@sanity/client';
import type {MenuKey} from '../menu-routing';
import {isMenuEnabled, MENU_KEYS} from '../menu-routing';
import {sanityConfig} from './config';
import {ALL_MENUS_QUERY, MENU_BY_KEY_QUERY} from './queries';
import type {MenuPage} from './types';

if (!sanityConfig.projectId || sanityConfig.projectId === 'your-project-id') {
  throw new Error('Missing PUBLIC_SANITY_PROJECT_ID. Sanity content is required to build the site.');
}

const sanityClient = createClient({...sanityConfig, useCdn: false});

async function loadQuery<T>(query: string, params: QueryParams) {
  const response = await sanityClient.fetch<T>(query, params, {
    filterResponse: false,
    perspective: 'published',
    resultSourceMap: false,
    stega: false,
    useCdn: false,
  });
  return response.result;
}

function normalizeMenu(menu: Omit<MenuPage, 'enabled'> & {enabled?: boolean}): MenuPage {
  return {
    ...menu,
    enabled: isMenuEnabled(menu.routeKey, menu.enabled),
    images: (menu.images || []).filter((item) => Boolean(item.image?.asset?._id && item.altText?.trim())),
  };
}

function validatePublishedMenu(menu: MenuPage): MenuPage {
  if (menu.enabled && menu.images.length === 0) {
    throw new Error(`Published Sanity menu "${menu.routeKey}" is enabled but has no valid images.`);
  }
  return menu;
}

export async function getMenu(key: MenuKey): Promise<MenuPage> {
  const result = await loadQuery<MenuPage | null>(MENU_BY_KEY_QUERY, {routeKey: key});
  if (!result) {
    throw new Error(`Missing published Sanity menu document for "${key}".`);
  }
  return validatePublishedMenu(normalizeMenu(result));
}

export async function getAllMenus(): Promise<MenuPage[]> {
  const result = await loadQuery<MenuPage[]>(ALL_MENUS_QUERY, {});
  const byKey = new Map(result.map((menu) => [menu.routeKey, normalizeMenu(menu)]));
  return MENU_KEYS.map((key) => {
    const menu = byKey.get(key);
    if (!menu) {
      throw new Error(`Missing published Sanity menu "${key}".`);
    }
    return validatePublishedMenu(menu);
  });
}
