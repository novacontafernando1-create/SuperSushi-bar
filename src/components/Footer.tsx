import React from 'react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenReservation?: () => void;
  onOpenConcierge?: () => void;
  onNavigateToSection?: (sectionId: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToSection,
  onOpenAdmin,
}) => {
  const scrollTo = (id: string) => {
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
    <footer className="w-full bg-surface-container-lowest pt-margin-lg pb-space-xl border-t border-outline-variant/10">
      <div className="max-w-[1360px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter-lg pb-margin-lg">
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-md">
              <BrandLogo className="h-8 w-auto object-contain" />
              <span className="font-headline-sm text-headline-sm uppercase tracking-wider text-on-surface font-bold">
                SUPERSHUSHI <span className="text-primary">BAR</span>
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              Dragon Energy Sushi Experience. Alta gastronomia nipônica, alquimia celestial e precisão omakase em atmosfera imersiva.
            </p>
            <div className="flex items-center gap-space-md pt-space-xs">
              <a
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
                href="https://instagram.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
              </a>
              <a
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
                href="https://wa.me/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </a>
              <a
                aria-label="Email"
                className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
                href="mailto:contato@supershushi.com"
              >
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </a>
            </div>
          </div>

          {/* Navigation Col */}
          <div className="lg:col-span-2 flex flex-col gap-space-sm">
            <h3 className="font-headline-sm text-label-md uppercase tracking-widest text-primary font-bold">
              Navegação
            </h3>
            <ul className="flex flex-col gap-space-xs">
              <li className="font-body-sm text-body-sm">
                <button
                  onClick={() => scrollTo('hero')}
                  className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer text-left"
                >
                  Início
                </button>
              </li>
              <li className="font-body-sm text-body-sm">
                <button
                  onClick={() => scrollTo('sobre')}
                  className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer text-left"
                >
                  Sobre
                </button>
              </li>
              <li className="font-body-sm text-body-sm">
                <button
                  onClick={() => scrollTo('cardapio')}
                  className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer text-left"
                >
                  Cardápio
                </button>
              </li>
              <li className="font-body-sm text-body-sm">
                <button
                  onClick={() => scrollTo('destaques')}
                  className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer text-left"
                >
                  Destaques
                </button>
              </li>
              <li className="font-body-sm text-body-sm">
                <button
                  onClick={() => scrollTo('galeria')}
                  className="text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer text-left"
                >
                  Galeria
                </button>
              </li>
            </ul>
          </div>

          {/* Opening Hours Col */}
          <div className="lg:col-span-3 flex flex-col gap-space-sm">
            <h3 className="font-headline-sm text-label-md uppercase tracking-widest text-primary font-bold">
              Horários de Atendimento
            </h3>
            <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <p>
                <span className="text-on-surface font-semibold">Terça a Quinta:</span> 19h00 – 00h00
              </p>
              <p>
                <span className="text-on-surface font-semibold">Sexta e Sábado:</span> 19h00 – 01h30
              </p>
              <p>
                <span className="text-on-surface font-semibold">Domingo:</span> 18h30 – 23h30
              </p>
              <p className="text-outline pt-space-xs">
                Segunda-feira: Fechado para pesquisa gastronômica
              </p>
            </div>
          </div>

          {/* Location Col */}
          <div className="lg:col-span-3 flex flex-col gap-space-sm">
            <h3 className="font-headline-sm text-label-md uppercase tracking-widest text-primary font-bold">
              Localização
            </h3>
            <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <p>Alameda dos Dragões Celestiais, 888</p>
              <p>Jardins — São Paulo / SP</p>
              <p>CEP: 01419-001</p>
              <p className="text-primary font-mono-price text-body-sm pt-space-xs font-semibold">
                Valet Parking Exclusivo
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-space-lg border-t border-outline-variant/15 flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            © 2025 SUPERSHUSHI BAR. Todos os direitos reservados. Dragon Energy Sushi Experience.
          </p>
          <div className="flex items-center gap-space-lg">
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
              Termos de Uso
            </a>
            <a className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors" href="#">
              Privacidade
            </a>
            <button
              onClick={() => scrollTo('reservas')}
              className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              Reservas VIP
            </button>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="font-body-sm text-body-sm text-primary hover:text-primary-fixed transition-colors cursor-pointer font-semibold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
                <span>Painel Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
