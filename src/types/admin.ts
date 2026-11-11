export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  internalCode: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  ingredients: string;
  portion: string;
  prepTime: string;
  allergens: string[];
  price: number;
  promotionalPrice?: number;
  imageUrl: string;
  additionalImages?: string[];
  isActive: boolean;
  isFeatured: boolean; // Vitrine Home
  badgeLeft?: string;
  badgeRight?: string;
  badgeRightColor?: 'primary' | 'secondary' | 'tertiary';
  displayOrder?: number;
  updatedAt: string;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  displayOrder: number;
  icon: string;
  isActive: boolean;
  isQuickNav: boolean;
  isHighlight: boolean;
}

export interface StoreSettings {
  restaurantName: string;
  slogan: string;
  address: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  openingHours: string;
  serviceTaxEnabled: boolean;
  currency: string;
  fishAlertEnabled: boolean;
  maintenanceMode: boolean;
  omakaseSeats: number;
  logoUrl?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  author: string;
  action: string;
  target: string;
  details: string;
  status: 'Concluído' | 'Em Andamento' | 'Pendente';
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Master Admin' | 'Sub-Chef' | 'Atendimento';
  title: string;
  avatarLetter: string;
  has2FA: boolean;
}
