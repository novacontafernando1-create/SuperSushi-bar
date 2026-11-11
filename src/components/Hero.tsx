import React from 'react';

interface HeroProps {
  onReserveClick?: () => void;
  onExploreMenu?: () => void;
  onTastingBuilderClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreMenu,
  onReserveClick,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative -mt-20 pt-28 pb-space-xl overflow-hidden min-h-[92vh] flex items-center justify-center" id="hero">
      {/* Ambient Energy Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-secondary-container/10 blur-[130px] pointer-events-none rounded-full"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/3 w-[520px] h-[520px] bg-primary-container/15 blur-[110px] pointer-events-none rounded-full"></div>

      <div className="relative max-w-[1360px] w-full mx-auto px-margin md:px-margin-md lg:px-margin-lg flex flex-col items-center text-center">
        {/* Energy Orb Badge */}
        <div className="inline-flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-surface-container-high/80 backdrop-blur-md border border-outline-variant/30 shadow-[0_0_20px_rgba(255,122,26,0.15)] mb-space-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_#ff7a1a]"></span>
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest">
            CONCEITO EXCLUSIVO • DRAGON ENERGY EXPERIENCE
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display-hero text-headline-lg-mobile md:text-headline-lg lg:text-display-hero uppercase text-on-surface max-w-5xl tracking-tight leading-[1.08] mb-space-md font-extrabold">
          UMA EXPERIÊNCIA FORA <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-fixed via-primary-container to-secondary-container">
            DESTE UNIVERSO.
          </span>
        </h1>

        <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant max-w-2xl mb-space-xl">
          Prepare-se para descobrir uma nova dimensão de sabor. Gastronomia japonesa, criatividade transcendental e energia cósmica em cada peça.
        </p>

        {/* Central Showcase Hero Image Container */}
        <div className="relative w-full max-w-4xl aspect-[16/9] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] border border-outline-variant/20 mb-space-xl group">
          <img
            alt="Dragon Energy Nigiri Experience"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9Eq0eQplG0Tx4xHSxr4Nkxy6Z076ByrjUA8YsiC8Ya67O-oDxQxJBJI26S2vOKdU956TXnR_GOPb5GClIkfSM4IatgL6-kTNG5kWPzgExvFf3jVXnw5TIg26wTgjKPuNP3d8IixTTXBojOvmBGf0Jl2_8_YF1g-wNhfHQBZwZv57oYuJrpmmQoTBtpOvzJrWnKNm2nznJ8WURhM_hG-fW8vGCwCvTcWN1AiHA_Ck"
          />

          {/* Atmospheric Scrim & Light Flare Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-container/10 via-transparent to-primary-container/15 mix-blend-screen pointer-events-none"></div>

          {/* Live Energy HUD Tag */}
          <div className="absolute bottom-space-md left-space-md md:bottom-space-lg md:left-space-lg flex items-center gap-space-md px-space-md py-space-sm bg-surface-container-lowest/85 backdrop-blur-xl rounded-xl border border-outline-variant/20">
            <div className="w-3 h-3 rounded-full bg-secondary-container shadow-[0_0_10px_#528dff] animate-ping"></div>
            <div className="flex flex-col text-left">
              <span className="font-label-caps text-label-caps uppercase text-secondary">OMAKASE SELECT 2025</span>
              <span className="font-mono-price text-body-sm text-on-surface font-semibold">DRAGON AURA • GRAU SUPREMO</span>
            </div>
          </div>
        </div>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md w-full max-w-md">
          <button
            onClick={() => {
              if (onExploreMenu) onExploreMenu();
              else scrollTo('cardapio');
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-space-xl py-space-md bg-primary-container text-on-primary-container font-headline-sm text-label-md uppercase tracking-wider rounded-xl shadow-[0_0_28px_rgba(255,122,26,0.45)] hover:shadow-[0_0_36px_rgba(255,122,26,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-bold"
          >
            EXPLORAR CARDÁPIO
          </button>
          <button
            onClick={() => scrollTo('sobre')}
            className="w-full sm:w-auto inline-flex items-center justify-center px-space-xl py-space-md bg-surface-container-high/60 backdrop-blur-md text-on-surface font-headline-sm text-label-md uppercase tracking-wider rounded-xl border border-secondary-container/40 hover:bg-surface-container-high hover:border-secondary-container transition-all cursor-pointer font-bold"
          >
            CONHECER O RESTAURANTE
          </button>
        </div>

        {/* Scroll Invitation Indicator */}
        <div className="mt-space-xl flex flex-col items-center gap-space-xs text-on-surface-variant/70 animate-pulse">
          <span className="font-label-caps text-label-caps tracking-[0.2em] uppercase">Role para explorar o universo</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary via-secondary-container to-transparent"></div>
        </div>
      </div>
    </section>
  );
};
