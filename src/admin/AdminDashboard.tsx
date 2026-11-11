import React from 'react';
import { storeService } from '../services/storeService';
import { AdminProduct, AuditLog } from '../types/admin';

interface AdminDashboardProps {
  onNavigateTab: (tab: 'dashboard' | 'catalogo' | 'categorias' | 'configuracoes') => void;
  onOpenCreateProduct: () => void;
  onRefreshSync?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigateTab,
  onOpenCreateProduct,
}) => {
  const products = storeService.getProducts();
  const categories = storeService.getCategories();
  const auditLogs = storeService.getAuditLogs();

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.isActive).length;
  const unavailableProducts = products.filter((p) => !p.isActive);
  const featuredProducts = products.filter((p) => p.isFeatured).length;
  const totalCategories = categories.length;

  const availabilityRate = totalProducts > 0 
    ? ((activeProducts / totalProducts) * 100).toFixed(1) 
    : '100.0';

  const recentProducts = products.slice(0, 4);

  const handleReactivateDish = (dish: AdminProduct) => {
    storeService.updateProduct(dish.id, { isActive: true });
  };

  return (
    <div className="flex flex-col w-full gap-8">
      {/* 1. Header & Live Sync Status Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-label-caps text-xs text-[#ffb68e] tracking-widest uppercase font-bold">
              CONSOLE OPERACIONAL
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#584236]"></span>
            <span className="font-mono-price text-xs text-[#e0c0b1] flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">calendar_today</span>
              {new Date().toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </span>
          </div>

          <h1 className="font-headline-lg text-3xl md:text-4xl text-[#e2e2ec] tracking-tight font-bold">
            Bem-vindo de volta, <span className="text-[#ff7a1a]">Chef &amp; Curador</span>
          </h1>
          <p className="font-body-md text-sm md:text-base text-[#e0c0b1] mt-1 max-w-3xl">
            Monitoramento de frescor dos pescados nobres, estoque omakase e vitrine digital sincronizada em tempo real com o cardápio público.
          </p>
        </div>

        {/* Live Sync Pill */}
        <div className="flex items-center gap-3 self-start lg:self-center">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#191b23] border border-[#282a31]/60 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff7a1a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff7a1a]"></span>
            </span>
            <span className="font-label-md text-sm text-[#e2e2ec] font-semibold">
              Cardápio Público Sincronizado
            </span>
            <span className="font-label-caps text-[10px] text-[#0c0e15] bg-[#ffb68e] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
              Online
            </span>
          </div>

          <button
            onClick={() => onNavigateTab('dashboard')}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1d1f27] hover:bg-[#282a31] text-[#e2e2ec] transition-all cursor-pointer border border-[#282a31]"
            title="Atualizar Métricas"
          >
            <span className="material-symbols-outlined text-[19px]">sync</span>
          </button>
        </div>
      </div>

      {/* 2. Visual KPI Grid (5 Metric Blocks) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric 1: Total Produtos */}
        <div className="flex flex-col justify-between p-5 rounded-2xl bg-[#191b23] border border-[#282a31]/60 shadow-md relative overflow-hidden group hover:bg-[#1d1f27] transition-all">
          <div className="flex items-start justify-between">
            <span className="font-label-caps text-xs text-[#e0c0b1] uppercase font-bold tracking-wider">
              Total Cadastrados
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#282a31] flex items-center justify-center text-[#ffb68e]">
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-display-hero text-3xl font-extrabold text-[#e2e2ec] tracking-tight">
              {totalProducts}
            </div>
            <div className="flex items-center gap-1.5 mt-1 font-body-sm text-xs text-[#afc6ff]">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span className="font-semibold">catálogo completo</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Ativos no Menu */}
        <div className="flex flex-col justify-between p-5 rounded-2xl bg-[#191b23] border border-[#282a31]/60 shadow-md relative overflow-hidden group hover:bg-[#1d1f27] transition-all">
          <div className="flex items-start justify-between">
            <span className="font-label-caps text-xs text-[#e0c0b1] uppercase font-bold tracking-wider">
              Ativos no Menu
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#282a31] flex items-center justify-center text-[#528dff]">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-display-hero text-3xl font-extrabold text-[#e2e2ec] tracking-tight">
              {activeProducts} <span className="font-headline-sm text-sm text-[#e0c0b1] font-normal">pratos</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 font-body-sm text-xs text-[#e0c0b1]">
              <span className="text-[#ff7a1a] font-mono-price font-bold">{availabilityRate}%</span>
              <span>disponibilidade total</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Esgotados / Indisponíveis */}
        <div className="flex flex-col justify-between p-5 rounded-2xl bg-[#191b23] border border-[#282a31]/60 shadow-md relative overflow-hidden group hover:bg-[#1d1f27] transition-all">
          <div className="flex items-start justify-between">
            <span className="font-label-caps text-xs text-[#e0c0b1] uppercase font-bold tracking-wider">
              Indisponíveis
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#93000a]/20 flex items-center justify-center text-[#ffb4ab]">
              <span className="material-symbols-outlined text-[18px]">warning</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-display-hero text-3xl font-extrabold text-[#ffb4ab] tracking-tight">
              {unavailableProducts.length < 10 ? `0${unavailableProducts.length}` : unavailableProducts.length}{' '}
              <span className="font-headline-sm text-sm text-[#e0c0b1] font-normal">itens</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 font-body-sm text-xs text-[#e0c0b1]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]"></span>
              <span className="truncate">Aviso de safra / pausa</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Categorias */}
        <div className="flex flex-col justify-between p-5 rounded-2xl bg-[#191b23] border border-[#282a31]/60 shadow-md relative overflow-hidden group hover:bg-[#1d1f27] transition-all">
          <div className="flex items-start justify-between">
            <span className="font-label-caps text-xs text-[#e0c0b1] uppercase font-bold tracking-wider">
              Categorias
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#282a31] flex items-center justify-center text-[#d0bcff]">
              <span className="material-symbols-outlined text-[18px]">folder_open</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-display-hero text-3xl font-extrabold text-[#e2e2ec] tracking-tight">
              {totalCategories < 10 ? `0${totalCategories}` : totalCategories}
            </div>
            <div className="flex items-center gap-1.5 mt-1 font-body-sm text-xs text-[#e0c0b1]">
              <span className="text-[#d0bcff] font-semibold">100%</span>
              <span>ativas e ordenadas</span>
            </div>
          </div>
        </div>

        {/* Metric 5: Vitrine Cósmica */}
        <div className="flex flex-col justify-between p-5 rounded-2xl bg-[#191b23] border border-[#282a31]/60 shadow-md relative overflow-hidden group hover:bg-[#1d1f27] transition-all">
          <div className="flex items-start justify-between">
            <span className="font-label-caps text-xs text-[#e0c0b1] uppercase font-bold tracking-wider">
              Vitrine Cósmica
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#ff7a1a]/20 flex items-center justify-center text-[#ff7a1a]">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-display-hero text-3xl font-extrabold text-[#e2e2ec] tracking-tight">
              {featuredProducts < 10 ? `0${featuredProducts}` : featuredProducts}{' '}
              <span className="font-headline-sm text-sm text-[#ff7a1a] font-normal">slots</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 font-body-sm text-xs text-[#e0c0b1]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a1a]"></span>
              <span>Destaque na Home</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quick Actions Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#191b23] border border-[#282a31]/60">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ff7a1a] text-[20px]">bolt</span>
          <span className="font-label-caps text-xs text-[#e2e2ec] font-bold uppercase tracking-wider">
            Ações Rápidas de Curadoria
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenCreateProduct}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff7a1a] hover:bg-[#ff8833] text-[#0c0e15] font-headline-sm text-sm font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,122,26,0.35)] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Cadastrar Novo Produto</span>
          </button>

          <button
            onClick={() => onNavigateTab('catalogo')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1d1f27] hover:bg-[#282a31] text-[#e2e2ec] font-label-md text-sm border border-[#282a31] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#528dff]">restaurant_menu</span>
            <span>Gerenciar Catálogo</span>
          </button>

          <button
            onClick={() => onNavigateTab('categorias')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1d1f27] hover:bg-[#282a31] text-[#e2e2ec] font-label-md text-sm border border-[#282a31] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#d0bcff]">category</span>
            <span>Gerenciar Categorias</span>
          </button>
        </div>
      </div>

      {/* 4. Split Grid: Recently Added & Attention Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (8 cols): Recent Products */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ff7a1a]"></span>
              <h2 className="font-headline-sm text-lg font-bold text-[#e2e2ec] uppercase">
                Pratos Adicionados Recentemente
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab('catalogo')}
              className="text-xs font-label-md text-[#528dff] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Ver todos os {totalProducts}</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentProducts.map((dish) => (
              <div
                key={dish.id}
                className="flex items-center gap-4 p-3.5 rounded-xl bg-[#191b23] border border-[#282a31]/50 hover:bg-[#1d1f27] transition-all group"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#282a31] shrink-0 relative shadow-inner">
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {dish.isFeatured && (
                    <span className="absolute top-1 left-1 px-1 py-0.2 bg-[#ff7a1a] text-[#0c0e15] font-label-caps text-[9px] font-bold rounded">
                      ★
                    </span>
                  )}
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-headline-sm text-sm text-[#e2e2ec] font-semibold truncate group-hover:text-[#ffb68e] transition-colors">
                    {dish.name}
                  </span>
                  <span className="font-body-sm text-xs text-[#e0c0b1]/70 truncate">
                    {dish.category} • {dish.portion}
                  </span>
                  <div className="flex items-center justify-between mt-1 pt-1 border-t border-[#282a31]/40">
                    <span className="font-mono-price text-sm text-[#ff7a1a] font-bold">
                      R$ {dish.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-label-caps font-semibold ${
                        dish.isActive
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/20'
                          : 'bg-[#93000a]/40 text-[#ffb4ab] border border-[#ffb4ab]/20'
                      }`}
                    >
                      {dish.isActive ? 'Ativo' : 'Indisponível'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right (4 cols): Attention / Indisponíveis Box */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ffb4ab]"></span>
              <h2 className="font-headline-sm text-lg font-bold text-[#e2e2ec] uppercase">
                Atenção &amp; Indisponibilidade
              </h2>
            </div>
            <span className="font-mono-price text-xs text-[#ffb4ab] font-bold">
              {unavailableProducts.length} itens
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#191b23] border border-[#282a31]/60 flex flex-col gap-3">
            {unavailableProducts.length === 0 ? (
              <div className="py-8 flex flex-col items-center justify-center text-center text-[#e0c0b1]">
                <span className="material-symbols-outlined text-emerald-400 text-3xl mb-1">
                  check_circle
                </span>
                <span className="font-label-md text-sm text-[#e2e2ec] font-semibold">
                  Tudo disponível no salão
                </span>
                <p className="font-body-sm text-xs text-[#e0c0b1]/70 max-w-xs mt-1">
                  Nenhum prato está pausado ou esgotado neste momento.
                </p>
              </div>
            ) : (
              unavailableProducts.map((dish) => (
                <div
                  key={dish.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#1d1f27] border border-[#93000a]/30"
                >
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="font-label-md text-xs font-semibold text-[#e2e2ec] truncate">
                      {dish.name}
                    </span>
                    <span className="font-body-sm text-[11px] text-[#ffb4ab]">
                      Pausado no cardápio público
                    </span>
                  </div>
                  <button
                    onClick={() => handleReactivateDish(dish)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 text-xs font-label-md border border-emerald-500/30 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 shrink-0"
                    title="Reativar imediatamente"
                  >
                    <span className="material-symbols-outlined text-[14px]">toggle_on</span>
                    <span>Reativar</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 5. Atividades Recentes de Curadoria (Audit Logs Table) */}
      <div className="p-6 rounded-2xl bg-[#191b23] border border-[#282a31]/60 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#528dff] text-[20px]">history</span>
            <h2 className="font-headline-sm text-lg font-bold text-[#e2e2ec] uppercase">
              Atividades Recentes de Curadoria (Audit Log)
            </h2>
          </div>
          <span className="font-label-caps text-xs text-[#e0c0b1]">
            Últimas {Math.min(auditLogs.length, 5)} operações
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#282a31]/40 text-[#e0c0b1] font-label-caps text-xs uppercase tracking-wider">
                <th className="py-3 px-4">Horário</th>
                <th className="py-3 px-4">Autor</th>
                <th className="py-3 px-4">Ação</th>
                <th className="py-3 px-4">Alvo</th>
                <th className="py-3 px-4">Detalhes</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#282a31]/40 font-body-sm text-xs text-[#e0c0b1]">
              {auditLogs.slice(0, 5).map((log) => (
                <tr key={log.id} className="hover:bg-[#1d1f27]/50 transition-colors">
                  <td className="py-3 px-4 font-mono-price text-[#e2e2ec] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#e2e2ec] whitespace-nowrap">
                    {log.author}
                  </td>
                  <td className="py-3 px-4 text-[#ffb68e] font-medium whitespace-nowrap">
                    {log.action}
                  </td>
                  <td className="py-3 px-4 text-[#e2e2ec] font-semibold whitespace-nowrap">
                    {log.target}
                  </td>
                  <td className="py-3 px-4 text-[#e0c0b1]/80 max-w-md truncate">
                    {log.details}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#282a31] text-[#528dff] font-label-caps text-[10px] font-bold uppercase">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
