import React, { useState, useMemo } from 'react';
import { storeService } from '../services/storeService';
import { AdminProduct } from '../types/admin';

interface AdminCatalogProps {
  initialSearch?: string;
  isDrawerOpenExternal?: boolean;
  onCloseDrawerExternal?: () => void;
}

export const AdminCatalog: React.FC<AdminCatalogProps> = ({
  initialSearch = '',
}) => {
  const [products, setProducts] = useState<AdminProduct[]>(() => storeService.getProducts());
  const [categories] = useState(() => storeService.getCategories());

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Drawer / Form State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<AdminProduct | null>(null);

  // Delete Confirmation Modal
  const [dishToDelete, setDishToDelete] = useState<AdminProduct | null>(null);

  // Toast feedback
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(null), 3000);
  };

  // Subscribe to changes in storeService
  React.useEffect(() => {
    const unsubscribe = storeService.subscribe(() => {
      setProducts(storeService.getProducts());
    });
    return unsubscribe;
  }, []);

  // Form Fields inside Drawer
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formCategory, setFormCategory] = useState('Combos do Dragão');
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formFullDesc, setFormFullDesc] = useState('');
  const [formIngredients, setFormIngredients] = useState('');
  const [formPortion, setFormPortion] = useState('8 peças');
  const [formPrepTime, setFormPrepTime] = useState('15 - 20 min');
  const [formAllergens, setFormAllergens] = useState<string[]>(['Frutos do Mar']);
  const [newAllergenInput, setNewAllergenInput] = useState('');
  const [formPrice, setFormPrice] = useState('88,00');
  const [formPromoPrice, setFormPromoPrice] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);
  const [formIsFeatured, setFormIsFeatured] = useState(false);

  // Auto-slug generator
  const generateSlug = (val: string) => {
    return val
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleOpenCreateDrawer = () => {
    setEditingDish(null);
    setFormName('');
    setFormSlug('');
    setFormSku(`SS-DSH-${Math.floor(10 + Math.random() * 89)}`);
    setFormCategory(categories[0]?.name || 'Combos do Dragão');
    setFormShortDesc('');
    setFormFullDesc('');
    setFormIngredients('Salmão Fresco, Arroz Akazu, Shoyu 25 anos');
    setFormPortion('8 peças');
    setFormPrepTime('15 - 20 min');
    setFormAllergens(['Frutos do Mar']);
    setFormPrice('68,00');
    setFormPromoPrice('');
    setFormImageUrl(
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80'
    );
    setFormIsActive(true);
    setFormIsFeatured(false);
    setIsDrawerOpen(true);
  };

  const handleOpenEditDrawer = (dish: AdminProduct) => {
    setEditingDish(dish);
    setFormName(dish.name);
    setFormSlug(dish.slug);
    setFormSku(dish.internalCode);
    setFormCategory(dish.category);
    setFormShortDesc(dish.shortDescription);
    setFormFullDesc(dish.fullDescription);
    setFormIngredients(dish.ingredients);
    setFormPortion(dish.portion);
    setFormPrepTime(dish.prepTime);
    setFormAllergens(dish.allergens || []);
    setFormPrice(dish.price.toFixed(2).replace('.', ','));
    setFormPromoPrice(
      dish.promotionalPrice ? dish.promotionalPrice.toFixed(2).replace('.', ',') : ''
    );
    setFormImageUrl(dish.imageUrl);
    setFormIsActive(dish.isActive);
    setFormIsFeatured(dish.isFeatured);
    setIsDrawerOpen(true);
  };

  const handleSaveDish = () => {
    if (!formName.trim()) {
      alert('Por favor, informe o nome do prato.');
      return;
    }

    const priceNum = parseFloat(formPrice.replace(',', '.')) || 0;
    const promoNum = formPromoPrice ? parseFloat(formPromoPrice.replace(',', '.')) : undefined;

    if (editingDish) {
      storeService.updateProduct(editingDish.id, {
        name: formName,
        slug: formSlug || generateSlug(formName),
        internalCode: formSku,
        category: formCategory,
        shortDescription: formShortDesc,
        fullDescription: formFullDesc,
        ingredients: formIngredients,
        portion: formPortion,
        prepTime: formPrepTime,
        allergens: formAllergens,
        price: priceNum,
        promotionalPrice: promoNum,
        imageUrl: formImageUrl,
        isActive: formIsActive,
        isFeatured: formIsFeatured,
      });
      showToast(`Prato "${formName}" atualizado com sucesso!`);
    } else {
      storeService.addProduct({
        name: formName,
        slug: formSlug || generateSlug(formName),
        internalCode: formSku,
        category: formCategory,
        shortDescription: formShortDesc,
        fullDescription: formFullDesc,
        ingredients: formIngredients,
        portion: formPortion,
        prepTime: formPrepTime,
        allergens: formAllergens,
        price: priceNum,
        promotionalPrice: promoNum,
        imageUrl: formImageUrl,
        isActive: formIsActive,
        isFeatured: formIsFeatured,
        badgeLeft: 'ASSINATURA',
        badgeRight: formPortion,
        badgeRightColor: 'primary',
      });
      showToast(`Novo prato "${formName}" adicionado ao cardápio!`);
    }

    setIsDrawerOpen(false);
  };

  const handleDuplicate = (id: string) => {
    const dup = storeService.duplicateProduct(id);
    if (dup) {
      showToast(`Prato duplicado com sucesso!`);
    }
  };

  const handleToggleAvailability = (id: string) => {
    storeService.toggleProductActive(id);
  };

  const handleConfirmDelete = () => {
    if (dishToDelete) {
      storeService.deleteProduct(dishToDelete.id);
      showToast(`Prato "${dishToDelete.name}" excluído.`);
      setDishToDelete(null);
    }
  };

  const handleExportCSV = () => {
    const headers = 'ID,Nome,SKU,Categoria,Preço,Porção,Ativo,Vitrine\n';
    const rows = products
      .map(
        (p) =>
          `"${p.id}","${p.name}","${p.internalCode}","${p.category}",${p.price},"${p.portion}",${p.isActive},${p.isFeatured}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `supershushi_cardapio_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter Pipeline
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchSku = p.internalCode.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        if (!matchName && !matchSku && !matchCat) return false;
      }

      if (categoryFilter !== 'all' && p.category !== categoryFilter) {
        return false;
      }

      if (statusFilter === 'active' && !p.isActive) return false;
      if (statusFilter === 'inactive' && p.isActive) return false;

      if (onlyFeatured && !p.isFeatured) return false;

      return true;
    });
  }, [products, searchQuery, categoryFilter, statusFilter, onlyFeatured]);

  // Pagination Slice
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const activeCount = products.filter((p) => p.isActive).length;
  const inactiveCount = products.filter((p) => !p.isActive).length;

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Toast Notice */}
      {toastNotice && (
        <div className="fixed top-24 right-8 z-50 bg-[#1d1f27] border border-[#ff7a1a] text-[#e2e2ec] px-4 py-3 rounded-xl shadow-[0_0_24px_rgba(255,122,26,0.35)] flex items-center gap-3 animate-fadeIn">
          <span className="material-symbols-outlined text-[#ff7a1a] text-[20px]">check_circle</span>
          <span className="font-label-md text-xs font-semibold">{toastNotice}</span>
        </div>
      )}

      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col max-w-2xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#ff7a1a] shadow-[0_0_8px_#ff7a1a]"></span>
            <span className="font-label-caps text-xs text-[#ffb68e] tracking-widest uppercase font-bold">
              CATÁLOGO GASTRONÔMICO
            </span>
          </div>
          <h1 className="font-headline-lg text-3xl md:text-4xl uppercase text-[#e2e2ec] font-bold tracking-tight">
            Gerenciamento do Cardápio
          </h1>
          <p className="font-body-md text-sm text-[#e0c0b1] mt-1">
            Gerencie todos os pratos disponíveis no Supershushi Bar. Cadastre, edite, pause ou destaque itens com sincronização em tempo real na página pública.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#191b23] hover:bg-[#282a31] text-[#e0c0b1] hover:text-[#e2e2ec] font-label-md text-xs border border-[#282a31] transition-colors cursor-pointer"
            title="Exportar dados em formato CSV"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Exportar CSV</span>
          </button>

          <button
            onClick={handleOpenCreateDrawer}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff7a1a] hover:bg-[#ff8833] text-[#0c0e15] font-headline-sm text-sm font-bold uppercase tracking-wider shadow-[0_0_24px_rgba(255,122,26,0.38)] transition-all cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Novo Produto</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#191b23] border border-[#282a31]/60 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#e0c0b1]/50 text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar produto pelo nome..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#1d1f27] text-[#e2e2ec] placeholder:text-[#e0c0b1]/40 font-body-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#528dff] border border-[#282a31]/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Category Select */}
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none h-11 pl-3.5 pr-9 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-label-md text-xs focus:outline-none focus:ring-1 focus:ring-[#528dff] cursor-pointer border border-[#282a31]/50"
              >
                <option value="all">Todas as Categorias</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#e0c0b1]/60 text-[16px]">
                expand_more
              </span>
            </div>

            {/* Status Select */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="appearance-none h-11 pl-3.5 pr-9 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-label-md text-xs focus:outline-none focus:ring-1 focus:ring-[#528dff] cursor-pointer border border-[#282a31]/50"
              >
                <option value="all">Status: Todos</option>
                <option value="active">Apenas Ativos</option>
                <option value="inactive">Indisponíveis</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#e0c0b1]/60 text-[16px]">
                expand_more
              </span>
            </div>

            {/* Featured Switch Toggle */}
            <label className="flex items-center gap-2 h-11 px-3.5 rounded-xl bg-[#1d1f27] hover:bg-[#282a31] transition-colors cursor-pointer select-none border border-[#282a31]/50">
              <input
                type="checkbox"
                checked={onlyFeatured}
                onChange={(e) => {
                  setOnlyFeatured(e.target.checked);
                  setCurrentPage(1);
                }}
                className="w-4 h-4 rounded bg-[#0c0e15] text-[#ff7a1a] accent-[#ff7a1a] cursor-pointer"
              />
              <span className="font-label-md text-xs text-[#e2e2ec]">Destaques Vitrine</span>
            </label>

            {/* Reset Button */}
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setStatusFilter('all');
                setOnlyFeatured(false);
                setCurrentPage(1);
              }}
              className="h-11 w-11 rounded-xl bg-[#1d1f27] hover:bg-[#282a31] flex items-center justify-center text-[#e0c0b1] hover:text-[#e2e2ec] transition-colors border border-[#282a31]/50 cursor-pointer"
              title="Limpar Filtros"
            >
              <span className="material-symbols-outlined text-[18px]">filter_alt_off</span>
            </button>
          </div>
        </div>

        {/* Live Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#282a31]/40 text-[#e0c0b1]">
          <div className="flex items-center gap-2">
            <span className="font-label-caps text-xs text-[#528dff] font-bold uppercase tracking-wider">
              Status do Inventário:
            </span>
            <span className="font-body-sm text-xs text-[#e2e2ec]">
              Exibindo {paginatedProducts.length} de {products.length} pratos cadastrados
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-label-caps">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
              {activeCount} Ativos
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ffb4ab] shadow-[0_0_8px_rgba(255,180,171,0.8)]"></span>
              {inactiveCount} Esgotados
            </span>
          </div>
        </div>
      </div>

      {/* 3. High-Density Product Table */}
      <div className="bg-[#0c0e15] rounded-2xl overflow-hidden border border-[#282a31]/60 shadow-2xl relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#191b23] text-[#e0c0b1] font-label-caps text-xs uppercase tracking-wider select-none border-b border-[#282a31]">
                <th className="py-4 pl-6 pr-3">Prato &amp; Arte</th>
                <th className="py-4 px-4">Código</th>
                <th className="py-4 px-4">Categoria</th>
                <th className="py-4 px-4">Preço Venda</th>
                <th className="py-4 px-4 text-center">Porção</th>
                <th className="py-4 px-4 text-center">Status</th>
                <th className="py-4 px-4 text-center">Vitrine</th>
                <th className="py-4 px-4">Atualizado</th>
                <th className="py-4 pr-6 pl-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#282a31]/40 font-body-sm text-xs">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#e0c0b1]">
                    Nenhum prato corresponde aos filtros selecionados.
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((dish) => (
                  <tr key={dish.id} className="hover:bg-[#191b23]/50 transition-colors group">
                    {/* Prato & Arte */}
                    <td className="py-3.5 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#282a31] shrink-0 shadow-md">
                          <img
                            src={dish.imageUrl}
                            alt={dish.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex flex-col min-w-0 max-w-xs">
                          <span className="font-headline-sm text-sm text-[#e2e2ec] font-semibold group-hover:text-[#ffb68e] transition-colors truncate">
                            {dish.name}
                          </span>
                          <span className="font-body-sm text-[11px] text-[#e0c0b1]/70 truncate">
                            {dish.shortDescription}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Código */}
                    <td className="py-3.5 px-4 font-mono-price text-xs text-[#528dff] font-semibold whitespace-nowrap">
                      {dish.internalCode}
                    </td>

                    {/* Categoria */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-lg bg-[#1d1f27] text-[#e2e2ec] font-label-md text-xs border border-[#282a31]/50">
                        {dish.category}
                      </span>
                    </td>

                    {/* Preço */}
                    <td className="py-3.5 px-4 font-mono-price text-sm text-[#ff7a1a] font-bold whitespace-nowrap">
                      R$ {dish.price.toFixed(2).replace('.', ',')}
                    </td>

                    {/* Porção */}
                    <td className="py-3.5 px-4 text-center font-label-md text-xs text-[#e0c0b1] whitespace-nowrap">
                      {dish.portion}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-caps text-[10px] font-bold ${
                          dish.isActive
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/20'
                            : 'bg-[#93000a]/40 text-[#ffb4ab] border border-[#ffb4ab]/20'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            dish.isActive ? 'bg-emerald-400' : 'bg-[#ffb4ab]'
                          }`}
                        ></span>
                        {dish.isActive ? 'Ativo' : 'Esgotado'}
                      </span>
                    </td>

                    {/* Vitrine */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      {dish.isFeatured ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ff7a1a]/20 text-[#ff7a1a] font-label-caps text-[10px] font-bold">
                          <span className="material-symbols-outlined text-[13px]">star</span>
                          Home
                        </span>
                      ) : (
                        <span className="text-[#e0c0b1]/30 text-base">—</span>
                      )}
                    </td>

                    {/* Atualizado */}
                    <td className="py-3.5 px-4 text-[#e0c0b1] text-xs whitespace-nowrap">
                      {dish.updatedAt}
                    </td>

                    {/* Ações */}
                    <td className="py-3.5 pr-6 pl-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditDrawer(dish)}
                          className="w-8 h-8 rounded-lg bg-[#191b23] hover:bg-[#282a31] text-[#e0c0b1] hover:text-[#ff7a1a] flex items-center justify-center transition-colors cursor-pointer"
                          title="Editar Prato"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                        </button>

                        <button
                          onClick={() => handleDuplicate(dish.id)}
                          className="w-8 h-8 rounded-lg bg-[#191b23] hover:bg-[#282a31] text-[#e0c0b1] hover:text-[#528dff] flex items-center justify-center transition-colors cursor-pointer"
                          title="Duplicar Item"
                        >
                          <span className="material-symbols-outlined text-[16px]">content_copy</span>
                        </button>

                        <button
                          onClick={() => handleToggleAvailability(dish.id)}
                          className={`w-8 h-8 rounded-lg bg-[#191b23] hover:bg-[#282a31] flex items-center justify-center transition-colors cursor-pointer ${
                            dish.isActive ? 'text-emerald-400' : 'text-[#ffb4ab]'
                          }`}
                          title="Alternar Disponibilidade"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {dish.isActive ? 'toggle_on' : 'toggle_off'}
                          </span>
                        </button>

                        <button
                          onClick={() => setDishToDelete(dish)}
                          className="w-8 h-8 rounded-lg bg-[#191b23] hover:bg-[#282a31] text-[#e0c0b1] hover:text-[#ffb4ab] flex items-center justify-center transition-colors cursor-pointer"
                          title="Remover Prato"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-[#191b23] border-t border-[#282a31] gap-4">
          <div className="flex items-center gap-2 text-[#e0c0b1] text-xs">
            <span>Itens por página:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-[#1d1f27] text-[#e2e2ec] rounded-lg px-2 py-1 text-xs focus:outline-none border border-[#282a31] cursor-pointer"
            >
              <option value={6}>6 pratos</option>
              <option value={12}>12 pratos</option>
              <option value={24}>24 pratos</option>
              <option value={48}>48 pratos</option>
            </select>
            <span className="pl-2">
              Página {currentPage} de {totalPages} ({totalItems} pratos filtrados)
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-lg bg-[#1d1f27] hover:bg-[#282a31] text-[#e2e2ec] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              const isCurrent = p === currentPage;
              return (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-lg font-mono-price text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#ff7a1a] text-[#0c0e15] shadow-[0_0_12px_rgba(255,122,26,0.4)]'
                      : 'bg-[#1d1f27] hover:bg-[#282a31] text-[#e2e2ec]'
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-lg bg-[#1d1f27] hover:bg-[#282a31] text-[#e2e2ec] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Slide-Over Drawer: 5-Block Dish Creator/Editor */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#0c0e15]/80 backdrop-blur-md transition-opacity animate-fadeIn">
          <div className="w-full max-w-2xl h-full bg-[#0c0e15] border-l border-[#282a31] flex flex-col shadow-2xl relative overflow-hidden">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 bg-[#191b23] shrink-0 border-b border-[#282a31]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#ff7a1a]/20 flex items-center justify-center text-[#ff7a1a]">
                  <span className="material-symbols-outlined text-[20px]">
                    {editingDish ? 'edit_note' : 'add_circle'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <h2 className="font-headline-sm text-lg text-[#e2e2ec] uppercase tracking-wide font-bold">
                    {editingDish ? 'Editar Prato Cósmico' : 'Adicionar Novo Prato'}
                  </h2>
                  <span className="font-label-caps text-[10px] text-[#528dff] font-semibold">
                    CÓDIGO: {formSku || 'SS-NOVO'} • SINCRONIZAÇÃO EM TEMPO REAL
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 rounded-lg bg-[#1d1f27] hover:bg-[#282a31] text-[#e0c0b1] hover:text-[#e2e2ec] flex items-center justify-center transition-colors cursor-pointer"
                title="Fechar Painel"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Drawer Scrollable Content: 5 Structured Blocks */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
              {/* BLOCO A: IDENTIFICAÇÃO */}
              <div className="flex flex-col gap-4 p-4 rounded-xl bg-[#191b23] border border-[#282a31]/60">
                <div className="flex items-center gap-2 text-[#ff7a1a]">
                  <span className="material-symbols-outlined text-[18px]">fingerprint</span>
                  <span className="font-label-caps text-xs uppercase tracking-wider font-bold">
                    Bloco A: Identificação do Prato
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                      Nome Oficial do Prato
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => {
                        setFormName(e.target.value);
                        if (!editingDish) {
                          setFormSlug(generateSlug(e.target.value));
                        }
                      }}
                      placeholder="Ex: Combo Dragão Cósmico Supremo"
                      className="w-full h-11 px-3.5 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-body-md text-sm border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                      Slug Automático (URL amigável)
                    </label>
                    <input
                      type="text"
                      value={formSlug}
                      onChange={(e) => setFormSlug(generateSlug(e.target.value))}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#1d1f27] text-[#528dff] font-mono-price text-xs border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                      Código SKU / Interno
                    </label>
                    <input
                      type="text"
                      value={formSku}
                      onChange={(e) => setFormSku(e.target.value.toUpperCase())}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#1d1f27] text-[#ff7a1a] font-mono-price text-xs border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff] uppercase"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                      Categoria Principal
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-body-sm text-xs border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff] cursor-pointer"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                      Descrição Curta (Vitrine / Card)
                    </label>
                    <input
                      type="text"
                      value={formShortDesc}
                      onChange={(e) => setFormShortDesc(e.target.value)}
                      placeholder="Breve resumo sensorial para o card público..."
                      className="w-full h-11 px-3.5 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-body-sm text-xs border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                      Descrição Completa e Experiência Sensorial
                    </label>
                    <textarea
                      rows={3}
                      value={formFullDesc}
                      onChange={(e) => setFormFullDesc(e.target.value)}
                      placeholder="Narrativa gastronômica imersiva e método de preparo..."
                      className="w-full p-3.5 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-body-sm text-xs border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* BLOCO B: INFORMAÇÕES GASTRONÔMICAS */}
              <div className="flex flex-col gap-4 p-4 rounded-xl bg-[#191b23] border border-[#282a31]/60">
                <div className="flex items-center gap-2 text-[#528dff]">
                  <span className="material-symbols-outlined text-[18px]">ramen_dining</span>
                  <span className="font-label-caps text-xs uppercase tracking-wider font-bold">
                    Bloco B: Informações Gastronômicas
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                      Ingredientes Selecionados
                    </label>
                    <input
                      type="text"
                      value={formIngredients}
                      onChange={(e) => setFormIngredients(e.target.value)}
                      placeholder="Ex: Salmão Selvagem, Wagyu A5, Arroz Akazu, Ouro 24k"
                      className="w-full h-11 px-3.5 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-body-sm text-xs border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                      Quantidade de Peças / Porção
                    </label>
                    <input
                      type="text"
                      value={formPortion}
                      onChange={(e) => setFormPortion(e.target.value)}
                      placeholder="Ex: 8 peças, 1 unidade, 16 lâminas"
                      className="w-full h-11 px-3.5 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-body-sm text-xs border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                      Tempo Médio de Preparo
                    </label>
                    <input
                      type="text"
                      value={formPrepTime}
                      onChange={(e) => setFormPrepTime(e.target.value)}
                      placeholder="Ex: 15 - 20 min"
                      className="w-full h-11 px-3.5 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-body-sm text-xs border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff]"
                    />
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                      Alergênicos (Tags Rápidas)
                    </label>
                    <div className="flex flex-wrap gap-2 items-center">
                      {formAllergens.map((alg) => (
                        <span
                          key={alg}
                          className="px-2.5 py-1 rounded-full bg-[#282a31] text-[#ffb68e] font-label-caps text-[11px] flex items-center gap-1.5"
                        >
                          {alg}
                          <button
                            type="button"
                            onClick={() =>
                              setFormAllergens(formAllergens.filter((a) => a !== alg))
                            }
                            className="hover:text-[#ffb4ab] cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[13px]">close</span>
                          </button>
                        </span>
                      ))}

                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={newAllergenInput}
                          onChange={(e) => setNewAllergenInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (newAllergenInput.trim()) {
                                setFormAllergens([
                                  ...formAllergens,
                                  newAllergenInput.trim(),
                                ]);
                                setNewAllergenInput('');
                              }
                            }
                          }}
                          placeholder="Adicionar alergênico..."
                          className="h-8 px-2.5 rounded-lg bg-[#1d1f27] text-[#e2e2ec] text-xs border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (newAllergenInput.trim()) {
                              setFormAllergens([...formAllergens, newAllergenInput.trim()]);
                              setNewAllergenInput('');
                            }
                          }}
                          className="h-8 px-2 rounded-lg bg-[#282a31] hover:bg-[#ff7a1a] hover:text-[#0c0e15] text-[#e2e2ec] text-xs font-semibold transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BLOCO C: PREÇO & OFERTAS */}
              <div className="flex flex-col gap-4 p-4 rounded-xl bg-[#191b23] border border-[#282a31]/60">
                <div className="flex items-center gap-2 text-[#ff7a1a]">
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                  <span className="font-label-caps text-xs uppercase tracking-wider font-bold">
                    Bloco C: Precificação de Venda
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                      Preço de Venda Regular (R$)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono-price text-xs text-[#ff7a1a] font-bold">
                        R$
                      </span>
                      <input
                        type="text"
                        value={formPrice}
                        onChange={(e) => setFormPrice(e.target.value)}
                        placeholder="88,00"
                        className="w-full h-11 pl-11 pr-4 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-mono-price text-sm font-bold border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#ff7a1a]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                      Preço Promocional (Opcional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono-price text-xs text-[#528dff] font-bold">
                        R$
                      </span>
                      <input
                        type="text"
                        value={formPromoPrice}
                        onChange={(e) => setFormPromoPrice(e.target.value)}
                        placeholder="Ex: 79,00"
                        className="w-full h-11 pl-11 pr-4 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-mono-price text-sm border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* BLOCO D: GALERIA E IMAGENS */}
              <div className="flex flex-col gap-4 p-4 rounded-xl bg-[#191b23] border border-[#282a31]/60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#d0bcff]">
                    <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                    <span className="font-label-caps text-xs uppercase tracking-wider font-bold">
                      Bloco D: Galeria &amp; Apresentação
                    </span>
                  </div>
                  <span className="font-label-caps text-[10px] text-[#e0c0b1]">
                    URL / WebP / JPG
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Active Image Card */}
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-[#1d1f27] group shadow-md border border-[#282a31]">
                    <img
                      src={
                        formImageUrl ||
                        'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80'
                      }
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-[#0c0e15]/80 text-[#ff7a1a] font-label-caps text-[9px] font-bold">
                      CAPA
                    </span>
                  </div>

                  {/* Image URL input */}
                  <div className="sm:col-span-2 flex flex-col justify-between p-3.5 rounded-xl bg-[#1d1f27] border border-[#282a31] gap-2">
                    <label className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                      URL da Imagem de Destaque
                    </label>
                    <input
                      type="url"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full h-10 px-3 rounded-lg bg-[#0c0e15] text-[#e2e2ec] font-body-sm text-xs border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff]"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#e0c0b1]/60">Presets rápidos:</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormImageUrl(
                            'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80'
                          )
                        }
                        className="px-2 py-0.5 rounded bg-[#282a31] hover:bg-[#ff7a1a] hover:text-[#0c0e15] text-[10px] text-[#e2e2ec] transition-colors cursor-pointer"
                      >
                        Roll
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormImageUrl(
                            'https://images.unsplash.com/photo-1563612116625-3012372fccce?auto=format&fit=crop&w=800&q=80'
                          )
                        }
                        className="px-2 py-0.5 rounded bg-[#282a31] hover:bg-[#ff7a1a] hover:text-[#0c0e15] text-[10px] text-[#e2e2ec] transition-colors cursor-pointer"
                      >
                        Nigiri
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setFormImageUrl(
                            'https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=800&q=80'
                          )
                        }
                        className="px-2 py-0.5 rounded bg-[#282a31] hover:bg-[#ff7a1a] hover:text-[#0c0e15] text-[10px] text-[#e2e2ec] transition-colors cursor-pointer"
                      >
                        Temaki
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* BLOCO E: REGRAS DE PUBLICAÇÃO */}
              <div className="flex flex-col gap-4 p-4 rounded-xl bg-[#191b23] border border-[#282a31]/60">
                <div className="flex items-center gap-2 text-[#ff7a1a]">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span className="font-label-caps text-xs uppercase tracking-wider font-bold">
                    Bloco E: Regras de Publicação
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Toggle Ativo */}
                  <label className="flex items-center justify-between p-3 rounded-xl bg-[#1d1f27] cursor-pointer hover:bg-[#282a31] transition-colors">
                    <div className="flex flex-col">
                      <span className="font-label-md text-sm text-[#e2e2ec] font-semibold">
                        Prato Ativo para Venda
                      </span>
                      <span className="font-body-sm text-xs text-[#e0c0b1]/70">
                        Visível para pedidos imediatos na página de cardápio
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formIsActive}
                      onChange={(e) => setFormIsActive(e.target.checked)}
                      className="w-5 h-5 rounded accent-emerald-500 cursor-pointer"
                    />
                  </label>

                  {/* Toggle Destaque Home */}
                  <label className="flex items-center justify-between p-3 rounded-xl bg-[#1d1f27] cursor-pointer hover:bg-[#282a31] transition-colors">
                    <div className="flex flex-col">
                      <span className="font-label-md text-sm text-[#e2e2ec] font-semibold">
                        Exibir na Vitrine Principal (Home)
                      </span>
                      <span className="font-body-sm text-xs text-[#e0c0b1]/70">
                        Destaca o prato nas primeiras posições com estrela cósmica
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formIsFeatured}
                      onChange={(e) => setFormIsFeatured(e.target.checked)}
                      className="w-5 h-5 rounded accent-[#ff7a1a] cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#191b23] border-t border-[#282a31] shrink-0">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-[#1d1f27] hover:bg-[#282a31] text-[#e0c0b1] hover:text-[#e2e2ec] font-label-md text-xs transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveDish}
                  className="px-6 py-2.5 rounded-xl bg-[#ff7a1a] hover:bg-[#ff8833] text-[#0c0e15] font-headline-sm text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(255,122,26,0.35)] transition-all cursor-pointer"
                >
                  Salvar &amp; Publicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {dishToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c0e15]/80 backdrop-blur-md animate-fadeIn p-4">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#191b23] border border-[#ffb4ab]/30 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#93000a]/30 text-[#ffb4ab] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">delete</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-caps text-xs text-[#ffb4ab] uppercase font-bold">
                  Confirmação de Exclusão
                </span>
                <h3 className="font-headline-sm text-base text-[#e2e2ec] font-bold">
                  Remover "{dishToDelete.name}"?
                </h3>
              </div>
            </div>

            <p className="font-body-sm text-xs text-[#e0c0b1]">
              Esta ação removerá o prato permanentemente do catálogo administrativo e do cardápio público em tempo real.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDishToDelete(null)}
                className="px-4 py-2 rounded-xl bg-[#1d1f27] hover:bg-[#282a31] text-[#e2e2ec] font-label-md text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-[#ffb4ab] hover:bg-[#ffdad6] text-[#690005] font-headline-sm text-xs uppercase font-bold cursor-pointer"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
