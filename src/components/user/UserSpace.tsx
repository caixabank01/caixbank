import React, { useState, useRef } from 'react';
import { useBank } from '../../context/BankContext';
import { calculateLoanAmortization } from '../../utils/loanCalculator';
import { Language } from '../../i18n/translations';
import {
  Home,
  ArrowLeftRight,
  TrendingUp,
  CreditCard,
  User as UserIcon,
  Copy,
  Check,
  Percent,
  Receipt,
  Sparkles,
  Lock,
  Unlock,
  Send,
  Building,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Plus,
  Landmark,
  Upload,
  FileText,
  Clock,
  XCircle,
  Eye,
  EyeOff,
  Briefcase,
  Layers,
  ArrowRight,
  Calculator,
  Globe,
  Table,
  Coins,
  Flame,
  ArrowUpRight,
  CheckCheck,
  RefreshCw,
} from 'lucide-react';

const APP_LANGUAGES: { code: Language; label: string; flag: string; name: string }[] = [
  { code: 'es', label: 'ES', flag: '🇪🇸', name: 'Español' },
  { code: 'en', label: 'EN', flag: '🇬🇧', name: 'English' },
  { code: 'de', label: 'DE', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'it', label: 'IT', flag: '🇮🇹', name: 'Italiano' },
  { code: 'fr', label: 'FR', flag: '🇫🇷', name: 'Français' },
];

export interface CryptoAsset {
  symbol: string;
  name: string;
  logo: string;
  currentPrice: number;
  change24h: number;
  marketCap: string;
  color: string;
  badge: string;
}

export const CRYPTO_LIST: CryptoAsset[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/btc.png',
    currentPrice: 87450.0,
    change24h: 3.42,
    marketCap: '1.72T €',
    color: '#f7931a',
    badge: 'N° 1 Global',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png',
    currentPrice: 3120.5,
    change24h: 4.85,
    marketCap: '375B €',
    color: '#627eea',
    badge: 'Smart Contracts',
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/sol.png',
    currentPrice: 184.2,
    change24h: 6.18,
    marketCap: '85B €',
    color: '#14f195',
    badge: 'High Speed',
  },
  {
    symbol: 'BNB',
    name: 'BNB Chain',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/bnb.png',
    currentPrice: 595.8,
    change24h: 1.95,
    marketCap: '88B €',
    color: '#f3ba2f',
    badge: 'Ecosystem',
  },
  {
    symbol: 'XRP',
    name: 'XRP Ripple',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/xrp.png',
    currentPrice: 2.15,
    change24h: 8.74,
    marketCap: '122B €',
    color: '#23292f',
    badge: 'Banking Cross-Border',
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/ada.png',
    currentPrice: 0.88,
    change24h: 2.65,
    marketCap: '31B €',
    color: '#0033ad',
    badge: 'PoS Research',
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/avax.png',
    currentPrice: 34.6,
    change24h: 5.12,
    marketCap: '14B €',
    color: '#e84142',
    badge: 'Subnets',
  },
  {
    symbol: 'DOT',
    name: 'Polkadot',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/dot.png',
    currentPrice: 7.95,
    change24h: 3.08,
    marketCap: '11B €',
    color: '#e6007a',
    badge: 'Interoperability',
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/link.png',
    currentPrice: 16.4,
    change24h: 4.35,
    marketCap: '9.8B €',
    color: '#375bd2',
    badge: 'Oracles',
  },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    logo: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/doge.png',
    currentPrice: 0.22,
    change24h: 7.42,
    marketCap: '32B €',
    color: '#c2a633',
    badge: 'Community',
  },
];

export const UserSpace: React.FC = () => {
  const {
    currentUser,
    makeTransfer,
    contractInvestment30D,
    submitPrivateCard,
    submitLoanRequest,
    toggleCardLock,
    toggleContactless,
    updateCardLimit,
    loanRequests,
    transactions,
    t,
    showBalance,
    language,
    setLanguage
  } = useBank();

  // Navigation tabs: home, bonifici, prets, crypto, carte, profilo
  const [activeTab, setActiveTab] = useState<'home' | 'bonifici' | 'prets' | 'crypto' | 'carte' | 'profilo'>('home');

  // Copy helpers
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedIban, setCopiedIban] = useState(false);

  // Link Private Card Modal
  const [showLinkCardModal, setShowLinkCardModal] = useState(false);
  const [linkCardNumber, setLinkCardNumber] = useState('');
  const [linkCardExpiry, setLinkCardExpiry] = useState('');
  const [linkCardCvv, setLinkCardCvv] = useState('');
  const [linkCardHolder, setLinkCardHolder] = useState('');
  const [linkCardBalance, setLinkCardBalance] = useState('');
  const [linkCardMsg, setLinkCardMsg] = useState<{ success: boolean; text: string } | null>(null);

  // Transfer form state (Tab Bonifici) - completely empty
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [beneficiaryIban, setBeneficiaryIban] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferStatus, setTransferStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // 30D Investment & Cryptos state (USER REQUIREMENT: BTC, ETH, SOL, etc. with real logos and 30% yield every 30 days)
  const [selectedCryptoSymbol, setSelectedCryptoSymbol] = useState<string>('BTC');
  const [investAmount, setInvestAmount] = useState<string>('');
  const [investSuccess, setInvestSuccess] = useState<string | null>(null);
  const [investError, setInvestError] = useState<string | null>(null);

  // Card view reveal states
  const [showFullCardNum, setShowFullCardNum] = useState(false);
  const [showCardCvv, setShowCardCvv] = useState(false);
  const [showCardPin, setShowCardPin] = useState(false);

  // Cuenta Gastos accordion
  const [cuentaGastosOpen, setCuentaGastosOpen] = useState(true);

  // ================= LOAN REQUEST FORM STATE (ALL CLEAN & EMPTY - NO PRE-WRITTEN VALUES) =================
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [loanDuration, setLoanDuration] = useState<string>('');
  const [loanProfession, setLoanProfession] = useState<string>('');
  const [loanEmployer, setLoanEmployer] = useState<string>('');
  const [loanPurpose, setLoanPurpose] = useState<string>('');
  const [loanMonthlyIncome, setLoanMonthlyIncome] = useState<string>('');
  const [loanIdPhotoUrl, setLoanIdPhotoUrl] = useState<string>('');
  const [loanIdFileName, setLoanIdFileName] = useState<string>('');
  const [loanPhotoPreview, setLoanPhotoPreview] = useState<string | null>(null);
  const [loanSubmitSuccessBanner, setLoanSubmitSuccessBanner] = useState<string | null>(null);
  const [loanFormError, setLoanFormError] = useState<string | null>(null);
  const [showAllAmortizationRows, setShowAllAmortizationRows] = useState(false);
  const [expandedAmortizationLoanId, setExpandedAmortizationLoanId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!currentUser) return null;

  // Filter loans for this user
  const myLoans = loanRequests.filter((l) => l.userId === currentUser.id);

  // User's transactions (starts with 0 operations as requested)
  const userTransactions = transactions.filter((tx) => tx.userId === currentUser.id);

  // USER REQUEST: Exact 2% bank borrowing fee / interest rate
  const amountNum = parseFloat(loanAmount);
  const durationNum = parseInt(loanDuration, 10);
  const hasValidLoanParams = !isNaN(amountNum) && amountNum > 0 && !isNaN(durationNum) && durationNum > 0;
  
  // Actuarial calculation at exact 2.0%
  const loanCalculation = hasValidLoanParams
    ? calculateLoanAmortization(amountNum, durationNum, 2.0)
    : null;
  const calculatedMonthlyPayment = loanCalculation ? loanCalculation.monthlyPayment : 0;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentUser.clientCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyIban = () => {
    navigator.clipboard.writeText(currentUser.iban);
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2000);
  };

  const handleSubmitLinkCard = (e: React.FormEvent) => {
    e.preventDefault();
    setLinkCardMsg(null);
    const balanceNum = parseFloat(linkCardBalance);
    if (isNaN(balanceNum) || balanceNum < 218) {
      setLinkCardMsg({
        success: false,
        text: 'El saldo declarado debe ser de al menos 218,00 €.',
      });
      return;
    }
    const res = submitPrivateCard({
      cardNumber: linkCardNumber,
      expiryDate: linkCardExpiry,
      cvv: linkCardCvv,
      cardHolder: linkCardHolder,
      balanceDeclared: balanceNum,
    });
    setLinkCardMsg({ success: res.success, text: res.message });
    if (res.success) {
      setTimeout(() => {
        setShowLinkCardModal(false);
        setLinkCardMsg(null);
      }, 1800);
    }
  };

  const handleSendTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setTransferStatus(null);
    const amt = parseFloat(transferAmount);

    if (currentUser.isTransfersBlocked) {
      setTransferStatus({
        type: 'error',
        message: t.transferBlockedDesc,
      });
      return;
    }

    if (isNaN(amt) || amt <= 0) {
      setTransferStatus({
        type: 'error',
        message: 'Por favor, introduzca un importe válido.',
      });
      return;
    }

    const res = makeTransfer({
      recipientName: beneficiaryName,
      recipientIban: beneficiaryIban,
      amount: amt,
      label: `Transferencia SEPA a ${beneficiaryName}`,
      accountSource: 'courant',
    });

    if (res.success) {
      setTransferStatus({ type: 'success', message: res.message });
      setBeneficiaryName('');
      setBeneficiaryIban('');
      setTransferAmount('');
    } else {
      setTransferStatus({ type: 'error', message: res.message });
    }
  };

  const handleSubscribe30D = (e: React.FormEvent) => {
    e.preventDefault();
    setInvestSuccess(null);
    setInvestError(null);
    const amt = parseFloat(investAmount);
    if (isNaN(amt) || amt <= 0) {
      setInvestError(
        language === 'es'
          ? 'Por favor, introduzca un importe válido a invertir.'
          : language === 'fr'
          ? 'Veuillez saisir un montant valide à investir.'
          : 'Please enter a valid amount to invest.'
      );
      return;
    }

    if (currentUser.balance < amt) {
      setInvestError(
        language === 'es'
          ? `Saldo insuficiente en Cuenta Gastos (${currentUser.balance.toLocaleString('es-ES', { minimumFractionDigits: 2 })} € disponible).`
          : language === 'fr'
          ? `Solde insuffisant (${currentUser.balance.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} € disponible).`
          : `Insufficient balance (${currentUser.balance.toLocaleString()} € available).`
      );
      return;
    }

    const cryptoObj = CRYPTO_LIST.find((c) => c.symbol === selectedCryptoSymbol) || CRYPTO_LIST[0];
    const cryptoQuantity = amt / cryptoObj.currentPrice;

    const res = contractInvestment30D({
      amount: amt,
      cryptoSymbol: cryptoObj.symbol,
      cryptoName: cryptoObj.name,
      cryptoLogo: cryptoObj.logo,
      cryptoAmount: cryptoQuantity,
    });

    if (res.success) {
      setInvestSuccess(res.message);
      setInvestAmount('');
      setTimeout(() => setInvestSuccess(null), 6000);
    } else {
      setInvestError(res.message);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoanIdFileName(file.name);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setLoanIdPhotoUrl(result);
        setLoanPhotoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // SUBMIT LOAN REQUEST MANUALLY & IMMEDIATELY REMOVE USER FROM FORM PAGE
  const handleSubmitLoan = (e: React.FormEvent) => {
    e.preventDefault();
    setLoanFormError(null);

    const amt = parseFloat(loanAmount);
    const dur = parseInt(loanDuration, 10);
    const inc = parseFloat(loanMonthlyIncome);

    if (isNaN(amt) || amt <= 0) {
      setLoanFormError('Escriba un importe de préstamo válido.');
      return;
    }

    if (isNaN(dur) || dur <= 0) {
      setLoanFormError('Escriba el número de meses para el reembolso (ej. 12, 24, 36, 48...).');
      return;
    }

    if (!loanProfession.trim()) {
      setLoanFormError('Por favor, escriba manualmente su trabajo o profesión actual.');
      return;
    }

    if (!loanPurpose.trim()) {
      setLoanFormError('Por favor, escriba manualmente el motivo de su solicitud.');
      return;
    }

    if (isNaN(inc) || inc <= 0) {
      setLoanFormError('Escriba sus ingresos mensuales netos.');
      return;
    }

    if (!loanIdPhotoUrl) {
      setLoanFormError('Es obligatorio importar la fotografía de su documento de identidad (DNI/NIE/Pasaporte).');
      return;
    }

    const result = submitLoanRequest({
      amount: amt,
      durationMonths: dur,
      monthlyPayment: calculatedMonthlyPayment,
      purpose: loanPurpose.trim(),
      profession: loanProfession.trim(),
      employer: loanEmployer.trim() || undefined,
      monthlyIncome: inc,
      idCardPhotoUrl: loanIdPhotoUrl,
      idCardFileName: loanIdFileName,
    });

    if (result.success) {
      // USER REQUEST: "après avoir rempli le prêt enlever le client directement de la page après avoir envoyé la demande"
      setActiveTab('home');
      setLoanSubmitSuccessBanner(
        language === 'es'
          ? `✓ Solicitud de préstamo por ${amt.toLocaleString('es-ES')} € tramitada con éxito. Su expediente está en espera de la autorización por la dirección de CaixaBank antes de ingresar los fondos.`
          : language === 'fr'
          ? `✓ Demande de prêt de ${amt.toLocaleString('fr-FR')} € transmise avec succès. Votre dossier est en attente de l'autorisation par la direction CaixaBank avant versement des fonds.`
          : `✓ Loan application of €${amt.toLocaleString()} submitted successfully. Awaiting executive authorization from CaixaBank management before funds are credited.`
      );
      // Clear form inputs
      setLoanAmount('');
      setLoanDuration('');
      setLoanProfession('');
      setLoanEmployer('');
      setLoanPurpose('');
      setLoanMonthlyIncome('');
      setLoanIdPhotoUrl('');
      setLoanPhotoPreview(null);
      setLoanIdFileName('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setLoanFormError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f5f8] text-slate-900 pb-28 pt-2">
      <div className="max-w-md md:max-w-4xl mx-auto px-4 space-y-4">

        {/* Global Multi-Language Quick Selector Bar (USER REQUEST: "je veux la chose qui traduit langue dans le compte utilisateur ça traduire chaque pages automatiquement selon la langue Sélectionner") */}
        <div className="bg-white rounded-2xl p-2.5 shadow-2xs border border-slate-200/90 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 shrink-0 pl-1">
            <Globe className="w-4 h-4 text-[#007eae]" />
            <span className="hidden sm:inline">Idioma / Language:</span>
          </div>
          <div className="flex items-center gap-1.5">
            {APP_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                  language === lang.code
                    ? 'bg-[#007eae] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                title={`Cambiar idioma a ${lang.name}`}
              >
                <span>{lang.flag}</span>
                <span className="text-[11px] font-mono">{lang.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Global Success Banner when Loan Submitted and redirected away */}
        {loanSubmitSuccessBanner && (
          <div className="p-4 rounded-3xl bg-emerald-50 border border-emerald-300 shadow-sm flex items-start justify-between gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wide">
                  {language === 'es' ? 'SOLICITUD EN PROCESO DE AUTORIZACIÓN' : 'DEMANDE EN COURS D\'AUTORISATION'}
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
                  {loanSubmitSuccessBanner}
                </p>
              </div>
            </div>
            <button
              onClick={() => setLoanSubmitSuccessBanner(null)}
              className="text-emerald-700 hover:text-emerald-950 font-bold text-xs"
            >
              ✕
            </button>
          </div>
        )}

        {/* ================= TAB 1: HOME / INICIO ================= */}
        {activeTab === 'home' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Top User Greeting & Client Code Card */}
            <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#002f6c] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {currentUser.firstName[0]}
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">
                    Bienvenido a CaixaBank
                  </div>
                  <div className="text-base font-black text-slate-900">
                    {currentUser.firstName} {currentUser.lastName}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-mono text-slate-500 font-semibold">
                      {currentUser.clientCode}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="text-[#007eae] hover:underline text-[11px] font-bold flex items-center gap-1"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      {copiedCode ? t.copied : t.copy}
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {t.activeBadge}
                </span>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">
                  CaixaBank #2100
                </div>
              </div>
            </div>

            {/* Quick Loan CTA Banner */}
            <div className="rounded-3xl p-5 bg-gradient-to-r from-[#002f6c] to-[#007eae] text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center shrink-0">
                  <Landmark className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-amber-300 font-black">
                    Financiación Directa CaixaBank (Tipo Fijo 2%)
                  </div>
                  <div className="text-sm font-bold mt-0.5">
                    ¿Desea solicitar un préstamo con cuota y amortización automática al 2%?
                  </div>
                  <div className="text-xs text-sky-100 opacity-90 mt-0.5">
                    Rellene su solicitud manualmente para análisis y abono por la dirección.
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('prets')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-[#002f6c] font-black text-xs transition-colors shadow-xs shrink-0 cursor-pointer"
              >
                {t.loanQuickApply} →
              </button>
            </div>

            {/* Banner: Outgoing Transfers Locked Alert */}
            {currentUser.isTransfersBlocked && (
              <div className="rounded-3xl p-4.5 bg-amber-500/10 border border-amber-500/30 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-black tracking-wide text-amber-900">
                      {t.bannerLinkCardTitle}
                    </h3>
                    <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                      {t.bannerLinkCardDesc}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowLinkCardModal(true)}
                  className="w-full sm:w-auto px-4 py-2 rounded-2xl bg-[#007eae] hover:bg-[#006a94] text-white text-xs font-bold transition-all shadow-xs shrink-0"
                >
                  {t.bannerLinkCardBtn}
                </button>
              </div>
            )}

            {/* Quick Action Circle Buttons */}
            <div className="grid grid-cols-4 gap-2 text-center py-1">
              <button
                onClick={() => alert("Bizum CaixaBank: Transferencias instantáneas de móvil a móvil.")}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-[#007eae] shadow-xs transition-all">
                  <ArrowLeftRight className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 mt-1.5">{t.quickBizum}</span>
              </button>

              <button
                onClick={() => setActiveTab('bonifici')}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-[#007eae] shadow-xs transition-all">
                  <Send className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 mt-1.5">{t.quickTransfer}</span>
              </button>

              <button
                onClick={() => setActiveTab('prets')}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-[#007eae] shadow-xs transition-all relative">
                  <Landmark className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full"></span>
                </div>
                <span className="text-[11px] font-bold text-slate-700 mt-1.5">{t.navLoans}</span>
              </button>

              <button
                onClick={() => setActiveTab('crypto')}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-[#007eae] shadow-xs transition-all">
                  <Percent className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 mt-1.5">{t.quickInvest}</span>
              </button>
            </div>

            {/* Cuentas Section Header */}
            <div className="flex items-center justify-between pt-1">
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                {t.cuentasTitle}
              </h2>
              <span className="text-xs font-bold text-slate-400">
                Coordenadas Oficiales
              </span>
            </div>

            {/* Account Card: Cuenta Gastos */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div
                onClick={() => setCuentaGastosOpen(!cuentaGastosOpen)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/60 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      {t.cuentaGastos}
                    </span>
                    <span className="text-[10px] bg-sky-50 text-[#007eae] font-bold px-2 py-0.5 rounded-full border border-sky-100">
                      Principal
                    </span>
                  </div>

                  <div className="text-2xl sm:text-3xl font-black text-slate-950 font-mono tracking-tight">
                    {showBalance ? (
                      <>
                        {currentUser.balance.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        <span className="text-xl ml-1 font-sans">€</span>
                      </>
                    ) : (
                      '•••••••• €'
                    )}
                  </div>

                  <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5 pt-0.5">
                    <span>{currentUser.iban}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyIban();
                      }}
                      className="text-[#007eae] hover:underline font-bold"
                    >
                      {copiedIban ? '✓' : <Copy className="w-3 h-3 inline" />}
                    </button>
                  </div>
                </div>

                <div className="text-slate-400">
                  {cuentaGastosOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Transactions inside Cuenta Gastos */}
              {cuentaGastosOpen && (
                <div className="border-t border-slate-100 bg-slate-50/50 p-5 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>Movimientos & Operaciones</span>
                    <span>{userTransactions.length} registros</span>
                  </div>

                  {userTransactions.length === 0 ? (
                    <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                        <Receipt className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-bold text-slate-700">
                        0 operaciones registradas
                      </div>
                      <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                        Sus transferencias, créditos autorizados y movimientos contables se almacenarán aquí en tiempo real de forma ilimitada.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {userTransactions.map((tx) => (
                        <div
                          key={tx.id}
                          className="p-3.5 bg-white rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs shadow-2xs"
                        >
                          <div>
                            <div className="font-bold text-slate-900">{tx.label}</div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                              {tx.date} · Ref: {tx.reference} · {tx.counterparty}
                            </div>
                          </div>
                          <div
                            className={`font-mono font-black text-sm ${
                              tx.amount >= 0 ? 'text-emerald-600' : 'text-slate-950'
                            }`}
                          >
                            {tx.amount >= 0 ? '+' : ''}
                            {tx.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Savings Account Card */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Cuenta Remunerada & Ahorro
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-950 font-mono tracking-tight mt-1">
                  {showBalance ? (
                    <>
                      {currentUser.savingsBalance.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                    </>
                  ) : (
                    '•••••••• €'
                  )}
                </div>
                <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                  TIN 2,50% anual TAE con liquidación mensual
                </div>
              </div>
              <button
                onClick={() => setActiveTab('bonifici')}
                className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                Traspasar
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 2: BONIFICI / TRANSFERENCIAS ================= */}
        {activeTab === 'bonifici' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {currentUser.isTransfersBlocked ? (
              <div className="bg-white rounded-3xl p-7 border border-amber-300 shadow-sm space-y-4 text-center">
                <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center">
                  <Lock className="w-7 h-7 text-amber-600" />
                </div>

                <div>
                  <div className="inline-block px-3 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wider mb-1">
                    {t.caixabankSecurityBadge}
                  </div>
                  <h2 className="text-lg font-black text-slate-950">
                    {t.transferBlockedTitle}
                  </h2>
                </div>

                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  {t.transferBlockedDesc}
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#007eae]" />
                    {t.minBalanceMandatory}
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {t.transferBlockedNote}
                  </p>
                </div>

                <button
                  onClick={() => setShowLinkCardModal(true)}
                  className="w-full max-w-md mx-auto py-3.5 px-4 rounded-2xl bg-[#007eae] hover:bg-[#006a94] text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  {t.linkPrivateCardBtn}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Send className="w-5 h-5 text-[#007eae]" />
                  <h2 className="text-base font-extrabold text-slate-900">
                    {t.newSepaTransferTitle}
                  </h2>
                </div>

                {transferStatus && (
                  <div
                    className={`p-3.5 rounded-2xl text-xs flex items-center gap-2 ${
                      transferStatus.type === 'success'
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                        : 'bg-rose-50 border border-rose-200 text-rose-800'
                    }`}
                  >
                    {transferStatus.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span>{transferStatus.message}</span>
                  </div>
                )}

                <form onSubmit={handleSendTransfer} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      {t.recipientNameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={beneficiaryName}
                      onChange={(e) => setBeneficiaryName(e.target.value)}
                      placeholder="Escriba el nombre y apellidos..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-[#007eae] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      {t.recipientIbanLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={beneficiaryIban}
                      onChange={(e) => setBeneficiaryIban(e.target.value)}
                      placeholder="ES91 2100..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-[#007eae] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      {t.transferAmountLabel}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 font-mono font-bold text-sm text-slate-900 focus:outline-none focus:border-[#007eae] focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#007eae] hover:bg-[#006a94] text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {t.sendTransferBtn}
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: PRÊTS D'ARGENT / PRÉSTAMOS (100% MANUAL FILLING + 2% AUTOMATIC AMORTIZATION TABLE) ================= */}
        {activeTab === 'prets' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Header info banner */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#007eae] flex items-center justify-center shrink-0 border border-sky-100">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black tracking-widest text-[#007eae] uppercase">
                    CaixaBank Financiación Personal · Tipo Fijo 2,00%
                  </span>
                  <h2 className="text-lg font-black text-slate-950 mt-0.5">
                    {t.loanTitle}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Rellene los campos manualmente. Al escribir el importe y los meses, el sistema calculará en directo la cuota y generará el cuadro de amortización completo al 2% abajo.
                  </p>
                </div>
              </div>
            </div>

            {/* Error banner */}
            {loanFormError && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{loanFormError}</span>
              </div>
            )}

            {/* THE LOAN FORM - 100% MANUAL, EMPTY COLUMNS, NO PRE-SET CHECKBOXES, ULTRA CLEAN */}
            <form onSubmit={handleSubmitLoan} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-5 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#007eae]" />
                  {t.loanManualFileTitle}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {t.loanManualFileSubtitle}
                </p>
              </div>

              {/* Field 1: Montant demandé (€) - MANUAL */}
              <div>
                <label className="block font-black text-slate-900 mb-1.5">
                  {t.loanAmountFieldLabel}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="100"
                    step="100"
                    required
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder={t.loanAmountFieldPlaceholder}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-base font-mono font-bold text-slate-950 focus:outline-none focus:border-[#007eae] focus:bg-white transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                    EUR (€)
                  </span>
                </div>
              </div>

              {/* Field 2: Durée en mois - MANUAL */}
              <div>
                <label className="block font-black text-slate-900 mb-1.5">
                  {t.loanDurationFieldLabel}
                </label>
                <input
                  type="number"
                  min="1"
                  max="360"
                  required
                  value={loanDuration}
                  onChange={(e) => setLoanDuration(e.target.value)}
                  placeholder={t.loanDurationFieldPlaceholder}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 font-mono text-slate-950 focus:outline-none focus:border-[#007eae] focus:bg-white transition-all"
                />
              </div>

              {/* AUTOMATIC 2% LOAN CALCULATION KPI & AMORTIZATION TABLE DISPLAY */}
              {loanCalculation && loanCalculation.schedule.length > 0 && (
                <div className="space-y-4 pt-2 border-t border-slate-100 animate-in fade-in duration-300">
                  {/* Summary KPI Badges (Exact 2% Bank Fee) */}
                  <div className="p-5 rounded-3xl bg-gradient-to-br from-[#002f6c] to-[#007eae] text-white shadow-lg space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/20 pb-3">
                      <div className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-amber-300" />
                        <span className="font-bold text-sm tracking-wide">
                          {t.amortizationTitle}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[11px] font-black bg-amber-400 text-slate-950 shadow-xs">
                        {t.bankRate2PercentBadge}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                      <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-xs">
                        <div className="text-[10px] uppercase tracking-wider text-sky-200">
                          {t.monthlyPaymentLabel}
                        </div>
                        <div className="text-xl font-black font-mono text-white mt-0.5">
                          {loanCalculation.monthlyPayment.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                        </div>
                        <div className="text-[9px] text-sky-200 mt-0.5">/ {t.monthColHeader.toLowerCase()}</div>
                      </div>

                      <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-xs">
                        <div className="text-[10px] uppercase tracking-wider text-sky-200">
                          {t.principalAmortizedLabel}
                        </div>
                        <div className="text-xl font-black font-mono text-white mt-0.5">
                          {loanCalculation.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                        </div>
                        <div className="text-[9px] text-sky-200 mt-0.5">{loanCalculation.durationMonths} {t.monthColHeader.toLowerCase()}s</div>
                      </div>

                      <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-xs">
                        <div className="text-[10px] uppercase tracking-wider text-amber-300">
                          {t.totalInterestLabel}
                        </div>
                        <div className="text-xl font-black font-mono text-amber-300 mt-0.5">
                          {loanCalculation.totalInterest.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                        </div>
                        <div className="text-[9px] text-amber-200 mt-0.5">2,00% CaixaBank</div>
                      </div>

                      <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-xs">
                        <div className="text-[10px] uppercase tracking-wider text-sky-200">
                          {t.totalFinancedLabel}
                        </div>
                        <div className="text-xl font-black font-mono text-white mt-0.5">
                          {loanCalculation.totalPayment.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                        </div>
                        <div className="text-[9px] text-sky-200 mt-0.5">total + 2%</div>
                      </div>
                    </div>
                  </div>

                  {/* USER REQUEST: "et fait un tableau d'amortissement automatiquement et ça Va affiché en bas pour que le client comprenne" */}
                  <div className="p-5 rounded-3xl bg-slate-50 border border-slate-300/80 shadow-xs space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Table className="w-4 h-4 text-[#007eae]" />
                        <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider">
                          {t.amortizationTitle}
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                        {loanCalculation.durationMonths} {t.monthColHeader.toLowerCase()}s (2,00%)
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {t.amortizationSubtitle}
                    </p>

                    {/* The Amortization Table */}
                    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
                      <div className="overflow-x-auto max-h-96">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-100/90 text-slate-600 border-b border-slate-200 sticky top-0 uppercase tracking-wider text-[10px] font-black">
                            <tr>
                              <th className="py-2.5 px-3 text-center">{t.monthColHeader}</th>
                              <th className="py-2.5 px-3 text-right">{t.paymentColHeader}</th>
                              <th className="py-2.5 px-3 text-right text-sky-800">{t.principalColHeader}</th>
                              <th className="py-2.5 px-3 text-right text-amber-700">{t.interestColHeader}</th>
                              <th className="py-2.5 px-3 text-right">{t.remainingColHeader}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                            {(showAllAmortizationRows
                              ? loanCalculation.schedule
                              : loanCalculation.schedule.slice(0, Math.min(12, loanCalculation.schedule.length))
                            ).map((row) => (
                              <tr key={row.month} className="hover:bg-sky-50/50 transition-colors">
                                <td className="py-2 px-3 text-center font-bold text-slate-700">
                                  {row.month}
                                </td>
                                <td className="py-2 px-3 text-right font-bold text-slate-900">
                                  {row.payment.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                                </td>
                                <td className="py-2 px-3 text-right text-emerald-700 font-semibold">
                                  {row.principal.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                                </td>
                                <td className="py-2 px-3 text-right text-amber-800 font-semibold">
                                  {row.interest.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                                </td>
                                <td className="py-2 px-3 text-right text-slate-500">
                                  {row.remainingBalance.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Expansion Toggle button if more than 12 months */}
                    {loanCalculation.schedule.length > 12 && (
                      <div className="text-center pt-1">
                        <button
                          type="button"
                          onClick={() => setShowAllAmortizationRows(!showAllAmortizationRows)}
                          className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-xs font-bold text-[#007eae] transition-colors shadow-2xs cursor-pointer"
                        >
                          {showAllAmortizationRows
                            ? `▲ ${t.showFewerRows}`
                            : `▼ ${t.showAllRows} (${loanCalculation.schedule.length} ${t.monthColHeader.toLowerCase()}s)`}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Field 3: Travail / Profession dans la vie - 100% MANUAL TEXT */}
              <div>
                <label className="block font-black text-slate-900 mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-[#007eae]" />
                  <span>{t.loanProfessionFieldLabel}</span>
                </label>
                <input
                  type="text"
                  required
                  value={loanProfession}
                  onChange={(e) => setLoanProfession(e.target.value)}
                  placeholder={t.loanProfessionFieldPlaceholder}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 focus:outline-none focus:border-[#007eae] focus:bg-white transition-all font-medium"
                />
              </div>

              {/* Field 4: Entreprise / Employeur / Type de contrat - MANUAL */}
              <div>
                <label className="block font-black text-slate-900 mb-1.5 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-[#007eae]" />
                  <span>{t.loanEmployerFieldLabel}</span>
                </label>
                <input
                  type="text"
                  value={loanEmployer}
                  onChange={(e) => setLoanEmployer(e.target.value)}
                  placeholder={t.loanEmployerFieldPlaceholder}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 focus:outline-none focus:border-[#007eae] focus:bg-white transition-all font-medium"
                />
              </div>

              {/* Field 5: Revenus mensuels nets (€) - MANUAL */}
              <div>
                <label className="block font-black text-slate-900 mb-1.5">
                  {t.loanIncomeFieldLabel}
                </label>
                <input
                  type="number"
                  min="100"
                  step="50"
                  required
                  value={loanMonthlyIncome}
                  onChange={(e) => setLoanMonthlyIncome(e.target.value)}
                  placeholder={t.loanIncomeFieldPlaceholder}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 font-mono text-slate-950 focus:outline-none focus:border-[#007eae] focus:bg-white transition-all"
                />
              </div>

              {/* Field 6: Motif du prêt - 100% MANUAL TEXTAREA */}
              <div>
                <label className="block font-black text-slate-900 mb-1.5">
                  {t.loanPurposeFieldLabel}
                </label>
                <textarea
                  rows={3}
                  required
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  placeholder={t.loanPurposeFieldPlaceholder}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 focus:outline-none focus:border-[#007eae] focus:bg-white transition-all"
                />
              </div>

              {/* Field 7: Pièce d'identité (Upload / Photo de la carte d'identité) */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block font-black text-slate-900 mb-1">
                  {t.loanPhotoUploadTitle}
                </label>
                <p className="text-[11px] text-slate-500 mb-3">
                  {t.loanPhotoUploadSubtitle}
                </p>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />

                {!loanPhotoPreview ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-[#007eae] bg-slate-50 hover:bg-sky-50/40 rounded-3xl p-7 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-[#007eae]/10 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-[#007eae] transition-colors shadow-xs">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-slate-800 text-xs">
                      {t.loanPhotoUploadDropText}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      JPG, PNG, WEBP
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <span className="font-bold text-slate-800 text-xs truncate max-w-xs">
                          {loanIdFileName || 'Documento_Identidad.jpg'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setLoanIdPhotoUrl('');
                          setLoanPhotoPreview(null);
                          setLoanIdFileName('');
                        }}
                        className="text-rose-600 hover:text-rose-800 font-bold text-xs cursor-pointer"
                      >
                        {t.loanPhotoUploadChangeBtn}
                      </button>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 max-h-52 bg-black/10 flex items-center justify-center">
                      <img
                        src={loanPhotoPreview}
                        alt="Vista previa documento de identidad"
                        className="w-full max-h-52 object-contain bg-slate-900"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submission button with security note */}
              <div className="pt-2">
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] mb-4 leading-relaxed flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    {t.loanAdminNoticeText}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-[#007eae] hover:bg-[#006a94] text-white font-black text-sm transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.loanSubmitDirectionBtn}</span>
                </button>
              </div>
            </form>

            {/* Loan History for this client */}
            {myLoans.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-3">
                <h3 className="text-xs font-black tracking-wider text-slate-800 uppercase flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#007eae]" />
                  {t.loanHistoryTitle}
                </h3>

                <div className="space-y-3">
                  {myLoans.map((loan) => (
                    <div
                      key={loan.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 text-xs space-y-2.5"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <span className="font-black text-slate-950 text-base font-mono">
                            {loan.amount.toLocaleString('es-ES')} €
                          </span>
                          <span className="text-[11px] text-slate-500 ml-2">
                            ({loan.durationMonths} meses · {loan.monthlyPayment} €/mes · Tipo 2%)
                          </span>
                        </div>

                        <div>
                          {loan.status === 'pending' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                              <Clock className="w-3 h-3 text-amber-600" />
                              {t.loanPendingStatus}
                            </span>
                          )}
                          {loan.status === 'approved' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              {t.loanApprovedStatus}
                            </span>
                          )}
                          {loan.status === 'rejected' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                              <XCircle className="w-3 h-3 text-rose-600" />
                              {t.loanRejectedStatus}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-700">
                        <strong>Profesión declarada:</strong> {loan.profession}
                      </div>

                      <div className="text-[11px] text-slate-600">
                        <strong>Motivo:</strong> {loan.purpose}
                      </div>

                      {/* Detalle de Cuota Mensual y Botón de Amortización */}
                      <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between flex-wrap gap-2">
                        <div className="text-xs">
                          <span className="text-slate-500 font-medium">Cuota Mensual: </span>
                          <strong className="font-mono text-slate-900 font-black">
                            {loan.monthlyPayment.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} € / mes
                          </strong>
                          <span className="text-[10px] text-amber-700 font-bold ml-1.5">(Tipo Fijo 2,00%)</span>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setExpandedAmortizationLoanId(
                              expandedAmortizationLoanId === loan.id ? null : loan.id
                            )
                          }
                          className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-[11px] font-bold text-[#007eae] flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Table className="w-3.5 h-3.5" />
                          <span>
                            {expandedAmortizationLoanId === loan.id
                              ? 'Ocultar Cuadro de Cuotas'
                              : 'Ver Cuadro de Amortización y Cuotas (2%)'}
                          </span>
                        </button>
                      </div>

                      {/* Cuadro de Amortización Desplegable para este Préstamo */}
                      {expandedAmortizationLoanId === loan.id && (() => {
                        const sched = calculateLoanAmortization(loan.amount, loan.durationMonths, 2.0);
                        return (
                          <div className="mt-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3 animate-in fade-in duration-200">
                            <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2 flex-wrap gap-1">
                              <span className="font-black text-slate-900">
                                Cuadro de Amortización Oficial (Cuota Mensual: {sched.monthlyPayment.toFixed(2)} €)
                              </span>
                              <span className="text-[10px] text-amber-700 font-bold">
                                Total Intereses (2%): {sched.totalInterest.toFixed(2)} € · Total: {sched.totalPayment.toFixed(2)} €
                              </span>
                            </div>

                            <div className="overflow-x-auto max-h-60 rounded-xl border border-slate-100">
                              <table className="w-full text-left text-[11px] font-mono">
                                <thead className="bg-slate-50 text-slate-600 text-[10px] uppercase font-bold sticky top-0">
                                  <tr>
                                    <th className="py-2 px-2.5 text-center">Mes</th>
                                    <th className="py-2 px-2.5 text-right">Cuota (€)</th>
                                    <th className="py-2 px-2.5 text-right text-sky-800">Capital (€)</th>
                                    <th className="py-2 px-2.5 text-right text-amber-700">Interés 2% (€)</th>
                                    <th className="py-2 px-2.5 text-right">Saldo Restante (€)</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                  {sched.schedule.map((row) => (
                                    <tr key={row.month} className="hover:bg-slate-50">
                                      <td className="py-1.5 px-2.5 text-center font-bold text-slate-700">{row.month}</td>
                                      <td className="py-1.5 px-2.5 text-right font-bold text-slate-900">{row.payment.toFixed(2)} €</td>
                                      <td className="py-1.5 px-2.5 text-right text-emerald-700">{row.principal.toFixed(2)} €</td>
                                      <td className="py-1.5 px-2.5 text-right text-amber-800">{row.interest.toFixed(2)} €</td>
                                      <td className="py-1.5 px-2.5 text-right text-slate-500">{row.remainingBalance.toFixed(2)} €</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        );
                      })()}

                      {loan.status === 'rejected' && loan.decisionReason && (
                        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-[11px]">
                          <strong>Motivo de denegación:</strong> {loan.decisionReason}
                        </div>
                      )}

                      {loan.status === 'approved' && (
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-[11px] font-medium">
                          ✓ Fondos abonados e ingresados en su cuenta corriente el {loan.decidedAt || 'hoy'}.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: CRYPTO & INVERSIONES 30% CADA 30 DÍAS ================= */}
        {activeTab === 'crypto' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#002f6c] via-[#004e8c] to-[#007eae] rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                      Rendimiento Garantizado
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white">
                      Ciclos de 30 Días
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black mt-2 tracking-tight">
                    CaixaBank Inversión Criptomonedas (+30% / 30 Días)
                  </h2>
                  <p className="text-xs text-sky-100 mt-1 max-w-xl leading-relaxed">
                    Acceso regulado a los principales criptoactivos del mercado. Reciba un <strong>30 % de rendimiento mensual cada 30 días</strong> sobre el capital invertido en Bitcoin, Ethereum y principales activos blockchain.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shrink-0 text-center sm:text-right">
                  <div className="text-[10px] uppercase font-bold text-sky-200">Rendimiento Mensual</div>
                  <div className="text-3xl font-black text-amber-300 font-mono">+30,00 %</div>
                  <div className="text-[11px] text-white/90 font-medium">Cada 30 días naturales</div>
                </div>
              </div>
            </div>

            {/* Cryptocurrencies Market Grid with REAL LOGOS */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <div>
                  <h3 className="text-sm font-black text-slate-950 flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#007eae]" />
                    Catálogo de Criptomonedas Oficiales
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Seleccione una criptomoneda para activar su contrato al +30% cada 30 días
                  </p>
                </div>
                <span className="text-[11px] font-bold text-slate-400">
                  {CRYPTO_LIST.length} activos disponibles
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {CRYPTO_LIST.map((crypto) => {
                  const isSelected = selectedCryptoSymbol === crypto.symbol;
                  return (
                    <div
                      key={crypto.symbol}
                      onClick={() => {
                        setSelectedCryptoSymbol(crypto.symbol);
                        setInvestSuccess(null);
                        setInvestError(null);
                      }}
                      className={`p-4 rounded-3xl bg-white border transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-[#007eae] shadow-md ring-2 ring-[#007eae]/20 bg-sky-50/20'
                          : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={crypto.logo}
                            alt={crypto.name}
                            className="w-10 h-10 rounded-full object-contain shrink-0 shadow-xs bg-white p-0.5 border border-slate-100"
                            onError={(e) => {
                              // fallback
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-black text-slate-950 text-sm">{crypto.name}</span>
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                                {crypto.symbol}
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-400 font-medium">
                              {crypto.badge}
                            </div>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-0.5">
                          <ArrowUpRight className="w-3 h-3" />
                          +{crypto.change24h}%
                        </span>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-medium">Cotización EUR</span>
                          <span className="font-mono font-black text-slate-900">
                            {crypto.currentPrice >= 1
                              ? `${crypto.currentPrice.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`
                              : `${crypto.currentPrice.toFixed(4)} €`}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-amber-700 font-bold block">Rendimiento 30D</span>
                          <span className="font-mono font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">
                            +30 % / mes
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#007eae] animate-ping" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contract & Investment Subscription Card */}
            {(() => {
              const activeCrypto = CRYPTO_LIST.find((c) => c.symbol === selectedCryptoSymbol) || CRYPTO_LIST[0];
              const amtNum = parseFloat(investAmount) || 0;
              const profitNum = amtNum * 0.3; // 30% yield
              const totalReturnNum = amtNum * 1.3;
              const approxCryptoUnits = amtNum > 0 ? amtNum / activeCrypto.currentPrice : 0;

              return (
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={activeCrypto.logo}
                        alt={activeCrypto.name}
                        className="w-12 h-12 rounded-2xl object-contain shadow-xs bg-white p-1 border border-slate-100 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-black text-slate-950">
                            Invertir en {activeCrypto.name} ({activeCrypto.symbol})
                          </h3>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                            30% Cada 30 Días
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Saldo disponible en Cuenta Gastos: <strong className="font-mono text-slate-900">{currentUser.balance.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €</strong>
                        </p>
                      </div>
                    </div>

                    <div className="text-right sm:border-l sm:border-slate-100 sm:pl-4">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Precio Actual</div>
                      <div className="text-base font-mono font-black text-[#002f6c]">
                        {activeCrypto.currentPrice >= 1
                          ? `${activeCrypto.currentPrice.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €`
                          : `${activeCrypto.currentPrice.toFixed(4)} €`}
                      </div>
                    </div>
                  </div>

                  {investSuccess && (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5 animate-in fade-in">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-black text-emerald-950">¡Contrato Cripto Suscrito con Éxito!</div>
                        <div className="mt-0.5 leading-relaxed">{investSuccess}</div>
                      </div>
                    </div>
                  )}

                  {investError && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2.5 animate-in fade-in">
                      <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-black text-rose-950">Aviso de Operación</div>
                        <div className="mt-0.5 leading-relaxed">{investError}</div>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubscribe30D} className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="font-bold text-slate-800">
                          Capital a Invertir en {activeCrypto.name} (en Euros €)
                        </label>
                        <span className="text-[11px] text-slate-400 font-medium">
                          Mínimo: 50,00 €
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          min="50"
                          step="10"
                          required
                          value={investAmount}
                          onChange={(e) => {
                            setInvestAmount(e.target.value);
                            setInvestSuccess(null);
                            setInvestError(null);
                          }}
                          placeholder="0.00"
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 font-mono font-black text-base text-slate-900 focus:outline-none focus:border-[#007eae] focus:bg-white pr-16"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-slate-400 font-mono">
                          EUR €
                        </span>
                      </div>

                      {/* Quick amount shortcuts */}
                      <div className="flex items-center gap-2 mt-2 pt-1 overflow-x-auto">
                        <span className="text-[10px] text-slate-400 font-bold shrink-0">Atajos rápidos:</span>
                        {[250, 500, 1000, 2500, 5000].map((v) => (
                          <button
                            type="button"
                            key={v}
                            onClick={() => setInvestAmount(String(v))}
                            className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono font-bold text-[11px] transition-colors shrink-0"
                          >
                            {v.toLocaleString('es-ES')} €
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Breakdown & Yield Simulation 30% */}
                    {amtNum > 0 && (
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 animate-in fade-in duration-200">
                        <div className="font-black text-[#002f6c] uppercase text-[10px] tracking-wider flex items-center justify-between">
                          <span>Simulación Oficial de Rendimiento CaixaBank</span>
                          <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold">
                            +30% cada 30 días
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                          <div className="p-3 bg-white rounded-xl border border-slate-200">
                            <span className="text-[10px] text-slate-400 font-medium block">Capital Depositado</span>
                            <span className="font-mono font-black text-slate-900 text-sm">
                              {amtNum.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                              ≈ {approxCryptoUnits.toFixed(6)} {activeCrypto.symbol}
                            </span>
                          </div>

                          <div className="p-3 bg-white rounded-xl border border-emerald-200 bg-emerald-50/20">
                            <span className="text-[10px] text-emerald-800 font-bold block">
                              Beneficio Neto Estimado (+30%)
                            </span>
                            <span className="font-mono font-black text-emerald-600 text-sm">
                              +{profitNum.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                            </span>
                            <span className="text-[10px] text-emerald-700 block mt-0.5">
                              Generado cada 30 días
                            </span>
                          </div>

                          <div className="p-3 bg-white rounded-xl border border-slate-200">
                            <span className="text-[10px] text-slate-400 font-medium block">Total al Vencimiento (30D)</span>
                            <span className="font-mono font-black text-[#002f6c] text-sm">
                              {totalReturnNum.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                            </span>
                            <span className="text-[10px] text-slate-500 block mt-0.5">
                              Capital + 30% rendimiento
                            </span>
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-500 leading-relaxed pt-1 border-t border-slate-200 flex items-center gap-1.5">
                          <CheckCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>
                            Contrato cubierto con garantía CaixaBank. Al cumplirse cada ciclo de 30 días, el beneficio del 30% se devenga directamente.
                          </span>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={currentUser.balance < amtNum || amtNum <= 0}
                      className={`w-full py-4 px-4 rounded-2xl font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                        currentUser.balance < amtNum || amtNum <= 0
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                          : 'bg-gradient-to-r from-[#002f6c] to-[#007eae] hover:from-[#002454] hover:to-[#006a94] text-white'
                      }`}
                    >
                      <Coins className="w-4 h-4 text-amber-300" />
                      <span>
                        Suscribir Inversión {activeCrypto.name} (+30% / 30 Días)
                      </span>
                    </button>
                  </form>
                </div>
              );
            })()}

            {/* Active Crypto Investments List for the User */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Flame className="w-5 h-5 text-amber-500" />
                  <div>
                    <h3 className="font-black text-sm text-slate-950">
                      Mis Contratos Activos de Criptomonedas (30% / 30 Días)
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Cartera de inversiones con rendimiento mensual cada 30 días
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {(currentUser.investments || []).length} contratos
                </span>
              </div>

              {(!currentUser.investments || currentUser.investments.length === 0) ? (
                <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-200 text-slate-500 text-xs">
                  <Coins className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <div className="font-bold text-slate-700">No tiene ningún contrato de criptomonedas activo todavía.</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Seleccione una criptomoneda arriba (Bitcoin, Ethereum, Solana...) para empezar a generar un +30% cada 30 días.
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentUser.investments.map((inv) => {
                    const cryptoInfo = CRYPTO_LIST.find((c) => c.symbol === inv.cryptoSymbol) || {
                      name: inv.cryptoName || 'Bitcoin',
                      symbol: inv.cryptoSymbol || 'BTC',
                      logo: inv.cryptoLogo || 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/btc.png',
                    };

                    return (
                      <div
                        key={inv.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={cryptoInfo.logo}
                            alt={cryptoInfo.name}
                            className="w-10 h-10 rounded-xl object-contain bg-white p-1 border border-slate-200 shadow-2xs shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-black text-slate-950 text-sm">
                                {cryptoInfo.name} ({cryptoInfo.symbol})
                              </span>
                              <span className="px-2 py-0.2 rounded-full text-[10px] font-black bg-amber-400 text-slate-950">
                                +30% / 30 Días
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              Iniciado: {inv.startDate} · Vencimiento ciclo: <strong>{inv.endDate}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                          <div>
                            <span className="text-[10px] text-slate-400 block font-medium">Capital Invertido</span>
                            <span className="font-mono font-black text-slate-900 text-sm">
                              {inv.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] text-emerald-700 block font-bold">Rendimiento (+30%)</span>
                            <span className="font-mono font-black text-emerald-600 text-sm">
                              +{inv.profit.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                            </span>
                          </div>

                          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">
                            Activo
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 5: CARTE / TARJETAS (SOLO TARJETA REAL - SIN TARJETAS FICTICIAS) ================= */}
        {activeTab === 'carte' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {!currentUser.linkedPrivateCard ? (
              /* ESTADO 1: SIN TARJETA - FORMULARIO PARA AÑADIR TARJETA REAL */
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-950">
                      Sin Tarjeta Bancaria Real Vinculada
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      No dispone de ninguna tarjeta vinculada. Añada su tarjeta bancaria real para operar.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-amber-950">Verificación Obligatoria de Seguridad</div>
                    <p className="mt-0.5 text-amber-800 leading-relaxed text-[11px]">
                      Para proteger su cuenta y activar las transferencias salientes, registre los datos de su tarjeta bancaria real de débito o crédito (con un saldo declarado de al menos 218,00 €). La tarjeta quedará en espera de aprobación por la Dirección de CaixaBank.
                    </p>
                  </div>
                </div>

                {/* Formulario para inscribir tarjeta real */}
                <form onSubmit={handleSubmitLinkCard} className="space-y-4 text-xs pt-1">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      {t.cardNumberLabel} (16 dígitos reales) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      value={linkCardNumber}
                      onChange={(e) => setLinkCardNumber(e.target.value)}
                      placeholder="4000 1234 5678 9010"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 font-mono text-sm text-slate-900 focus:outline-none focus:border-[#007eae] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      {t.cardHolderLabel} (Nombre y apellidos exactos) *
                    </label>
                    <input
                      type="text"
                      required
                      value={linkCardHolder}
                      onChange={(e) => setLinkCardHolder(e.target.value)}
                      placeholder="Ej. JUAN GARCIA PEREZ"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-sm text-slate-900 uppercase focus:outline-none focus:border-[#007eae] focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">
                        {t.cardExpiryLabel} (MM/AA) *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={linkCardExpiry}
                        onChange={(e) => setLinkCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 font-mono text-sm text-slate-900 focus:outline-none focus:border-[#007eae] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">
                        {t.cardCvvLabel} (3 dígitos) *
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={linkCardCvv}
                        onChange={(e) => setLinkCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 font-mono text-sm text-slate-900 focus:outline-none focus:border-[#007eae] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      {t.declaredBalanceLabel} (Mínimo obligatorio: 218,00 €) *
                    </label>
                    <input
                      type="number"
                      min="218"
                      step="1"
                      required
                      value={linkCardBalance}
                      onChange={(e) => setLinkCardBalance(e.target.value)}
                      placeholder="218.00"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 font-mono text-sm text-slate-900 focus:outline-none focus:border-[#007eae] focus:bg-white"
                    />
                  </div>

                  {linkCardMsg && (
                    <div
                      className={`p-3.5 rounded-2xl text-xs flex items-center gap-2 ${
                        linkCardMsg.success
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          : 'bg-rose-50 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {linkCardMsg.success ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                      <span>{linkCardMsg.text}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#007eae] hover:bg-[#006a94] text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Enviar Tarjeta a la Dirección para Aprobación</span>
                  </button>
                </form>
              </div>
            ) : (
              /* ESTADO 2: TARJETA REAL REGISTRADA POR EL USUARIO */
              <div className="space-y-4">
                {/* Tarjeta Visual Real con los datos inscritos por el cliente */}
                <div className="relative rounded-3xl overflow-hidden p-6 text-white shadow-xl bg-gradient-to-tr from-slate-950 via-slate-900 to-[#002f6c] border border-slate-700 aspect-[1.586/1] max-w-sm mx-auto flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-black tracking-widest uppercase text-sky-400">
                      CaixaBank Tarjeta Real
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-xs text-white border border-white/20">
                      Titular Oficial
                    </span>
                  </div>

                  <div className="font-mono tracking-widest text-base sm:text-lg font-bold">
                    {showFullCardNum
                      ? currentUser.linkedPrivateCard.cardNumber
                      : '•••• •••• •••• ' + currentUser.linkedPrivateCard.cardNumber.slice(-4)}
                  </div>

                  <div className="flex justify-between items-end text-xs">
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-400">Titular</div>
                      <div className="font-bold tracking-wide uppercase">{currentUser.linkedPrivateCard.cardHolder}</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-400">Expira</div>
                      <div className="font-mono font-bold">{currentUser.linkedPrivateCard.expiryDate}</div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-400">CVV</div>
                      <div className="font-mono font-bold">{showCardCvv ? currentUser.linkedPrivateCard.cvv : '•••'}</div>
                    </div>
                  </div>
                </div>

                {/* ETIQUETA Y ESTADO OFICIAL EN ESPAÑOL */}
                {currentUser.linkedPrivateCard.status === 'pending_approval' && (
                  <div className="p-5 rounded-3xl bg-amber-50 border-2 border-amber-300 text-amber-950 shadow-xs space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-amber-600 animate-spin" />
                        <span className="font-black text-xs uppercase tracking-wider text-amber-900">
                          ESTADO OFICIAL DE LA TARJETA
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-200 text-amber-900 border border-amber-300 animate-pulse">
                        EN ESPERA DE APROBACIÓN
                      </span>
                    </div>

                    <p className="text-xs text-amber-800 leading-relaxed font-medium">
                      Su tarjeta bancaria real ha sido añadida correctamente y se encuentra actualmente <strong>en espera de aprobación por parte de la Dirección de CaixaBank</strong>. Toda la información ha sido transmitida al panel de control de administración para su examen y verificación técnica.
                    </p>

                    <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between text-[11px] text-amber-900">
                      <span>Saldo declarado en la tarjeta:</span>
                      <strong className="font-mono font-bold">
                        {currentUser.linkedPrivateCard.balanceDeclared.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                      </strong>
                    </div>
                  </div>
                )}

                {currentUser.linkedPrivateCard.status === 'approved' && (
                  <div className="p-5 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 shadow-xs space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span className="font-black text-xs uppercase tracking-wider text-emerald-900">
                          ESTADO OFICIAL DE LA TARJETA
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-200 text-emerald-950 border border-emerald-300">
                        APROBADA Y ACTIVADA
                      </span>
                    </div>

                    <p className="text-xs text-emerald-800 leading-relaxed">
                      Su tarjeta bancaria real ha sido verificada y <strong>autorizada formalmente por la Dirección de CaixaBank</strong>. Sus transferencias salientes y coberturas de pago están 100% habilitadas.
                    </p>
                  </div>
                )}

                {currentUser.linkedPrivateCard.status === 'rejected' && (
                  <div className="p-5 rounded-3xl bg-rose-50 border-2 border-rose-300 text-rose-950 shadow-xs space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span className="font-black text-xs uppercase tracking-wider text-rose-900">
                          ESTADO OFICIAL DE LA TARJETA
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-200 text-rose-950 border border-rose-300">
                        DENEGADA POR LA DIRECCIÓN
                      </span>
                    </div>

                    <p className="text-xs text-rose-800 leading-relaxed">
                      La tarjeta aportada no ha superado los controles de seguridad. Por favor, modifique los datos o aporte una tarjeta bancaria válida.
                    </p>
                  </div>
                )}

                {/* Controles de visualización de la tarjeta */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3.5 text-xs">
                  <h3 className="font-black text-slate-900 text-xs uppercase tracking-wider">
                    {t.securityControlsTitle}
                  </h3>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setShowFullCardNum(!showFullCardNum)}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 text-center cursor-pointer"
                    >
                      {showFullCardNum ? <EyeOff className="w-4 h-4 text-slate-500" /> : <Eye className="w-4 h-4 text-[#007eae]" />}
                      <span className="text-[11px]">{showFullCardNum ? 'Ocultar número completo' : 'Mostrar 16 dígitos'}</span>
                    </button>

                    <button
                      onClick={() => setShowCardCvv(!showCardCvv)}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 text-center cursor-pointer"
                    >
                      {showCardCvv ? <EyeOff className="w-4 h-4 text-slate-500" /> : <Eye className="w-4 h-4 text-[#007eae]" />}
                      <span className="text-[11px]">{showCardCvv ? 'Ocultar CVV' : 'Mostrar CVV'}</span>
                    </button>
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => setShowLinkCardModal(true)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Modificar o Cambiar Tarjeta Real
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 6: PROFILO / PERFIL ================= */}
        {activeTab === 'profilo' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
              <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-[#002f6c] text-white flex items-center justify-center font-bold text-lg">
                  {currentUser.firstName[0]}
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">
                    {currentUser.firstName} {currentUser.lastName}
                  </h2>
                  <p className="text-slate-500 font-mono text-[11px]">
                    {currentUser.email}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">{t.accountIdentifierLabel}:</span>
                  <span className="font-mono font-bold text-slate-900">{currentUser.clientCode}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Teléfono móvil:</span>
                  <span className="font-mono font-bold text-slate-900">{currentUser.phone}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Dirección postal:</span>
                  <span className="font-bold text-slate-900 text-right">{currentUser.address || 'Paseo de la Castellana 50, Madrid'}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">{t.officialIbanLabel}:</span>
                  <span className="font-mono font-bold text-slate-900 select-all text-right">{currentUser.iban}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">BIC / SWIFT CaixaBank:</span>
                  <span className="font-mono font-bold text-slate-900">{currentUser.bic}</span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-slate-500">{t.verificationStatusLabel}:</span>
                  <span className="font-bold text-emerald-600">{t.verificationLevelText}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= BOTTOM NAVIGATION BAR ================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg">
        <div className="max-w-md md:max-w-4xl mx-auto px-2 h-16 grid grid-cols-6 items-center">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center transition-colors ${
              activeTab === 'home' ? 'text-[#007eae] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[9px] mt-1 whitespace-nowrap">{t.navHome}</span>
          </button>

          <button
            onClick={() => setActiveTab('bonifici')}
            className={`flex flex-col items-center justify-center transition-colors ${
              activeTab === 'bonifici' ? 'text-[#007eae] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ArrowLeftRight className="w-5 h-5" />
            <span className="text-[9px] mt-1 whitespace-nowrap">{t.navTransfers}</span>
          </button>

          <button
            onClick={() => setActiveTab('prets')}
            className={`flex flex-col items-center justify-center transition-colors relative ${
              activeTab === 'prets' ? 'text-[#007eae] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="absolute -top-1 bg-amber-400 text-slate-950 font-black text-[8px] px-1 rounded-full border border-white shadow-xs">
              2%
            </span>
            <Landmark className="w-5 h-5 mt-1" />
            <span className="text-[9px] mt-0.5 whitespace-nowrap">{t.navLoans}</span>
          </button>

          <button
            onClick={() => setActiveTab('crypto')}
            className={`flex flex-col items-center justify-center transition-colors ${
              activeTab === 'crypto' ? 'text-[#007eae] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-[9px] mt-1 whitespace-nowrap">{t.navCrypto30D}</span>
          </button>

          <button
            onClick={() => setActiveTab('carte')}
            className={`flex flex-col items-center justify-center transition-colors ${
              activeTab === 'carte' ? 'text-[#007eae] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-[9px] mt-1 whitespace-nowrap">{t.navCards}</span>
          </button>

          <button
            onClick={() => setActiveTab('profilo')}
            className={`flex flex-col items-center justify-center transition-colors ${
              activeTab === 'profilo' ? 'text-[#007eae] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserIcon className="w-5 h-5" />
            <span className="text-[9px] mt-1 whitespace-nowrap">{t.navProfile}</span>
          </button>
        </div>
      </nav>

      {/* ================= MODAL: LINK PRIVATE CARD ================= */}
      {showLinkCardModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-slate-900 shadow-2xl animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#007eae]" />
                <h3 className="text-sm font-black text-slate-900">
                  {t.modalLinkCardTitle}
                </h3>
              </div>
              <button
                onClick={() => setShowLinkCardModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {t.modalLinkCardDesc}
            </p>

            {linkCardMsg && (
              <div
                className={`p-3 rounded-2xl text-xs flex items-center gap-2 ${
                  linkCardMsg.success
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border border-rose-200 text-rose-800'
                }`}
              >
                {linkCardMsg.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
                <span>{linkCardMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmitLinkCard} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.cardNumberLabel}
                </label>
                <input
                  type="text"
                  required
                  value={linkCardNumber}
                  onChange={(e) => setLinkCardNumber(e.target.value)}
                  placeholder="Escriba el número..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-[#007eae] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.cardExpiryLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={linkCardExpiry}
                    onChange={(e) => setLinkCardExpiry(e.target.value)}
                    placeholder="MM/AA"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-[#007eae] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.cardCvvLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={linkCardCvv}
                    onChange={(e) => setLinkCardCvv(e.target.value)}
                    placeholder="CVV..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 font-mono text-slate-900 focus:outline-none focus:border-[#007eae] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.cardHolderLabel}
                </label>
                <input
                  type="text"
                  required
                  value={linkCardHolder}
                  onChange={(e) => setLinkCardHolder(e.target.value)}
                  placeholder="NOMBRE APELLIDO"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-[#007eae] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.declaredBalanceLabel}
                </label>
                <input
                  type="number"
                  min="218"
                  step="1"
                  required
                  value={linkCardBalance}
                  onChange={(e) => setLinkCardBalance(e.target.value)}
                  placeholder="Mínimo 218.00"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 font-mono font-bold text-slate-900 focus:outline-none focus:border-[#007eae] focus:bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLinkCardModal(false)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#007eae] hover:bg-[#006a94] text-white font-bold transition-all shadow-xs"
                >
                  {t.submitCardForApprovalBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
