import React, { useState } from 'react';
import { storeService } from '../services/storeService';
import { StoreSettings } from '../types/admin';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<StoreSettings>(() => storeService.getSettings());
  const [activeTab, setActiveTab] = useState<'identidade' | 'canais' | 'cardapio' | 'equipe'>('identidade');
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  // Form states
  const [restaurantName, setRestaurantName] = useState(settings.restaurantName);
  const [slogan, setSlogan] = useState(settings.slogan);
  const [address, setAddress] = useState(settings.address);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [instagram, setInstagram] = useState(settings.instagram);
  const [phone, setPhone] = useState(settings.phone);
  const [openingHours, setOpeningHours] = useState(settings.openingHours);
  const [serviceTaxEnabled, setServiceTaxEnabled] = useState(settings.serviceTaxEnabled);
  const [fishAlertEnabled, setFishAlertEnabled] = useState(settings.fishAlertEnabled);
  const [maintenanceMode, setMaintenanceMode] = useState(settings.maintenanceMode);

  const showToast = (msg: string) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(null), 3000);
  };

  const handleSaveSettings = () => {
    const updated = storeService.updateSettings({
      restaurantName,
      slogan,
      address,
      whatsapp,
      instagram,
      phone,
      openingHours,
      serviceTaxEnabled,
      fishAlertEnabled,
      maintenanceMode,
    });
    setSettings(updated);
    showToast('Configurações salvas e propagadas para o website público!');
  };

  const handleUndo = () => {
    const current = storeService.getSettings();
    setRestaurantName(current.restaurantName);
    setSlogan(current.slogan);
    setAddress(current.address);
    setWhatsapp(current.whatsapp);
    setInstagram(current.instagram);
    setPhone(current.phone);
    setOpeningHours(current.openingHours);
    setServiceTaxEnabled(current.serviceTaxEnabled);
    setFishAlertEnabled(current.fishAlertEnabled);
    setMaintenanceMode(current.maintenanceMode);
    showToast('Alterações não salvas foram descartadas.');
  };

  return (
    <div className="flex flex-col w-full gap-8">
      {/* Toast Notice */}
      {toastNotice && (
        <div className="fixed top-24 right-8 z-50 bg-[#1d1f27] border border-[#ff7a1a] text-[#e2e2ec] px-4 py-3 rounded-xl shadow-[0_0_24px_rgba(255,122,26,0.35)] flex items-center gap-3 animate-fadeIn">
          <span className="material-symbols-outlined text-[#ff7a1a] text-[20px]">check_circle</span>
          <span className="font-label-md text-xs font-semibold">{toastNotice}</span>
        </div>
      )}

      {/* Header & Save Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col max-w-2xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#ff7a1a] animate-ping"></span>
            <span className="font-label-caps text-xs text-[#ffb68e] tracking-widest uppercase font-bold">
              SISTEMA SUPERSHUSHI • MASTER LEVEL
            </span>
          </div>
          <h1 className="font-headline-lg text-3xl md:text-4xl uppercase text-[#e2e2ec] tracking-tight font-bold">
            Configurações da Plataforma
          </h1>
          <p className="font-body-md text-sm text-[#e0c0b1] mt-1">
            Gerencie os dados institucionais do restaurante, canais de atendimento, regras de sincronização do cardápio e segurança da equipe.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <button
            onClick={handleUndo}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#191b23] hover:bg-[#282a31] text-[#e0c0b1] hover:text-[#e2e2ec] transition-all font-label-md text-xs border border-[#282a31] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">history</span>
            <span>Desfazer</span>
          </button>
          <button
            onClick={handleSaveSettings}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff7a1a] hover:bg-[#ff8833] text-[#0c0e15] font-headline-sm text-xs uppercase tracking-wider font-bold transition-all shadow-[0_0_24px_rgba(255,122,26,0.35)] cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Salvar Alterações</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation Bar */}
      <div className="w-full bg-[#191b23] p-1.5 rounded-xl flex flex-wrap gap-1 border border-[#282a31]/60">
        <button
          onClick={() => setActiveTab('identidade')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-label-md text-xs transition-all cursor-pointer ${
            activeTab === 'identidade'
              ? 'bg-[#ff7a1a] text-[#0c0e15] font-bold shadow-[0_0_20px_rgba(255,122,26,0.35)]'
              : 'text-[#e0c0b1] hover:bg-[#282a31] hover:text-[#e2e2ec]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">storefront</span>
          <span>Dados do Restaurante</span>
        </button>

        <button
          onClick={() => setActiveTab('canais')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-label-md text-xs transition-all cursor-pointer ${
            activeTab === 'canais'
              ? 'bg-[#ff7a1a] text-[#0c0e15] font-bold shadow-[0_0_20px_rgba(255,122,26,0.35)]'
              : 'text-[#e0c0b1] hover:bg-[#282a31] hover:text-[#e2e2ec]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">chat</span>
          <span>Canais &amp; WhatsApp</span>
        </button>

        <button
          onClick={() => setActiveTab('cardapio')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-label-md text-xs transition-all cursor-pointer ${
            activeTab === 'cardapio'
              ? 'bg-[#ff7a1a] text-[#0c0e15] font-bold shadow-[0_0_20px_rgba(255,122,26,0.35)]'
              : 'text-[#e0c0b1] hover:bg-[#282a31] hover:text-[#e2e2ec]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">sync</span>
          <span>Sincronização do Cardápio</span>
        </button>

        <button
          onClick={() => setActiveTab('equipe')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-label-md text-xs transition-all cursor-pointer ${
            activeTab === 'equipe'
              ? 'bg-[#ff7a1a] text-[#0c0e15] font-bold shadow-[0_0_20px_rgba(255,122,26,0.35)]'
              : 'text-[#e0c0b1] hover:bg-[#282a31] hover:text-[#e2e2ec]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">shield_person</span>
          <span>Usuários &amp; Segurança</span>
        </button>
      </div>

      {/* Main Asymmetric Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Identity + Channels + Team (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Bloco 1: Identidade & Estabelecimento */}
          <section className="bg-[#191b23] rounded-2xl p-6 border border-[#282a31]/60 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#282a31]/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#282a31] flex items-center justify-center text-[#ff7a1a]">
                  <span className="material-symbols-outlined text-[20px]">badge</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-[10px] text-[#ff7a1a] uppercase font-bold">
                    BLOCO 01
                  </span>
                  <h2 className="font-headline-sm text-base text-[#e2e2ec] font-bold">
                    Identidade &amp; Estabelecimento
                  </h2>
                </div>
              </div>
              <span className="font-label-caps text-[10px] px-2.5 py-1 rounded-full bg-[#282a31] text-[#e0c0b1] font-bold">
                OMAKASE ATELIER
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {/* Brand Logo Card */}
              <div className="md:col-span-1 flex flex-col items-center justify-center p-4 rounded-xl bg-[#1d1f27] border border-[#282a31] text-center">
                <div className="w-20 h-20 rounded-2xl bg-[#0c0e15] flex items-center justify-center p-3 mb-2 border border-[#282a31]">
                  <div className="w-10 h-10 rounded-xl bg-[#ff7a1a] flex items-center justify-center text-[#0c0e15]">
                    <span className="material-symbols-outlined text-[24px]">ramen_dining</span>
                  </div>
                </div>
                <span className="font-label-caps text-xs text-[#e2e2ec] uppercase font-bold">
                  Emblema Oficial
                </span>
                <span className="font-body-sm text-[11px] text-[#e0c0b1]/60 mt-0.5">
                  Vetor SVG Ki
                </span>
              </div>

              {/* Fields */}
              <div className="md:col-span-2 flex flex-col gap-3">
                <div>
                  <label className="block font-label-caps text-xs text-[#e0c0b1] uppercase font-bold mb-1">
                    NOME DO RESTAURANTE
                  </label>
                  <input
                    type="text"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-body-md text-xs border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff]"
                  />
                </div>

                <div>
                  <label className="block font-label-caps text-xs text-[#e0c0b1] uppercase font-bold mb-1">
                    SLOGAN INSTITUCIONAL
                  </label>
                  <input
                    type="text"
                    value={slogan}
                    onChange={(e) => setSlogan(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-body-md text-xs border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff]"
                  />
                </div>

                <div>
                  <label className="block font-label-caps text-xs text-[#e0c0b1] uppercase font-bold mb-1">
                    ENDEREÇO FÍSICO DO OMAKASE
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-body-md text-xs border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff]"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Bloco 2: Canais de Contato & Concierge */}
          <section className="bg-[#191b23] rounded-2xl p-6 border border-[#282a31]/60 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#282a31]/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#282a31] flex items-center justify-center text-[#528dff]">
                  <span className="material-symbols-outlined text-[20px]">support_agent</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-[10px] text-[#528dff] uppercase font-bold">
                    BLOCO 02
                  </span>
                  <h2 className="font-headline-sm text-base text-[#e2e2ec] font-bold">
                    Canais de Contato &amp; Concierge
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#282a31]">
                <span className="w-2 h-2 rounded-full bg-[#528dff]"></span>
                <span className="font-label-caps text-[10px] text-[#528dff] font-bold">
                  WHATSAPP SYNC ON
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* WhatsApp Input */}
              <div className="p-4 rounded-xl bg-[#1d1f27] border border-[#282a31] flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-label-caps text-xs text-[#e0c0b1] uppercase font-bold">
                      WHATSAPP CONCIERGE
                    </label>
                    <span className="material-symbols-outlined text-[#528dff] text-[16px]">bolt</span>
                  </div>
                  <p className="font-body-sm text-xs text-[#e0c0b1]/70 mb-2">
                    Recebe reservas automáticas do website público.
                  </p>
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg bg-[#0c0e15] text-[#e2e2ec] font-headline-sm text-sm border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff]"
                  />
                </div>
                <span className="font-label-caps text-[10px] text-[#ff7a1a]">
                  STATUS: Ativo no rodapé e drawer
                </span>
              </div>

              {/* Instagram Profile */}
              <div className="p-4 rounded-xl bg-[#1d1f27] border border-[#282a31] flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-label-caps text-xs text-[#e0c0b1] uppercase font-bold">
                      PERFIL DO INSTAGRAM
                    </label>
                    <span className="material-symbols-outlined text-[#ff7a1a] text-[16px]">
                      travel_explore
                    </span>
                  </div>
                  <p className="font-body-sm text-xs text-[#e0c0b1]/70 mb-2">
                    Vinculado nos botões sociais de navegação.
                  </p>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-[#e0c0b1]/60 font-mono text-sm">@</span>
                    <input
                      type="text"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      className="w-full h-11 pl-8 pr-3 rounded-lg bg-[#0c0e15] text-[#e2e2ec] font-body-sm text-xs border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#ff7a1a]"
                    />
                  </div>
                </div>
                <span className="font-body-sm text-[11px] text-[#e0c0b1]/70">
                  42.8k seguidores ativos
                </span>
              </div>

              {/* Telefone Fixo & Horário */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block font-label-caps text-xs text-[#e0c0b1] uppercase font-bold mb-1">
                    TELEFONE FIXO DA CASA
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-body-sm text-xs border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff]"
                  />
                </div>
                <div>
                  <label className="block font-label-caps text-xs text-[#e0c0b1] uppercase font-bold mb-1">
                    HORÁRIO DE ATENDIMENTO
                  </label>
                  <input
                    type="text"
                    value={openingHours}
                    onChange={(e) => setOpeningHours(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#1d1f27] text-[#e2e2ec] font-body-sm text-xs border border-[#282a31] focus:outline-none focus:ring-1 focus:ring-[#528dff]"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Bloco 5: Equipe & Permissões */}
          <section className="bg-[#191b23] rounded-2xl p-6 border border-[#282a31]/60 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#282a31]/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#282a31] flex items-center justify-center text-[#ff7a1a]">
                  <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-[10px] text-[#ff7a1a] uppercase font-bold">
                    BLOCO 05
                  </span>
                  <h2 className="font-headline-sm text-base text-[#e2e2ec] font-bold">
                    Equipe &amp; Permissões de Acesso
                  </h2>
                </div>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1d1f27] hover:bg-[#282a31] text-[#ff7a1a] text-xs font-label-md cursor-pointer border border-[#282a31]">
                <span className="material-symbols-outlined text-[15px]">person_add</span>
                <span>Convidar</span>
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Chef Hiroshi */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#1d1f27] border border-[#282a31]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#ff7a1a]/20 text-[#ff7a1a] flex items-center justify-center font-bold text-sm">
                    H
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-label-md text-xs text-[#e2e2ec] font-bold">
                        Chef Hiroshi Tanaka
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#ff7a1a]/20 text-[#ff7a1a] font-label-caps text-[9px] font-bold">
                        MASTER CHEF
                      </span>
                    </div>
                    <span className="font-body-sm text-[11px] text-[#e0c0b1]/70">
                      chef.curadoria@supershushi.bar • Acesso Total
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#528dff] text-[18px]">vpn_key</span>
              </div>

              {/* Kenji Sato */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#1d1f27] border border-[#282a31]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#528dff]/20 text-[#528dff] flex items-center justify-center font-bold text-sm">
                    K
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-label-md text-xs text-[#e2e2ec] font-bold">Kenji Sato</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#282a31] text-[#528dff] font-label-caps text-[9px] font-bold">
                        SUB-CHEF
                      </span>
                    </div>
                    <span className="font-body-sm text-[11px] text-[#e0c0b1]/70">
                      kenji@supershushi.bar • Cardápio e Estoque
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#528dff] text-[18px]">vpn_key</span>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Cardápio Rules + Infrastructure (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Bloco 3: Configurações de Exibição do Cardápio Público */}
          <section className="bg-[#191b23] rounded-2xl p-6 border border-[#282a31]/60 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#282a31]/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#282a31] flex items-center justify-center text-[#ff7a1a]">
                  <span className="material-symbols-outlined text-[20px]">tune</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-[10px] text-[#ff7a1a] uppercase font-bold">
                    BLOCO 03
                  </span>
                  <h3 className="font-headline-sm text-base text-[#e2e2ec] font-bold">
                    Cardápio Público &amp; Regras
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* Taxa de Serviço Switch */}
              <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#1d1f27] border border-[#282a31] cursor-pointer hover:bg-[#282a31] transition-colors">
                <div className="flex flex-col pr-3">
                  <span className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                    Exibir aviso de taxa de serviço
                  </span>
                  <span className="font-body-sm text-[11px] text-[#e0c0b1]/70 mt-0.5">
                    Destaca no checkout a taxa opcional de 13% para a brigada.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={serviceTaxEnabled}
                  onChange={(e) => setServiceTaxEnabled(e.target.checked)}
                  className="w-5 h-5 rounded accent-[#ff7a1a] cursor-pointer shrink-0"
                />
              </label>

              {/* Moeda Padrão */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#1d1f27] border border-[#282a31]">
                <div className="flex flex-col">
                  <span className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                    Moeda padrão do salão
                  </span>
                  <span className="font-body-sm text-[11px] text-[#e0c0b1]/70 mt-0.5">
                    Formato contábil aplicado nos pratos.
                  </span>
                </div>
                <div className="px-3 py-1 rounded-lg bg-[#0c0e15] font-headline-sm text-xs text-[#ff7a1a] font-bold border border-[#282a31]">
                  R$ BRL
                </div>
              </div>

              {/* Notificar Indisponibilidade Switch */}
              <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#1d1f27] border border-[#282a31] cursor-pointer hover:bg-[#282a31] transition-colors">
                <div className="flex flex-col pr-3">
                  <span className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                    Alerta de indisponibilidade de pescados
                  </span>
                  <span className="font-body-sm text-[11px] text-[#e0c0b1]/70 mt-0.5">
                    Notifica automaticamente caso o lote de Bluefin ou Uni falhe.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={fishAlertEnabled}
                  onChange={(e) => setFishAlertEnabled(e.target.checked)}
                  className="w-5 h-5 rounded accent-[#ff7a1a] cursor-pointer shrink-0"
                />
              </label>

              {/* Modo Manutenção Switch */}
              <label className="flex items-center justify-between p-3.5 rounded-xl bg-[#1d1f27] border border-[#282a31] cursor-pointer hover:bg-[#282a31] transition-colors">
                <div className="flex flex-col pr-3">
                  <div className="flex items-center gap-1.5">
                    <span className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                      Modo Manutenção do Cardápio
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]"></span>
                  </div>
                  <span className="font-body-sm text-[11px] text-[#e0c0b1]/70 mt-0.5">
                    Fecha pedidos digitais temporariamente para balancear o salão.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={(e) => setMaintenanceMode(e.target.checked)}
                  className="w-5 h-5 rounded accent-[#ffb4ab] cursor-pointer shrink-0"
                />
              </label>
            </div>
          </section>

          {/* Bloco 4: Status do Banco de Dados & Nuvem */}
          <section className="bg-[#191b23] rounded-2xl p-6 border border-[#282a31]/60 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#282a31]/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#282a31] flex items-center justify-center text-[#528dff]">
                  <span className="material-symbols-outlined text-[20px]">database</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-[10px] text-[#528dff] uppercase font-bold">
                    BLOCO 04
                  </span>
                  <h3 className="font-headline-sm text-base text-[#e2e2ec] font-bold">
                    Infraestrutura em Nuvem
                  </h3>
                </div>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#528dff] shadow-[0_0_12px_#528dff]"></div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-3.5 rounded-xl bg-[#1d1f27] border border-[#282a31] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#528dff] text-[20px]">dns</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                      Armazenamento Local Persistente
                    </span>
                    <span className="font-body-sm text-[11px] text-emerald-400">
                      Sincronizado • 0ms latência
                    </span>
                  </div>
                </div>
                <span className="font-mono-price text-xs text-[#e2e2ec] font-bold">v4.8</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1d1f27] border border-[#282a31] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#ff7a1a] text-[20px]">
                    cloud_done
                  </span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-xs text-[#e2e2ec] font-semibold">
                      Cache Reativo de Borda
                    </span>
                    <span className="font-body-sm text-[11px] text-[#ff7a1a]">
                      Distribuição em Tempo Real
                    </span>
                  </div>
                </div>
                <span className="font-label-caps text-[10px] px-2 py-0.5 rounded bg-[#282a31] text-[#e2e2ec]">
                  EDGE-SP
                </span>
              </div>
            </div>
          </section>

          {/* Ambiência Card */}
          <div className="relative rounded-2xl overflow-hidden h-36 bg-[#0c0e15] border border-[#282a31] flex items-end p-4">
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="flex flex-col">
                <span className="font-label-caps text-[10px] text-[#ff7a1a] uppercase font-bold">
                  AMBIÊNCIA ATIVA
                </span>
                <span className="font-headline-sm text-sm text-[#e2e2ec] font-bold">
                  Balcão Omakase 10 Assentos
                </span>
              </div>
              <span className="font-label-caps text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded-full border border-emerald-500/20 font-bold">
                AO VIVO
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Notification */}
      <div className="p-4 rounded-xl bg-[#191b23] border border-[#282a31]/60 flex items-center justify-between text-xs text-[#e0c0b1]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#528dff] text-[18px]">verified_user</span>
          <span>Todas as alterações são autenticadas pelo protocolo criptográfico do Supershushi Bar.</span>
        </div>
        <span className="font-label-caps text-[10px] text-[#e0c0b1]">VERSÃO 4.8.1-GA</span>
      </div>
    </div>
  );
};
