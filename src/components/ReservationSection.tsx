import React, { useState } from 'react';

interface ReservationSectionProps {
  onOpenConcierge?: (msg?: string) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onOpenConcierge,
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    convidados: '2',
    data: '',
    horario: '20:30',
    observacoes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      nome: '',
      telefone: '',
      convidados: '2',
      data: '',
      horario: '20:30',
      observacoes: '',
    });
    setSubmitted(false);
  };

  return (
    <section className="py-margin-lg bg-surface-container-lowest/80 relative" id="reservas">
      <div className="max-w-[1360px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
        <div className="relative rounded-3xl p-space-md md:p-space-xl bg-surface-container border border-outline-variant/30 shadow-2xl overflow-hidden">
          {/* Subtle Energy Glow Accent */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-container/15 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg relative z-10">
            {/* Left Info & Instant WhatsApp Trigger */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="px-space-sm py-space-xs rounded-full bg-surface-container-high font-label-caps text-label-caps uppercase text-primary tracking-widest font-semibold">
                  RESERVA ANTECIPADA
                </span>
                <h2 className="font-headline-lg text-headline-md md:text-headline-lg uppercase text-on-surface mt-space-sm mb-space-md font-bold">
                  SUA PRÓXIMA EXPERIÊNCIA <span className="text-primary">COMEÇA AQUI.</span>
                </h2>
                <p className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant mb-space-lg">
                  Reúna quem você gosta e venha descobrir uma experiência gastronômica de outro universo. Lugares limitados para garantir a excelência omakase.
                </p>
              </div>

              {/* Instant WhatsApp Quick Box */}
              <div className="p-space-lg rounded-2xl bg-surface-container-high/90 border border-secondary-container/30 mb-space-md">
                <div className="flex items-center gap-space-sm mb-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[24px]">bolt</span>
                  <span className="font-headline-sm text-body-lg text-on-surface font-bold">
                    Prefere reserva imediata?
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                  Fale agora com nosso Concierge VIP e garanta sua mesa em poucos segundos via WhatsApp.
                </p>
                <a
                  className="inline-flex items-center justify-center gap-space-sm w-full py-space-sm px-space-md bg-secondary-container text-on-secondary-container font-headline-sm text-label-md uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(82,141,255,0.35)] hover:shadow-[0_0_28px_rgba(82,141,255,0.55)] transition-all font-bold cursor-pointer"
                  href="https://wa.me/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  RESERVAR MESA VIA WHATSAPP
                </a>
              </div>
            </div>

            {/* Right Booking Request Form */}
            <div className="lg:col-span-7 bg-surface-container-lowest/90 p-space-md md:p-space-xl rounded-2xl border border-outline-variant/30">
              {submitted ? (
                <div className="p-space-xl flex flex-col items-center justify-center text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-primary-container/20 text-primary-container flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-[36px]">check_circle</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md uppercase text-on-surface font-bold">
                    Solicitação Recebida com Sucesso!
                  </h3>
                  <p className="font-body-md text-on-surface-variant max-w-md">
                    Obrigado, <strong className="text-primary">{formData.nome}</strong>. Nosso Concierge confirmará a reserva para {formData.convidados} pessoas no horário de {formData.horario} via WhatsApp em breve.
                  </p>
                  <div className="pt-4 flex gap-4">
                    <button
                      onClick={handleReset}
                      className="px-space-lg py-space-sm bg-surface-container-high text-on-surface font-headline-sm text-label-md uppercase tracking-wider rounded-xl hover:bg-surface-container-highest cursor-pointer"
                    >
                      Nova Solicitação
                    </button>
                    {onOpenConcierge && (
                      <button
                        onClick={() => onOpenConcierge(`Olá, acabei de reservar para ${formData.nome}!`)}
                        className="px-space-lg py-space-sm bg-primary-container text-on-primary-container font-headline-sm text-label-md uppercase tracking-wider rounded-xl shadow-lg cursor-pointer font-bold"
                      >
                        Abrir Concierge
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <form className="flex flex-col gap-space-md" id="booking-form" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    <div className="flex flex-col gap-space-xs">
                      <label className="font-label-caps text-label-caps uppercase text-on-surface-variant font-semibold">
                        Nome Completo
                      </label>
                      <input
                        className="w-full bg-surface-container-high px-space-md py-space-sm rounded-xl text-on-surface font-body-md border border-outline-variant/30 focus:border-secondary-container focus:outline-none transition-colors"
                        placeholder="Seu nome"
                        required
                        type="text"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-space-xs">
                      <label className="font-label-caps text-label-caps uppercase text-on-surface-variant font-semibold">
                        WhatsApp / Telefone
                      </label>
                      <input
                        className="w-full bg-surface-container-high px-space-md py-space-sm rounded-xl text-on-surface font-body-md border border-outline-variant/30 focus:border-secondary-container focus:outline-none transition-colors"
                        placeholder="(11) 99999-9999"
                        required
                        type="tel"
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                    <div className="flex flex-col gap-space-xs">
                      <label className="font-label-caps text-label-caps uppercase text-on-surface-variant font-semibold">
                        Convidados
                      </label>
                      <select
                        className="w-full bg-surface-container-high px-space-md py-space-sm rounded-xl text-on-surface font-body-md border border-outline-variant/30 focus:border-secondary-container focus:outline-none transition-colors cursor-pointer"
                        value={formData.convidados}
                        onChange={(e) => setFormData({ ...formData, convidados: e.target.value })}
                      >
                        <option value="2">2 Pessoas</option>
                        <option value="4">4 Pessoas</option>
                        <option value="6">6 Pessoas</option>
                        <option value="8+">8+ Pessoas (Mesa VIP)</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-space-xs">
                      <label className="font-label-caps text-label-caps uppercase text-on-surface-variant font-semibold">
                        Data Desejada
                      </label>
                      <input
                        className="w-full bg-surface-container-high px-space-md py-space-sm rounded-xl text-on-surface font-body-md border border-outline-variant/30 focus:border-secondary-container focus:outline-none transition-colors"
                        required
                        type="date"
                        value={formData.data}
                        onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                      />
                    </div>

                    <div className="flex flex-col gap-space-xs">
                      <label className="font-label-caps text-label-caps uppercase text-on-surface-variant font-semibold">
                        Horário
                      </label>
                      <select
                        className="w-full bg-surface-container-high px-space-md py-space-sm rounded-xl text-on-surface font-body-md border border-outline-variant/30 focus:border-secondary-container focus:outline-none transition-colors cursor-pointer"
                        value={formData.horario}
                        onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                      >
                        <option value="19:00">19:00 (Primeiro Turno)</option>
                        <option value="20:30">20:30 (Turno Omakase)</option>
                        <option value="22:00">22:00 (Cosmic Late)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-space-xs">
                    <label className="font-label-caps text-label-caps uppercase text-on-surface-variant font-semibold">
                      Observações / Ocasião Especial
                    </label>
                    <textarea
                      className="w-full bg-surface-container-high px-space-md py-space-sm rounded-xl text-on-surface font-body-md border border-outline-variant/30 focus:border-secondary-container focus:outline-none transition-colors resize-none"
                      placeholder="Ex: Aniversário, preferência pelo balcão Omakase, restrições alimentares..."
                      rows={3}
                      value={formData.observacoes}
                      onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                    ></textarea>
                  </div>

                  <button
                    className="w-full py-space-md px-space-lg bg-primary-container text-on-primary-container font-headline-sm text-label-md uppercase tracking-wider rounded-xl shadow-[0_0_24px_rgba(255,122,26,0.4)] hover:shadow-[0_0_32px_rgba(255,122,26,0.6)] hover:scale-[1.01] active:scale-[0.99] transition-all mt-space-xs font-bold cursor-pointer"
                    type="submit"
                  >
                    SOLICITAR RESERVA EXCLUSIVA
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
