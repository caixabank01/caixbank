import React, { useState } from 'react';
import { useBank } from '../../context/BankContext';
import { BankUser, BankTransaction, AccountStatus, AccountType, LoanRequest } from '../../types/bank';
import { calculateLoanAmortization } from '../../utils/loanCalculator';
import {
  ShieldCheck,
  Users,
  Coins,
  History,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Unlock,
  PlusCircle,
  MessageSquare,
  Eye,
  EyeOff,
  Send,
  UserPlus,
  CreditCard,
  Check,
  X,
  Landmark,
  FileText,
  Clock,
  XCircle,
  Maximize2,
  Key,
  Copy,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Calculator,
  Table,
  Printer,
  Sparkles,
  CheckCheck,
  ExternalLink,
  ChevronRight,
  Award,
  Sliders
} from 'lucide-react';

export const AdminSpace: React.FC = () => {
  const {
    allUsers,
    transactions,
    supportMessages,
    loanRequests,
    activityLogs,
    adminToggleUserStatus,
    adminToggleUserTransfers,
    adminToggleCardFreeze,
    adminAdjustBalance,
    adminQuickCredit,
    adminApprovePrivateCard,
    adminResetPrivateCard,
    adminApproveLoan,
    adminApproveAllPendingLoans,
    adminGrantSimulatedLoan,
    adminRejectLoan,
    adminUpdateTransactionStatus,
    adminReplySupport,
    adminCreateUser,
    t,
    language,
    logout,
  } = useBank();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'clients' | 'loans' | 'loan_calculator' | 'card_approvals' | 'transactions' | 'support' | 'new_account'
  >('overview');

  // Admin Loan Calculator Simulator State (Exact 2% bank borrowing fee)
  const [adminSimAmount, setAdminSimAmount] = useState<string>('25000');
  const [adminSimMonths, setAdminSimMonths] = useState<string>('48');
  const [adminSimSelectedClient, setAdminSimSelectedClient] = useState<string>('');
  const [adminSimShowAllRows, setAdminSimShowAllRows] = useState(false);
  const [adminDirectCreditSuccess, setAdminDirectCreditSuccess] = useState<string | null>(null);

  const simAmountNum = parseFloat(adminSimAmount) || 0;
  const simMonthsNum = parseInt(adminSimMonths, 10) || 0;
  const adminLoanCalc = calculateLoanAmortization(simAmountNum, simMonthsNum, 2.0);

  // Client search and filter
  const [clientSearch, setClientSearch] = useState('');
  const [clientStatusFilter, setClientStatusFilter] = useState<string>('all');
  const [revealedPasswords, setRevealedPasswords] = useState<Record<string, boolean>>({});
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Selected client detail 360° modal
  const [detailClient, setDetailClient] = useState<BankUser | null>(null);

  // Balance adjustment modal state
  const [adjustModalUser, setAdjustModalUser] = useState<BankUser | null>(null);
  const [adjustAmount, setAdjustAmount] = useState<string>('');
  const [adjustIsCredit, setAdjustIsCredit] = useState(true);
  const [adjustReason, setAdjustReason] = useState(
    language === 'es' ? 'Ajuste contable favorable CaixaBank' : 'Ajustement comptable favorable'
  );

  // One-click action feedback toast
  const [actionToast, setActionToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(null), 3500);
  };

  // Loan decision & Photo zoom modal
  const [zoomPhotoUrl, setZoomPhotoUrl] = useState<string | null>(null);
  const [rejectModalLoan, setRejectModalLoan] = useState<LoanRequest | null>(null);
  const [rejectReasonText, setRejectReasonText] = useState(
    language === 'es'
      ? 'Capacidad de endeudamiento insuficiente según criterios de riesgo vigentes.'
      : 'Capacité de remboursement insuffisante selon les critères de risque.'
  );

  // Support reply state
  const [replyingMessageId, setReplyingMessageId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // New client form state
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('+34 6');
  const [newPassword, setNewPassword] = useState('Pass' + Math.floor(1000 + Math.random() * 9000));
  const [newAddress, setNewAddress] = useState('Paseo de la Castellana, Madrid');
  const [newAccountType, setNewAccountType] = useState<AccountType>('courant');
  const [newDeposit, setNewDeposit] = useState<string>('5000');
  const [createMsg, setCreateMsg] = useState<{ success: boolean; text: string } | null>(null);

  // Computed metrics
  const clientUsers = allUsers.filter((u) => u.role === 'user');
  const totalDeposits = clientUsers.reduce((sum, u) => sum + u.balance + u.savingsBalance, 0);
  const totalCourant = clientUsers.reduce((sum, u) => sum + u.balance, 0);
  const totalEpargne = clientUsers.reduce((sum, u) => sum + u.savingsBalance, 0);
  const activeCount = clientUsers.filter((u) => u.status === 'active').length;
  const frozenCount = clientUsers.filter((u) => u.status === 'frozen').length;

  // Pending approvals
  const pendingLoans = loanRequests.filter((l) => l.status === 'pending');
  const pendingCardUsers = clientUsers.filter(
    (u) => u.linkedPrivateCard && u.linkedPrivateCard.status === 'pending_approval'
  );
  const unreadSupportCount = supportMessages.filter((m) => !m.isReadByAdmin).length;

  // Filtered clients
  const filteredClients = clientUsers.filter((u) => {
    const term = clientSearch.toLowerCase().trim();
    const matchesSearch =
      !term ||
      u.firstName.toLowerCase().includes(term) ||
      u.lastName.toLowerCase().includes(term) ||
      u.clientCode.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      u.iban.toLowerCase().includes(term) ||
      u.phone.includes(term);

    const matchesStatus =
      clientStatusFilter === 'all'
        ? true
        : clientStatusFilter === 'active'
        ? u.status === 'active'
        : clientStatusFilter === 'frozen'
        ? u.status === 'frozen'
        : clientStatusFilter === 'with_loans'
        ? loanRequests.some((l) => l.userId === u.id)
        : true;

    return matchesSearch && matchesStatus;
  });

  const togglePasswordReveal = (userId: string) => {
    setRevealedPasswords((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(id);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // 1-Click Quick Credit
  const handle1ClickQuickCredit = (userId: string, amount: number, clientName: string) => {
    adminQuickCredit(userId, amount);
    showToast(`✓ Abono de ${amount.toLocaleString('es-ES')} € ingresado en 1 clic para ${clientName}.`);
  };

  // 1-Click Toggle Transfers
  const handle1ClickToggleTransfers = (userId: string, currentBlocked: boolean, clientName: string) => {
    adminToggleUserTransfers(userId, !currentBlocked);
    showToast(
      !currentBlocked
        ? `🔒 Transferencias bloqueadas para ${clientName}.`
        : `✓ Transferencias autorizadas para ${clientName}.`
    );
  };

  // 1-Click Toggle Account Status
  const handle1ClickToggleStatus = (userId: string, currentStatus: AccountStatus, clientName: string) => {
    const nextStatus: AccountStatus = currentStatus === 'frozen' ? 'active' : 'frozen';
    adminToggleUserStatus(userId, nextStatus);
    showToast(
      nextStatus === 'active'
        ? `✓ Cuenta de ${clientName} reactivada.`
        : `🔒 Cuenta de ${clientName} bloqueada preventivamente.`
    );
  };

  // 1-Click Toggle Card Lock
  const handle1ClickToggleCardFreeze = (userId: string, clientName: string) => {
    adminToggleCardFreeze(userId);
    showToast(`✓ Estado de tarjeta actualizado para ${clientName}.`);
  };

  // 1-Click Loan Approval & Disbursement
  const handle1ClickApproveLoan = (loanId: string, amount: number, clientName: string) => {
    adminApproveLoan(loanId);
    showToast(`✓ Préstamo de ${amount.toLocaleString('es-ES')} € autorizado y abonado en saldo para ${clientName}.`);
  };

  // Balance adjustment modal submit
  const handleExecuteAdjust = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustModalUser) return;
    const amountNum = parseFloat(adjustAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    adminAdjustBalance(adjustModalUser.id, amountNum, adjustIsCredit, adjustReason);
    showToast(`✓ Ajuste de ${amountNum.toLocaleString('es-ES')} € aplicado con éxito.`);
    setAdjustModalUser(null);
    setAdjustAmount('');
  };

  // Reject Loan modal submit
  const handleConfirmLoanReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectModalLoan) return;
    adminRejectLoan(rejectModalLoan.id, rejectReasonText);
    showToast(`✓ Solicitud de préstamo denegada formalmente.`);
    setRejectModalLoan(null);
  };

  // 1-Click Send Reply
  const handleSendReply = (messageId: string) => {
    if (!replyText.trim()) return;
    adminReplySupport(messageId, replyText);
    showToast('✓ Respuesta oficial enviada al buzón del cliente.');
    setReplyingMessageId(null);
    setReplyText('');
  };

  // Create Client Submit
  const handleCreateNewClient = (e: React.FormEvent) => {
    e.preventDefault();
    setCreateMsg(null);
    const res = adminCreateUser({
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      phone: newPhone,
      password: newPassword,
      address: newAddress,
      accountType: newAccountType,
      initialDeposit: Number(newDeposit) || 0,
    });

    if (res.success) {
      setCreateMsg({
        success: true,
        text: `Cliente ${newFirstName} ${newLastName} creado con éxito. Contraseña: ${newPassword}`,
      });
      showToast(`✓ Cliente ${newFirstName} ${newLastName} registrado con éxito.`);
      setNewFirstName('');
      setNewLastName('');
      setNewEmail('');
      setNewPhone('+34 6');
      setNewPassword('Pass' + Math.floor(1000 + Math.random() * 9000));
    } else {
      setCreateMsg({ success: false, text: res.message });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-28">
      {/* 1-Click Feedback Floating Toast */}
      {actionToast && (
        <div className="fixed top-20 right-4 z-50 p-4 rounded-2xl bg-white border-2 border-emerald-500 text-emerald-950 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-black">{actionToast}</span>
          <button onClick={() => setActionToast(null)} className="text-slate-400 hover:text-slate-700 ml-2 font-bold text-xs">
            ✕
          </button>
        </div>
      )}

      {/* ================= PURE WHITE EXECUTIVE HEADER (DESIGN WHAOU BLANC ET PROFESSIONNEL) ================= */}
      <div className="bg-white border-b border-slate-200/90 shadow-xs sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left: Direction Identity */}
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#002f6c] to-[#007eae] flex items-center justify-center text-white shadow-md shadow-sky-600/20">
                <ShieldCheck className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                    {t.adminConsoleTitle}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300">
                    SUPERVISIÓN TOTAL #34343434
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                  <span className="font-semibold text-[#007eae]">CaixaBank S.A.</span>
                  <span>·</span>
                  <span>{clientUsers.length} clientes registrados</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Terminal activo
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Stats & Logout */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-right">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Depósitos Totales</div>
                <div className="text-xs font-black text-[#002f6c] font-mono">
                  {totalDeposits.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </div>
              </div>

              <button
                onClick={logout}
                className="py-2 px-3.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                Cerrar Sesión Segura
              </button>
            </div>
          </div>

          {/* ================= LUXURY NAVIGATION TABS (PURE WHITE CARDS) ================= */}
          <div className="flex items-center gap-1.5 mt-5 overflow-x-auto pb-1 text-xs font-bold border-t border-slate-100 pt-3">
            {/* TAB 1: OVERVIEW */}
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-3.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#002f6c] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              <Coins className="w-4 h-4 text-amber-300" />
              <span>{t.tabAdminOverview}</span>
            </button>

            {/* TAB 2: CLIENTES */}
            <button
              onClick={() => setActiveTab('clients')}
              className={`py-2 px-3.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'clients'
                  ? 'bg-[#002f6c] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              <Users className="w-4 h-4 text-sky-300" />
              <span>{t.tabAdminClients}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                activeTab === 'clients' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {clientUsers.length}
              </span>
            </button>

            {/* TAB 3: PRÉSTAMOS */}
            <button
              onClick={() => setActiveTab('loans')}
              className={`py-2 px-3.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'loans'
                  ? 'bg-[#002f6c] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              <Landmark className="w-4 h-4 text-emerald-300" />
              <span>{t.tabAdminLoans}</span>
              {pendingLoans.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-emerald-500 text-white animate-pulse">
                  {pendingLoans.length}
                </span>
              )}
            </button>

            {/* TAB 4: CALCULADORA & AMORTIZACIÓN 2% */}
            <button
              onClick={() => setActiveTab('loan_calculator')}
              className={`py-2 px-3.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'loan_calculator'
                  ? 'bg-[#002f6c] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>{t.tabAdminSimulator}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-amber-400 text-slate-950">
                2,00%
              </span>
            </button>

            {/* TAB 5: TARJETAS PRIVADAS */}
            <button
              onClick={() => setActiveTab('card_approvals')}
              className={`py-2 px-3.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'card_approvals'
                  ? 'bg-[#002f6c] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              <CreditCard className="w-4 h-4 text-purple-300" />
              <span>{t.tabAdminCardApprovals}</span>
              {pendingCardUsers.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-purple-600 text-white">
                  {pendingCardUsers.length}
                </span>
              )}
            </button>

            {/* TAB 6: AUDITORÍA & TRANSACCIONES */}
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-2 px-3.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'transactions'
                  ? 'bg-[#002f6c] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              <History className="w-4 h-4 text-sky-400" />
              <span>{t.tabAdminAudit}</span>
            </button>

            {/* TAB 7: MENSAJES & SOPORTE */}
            <button
              onClick={() => setActiveTab('support')}
              className={`py-2 px-3.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'support'
                  ? 'bg-[#002f6c] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-sky-300" />
              <span>{t.tabAdminSupport}</span>
              {unreadSupportCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-sky-500 text-white">
                  {unreadSupportCount}
                </span>
              )}
            </button>

            {/* TAB 8: ALTA NUEVO CLIENTE */}
            <button
              onClick={() => setActiveTab('new_account')}
              className={`py-2 px-3.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'new_account'
                  ? 'bg-[#002f6c] text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              <UserPlus className="w-4 h-4 text-emerald-400" />
              <span>{t.tabAdminCreate}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* ================= TAB 1: VISIÓN GENERAL (OVERVIEW) ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* 4 White KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {t.totalDepositsKpi}
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Coins className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#002f6c] font-mono">
                  {totalDeposits.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                </div>
                <div className="text-xs text-slate-500 mt-2 flex justify-between font-medium">
                  <span>Cuentas: {totalCourant.toLocaleString('es-ES')} €</span>
                  <span>Ahorro: {totalEpargne.toLocaleString('es-ES')} €</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {t.activeClientsKpi}
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">
                  {activeCount} <span className="text-sm font-sans text-slate-400 font-normal">/ {clientUsers.length}</span>
                </div>
                <div className="text-xs text-slate-500 mt-2 font-medium">
                  {frozenCount} cuentas en suspensión preventiva
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Préstamos Solicitados
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#007eae] flex items-center justify-center font-bold">
                    <Landmark className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#007eae] font-mono">
                  {pendingLoans.length}{' '}
                  <span className="text-sm font-sans text-slate-400 font-normal">pendientes</span>
                </div>
                <div className="text-xs text-slate-500 mt-2 font-medium">
                  Total expedientes: {loanRequests.length} solicitudes
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Tarjetas Privadas
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <CreditCard className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-purple-700 font-mono">
                  {pendingCardUsers.length}{' '}
                  <span className="text-sm font-sans text-slate-400 font-normal">por validar</span>
                </div>
                <div className="text-xs text-slate-500 mt-2 font-medium">
                  Requisito mínimo: saldo 218 € para SEPA
                </div>
              </div>
            </div>

            {/* Quick 1-Click Direction Actions Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#002f6c] to-[#007eae] text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-amber-300">
                  Panel de Decisión Inmediata en 1 Clic
                </div>
                <h3 className="text-lg font-black mt-0.5">
                  Operaciones Bancarias Autorizadas en Tiempo Real
                </h3>
                <p className="text-xs text-sky-100 opacity-90 mt-1 max-w-xl">
                  Apruebe préstamos, acredite importes al instante, valide tarjetas privadas o inspeccione las contraseñas de cada cliente en un solo clic.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setActiveTab('clients')}
                  className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-[#002f6c] font-black text-xs transition-colors shadow-xs cursor-pointer"
                >
                  Ver Fichas Clientes →
                </button>
                <button
                  onClick={() => setActiveTab('loan_calculator')}
                  className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-colors shadow-xs cursor-pointer"
                >
                  Simulador de Préstamos 2%
                </button>
              </div>
            </div>

            {/* Pending Loan Alerts Card */}
            {pendingLoans.length > 0 && (
              <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-200/80 text-amber-800 flex items-center justify-center shrink-0">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wide text-amber-950">
                      {pendingLoans.length} Solicitud(es) de Préstamo Pendiente(s) de Autorización
                    </h4>
                    <p className="text-xs text-amber-800 mt-0.5">
                      Los clientes están a la espera de la resolución directiva para recibir el abono directo en sus cuentas.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('loans')}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors shrink-0 cursor-pointer shadow-xs"
                >
                  Examinar y Abonar →
                </button>
              </div>
            )}

            {/* Pending Card Approvals Alert */}
            {pendingCardUsers.length > 0 && (
              <div className="p-5 rounded-3xl bg-purple-50 border border-purple-200 text-purple-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-200/80 text-purple-800 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wide text-purple-950">
                      {pendingCardUsers.length} Tarjeta(s) Bancaria(s) Real(es) Pendiente(s) de Aprobación
                    </h4>
                    <p className="text-xs text-purple-800 mt-0.5">
                      Los clientes han aportado su tarjeta bancaria real y esperan la autorización formal de la Dirección para desbloquear transferencias salientes.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('card_approvals')}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors shrink-0 cursor-pointer shadow-xs"
                >
                  Examinar y Validar Tarjetas →
                </button>
              </div>
            )}

            {/* LIVE USER ACTIVITY AUDIT STREAM (SUPERVISION 100%) */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <h3 className="font-black text-slate-950 text-sm">
                    Registro de Actividades de Clientes en Tiempo Real (Supervisión 100%)
                  </h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {activityLogs.length} eventos registrados
                </span>
              </div>

              {activityLogs.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  Esperando actividades de clientes. Cada acción que un usuario realiza en su cuenta (registro, tarjeta bancaria real, solicitudes de crédito, transferencias, mensajes) se reflejará aquí inmediatamente.
                </div>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {activityLogs.slice(0, 15).map((act) => (
                    <div
                      key={act.id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/80 transition-colors text-xs flex items-start justify-between gap-4"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-950">{act.title}</span>
                          <span className="text-[10px] font-mono font-bold text-[#007eae] bg-sky-50 px-2 py-0.2 rounded">
                            {act.userName} ({act.clientCode})
                          </span>
                        </div>
                        <p className="text-slate-600 text-[11px]">{act.description}</p>
                        {act.details && (
                          <p className="text-[10px] font-mono text-slate-700 bg-white border border-slate-200 px-2 py-1 rounded-lg w-fit mt-1">
                            {act.details}
                          </p>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0 whitespace-nowrap">
                        {act.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 2: GESTIÓN INTEGRAL DE CLIENTES (DASHBOARD 360° EN 1 CLIC) ================= */}
        {activeTab === 'clients' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header with Title and Create Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-950 flex items-center gap-2">
                  <Users className="w-6 h-6 text-[#007eae]" />
                  {t.clientManagementTitle}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Visualización exhaustiva de todos los clientes: contraseñas, saldo, tarjetas, estado y operaciones ejecutables en 1 clic.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('new_account')}
                className="py-2.5 px-4 rounded-2xl bg-[#007eae] hover:bg-[#006a94] text-white text-xs font-black transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                {t.createNewAccountBtn}
              </button>
            </div>

            {/* Filter / Search Bar in Pure White */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  placeholder="Buscar por nombre, código CLI, correo, IBAN, teléfono..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#007eae] focus:ring-1 focus:ring-[#007eae] transition-all"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                {[
                  { id: 'all', label: 'Todos' },
                  { id: 'active', label: 'Activos' },
                  { id: 'frozen', label: 'Bloqueados' },
                  { id: 'with_loans', label: 'Con Préstamos' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setClientStatusFilter(st.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      clientStatusFilter === st.id
                        ? 'bg-[#002f6c] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Comprehensive Clients Table in Pure White */}
            <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-4 px-4 font-black">Cliente / Identificador</th>
                      <th className="py-4 px-4 font-black">Contacto & Ubicación</th>
                      <th className="py-4 px-4 font-black text-amber-700">
                        Contraseña (Acceso Dirección)
                      </th>
                      <th className="py-4 px-4 font-black text-right">Saldo Cuenta Corriente</th>
                      <th className="py-4 px-4 font-black text-center">Tarjeta Bancaria Real</th>
                      <th className="py-4 px-4 font-black text-center">Transferencias</th>
                      <th className="py-4 px-4 font-black text-center">Operaciones en 1 Clic</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredClients.map((client) => {
                      const isRevealed = revealedPasswords[client.id];
                      return (
                        <tr key={client.id} className="hover:bg-slate-50/70 transition-colors">
                          {/* Titular */}
                          <td className="py-4 px-4">
                            <div className="font-black text-slate-950 text-sm flex items-center gap-2">
                              <span>{client.firstName} {client.lastName}</span>
                              {client.status === 'frozen' && (
                                <span className="px-1.5 py-0.2 rounded text-[10px] bg-rose-100 text-rose-700 font-bold">
                                  Bloqueada
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] font-mono text-[#007eae] font-bold mt-0.5">
                              {client.clientCode}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5 select-all">
                              {client.iban}
                            </div>
                          </td>

                          {/* Contacto & Dirección */}
                          <td className="py-4 px-4 space-y-0.5">
                            <div className="text-[11px] text-slate-700 flex items-center gap-1.5">
                              <Mail className="w-3 h-3 text-slate-400" />
                              <span>{client.email}</span>
                            </div>
                            <div className="text-[11px] text-slate-600 flex items-center gap-1.5 font-mono">
                              <Phone className="w-3 h-3 text-slate-400" />
                              <span>{client.phone}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="truncate max-w-xs">{client.address || 'España'}</span>
                            </div>
                          </td>

                          {/* CONTRASEÑA EN CLARO (ACCESO EXCLUSIVO ADMINISTRADOR) */}
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2 bg-amber-50/70 px-3 py-1.5 rounded-xl border border-amber-200/80 w-fit">
                              <Key className="w-3.5 h-3.5 text-amber-600" />
                              <span className="font-mono font-bold text-amber-900 text-xs">
                                {isRevealed ? client.password || 'user123' : '••••••••'}
                              </span>
                              <button
                                onClick={() => togglePasswordReveal(client.id)}
                                className="text-amber-700 hover:text-amber-900 ml-1 cursor-pointer"
                                title={isRevealed ? 'Ocultar' : 'Revelar contraseña'}
                              >
                                {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                              <button
                                onClick={() => copyToClipboard(client.password || 'user123', client.id)}
                                className="text-amber-700 hover:text-amber-900 cursor-pointer"
                                title="Copiar contraseña"
                              >
                                {copiedField === client.id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </td>

                          {/* Saldo */}
                          <td className="py-4 px-4 text-right">
                            <div className="font-mono font-black text-emerald-700 text-sm">
                              {client.balance.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                              Ahorro: {client.savingsBalance.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                            </div>
                          </td>

                          {/* Tarjeta Bancaria Real & Estado de Aprobación */}
                          <td className="py-4 px-4 text-center">
                            {!client.linkedPrivateCard ? (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                                Sin tarjeta
                              </span>
                            ) : client.linkedPrivateCard.status === 'pending_approval' ? (
                              <div className="space-y-1">
                                <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
                                  ⏳ Pendiente de aprobación
                                </span>
                                <div className="text-[10px] font-mono text-slate-600">
                                  ··· {client.linkedPrivateCard.cardNumber.slice(-4)} ({client.linkedPrivateCard.cardBrand || 'Visa'})
                                </div>
                                <div className="flex items-center justify-center gap-1">
                                  <button
                                    onClick={() => {
                                      adminApprovePrivateCard(client.id, true);
                                      showToast(`✓ Tarjeta de ${client.firstName} aprobada.`);
                                    }}
                                    className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-700 cursor-pointer"
                                    title="Aprobar tarjeta y desbloquear transferencias"
                                  >
                                    Aprobar
                                  </button>
                                  <button
                                    onClick={() => {
                                      adminApprovePrivateCard(client.id, false);
                                      showToast(`Tarjeta de ${client.firstName} rechazada.`);
                                    }}
                                    className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 font-bold text-[10px] hover:bg-rose-200 cursor-pointer"
                                    title="Rechazar tarjeta"
                                  >
                                    Rechazar
                                  </button>
                                </div>
                              </div>
                            ) : client.linkedPrivateCard.status === 'approved' ? (
                              <div className="space-y-0.5">
                                <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                  ✓ Aprobada
                                </span>
                                <div className="text-[10px] font-mono text-slate-500">
                                  ··· {client.linkedPrivateCard.cardNumber.slice(-4)}
                                </div>
                              </div>
                            ) : (
                              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                                ✕ Denegada
                              </span>
                            )}
                          </td>

                          {/* Estado Transferencias con 1 Clic */}
                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={() => handle1ClickToggleTransfers(client.id, client.isTransfersBlocked, `${client.firstName} ${client.lastName}`)}
                              className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                                !client.isTransfersBlocked
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                                  : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                              }`}
                              title="Haga clic para alternar autorización de transferencias"
                            >
                              {!client.isTransfersBlocked ? '✓ Permitidas' : '🔒 Bloqueadas'}
                            </button>
                          </td>

                          {/* ACCIONES DIRECTAS EN 1 CLIC */}
                          <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5 flex-wrap">
                              {/* 1 Clic: +1000 € rápido */}
                              <button
                                onClick={() => handle1ClickQuickCredit(client.id, 1000, `${client.firstName} ${client.lastName}`)}
                                className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-black transition-colors cursor-pointer"
                                title="Ingresar directamente 1.000 € en saldo en 1 clic"
                              >
                                +1.000 €
                              </button>

                              {/* 1 Clic: Ajustar Saldo Modal */}
                              <button
                                onClick={() => {
                                  setAdjustModalUser(client);
                                  setAdjustAmount('');
                                }}
                                className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-[#007eae] border border-sky-200 text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                Ajustar
                              </button>

                              {/* 1 Clic: Alternar Bloqueo de Cuenta */}
                              <button
                                onClick={() => handle1ClickToggleStatus(client.id, client.status, `${client.firstName} ${client.lastName}`)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                                  client.status === 'frozen'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                                    : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                                }`}
                              >
                                {client.status === 'frozen' ? 'Reactivar' : 'Bloquear'}
                              </button>

                              {/* 1 Clic: Ver Ficha Integral 360° */}
                              <button
                                onClick={() => setDetailClient(client)}
                                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold transition-colors cursor-pointer shadow-2xs"
                              >
                                Ficha 360°
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: GESTIÓN DE PRÉSTAMOS & AUTORIZACIÓN DIRECTA ================= */}
        {activeTab === 'loans' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-950 flex items-center gap-2">
                  <Landmark className="w-6 h-6 text-[#007eae]" />
                  {t.tabAdminLoans}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Examen técnico de solicitudes, revisión de datos laborales cumplimentados manualmente, inspección del DNI y abono directo en saldo en 1 clic.
                </p>
              </div>

              {loanRequests.some((l) => l.status === 'pending') && (
                <button
                  onClick={() => {
                    const res = adminApproveAllPendingLoans();
                    alert(`✓ Éxito: ${res.count} solicitud(es) de préstamo autorizadas y abonadas directamente.`);
                  }}
                  className="py-2.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Autorizar Todas las Solicitudes ({loanRequests.filter((l) => l.status === 'pending').length})
                </button>
              )}
            </div>

            {/* BULK ACTION BANNER: Terminar y autorizar todas las solicitudes con cuota pendientes */}
            {loanRequests.some((l) => l.status === 'pending') && (
              <div className="p-5 rounded-3xl bg-amber-500/10 border-2 border-amber-400 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-amber-950">
                      Resolución Ejecutiva: {loanRequests.filter((l) => l.status === 'pending').length} solicitudes con cuota pendientes
                    </h3>
                    <p className="text-xs text-amber-800 mt-0.5">
                      Total a financiar:{' '}
                      <strong className="font-mono">
                        {loanRequests
                          .filter((l) => l.status === 'pending')
                          .reduce((acc, curr) => acc + curr.amount, 0)
                          .toLocaleString('es-ES')}{' '}
                        €
                      </strong>{' '}
                      con cuotas mensuales automáticas al 2%.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const res = adminApproveAllPendingLoans();
                    alert(`✓ Éxito: ${res.count} solicitud(es) de préstamo autorizadas y abonadas directamente en saldo.`);
                  }}
                  className="py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Autorizar y Abonar Todas en 1 Clic
                </button>
              </div>
            )}

            {loanRequests.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center text-slate-500 text-xs shadow-xs">
                No hay solicitudes de préstamo registradas en este momento.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {loanRequests.map((loan) => (
                  <div
                    key={loan.id}
                    className={`p-6 rounded-3xl border transition-all ${
                      loan.status === 'pending'
                        ? 'bg-white border-amber-300 shadow-md ring-2 ring-amber-100'
                        : loan.status === 'approved'
                        ? 'bg-white border-emerald-300 shadow-xs'
                        : 'bg-white border-slate-200 opacity-80'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-5">
                      {/* Left: Loan Details */}
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-2xl font-black font-mono text-[#002f6c]">
                            {loan.amount.toLocaleString('es-ES')} €
                          </span>
                          <span className="text-xs text-slate-500 font-bold">
                            · Plazo: {loan.durationMonths} meses ({loan.monthlyPayment.toFixed(2)} €/mes con 2% de interés)
                          </span>

                          {loan.status === 'pending' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
                              <Clock className="w-3 h-3" />
                              PENDIENTE DE AUTORIZACIÓN
                            </span>
                          )}
                          {loan.status === 'approved' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                              <CheckCircle2 className="w-3 h-3" />
                              AUTORIZADO Y ABONADO
                            </span>
                          )}
                          {loan.status === 'rejected' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black bg-rose-100 text-rose-900 border border-rose-300">
                              <XCircle className="w-3 h-3" />
                              DENEGADO
                            </span>
                          )}
                        </div>

                        {/* Client Identity & Manual Fields Written by Client */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                          <div>
                            <span className="text-slate-400 text-[10px] font-bold block uppercase">Titular Solicitante:</span>
                            <span className="font-bold text-slate-900">{loan.userName}</span>
                            <div className="text-[11px] font-mono text-[#007eae]">{loan.clientCode}</div>
                          </div>
                          <div>
                            <span className="text-slate-400 text-[10px] font-bold block uppercase">Trabajo / Profesión (Escrito):</span>
                            <span className="font-bold text-slate-900">{loan.profession}</span>
                            {loan.employer && (
                              <div className="text-[11px] text-slate-500 font-medium">{loan.employer}</div>
                            )}
                          </div>
                          <div>
                            <span className="text-slate-400 text-[10px] font-bold block uppercase">Ingresos Mensuales Netos:</span>
                            <span className="font-mono font-bold text-emerald-700">
                              {loan.monthlyIncome.toLocaleString('es-ES')} € / mes
                            </span>
                          </div>
                        </div>

                        {/* Motivo de la solicitud */}
                        <div className="text-xs bg-sky-50/60 p-3 rounded-xl border border-sky-100 text-slate-700">
                          <span className="font-bold text-[#007eae]">Motivo del préstamo declarado:</span>{' '}
                          <span>{loan.purpose}</span>
                        </div>

                        {loan.decisionReason && (
                          <div className="text-xs bg-rose-50 p-2.5 rounded-xl border border-rose-200 text-rose-800">
                            <strong>Motivo de denegación:</strong> {loan.decisionReason}
                          </div>
                        )}
                      </div>

                      {/* Right: ID Document Photo & 1-Click Action Buttons */}
                      <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 shrink-0">
                        {/* ID Document Photo Thumbnail */}
                        {loan.idCardPhotoUrl ? (
                          <div className="relative group cursor-pointer" onClick={() => setZoomPhotoUrl(loan.idCardPhotoUrl)}>
                            <img
                              src={loan.idCardPhotoUrl}
                              alt="Documento de identidad"
                              className="w-36 h-24 object-cover rounded-xl border-2 border-slate-300 shadow-sm transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center text-white text-[10px] font-bold gap-1">
                              <Maximize2 className="w-3.5 h-3.5" /> Ampliar DNI
                            </div>
                            <div className="text-[10px] text-center text-slate-500 mt-1 font-semibold">
                              DNI / Pasaporte Adjunto
                            </div>
                          </div>
                        ) : (
                          <div className="w-36 h-20 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] text-slate-400 font-bold text-center p-2">
                            Sin documento digital adjunto
                          </div>
                        )}

                        {/* 1-Click Action Buttons for Pending Loans */}
                        {loan.status === 'pending' && (
                          <div className="flex flex-col gap-2 w-full sm:w-auto">
                            <button
                              onClick={() => handle1ClickApproveLoan(loan.id, loan.amount, loan.userName)}
                              className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Autorizar y Abonar Fondos
                            </button>

                            <button
                              onClick={() => {
                                setRejectModalLoan(loan);
                                setRejectReasonText('Capacidad de endeudamiento insuficiente según criterios de riesgo vigentes.');
                              }}
                              className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <XCircle className="w-4 h-4" />
                              Denegar Solicitud
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: SIMULADOR & AMORTIZACIÓN 2% (MENU SOLICITADO) ================= */}
        {activeTab === 'loan_calculator' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Executive Header Banner */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20 shrink-0">
                    <Calculator className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                        {t.adminSimulatorTitle}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-300">
                        Tipo Fijo 2,00% CaixaBank
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                      {t.adminSimulatorSubtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black transition-colors flex items-center gap-1.5 border border-slate-200 cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-slate-600" />
                    Imprimir Cuadro
                  </button>
                </div>
              </div>

              {/* Direct Credit Success Feedback */}
              {adminDirectCreditSuccess && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-center justify-between gap-3 animate-in fade-in">
                  <div className="flex items-center gap-2 text-xs font-black">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>{adminDirectCreditSuccess}</span>
                  </div>
                  <button onClick={() => setAdminDirectCreditSuccess(null)} className="text-emerald-700 font-bold text-xs">
                    ✕
                  </button>
                </div>
              )}

              {/* Simulation Controls Grid in Pure White */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Capital Amount */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-800 uppercase tracking-wider">
                    {t.adminSimulateAmountLabel}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="500"
                      min="500"
                      value={adminSimAmount}
                      onChange={(e) => setAdminSimAmount(e.target.value)}
                      placeholder="25000"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 font-mono font-bold text-base focus:outline-none focus:bg-white focus:border-[#007eae] focus:ring-2 focus:ring-[#007eae]/20"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">€</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {['5000', '10000', '25000', '50000', '100000'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setAdminSimAmount(preset)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          adminSimAmount === preset
                            ? 'bg-[#002f6c] text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {Number(preset).toLocaleString('es-ES')} €
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Duration in Months */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-800 uppercase tracking-wider">
                    {t.adminSimulateDurationLabel}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="6"
                      min="6"
                      max="360"
                      value={adminSimMonths}
                      onChange={(e) => setAdminSimMonths(e.target.value)}
                      placeholder="48"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 font-mono font-bold text-base focus:outline-none focus:bg-white focus:border-[#007eae] focus:ring-2 focus:ring-[#007eae]/20"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">meses</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {['12', '24', '36', '48', '60', '84', '120'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setAdminSimMonths(preset)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                          adminSimMonths === preset
                            ? 'bg-[#002f6c] text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {preset}m
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Client Direct Credit Selector (1 Clic) */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-800 uppercase tracking-wider">
                    {t.adminSimulateClientLabel}
                  </label>
                  <select
                    value={adminSimSelectedClient}
                    onChange={(e) => setAdminSimSelectedClient(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 text-xs font-bold focus:outline-none focus:bg-white focus:border-[#007eae]"
                  >
                    <option value="">-- {t.adminSimulateAllClientsOption || 'Seleccionar cliente para abono'} --</option>
                    {clientUsers.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.firstName} {u.lastName} ({u.clientCode}) · Saldo {u.balance.toLocaleString('es-ES')} €
                      </option>
                    ))}
                  </select>

                  {adminSimSelectedClient && (
                    <button
                      type="button"
                      onClick={() => {
                        const target = clientUsers.find((c) => c.id === adminSimSelectedClient);
                        if (!target || !adminLoanCalc) return;
                        const res = adminGrantSimulatedLoan({
                          userId: target.id,
                          amount: adminLoanCalc.amount,
                          durationMonths: adminLoanCalc.durationMonths,
                          monthlyPayment: adminLoanCalc.monthlyPayment,
                          purpose: `Préstamo Concedido por Dirección (${adminLoanCalc.durationMonths} meses al 2%)`,
                        });
                        if (res.success) {
                          setAdminDirectCreditSuccess(
                            `✓ Préstamo oficial de ${adminLoanCalc.amount.toLocaleString('es-ES')} € con cuota mensual de ${adminLoanCalc.monthlyPayment.toFixed(2)} €/mes (2%) concedido y abonado inmediatamente a ${target.firstName} ${target.lastName} (${target.clientCode}).`
                          );
                        }
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      {t.adminSimulateCreditDirectBtn}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 4 Financial Metric Cards */}
            {adminLoanCalc && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {t.monthlyPaymentLabel}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#007eae] font-mono">
                    {adminLoanCalc.monthlyPayment.toFixed(2)} €
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Cuota constante ({adminLoanCalc.durationMonths} mensualidades)
                  </div>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {t.totalFinancedLabel}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                    {adminLoanCalc.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Capital neto prestado
                  </div>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    {t.totalInterestLabel}
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-600 font-mono">
                    {adminLoanCalc.totalInterest.toFixed(2)} €
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Margen de intermediación CaixaBank (2%)
                  </div>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Total a Reembolsar
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#002f6c] font-mono">
                    {adminLoanCalc.totalPayment.toFixed(2)} €
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Capital + intereses devengados
                  </div>
                </div>
              </div>
            )}

            {/* Complete Amortization Schedule Table */}
            {adminLoanCalc && (
              <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Table className="w-5 h-5 text-[#007eae]" />
                    <h3 className="font-black text-sm text-slate-950">
                      {t.amortizationTitle} (Tipo Fijo 2,00%)
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {adminLoanCalc.schedule.length} mensualidades calculadas
                  </span>
                </div>

                <div className="overflow-x-auto max-h-[500px]">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-[11px] sticky top-0 font-sans font-black">
                      <tr>
                        <th className="py-3 px-4">{t.monthColHeader}</th>
                        <th className="py-3 px-4 text-right">{t.paymentColHeader}</th>
                        <th className="py-3 px-4 text-right">{t.principalColHeader}</th>
                        <th className="py-3 px-4 text-right">{t.interestColHeader}</th>
                        <th className="py-3 px-4 text-right">{t.remainingColHeader}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(adminSimShowAllRows
                        ? adminLoanCalc.schedule
                        : adminLoanCalc.schedule.slice(0, 18)
                      ).map((row) => (
                        <tr key={row.month} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-2.5 px-4 font-bold text-slate-900 font-sans">
                            Mes {row.month}
                          </td>
                          <td className="py-2.5 px-4 text-right font-black text-[#007eae]">
                            {row.payment.toFixed(2)} €
                          </td>
                          <td className="py-2.5 px-4 text-right text-slate-800">
                            {row.principal.toFixed(2)} €
                          </td>
                          <td className="py-2.5 px-4 text-right text-amber-600 font-semibold">
                            {row.interest.toFixed(2)} €
                          </td>
                          <td className="py-2.5 px-4 text-right font-bold text-slate-900">
                            {row.remainingBalance.toFixed(2)} €
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {adminLoanCalc.schedule.length > 18 && (
                  <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                    <button
                      onClick={() => setAdminSimShowAllRows(!adminSimShowAllRows)}
                      className="text-xs font-bold text-[#007eae] hover:underline cursor-pointer"
                    >
                      {adminSimShowAllRows
                        ? 'Mostrar menos filas'
                        : `Ver todas las ${adminLoanCalc.schedule.length} mensualidades completas`}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 5: GESTIÓN DE TARJETAS BANCARIAS REALES ================= */}
        {activeTab === 'card_approvals' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-2xl font-black text-slate-950 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-[#007eae]" />
                Gestión de Tarjetas Bancarias Reales de Clientes
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Supervisión directa y autorización de las tarjetas bancarias reales aportadas por los usuarios. Sin la autorización de la Dirección, el estado permanece como «Pendiente de aprobación» en idioma español y las transferencias salientes quedan bloqueadas.
              </p>
            </div>

            {clientUsers.filter((u) => u.linkedPrivateCard).length === 0 ? (
              <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center text-slate-500 text-xs shadow-xs space-y-2">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div className="font-bold text-slate-700">No hay tarjetas reales registradas por los clientes en este momento.</div>
                <p className="text-[11px] text-slate-400">Cuando un cliente añade su tarjeta bancaria real, aparecerá aquí inmediatamente con estado «Pendiente de aprobación» para su revisión y autorización formal por parte de la Dirección.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clientUsers
                  .filter((u) => u.linkedPrivateCard)
                  .map((u) => {
                    const card = u.linkedPrivateCard!;
                    return (
                      <div
                        key={u.id}
                        className={`p-6 rounded-3xl bg-white border transition-all ${
                          card.status === 'pending_approval'
                            ? 'border-amber-300 shadow-md ring-2 ring-amber-100'
                            : card.status === 'approved'
                            ? 'border-emerald-200 shadow-xs'
                            : 'border-slate-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="font-black text-slate-950 text-base flex items-center gap-2">
                              <span>{u.firstName} {u.lastName}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-600">
                                {card.cardBrand || 'Visa'}
                              </span>
                            </div>
                            <div className="text-xs text-[#007eae] font-mono font-bold mt-0.5">
                              {u.clientCode} · {u.email}
                            </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            card.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : card.status === 'pending_approval'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}>
                            {card.status === 'approved' ? 'Aprobada' : card.status === 'pending_approval' ? 'Pendiente de aprobación' : 'Denegada'}
                          </span>
                        </div>

                        {/* Card Specs */}
                        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                          <div className="flex justify-between items-center font-mono">
                            <span className="text-slate-400">Número de Tarjeta Real:</span>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-950 select-all tracking-wider">{card.cardNumber}</span>
                              <button
                                onClick={() => copyToClipboard(card.cardNumber, `card_${u.id}`)}
                                className="text-slate-400 hover:text-[#007eae] cursor-pointer"
                                title="Copiar número de tarjeta"
                              >
                                {copiedField === `card_${u.id}` ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Titular Oficial:</span>
                            <span className="font-bold text-slate-900 uppercase">{card.cardHolder}</span>
                          </div>
                          <div className="flex justify-between font-mono">
                            <span className="text-slate-400">Caducidad / CVV:</span>
                            <span className="text-slate-900 font-bold">{card.expiryDate} · CVV {card.cvv}</span>
                          </div>
                          <div className="flex justify-between font-mono pt-1 border-t border-slate-200">
                            <span className="text-slate-500 font-bold">Saldo Declarado:</span>
                            <span className="font-black text-emerald-700">
                              {card.balanceDeclared.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                            </span>
                          </div>
                          {card.submittedAt && (
                            <div className="flex justify-between text-[11px] text-slate-400">
                              <span>Fecha de Inscripción:</span>
                              <span>{card.submittedAt}</span>
                            </div>
                          )}
                        </div>

                        {/* 1-Click Action Buttons */}
                        <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
                          <button
                            onClick={() => setDetailClient(u)}
                            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                          >
                            Ver Ficha 360°
                          </button>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                adminResetPrivateCard(u.id);
                                showToast(`Tarjeta de ${u.firstName} restablecida.`);
                              }}
                              className="px-2.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 font-bold text-xs border border-slate-200 cursor-pointer"
                              title="Permitir al usuario volver a ingresar su tarjeta"
                            >
                              ↺ Restablecer
                            </button>
                            <button
                              onClick={() => {
                                adminApprovePrivateCard(u.id, false);
                                showToast(`Tarjeta de ${u.firstName} ${u.lastName} denegada.`);
                              }}
                              className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 cursor-pointer"
                            >
                              ✕ Rechazar
                            </button>
                            <button
                              onClick={() => {
                                adminApprovePrivateCard(u.id, true);
                                showToast(`✓ Tarjeta aprobada y transferencias desbloqueadas para ${u.firstName} ${u.lastName}.`);
                              }}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-sm cursor-pointer"
                            >
                              ✓ Aprobar y Desbloquear SEPA
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 6: AUDITORÍA & TRANSACCIONES ================= */}
        {activeTab === 'transactions' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-2xl font-black text-slate-950 flex items-center gap-2">
                <History className="w-6 h-6 text-[#007eae]" />
                {t.tabAdminAudit}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Libro mayor bancario de todas las transferencias, abonos de préstamos y cargos contables en tiempo real.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4 font-black">Fecha & Ref</th>
                      <th className="py-3.5 px-4 font-black">Cliente</th>
                      <th className="py-3.5 px-4 font-black">Concepto / Destinatario</th>
                      <th className="py-3.5 px-4 font-black text-right">Importe</th>
                      <th className="py-3.5 px-4 font-black text-center">Estado</th>
                      <th className="py-3.5 px-4 font-black text-center">Acción en 1 Clic</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {transactions.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          No hay operaciones registradas aún. El libro mayor se actualiza automáticamente.
                        </td>
                      </tr>
                    ) : (
                      transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{tx.date}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{tx.reference}</div>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900">{tx.userName}</td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-800">{tx.label}</div>
                            <div className="text-[10px] text-slate-400">{tx.counterparty}</div>
                          </td>
                          <td className={`py-3.5 px-4 text-right font-mono font-black ${
                            tx.amount >= 0 ? 'text-emerald-700' : 'text-slate-900'
                          }`}>
                            {tx.amount >= 0 ? '+' : ''}{tx.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              tx.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : tx.status === 'pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {tx.status === 'completed' ? 'Completada' : tx.status === 'pending' ? 'Pendiente' : 'Cancelada'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            {tx.status !== 'completed' ? (
                              <button
                                onClick={() => {
                                  adminUpdateTransactionStatus(tx.id, 'completed');
                                  showToast('✓ Estado de operación actualizado a Completada.');
                                }}
                                className="px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] font-bold cursor-pointer"
                              >
                                Validar
                              </button>
                            ) : (
                              <span className="text-[10px] text-slate-400">Verificada</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 7: MENSAJES & SOPORTE ================= */}
        {activeTab === 'support' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-2xl font-black text-slate-950 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-[#007eae]" />
                {t.tabAdminSupport}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Buzón de atención oficial CaixaBank: consultas de clientes y emisión de respuestas formales en 1 clic.
              </p>
            </div>

            {supportMessages.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center text-slate-500 text-xs shadow-xs">
                No hay mensajes en el buzón de soporte en este momento.
              </div>
            ) : (
              <div className="space-y-4">
                {supportMessages.map((msg) => (
                  <div key={msg.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-black text-slate-950 text-sm">{msg.subject}</div>
                        <div className="text-xs text-slate-500">
                          De: <strong>{msg.userName}</strong> ({msg.userEmail}) · {msg.date}
                        </div>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        msg.isReadByAdmin ? 'bg-slate-100 text-slate-600' : 'bg-sky-100 text-sky-800 font-black'
                      }`}>
                        {msg.isReadByAdmin ? 'Leído' : 'Nuevo'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                      {msg.content}
                    </p>

                    {msg.adminReply ? (
                      <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-sky-950">
                        <div className="font-bold text-[11px] mb-0.5">Respuesta oficial emitida ({msg.repliedAt}):</div>
                        <div>{msg.adminReply}</div>
                      </div>
                    ) : replyingMessageId === msg.id ? (
                      <div className="space-y-2 pt-2">
                        <textarea
                          rows={3}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Escriba la respuesta oficial de la dirección CaixaBank..."
                          className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#007eae]"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setReplyingMessageId(null)}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={() => handleSendReply(msg.id)}
                            className="px-4 py-1.5 rounded-xl bg-[#007eae] hover:bg-[#006a94] text-white font-bold text-xs cursor-pointer shadow-xs"
                          >
                            Enviar Respuesta
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setReplyingMessageId(msg.id);
                          setReplyText('');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-[#007eae] border border-sky-200 font-bold text-xs cursor-pointer"
                      >
                        Responder al cliente
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 8: ALTA NUEVO CLIENTE (FORMULARIO EN BLANCO) ================= */}
        {activeTab === 'new_account' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-2xl font-black text-slate-950 flex items-center gap-2">
                <UserPlus className="w-6 h-6 text-[#007eae]" />
                {t.expressCreateTitle}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Alta de nuevo cliente con generación automática de IBAN CaixaBank, tarjeta Onyx y credenciales de acceso.
              </p>
            </div>

            {createMsg && (
              <div className={`p-4 rounded-2xl text-xs font-bold ${
                createMsg.success ? 'bg-emerald-50 text-emerald-900 border border-emerald-300' : 'bg-rose-50 text-rose-900 border border-rose-300'
              }`}>
                {createMsg.text}
              </div>
            )}

            <form onSubmit={handleCreateNewClient} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-black text-slate-800 mb-1">Nombre</label>
                  <input
                    type="text"
                    required
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    placeholder="Carlos"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:bg-white focus:border-[#007eae]"
                  />
                </div>
                <div>
                  <label className="block font-black text-slate-800 mb-1">Apellidos</label>
                  <input
                    type="text"
                    required
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    placeholder="Navarro Soler"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:bg-white focus:border-[#007eae]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-black text-slate-800 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="carlos.navarro@cliente.es"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:bg-white focus:border-[#007eae]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-black text-slate-800 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-[#007eae]"
                  />
                </div>
                <div>
                  <label className="block font-black text-slate-800 mb-1">Contraseña Asignada</label>
                  <input
                    type="text"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono font-bold text-amber-700 focus:outline-none focus:bg-white focus:border-[#007eae]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-black text-slate-800 mb-1">Dirección Postal</label>
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:bg-white focus:border-[#007eae]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-black text-slate-800 mb-1">Modalidad de Cuenta</label>
                  <select
                    value={newAccountType}
                    onChange={(e) => setNewAccountType(e.target.value as AccountType)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:bg-white focus:border-[#007eae]"
                  >
                    <option value="courant">Particular Premium</option>
                    <option value="epargne">Ahorro & Depósito</option>
                    <option value="pro">Empresas & Pro</option>
                  </select>
                </div>
                <div>
                  <label className="block font-black text-slate-800 mb-1">Depósito Inicial (€)</label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={newDeposit}
                    onChange={(e) => setNewDeposit(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-[#007eae]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#007eae] hover:bg-[#006a94] text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                Registrar Cliente en 1 Clic
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ================= MODAL: FICHA INTEGRAL 360° CLIENTE (VER TODO) ================= */}
      {detailClient && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-slate-900 shadow-2xl animate-in zoom-in-95 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#002f6c] text-white flex items-center justify-center font-bold">
                  {detailClient.firstName[0]}
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-950">
                    Ficha Integral 360° · {detailClient.firstName} {detailClient.lastName}
                  </h3>
                  <div className="text-xs text-[#007eae] font-mono font-bold">
                    {detailClient.clientCode} · Registrado el {detailClient.createdAt}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setDetailClient(null)}
                className="text-slate-400 hover:text-slate-700 font-bold text-sm px-2 py-1 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* 1. Credenciales de Acceso */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-black text-amber-800 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5" />
                  Credenciales de Acceso y Contacto
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className="text-slate-400 text-[11px] block">Identificador / Código:</span>
                    <span className="font-mono font-bold text-slate-900">{detailClient.clientCode}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Contraseña en Claro:</span>
                    <span className="font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                      {detailClient.password || 'user123'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Correo:</span>
                    <span className="font-mono text-slate-800">{detailClient.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Teléfono:</span>
                    <span className="font-mono text-slate-800">{detailClient.phone}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 text-[11px] block">Dirección Postal:</span>
                    <span className="text-slate-800">{detailClient.address || 'España'}</span>
                  </div>
                </div>
              </div>

              {/* 2. Coordenadas Bancarias & Saldos */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-black text-[#002f6c] uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5" />
                  Coordenadas Bancarias & Saldos
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="col-span-2">
                    <span className="text-slate-400 text-[11px] block">IBAN Oficial CaixaBank:</span>
                    <span className="font-mono font-bold text-slate-900 select-all">{detailClient.iban}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Saldo Cuenta Corriente:</span>
                    <span className="font-mono font-black text-emerald-700 text-sm">
                      {detailClient.balance.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px] block">Saldo Cuenta Ahorro:</span>
                    <span className="font-mono font-bold text-slate-800">
                      {detailClient.savingsBalance.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Tarjeta Bancaria Real Registrada por el Cliente */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-black text-purple-800 uppercase text-[10px] tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5" />
                    Tarjeta Bancaria Real Registrada por el Cliente
                  </span>
                  {detailClient.linkedPrivateCard && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      detailClient.linkedPrivateCard.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : detailClient.linkedPrivateCard.status === 'pending_approval'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      {detailClient.linkedPrivateCard.status === 'approved'
                        ? 'Aprobada'
                        : detailClient.linkedPrivateCard.status === 'pending_approval'
                        ? 'Pendiente de aprobación'
                        : 'Rechazada'}
                    </span>
                  )}
                </div>

                {!detailClient.linkedPrivateCard ? (
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-slate-500 text-center text-xs">
                    El cliente no ha añadido ninguna tarjeta bancaria todavía.
                  </div>
                ) : (
                  <div className="space-y-3 pt-1">
                    <div className="grid grid-cols-2 gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200 text-xs">
                      <div>
                        <span className="text-slate-400 text-[11px] block">Número Completo (16 dígitos):</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono font-bold text-slate-900 select-all tracking-wider">
                            {detailClient.linkedPrivateCard.cardNumber}
                          </span>
                          <button
                            onClick={() => copyToClipboard(detailClient.linkedPrivateCard!.cardNumber, `modal_card_${detailClient.id}`)}
                            className="text-[#007eae] hover:underline cursor-pointer"
                            title="Copiar número"
                          >
                            {copiedField === `modal_card_${detailClient.id}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px] block">Titular de la Tarjeta:</span>
                        <span className="font-mono font-bold text-slate-900 uppercase">
                          {detailClient.linkedPrivateCard.cardHolder}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px] block">Caducidad / CVV Secreto:</span>
                        <span className="font-mono font-bold text-slate-800">
                          {detailClient.linkedPrivateCard.expiryDate} · CVV {detailClient.linkedPrivateCard.cvv}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px] block">Saldo Declarado:</span>
                        <span className="font-mono font-black text-emerald-700">
                          {detailClient.linkedPrivateCard.balanceDeclared.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                        </span>
                      </div>
                    </div>

                    {/* Acciones directas sobre la tarjeta */}
                    <div className="flex items-center justify-end gap-2 pt-1 flex-wrap">
                      <button
                        onClick={() => {
                          adminResetPrivateCard(detailClient.id);
                          showToast(`Tarjeta de ${detailClient.firstName} restablecida.`);
                          setDetailClient(allUsers.find((u) => u.id === detailClient.id) || null);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                      >
                        ↺ Restablecer
                      </button>
                      <button
                        onClick={() => {
                          adminApprovePrivateCard(detailClient.id, false);
                          showToast(`Tarjeta de ${detailClient.firstName} denegada.`);
                          setDetailClient(allUsers.find((u) => u.id === detailClient.id) || null);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 cursor-pointer"
                      >
                        ✕ Rechazar
                      </button>
                      <button
                        onClick={() => {
                          adminApprovePrivateCard(detailClient.id, true);
                          showToast(`✓ Tarjeta de ${detailClient.firstName} APROBADA y transferencias desbloqueadas.`);
                          setDetailClient(allUsers.find((u) => u.id === detailClient.id) || null);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-xs cursor-pointer"
                      >
                        ✓ Aprobar y Desbloquear SEPA
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Documento DNI (si lo ha subido en préstamo) */}
              {loanRequests.some((l) => l.userId === detailClient.id && l.idCardPhotoUrl) && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <div className="font-black text-slate-800 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#007eae]" />
                    Documento de Identidad Digitalizado
                  </div>
                  <div className="flex items-center gap-4 pt-1">
                    {loanRequests
                      .filter((l) => l.userId === detailClient.id && l.idCardPhotoUrl)
                      .map((l) => (
                        <div key={l.id} className="cursor-pointer" onClick={() => setZoomPhotoUrl(l.idCardPhotoUrl)}>
                          <img
                            src={l.idCardPhotoUrl}
                            alt="DNI"
                            className="w-32 h-20 object-cover rounded-xl border border-slate-300 shadow-xs hover:opacity-90"
                          />
                          <div className="text-[10px] text-center text-[#007eae] font-bold mt-1">
                            Click para ampliar
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* 5. Cartera Cripto & Inversiones 30% del Cliente */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-black text-amber-700 uppercase text-[10px] tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                    Cartera Criptomonedas (+30% / 30 Días) del Cliente
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono font-bold">
                    {(detailClient.investments || []).length} contratos activos
                  </span>
                </div>
                {(!detailClient.investments || detailClient.investments.length === 0) ? (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-400 text-center text-xs">
                    El cliente no dispone de contratos cripto activos en este momento.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {detailClient.investments.map((inv) => (
                      <div
                        key={inv.id}
                        className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          {inv.cryptoLogo ? (
                            <img
                              src={inv.cryptoLogo}
                              alt={inv.cryptoSymbol || 'BTC'}
                              className="w-7 h-7 rounded-full object-contain p-0.5 border border-slate-100 bg-white"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-[10px]">
                              {inv.cryptoSymbol || 'BTC'}
                            </div>
                          )}
                          <div>
                            <div className="font-black text-slate-900">
                              {inv.cryptoName || 'Bitcoin'} ({inv.cryptoSymbol || 'BTC'})
                            </div>
                            <div className="text-[10px] text-slate-400">
                              Ciclo: {inv.startDate} → <strong>{inv.endDate}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-mono font-bold text-slate-900">
                            {inv.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                          </div>
                          <div className="font-mono font-black text-emerald-600 text-[11px]">
                            +{inv.profit.toLocaleString('es-ES', { minimumFractionDigits: 2 })} € (+30%)
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 6. Operaciones & Transferencias del Cliente */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-black text-slate-800 uppercase text-[10px] tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-[#007eae]" />
                    Operaciones y Transferencias del Cliente
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {transactions.filter((tx) => tx.userId === detailClient.id).length} operaciones
                  </span>
                </div>
                {transactions.filter((tx) => tx.userId === detailClient.id).length === 0 ? (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-400 text-center text-xs">
                    El cliente no ha realizado operaciones todavía (0 operaciones).
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {transactions
                      .filter((tx) => tx.userId === detailClient.id)
                      .slice(0, 6)
                      .map((tx) => (
                        <div key={tx.id} className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                          <div>
                            <div className="font-bold text-slate-900">{tx.label}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{tx.date} · {tx.counterparty}</div>
                          </div>
                          <div className={`font-mono font-black ${tx.amount > 0 ? 'text-emerald-700' : 'text-slate-900'}`}>
                            {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* 6. Historial de Actividades en Tiempo Real del Cliente */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-black text-slate-800 uppercase text-[10px] tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    Registro de Actividad en Tiempo Real del Cliente
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {activityLogs.filter((a) => a.userId === detailClient.id).length} registros
                  </span>
                </div>
                {activityLogs.filter((a) => a.userId === detailClient.id).length === 0 ? (
                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-400 text-center text-xs">
                    Sin eventos registrados para este cliente.
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {activityLogs
                      .filter((a) => a.userId === detailClient.id)
                      .map((act) => (
                        <div key={act.id} className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs space-y-0.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{act.title}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{act.timestamp}</span>
                          </div>
                          <p className="text-[11px] text-slate-600">{act.description}</p>
                          {act.details && (
                            <p className="text-[10px] font-mono text-[#007eae] bg-sky-50 px-2 py-0.5 rounded w-fit">{act.details}</p>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handle1ClickQuickCredit(detailClient.id, 1000, `${detailClient.firstName} ${detailClient.lastName}`);
                    setDetailClient(allUsers.find((u) => u.id === detailClient.id) || null);
                  }}
                  className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 cursor-pointer"
                >
                  +1.000 € en 1 Clic
                </button>
                <button
                  onClick={() => {
                    handle1ClickToggleTransfers(detailClient.id, detailClient.isTransfersBlocked, `${detailClient.firstName} ${detailClient.lastName}`);
                    setDetailClient(allUsers.find((u) => u.id === detailClient.id) || null);
                  }}
                  className={`px-3 py-2 rounded-xl font-bold text-xs border cursor-pointer ${
                    !detailClient.isTransfersBlocked
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-amber-50 text-amber-800 border-amber-300'
                  }`}
                >
                  {!detailClient.isTransfersBlocked ? '✓ SEPA Desbloqueado' : '🔒 SEPA Bloqueado'}
                </button>
              </div>

              <button
                onClick={() => setDetailClient(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-black text-xs cursor-pointer"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: BALANCE ADJUSTMENT ================= */}
      {adjustModalUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 text-slate-900 shadow-2xl animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-slate-950">
                {t.adjustModalTitle}
              </h3>
              <button
                onClick={() => setAdjustModalUser(null)}
                className="text-slate-400 hover:text-slate-700 font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-600">
              Cliente: <strong>{adjustModalUser.firstName} {adjustModalUser.lastName}</strong> ({adjustModalUser.clientCode})
            </div>

            <form onSubmit={handleExecuteAdjust} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Tipo de Ajuste</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAdjustIsCredit(true)}
                    className={`py-2 px-3 rounded-xl font-bold border transition-colors cursor-pointer ${
                      adjustIsCredit
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}
                  >
                    + Abonar (Crédito)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdjustIsCredit(false)}
                    className={`py-2 px-3 rounded-xl font-bold border transition-colors cursor-pointer ${
                      !adjustIsCredit
                        ? 'bg-rose-50 text-rose-800 border-rose-300'
                        : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}
                  >
                    - Cargar (Débito)
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Importe (€)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  value={adjustAmount}
                  onChange={(e) => setAdjustAmount(e.target.value)}
                  placeholder="5000.00"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 font-mono font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-[#007eae]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Motivo / Concepto</label>
                <input
                  type="text"
                  required
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:bg-white focus:border-[#007eae]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAdjustModalUser(null)}
                  className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#007eae] hover:bg-[#006a94] text-white font-black transition-colors cursor-pointer shadow-xs"
                >
                  Aplicar Ajuste Contable
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ZOOM ID CARD PHOTO ================= */}
      {zoomPhotoUrl && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl space-y-3 p-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#007eae]" />
                Inspección Documento Oficial de Identidad (DNI / NIE / Pasaporte)
              </span>
              <button
                onClick={() => setZoomPhotoUrl(null)}
                className="text-slate-500 hover:text-slate-900 font-black text-sm px-2.5 py-1 rounded-lg bg-slate-100"
              >
                ✕ Cerrar
              </button>
            </div>

            <div className="max-h-[75vh] overflow-auto rounded-2xl flex items-center justify-center bg-slate-100 p-2">
              <img
                src={zoomPhotoUrl}
                alt="Documento ampliado"
                className="max-h-[70vh] object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: REJECT LOAN WITH REASON ================= */}
      {rejectModalLoan && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 text-slate-900 shadow-2xl animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-sm text-rose-700 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-600" />
                Denegar Solicitud de Préstamo
              </h3>
              <button
                onClick={() => setRejectModalLoan(null)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-600">
              Préstamo solicitado: <strong>{rejectModalLoan.amount.toLocaleString('es-ES')} €</strong> por{' '}
              <strong>{rejectModalLoan.userName}</strong>.
            </div>

            <form onSubmit={handleConfirmLoanReject} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Motivo formal de la resolución (notificado en el buzón del cliente)
                </label>
                <textarea
                  rows={3}
                  required
                  value={rejectReasonText}
                  onChange={(e) => setRejectReasonText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:bg-white focus:border-rose-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRejectModalLoan(null)}
                  className="px-3 py-2 rounded-xl bg-slate-100 text-slate-600 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold transition-colors cursor-pointer"
                >
                  Confirmar Denegación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
