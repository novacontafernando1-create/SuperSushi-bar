export type KiLevel = 'base' | 'super-ki' | 'ascended' | 'divine';

export type MenuCategory = 
  | 'all' 
  | 'flights' 
  | 'torched-nigiri' 
  | 'cosmic-rolls' 
  | 'sashimi-crudo' 
  | 'libations';

export interface MenuItem {
  id: string;
  name: string;
  japaneseName: string;
  category: MenuCategory;
  price: number;
  kiLevel: KiLevel;
  agingDuration?: string;
  thermalNotes: string;
  cutSpec: string;
  description: string;
  ingredients: string[];
  dietary: string[];
  imageUrl: string;
  featured?: boolean;
  courseSequence?: string;
  pairingNote?: string;
}

export interface TastingCourseOption {
  id: string;
  name: string;
  japaneseName: string;
  description: string;
  thermalNote: string;
  extraPrice: number;
  imageUrl: string;
  kiLevel: KiLevel;
}

export interface TastingStep {
  stepNumber: number;
  courseTitle: string;
  subtitle: string;
  options: TastingCourseOption[];
}

export interface SelectedCourseConfig {
  step1OptionId: string;
  step2OptionId: string;
  step3OptionId: string;
  step4OptionId: string;
  torchIntensity: 'cold-raw' | 'flame-kissed' | 'ultra-seared';
  sakePairing: boolean;
  notes: string;
}

export interface TrayItem {
  id: string;
  item: MenuItem;
  quantity: number;
  selectedOptions?: string;
  customPrice?: number;
}

export type SeatingType = 'chef-counter' | 'celestial-alcove' | 'holo-booth';

export interface ReservationData {
  guestName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  guests: number;
  seatingType: SeatingType;
  experienceTier: 'ascended-omakase' | 'divine-omakase' | 'a-la-carte';
  dietaryRestrictions: string;
  specialRequests: string;
}

export interface ReservationConfirmation extends ReservationData {
  bookingId: string;
  createdAt: string;
  status: 'confirmed' | 'pending';
  totalEstimated: number;
}
