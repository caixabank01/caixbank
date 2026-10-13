export type UserRole = 'user' | 'admin';

export type AccountType = 'courant' | 'epargne' | 'pro';

export type AccountStatus = 'active' | 'frozen' | 'pending_verification';

export interface BankCard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  pin: string;
  isFrozen: boolean;
  contactlessEnabled: boolean;
  monthlyLimit: number;
  spentThisMonth: number;
  type: 'visa_infinite' | 'mastercard_black' | 'virtual';
}

export interface LinkedPrivateCard {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  cardBrand?: string;
  balanceDeclared: number;
  status: 'not_linked' | 'pending_approval' | 'approved' | 'rejected';
  submittedAt?: string;
  approvedAt?: string;
  rejectedReason?: string;
}

export interface UserActivityLog {
  id: string;
  userId: string;
  userName: string;
  clientCode: string;
  action:
    | 'register'
    | 'card_submitted'
    | 'card_approved'
    | 'card_rejected'
    | 'loan_requested'
    | 'transfer_sent'
    | 'profile_updated'
    | 'support_message'
    | 'balance_adjusted';
  title: string;
  description: string;
  timestamp: string;
  details?: string;
}

export interface Investment30D {
  id: string;
  amount: number;
  rate: number; // 0.20
  profit: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
}

export interface LoanRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  clientCode: string;
  amount: number;
  durationMonths: number;
  monthlyPayment: number;
  purpose: string;
  profession: string; // Manually typed profession/work
  employer?: string; // Manually typed employer/contract
  monthlyIncome: number;
  idCardPhotoUrl: string; // Base64 or image URL
  idCardFileName?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  decidedAt?: string;
  decisionReason?: string;
}

export interface BankUser {
  id: string;
  clientCode: string; // e.g. CLI-881290
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  accountType: AccountType;
  accountNumber: string;
  iban: string;
  bic: string;
  balance: number; // Solde courant / Cuenta Gastos
  savingsBalance: number; // Solde épargne
  status: AccountStatus;
  verificationLevel: number; // e.g. 3
  isTransfersBlocked: boolean; // transfers blocked until private card approved
  linkedPrivateCard?: LinkedPrivateCard;
  investments: Investment30D[];
  card?: BankCard;
  createdAt: string;
  avatarUrl?: string;
  password?: string; // Stored password, fully accessible to administrator
  address?: string;
}

export type TransactionType =
  | 'transfer_out'
  | 'transfer_in'
  | 'card_payment'
  | 'atm_withdrawal'
  | 'salary'
  | 'internal_transfer'
  | 'admin_adjustment'
  | 'investment_deposit'
  | 'loan_disbursement'
  | 'bizum';

export type TransactionStatus = 'completed' | 'pending' | 'flagged' | 'cancelled';

export interface BankTransaction {
  id: string;
  userId: string;
  userName: string;
  type: TransactionType;
  amount: number; // Positive for credits, negative for debits
  label: string;
  counterparty: string;
  counterpartyIban?: string;
  category: 'Alimentation' | 'Salaire' | 'Virement' | 'Loisirs' | 'Services' | 'Épargne' | 'Gestion' | 'Ajuste' | 'Prêt';
  date: string;
  status: TransactionStatus;
  reference: string;
  accountSource: 'courant' | 'epargne';
}

export interface SupportMessage {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  content: string;
  date: string;
  isReadByAdmin: boolean;
  adminReply?: string;
  repliedAt?: string;
}
