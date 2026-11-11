import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  trayCount?: number;
  onOpenTray?: () => void;
  onOpenReservation?: () => void;
  onOpenConcierge?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  trayCount = 0,
  onOpenTray,
  onOpenReservation,
  onOpenConcierge,
  onNavigateToSection,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'sobre', 'cardapio', 'destaques', 'galeria', 'localizacao', 'contato'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(sectionId === 'hero' ? 'inicio' : sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string, path: string) => {
    setActiveTab(path);
    setMobileMenuOpen(false);
    if (onNavigateToSection) {
      onNavigateToSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/10">
      <div className="h-20 max-w-[1360px] mx-auto px-margin md:px-margin-md lg:px-margin-lg flex items-center justify-between">
        {/* Logo and Brand */}
        <button
          onClick={() => handleLinkClick('hero', 'inicio')}
          className="flex items-center gap-space-md text-left cursor-pointer group focus:outline-none"
        >
          <BrandLogo className="h-8 w-auto object-contain transition-transform group-hover:scale-105" />
          <span className="font-headline-sm text-headline-sm uppercase tracking-wider text-on-surface">
            SUPERSHUSHI <span className="text-primary">BAR</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-space-lg">
          <button
            onClick={() => handleLinkClick('hero', 'inicio')}
            className={`font-label-md text-label-md transition-colors py-space-xs px-space-sm cursor-pointer ${
              activeTab === 'inicio' ? 'bg-surface-container-high text-primary font-bold rounded-lg' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Início
          </button>
          <button
            onClick={() => handleLinkClick('sobre', 'sobre')}
            className={`font-label-md text-label-md transition-colors py-space-xs px-space-sm cursor-pointer ${
              activeTab === 'sobre' ? 'bg-surface-container-high text-primary font-bold rounded-lg' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Sobre
          </button>
          <button
            onClick={() => handleLinkClick('cardapio', 'cardapio')}
            className={`font-label-md text-label-md transition-colors py-space-xs px-space-sm cursor-pointer ${
              activeTab === 'cardapio' ? 'bg-surface-container-high text-primary font-bold rounded-lg' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Cardápio
          </button>
          <button
            onClick={() => handleLinkClick('destaques', 'destaques')}
            className={`font-label-md text-label-md transition-colors py-space-xs px-space-sm cursor-pointer ${
              activeTab === 'destaques' ? 'bg-surface-container-high text-primary font-bold rounded-lg' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Destaques
          </button>
          <button
            onClick={() => handleLinkClick('galeria', 'galeria')}
            className={`font-label-md text-label-md transition-colors py-space-xs px-space-sm cursor-pointer ${
              activeTab === 'galeria' ? 'bg-surface-container-high text-primary font-bold rounded-lg' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Galeria
          </button>
          <button
            onClick={() => handleLinkClick('localizacao', 'localizacao')}
            className={`font-label-md text-label-md transition-colors py-space-xs px-space-sm cursor-pointer ${
              activeTab === 'localizacao' ? 'bg-surface-container-high text-primary font-bold rounded-lg' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Localização
          </button>
          <button
            onClick={() => handleLinkClick('contato', 'contato')}
            className={`font-label-md text-label-md transition-colors py-space-xs px-space-sm cursor-pointer ${
              activeTab === 'contato' ? 'bg-surface-container-high text-primary font-bold rounded-lg' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Contato
          </button>
        </nav>

        {/* Right CTA and Icons */}
        <div className="flex items-center gap-space-md">
          {/* Optional Tray shopping bag if items present */}
          {onOpenTray && (
            <button
              onClick={onOpenTray}
              className="relative p-2 rounded-lg bg-surface-container-high/80 hover:bg-surface-container-highest text-on-surface hover:text-primary transition-colors cursor-pointer"
              title="Ver Sacola / Tray"
              aria-label={`Ver bandeja com ${trayCount} itens`}
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              {trayCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-4.5 px-1 rounded-full bg-primary-container text-on-primary-container font-mono-price text-[10px] font-bold flex items-center justify-center glow-ki-sm">
                  {trayCount}
                </span>
              )}
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={() => {
              if (onOpenReservation) onOpenReservation();
              else handleLinkClick('reservas', 'reservas');
            }}
            className="hidden sm:inline-flex items-center justify-center px-space-lg py-space-sm bg-primary-container text-on-primary-container font-headline-sm text-label-md uppercase tracking-wider rounded-lg shadow-[0_0_24px_rgba(255,122,26,0.35)] hover:shadow-[0_0_28px_rgba(255,122,26,0.55)] active:scale-95 transition-all cursor-pointer font-bold"
          >
            RESERVAR MESA
          </button>

          {/* User Profile Avatar / Admin Access */}
          <button
            onClick={onOpenAdmin || onOpenConcierge}
            className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all shadow-sm"
            title="Painel Administrativo / Concierge"
            aria-label="Acesso ao Painel Administrativo"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">admin_panel_settings</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-space-xs text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[28px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest/95 backdrop-blur-xl border-b border-outline-variant/20 px-margin py-space-lg space-y-space-sm animate-fadeIn">
          <button
            onClick={() => handleLinkClick('hero', 'inicio')}
            className="block w-full text-left py-2 font-label-md text-label-md text-on-surface hover:text-primary uppercase"
          >
            Início
          </button>
          <button
            onClick={() => handleLinkClick('sobre', 'sobre')}
            className="block w-full text-left py-2 font-label-md text-label-md text-on-surface hover:text-primary uppercase"
          >
            Sobre
          </button>
          <button
            onClick={() => handleLinkClick('cardapio', 'cardapio')}
            className="block w-full text-left py-2 font-label-md text-label-md text-on-surface hover:text-primary uppercase"
          >
            Cardápio
          </button>
          <button
            onClick={() => handleLinkClick('destaques', 'destaques')}
            className="block w-full text-left py-2 font-label-md text-label-md text-on-surface hover:text-primary uppercase"
          >
            Destaques
          </button>
          <button
            onClick={() => handleLinkClick('galeria', 'galeria')}
            className="block w-full text-left py-2 font-label-md text-label-md text-on-surface hover:text-primary uppercase"
          >
            Galeria
          </button>
          <button
            onClick={() => handleLinkClick('localizacao', 'localizacao')}
            className="block w-full text-left py-2 font-label-md text-label-md text-on-surface hover:text-primary uppercase"
          >
            Localização
          </button>
          <button
            onClick={() => handleLinkClick('contato', 'contato')}
            className="block w-full text-left py-2 font-label-md text-label-md text-on-surface hover:text-primary uppercase"
          >
            Contato
          </button>

          <div className="pt-space-md border-t border-outline-variant/20 flex flex-col gap-space-sm">
            <button
              onClick={() => {
                if (onOpenReservation) onOpenReservation();
                else handleLinkClick('reservas', 'reservas');
                setMobileMenuOpen(false);
              }}
              className="w-full py-space-sm px-space-md bg-primary-container text-on-primary-container font-headline-sm text-label-md uppercase tracking-wider rounded-lg text-center font-bold shadow-[0_0_20px_rgba(255,122,26,0.35)]"
            >
              RESERVAR MESA
            </button>
            {onOpenConcierge && (
              <button
                onClick={() => {
                  onOpenConcierge();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-space-sm px-space-md bg-surface-container-high border border-secondary-container/40 text-secondary font-headline-sm text-label-md uppercase tracking-wider rounded-lg text-center"
              >
                Falar com Concierge VIP
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
