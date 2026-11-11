import React, { useState } from 'react';
import { storeService } from '../services/storeService';
import { AdminCategory } from '../types/admin';

export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<AdminCategory[]>(() => storeService.getCategories());
  const products = storeService.getProducts();

  // Form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formOrder, setFormOrder] = useState<number>(categories.length + 1);
  const [formIcon, setFormIcon] = useState('dinner_dining');
  const [formIsQuickNav, setFormIsQuickNav] = useState(true);
  const [formIsHighlight, setFormIsHighlight] = useState(false);

  // Safeguard Modal state
  const [targetCatToDelete, setTargetCatToDelete] = useState<AdminCategory | null>(null);
  const [migrationDestination, setMigrationDestination] = useState<string>('');

  // Toast
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(null), 3000);
  };

  React.useEffect(() => {
    const unsub = storeService.subscribe(() => {
      setCategories(storeService.getCategories());
    });
    return unsub;
  }, []);

  const generateSlug = (val: string) => {
    return val
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleEditCategory = (cat: AdminCategory) => {
    setEditingId(cat.id);
    setFormName(cat.name);
    setFormSlug(cat.slug);
    setFormDesc(cat.description);
    setFormOrder(cat.displayOrder);
    setFormIcon(cat.icon);
    setFormIsQuickNav(cat.isQuickNav);
    setFormIsHighlight(cat.isHighlight);
  };

  const handleResetForm = () => {
    setEditingId(null);
    setFormName('');
    setFormSlug('');
    setFormDesc('');
    setFormOrder(categories.length + 1);
    setFormIcon('dinner_dining');
    setFormIsQuickNav(true);
    setFormIsHighlight(false);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert('Informe o nome da categoria');
      return;
    }

    if (editingId) {
      storeService.updateCategory(editingId, {
        name: formName,
        slug: formSlug || generateSlug(formName),
        description: formDesc,
        displayOrder: Number(formOrder),
        icon: formIcon,
        isQuickNav: formIsQuickNav,
        isHighlight: formIsHighlight,
      });
      showToast(`Categoria "${formName}" atualizada com sucesso!`);
    } else {
      storeService.addCategory({
        name: formName,
        slug: formSlug || generateSlug(formName),
        description: formDesc,
        displayOrder: Number(formOrder),
        icon: formIcon,
        isActive: true,
        isQuickNav: formIsQuickNav,
        isHighlight: formIsHighlight,
      });
      showToast(`Categoria "${formName}" adicionada com sucesso!`);
    }

    handleResetForm();
  };

  const handleOpenSafeguard = (cat: AdminCategory) => {
    setTargetCatToDelete(cat);
    const otherCats = categories.filter((c) => c.id !== cat.id);
    setMigrationDestination(otherCats[0]?.name || 'desativar');
  };

  const handleConfirmSafeguard = () => {
    if (!targetCatToDelete) return;
    storeService.deleteCategory(targetCatToDelete.id, migrationDestination);
    showToast(`Categoria removida e produtos vinculados foram migrados com segurança!`);
    setTargetCatToDelete(null);
  };

  const handleMoveOrder = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= categories.length) return;

    const copy = [...categories];
    const temp = copy[index];
    copy[index] = copy[newIndex];
    copy[newIndex] = temp;

    const ids = copy.map((c) => c.id);
    storeService.reorderCategories(ids);
  };

  const totalDishes = products.length;
  const visibleSections = categories.filter((c) => c.isActive).length;

  return (
    <div className="flex flex-col w-full gap-8">
      {/* Toast Notification */}
      {toastNotice && (
        <div className="fixed top-24 right-8 z-50 bg-[#1d1f27] border border-[#ff7a1a] text-[#e2e2ec] px-4 py-3 rounded-xl shadow-[0_0_24px_rgba(255,122,26,0.35)] flex items-center gap-3 animate-fadeIn">
          <span className="material-symbols-outlined text-[#ff7a1a] text-[20px]">check_circle</span>
          <span className="font-label-md text-xs font-semibold">{toastNotice}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="flex flex-col gap-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff7a1a] shadow-[0_0_8px_#ff7a1a]"></span>
            <span className="font-label-caps text-xs text-[#ffb68e] tracking-widest uppercase font-bold">
              Arquitetura de Cardápio Omakase
            </span>
          </div>
          <h1 className="font-headline-lg text-3xl md:text-4xl text-[#e2e2ec] uppercase tracking-tight font-bold">
            Categorias do Cardápio
          </h1>
          <p className="font-body-md text-sm text-[#e0c0b1] mt-1">
            Estruture as seções e agrupamentos do menu público. Reordene para definir a sequência de exibição na página pública com sincronização cinética em tempo real.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#191b23] text-[#e0c0b1] font-label-md text-xs border border-[#282a31]">
            <span className="material-symbols-outlined text-[18px] text-[#528dff]">tune</span>
            <span>{visibleSections} Seções Ativas</span>
          </div>
          <button
            onClick={() => {
              handleResetForm();
              const el = document.getElementById('input-cat-name');
              el?.focus();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff7a1a] hover:bg-[#ff8833] text-[#0c0e15] font-headline-sm text-sm font-bold uppercase tracking-wider shadow-[0_0_24px_rgba(255,122,26,0.38)] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Nova Categoria</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Split Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column: Categories List & Reordering (7 Cols) */}
        <div className="xl:col-span-7 flex flex-col gap-4">
          {/* Table Action Bar / Status */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#191b23] border border-[#282a31]/60 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="font-label-caps text-xs text-[#e0c0b1] uppercase tracking-wider font-bold">
                Sequência do Menu Público
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#282a31] text-[#528dff] font-label-caps text-[10px]">
                Reordene a prioridade
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#e0c0b1] font-body-sm text-xs">
              <span className="material-symbols-outlined text-[16px] text-[#ff7a1a]">sync</span>
              <span>Auto-save ativo</span>
            </div>
          </div>

          {/* Category Cards List */}
          <div className="flex flex-col gap-3">
            {categories.map((cat, idx) => {
              const productCount = products.filter((p) => p.category === cat.name).length;
              return (
                <div
                  key={cat.id}
                  className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-[#191b23] border border-[#282a31]/60 hover:bg-[#1d1f27] hover:border-[#ff7a1a]/40 transition-all shadow-md"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Reorder Buttons */}
                    <div className="flex flex-col items-center justify-center gap-0.5">
                      <button
                        onClick={() => handleMoveOrder(idx, 'up')}
                        disabled={idx === 0}
                        className="text-[#e0c0b1]/50 hover:text-[#ff7a1a] disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                        title="Subir posição"
                      >
                        <span className="material-symbols-outlined text-[16px]">expand_less</span>
                      </button>
                      <button
                        onClick={() => handleMoveOrder(idx, 'down')}
                        disabled={idx === categories.length - 1}
                        className="text-[#e0c0b1]/50 hover:text-[#ff7a1a] disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                        title="Descer posição"
                      >
                        <span className="material-symbols-outlined text-[16px]">expand_more</span>
                      </button>
                    </div>

                    {/* Category Icon */}
                    <div className="w-11 h-11 rounded-xl bg-[#0c0e15] flex items-center justify-center text-[#ff7a1a] shadow-inner shrink-0 border border-[#282a31]">
                      <span className="material-symbols-outlined text-[22px]">{cat.icon || 'set_meal'}</span>
                    </div>

                    {/* Category Details */}
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-headline-sm text-base text-[#e2e2ec] font-bold truncate">
                          {cat.name}
                        </span>
                        {cat.isHighlight && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a1a] shadow-[0_0_6px_#ff7a1a]"></span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-[#e0c0b1]">
                        <span className="font-mono-price text-[#528dff]">/cardapio#{cat.slug}</span>
                        <span className="text-[#e0c0b1]/40">•</span>
                        <span>{productCount} pratos catalogados</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Status */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 mt-3 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#282a31]/40">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-price text-xs text-[#e0c0b1] bg-[#0c0e15] px-2.5 py-1 rounded-lg border border-[#282a31]">
                        #{cat.displayOrder < 10 ? `0${cat.displayOrder}` : cat.displayOrder}
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-label-caps font-semibold ${
                          cat.isActive
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/20'
                            : 'bg-[#282a31] text-[#e0c0b1]'
                        }`}
                      >
                        {cat.isActive ? 'Ativa' : 'Oculta'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEditCategory(cat)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#e0c0b1] hover:text-[#ff7a1a] hover:bg-[#282a31] transition-colors cursor-pointer"
                        title="Editar Seção"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        onClick={() => handleOpenSafeguard(cat)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#e0c0b1] hover:text-[#ffb4ab] hover:bg-[#282a31] transition-colors cursor-pointer"
                        title="Excluir Categoria (com salvaguarda)"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Metric Panel for Sections */}
          <div className="grid grid-cols-3 gap-3 mt-2">
            <div className="p-4 rounded-xl bg-[#191b23] border border-[#282a31]/60 flex flex-col justify-between">
              <span className="font-label-caps text-[11px] text-[#e0c0b1] font-bold">TOTAL DE ITENS</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-headline-lg text-2xl text-[#ff7a1a] font-bold">{totalDishes}</span>
                <span className="font-body-sm text-xs text-[#e0c0b1]">pratos</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#191b23] border border-[#282a31]/60 flex flex-col justify-between">
              <span className="font-label-caps text-[11px] text-[#e0c0b1] font-bold">SEÇÕES VISÍVEIS</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-headline-lg text-2xl text-[#528dff] font-bold">{visibleSections}</span>
                <span className="font-body-sm text-xs text-[#e0c0b1]">no site</span>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#191b23] border border-[#282a31]/60 flex flex-col justify-between">
              <span className="font-label-caps text-[11px] text-[#e0c0b1] font-bold">TAXA DE RETENÇÃO</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="font-headline-lg text-2xl text-[#e2e2ec] font-bold">98.4%</span>
                <span className="font-body-sm text-xs text-[#ff7a1a] font-semibold">+3.8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Create / Edit Form (5 Cols) */}
        <div className="xl:col-span-5 flex flex-col gap-4 sticky top-24">
          <div className="p-6 rounded-2xl bg-[#191b23] border border-[#282a31]/60 shadow-xl flex flex-col gap-4 relative overflow-hidden">
            <div className="flex items-center justify-between pb-1">
              <div className="flex flex-col">
                <span className="font-label-caps text-xs text-[#ff7a1a] uppercase tracking-widest font-bold">
                  Painel de Configuração
                </span>
                <h2 className="font-headline-md text-xl text-[#e2e2ec] font-bold tracking-tight">
                  {editingId ? 'Editar Categoria' : 'Criar Categoria'}
                </h2>
              </div>
              <div className="w-8 h-8 rounded-xl bg-[#1d1f27] flex items-center justify-center text-[#ff7a1a] border border-[#282a31]">
                <span className="material-symbols-outlined text-[20px]">post_add</span>
              </div>
            </div>

            <form onSubmit={handleSaveCategory} className="flex flex-col gap-4">
              {/* Nome */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-caps text-xs text-[#e0c0b1] uppercase font-bold">
                  Nome da Categoria
                </label>
                <div className="relative">
                  <input
                    id="input-cat-name"
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => {
                      setFormName(e.target.value);
                      if (!editingId) {
                        setFormSlug(generateSlug(e.target.value));
                      }
                    }}
                    placeholder="Ex: Uramakis Nobres"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-body-md text-sm border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff]"
                  />
                  <span className="absolute right-3 top-3 material-symbols-outlined text-[#ff7a1a] text-[18px]">
                    edit_note
                  </span>
                </div>
              </div>

              {/* Slug */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-label-caps text-xs text-[#e0c0b1] uppercase font-bold">
                    Slug do Cardápio (URL)
                  </label>
                  <span className="font-body-sm text-xs text-[#528dff]">gerado dinamicamente</span>
                </div>
                <div className="flex items-center h-11 px-3.5 rounded-xl bg-[#1d1f27] text-[#e0c0b1] font-mono-price text-xs border border-[#282a31]">
                  <span className="text-[#e0c0b1]/50 mr-1">/cardapio#</span>
                  <input
                    type="text"
                    value={formSlug}
                    onChange={(e) => setFormSlug(generateSlug(e.target.value))}
                    className="bg-transparent text-[#528dff] focus:outline-none w-full"
                  />
                </div>
              </div>

              {/* Descrição */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-caps text-xs text-[#e0c0b1] uppercase font-bold">
                  Descrição do Agrupamento
                </label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Breve texto sensorial descritivo para encantar o cliente durante a navegação..."
                  className="w-full p-3.5 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-body-sm text-xs border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff] resize-none"
                />
              </div>

              {/* Order & Icon */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-xs text-[#e0c0b1] uppercase font-bold">
                    Ordem de Prioridade
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-mono-price text-sm border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-xs text-[#e0c0b1] uppercase font-bold">
                    Ícone Temático
                  </label>
                  <div className="flex items-center gap-2 h-11 px-2.5 rounded-xl bg-[#1d1f27] text-[#e2e2ec] border border-[#282a31]">
                    <span className="material-symbols-outlined text-[18px] text-[#ff7a1a]">
                      {formIcon}
                    </span>
                    <select
                      value={formIcon}
                      onChange={(e) => setFormIcon(e.target.value)}
                      className="bg-transparent text-[#e2e2ec] font-body-sm text-xs focus:outline-none w-full cursor-pointer"
                    >
                      <option className="bg-[#1d1f27]" value="set_meal">set_meal</option>
                      <option className="bg-[#1d1f27]" value="water_drop">water_drop</option>
                      <option className="bg-[#1d1f27]" value="local_fire_department">local_fire_department</option>
                      <option className="bg-[#1d1f27]" value="cyclone">cyclone</option>
                      <option className="bg-[#1d1f27]" value="whatshot">whatshot</option>
                      <option className="bg-[#1d1f27]" value="stars">stars</option>
                      <option className="bg-[#1d1f27]" value="dinner_dining">dinner_dining</option>
                      <option className="bg-[#1d1f27]" value="icecream">icecream</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-col gap-2 pt-1">
                <label className="flex items-center justify-between p-3 rounded-xl bg-[#1d1f27] cursor-pointer hover:bg-[#282a31] transition-colors">
                  <div className="flex flex-col">
                    <span className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                      Navegação Rápida
                    </span>
                    <span className="font-body-sm text-[11px] text-[#e0c0b1]/70">
                      Fixar aba no filtro do cardápio público
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formIsQuickNav}
                    onChange={(e) => setFormIsQuickNav(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#ff7a1a] cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#1d1f27] cursor-pointer hover:bg-[#282a31] transition-colors">
                  <div className="flex flex-col">
                    <span className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                      Destaque Cósmico
                    </span>
                    <span className="font-body-sm text-[11px] text-[#e0c0b1]/70">
                      Adiciona badge luminoso na aba da categoria
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formIsHighlight}
                    onChange={(e) => setFormIsHighlight(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#ff7a1a] cursor-pointer"
                  />
                </label>
              </div>

              {/* Submit / Reset buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-[#ff7a1a] hover:bg-[#ff8833] text-[#0c0e15] font-headline-sm text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,122,26,0.3)] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>{editingId ? 'Atualizar Categoria' : 'Salvar Categoria'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="h-11 px-4 rounded-xl bg-[#1d1f27] hover:bg-[#282a31] text-[#e0c0b1] font-label-md text-xs transition-colors cursor-pointer"
                >
                  Limpar
                </button>
              </div>
            </form>
          </div>

          {/* Quick Tips Callout */}
          <div className="p-4 rounded-xl bg-[#191b23] border border-[#282a31]/60 flex items-start gap-3">
            <span className="material-symbols-outlined text-[#528dff] text-[22px] mt-0.5">lightbulb</span>
            <div className="flex flex-col">
              <span className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                Dica de Experiência Gastronômica
              </span>
              <p className="font-body-sm text-xs text-[#e0c0b1]/80 mt-0.5">
                Posicione no topo categorias com maior margem (como Omakases e Sashimis Nobres) para aumentar o ticket médio por comensal em até 22%.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Safeguard Deletion Modal */}
      {targetCatToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c0e15]/80 backdrop-blur-md animate-fadeIn p-4">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#191b23] border border-[#ffb4ab]/30 shadow-2xl flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#93000a]/30 text-[#ffb4ab] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[26px]">shield_with_heart</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-caps text-xs text-[#ffb4ab] tracking-widest uppercase font-bold">
                  Protocolo de Salvaguarda Ativo
                </span>
                <h3 className="font-headline-sm text-lg text-[#e2e2ec] font-bold">
                  Remover "{targetCatToDelete.name}"
                </h3>
              </div>
            </div>

            {/* Warning Body */}
            <div className="p-4 rounded-xl bg-[#1d1f27] border border-[#282a31] flex flex-col gap-1.5">
              <p className="font-body-md text-xs text-[#e2e2ec]">
                <strong className="text-[#ff7a1a] font-semibold">Atenção Crítica:</strong> Esta categoria possui{' '}
                <span className="font-mono text-[#ff7a1a] font-bold">
                  {products.filter((p) => p.category === targetCatToDelete.name).length}
                </span>{' '}
                produtos vinculados ao cardápio público.
              </p>
              <p className="font-body-sm text-xs text-[#e0c0b1]/80">
                Para evitar que os sushis fiquem órfãos ou indisponíveis para os clientes, selecione uma categoria de destino antes de confirmar a exclusão.
              </p>
            </div>

            {/* Relocation Select Box */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-caps text-xs text-[#e0c0b1] uppercase font-bold">
                Migrar Produtos Automaticamente Para:
              </label>
              <div className="relative">
                <select
                  value={migrationDestination}
                  onChange={(e) => setMigrationDestination(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-body-sm text-xs border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff] cursor-pointer appearance-none"
                >
                  {categories
                    .filter((c) => c.id !== targetCatToDelete.id)
                    .map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  <option value="desativar">Ocultar/Desativar todos os produtos temporariamente</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-3 top-3 text-[#e0c0b1]/60 text-[18px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setTargetCatToDelete(null)}
                className="px-4 py-2 rounded-xl bg-[#1d1f27] hover:bg-[#282a31] text-[#e2e2ec] font-label-md text-xs cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmSafeguard}
                className="px-5 py-2 rounded-xl bg-[#93000a] hover:bg-[#b00010] text-[#ffdad6] font-headline-sm text-xs uppercase font-bold flex items-center gap-1.5 cursor-pointer shadow-[0_0_16px_rgba(255,180,171,0.25)]"
              >
                <span className="material-symbols-outlined text-[16px]">rule_folder</span>
                <span>Migrar &amp; Excluir</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
