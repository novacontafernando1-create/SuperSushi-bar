import test from 'node:test';
import assert from 'node:assert/strict';

// Node.js localStorage mock for testing environment if needed
if (typeof globalThis.localStorage === 'undefined') {
  const store = new Map<string, string>();
  globalThis.localStorage = {
    getItem: (key: string) => store.get(key) || null,
    setItem: (key: string, val: string) => {
      store.set(key, val);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => store.clear(),
    key: (i: number) => Array.from(store.keys())[i] || null,
    length: store.size,
  } as Storage;
}

if (typeof globalThis.sessionStorage === 'undefined') {
  const store = new Map<string, string>();
  globalThis.sessionStorage = {
    getItem: (key: string) => store.get(key) || null,
    setItem: (key: string, val: string) => {
      store.set(key, val);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => store.clear(),
    key: (i: number) => Array.from(store.keys())[i] || null,
    length: store.size,
  } as Storage;
}

import { storeService } from '../services/storeService';
import { authService } from '../services/authService';

test('storeService initializes default products and categories', () => {
  storeService.resetToDefault();
  const products = storeService.getProducts();
  const categories = storeService.getCategories();

  assert.ok(products.length >= 6, 'Should have at least 6 initial products');
  assert.ok(categories.length >= 6, 'Should have at least 6 initial categories');

  const superDragon = products.find((p) => p.name.includes('Super Dragon Roll'));
  assert.ok(superDragon, 'Super Dragon Roll should exist');
  assert.equal(superDragon?.price, 88.0);
});

test('storeService adds new product and updates audit log', () => {
  const initialCount = storeService.getProducts().length;
  const newProduct = storeService.addProduct({
    name: 'Uramaki Ebi Imperial',
    slug: 'uramaki-ebi-imperial',
    internalCode: 'SS-URM-01',
    category: 'Combos do Dragão',
    shortDescription: 'Camarão rosa empanado com tarê cítrico',
    fullDescription: 'Camarão crocante envolto em arroz akazu com cobertura de ovas',
    ingredients: 'Camarão, Arroz, Alga, Ovas',
    portion: '8 peças',
    prepTime: '15 min',
    allergens: ['Frutos do Mar'],
    price: 64.0,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    isActive: true,
    isFeatured: false,
  });

  const updatedProducts = storeService.getProducts();
  assert.equal(updatedProducts.length, initialCount + 1);

  const found = storeService.getProductById(newProduct.id);
  assert.ok(found);
  assert.equal(found?.name, 'Uramaki Ebi Imperial');

  const logs = storeService.getAuditLogs();
  assert.ok(logs.some((l) => l.target === 'Uramaki Ebi Imperial'));
});

test('storeService updates product pricing and toggles availability', () => {
  const products = storeService.getProducts();
  const target = products[0];

  const updated = storeService.updateProduct(target.id, {
    price: 99.0,
    promotionalPrice: 89.0,
  });

  assert.equal(updated?.price, 99.0);
  assert.equal(updated?.promotionalPrice, 89.0);

  const currentActive = updated!.isActive;
  storeService.toggleProductActive(target.id);
  const toggled = storeService.getProductById(target.id);
  assert.equal(toggled?.isActive, !currentActive);
});

test('storeService safeguard deletion migrates products to destination category', () => {
  // Add a test category
  const testCat = storeService.addCategory({
    name: 'Categoria Teste',
    slug: 'categoria-teste',
    description: 'Teste de migração',
    displayOrder: 99,
    icon: 'star',
    isActive: true,
    isQuickNav: false,
    isHighlight: false,
  });

  // Add dish linked to this category
  const linkedDish = storeService.addProduct({
    name: 'Prato a Ser Migrado',
    slug: 'prato-migrado',
    internalCode: 'SS-MIG-01',
    category: testCat.name,
    shortDescription: 'Teste',
    fullDescription: 'Teste completo',
    ingredients: 'Teste',
    portion: '4 peças',
    prepTime: '10 min',
    allergens: [],
    price: 50.0,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    isActive: true,
    isFeatured: false,
  });

  assert.equal(linkedDish.category, 'Categoria Teste');

  // Delete category with migration to 'Especiais da Casa'
  storeService.deleteCategory(testCat.id, 'Especiais da Casa');

  const migratedDish = storeService.getProductById(linkedDish.id);
  assert.equal(migratedDish?.category, 'Especiais da Casa');

  const categories = storeService.getCategories();
  assert.ok(!categories.some((c) => c.id === testCat.id));
});

test('authService authenticates master credentials correctly and rejects wrong passwords', () => {
  authService.logout();
  assert.equal(authService.isAuthenticated(), false);

  const fail = authService.login('chef.curadoria@supershushi.bar', 'WrongPassword123');
  assert.equal(fail.success, false);
  assert.equal(authService.isAuthenticated(), false);

  const success = authService.login(
    'chef.curadoria@supershushi.bar',
    'OmakaseMaster2025#',
    true
  );
  assert.equal(success.success, true);
  assert.equal(authService.isAuthenticated(), true);

  const user = authService.getCurrentUser();
  assert.equal(user?.name, 'Chef Hiroshi');
  assert.equal(user?.role, 'Master Admin');

  authService.logout();
  assert.equal(authService.isAuthenticated(), false);
});
