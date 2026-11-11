import { MenuItem, MenuCategory, KiLevel, TastingStep, TrayItem, ReservationData } from '../types';

export function filterMenuItems(
  items: MenuItem[],
  category: MenuCategory,
  kiLevel: KiLevel | 'all',
  searchQuery: string = ''
): MenuItem[] {
  const query = searchQuery.trim().toLowerCase();

  return items.filter(item => {
    // Category check
    if (category !== 'all' && item.category !== category) {
      return false;
    }

    // Ki Level check
    if (kiLevel !== 'all' && item.kiLevel !== kiLevel) {
      return false;
    }

    // Search query check
    if (query) {
      const matchName = item.name.toLowerCase().includes(query);
      const matchJp = item.japaneseName.toLowerCase().includes(query);
      const matchDesc = item.description.toLowerCase().includes(query);
      const matchIngredients = item.ingredients.some(ing => ing.toLowerCase().includes(query));
      const matchDietary = item.dietary.some(d => d.toLowerCase().includes(query));
      
      if (!matchName && !matchJp && !matchDesc && !matchIngredients && !matchDietary) {
        return false;
      }
    }

    return true;
  });
}

export function calculateTastingPrice(
  basePrice: number,
  selectedOptionIds: string[],
  steps: TastingStep[],
  includeSake: boolean = false
): number {
  let total = basePrice;

  // Find extra prices of chosen options
  for (const optionId of selectedOptionIds) {
    for (const step of steps) {
      const found = step.options.find(opt => opt.id === optionId);
      if (found) {
        total += found.extraPrice;
        break;
      }
    }
  }

  if (includeSake) {
    total += 45; // Junmai Daiginjo reserve pairing tier
  }

  return total;
}

export function calculateTrayTotals(items: TrayItem[]): {
  subtotal: number;
  serviceCharge: number;
  total: number;
  totalQuantity: number;
} {
  const subtotal = items.reduce((sum, current) => {
    const itemPrice = current.customPrice ?? current.item.price;
    return sum + itemPrice * current.quantity;
  }, 0);

  const serviceCharge = Math.round(subtotal * 0.1);
  const total = subtotal + serviceCharge;
  const totalQuantity = items.reduce((sum, current) => sum + current.quantity, 0);

  return {
    subtotal,
    serviceCharge,
    total,
    totalQuantity
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateReservation(data: ReservationData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.guestName || data.guestName.trim().length < 2) {
    errors.guestName = 'Please enter full name (minimum 2 characters)';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address';
  }

  if (!data.phone || data.phone.trim().length < 6) {
    errors.phone = 'Please provide a valid contact number';
  }

  if (!data.date) {
    errors.date = 'Please select a reservation date';
  }

  if (!data.timeSlot) {
    errors.timeSlot = 'Please select an evening service slot';
  }

  if (!data.guests || data.guests < 1 || data.guests > 8) {
    errors.guests = 'Counter reservations are available for 1 to 8 guests';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function calculateEstimatedReservationPrice(
  experienceTier: 'ascended-omakase' | 'divine-omakase' | 'a-la-carte',
  guests: number
): number {
  const perGuest = 
    experienceTier === 'divine-omakase' 
      ? 245 
      : experienceTier === 'ascended-omakase' 
        ? 165 
        : 85;
  return perGuest * Math.max(1, guests);
}

export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

export function getKiLevelColor(level: KiLevel): {
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  glowClass: string;
  dotColor: string;
  label: string;
} {
  switch (level) {
    case 'divine':
      return {
        badgeBg: 'rgba(118, 45, 255, 0.15)',
        badgeBorder: 'rgba(118, 45, 255, 0.4)',
        badgeText: '#D0BCFF',
        glowClass: 'glow-cosmic',
        dotColor: '#762DFF',
        label: 'Divine Tier'
      };
    case 'ascended':
      return {
        badgeBg: 'rgba(22, 119, 255, 0.15)',
        badgeBorder: 'rgba(22, 119, 255, 0.4)',
        badgeText: '#AFC6FF',
        glowClass: 'glow-electric-sm',
        dotColor: '#1677FF',
        label: 'Ascended Ki'
      };
    case 'super-ki':
      return {
        badgeBg: 'rgba(255, 122, 26, 0.15)',
        badgeBorder: 'rgba(255, 122, 26, 0.4)',
        badgeText: '#FFB68E',
        glowClass: 'glow-ki-sm',
        dotColor: '#FF7A1A',
        label: 'Super Ki'
      };
    case 'base':
    default:
      return {
        badgeBg: 'rgba(244, 245, 248, 0.08)',
        badgeBorder: 'rgba(244, 245, 248, 0.2)',
        badgeText: '#F4F5F8',
        glowClass: '',
        dotColor: '#8A92A6',
        label: 'Base Form'
      };
  }
}
