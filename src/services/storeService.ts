import { AdminProduct, AdminCategory, StoreSettings, AuditLog } from '../types/admin';

const STORAGE_KEYS = {
  PRODUCTS: 'supershushi_products_v1',
  CATEGORIES: 'supershushi_categories_v1',
  SETTINGS: 'supershushi_settings_v1',
  AUDIT_LOGS: 'supershushi_audit_logs_v1',
};

const INITIAL_CATEGORIES: AdminCategory[] = [
  {
    id: 'cat-sushis',
    name: 'Sushis & Nigiris',
    slug: 'sushis',
    description: 'Nigiris e sushis tradicionais com corte de alta precisão e toques trufados.',
    displayOrder: 1,
    icon: 'set_meal',
    isActive: true,
    isQuickNav: true,
    isHighlight: false,
  },
  {
    id: 'cat-sashimis',
    name: 'Sashimis Nobres',
    slug: 'sashimis',
    description: 'Lâminas nobres de peixes frescos com cura e infusões criogênicas aromáticas.',
    displayOrder: 2,
    icon: 'water_drop',
    isActive: true,
    isQuickNav: true,
    isHighlight: false,
  },
  {
    id: 'cat-combos',
    name: 'Combos do Dragão',
    slug: 'combos-dragao',
    description: 'Experiências gastronômicas completas unindo brasa binchotan e pescados nobres.',
    displayOrder: 3,
    icon: 'local_fire_department',
    isActive: true,
    isQuickNav: true,
    isHighlight: true,
  },
  {
    id: 'cat-temakis',
    name: 'Temakis Especiais',
    slug: 'temakis',
    description: 'Nori artesanal crocante com recheios exclusivos e emulsões autorais.',
    displayOrder: 4,
    icon: 'cyclone',
    isActive: true,
    isQuickNav: true,
    isHighlight: false,
  },
  {
    id: 'cat-hot-rolls',
    name: 'Hot Rolls',
    slug: 'hot-rolls',
    description: 'Crocância dourada de panko artesanal com ingredientes maçaricados.',
    displayOrder: 5,
    icon: 'whatshot',
    isActive: true,
    isQuickNav: true,
    isHighlight: false,
  },
  {
    id: 'cat-especiais',
    name: 'Especiais da Casa',
    slug: 'especiais',
    description: 'Criações exclusivas com ingredientes de raridade internacional como Wagyu A5 e ouro comestível.',
    displayOrder: 6,
    icon: 'stars',
    isActive: true,
    isQuickNav: true,
    isHighlight: true,
  },
  {
    id: 'cat-sobremesas',
    name: 'Sobremesas Cósmicas',
    slug: 'sobremesas',
    description: 'Doces de inspiração japonesa com técnicas moleculares e equilíbrio umami.',
    displayOrder: 7,
    icon: 'icecream',
    isActive: false,
    isQuickNav: false,
    isHighlight: false,
  },
];

const INITIAL_PRODUCTS: AdminProduct[] = [
  {
    id: 'super-dragon-roll-imperial',
    name: 'Super Dragon Roll Imperial',
    slug: 'super-dragon-roll-imperial',
    internalCode: 'SS-DRG-01',
    category: 'Combos do Dragão',
    shortDescription: 'Wagyu A5 selado na brasa japonesa, atum fresco, crispy de chalotas douradas, emulsão cítrica de trufas e folhas de ouro.',
    fullDescription: 'Uma ascensão gustativa de textura e chamas. 24 peças meticulosamente montadas combinando a cremosidade do salmão picante marinado, a doçura profunda da enguia Kabayaki vitrificada e a suntuosidade marmorizada do Wagyu A5 maçaricado em tempo real com lâminas de ouro 24k comestíveis.',
    ingredients: 'Wagyu A5 Miyazaki, Atum Bluefin, Chalotas douradas, Trufas brancas, Ouro 24k',
    portion: '24 peças',
    prepTime: '20 - 25 min',
    allergens: ['Frutos do Mar', 'Glúten', 'Derivados de Soja'],
    price: 88.0,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6EXpbgzCAN3pXgFc_J8GS-DSI0qH0wknhawa-mv39W5zLOgBxaFwnyFVbjuVvpB6vaoHHH4P7L3LO0sUeaipVbNPKSqmQRke70lBIR9LGWNJ7TbHyKz7PSsnOJMdk3Tf-rVsD6mEtaylZjLvMduX_KzuZQCK9dozDhbU94qDnCSgW6V9rIFJUVYDg1o2eyKD6mLqS97prxaZZNwS-gTG6IHJz-YTSNyAXl4QnLkY',
    isActive: true,
    isFeatured: true,
    badgeLeft: 'ASSINATURA DA CASA',
    badgeRight: 'DRAGON KI',
    badgeRightColor: 'primary',
    displayOrder: 1,
    updatedAt: 'Hoje, 14:22',
  },
  {
    id: 'moriawase-cosmico-supremo',
    name: 'Moriawase Cósmico Supremo',
    slug: 'moriawase-cosmico-supremo',
    internalCode: 'SS-SAS-08',
    category: 'Sashimis Nobres',
    shortDescription: 'Sashimi de Otoro com corte especial, salmão selvagem, hamachi e camarão botan ebi sob névoa aromática criogênica.',
    fullDescription: 'Corte nobre da barriga do Atum Bluefin de pesca sustentável, combinado com o frescor cristalino de Botan Ebi e Yellowtail Hamachi, repousando em domo de gelo esculpido com infusão de fumaça de cerejeira.',
    ingredients: 'Otoro Bluefin, Salmão Selvagem, Hamachi, Botan Ebi, Shiso roxo, Wasabi fresco Shizuoka',
    portion: '16 lâminas',
    prepTime: '15 - 20 min',
    allergens: ['Frutos do Mar'],
    price: 145.0,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuJVfIn7YEJFOzDej1Ck8vDnDjW7mGiuglM9iGThOpl5aUTv5QZBOOihjcWG8KLYqLQQ63bmi1E1eZZE_lN2uqp9SaryGFWXecW9Hv_ftICYSdI5DKD3eSdZvz7EDQAeRZtXf6Mx2esXUhAKHQIfQmBC5K7B0kzGll_CDN3CD2eCziJIjM92Vhyg35oo3lkN4JFQs--rrqaigpSAN82A9OQGKSARLPookrl0StQxQ',
    isActive: true,
    isFeatured: true,
    badgeLeft: 'EXPERIÊNCIA PURA',
    badgeRight: 'AURA COLD',
    badgeRightColor: 'secondary',
    displayOrder: 2,
    updatedAt: 'Hoje, 11:30',
  },
  {
    id: 'omakase-ultra-instinct',
    name: 'Omakase Ultra Instinct',
    slug: 'omakase-ultra-instinct',
    internalCode: 'SS-ESP-19',
    category: 'Especiais da Casa',
    shortDescription: '12 peças exclusivas com unagui caramelizado, foie gras maçaricado, uni fresco, ovas de ikura e flocos de ouro 24k comestíveis.',
    fullDescription: 'A consagração máxima da alquimia gastronômica. Sequência em 12 tempos desenhada pelo chef para elevar a percepção gustativa ao patamar cósmico, harmonizando calor da brasa com o frio absoluto do mar profundo.',
    ingredients: 'Unagi Kabayaki, Foie Gras, Uni Hokkaido, Ovas de Ikura, Flocos de Ouro 24k',
    portion: '12 peças',
    prepTime: '25 - 30 min',
    allergens: ['Frutos do Mar', 'Glúten', 'Derivados de Soja'],
    price: 210.0,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9Eq0eQplG0Tx4xHSxr4Nkxy6Z076ByrjUA8YsiC8Ya67O-oDxQxJBJI26S2vOKdU956TXnR_GOPb5GClIkfSM4IatgL6-kTNG5kWPzgExvFf3jVXnw5TIg26wTgjKPuNP3d8IixTTXBojOvmBGf0Jl2_8_YF1g-wNhfHQBZwZv57oYuJrpmmQoTBtpOvzJrWnKNm2nznJ8WURhM_hG-fW8vGCwCvTcWN1AiHA_Ck',
    isActive: true,
    isFeatured: true,
    badgeLeft: 'EDIÇÃO LIMITADA',
    badgeRight: 'MAX ENERGY',
    badgeRightColor: 'tertiary',
    displayOrder: 3,
    updatedAt: 'Ontem, 20:15',
  },
  {
    id: 'truffled-salmon-nigiri-flight',
    name: 'Truffled Salmon Nigiri Flight',
    slug: 'truffled-salmon-nigiri-flight',
    internalCode: 'SS-NIG-04',
    category: 'Sushis & Nigiris',
    shortDescription: 'Salmão gordo levemente maçaricado com raspas finas de limão siciliano, flor de sal de Guérande e azeite trufado branco.',
    fullDescription: 'Degustação em 4 tempos destacando cortes de salmão com maturação shio-koji de 5 dias, selados por 2 segundos na chama intensa de binchotan.',
    ingredients: 'Salmão gordo marinado, Arroz akazu, Flor de sal de Guérande, Azeite trufado branco',
    portion: '4 unidades',
    prepTime: '10 - 15 min',
    allergens: ['Frutos do Mar'],
    price: 56.0,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    isActive: true,
    isFeatured: false,
    badgeLeft: 'NIGIRI PREMIUM',
    badgeRight: '4 UNIDADES',
    badgeRightColor: 'primary',
    displayOrder: 4,
    updatedAt: 'Ontem, 21:05',
  },
  {
    id: 'hot-roll-dragon-flame',
    name: 'Hot Roll Dragon Flame',
    slug: 'hot-roll-dragon-flame',
    internalCode: 'SS-HOT-12',
    category: 'Hot Rolls',
    shortDescription: 'Salmão fresco com cream cheese artesanal, tarê especial com pimenta sansho, cebolinha fresca e palha crocante de alho-poró.',
    fullDescription: 'Envoltório em massa panko extra crocante, frito em temperatura precisa de 180°C para manter o interior cremoso e envolvente com o toque aromático do alho-poró frito.',
    ingredients: 'Salmão fresco, Cream cheese artesanal, Tarê com pimenta sansho, Palha de alho-poró',
    portion: '8 unidades',
    prepTime: '12 - 16 min',
    allergens: ['Glúten', 'Lactose', 'Frutos do Mar'],
    price: 48.0,
    imageUrl: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&w=800&q=80',
    isActive: true,
    isFeatured: false,
    badgeLeft: 'CRUNCHY FUSION',
    badgeRight: '8 UNIDADES',
    badgeRightColor: 'primary',
    displayOrder: 5,
    updatedAt: '20 Out, 11:15',
  },
  {
    id: 'temaki-black-botan',
    name: 'Temaki Black Botan',
    slug: 'temaki-black-botan',
    internalCode: 'SS-TMK-05',
    category: 'Temakis Especiais',
    shortDescription: 'Nori especial tostado ultra crocante, atum bluefin marinado em shoyu maturado, avocado fresco, gergelim negro e emulsão spicy.',
    fullDescription: 'Cone de alga marinha negra selecionada colhida na baía de Ariake, montado no instante do pedido para assegurar a textura estaladiça inconfundível.',
    ingredients: 'Nori tostado Ariake, Atum Bluefin, Avocado Hass, Gergelim torrado, Pimenta Togarashi',
    portion: '1 unidade (180g)',
    prepTime: '8 - 10 min',
    allergens: ['Frutos do Mar', 'Derivados de Soja'],
    price: 52.0,
    imageUrl: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=800&q=80',
    isActive: true,
    isFeatured: false,
    badgeLeft: 'TEMAKI ARTESANAL',
    badgeRight: 'CONE CROCANTE',
    badgeRightColor: 'secondary',
    displayOrder: 6,
    updatedAt: '18 Out, 16:30',
  },
  {
    id: 'wagyu-caviar-nigiri-duo',
    name: 'Wagyu & Caviar Nigiri Duo',
    slug: 'wagyu-caviar-nigiri-duo',
    internalCode: 'SS-NIG-09',
    category: 'Sushis & Nigiris',
    shortDescription: 'Corte A5 selado no maçarico com binchotan, caviar Royal Osetra e flor de sal vulcânica.',
    fullDescription: 'Duas unidades de puro luxo carnal e marinho: o derretimento do marmoreio BMS 11 combinado com as esferas salinas do caviar real.',
    ingredients: 'Wagyu A5 Miyazaki, Caviar Royal Osetra, Sal negro do Havaí, Arroz Akazu',
    portion: '2 peças',
    prepTime: '10 - 12 min',
    allergens: ['Frutos do Mar'],
    price: 94.0,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isActive: true,
    isFeatured: true,
    badgeLeft: 'LUXO PRIMAL',
    badgeRight: '2 PEÇAS',
    badgeRightColor: 'primary',
    displayOrder: 7,
    updatedAt: 'Hoje, 09:45',
  },
  {
    id: 'sashimi-otoro-celestial',
    name: 'Sashimi Otoro Celestial',
    slug: 'sashimi-otoro-celestial',
    internalCode: 'SS-SAS-12',
    category: 'Sashimis Nobres',
    shortDescription: 'Corte nobre da barriga do Atum Bluefin de pesca sustentável em domo criogênico.',
    fullDescription: 'Lâminas límpidas de Otoro maturadas por 21 dias em câmara fria de cedro para concentrar o umami e quebrar suavemente o tecido gorduroso.',
    ingredients: 'Barriga de Bluefin Otoro, Shiso floral, Shoyu 25 anos',
    portion: '5 lâminas',
    prepTime: '12 - 15 min',
    allergens: ['Frutos do Mar'],
    price: 145.0,
    imageUrl: 'https://images.unsplash.com/photo-1563612116625-3012372fccce?auto=format&fit=crop&w=800&q=80',
    isActive: false, // Esgotado / Indisponível para demonstrar alerta
    isFeatured: false,
    badgeLeft: 'SAFRA LIMITADA',
    badgeRight: 'ESGOTADO',
    badgeRightColor: 'tertiary',
    displayOrder: 8,
    updatedAt: 'Ontem, 22:40',
  },
];

const INITIAL_SETTINGS: StoreSettings = {
  restaurantName: 'Supershushi Bar',
  slogan: 'Dragon Energy Sushi Experience',
  address: 'Alameda dos Samurais, 888 - Itaim Bibi, São Paulo - SP',
  phone: '+55 (11) 3045-8890',
  whatsapp: '+55 (11) 98722-4411',
  instagram: 'supershushibar',
  openingHours: 'Terça a Domingo: 19h00 às 00h30',
  serviceTaxEnabled: true,
  currency: 'R$ BRL',
  fishAlertEnabled: true,
  maintenanceMode: false,
  omakaseSeats: 10,
  logoUrl: '',
};

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: 'Hoje, 14:22',
    author: 'Chef Hiroshi',
    action: 'Edição de Prato',
    target: 'Combo Dragão Cósmico',
    details: 'Ajuste de ficha técnica e atualização de foto em alta definição',
    status: 'Concluído',
  },
  {
    id: 'log-2',
    timestamp: 'Hoje, 11:30',
    author: 'Kenji Sato',
    action: 'Status de Estoque',
    target: 'Sashimi Otoro Celestial',
    details: 'Marcação como Indisponível devido à safra do lote de atum',
    status: 'Concluído',
  },
  {
    id: 'log-3',
    timestamp: 'Ontem, 21:05',
    author: 'Chef Hiroshi',
    action: 'Reordenação de Menu',
    target: 'Categorias do Cardápio',
    details: 'Promoção de Combos do Dragão para a 3ª posição de exibição pública',
    status: 'Concluído',
  },
  {
    id: 'log-4',
    timestamp: 'Ontem, 19:40',
    author: 'Sistema Automático',
    action: 'Sincronização Cloud',
    target: 'Cardápio Público',
    details: 'Deploy automático de alterações no cache de borda (CDN Edge)',
    status: 'Concluído',
  },
];

type Listener = () => void;

class StoreService {
  private listeners: Set<Listener> = new Set();

  private getStorageItem<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
      return JSON.parse(data) as T;
    } catch {
      return defaultValue;
    }
  }

  private setStorageItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      this.notify();
    } catch (err) {
      console.error('Failed to save to localStorage', err);
    }
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (e) {
        console.error('Error in listener', e);
      }
    });
  }

  // --- PRODUCTS ---
  public getProducts(): AdminProduct[] {
    return this.getStorageItem<AdminProduct[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  }

  public getProductById(id: string): AdminProduct | undefined {
    return this.getProducts().find((p) => p.id === id);
  }

  public addProduct(product: Omit<AdminProduct, 'id' | 'updatedAt'>): AdminProduct {
    const products = this.getProducts();
    const newProduct: AdminProduct = {
      ...product,
      id: `dish-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      updatedAt: 'Agora mesmo',
    };
    const updated = [newProduct, ...products];
    this.setStorageItem(STORAGE_KEYS.PRODUCTS, updated);
    this.addAuditLog('Cadastro de Prato', newProduct.name, `Novo prato cadastrado na categoria ${newProduct.category}`);
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<AdminProduct>): AdminProduct | null {
    const products = this.getProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updatedProduct = {
      ...products[index],
      ...updates,
      updatedAt: 'Agora mesmo',
    };
    products[index] = updatedProduct;
    this.setStorageItem(STORAGE_KEYS.PRODUCTS, products);
    this.addAuditLog('Edição de Prato', updatedProduct.name, 'Informações ou status alterados no catálogo');
    return updatedProduct;
  }

  public deleteProduct(id: string): boolean {
    const products = this.getProducts();
    const product = products.find((p) => p.id === id);
    if (!product) return false;

    const filtered = products.filter((p) => p.id !== id);
    this.setStorageItem(STORAGE_KEYS.PRODUCTS, filtered);
    this.addAuditLog('Exclusão de Prato', product.name, `Removido do catálogo pelo administrador`);
    return true;
  }

  public toggleProductActive(id: string): boolean {
    const products = this.getProducts();
    const product = products.find((p) => p.id === id);
    if (!product) return false;

    const newStatus = !product.isActive;
    return !!this.updateProduct(id, { isActive: newStatus });
  }

  public duplicateProduct(id: string): AdminProduct | null {
    const original = this.getProductById(id);
    if (!original) return null;

    const copyData: Omit<AdminProduct, 'id' | 'updatedAt'> = {
      ...original,
      name: `${original.name} (Cópia)`,
      slug: `${original.slug}-copia-${Math.random().toString(36).substring(2, 5)}`,
      internalCode: `${original.internalCode}-CP`,
    };
    return this.addProduct(copyData);
  }

  // --- CATEGORIES ---
  public getCategories(): AdminCategory[] {
    const cats = this.getStorageItem<AdminCategory[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    return cats.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public addCategory(category: Omit<AdminCategory, 'id'>): AdminCategory {
    const categories = this.getCategories();
    const newCategory: AdminCategory = {
      ...category,
      id: `cat-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    const updated = [...categories, newCategory];
    this.setStorageItem(STORAGE_KEYS.CATEGORIES, updated);
    this.addAuditLog('Nova Categoria', newCategory.name, `Seção adicionada com prioridade #${newCategory.displayOrder}`);
    return newCategory;
  }

  public updateCategory(id: string, updates: Partial<AdminCategory>): AdminCategory | null {
    const categories = this.getCategories();
    const index = categories.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const updatedCat = { ...categories[index], ...updates };
    categories[index] = updatedCat;
    this.setStorageItem(STORAGE_KEYS.CATEGORIES, categories);
    this.addAuditLog('Atualização de Categoria', updatedCat.name, 'Configurações de exibição ou ordem atualizadas');
    return updatedCat;
  }

  public deleteCategory(id: string, migrationCategoryName?: string): boolean {
    const categories = this.getCategories();
    const targetCat = categories.find((c) => c.id === id);
    if (!targetCat) return false;

    // Migrate linked products to avoid orphaned items
    const products = this.getProducts();
    let migratedCount = 0;
    const updatedProducts = products.map((p) => {
      if (p.category === targetCat.name) {
        migratedCount++;
        if (migrationCategoryName && migrationCategoryName !== 'desativar') {
          return { ...p, category: migrationCategoryName };
        } else {
          return { ...p, isActive: false };
        }
      }
      return p;
    });

    this.setStorageItem(STORAGE_KEYS.PRODUCTS, updatedProducts);
    const remainingCats = categories.filter((c) => c.id !== id);
    this.setStorageItem(STORAGE_KEYS.CATEGORIES, remainingCats);
    this.addAuditLog(
      'Remoção de Categoria',
      targetCat.name,
      `Categoria removida. ${migratedCount} produtos migrados para "${migrationCategoryName || 'Desativados'}"`
    );
    return true;
  }

  public reorderCategories(reorderedIds: string[]): void {
    const categories = this.getCategories();
    const updated = categories.map((cat) => {
      const newIndex = reorderedIds.indexOf(cat.id);
      if (newIndex !== -1) {
        return { ...cat, displayOrder: newIndex + 1 };
      }
      return cat;
    });
    this.setStorageItem(STORAGE_KEYS.CATEGORIES, updated);
    this.addAuditLog('Reordenação de Menu', 'Estrutura do Cardápio', 'Nova ordem das categorias aplicada');
  }

  // --- SETTINGS ---
  public getSettings(): StoreSettings {
    return this.getStorageItem<StoreSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }

  public updateSettings(updates: Partial<StoreSettings>): StoreSettings {
    const current = this.getSettings();
    const updated = { ...current, ...updates };
    this.setStorageItem(STORAGE_KEYS.SETTINGS, updated);
    this.addAuditLog('Configurações do Sistema', 'Geral', 'Parâmetros operacionais e canais de contato atualizados');
    return updated;
  }

  // --- AUDIT LOGS ---
  public getAuditLogs(): AuditLog[] {
    return this.getStorageItem<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  }

  public addAuditLog(action: string, target: string, details: string, author = 'Chef Hiroshi'): void {
    const logs = this.getAuditLogs();
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: 'Agora mesmo',
      author,
      action,
      target,
      details,
      status: 'Concluído',
    };
    const updated = [newLog, ...logs.slice(0, 40)];
    this.setStorageItem(STORAGE_KEYS.AUDIT_LOGS, updated);
  }

  // Reset to initial demo state
  public resetToDefault(): void {
    this.setStorageItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    this.setStorageItem(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
    this.setStorageItem(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    this.setStorageItem(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  }
}

export const storeService = new StoreService();
