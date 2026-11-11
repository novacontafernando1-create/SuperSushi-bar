import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SobreSection } from './components/SobreSection';
import { MenuSection } from './components/MenuSection';
import { DestaquesSection } from './components/DestaquesSection';
import { GaleriaSection } from './components/GaleriaSection';
import { ReservationSection } from './components/ReservationSection';
import { LocalizacaoSection } from './components/LocalizacaoSection';
import { ContatoSection } from './components/ContatoSection';
import { Footer } from './components/Footer';
import { DishDetailModal } from './components/DishDetailModal';
import { TrayDrawer } from './components/TrayDrawer';
import { WhatsAppConcierge } from './components/WhatsAppConcierge';
import { MENU_ITEMS } from './data/menuData';
import { MenuItem, TrayItem } from './types';
import { calculateTrayTotals } from './utils/omakase';

// Admin imports
import { authService } from './services/authService';
import { AdminLayout, AdminTab } from './admin/AdminLayout';
import { AdminLogin } from './admin/AdminLogin';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminCatalog } from './admin/AdminCatalog';
import { AdminCategories } from './admin/AdminCategories';
import { AdminSettings } from './admin/AdminSettings';

export default function App() {
  // Routing & View Mode
  const [viewMode, setViewMode] = useState<'public' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      const h = window.location.hash;
      if (p.startsWith('/admin') || h === '#admin') {
        return 'admin';
      }
    }
    return 'public';
  });

  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [adminSearch, setAdminSearch] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    authService.isAuthenticated()
  );

  // Sync with browser navigation
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      const h = window.location.hash;
      if (p.startsWith('/admin') || h === '#admin') {
        setViewMode('admin');
        setIsAuthenticated(authService.isAuthenticated());
      } else {
        setViewMode('public');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToAdmin = () => {
    setViewMode('admin');
    setIsAuthenticated(authService.isAuthenticated());
    if (window.location.pathname !== '/admin') {
      window.history.pushState(null, '', '/admin');
    }
  };

  const navigateToPublic = () => {
    setViewMode('public');
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
  };

  const handleAdminLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  const handleAdminLoginSuccess = () => {
    setIsAuthenticated(true);
    setAdminTab('dashboard');
  };

  // Public state
  const [items] = useState<MenuItem[]>(MENU_ITEMS);
  const [tray, setTray] = useState<TrayItem[]>([
    {
      id: 'default-tray-flight',
      item: MENU_ITEMS[0],
      quantity: 1,
    },
  ]);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [conciergeMessage, setConciergeMessage] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToTray = (item: MenuItem, quantity: number = 1) => {
    setTray((prev) => {
      const existing = prev.find((t) => t.item.id === item.id && !t.customPrice);
      if (existing) {
        return prev.map((t) =>
          t.id === existing.id ? { ...t, quantity: t.quantity + quantity } : t
        );
      }
      return [
        ...prev,
        {
          id: `tray-${item.id}-${Date.now()}`,
          item,
          quantity,
        },
      ];
    });
    showToast(`Adicionado ${quantity}x "${item.name}" à sacola`);
  };

  const handleUpdateTrayQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveTrayItem(id);
      return;
    }
    setTray((prev) =>
      prev.map((t) => (t.id === id ? { ...t, quantity: newQty } : t))
    );
  };

  const handleRemoveTrayItem = (id: string) => {
    setTray((prev) => prev.filter((t) => t.id !== id));
  };

  const handleClearTray = () => {
    setTray([]);
  };

  const handleOpenConcierge = (msg?: string) => {
    if (msg) {
      setConciergeMessage(msg);
    }
    setIsConciergeOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const trayItemIds = tray.map((t) => t.item.id);
  const { totalQuantity } = calculateTrayTotals(tray);

  // --- RENDER ADMIN FLOW ---
  if (viewMode === 'admin') {
    if (!isAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={handleAdminLoginSuccess}
          onBackToPublic={navigateToPublic}
        />
      );
    }

    return (
      <AdminLayout
        currentTab={adminTab}
        onSelectTab={setAdminTab}
        onExitToPublic={navigateToPublic}
        onLogout={handleAdminLogout}
        searchTerm={adminSearch}
        onSearchChange={setAdminSearch}
      >
        {adminTab === 'dashboard' && (
          <AdminDashboard
            onNavigateTab={setAdminTab}
            onOpenCreateProduct={() => setAdminTab('catalogo')}
          />
        )}

        {adminTab === 'catalogo' && (
          <AdminCatalog initialSearch={adminSearch} />
        )}

        {adminTab === 'categorias' && <AdminCategories />}

        {adminTab === 'configuracoes' && <AdminSettings />}
      </AdminLayout>
    );
  }

  // --- RENDER PUBLIC WEBSITE ---
  return (
    <div className="bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-surface-container-high border border-primary-container text-on-surface px-4 py-3 rounded-xl shadow-[0_0_24px_rgba(255,122,26,0.35)] flex items-center gap-3 animate-fadeIn">
          <span className="material-symbols-outlined text-primary text-[20px]">
            local_fire_department
          </span>
          <span className="font-mono-price text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header / Navbar */}
      <Navbar
        trayCount={totalQuantity}
        onOpenTray={() => setIsTrayOpen(true)}
        onOpenReservation={() => scrollToSection('reservas')}
        onOpenConcierge={() => handleOpenConcierge()}
        onNavigateToSection={scrollToSection}
        onOpenAdmin={navigateToAdmin}
      />

      {/* Main Content Sections */}
      <main className="w-full pt-20 bg-background flex-1">
        <div className="flex flex-col w-full">
          {/* Seção 01 — Hero */}
          <Hero
            onExploreMenu={() => scrollToSection('cardapio')}
            onReserveClick={() => scrollToSection('reservas')}
          />

          {/* Seção 02 — Sobre */}
          <SobreSection />

          {/* Seção 03 — Cardápio */}
          <MenuSection
            items={items}
            onSelectItem={setSelectedDish}
            onAddToTray={(item) => handleAddToTray(item, 1)}
            trayItemIds={trayItemIds}
          />

          {/* Seção 04 — Destaques */}
          <DestaquesSection />

          {/* Seção 05 — Galeria */}
          <GaleriaSection />

          {/* Seção 06 — Reservas */}
          <ReservationSection onOpenConcierge={handleOpenConcierge} />

          {/* Seção 07 — Localização e Horários */}
          <LocalizacaoSection />

          {/* Seção 08 — Contato */}
          <ContatoSection />
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenReservation={() => scrollToSection('reservas')}
        onOpenConcierge={() => handleOpenConcierge()}
        onNavigateToSection={scrollToSection}
        onOpenAdmin={navigateToAdmin}
      />

      {/* Floating Aside WhatsApp Concierge Trigger from code.html */}
      <aside className="fixed bottom-space-lg right-space-lg z-50">
        <button
          onClick={() => handleOpenConcierge()}
          aria-label="WhatsApp Concierge"
          className="w-14 h-14 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary-fixed-dim shadow-[0_0_24px_rgba(22,119,255,0.35)] hover:shadow-[0_0_28px_rgba(255,122,26,0.5)] transition-all cursor-pointer border border-outline-variant/30 hover:scale-105"
        >
          <span className="material-symbols-outlined text-[28px] text-primary">chat</span>
        </button>
      </aside>

      {/* Dish Detailed Profile Modal */}
      <DishDetailModal
        item={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToTray={(item, qty) => handleAddToTray(item, qty)}
        isInTray={selectedDish ? trayItemIds.includes(selectedDish.id) : false}
      />

      {/* Omakase Tray Slide-Over Drawer */}
      <TrayDrawer
        isOpen={isTrayOpen}
        onClose={() => setIsTrayOpen(false)}
        items={tray}
        onUpdateQuantity={handleUpdateTrayQuantity}
        onRemoveItem={handleRemoveTrayItem}
        onClearTray={handleClearTray}
        onOpenConcierge={handleOpenConcierge}
      />

      {/* Floating WhatsApp VIP Concierge Action */}
      <WhatsAppConcierge
        isOpen={isConciergeOpen}
        onToggle={() => setIsConciergeOpen(!isConciergeOpen)}
        initialMessage={conciergeMessage}
      />
    </div>
  );
}
