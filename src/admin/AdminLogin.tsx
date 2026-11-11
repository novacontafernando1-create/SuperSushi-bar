import React, { useState } from 'react';
import { authService } from '../services/authService';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToPublic: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToPublic,
}) => {
  const [email, setEmail] = useState('chef.curadoria@supershushi.bar');
  const [password, setPassword] = useState('OmakaseMaster2025#');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    setTimeout(() => {
      const res = authService.login(email, password, rememberMe);
      setIsLoading(false);
      if (res.success) {
        onLoginSuccess();
      } else {
        setErrorMsg(res.error || 'Credenciais inválidas.');
      }
    }, 400);
  };

  return (
    <div className="bg-[#11131a] text-[#e2e2ec] antialiased min-h-screen selection:bg-[#ff7a1a] selection:text-[#5e2700] font-body-md overflow-x-hidden flex">
      {/* Split Screen Layout */}
      <div className="min-h-screen w-full flex flex-col lg:flex-row relative">
        {/* Lado Esquerdo / Área Visual e Editorial Imersiva */}
        <section className="relative lg:w-7/12 min-h-[480px] lg:min-h-screen flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden bg-[#0c0e15] border-b lg:border-b-0 lg:border-r border-[#584236]/40">
          {/* Imagem de Fundo com Sobreposição Gradiente Cósmica */}
          <div
            className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-35 scale-105 transition-transform duration-1000 ease-out pointer-events-none"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCY7fzGwcxeY8A6i20gO_XJ0DYFktKkPMnQ4D7LQZcaa6vN2YxiI3sr8j58cm0Rn0nMMx8F-Bo82rQHi_tu-8fEcknau47YqB8_gZefabl04eeYP9yXoy6iHFTSIkLCcivsoVSOMaVZLG7yC5Tdoxh_3Y-gszomAz1WVjO9pIMqwavlcRKdOq2I6wd3SJFLm9jOjUlqx-kzHMC7VeZkV2MvWHVM5BkkNOqO-CIckgE')`,
            }}
          />

          {/* Gradientes Cósmicos */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e15] via-[#0c0e15]/80 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e15]/90 via-[#0c0e15]/50 to-[#0c0e15]/90 pointer-events-none"></div>
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ff7a1a]/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Topo: Marca e Emblema */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#282a31] border border-[#584236]/60 flex items-center justify-center text-[#ffb68e] shadow-lg shadow-[#0c0e15]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <span className="font-display-hero text-xl font-bold tracking-tight text-[#e2e2ec] block leading-none">
                  SUPERSHUSHI
                </span>
                <span className="font-label-caps text-[10px] tracking-[0.24em] text-[#ffb68e] uppercase block mt-1">
                  Painel Omakase Admin
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1d1f27]/80 border border-[#584236]/50 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-label-md text-xs text-[#e0c0b1] font-medium">Gateway Ativo</span>
            </div>
          </div>

          {/* Centro: Editorial Futurista */}
          <div className="relative z-10 max-w-2xl py-12 lg:py-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#282a31]/80 border border-[#584236]/60 text-[#ffdbca] mb-6 shadow-sm">
              <span className="material-symbols-outlined text-sm">terminal</span>
              <span className="font-label-caps text-xs">KERNEL OPERACIONAL v4.2</span>
            </div>

            <h1 className="font-display-hero text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#e2e2ec] tracking-tight leading-[1.08] mb-6">
              GERENCIE SEU{' '}
              <span className="bg-gradient-to-r from-[#ff7a1a] via-[#ffb68e] to-[#ffdbca] bg-clip-text text-transparent">
                UNIVERSO
              </span>{' '}
              DE SABORES.
            </h1>

            <p className="font-body-lg text-[#e0c0b1] max-w-xl leading-relaxed text-base sm:text-lg mb-8">
              Controle total do cardápio omakase, gastronomia japonesa de precisão milimétrica e orquestração integrada do balcão de entregas em tempo real.
            </p>

            {/* Badges de Segurança */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#1d1f27]/90 border border-[#584236]/60 backdrop-blur-md">
                <span className="material-symbols-outlined text-[#ffb68e]">lock</span>
                <div className="text-left">
                  <span className="block font-label-caps text-[11px] text-[#e2e2ec] font-semibold">
                    ACESSO CRIPTOGRAFADO
                  </span>
                  <span className="block font-label-md text-xs text-[#e0c0b1]">
                    Protocolo TLS 1.3 Strict
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#1d1f27]/90 border border-[#584236]/60 backdrop-blur-md">
                <span className="material-symbols-outlined text-[#ffb68e]">verified_user</span>
                <div className="text-left">
                  <span className="block font-label-caps text-[11px] text-[#e2e2ec] font-semibold">
                    PROTEÇÃO OMAKASE
                  </span>
                  <span className="block font-label-md text-xs text-[#e0c0b1]">
                    Autenticação Biométrica / 2FA
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé Lado Esquerdo */}
          <div className="relative z-10 pt-6 border-t border-[#584236]/30 flex items-center justify-between text-xs text-[#a78b7d] font-label-md">
            <span>© 2025 Supershushi Bar Inc. Todos os direitos reservados.</span>
            <span className="hidden sm:inline">Servidor Seguro Tokyo-East-01</span>
          </div>
        </section>

        {/* Lado Direito / Área de Autenticação */}
        <section className="lg:w-5/12 flex flex-col justify-between p-6 sm:p-12 lg:p-14 bg-[#11131a] relative z-20">
          {/* Topo: Retorno ao site público */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBackToPublic}
              className="inline-flex items-center gap-2 text-[#e0c0b1] hover:text-[#ffb68e] transition-colors text-sm font-label-md group cursor-pointer"
            >
              <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">
                arrow_back
              </span>
              <span>Voltar para o Website Público</span>
            </button>
            <div className="w-8 h-8 rounded-lg bg-[#1d1f27] flex items-center justify-center border border-[#584236]/40 text-[#e0c0b1]">
              <span className="material-symbols-outlined text-base">shield</span>
            </div>
          </div>

          {/* Formulário Central */}
          <div className="w-full max-w-md mx-auto my-auto py-6">
            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#282a31] border border-[#584236]/80 flex items-center justify-center text-[#ff7a1a] mb-4 shadow-inner">
                <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
              </div>
              <h2 className="font-headline-md text-2xl sm:text-3xl text-[#e2e2ec] font-bold tracking-tight mb-2">
                Acesso Administrativo
              </h2>
              <p className="font-body-md text-[#e0c0b1] text-sm sm:text-base">
                Entre com suas credenciais para gerenciar o cardápio e operações.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-5 p-3.5 rounded-xl bg-[#93000a]/40 border border-[#ffb4ab]/40 text-[#ffb4ab] text-xs font-label-md flex items-center gap-2.5 animate-fadeIn">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* E-mail corporativo */}
              <div>
                <label className="block font-label-caps text-xs font-semibold text-[#e2e2ec] mb-2 uppercase tracking-wider">
                  E-mail Corporativo
                </label>
                <div className="relative flex items-center rounded-xl bg-[#1d1f27] border border-[#584236]/60 focus-within:border-[#ffb68e] focus-within:ring-2 focus-within:ring-[#ffb68e]/20 transition-all">
                  <span className="absolute left-4 text-[#a78b7d] flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-xl">mail</span>
                  </span>
                  <input
                    className="w-full bg-transparent pl-12 pr-4 py-3.5 text-[#e2e2ec] placeholder:text-[#a78b7d]/70 font-body-md text-sm border-0 focus:ring-0 focus:outline-none rounded-xl"
                    placeholder="gestao@supershushi.bar"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Senha */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block font-label-caps text-xs font-semibold text-[#e2e2ec] uppercase tracking-wider">
                    Senha de Acesso
                  </label>
                  <span className="font-label-md text-xs text-[#ffb68e] hover:text-[#ffdbca] cursor-pointer">
                    Esqueci minha senha
                  </span>
                </div>
                <div className="relative flex items-center rounded-xl bg-[#1d1f27] border border-[#584236]/60 focus-within:border-[#ffb68e] focus-within:ring-2 focus-within:ring-[#ffb68e]/20 transition-all">
                  <span className="absolute left-4 text-[#a78b7d] flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-xl">key</span>
                  </span>
                  <input
                    className="w-full bg-transparent pl-12 pr-12 py-3.5 text-[#e2e2ec] placeholder:text-[#a78b7d]/70 font-body-md text-sm border-0 focus:ring-0 focus:outline-none rounded-xl"
                    placeholder="••••••••••••"
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    aria-label="Alternar visibilidade da senha"
                    className="absolute right-4 text-[#a78b7d] hover:text-[#e2e2ec] transition-colors focus:outline-none flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Opções: Manter Conectado */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-3 cursor-pointer group select-none">
                  <input
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#584236]/70 bg-[#1d1f27] text-[#ff7a1a] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#ff7a1a]"
                    type="checkbox"
                  />
                  <span className="font-body-sm text-xs text-[#e0c0b1] group-hover:text-[#e2e2ec] transition-colors">
                    Manter conectado por 30 dias
                  </span>
                </label>
              </div>

              {/* Botão Principal com Gradiente Laranja */}
              <div className="pt-3">
                <button
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#ff7a1a] via-[#ff8833] to-[#ff6600] text-[#0c0e15] font-headline-sm font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#ff7a1a]/25 hover:shadow-[#ff7a1a]/40 hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                  type="submit"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#0c0e15] border-t-transparent rounded-full animate-spin"></span>
                      AUTENTICANDO...
                    </span>
                  ) : (
                    <>
                      <span>ENTRAR NO PAINEL</span>
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Banner de Segurança */}
            <div className="mt-8 p-4 rounded-xl bg-[#282a31]/40 border border-[#584236]/30 flex items-start gap-3">
              <span className="material-symbols-outlined text-[#ffb68e] text-lg mt-0.5">info</span>
              <p className="font-body-sm text-xs text-[#e0c0b1] leading-relaxed">
                Área restrita à equipe de curadoria e gestão gastronômica do{' '}
                <strong className="text-[#e2e2ec]">Supershushi Bar</strong>. Todas as sessões e alterações de cardápio são auditadas criptograficamente.
              </p>
            </div>
          </div>

          {/* Rodapé */}
          <div className="pt-6 border-t border-[#584236]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <button
              onClick={onBackToPublic}
              className="font-label-md text-xs text-[#a78b7d] hover:text-[#ffb68e] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">arrow_left</span>
              <span>← Voltar para o Website Público</span>
            </button>
            <div className="flex items-center gap-3 text-xs text-[#a78b7d] font-label-md">
              <span>Termos</span>
              <span>•</span>
              <span>Privacidade</span>
              <span>•</span>
              <span>Suporte Técnico</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
