import React from 'react';

export const LocalizacaoSection: React.FC = () => {
  return (
    <section className="py-margin-lg relative" id="localizacao">
      <div className="max-w-[1360px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
          {/* Left: Address & Operational Hours Details */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="px-space-sm py-space-xs rounded-full bg-surface-container font-label-caps text-label-caps uppercase text-primary tracking-widest mb-space-xs font-semibold">
              COMO ENCONTRAR NOSSO ESPAÇO
            </span>
            <h2 className="font-headline-lg text-headline-md md:text-headline-lg uppercase text-on-surface mb-space-md font-bold">
              LOCALIZAÇÃO & HORÁRIOS
            </h2>

            <div className="space-y-space-md w-full mb-space-lg">
              <div className="flex items-start gap-space-md">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[22px]">pin_drop</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-body-lg text-on-surface font-bold">Endereço Principal</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Av. Brigadeiro Faria Lima, 2800 — Jardins / Itaim Bibi<br />
                    São Paulo — SP, CEP 01451-000
                  </p>
                  <span className="font-mono-price text-body-sm text-primary font-semibold">
                    Serviço de Valet Parking Cortesia na Porta
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-space-md">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-[22px]">schedule</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline-sm text-body-lg text-on-surface font-bold">Horários de Operação</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    <span className="text-on-surface font-semibold">Terça a Domingo:</span> Jantar das 19h00 às 23h30
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    <span className="text-on-surface font-semibold">Sexta a Domingo:</span> Almoço Executivo das 12h00 às 15h00
                  </p>
                  <p className="font-body-sm text-body-sm text-outline">
                    Segunda-feira: Fechado para renovação criativa e curadoria de pescados
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-space-md">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary shrink-0">
                  <span className="material-symbols-outlined text-[22px]">accessible_forward</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-body-lg text-on-surface font-bold">Acessibilidade Total</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Espaço completamente adaptado com rampas, elevador e toaletes acessíveis.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-space-sm">
              <a
                className="inline-flex items-center gap-space-xs px-space-lg py-space-sm bg-surface-container-high text-on-surface hover:bg-surface-container-highest font-headline-sm text-label-md uppercase tracking-wider rounded-xl border border-outline-variant/30 transition-all font-bold cursor-pointer"
                href="https://maps.google.com/?q=Av.+Brigadeiro+Faria+Lima,+2800,+Sao+Paulo"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-primary text-[20px]">map</span>
                ABRIR NO GOOGLE MAPS
              </a>
              <a
                className="inline-flex items-center gap-space-xs px-space-lg py-space-sm bg-surface-container-high text-on-surface hover:bg-surface-container-highest font-headline-sm text-label-md uppercase tracking-wider rounded-xl border border-outline-variant/30 transition-all font-bold cursor-pointer"
                href="https://waze.com/ul?q=Av.+Brigadeiro+Faria+Lima,+2800,+Sao+Paulo"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-secondary text-[20px]">navigation</span>
                ABRIR NO WAZE
              </a>
            </div>
          </div>

          {/* Right: Stylized Dark Interactive Map View Mock */}
          <div className="lg:col-span-6 relative">
            <div
              className="w-full h-96 rounded-2xl overflow-hidden bg-cover bg-center border border-outline-variant/40 shadow-2xl relative"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQA6rzvrsIxX8hxlMVQdRwvD6LuBT1j09hkVH7kTuhXhn1iDP7onCT05i24cuzpzOVxfOyKRrENjfVN3oDXgJ1UZLoMwhiQ2ZAI4f7amfzgNURRhmB2essAz1htPOQ7f0ZhyRmiMspQ6YXR9Rqzu8E0xRzHI4QUAYJT1QerGTZcRXvfwlfbFmiK6BrmpTy7XSysYpVWZ6F-dQXdsZjcYIyJwvuUYQLkxIw4eJ6fiU')",
              }}
            >
              {/* Map Overlay Gradient */}
              <div className="absolute inset-0 bg-surface-container-lowest/50 backdrop-blur-[2px]"></div>

              {/* Stylized Neon Map Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-[0_0_24px_#ff7a1a] animate-bounce">
                  <span className="material-symbols-outlined text-[28px]">restaurant</span>
                </div>
                <div className="mt-2 px-space-md py-space-xs rounded-full bg-surface-container-lowest/90 border border-primary text-primary font-headline-sm text-label-md uppercase tracking-wider shadow-lg font-bold">
                  SUPERSHUSHI BAR
                </div>
              </div>

              {/* Mini Ambience Snapshot in corner */}
              <div className="absolute bottom-space-md right-space-md w-36 h-24 rounded-xl overflow-hidden border border-outline-variant/40 shadow-xl hidden sm:block">
                <img
                  alt="Supershushi Ambience"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvUu7pTwXgcYjP4QI856irXDlrvSmQMWQJk1FqQe8vWh3cKo1duuBMQtcq-peXb3jA1TqBjAQei1HFxwF9a8sT_s-krfR4shmtV1LovcTKn2mi4XD8m3FU1zVyTXIfuycvbTLJsVkbj0clEAyTZHJqSh8i0h9ZCMVS_fHqrPGPxCABmuRRYvGCyhRGZKF-g4WE1W51iQPo5GuD734KX07key506h2KhNYMDmz_IJA"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
