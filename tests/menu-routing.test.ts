import assert from 'node:assert/strict';
import test from 'node:test';
import {
  isMenuEnabled,
  menuKeyForRoute,
  publicRouteForMenu,
} from '../src/lib/menu-routing.ts';

test('fixed public routes map to their protected menu documents', () => {
  assert.equal(menuKeyForRoute('/carta'), 'carta');
  assert.equal(menuKeyForRoute('/bebidas/'), 'bebidas');
  assert.equal(menuKeyForRoute('/menu'), 'daily');
  assert.equal(menuKeyForRoute('/weekdays'), 'daily');
  assert.equal(menuKeyForRoute('/weekends'), 'daily');
  assert.equal(menuKeyForRoute('/festivo'), 'holiday');
  assert.equal(menuKeyForRoute('/owner-created-route'), undefined);
});

test('document keys have stable primary routes', () => {
  assert.equal(publicRouteForMenu('daily'), '/menu');
  assert.equal(publicRouteForMenu('holiday'), '/festivo');
});

test('Carta and Bebidas cannot be disabled while optional menus follow their toggle', () => {
  assert.equal(isMenuEnabled('carta', false), true);
  assert.equal(isMenuEnabled('bebidas', undefined), true);
  assert.equal(isMenuEnabled('daily', false), false);
  assert.equal(isMenuEnabled('daily', true), true);
  assert.equal(isMenuEnabled('holiday', false), false);
  assert.equal(isMenuEnabled('holiday', true), true);
});
