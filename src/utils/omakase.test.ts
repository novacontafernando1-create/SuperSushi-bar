import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  filterMenuItems, 
  calculateTastingPrice, 
  calculateTrayTotals, 
  validateReservation,
  calculateEstimatedReservationPrice,
  formatCurrency 
} from './omakase';
import { MENU_ITEMS, TASTING_STEPS } from '../data/menuData';
import { ReservationData, TrayItem } from '../types';

test('filterMenuItems filters by category accurately', () => {
  const torched = filterMenuItems(MENU_ITEMS, 'torched-nigiri', 'all');
  assert.ok(torched.length > 0);
  assert.ok(torched.every(item => item.category === 'torched-nigiri'));
});

test('filterMenuItems filters by Ki Level accurately', () => {
  const divineItems = filterMenuItems(MENU_ITEMS, 'all', 'divine');
  assert.ok(divineItems.length > 0);
  assert.ok(divineItems.every(item => item.kiLevel === 'divine'));
});

test('filterMenuItems searches by name, japanese name and ingredients', () => {
  const otoroSearch = filterMenuItems(MENU_ITEMS, 'all', 'all', 'otoro');
  assert.ok(otoroSearch.length >= 1);
  assert.ok(otoroSearch.some(item => item.name.includes('Otoro')));

  const ingredientSearch = filterMenuItems(MENU_ITEMS, 'all', 'all', 'caviar');
  assert.ok(ingredientSearch.length >= 1);
});

test('calculateTastingPrice accumulates base price, option addons, and sake pairing', () => {
  const basePrice = 140;
  const selected = ['opt-spoon-caviar', 'opt-duo-otoro-gold']; // +18 +28 = +46
  
  const priceNoSake = calculateTastingPrice(basePrice, selected, TASTING_STEPS, false);
  assert.equal(priceNoSake, 140 + 18 + 28);

  const priceWithSake = calculateTastingPrice(basePrice, selected, TASTING_STEPS, true);
  assert.equal(priceWithSake, 140 + 18 + 28 + 45);
});

test('calculateTrayTotals calculates subtotal, service charge, and item quantities', () => {
  const sampleItems: TrayItem[] = [
    {
      id: 'tray-1',
      item: MENU_ITEMS[0], // $245
      quantity: 2
    },
    {
      id: 'tray-2',
      item: MENU_ITEMS[3], // $36
      quantity: 1
    }
  ];

  const totals = calculateTrayTotals(sampleItems);
  assert.equal(totals.subtotal, 245 * 2 + 36);
  assert.equal(totals.serviceCharge, Math.round((245 * 2 + 36) * 0.1));
  assert.equal(totals.total, totals.subtotal + totals.serviceCharge);
  assert.equal(totals.totalQuantity, 3);
});

test('validateReservation validates required fields and guest count constraints', () => {
  const invalidData: ReservationData = {
    guestName: '',
    email: 'bad-email',
    phone: '',
    date: '',
    timeSlot: '',
    guests: 0,
    seatingType: 'chef-counter',
    experienceTier: 'divine-omakase',
    dietaryRestrictions: '',
    specialRequests: ''
  };

  const validation = validateReservation(invalidData);
  assert.equal(validation.isValid, false);
  assert.ok(validation.errors.guestName);
  assert.ok(validation.errors.email);
  assert.ok(validation.errors.date);
  assert.ok(validation.errors.guests);

  const validData: ReservationData = {
    guestName: 'Takeshi Kovacs',
    email: 'takeshi@envoy.net',
    phone: '+1 415 555 0199',
    date: '2026-11-20',
    timeSlot: '19:45 Master Omakase (Seat 1-10)',
    guests: 2,
    seatingType: 'chef-counter',
    experienceTier: 'divine-omakase',
    dietaryRestrictions: 'None',
    specialRequests: 'Anniversary omakase'
  };

  const passValidation = validateReservation(validData);
  assert.equal(passValidation.isValid, true);
  assert.equal(Object.keys(passValidation.errors).length, 0);
});

test('calculateEstimatedReservationPrice produces correct pricing tier estimates', () => {
  assert.equal(calculateEstimatedReservationPrice('divine-omakase', 2), 245 * 2);
  assert.equal(calculateEstimatedReservationPrice('ascended-omakase', 4), 165 * 4);
  assert.equal(calculateEstimatedReservationPrice('a-la-carte', 2), 85 * 2);
});

test('formatCurrency formats numbers with dollar sign and commas', () => {
  assert.equal(formatCurrency(245), '$245');
  assert.equal(formatCurrency(1250), '$1,250');
});
