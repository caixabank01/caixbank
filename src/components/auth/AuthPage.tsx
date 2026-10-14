import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { AccountType } from '../../types/bank';
import { 
  Lock, 
  Sparkles, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  UserPlus, 
  LogIn,
  CheckCircle2,
  ShieldCheck,
  Building
} from 'lucide-react';
import caixabankLogo from '../../assets/images/caixabank_logo_white_1791832638118.jpg';

interface AuthPageProps {
  initialMode?: 'login' | 'register';
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const { login, register, t, language } = useBank();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Login form state - clean, completely empty columns as requested
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Register form state - clean and empty columns
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPasswordConfirm, setRegPasswordConfirm] = useState('');
  const [regAccountType, setRegAccountType] = useState<AccountType>('courant');
  const [regTerms, setRegTerms] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setLoginError(
        language === 'es'
          ? 'Por favor, introduzca su identificador y contraseña.'
          : 'Please enter your login identifier and password.'
      );
      return;
    }
    const result = login(loginIdentifier, loginPassword);
    if (!result.success) {
      setLoginError(result.message || t.error);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (!regFirstName.trim() || !regLastName.trim()) {
      setRegError(language === 'es' ? 'Por favor, indique su nombre y apellidos.' : 'Please enter your first and last name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setRegError(language === 'es' ? 'Por favor, introduzca un correo electrónico válido.' : 'Please enter a valid email address.');
      return;
    }
    if (regPassword.length < 6) {
      setRegError(language === 'es' ? 'La contraseña debe tener al menos 6 caracteres.' : 'Password must be at least 6 characters.');
      return;
    }
    if (regPassword !== regPasswordConfirm) {
      setRegError(language === 'es' ? 'Las contraseñas no coinciden.' : 'Passwords do not match.');
      return;
    }
    if (!regTerms) {
      setRegError(t.termsConsent);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = register({
        firstName: regFirstName,
        lastName: regLastName,
        email: regEmail,
        phone: regPhone,
        password: regPassword,
        accountType: regAccountType,
        initialDeposit: 0,
        address: regAddress || (language === 'es' ? 'España' : 'Europe'),
      });

      setIsSubmitting(false);
      if (!res.success) {
        setRegError(res.message || t.error);
      }
    }, 400);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row bg-white text-slate-900 selection:bg-[#007eae] selection:text-white">
      {/* LEFT COLUMN: Clean Pure White Presentation with Official CaixaBank Logo (No Bank Card) */}
      <div className="lg:w-1/2 p-6 sm:p-10 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200/90 bg-white">
        <div>
          {/* CaixaBank Private Banking Brand Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-[#007eae] text-xs font-bold mb-8 shadow-xs">
            {/* CaixaBank Star Icon */}
            <svg viewBox="0 0 100 100" className="w-4 h-4">
              <path d="M50 10 L58 40 L88 50 L58 60 L50 90 L42 60 L12 50 L42 40 Z" fill="#007eae" />
              <circle cx="28" cy="28" r="7" fill="#f8b018" />
              <circle cx="72" cy="28" r="6" fill="#e62e2d" />
            </svg>
            <span>{t.heroBadge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950 mb-4 leading-tight">
            {t.heroTitle}
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-xl mb-8 leading-relaxed font-normal">
            {t.heroSubtitle}
          </p>

          {/* OFFICIAL CAIXABANK LOGO IMAGE (PURE WHITE HEADQUARTERS EMBLEM) */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white mb-8 max-w-lg group">
            <img
              src={caixabankLogo}
              alt="Logo oficial CaixaBank"
              className="w-full h-64 sm:h-72 object-cover object-center transition-transform duration-700 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/20 to-transparent flex flex-col justify-end p-6">
              <div className="text-xs text-[#007eae] font-black tracking-widest uppercase mb-1">
                Entidad Oficial Regulada #2100
              </div>
              <div className="text-sm font-bold text-slate-900">
                CaixaBank S.A. · Banca Privada y Financiación Digital
              </div>
            </div>
          </div>

          {/* CaixaBank 2% Reduced Commission & Client Advantages (User Request) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/80 border border-sky-200/90 shadow-2xs max-w-lg mb-6">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#007eae] text-white flex items-center justify-center font-black text-lg shrink-0 shadow-xs">
                2%
              </div>
              <div className="space-y-1">
                <div className="text-sm font-black text-slate-950">
                  Únicamente 2% de comisión bancaria reducida
                </div>
                <div className="text-xs text-[#007eae] font-bold">
                  Condición preferencial exclusiva y máximas ventajas para clientes CaixaBank
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Disfrute de un tipo de comisión bancaria reducido de únicamente el 2%, con condiciones preferenciales de financiación, amortización transparente y ventajas exclusivas para los clientes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security accreditation note */}
        <div className="pt-6 border-t border-slate-200 text-slate-500 text-xs flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#007eae] shrink-0" />
          <span>Conexión protegida con cifrado SSL bancario AES-256 de alta seguridad.</span>
        </div>
      </div>

      {/* RIGHT COLUMN: PURE WHITE AUTH & REGISTER FORMS (EMPTY COLUMNS AS REQUESTED) */}
      <div className="lg:w-1/2 p-6 sm:p-10 lg:p-16 flex items-center justify-center bg-slate-50/50">
        <div className="w-full max-w-md bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xl">
          {/* Mode Switcher Tabs */}
          <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200 mb-8">
            <button
              onClick={() => {
                setMode('login');
                setLoginError(null);
              }}
              className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                mode === 'login'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LogIn className="w-4 h-4 text-[#007eae]" />
              {t.loginTab}
            </button>
            <button
              onClick={() => {
                setMode('register');
                setRegError(null);
              }}
              className={`flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                mode === 'register'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserPlus className="w-4 h-4 text-[#007eae]" />
              {t.registerTab}
            </button>
          </div>

          {/* ================= FORM 1: LOGIN (EMPTY CLEAN COLUMNS) ================= */}
          {mode === 'login' && (
            <div className="animate-in fade-in duration-200">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-950 mb-1">
                  {t.loginTitle}
                </h2>
                <p className="text-xs text-slate-500">
                  {t.loginSubtitle}
                </p>
              </div>

              {loginError && (
                <div className="p-3.5 mb-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    {t.emailLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="Introduzca su correo electrónico o código..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#007eae] focus:ring-2 focus:ring-[#007eae]/20 transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5 flex justify-between items-center">
                    <span>{t.passwordLabel}</span>
                    <span className="text-[11px] text-slate-400 font-normal">{t.passwordHelp}</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Introduzca su contraseña..."
                      className="w-full px-4 py-3 pr-11 rounded-2xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#007eae] focus:ring-2 focus:ring-[#007eae]/20 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-slate-300 text-[#007eae] focus:ring-[#007eae]"
                    />
                    <span>Recordar identificador</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      alert("Servicio de atención CaixaBank: Por favor, comuníquese con el gestor de su cuenta.");
                    }}
                    className="text-[#007eae] hover:underline font-bold"
                  >
                    ¿Clave olvidada?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#007eae] hover:bg-[#006a94] text-white font-extrabold text-sm transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  {t.loginBtn}
                </button>
              </form>

              <div className="mt-6 text-center text-xs text-slate-500">
                {t.noAccountPrompt}{' '}
                <button
                  onClick={() => {
                    setMode('register');
                    setLoginError(null);
                  }}
                  className="text-[#007eae] hover:underline font-bold"
                >
                  {t.openAccountLink}
                </button>
              </div>
            </div>
          )}

          {/* ================= FORM 2: REGISTER (EMPTY CLEAN COLUMNS) ================= */}
          {mode === 'register' && (
            <div className="animate-in fade-in duration-200">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-950 mb-1">
                  {t.regTitle}
                </h2>
                <p className="text-xs text-slate-500">
                  {t.regSubtitle}
                </p>
              </div>

              {regError && (
                <div className="p-3.5 mb-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{regError}</span>
                </div>
              )}

              <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      {t.firstNameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={regFirstName}
                      onChange={(e) => setRegFirstName(e.target.value)}
                      placeholder="Nombre..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-[#007eae] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      {t.lastNameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={regLastName}
                      onChange={(e) => setRegLastName(e.target.value)}
                      placeholder="Apellidos..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-[#007eae] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-[#007eae] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    {t.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+34 600 000 000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-[#007eae] focus:bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Dirección postal
                  </label>
                  <input
                    type="text"
                    value={regAddress}
                    onChange={(e) => setRegAddress(e.target.value)}
                    placeholder="Calle, número, ciudad..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-[#007eae] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      {t.passwordLabel}
                    </label>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono focus:outline-none focus:border-[#007eae] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      {t.passwordConfirmLabel}
                    </label>
                    <input
                      type="password"
                      required
                      value={regPasswordConfirm}
                      onChange={(e) => setRegPasswordConfirm(e.target.value)}
                      placeholder="Repetir clave"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono focus:outline-none focus:border-[#007eae] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <label className="flex items-start gap-2 text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={regTerms}
                      onChange={(e) => setRegTerms(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-[#007eae] focus:ring-[#007eae]"
                    />
                    <span className="text-[11px] leading-tight">
                      {t.termsConsent}
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#007eae] hover:bg-[#006a94] disabled:opacity-50 text-white font-black text-sm transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>{t.generatingIban}</span>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>{t.openAccountBtn}</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-5 text-center text-xs text-slate-500">
                {t.alreadyClientPrompt}{' '}
                <button
                  onClick={() => {
                    setMode('login');
                    setRegError(null);
                  }}
                  className="text-[#007eae] hover:underline font-bold"
                >
                  {t.loginLink}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
