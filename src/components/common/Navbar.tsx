import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { Language } from '../../i18n/translations';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  ChevronDown, 
  LogOut,
  ShieldCheck,
  User as UserIcon,
  Copy,
  Check,
  X,
  Lock,
  ExternalLink
} from 'lucide-react';

const LANGUAGES: { code: Language; label: string; flag: string; name: string }[] = [
  { code: 'es', label: 'ES', flag: '🇪🇸', name: 'Español' },
  { code: 'en', label: 'EN', flag: '🇬🇧', name: 'English' },
  { code: 'de', label: 'DE', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'it', label: 'IT', flag: '🇮🇹', name: 'Italiano' },
  { code: 'fr', label: 'FR', flag: '🇫🇷', name: 'Français' },
];

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    logout, 
    language, 
    setLanguage, 
    t, 
    showBalance, 
    toggleShowBalance,
    supportMessages,
    markNotificationsAsReadForUser,
  } = useBank();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [notifModalOpen, setNotifModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const userMessages = currentUser
    ? supportMessages.filter((m) => m.userId === currentUser.id)
    : [];
  // True unread messages sent by admin or unread notifications
  const unreadCount = userMessages.filter((m) => m.isReadByUser === false).length;

  const handleCopyClientCode = () => {
    if (!currentUser) return;
    navigator.clipboard.writeText(currentUser.clientCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          {/* CaixaBank Logo exact as screenshot */}
          <div className="flex items-center gap-2.5">
            {/* CaixaBank 4-pointed star emblem with colored dots */}
            <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 100 100" className="w-8 h-8">
                {/* Central star */}
                <path 
                  d="M50 10 L58 40 L88 50 L58 60 L50 90 L42 60 L12 50 L42 40 Z" 
                  fill="#007eae" 
                />
                {/* Color dots (CaixaBank logo accent dots: yellow, red, black) */}
                <circle cx="28" cy="28" r="7" fill="#f8b018" />
                <circle cx="72" cy="28" r="6" fill="#e62e2d" />
                <circle cx="72" cy="72" r="5" fill="#1d1d1b" />
              </svg>
            </div>
            
            <div className="relative">
              <span className="text-2xl font-black tracking-tight text-[#002f6c] font-sans">
                CaixaBank
              </span>
              <div className="h-0.5 bg-[#007eae] w-full rounded-full -mt-0.5"></div>
            </div>

            {currentUser && currentUser.role === 'admin' && (
              <span className="ml-2 hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-700 border border-amber-300">
                <ShieldCheck className="w-3 h-3 text-amber-600" />
                Administración
              </span>
            )}
          </div>

          {/* Right Action Icons: Eye, Mail, Language, Avatar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Eye Icon for hiding/revealing balance */}
            <button
              onClick={toggleShowBalance}
              className="p-1.5 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
              title={showBalance ? 'Ocultar saldos' : 'Mostrar saldos'}
              aria-label="Toggle balance visibility"
            >
              {showBalance ? (
                <Eye className="w-5 h-5 text-slate-700" />
              ) : (
                <EyeOff className="w-5 h-5 text-slate-400" />
              )}
            </button>

            {/* Mail Envelope Icon with Unread Badge */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotifModalOpen(true);
                  if (currentUser) {
                    markNotificationsAsReadForUser(currentUser.id);
                  }
                }}
                className="p-1.5 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Mensajes y Notificaciones"
                title="Buzón de notificaciones"
              >
                <Mail className="w-5 h-5 text-slate-700" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#007eae] text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            {/* Language Selector Dropdown (ES, EN, DE, IT, FR) */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100/90 hover:bg-slate-200/80 border border-slate-300 text-xs font-semibold text-slate-800 transition-colors"
                aria-label="Cambiar idioma"
              >
                <span>{currentLangObj.flag}</span>
                <span>{currentLangObj.label}</span>
                <ChevronDown className="w-3 h-3 text-slate-600" />
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in"
                  onMouseLeave={() => setLangDropdownOpen(false)}
                >
                  <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Idioma / Language
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                        language === lang.code
                          ? 'bg-sky-50 text-[#007eae] font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-sm">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                      {language === lang.code && <span className="text-xs text-[#007eae]">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile Avatar / Logout Dropdown */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                    setLangDropdownOpen(false);
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-xs hover:opacity-90 transition-opacity overflow-hidden ${
                    currentUser.role === 'admin'
                      ? 'bg-amber-600 text-white'
                      : 'bg-[#002f6c] text-white'
                  }`}
                  aria-label="Perfil de usuario"
                >
                  {currentUser.avatarUrl ? (
                    <img 
                      src={currentUser.avatarUrl} 
                      alt={currentUser.firstName} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    currentUser.firstName[0]?.toUpperCase() || 'A'
                  )}
                </button>

                {dropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in text-slate-900"
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    {/* User Identity Header */}
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 mb-2">
                      <div className="text-xs font-bold text-slate-900">
                        {currentUser.firstName} {currentUser.lastName}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {currentUser.email}
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 text-[11px]">
                        <span className="text-slate-500 font-mono">
                          {currentUser.clientCode}
                        </span>
                        <button
                          onClick={handleCopyClientCode}
                          className="text-[#007eae] hover:underline font-bold flex items-center gap-1"
                        >
                          {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          {copiedCode ? t.copied : t.copy}
                        </button>
                      </div>
                    </div>

                    {/* Security status */}
                    <div className="px-3 py-1.5 text-[11px] text-slate-600 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-emerald-600" />
                        CaixaBank Protect®
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                        {t.activeBadge}
                      </span>
                    </div>

                    {/* Logout Button (Direct & clean) */}
                    <div className="pt-2 mt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-bold transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        {t.logout}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {/* Notifications Modal */}
      {notifModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-slate-900 shadow-2xl animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#007eae]" />
                <h3 className="text-sm font-black text-slate-900">
                  Buzón de Notificaciones CaixaBank
                </h3>
              </div>
              <button
                onClick={() => setNotifModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {userMessages.length > 0 ? (
                userMessages.map((msg) => (
                  <div key={msg.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">{msg.subject}</span>
                      <span className="text-[10px] text-slate-400">{msg.date}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{msg.content}</p>
                    {msg.adminReply && (
                      <div className="mt-2 p-2 rounded-lg bg-sky-50 border border-sky-100 text-sky-900">
                        <div className="font-bold text-[11px] mb-0.5">Respuesta oficial CaixaBank:</div>
                        <div>{msg.adminReply}</div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="py-8 px-4 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                    <Mail className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    Buzón sin notificaciones
                  </div>
                  <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                    No tiene avisos ni notificaciones pendientes. Las comunicaciones y resoluciones oficiales de su gestor se mostrarán aquí.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setNotifModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#007eae] text-white text-xs font-bold"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
