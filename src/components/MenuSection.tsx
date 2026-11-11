import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types';
import { storeService } from '../services/storeService';
import { AdminProduct } from '../types/admin';

interface MenuSectionProps {
  items?: MenuItem[];
  onSelectItem?: (item: MenuItem) => void;
  onAddToTray?: (item: MenuItem) => void;
  trayItemIds?: string[];
}

interface SignatureDish {
  id: string;
  name: string;
  category: string;
  priceFormatted: string;
  priceNumber: number;
  badgeLeft: string;
  badgeRight: string;
  badgeRightColor: 'primary' | 'secondary' | 'tertiary';
  hasImage: boolean;
  imageUrl?: string;
  description: string;
  unitSpec?: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  onAddToTray,
}) => {
  const [activeTab, setActiveTab] = useState('Todos');
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const [storedProducts, setStoredProducts] = useState<AdminProduct[]>(() =>
    storeService.getProducts()
  );
  const [storedCategories, setStoredCategories] = useState(() =>
    storeService.getCategories()
  );

  useEffect(() => {
    const unsub = storeService.subscribe(() => {
      setStoredProducts(storeService.getProducts());
      setStoredCategories(storeService.getCategories());
    });
    return unsub;
  }, []);

  // Compute Categories from active categories in store
  const categoryNames = [
    'Todos',
    ...storedCategories.filter((c) => c.isActive).map((c) => c.name),
  ];

  // Map active AdminProducts into SignatureDish objects
  const dishes: SignatureDish[] = storedProducts
    .filter((p) => p.isActive)
    .map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      priceFormatted: `R$ ${p.price.toFixed(2).replace('.', ',')}`,
      priceNumber: p.price,
      badgeLeft: p.badgeLeft || (p.isFeatured ? 'DESTAQUE VITRINE' : 'SELEÇÃO DO CHEF'),
      badgeRight: p.badgeRight || p.portion || 'DRAGON KI',
      badgeRightColor: p.badgeRightColor || (p.isFeatured ? 'primary' : 'secondary'),
      hasImage: !!p.imageUrl,
      imageUrl: p.imageUrl,
      description: p.shortDescription || p.fullDescription,
      unitSpec: p.portion,
    }));

  const filteredDishes = dishes.filter((dish) => {
    if (activeTab === 'Todos') return true;
    return dish.category === activeTab;
  });

  const handleAddDish = (dish: SignatureDish) => {
    if (onAddToTray) {
      // Map to MenuItem shape
      const item: MenuItem = {
        id: dish.id,
        name: dish.name,
        japaneseName: '極上 ドラゴン',
        category: 'cosmic-rolls',
        price: dish.priceNumber,
        kiLevel:
          dish.badgeRightColor === 'primary'
            ? 'super-ki'
            : dish.badgeRightColor === 'secondary'
            ? 'ascended'
            : 'divine',
        thermalNotes: 'Alta precisão térmica',
        cutSpec: dish.unitSpec || 'Corte nobre',
        description: dish.description,
        ingredients: ['Pescado Nobre', 'Arroz Akazu', 'Especiarias'],
        dietary: [dish.badgeLeft],
        imageUrl:
          dish.imageUrl ||
          'https://lh3.googleusercontent.com/aida-public/AB6AXuD6EXpbgzCAN3pXgFc_J8GS-DSI0qH0wknhawa-mv39W5zLOgBxaFwnyFVbjuVvpB6vaoHHH4P7L3LO0sUeaipVbNPKSqmQRke70lBIR9LGWNJ7TbHyKz7PSsnOJMdk3Tf-rVsD6mEtaylZjLvMduX_KzuZQCK9dozDhbU94qDnCSgW6V9rIFJUVYDg1o2eyKD6mLqS97prxaZZNwS-gTG6IHJz-YTSNyAXl4QnLkY',
      };
      onAddToTray(item);
    }
    setAddedItemNotice(dish.name);
    setTimeout(() => setAddedItemNotice(null), 2500);
  };

  const handleOpenDish = (dish: SignatureDish) => {
    if (onSelectItem) {
      const item: MenuItem = {
        id: dish.id,
        name: dish.name,
        japaneseName: '極上 ドラゴン',
        category: 'cosmic-rolls',
        price: dish.priceNumber,
        kiLevel:
          dish.badgeRightColor === 'primary'
            ? 'super-ki'
            : dish.badgeRightColor === 'secondary'
            ? 'ascended'
            : 'divine',
        thermalNotes: 'Alta precisão térmica',
        cutSpec: dish.unitSpec || 'Corte nobre',
        description: dish.description,
        ingredients: ['Pescado Nobre', 'Arroz Akazu', 'Especiarias'],
        dietary: [dish.badgeLeft],
        imageUrl:
          dish.imageUrl ||
          'https://lh3.googleusercontent.com/aida-public/AB6AXuD6EXpbgzCAN3pXgFc_J8GS-DSI0qH0wknhawa-mv39W5zLOgBxaFwnyFVbjuVvpB6vaoHHH4P7L3LO0sUeaipVbNPKSqmQRke70lBIR9LGWNJ7TbHyKz7PSsnOJMdk3Tf-rVsD6mEtaylZjLvMduX_KzuZQCK9dozDhbU94qDnCSgW6V9rIFJUVYDg1o2eyKD6mLqS97prxaZZNwS-gTG6IHJz-YTSNyAXl4QnLkY',
      };
      onSelectItem(item);
    }
  };

  return (
    <section className="py-margin-lg relative" id="cardapio">
      <div className="max-w-[1360px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-space-xl">
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest mb-space-xs font-semibold">
            SELEÇÃO GASTRONÔMICA
          </span>
          <h2 className="font-headline-lg text-headline-md md:text-headline-lg uppercase text-on-surface font-bold">
            CARDÁPIO SUPERSHUSHI
          </h2>
          <div className="w-16 h-1 bg-primary-container mt-space-sm rounded-full"></div>
        </div>

        {/* Temporary inline feedback for adding dish */}
        {addedItemNotice && (
          <div className="mb-6 mx-auto max-w-md bg-surface-container-high border border-primary text-primary px-4 py-2.5 rounded-xl text-center font-label-md animate-fadeIn">
            ✓ "{addedItemNotice}" adicionado com sucesso!
          </div>
        )}

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-space-sm mb-space-xl gap-space-xs no-scrollbar">
          {categoryNames.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-space-md py-space-xs rounded-full font-label-md text-label-md whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === cat
                  ? 'bg-primary-container text-on-primary-container font-bold'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-lg">
          {filteredDishes.map((dish) => {
            if (dish.hasImage) {
              return (
                <div
                  key={dish.id}
                  className={`group bg-surface-container rounded-2xl overflow-hidden border border-outline-variant/30 hover:${
                    dish.badgeRightColor === 'primary'
                      ? 'border-primary-container/60'
                      : dish.badgeRightColor === 'secondary'
                      ? 'border-secondary-container/60'
                      : 'border-tertiary/60'
                  } transition-all duration-300 flex flex-col justify-between shadow-lg`}
                >
                  <div
                    className="relative h-56 overflow-hidden cursor-pointer"
                    onClick={() => handleOpenDish(dish)}
                  >
                    <img
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={dish.imageUrl}
                    />
                    <div className="absolute top-space-sm left-space-sm">
                      <span
                        className={`px-space-sm py-space-xs rounded-full ${
                          dish.badgeRightColor === 'primary'
                            ? 'bg-primary-container/90 text-on-primary-container'
                            : dish.badgeRightColor === 'secondary'
                            ? 'bg-secondary-container/90 text-on-secondary-container'
                            : 'bg-tertiary-container text-on-tertiary-container'
                        } font-label-caps text-label-caps uppercase font-bold tracking-wider`}
                      >
                        {dish.badgeLeft}
                      </span>
                    </div>
                    <div className="absolute top-space-sm right-space-sm flex items-center gap-1.5 px-2 py-1 rounded-full bg-surface-container-lowest/80 backdrop-blur-md">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          dish.badgeRightColor === 'primary'
                            ? 'bg-primary-container animate-ping'
                            : dish.badgeRightColor === 'secondary'
                            ? 'bg-secondary-container animate-pulse'
                            : 'bg-tertiary animate-pulse'
                        }`}
                      ></span>
                      <span
                        className={`font-mono-price text-[11px] ${
                          dish.badgeRightColor === 'primary'
                            ? 'text-primary'
                            : dish.badgeRightColor === 'secondary'
                            ? 'text-secondary'
                            : 'text-tertiary'
                        }`}
                      >
                        {dish.badgeRight}
                      </span>
                    </div>
                  </div>

                  <div className="p-space-lg flex flex-col flex-1 justify-between">
                    <div>
                      <div
                        className="flex items-center justify-between gap-space-xs mb-space-xs cursor-pointer"
                        onClick={() => handleOpenDish(dish)}
                      >
                        <h3
                          className={`font-headline-sm text-headline-sm uppercase text-on-surface group-hover:${
                            dish.badgeRightColor === 'primary'
                              ? 'text-primary'
                              : dish.badgeRightColor === 'secondary'
                              ? 'text-secondary'
                              : 'text-tertiary'
                          } transition-colors font-bold`}
                        >
                          {dish.name}
                        </h3>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md line-clamp-3">
                        {dish.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-space-sm border-t border-outline-variant/15">
                      <span
                        className={`font-mono-price text-headline-sm ${
                          dish.badgeRightColor === 'primary'
                            ? 'text-primary'
                            : dish.badgeRightColor === 'secondary'
                            ? 'text-secondary'
                            : 'text-tertiary'
                        } font-bold`}
                      >
                        {dish.priceFormatted}
                      </span>
                      <button
                        onClick={() => handleAddDish(dish)}
                        className={`p-2 rounded-lg bg-surface-container-high hover:${
                          dish.badgeRightColor === 'primary'
                            ? 'bg-primary-container hover:text-on-primary-container'
                            : dish.badgeRightColor === 'secondary'
                            ? 'bg-secondary-container hover:text-on-secondary-container'
                            : 'bg-tertiary hover:text-on-tertiary'
                        } text-on-surface transition-colors cursor-pointer`}
                        title="Adicionar à sacola"
                      >
                        <span className="material-symbols-outlined text-[20px]">add_circle</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            // Cards without images
            return (
              <div
                key={dish.id}
                className="bg-surface-container rounded-2xl p-space-lg border border-outline-variant/20 hover:border-primary-container/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-space-xs">
                    <span
                      className={`font-label-caps text-label-caps ${
                        dish.badgeRightColor === 'secondary' ? 'text-secondary' : 'text-primary'
                      } uppercase font-bold`}
                    >
                      {dish.badgeLeft}
                    </span>
                    <span className="font-mono-price text-body-sm text-on-surface-variant">
                      {dish.badgeRight}
                    </span>
                  </div>
                  <h3
                    className="font-headline-sm text-headline-sm text-on-surface mb-space-xs font-bold cursor-pointer hover:text-primary transition-colors"
                    onClick={() => handleOpenDish(dish)}
                  >
                    {dish.name}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                    {dish.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-space-sm border-t border-outline-variant/15">
                  <span
                    className={`font-mono-price text-headline-sm ${
                      dish.badgeRightColor === 'secondary' ? 'text-secondary' : 'text-primary'
                    } font-bold`}
                  >
                    {dish.priceFormatted}
                  </span>
                  <button
                    onClick={() => handleAddDish(dish)}
                    className="p-2 rounded-lg bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-on-surface transition-colors cursor-pointer"
                    title="Adicionar à sacola"
                  >
                    <span className="material-symbols-outlined text-[20px]">add_circle</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Menu Interactive PDF CTA Button */}
        <div className="mt-space-xl flex justify-center">
          <a
            className="inline-flex items-center gap-space-sm px-space-xl py-space-md bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-headline-sm text-label-md uppercase tracking-wider rounded-xl border border-outline-variant/40 shadow-lg hover:border-primary-container transition-all cursor-pointer font-bold"
            href="#reservas"
          >
            <span className="material-symbols-outlined text-primary text-[20px]">menu_book</span>
            VER CARDÁPIO COMPLETO (PDF INTERATIVO)
          </a>
        </div>
      </div>
    </section>
  );
};
