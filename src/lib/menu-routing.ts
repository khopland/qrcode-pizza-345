export const MENU_KEYS = ['carta', 'bebidas', 'daily', 'holiday'] as const;
export type MenuKey = (typeof MENU_KEYS)[number];

export const PUBLIC_ROUTES = [
  '/',
  '/carta',
  '/bebidas',
  '/menu',
  '/weekdays',
  '/weekends',
  '/festivo',
] as const;

export type PublicRoute = (typeof PUBLIC_ROUTES)[number];

const routeToKey: Record<Exclude<PublicRoute, '/'>, MenuKey> = {
  '/carta': 'carta',
  '/bebidas': 'bebidas',
  '/menu': 'daily',
  '/weekdays': 'daily',
  '/weekends': 'daily',
  '/festivo': 'holiday',
};

export function menuKeyForRoute(route: string): MenuKey | undefined {
  const normalized = route !== '/' ? route.replace(/\/$/, '') : route;
  return routeToKey[normalized as Exclude<PublicRoute, '/'>];
}

export function publicRouteForMenu(key: MenuKey): Exclude<PublicRoute, '/'> {
  return key === 'daily' ? '/menu' : key === 'holiday' ? '/festivo' : `/${key}`;
}

export function isMenuEnabled(key: MenuKey, enabled: boolean | undefined): boolean {
  return key === 'carta' || key === 'bebidas' || enabled === true;
}
