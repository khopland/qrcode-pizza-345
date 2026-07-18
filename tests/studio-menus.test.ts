import assert from 'node:assert/strict';
import test from 'node:test';
import {menuKeyForDocumentId} from '../studio/menus.ts';

test('fixed Studio documents derive their locked route key', () => {
  assert.equal(menuKeyForDocumentId('menu-carta'), 'carta');
  assert.equal(menuKeyForDocumentId('drafts.menu-holiday'), 'holiday');
  assert.equal(menuKeyForDocumentId('other-document'), undefined);
});
