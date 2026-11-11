import React, { ReactNode } from 'react';
import { authService } from '../services/authService';

export type AdminTab = 'dashboard' | 'catalogo' | 'categorias' | 'configuracoes';

interface AdminLayoutProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onExitToPublic: () => void;
  onLogout: () => void;
  searchTerm?: string;
  onSearchChange?: (val: string) => void;
  children: ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onExitToPublic,
  onLogout,
  searchTerm = '',
  onSearchChange,
  children,
}) => {
  const user = authService.getCurrentUser();

  const navItems = [
    {
      id: 'dashboard' as AdminTab,
      label: 'Dashboard',
      icon: 'grid_view',
    },
    {
      id: 'catalogo' as AdminTab,
      label: 'Catálogo de Produtos',
      icon: 'restaurant_menu',
    },
    {
      id: 'categorias' as AdminTab,
      label: 'Categorias',
      icon: 'category',
    },
    {
      id: 'configuracoes' as AdminTab,
      label: 'Configurações',
      icon: 'tune',
    },
  ];

  return (
    <div className="bg-[#11131a] text-[#e2e2ec] font-body-md min-h-screen antialiased flex">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-[#0c0e15] border-r border-[#282a31]/50 z-50 flex flex-col justify-between p-6">
        <div className="flex flex-col gap-6">
          {/* Logo & Console Title */}
          <div className="flex items-center gap-3 px-1 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
            <div className="w-9 h-9 rounded-xl bg-[#ff7a1a] flex items-center justify-center shadow-[0_0_20px_rgba(255,122,26,0.45)] shrink-0">
              <span className="material-symbols-outlined text-[#0c0e15] text-[22px]">ramen_dining</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-lg font-bold uppercase tracking-wider text-[#e2e2ec]">
                SUPERSHUSHI
              </span>
              <span className="font-label-caps text-[10px] text-[#ffb68e] tracking-widest uppercase font-semibold">
                ADMIN CONSOLE
              </span>
            </div>
          </div>

          <div className="h-px w-full bg-[#282a31]"></div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-lg font-label-md text-sm transition-all text-left cursor-pointer ${
                    isActive
                      ? 'bg-[#282a31] text-[#ffb68e] shadow-[inset_3px_0_0_0_#ff7a1a] font-semibold'
                      : 'text-[#e0c0b1]/80 hover:bg-[#1d1f27] hover:text-[#e2e2ec]'
                  }`}
                >
                  <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[#ff7a1a]' : ''}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer with Admin User Profile */}
        <div className="flex flex-col gap-3 pt-4 border-t border-[#282a31]">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#191b23] border border-[#282a31]/50">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#282a31] flex items-center justify-center text-[#ffb68e] font-bold text-sm">
                  {user?.avatarLetter || 'H'}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#ff7a1a] ring-2 ring-[#0c0e15]"></span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-sm text-[#e2e2ec] font-semibold leading-tight truncate">
                  {user?.name || 'Chef Hiroshi'}
                </span>
                <span className="font-label-caps text-[10px] text-[#afc6ff] leading-tight mt-0.5 truncate uppercase">
                  {user?.role || 'Master Admin'}
                </span>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#e0c0b1]/70 hover:text-[#ffb4ab] hover:bg-[#282a31] transition-colors cursor-pointer shrink-0 ml-1"
              title="Sair do Painel"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Column */}
      <div className="pl-72 flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="fixed top-0 left-72 right-0 h-20 bg-[#11131a]/85 backdrop-blur-xl z-40 px-8 flex items-center justify-between border-b border-[#282a31]/50 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-[#e0c0b1]/60 text-[20px] pointer-events-none">
                search
              </span>
              <input
                className="w-80 sm:w-96 h-10 pl-11 pr-4 rounded-xl bg-[#1d1f27] text-[#e2e2ec] placeholder:text-[#e0c0b1]/50 font-body-sm text-sm focus:outline-none focus:ring-1 focus:ring-[#528dff] transition-all border border-[#282a31]/40"
                placeholder="Pesquisar pedidos, sushis ou insumos..."
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onExitToPublic}
              className="flex items-center gap-2 px-4 h-10 rounded-xl bg-[#1d1f27] hover:bg-[#282a31] text-[#e2e2ec] font-label-md text-sm transition-colors border border-[#282a31]/60 cursor-pointer shadow-sm group"
            >
              <span className="material-symbols-outlined text-[18px] text-[#528dff] transition-transform group-hover:scale-110">
                visibility
              </span>
              <span>Ver Site Público</span>
            </button>

            <div className="h-6 w-px bg-[#282a31]"></div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#ffb68e] text-[#542200] flex items-center justify-center font-bold text-xs shadow-md">
                {user?.avatarLetter || 'H'}
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="w-full pt-24 px-8 pb-16 bg-[#11131a] flex-1 relative overflow-hidden">
          {/* Ambient Ki Glows */}
          <div className="pointer-events-none absolute -top-10 right-1/4 w-96 h-96 rounded-full bg-[#ff7a1a]/10 blur-[120px] -z-10"></div>
          <div className="pointer-events-none absolute top-48 left-12 w-80 h-80 rounded-full bg-[#528dff]/10 blur-[100px] -z-10"></div>
          
          <div className="max-w-[1440px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
