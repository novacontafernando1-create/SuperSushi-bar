import React from 'react';

export const DestaquesSection: React.FC = () => {
  return (
    <section className="py-margin-lg bg-surface-container-lowest relative overflow-hidden" id="destaques">
      <div className="max-w-[1360px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
        <div className="mb-space-xl">
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest font-semibold">
            CRIAÇÕES AUTORAIS DE IMPACTO
          </span>
          <h2 className="font-headline-lg text-headline-md md:text-headline-lg uppercase text-on-surface mt-space-xs font-bold">
            ESCOLHIDOS PARA ULTRAPASSAR SEUS LIMITES DE SABOR.
          </h2>
        </div>

        {/* Editorial Split Spotlight Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg bg-surface-container/60 rounded-3xl p-space-md md:p-space-xl border border-outline-variant/20 shadow-2xl items-center">
          {/* Left Side: Split Visual Showcase */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-outline-variant/30 group">
              <img
                alt="Highlight Wagyu Signature"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6EXpbgzCAN3pXgFc_J8GS-DSI0qH0wknhawa-mv39W5zLOgBxaFwnyFVbjuVvpB6vaoHHH4P7L3LO0sUeaipVbNPKSqmQRke70lBIR9LGWNJ7TbHyKz7PSsnOJMdk3Tf-rVsD6mEtaylZjLvMduX_KzuZQCK9dozDhbU94qDnCSgW6V9rIFJUVYDg1o2eyKD6mLqS97prxaZZNwS-gTG6IHJz-YTSNyAXl4QnLkY"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-75"></div>
              <div className="absolute bottom-space-md left-space-md">
                <span className="font-label-caps text-label-caps text-primary uppercase font-bold">Criação I</span>
                <p className="font-headline-sm text-body-lg text-on-surface font-bold">Kuroge Wagyu Fusion</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-outline-variant/30 group mt-0 sm:mt-space-lg">
              <img
                alt="Highlight Nigiri Signature"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9Eq0eQplG0Tx4xHSxr4Nkxy6Z076ByrjUA8YsiC8Ya67O-oDxQxJBJI26S2vOKdU956TXnR_GOPb5GClIkfSM4IatgL6-kTNG5kWPzgExvFf3jVXnw5TIg26wTgjKPuNP3d8IixTTXBojOvmBGf0Jl2_8_YF1g-wNhfHQBZwZv57oYuJrpmmQoTBtpOvzJrWnKNm2nznJ8WURhM_hG-fW8vGCwCvTcWN1AiHA_Ck"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-75"></div>
              <div className="absolute bottom-space-md left-space-md">
                <span className="font-label-caps text-label-caps text-secondary uppercase font-bold">Criação II</span>
                <p className="font-headline-sm text-body-lg text-on-surface font-bold">Kinpaku Uni & Foie</p>
              </div>
            </div>
          </div>

          {/* Right Side: Tasting Notes & Pairing Specs */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-space-sm mb-space-sm">
              <span className="material-symbols-outlined text-primary text-[22px]">auto_awesome</span>
              <span className="font-label-caps text-label-caps text-primary uppercase font-bold">Notas do Chef Executivo</span>
            </div>
            <h3 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface uppercase mb-space-md font-bold">
              Alquimia Elemental & Harmonização Cósmica
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
              Cada prato autoral é desenhado para provocar contrastes extremos de calor, doçura umami e mineralidade oceânica. Nossas finalizações em mesa transportam o convidado diretamente para o epicentro criativo de Tóquio.
            </p>

            {/* Pairing Recommendations */}
            <div className="space-y-space-md mb-space-lg">
              <div className="p-space-md rounded-xl bg-surface-container-high/80 border border-outline-variant/20 flex items-start gap-space-md">
                <span className="material-symbols-outlined text-secondary text-[24px]">liquor</span>
                <div>
                  <h4 className="font-headline-sm text-body-sm font-bold text-on-surface">Harmonização: Junmai Daiginjo "Blue Ki"</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Saquê ultra-premium importado de Yamagata com notas florais e final cristalino.</p>
                </div>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-high/80 border border-outline-variant/20 flex items-start gap-space-md">
                <span className="material-symbols-outlined text-primary text-[24px]">local_bar</span>
                <div>
                  <h4 className="font-headline-sm text-body-sm font-bold text-on-surface">Cocktail Signature: Dragon Flare Smoke</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Gin infusionado com yuzu, xarope de gengibre tostado, carvão ativado e névoa defumada.</p>
                </div>
              </div>
            </div>

            <a
              className="inline-flex items-center gap-space-sm font-headline-sm text-label-md text-primary uppercase tracking-wider hover:text-primary-fixed transition-colors font-bold"
              href="#reservas"
            >
              VIVENCIAR O MENU DEGUSTAÇÃO
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
