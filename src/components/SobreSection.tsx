import React from 'react';

export const SobreSection: React.FC = () => {
  return (
    <section className="py-margin-lg bg-surface-container-lowest/60 relative overflow-hidden" id="sobre">
      <div className="max-w-[1360px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
          {/* Left Image Composition (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-outline-variant/30 shadow-[0_16px_40px_rgba(0,0,0,0.8)]">
              <img
                alt="Supershushi Craftsmanship Wagyu Roll"
                className="w-full aspect-[4/5] object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6EXpbgzCAN3pXgFc_J8GS-DSI0qH0wknhawa-mv39W5zLOgBxaFwnyFVbjuVvpB6vaoHHH4P7L3LO0sUeaipVbNPKSqmQRke70lBIR9LGWNJ7TbHyKz7PSsnOJMdk3Tf-rVsD6mEtaylZjLvMduX_KzuZQCK9dozDhbU94qDnCSgW6V9rIFJUVYDg1o2eyKD6mLqS97prxaZZNwS-gTG6IHJz-YTSNyAXl4QnLkY"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Floating Obsidian Accent Card */}
            <div className="absolute -bottom-6 -right-4 md:-right-8 p-space-md bg-surface-container-high/90 backdrop-blur-xl rounded-xl border border-outline-variant/40 shadow-xl max-w-xs hidden sm:block">
              <div className="flex items-center gap-space-sm mb-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">local_fire_department</span>
                <span className="font-label-caps text-label-caps text-primary uppercase font-bold">Culinária Elemental</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Harmonia entre a brasa de binchotan e o frescor das águas glaciais do pacífico.
              </p>
            </div>
          </div>

          {/* Right Content Narrative (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="px-space-sm py-space-xs rounded-full bg-surface-container-high font-label-caps text-label-caps uppercase text-secondary tracking-widest mb-space-sm font-semibold">
              FILOSOFIA & IDENTIDADE
            </span>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg uppercase text-on-surface leading-tight mb-space-md font-bold">
              MAIS QUE SUSHI. UMA EXPERIÊNCIA DE <span className="text-primary">OUTRO NÍVEL.</span>
            </h2>
            <div className="space-y-space-md font-body-lg text-body-md text-on-surface-variant mb-space-xl">
              <p>
                O Supershushi Bar nasce do encontro improvável entre o rigor milenar da alta gastronomia japonesa e a pulsante energia dos cosmos. Inspirados na vibração e intensidade das grandes transformações, elevamos cada corte, texturas e combinações a um estado superior de sabor.
              </p>
              <p>
                Não criamos apenas pratos: arquitetamos rituais sensoriais onde a precisão oriental encontra a potência das chamas e dos mares mais profundos.
              </p>
            </div>

            {/* 3 Pillar Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md w-full">
              <div className="p-space-md rounded-xl bg-surface-container/70 border border-outline-variant/20 hover:border-secondary-container/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary mb-space-sm">
                  <span className="material-symbols-outlined text-[24px]">architecture</span>
                </div>
                <h3 className="font-headline-sm text-body-lg font-bold text-on-surface mb-space-xs">Precisão Omakase</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Cortes artesanais diários com pescados selecionados de águas profundas.
                </p>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container/70 border border-outline-variant/20 hover:border-primary-container/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-space-sm">
                  <span className="material-symbols-outlined text-[24px]">bolt</span>
                </div>
                <h3 className="font-headline-sm text-body-lg font-bold text-on-surface mb-space-xs">Energia & Fusão</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Técnicas contemporâneas, finalizações com maçarico e especiarias nobres.
                </p>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container/70 border border-outline-variant/20 hover:border-tertiary/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary mb-space-sm">
                  <span className="material-symbols-outlined text-[24px]">dark_mode</span>
                </div>
                <h3 className="font-headline-sm text-body-lg font-bold text-on-surface mb-space-xs">Atmosfera Imersiva</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Design arquitetônico dark futurista, som ambiente e iluminação sensorial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
