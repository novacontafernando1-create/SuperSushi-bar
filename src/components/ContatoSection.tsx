import React from 'react';

export const ContatoSection: React.FC = () => {
  return (
    <section className="py-margin-lg bg-surface-container-lowest/70 relative" id="contato">
      <div className="max-w-[1360px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-space-xl">
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest mb-space-xs font-semibold">
            CANAL DIRETO
          </span>
          <h2 className="font-headline-lg text-headline-md md:text-headline-lg uppercase text-on-surface font-bold">
            VAMOS MARCAR ESSA EXPERIÊNCIA?
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-space-xs">
            Nossa equipe está pronta para receber você e tornar sua noite memorável com todo o requinte e Dragon Energy.
          </p>
        </div>

        {/* 4 Quick-Access Luxury Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* WhatsApp */}
          <a
            className="p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 hover:border-primary-container hover:-translate-y-1 transition-all group flex flex-col justify-between cursor-pointer"
            href="https://wa.me/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary mb-space-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">chat</span>
              </div>
              <span className="font-label-caps text-label-caps text-primary uppercase font-bold">
                MENSAGEM RÁPIDA
              </span>
              <h3 className="font-headline-sm text-body-lg text-on-surface font-bold mt-1">
                WhatsApp Oficial
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                +55 11 99999-0000
              </p>
            </div>
            <span className="font-label-md text-label-md text-primary mt-space-md inline-flex items-center gap-1 font-semibold">
              Iniciar conversa <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </span>
          </a>

          {/* Instagram */}
          <a
            className="p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 hover:border-secondary-container hover:-translate-y-1 transition-all group flex flex-col justify-between cursor-pointer"
            href="https://instagram.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary mb-space-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">photo_camera</span>
              </div>
              <span className="font-label-caps text-label-caps text-secondary uppercase font-bold">
                UNIVERSO VISUAL
              </span>
              <h3 className="font-headline-sm text-body-lg text-on-surface font-bold mt-1">
                Instagram
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                @supershushibar
              </p>
            </div>
            <span className="font-label-md text-label-md text-secondary mt-space-md inline-flex items-center gap-1 font-semibold">
              Acompanhar criações <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </span>
          </a>

          {/* Telefone Direto */}
          <a
            className="p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 hover:border-tertiary hover:-translate-y-1 transition-all group flex flex-col justify-between cursor-pointer"
            href="tel:1134567890"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-tertiary mb-space-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">call</span>
              </div>
              <span className="font-label-caps text-label-caps text-tertiary uppercase font-bold">
                LIGAÇÃO CONCIERGE
              </span>
              <h3 className="font-headline-sm text-body-lg text-on-surface font-bold mt-1">
                Telefone Direto
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                (11) 3456-7890
              </p>
            </div>
            <span className="font-label-md text-label-md text-tertiary mt-space-md inline-flex items-center gap-1 font-semibold">
              Ligar para o salão <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </span>
          </a>

          {/* Delivery Exclusivo */}
          <a
            className="p-space-lg rounded-2xl bg-surface-container border border-outline-variant/30 hover:border-primary hover:-translate-y-1 transition-all group flex flex-col justify-between cursor-pointer"
            href="#cardapio"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-fixed mb-space-md group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[28px]">two_wheeler</span>
              </div>
              <span className="font-label-caps text-label-caps text-primary uppercase font-bold">
                EM SUA RESIDÊNCIA
              </span>
              <h3 className="font-headline-sm text-body-lg text-on-surface font-bold mt-1">
                Delivery Exclusivo
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                App Próprio & iFood Black VIP
              </p>
            </div>
            <span className="font-label-md text-label-md text-primary mt-space-md inline-flex items-center gap-1 font-semibold">
              Pedir em casa <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
