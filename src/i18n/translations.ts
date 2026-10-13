export type Language = 'es' | 'en' | 'de' | 'it' | 'fr';

export interface Translations {
  // Common
  brandName: string;
  brandTagline: string;
  fluxEnDirect: string;
  fluxSampleText: string;
  portalSecure: string;
  connectedSpace: string;
  adminSpace: string;
  clientSpace: string;
  activeClient: string;
  activeAdmin: string;
  switchAccount: string;
  clientsLabel: string;
  adminLabel: string;
  logout: string;
  activeBadge: string;
  close: string;
  cancel: string;
  confirm: string;
  copied: string;
  copy: string;
  error: string;
  acprNotice: string;
  fgdrNotice: string;
  aesNotice: string;
  footerRights: string;
  footerCompliance: string;

  // Auth Page
  loginTab: string;
  registerTab: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  cardPerksTitle: string;
  cardPerksDesc: string;
  fgdrLimit: string;
  zeroFees: string;
  instantSepa: string;
  quickAccessTitle: string;
  demoClientBtn: string;
  demoClientSub: string;
  demoAdminBtn: string;
  demoAdminSub: string;
  loginTitle: string;
  loginSubtitle: string;
  emailLabel: string;
  passwordLabel: string;
  passwordHelp: string;
  testProfiles: string;
  loginBtn: string;
  noAccountPrompt: string;
  openAccountLink: string;
  alreadyClientPrompt: string;
  loginLink: string;

  // Register Page
  regTitle: string;
  regSubtitle: string;
  firstNameLabel: string;
  lastNameLabel: string;
  phoneLabel: string;
  initialDepositLabel: string;
  accountFormulaLabel: string;
  personalPlan: string;
  savingsPlan: string;
  businessPlan: string;
  passwordConfirmLabel: string;
  termsConsent: string;
  openAccountBtn: string;
  generatingIban: string;

  // User Space Nav
  navHome: string;
  navTransfers: string;
  navLoans: string;
  navCrypto30D: string;
  navCards: string;
  navProfile: string;

  // User Space Home
  bannerLinkCardTitle: string;
  bannerLinkCardDesc: string;
  bannerLinkCardBtn: string;
  quickBizum: string;
  quickTransfer: string;
  quickBills: string;
  quickInvest: string;
  cuentasTitle: string;
  viewAll: string;
  cuentaGastos: string;
  recentAdjustmentText: string;

  // User Space Transfers & Restricted state
  transferBlockedTitle: string;
  caixabankSecurityBadge: string;
  transferBlockedDesc: string;
  transferBlockedNote: string;
  minBalanceMandatory: string;
  linkPrivateCardBtn: string;
  newSepaTransferTitle: string;
  availableLabel: string;
  recipientNameLabel: string;
  recipientNamePlaceholder: string;
  recipientIbanLabel: string;
  recipientIbanPlaceholder: string;
  transferAmountLabel: string;
  sendTransferBtn: string;
  transferSuccessMsg: string;

  // Loan Request Tab
  loanTitle: string;
  loanSubtitle: string;
  loanAmountLabel: string;
  loanDurationLabel: string;
  loanPurposeLabel: string;
  loanMonthlyIncomeLabel: string;
  loanIdPhotoLabel: string;
  loanIdPhotoHelp: string;
  loanSubmitBtn: string;
  loanPendingBanner: string;
  loanApprovedStatus: string;
  loanRejectedStatus: string;
  loanPendingStatus: string;
  loanHistoryTitle: string;
  loanQuickApply: string;

  // Manual Loan Form Specifics
  loanManualFileTitle: string;
  loanManualFileSubtitle: string;
  loanAmountFieldLabel: string;
  loanAmountFieldPlaceholder: string;
  loanDurationFieldLabel: string;
  loanDurationFieldPlaceholder: string;
  loanProfessionFieldLabel: string;
  loanProfessionFieldPlaceholder: string;
  loanEmployerFieldLabel: string;
  loanEmployerFieldPlaceholder: string;
  loanIncomeFieldLabel: string;
  loanIncomeFieldPlaceholder: string;
  loanPurposeFieldLabel: string;
  loanPurposeFieldPlaceholder: string;
  loanPhotoUploadTitle: string;
  loanPhotoUploadSubtitle: string;
  loanPhotoUploadDropText: string;
  loanPhotoUploadChangeBtn: string;
  loanAdminNoticeText: string;
  loanSubmitDirectionBtn: string;

  // 30D Investment Tab
  invest30DTitle: string;
  invest30DSubtitle: string;
  fixedReturnBadge: string;
  fixedReturnRate: string;
  fixedReturnDays: string;
  simulatorTitle: string;
  balanceInAccount: string;
  capitalToInvestLabel: string;
  initialCapitalLabel: string;
  guaranteedNetProfitLabel: string;
  investContractBtn: string;
  investSuccessMsg: string;

  // Cards Tab
  cardsTitle: string;
  cardsSubtitle: string;
  showCardNumber: string;
  hideCardNumber: string;
  showCvv: string;
  hideCvv: string;
  showPin: string;
  hidePin: string;
  yourPinCode: string;
  securityControlsTitle: string;
  emergencyLockTitle: string;
  emergencyLockDescActive: string;
  emergencyLockDescLocked: string;
  lockBtn: string;
  unlockBtn: string;
  contactlessTitle: string;
  contactlessDesc: string;
  monthlyLimitTitle: string;
  monthlyLimitSpent: string;

  // Profile Tab
  profileTitle: string;
  profileSubtitle: string;
  accountIdentifierLabel: string;
  verificationStatusLabel: string;
  verificationLevelText: string;
  securityNoticeText: string;
  bankingInfoTitle: string;
  officialIbanLabel: string;
  bankEntityLabel: string;
  accountHolderLabel: string;

  // Modal Link Private Card
  modalLinkCardTitle: string;
  modalLinkCardDesc: string;
  cardNumberLabel: string;
  cardExpiryLabel: string;
  cardCvvLabel: string;
  cardHolderLabel: string;
  declaredBalanceLabel: string;
  submitCardForApprovalBtn: string;
  cardSubmittedMsg: string;

  // Admin Tab
  adminConsoleTitle: string;
  adminRoleSubtitle: string;
  resetDemoBtn: string;
  resetDemoConfirm: string;
  tabAdminOverview: string;
  tabAdminClients: string;
  tabAdminLoans: string;
  tabAdminCardApprovals: string;
  tabAdminAudit: string;
  tabAdminSupport: string;
  tabAdminCreate: string;
  totalDepositsKpi: string;
  activeClientsKpi: string;
  transactionsVolumeKpi: string;
  clientManagementTitle: string;
  clientManagementSubtitle: string;
  createNewAccountBtn: string;
  searchClientsPlaceholder: string;
  adjustModalTitle: string;
  auditTitle: string;
  auditSubtitle: string;
  supportAdminTitle: string;
  supportAdminSubtitle: string;
  expressCreateTitle: string;
  expressCreateSubtitle: string;
  approveCardBtn: string;
  rejectCardBtn: string;
  cardApprovalBadgePending: string;
  cardApprovalBadgeApproved: string;
  noPendingCards: string;
  adminApproveAndCredit: string;
  adminRejectLoan: string;
  adminClientPasswords: string;

  // Amortization & 2% Loan Calculator
  amortizationTitle: string;
  amortizationSubtitle: string;
  bankRate2PercentBadge: string;
  monthlyPaymentLabel: string;
  principalAmortizedLabel: string;
  bankInterestLabel: string;
  remainingBalanceLabel: string;
  monthColHeader: string;
  paymentColHeader: string;
  principalColHeader: string;
  interestColHeader: string;
  remainingColHeader: string;
  totalInterestLabel: string;
  totalFinancedLabel: string;
  showAllRows: string;
  showFewerRows: string;

  // Admin Loan Calculator Simulator
  tabAdminSimulator: string;
  adminSimulatorTitle: string;
  adminSimulatorSubtitle: string;
  adminSimulateAmountLabel: string;
  adminSimulateDurationLabel: string;
  adminSimulateClientLabel: string;
  adminSimulateAllClientsOption: string;
  adminSimulateCreditDirectBtn: string;
  adminSimulateCreditDirectSuccess: string;
  adminSimulateScheduleTitle: string;
  adminSimulateScheduleSubtitle: string;
  adminSimulatePrintBtn: string;
}

const baseEs: Translations = {
  brandName: 'CaixaBank',
  brandTagline: 'Banca Privada y Digital',
  fluxEnDirect: 'ACTIVIDAD EN DIRECTO',
  fluxSampleText: 'CLI-***309 +7800,00 €',

  portalSecure: 'Acceso Seguro Clientes',
  connectedSpace: 'Espacio CaixaBank',
  adminSpace: 'Consola de Administración',
  clientSpace: 'Área Cliente CaixaBank',
  activeClient: 'Cliente Activo',
  activeAdmin: 'Dirección CaixaBank',
  switchAccount: 'Mi Cuenta',
  clientsLabel: 'Clientes Particulares & Pro',
  adminLabel: 'Dirección General',
  logout: 'Cerrar Sesión',
  activeBadge: 'Activo',
  close: 'Cerrar',
  cancel: 'Cancelar',
  confirm: 'Confirmar',
  copied: '¡Copiado!',
  copy: 'Copiar',
  error: 'Se ha producido un error imprevisto.',
  acprNotice: 'Supervisado por el Banco de España y el BCE',
  fgdrNotice: 'Depósitos garantizados hasta 100.000 € por titular (FGD)',
  aesNotice: 'Conexión cifrada de alta seguridad SSL/TLS AES-256',
  footerRights: '© 2026 CaixaBank, S.A. Todos los derechos reservados.',
  footerCompliance: 'Entidad de crédito supervisada por el Banco de España con código de entidad 2100.',

  loginTab: 'Iniciar Sesión',
  registerTab: 'Abrir Cuenta',
  heroBadge: 'CaixaBank Banca Privada & Digital',
  heroTitle: 'La excelencia financiera a su medida.',
  heroSubtitle: 'Gestione su patrimonio con máxima seguridad, transferencias inmediatas y la solidez del primer grupo bancario de España.',
  cardPerksTitle: 'Tarjeta CaixaBank Metal Onyx',
  cardPerksDesc: 'Límite flexible, retiradas globales sin comisiones y coberturas de seguros premium incluidas.',
  fgdrLimit: '100.000 €',
  zeroFees: 'Únicamente 2% Comisión Bancaria',
  instantSepa: 'SEPA Instantáneo',
  quickAccessTitle: 'Acceso Rápido CaixaBank',
  demoClientBtn: 'Acceso Cliente Alexandre Reed',
  demoClientSub: 'CLI-881290 · Saldo 5.494,20 €',
  demoAdminBtn: 'Acceso Dirección General',
  demoAdminSub: 'Identificador y credenciales confidenciales',
  loginTitle: 'Conexión a CaixaBank',
  loginSubtitle: 'Introduzca su identificador / correo / código cliente y su contraseña',
  emailLabel: 'Identificador / Correo Electrónico / Código Cliente',
  passwordLabel: 'Contraseña',
  passwordHelp: 'Mínimo 6 caracteres con cifrado bancario',
  testProfiles: 'Perfiles demostrativos listos en 1 clic',
  loginBtn: 'Entrar en mi cuenta',
  noAccountPrompt: '¿Aún no es cliente de CaixaBank?',
  openAccountLink: 'Abrir una cuenta en 2 minutos',
  alreadyClientPrompt: '¿Ya tiene cuenta en CaixaBank?',
  loginLink: 'Inicie sesión aquí',

  regTitle: 'Solicitud de Apertura de Cuenta',
  regSubtitle: 'Complete sus datos para obtener su IBAN CaixaBank y su tarjeta en unos instantes.',
  firstNameLabel: 'Nombre',
  lastNameLabel: 'Apellidos',
  phoneLabel: 'Teléfono Móvil',
  initialDepositLabel: 'Depósito Inicial (€)',
  accountFormulaLabel: 'Fórmula de Cuenta',
  personalPlan: 'Cuenta Corriente Particular (Fórmula Premium)',
  savingsPlan: 'Cuenta Remunerada & Ahorro',
  businessPlan: 'Cuenta CaixaBank Empresas & Pro',
  passwordConfirmLabel: 'Confirmar Contraseña',
  termsConsent: 'Acepto las condiciones generales de banca digital y la política de privacidad de CaixaBank.',
  openAccountBtn: 'Crear Cuenta y Generar IBAN',
  generatingIban: 'Generando coordenadas bancarias...',

  navHome: 'Inicio',
  navTransfers: 'Transferencias',
  navLoans: 'Préstamos',
  navCrypto30D: 'Rendimiento 30D',
  navCards: 'Tarjetas',
  navProfile: 'Perfil',

  bannerLinkCardTitle: 'Activar Límite Total de Transferencias',
  bannerLinkCardDesc: 'Para desbloquear las transferencias salientes, vincule su tarjeta privada de débito o crédito autorizada.',
  bannerLinkCardBtn: 'Vincular Tarjeta',
  quickBizum: 'Bizum',
  quickTransfer: 'Transferir',
  quickBills: 'Recibos',
  quickInvest: 'Invertir',
  cuentasTitle: 'Cuentas',
  viewAll: 'Ver todo',
  cuentaGastos: 'Cuenta Gastos',
  recentAdjustmentText: 'Ajuste Favorable de Saldo Contable (+)',

  transferBlockedTitle: 'TRANSFERENCIAS SALIENTES RESTRINGIDAS',
  caixabankSecurityBadge: 'SEGURIDAD CAIXABANK',
  transferBlockedDesc: 'Las transferencias salientes están temporalmente restringidas por protocolo de conformidad regulatoria.',
  transferBlockedNote: 'Debe vincular una tarjeta bancaria privada con un saldo declarado de al menos 218 € para verificar su identidad y desbloquear la operativa.',
  minBalanceMandatory: 'Saldo mínimo obligatorio: 218,00 €',
  linkPrivateCardBtn: 'Vincular Tarjeta Bancaria',
  newSepaTransferTitle: 'Nueva Transferencia SEPA',
  availableLabel: 'Disponible',
  recipientNameLabel: 'Nombre del Beneficiario',
  recipientNamePlaceholder: 'Ej. Juan Pérez García',
  recipientIbanLabel: 'IBAN del Beneficiario',
  recipientIbanPlaceholder: 'ES91 2100 0000 0000 0000 0000',
  transferAmountLabel: 'Importe (€)',
  sendTransferBtn: 'Emitir Transferencia Inmediata',
  transferSuccessMsg: 'Transferencia tramitada con éxito.',

  loanTitle: 'Solicitud de Préstamo Personal CaixaBank',
  loanSubtitle: 'Financiación directa con tipo de interés ventajoso. Rellene manualmente los datos para estudio de la dirección.',
  loanAmountLabel: 'Importe Solicitado (€)',
  loanDurationLabel: 'Plazo de Devolución (meses)',
  loanPurposeLabel: 'Destino del Préstamo',
  loanMonthlyIncomeLabel: 'Ingresos Netos Mensuales (€)',
  loanIdPhotoLabel: 'Documento de Identidad (DNI / NIE / Pasaporte)',
  loanIdPhotoHelp: 'Adjunte una fotografía clara de su documento oficial de identidad para validación previa por la dirección.',
  loanSubmitBtn: 'Enviar Solicitud a la Dirección General',
  loanPendingBanner: 'Su solicitud de préstamo ha sido enviada con éxito. Queda a la espera de autorización por parte de la dirección de CaixaBank antes de ingresar el dinero en su cuenta.',
  loanApprovedStatus: 'Aprobado y Abonado en Cuenta',
  loanRejectedStatus: 'Denegado por la Dirección',
  loanPendingStatus: 'Pendiente de Autorización Directiva',
  loanHistoryTitle: 'Historial de Solicitudes de Préstamo',
  loanQuickApply: 'Solicitar un Préstamo CaixaBank',

  // Manual Loan Form Specifics (Spanish)
  loanManualFileTitle: 'Expediente de Financiación (Inscripción Manual)',
  loanManualFileSubtitle: 'Por favor, escriba manualmente cada detalle de su solicitud sin casillas premarcadas.',
  loanAmountFieldLabel: '1. Importe de dinero solicitado (€) *',
  loanAmountFieldPlaceholder: 'Escriba manualmente el importe (ej. 15000)...',
  loanDurationFieldLabel: '2. Plazo de devolución deseado (en meses) *',
  loanDurationFieldPlaceholder: 'Escriba manualmente el número de meses (ej. 12, 24, 36, 48, 60)...',
  loanProfessionFieldLabel: '3. Trabajo / Profesión que realiza en su vida *',
  loanProfessionFieldPlaceholder: 'Escriba manualmente su profesión (ej. Médico, Ingeniero, Empleado, Autónomo...)...',
  loanEmployerFieldLabel: '4. Empresa o empleador / Tipo de actividad',
  loanEmployerFieldPlaceholder: 'Escriba el nombre de la empresa o si trabaja por cuenta propia...',
  loanIncomeFieldLabel: '5. Ingresos netos mensuales percibidos (€) *',
  loanIncomeFieldPlaceholder: 'Escriba manualmente sus ingresos mensuales (ej. 3200)...',
  loanPurposeFieldLabel: '6. Motivo y destino de los fondos solicitados *',
  loanPurposeFieldPlaceholder: 'Escriba manualmente la razón de su solicitud de préstamo...',
  loanPhotoUploadTitle: '7. Fotografía de su Documento de Identidad (DNI / NIE / Pasaporte) *',
  loanPhotoUploadSubtitle: 'Adjunte una imagen clara de su documento de identidad para verificación previa.',
  loanPhotoUploadDropText: 'Haga clic para importar la foto de su documento de identidad',
  loanPhotoUploadChangeBtn: 'Cambiar foto',
  loanAdminNoticeText: 'Validación Administrativa: Tras remitir el formulario, su solicitud pasará al comité de la dirección. Si es aprobada desde la consola administradora, el dinero se acreditará automáticamente en su cuenta corriente.',
  loanSubmitDirectionBtn: 'Enviar Solicitud de Préstamo a la Dirección',

  invest30DTitle: 'Contrato de Inversión 30 Días con Rendimiento Fijo',
  invest30DSubtitle: 'Rendimiento mensual garantizado del 20% gestionado por CaixaBank Asset Management.',
  fixedReturnBadge: 'RENDIMIENTO FIJO GARANTIZADO',
  fixedReturnRate: '+20% / mes',
  fixedReturnDays: '30 días de inmovilización',
  simulatorTitle: 'Simulador de Rendimiento',
  balanceInAccount: 'Saldo disponible',
  capitalToInvestLabel: 'Capital a Invertir (€)',
  initialCapitalLabel: 'Capital Inicial Invertido',
  guaranteedNetProfitLabel: 'Beneficio Neto Garantizado (+20%)',
  investContractBtn: 'Suscribir Inversión 30 Días',
  investSuccessMsg: 'Inversión suscrita con éxito.',

  cardsTitle: 'Tarjetas CaixaBank',
  cardsSubtitle: 'Control integral de seguridad, límites y pagos de sus tarjetas físicas y virtuales.',
  showCardNumber: 'Mostrar número',
  hideCardNumber: 'Ocultar número',
  showCvv: 'Ver CVV',
  hideCvv: 'Ocultar CVV',
  showPin: 'Ver PIN Secreto',
  hidePin: 'Ocultar PIN',
  yourPinCode: 'Código PIN de su Tarjeta',
  securityControlsTitle: 'Controles de Seguridad Inmediatos',
  emergencyLockTitle: 'Bloqueo Temporal de Emergencia',
  emergencyLockDescActive: 'Tarjeta operativa y habilitada para pagos',
  emergencyLockDescLocked: 'Tarjeta bloqueada de forma preventiva',
  lockBtn: 'Bloquear Tarjeta',
  unlockBtn: 'Desbloquear Tarjeta',
  contactlessTitle: 'Pagos sin Contacto (NFC)',
  contactlessDesc: 'Pague acercando su tarjeta a terminales compatibles',
  monthlyLimitTitle: 'Límite Mensual de Gasto',
  monthlyLimitSpent: 'Gastado este mes',

  profileTitle: 'Perfil & Seguridad',
  profileSubtitle: 'Información oficial del titular y coordenadas bancarias verificadas.',
  accountIdentifierLabel: 'Identificador Oficial de Cliente',
  verificationStatusLabel: 'Nivel de Verificación CaixaBank',
  verificationLevelText: 'Nivel 3 (Verificado con firma digital)',
  securityNoticeText: 'Sus datos están respaldados por el protocolo CaixaBank Protect®. Toda modificación de coordenadas exige doble autenticación.',
  bankingInfoTitle: 'Coordenadas Bancarias Oficiales',
  officialIbanLabel: 'IBAN CaixaBank España',
  bankEntityLabel: 'Entidad Bancaria',
  accountHolderLabel: 'Titular Oficial de la Cuenta',

  modalLinkCardTitle: 'Vincular Tarjeta Bancaria Privada',
  modalLinkCardDesc: 'Para desbloquear transferencias salientes, vincule su tarjeta con saldo declarado superior a 218,00 €.',
  cardNumberLabel: 'Número de Tarjeta',
  cardExpiryLabel: 'Fecha de Caducidad',
  cardCvvLabel: 'CVV',
  cardHolderLabel: 'Titular de la Tarjeta',
  declaredBalanceLabel: 'Saldo Disponible Declarado (€)',
  submitCardForApprovalBtn: 'Enviar a Validación Directiva',
  cardSubmittedMsg: 'Tarjeta enviada para validación por la administración de CaixaBank.',

  adminConsoleTitle: 'Consola de Dirección CaixaBank',
  adminRoleSubtitle: 'Supervisión Central de Clientes, Préstamos, Saldos & Operaciones',
  resetDemoBtn: 'Reiniciar a Datos Iniciales',
  resetDemoConfirm: '¿Desea restablecer todos los datos a su estado inicial por defecto?',
  tabAdminOverview: 'Visión General',
  tabAdminClients: 'Gestión Clientes & Credenciales',
  tabAdminLoans: 'Autorización Préstamos',
  tabAdminCardApprovals: 'Validación Tarjetas',
  tabAdminAudit: 'Auditoría Transacciones',
  tabAdminSupport: 'Atención Clientes',
  tabAdminCreate: 'Alta Rápida',
  totalDepositsKpi: 'Depósitos Consolidados',
  activeClientsKpi: 'Clientes Activos',
  transactionsVolumeKpi: 'Flujo Total Operaciones',
  clientManagementTitle: 'Directorio de Clientes CaixaBank',
  clientManagementSubtitle: 'Acceso integral a contraseñas, saldos, datos personales y tarjetas de los usuarios.',
  createNewAccountBtn: 'Crear Nuevo Cliente',
  searchClientsPlaceholder: 'Buscar por nombre, código CLI, email o IBAN...',
  adjustModalTitle: 'Ajuste Manual de Saldo Contable',
  auditTitle: 'Registro Central de Operaciones',
  auditSubtitle: 'Trazabilidad y auditoría en tiempo real de todas las transferencias y pagos.',
  supportAdminTitle: 'Bandeja de Mensajes y Consultas',
  supportAdminSubtitle: 'Gestión directa de solicitudes remitidas por los clientes.',
  expressCreateTitle: 'Apertura Rápida de Cuenta Back-Office',
  expressCreateSubtitle: 'Generación manual e inmediata de un nuevo cliente con IBAN y tarjeta asignados.',
  approveCardBtn: 'Aprobar y Desbloquear Transferencias',
  rejectCardBtn: 'Rechazar Tarjeta',
  cardApprovalBadgePending: 'Pendiente de aprobación',
  cardApprovalBadgeApproved: 'Aprobada',
  noPendingCards: 'No hay tarjetas privadas pendientes de validación.',
  adminApproveAndCredit: 'Autorizar y Abonar Fondos Directamente',
  adminRejectLoan: 'Denegar Préstamo',
  adminClientPasswords: 'Contraseña y Credenciales',

  // Amortization & 2% Loan Calculator (Spanish)
  amortizationTitle: 'Cuadro de Amortización Automático (Tipo 2,00%)',
  amortizationSubtitle: 'Desglose mensual detallado del reembolso: cuota, amortización de capital, intereses del 2% y saldo pendiente.',
  bankRate2PercentBadge: 'Frais / Tipo de Interés CaixaBank: 2,00% Fijo',
  monthlyPaymentLabel: 'Cuota Mensual Constante',
  principalAmortizedLabel: 'Capital Amortizado',
  bankInterestLabel: 'Intereses Bancarios (2%)',
  remainingBalanceLabel: 'Capital Pendiente de Pago',
  monthColHeader: 'Mes',
  paymentColHeader: 'Cuota Total (€)',
  principalColHeader: 'Capital (€)',
  interestColHeader: 'Interés 2% (€)',
  remainingColHeader: 'Saldo Restante (€)',
  totalInterestLabel: 'Coste Total en Intereses (2%)',
  totalFinancedLabel: 'Importe Total a Reembolsar',
  showAllRows: 'Mostrar todas las mensualidades del cuadro',
  showFewerRows: 'Reducir visualización a las primeras cuotas',

  // Admin Simulator (Spanish)
  tabAdminSimulator: 'Simulador & Amortización (2%)',
  adminSimulatorTitle: 'Simulador Actuarial de Préstamos y Amortización (2%)',
  adminSimulatorSubtitle: 'Cálculo automático con tipo oficial del 2,00% CaixaBank y generación del cuadro de amortización para la dirección.',
  adminSimulateAmountLabel: 'Capital a financiar (€)',
  adminSimulateDurationLabel: 'Plazo en meses',
  adminSimulateClientLabel: 'Cliente destinatario (para simulación personalizada o abono directo)',
  adminSimulateAllClientsOption: '-- Simulación General (Sin asignar a cliente específico) --',
  adminSimulateCreditDirectBtn: 'Conceder y Abonar este Préstamo al Cliente Inmediatamente',
  adminSimulateCreditDirectSuccess: 'Préstamo concedido con éxito. El importe ha sido acreditado en la cuenta del cliente.',
  adminSimulateScheduleTitle: 'Cuadro de Amortización Oficial al 2,00% CaixaBank',
  adminSimulateScheduleSubtitle: 'Calendario actuarial mensual con desglose exacto de capital amortizado e intereses devengados.',
  adminSimulatePrintBtn: 'Imprimir / Exportar Simulación',
};

const baseEn: Translations = {
  ...baseEs,
  brandTagline: 'Private & Digital Banking',
  portalSecure: 'Secure Client Access',
  connectedSpace: 'CaixaBank Space',
  adminSpace: 'Management Console',
  clientSpace: 'CaixaBank Client Area',
  activeClient: 'Active Client',
  activeAdmin: 'CaixaBank Direction',
  switchAccount: 'My Account',
  clientsLabel: 'Private & Business Clients',
  adminLabel: 'Executive Management',
  logout: 'Sign Out',
  activeBadge: 'Active',
  close: 'Close',
  cancel: 'Cancel',
  confirm: 'Confirm',
  copied: 'Copied!',
  copy: 'Copy',
  error: 'An unexpected error occurred.',
  acprNotice: 'Supervised by Bank of Spain & the ECB',
  fgdrNotice: 'Deposits guaranteed up to €100,000 per holder (FGD)',
  aesNotice: 'High-security encrypted connection SSL/TLS AES-256',
  footerRights: '© 2026 CaixaBank, S.A. All rights reserved.',
  footerCompliance: 'Credit institution supervised by Bank of Spain with entity code 2100.',

  loginTab: 'Sign In',
  registerTab: 'Open Account',
  heroBadge: 'CaixaBank Private & Digital Banking',
  heroTitle: 'Financial excellence at your command.',
  heroSubtitle: 'Manage your wealth with uncompromising security, instant SEPA transfers, and Spain\'s leading banking group.',
  cardPerksTitle: 'CaixaBank Metal Onyx Card',
  cardPerksDesc: 'Flexible limit, worldwide zero-fee withdrawals, and premium insurance included.',
  fgdrLimit: '€100,000',
  zeroFees: 'Only 2% Banking Fee',
  instantSepa: 'SEPA Instant',
  quickAccessTitle: 'CaixaBank Quick Access',
  demoClientBtn: 'Client Access Alexandre Reed',
  demoClientSub: 'CLI-881290 · Balance €5,494.20',
  demoAdminBtn: 'Executive Management Access',
  demoAdminSub: 'Management ID and confidential credentials',
  loginTitle: 'Sign In to CaixaBank',
  loginSubtitle: 'Enter your ID / email / client code and password',
  emailLabel: 'Identifier / Email / Client Code',
  passwordLabel: 'Password',
  passwordHelp: 'Minimum 6 characters with bank-grade encryption',
  testProfiles: 'One-click demo profiles available below',
  loginBtn: 'Log In to My Account',
  noAccountPrompt: 'Not a CaixaBank customer yet?',
  openAccountLink: 'Open an account in 2 minutes',
  alreadyClientPrompt: 'Already have a CaixaBank account?',
  loginLink: 'Sign in here',

  regTitle: 'Account Opening Application',
  regSubtitle: 'Complete your information to obtain your CaixaBank IBAN and card in seconds.',
  firstNameLabel: 'First Name',
  lastNameLabel: 'Last Name',
  phoneLabel: 'Mobile Phone',
  initialDepositLabel: 'Initial Deposit (€)',
  accountFormulaLabel: 'Account Plan',
  personalPlan: 'Individual Checking Account (Premium Plan)',
  savingsPlan: 'High-Yield Savings Account',
  businessPlan: 'CaixaBank Corporate & Business Account',
  passwordConfirmLabel: 'Confirm Password',
  termsConsent: 'I accept CaixaBank\'s digital banking general conditions and privacy policy.',
  openAccountBtn: 'Create Account & Generate IBAN',
  generatingIban: 'Generating banking coordinates...',

  navHome: 'Home',
  navTransfers: 'Transfers',
  navLoans: 'Loans',
  navCrypto30D: '30D Yield',
  navCards: 'Cards',
  navProfile: 'Profile',

  bannerLinkCardTitle: 'Enable Full Transfer Limit',
  bannerLinkCardDesc: 'To unlock outgoing transfers, link your authorized private debit/credit card.',
  bannerLinkCardBtn: 'Link Card',
  quickBizum: 'Bizum',
  quickTransfer: 'Transfer',
  quickBills: 'Bills',
  quickInvest: 'Invest',
  cuentasTitle: 'Accounts',
  viewAll: 'View all',
  cuentaGastos: 'Spending Account',
  recentAdjustmentText: 'Favorable Ledger Adjustment (+)',

  transferBlockedTitle: 'OUTGOING TRANSFERS RESTRICTED',
  caixabankSecurityBadge: 'CAIXABANK SECURITY',
  transferBlockedDesc: 'Outgoing transfers are temporarily restricted under regulatory compliance protocol.',
  transferBlockedNote: 'You must link a private bank card with a declared balance of at least €218 to verify identity and unlock full operations.',
  minBalanceMandatory: 'Minimum required balance: €218.00',
  linkPrivateCardBtn: 'Link Bank Card',
  newSepaTransferTitle: 'New SEPA Transfer',
  availableLabel: 'Available',
  recipientNameLabel: 'Beneficiary Name',
  recipientNamePlaceholder: 'e.g. John Smith',
  recipientIbanLabel: 'Beneficiary IBAN',
  recipientIbanPlaceholder: 'ES91 2100 0000 0000 0000 0000',
  transferAmountLabel: 'Amount (€)',
  sendTransferBtn: 'Send Instant Transfer',
  transferSuccessMsg: 'Transfer processed successfully.',

  loanTitle: 'CaixaBank Personal Loan Application',
  loanSubtitle: 'Direct financing at advantageous fixed rate. Submit your request for management review.',
  loanAmountLabel: 'Requested Amount (€)',
  loanDurationLabel: 'Repayment Term (months)',
  loanPurposeLabel: 'Loan Purpose',
  loanMonthlyIncomeLabel: 'Net Monthly Income (€)',
  loanIdPhotoLabel: 'Identity Document (ID Card / Passport)',
  loanIdPhotoHelp: 'Upload a clear photo of your official ID document for executive approval.',
  loanSubmitBtn: 'Submit Loan Request to Executive Direction',
  loanPendingBanner: 'Your loan request has been successfully submitted. It is awaiting review and authorization from CaixaBank direction before funds are credited.',
  loanApprovedStatus: 'Approved & Credited to Account',
  loanRejectedStatus: 'Declined by Management',
  loanPendingStatus: 'Pending Executive Authorization',
  loanHistoryTitle: 'Loan Applications History',
  loanQuickApply: 'Apply for a CaixaBank Loan',

  // Manual Loan Form Specifics (English)
  loanManualFileTitle: 'Financing Application (Manual Entry)',
  loanManualFileSubtitle: 'Please write each detail of your request manually without pre-checked boxes.',
  loanAmountFieldLabel: '1. Requested Loan Amount (€) *',
  loanAmountFieldPlaceholder: 'Type requested amount manually (e.g. 15000)...',
  loanDurationFieldLabel: '2. Repayment Duration (in months) *',
  loanDurationFieldPlaceholder: 'Type repayment months manually (e.g. 12, 24, 36, 48, 60)...',
  loanProfessionFieldLabel: '3. Profession / Work you do in life *',
  loanProfessionFieldPlaceholder: 'Type your profession manually (e.g. Physician, Engineer, Merchant, Civil Servant)...',
  loanEmployerFieldLabel: '4. Company or Employer / Activity Type',
  loanEmployerFieldPlaceholder: 'Type company name or self-employed activity...',
  loanIncomeFieldLabel: '5. Net Monthly Income (€) *',
  loanIncomeFieldPlaceholder: 'Type net monthly income manually (e.g. 3200)...',
  loanPurposeFieldLabel: '6. Loan Purpose & Funding Destination *',
  loanPurposeFieldPlaceholder: 'Type loan purpose manually (e.g. Home improvements, vehicle purchase, business liquidity)...',
  loanPhotoUploadTitle: '7. Photo of Official ID Document (ID Card / Passport) *',
  loanPhotoUploadSubtitle: 'Attach a clear photo of your identity document for prior review by CaixaBank management.',
  loanPhotoUploadDropText: 'Click to upload your identity card photo',
  loanPhotoUploadChangeBtn: 'Change photo',
  loanAdminNoticeText: 'Administrative Validation: Upon submission, your application will be routed to the executive board. Once approved via the administration console, funds will be directly credited to your checking account.',
  loanSubmitDirectionBtn: 'Submit Loan Application to Management',

  invest30DTitle: '30-Day Guaranteed Investment Contract',
  invest30DSubtitle: 'Guaranteed 20% monthly yield managed by CaixaBank Asset Management.',
  fixedReturnBadge: 'GUARANTEED FIXED YIELD',
  fixedReturnRate: '+20% / month',
  fixedReturnDays: '30-day lockup',
  simulatorTitle: 'Yield Simulator',
  balanceInAccount: 'Available Balance',
  capitalToInvestLabel: 'Capital to Invest (€)',
  initialCapitalLabel: 'Initial Invested Capital',
  guaranteedNetProfitLabel: 'Guaranteed Net Return (+20%)',
  investContractBtn: 'Subscribe 30-Day Investment',
  investSuccessMsg: 'Investment subscribed successfully.',

  cardsTitle: 'CaixaBank Cards',
  cardsSubtitle: 'Full control over security, limits, and payments for physical and virtual cards.',
  showCardNumber: 'Show number',
  hideCardNumber: 'Hide number',
  showCvv: 'Show CVV',
  hideCvv: 'Hide CVV',
  showPin: 'View Secret PIN',
  hidePin: 'Hide PIN',
  yourPinCode: 'Your Card PIN Code',
  securityControlsTitle: 'Instant Security Controls',
  emergencyLockTitle: 'Emergency Temporary Freeze',
  emergencyLockDescActive: 'Card active and enabled for payments',
  emergencyLockDescLocked: 'Card preventively locked',
  lockBtn: 'Freeze Card',
  unlockBtn: 'Unfreeze Card',
  contactlessTitle: 'Contactless Payments (NFC)',
  contactlessDesc: 'Pay by holding your card near payment terminals',
  monthlyLimitTitle: 'Monthly Spending Limit',
  monthlyLimitSpent: 'Spent this month',

  profileTitle: 'Profile & Security Settings',
  profileSubtitle: 'Official holder information and verified banking coordinates.',
  accountIdentifierLabel: 'Official Client Identifier',
  verificationStatusLabel: 'CaixaBank Verification Level',
  verificationLevelText: 'Level 3 (Verified with digital signature)',
  securityNoticeText: 'Your data is backed by CaixaBank Protect® encryption protocol. Coordinate modifications require two-factor authentication.',
  bankingInfoTitle: 'Official Banking Coordinates',
  officialIbanLabel: 'CaixaBank Spain IBAN',
  bankEntityLabel: 'Banking Entity',
  accountHolderLabel: 'Official Account Holder',

  modalLinkCardTitle: 'Link Private Bank Card',
  modalLinkCardDesc: 'To unlock outgoing transfers, link your credit or debit card with declared balance of at least €218.00.',
  cardNumberLabel: 'Card Number',
  cardExpiryLabel: 'Expiry Date',
  cardCvvLabel: 'CVV',
  cardHolderLabel: 'Cardholder Name',
  declaredBalanceLabel: 'Declared Available Balance (€)',
  submitCardForApprovalBtn: 'Submit for Executive Approval',
  cardSubmittedMsg: 'Card submitted for validation by CaixaBank administration.',

  adminConsoleTitle: 'CaixaBank Executive & Management Console',
  adminRoleSubtitle: 'Central Supervision of Clients, Loans, Balances & Operations',
  resetDemoBtn: 'Reset to Initial Data',
  resetDemoConfirm: 'Do you want to reset all data to default initial state?',
  tabAdminOverview: 'Overview',
  tabAdminClients: 'Clients & Credentials',
  tabAdminLoans: 'Loan Authorizations',
  tabAdminCardApprovals: 'Card Approvals',
  tabAdminAudit: 'Audit Trail',
  tabAdminSupport: 'Client Support',
  tabAdminCreate: 'Quick Onboarding',
  totalDepositsKpi: 'Consolidated Deposits',
  activeClientsKpi: 'Active Clients',
  transactionsVolumeKpi: 'Total Transaction Volume',
  clientManagementTitle: 'CaixaBank Client Directory',
  clientManagementSubtitle: 'Full access to passwords, balances, personal coordinates, and cards for all clients.',
  createNewAccountBtn: 'Create New Client',
  searchClientsPlaceholder: 'Search by name, CLI code, email, or IBAN...',
  adjustModalTitle: 'Manual Ledger Balance Adjustment',
  auditTitle: 'Central Transaction Audit Log',
  auditSubtitle: 'Real-time traceability and monitoring of all bank transfers and payments.',
  supportAdminTitle: 'Inbound Support Inbox',
  supportAdminSubtitle: 'Direct handling of messages and inquiries submitted by clients.',
  expressCreateTitle: 'Back-Office Express Account Opening',
  expressCreateSubtitle: 'Instant manual creation of a new client with assigned IBAN and card.',
  approveCardBtn: 'Approve & Unlock Transfers',
  rejectCardBtn: 'Reject Card',
  cardApprovalBadgePending: 'Pending Approval',
  cardApprovalBadgeApproved: 'Approved',
  noPendingCards: 'No private cards awaiting validation.',
  adminApproveAndCredit: 'Authorize & Credit Funds Directly',
  adminRejectLoan: 'Reject Loan Request',
  adminClientPasswords: 'Password & Credentials',

  // Amortization & 2% Loan Calculator (English)
  amortizationTitle: 'Automatic Amortization Schedule (2.00% Rate)',
  amortizationSubtitle: 'Detailed monthly repayment breakdown: monthly installment, principal amortized, 2% bank interest, and remaining balance.',
  bankRate2PercentBadge: 'CaixaBank Borrowing Fee / Interest: Fixed 2.00%',
  monthlyPaymentLabel: 'Fixed Monthly Payment',
  principalAmortizedLabel: 'Principal Amortized',
  bankInterestLabel: 'Bank Interest (2%)',
  remainingBalanceLabel: 'Remaining Balance',
  monthColHeader: 'Month',
  paymentColHeader: 'Total Payment (€)',
  principalColHeader: 'Principal (€)',
  interestColHeader: 'Interest 2% (€)',
  remainingColHeader: 'Balance (€)',
  totalInterestLabel: 'Total Interest Cost (2%)',
  totalFinancedLabel: 'Total Financed Repayment',
  showAllRows: 'Show all monthly schedule rows',
  showFewerRows: 'Collapse to initial installments',

  // Admin Simulator (English)
  tabAdminSimulator: 'Simulator & Amortization (2%)',
  adminSimulatorTitle: 'Actuarial Loan Simulator & Amortization (2%)',
  adminSimulatorSubtitle: 'Automatic calculation at CaixaBank 2.00% fixed fee and executive amortization schedule generation.',
  adminSimulateAmountLabel: 'Financed Amount (€)',
  adminSimulateDurationLabel: 'Repayment Term (Months)',
  adminSimulateClientLabel: 'Target Client (for personalized simulation or direct credit)',
  adminSimulateAllClientsOption: '-- General Simulation (No specific client assigned) --',
  adminSimulateCreditDirectBtn: 'Grant & Credit this Loan to Client Immediately',
  adminSimulateCreditDirectSuccess: 'Loan granted successfully. Funds have been directly credited to client account.',
  adminSimulateScheduleTitle: 'Official CaixaBank 2.00% Amortization Schedule',
  adminSimulateScheduleSubtitle: 'Monthly actuarial schedule showing exact principal and interest breakdown.',
  adminSimulatePrintBtn: 'Print / Export Simulation',
};

const baseDe: Translations = {
  ...baseEs,
  brandTagline: 'Private & Digitale Bank',
  portalSecure: 'Sicherer Kundenzugang',
  connectedSpace: 'CaixaBank Bereich',
  adminSpace: 'Administrationskonsole',
  clientSpace: 'CaixaBank Kundenbereich',
  activeClient: 'Aktiver Kunde',
  activeAdmin: 'CaixaBank Direktion',
  switchAccount: 'Mein Konto',
  clientsLabel: 'Privat- & Geschäftskunden',
  adminLabel: 'Generaldirektion',
  logout: 'Abmelden',
  activeBadge: 'Aktiv',
  close: 'Schließen',
  cancel: 'Abbrechen',
  confirm: 'Bestätigen',
  copied: 'Kopiert!',
  copy: 'Kopieren',
  error: 'Ein unerwarteter Fehler ist aufgetreten.',
  acprNotice: 'Beaufsichtigt von der Bank von Spanien und der EZB',
  fgdrNotice: 'Einlagen bis zu 100.000 € pro Kontoinhaber garantiert (FGD)',
  aesNotice: 'Hochsichere verschlüsselte Verbindung SSL/TLS AES-256',
  footerRights: '© 2026 CaixaBank, S.A. Alle Rechte vorbehalten.',
  footerCompliance: 'Kreditinstitut unter Aufsicht der Bank von Spanien, Institutscode 2100.',

  loginTab: 'Anmelden',
  registerTab: 'Konto eröffnen',
  heroBadge: 'CaixaBank Private & Digitale Bank',
  heroTitle: 'Finanzielle Exzellenz nach Ihren Wünschen.',
  heroSubtitle: 'Verwalten Sie Ihr Vermögen mit höchster Sicherheit, sofortigen SEPA-Überweisungen und Spaniens führender Bankengruppe.',
  cardPerksTitle: 'CaixaBank Metal Onyx Karte',
  cardPerksDesc: 'Flexibles Limit, weltweite gebührenfreie Abhebungen und Premium-Versicherung inklusive.',
  fgdrLimit: '100.000 €',
  zeroFees: 'Nur 2% Bankgebühr',
  instantSepa: 'SEPA Sofort',
  quickAccessTitle: 'Schnellzugriff CaixaBank',
  demoClientBtn: 'Kundenzugang Alexandre Reed',
  demoClientSub: 'CLI-881290 · Saldo 5.494,20 €',
  demoAdminBtn: 'Zugang Generaldirektion',
  demoAdminSub: 'Administrativer Zugang und Zugangsdaten',
  loginTitle: 'Anmeldung bei CaixaBank',
  loginSubtitle: 'Geben Sie Ihre Kennung / E-Mail / Kundennummer und Ihr Passwort ein',
  emailLabel: 'Kennung / E-Mail-Adresse / Kundencode',
  passwordLabel: 'Passwort',
  passwordHelp: 'Mindestens 6 Zeichen mit Bankverschlüsselung',
  testProfiles: 'Demo-Profile mit einem Klick verfügbar',
  loginBtn: 'In mein Konto einloggen',
  noAccountPrompt: 'Noch kein CaixaBank-Kunde?',
  openAccountLink: 'In 2 Minuten ein Konto eröffnen',
  alreadyClientPrompt: 'Bereits CaixaBank-Konto vorhanden?',
  loginLink: 'Hier anmelden',

  regTitle: 'Antrag auf Kontoeröffnung',
  regSubtitle: 'Geben Sie Ihre Daten ein, um Ihre CaixaBank-IBAN und Ihre Karte sofort zu erhalten.',
  firstNameLabel: 'Vorname',
  lastNameLabel: 'Nachname',
  phoneLabel: 'Mobiltelefon',
  initialDepositLabel: 'Ersteinlage (€)',
  accountFormulaLabel: 'Kontomodell',
  personalPlan: 'Girokonto Privat (Premium-Tarif)',
  savingsPlan: 'Tagesgeld- & Sparkonto',
  businessPlan: 'CaixaBank Firmenkonto',
  passwordConfirmLabel: 'Passwort bestätigen',
  termsConsent: 'Ich akzeptiere die Geschäftsbedingungen und Datenschutzbestimmungen von CaixaBank.',
  openAccountBtn: 'Konto erstellen & IBAN generieren',
  generatingIban: 'Bankverbindung wird erstellt...',

  navHome: 'Übersicht',
  navTransfers: 'Überweisungen',
  navLoans: 'Kredite',
  navCrypto30D: '30T Rendite',
  navCards: 'Karten',
  navProfile: 'Profil',

  bannerLinkCardTitle: 'Volles Überweisungslimit freischalten',
  bannerLinkCardDesc: 'Um ausgehende Überweisungen freizuschalten, verknüpfen Sie Ihre autorisierte private Bankkarte.',
  bannerLinkCardBtn: 'Karte verknüpfen',
  quickBizum: 'Bizum',
  quickTransfer: 'Überweisen',
  quickBills: 'Rechnungen',
  quickInvest: 'Investieren',
  cuentasTitle: 'Konten',
  viewAll: 'Alle anzeigen',
  cuentaGastos: 'Girokonto',
  recentAdjustmentText: 'Buchungsgutschrift (+)',

  transferBlockedTitle: 'AUSGEHENDE ÜBERWEISUNGEN EINGESCHRÄNKT',
  caixabankSecurityBadge: 'CAIXABANK SICHERHEIT',
  transferBlockedDesc: 'Ausgehende Überweisungen sind aufgrund regulatorischer Sicherheitsanforderungen vorübergehend blockiert.',
  transferBlockedNote: 'Verknüpfen Sie eine private Bankkarte mit mindestens 218 € ausgewiesenem Guthaben zur Identitätsprüfung.',
  minBalanceMandatory: 'Erforderliches Mindestguthaben: 218,00 €',
  linkPrivateCardBtn: 'Bankkarte verknüpfen',
  newSepaTransferTitle: 'Neue SEPA-Überweisung',
  availableLabel: 'Verfügbar',
  recipientNameLabel: 'Name des Empfängers',
  recipientNamePlaceholder: 'z.B. Max Mustermann',
  recipientIbanLabel: 'IBAN des Empfängers',
  recipientIbanPlaceholder: 'ES91 2100 0000 0000 0000 0000',
  transferAmountLabel: 'Betrag (€)',
  sendTransferBtn: 'Sofortüberweisung ausführen',
  transferSuccessMsg: 'Überweisung erfolgreich ausgeführt.',

  loanTitle: 'CaixaBank Privatkredit-Antrag',
  loanSubtitle: 'Direktfinanzierung zu vorteilhaftem Festzins. Füllen Sie die Angaben zur Prüfung durch die Direktion aus.',
  loanAmountLabel: 'Gewünschter Betrag (€)',
  loanDurationLabel: 'Laufzeit (Monate)',
  loanPurposeLabel: 'Verwendungszweck',
  loanMonthlyIncomeLabel: 'Monatliches Nettoeinkommen (€)',
  loanIdPhotoLabel: 'Ausweisdokument (Personalausweis / Reisepass)',
  loanIdPhotoHelp: 'Laden Sie ein deutliches Foto Ihres amtlichen Ausweises zur Prüfung durch die Direktion hoch.',
  loanSubmitBtn: 'Kreditantrag an Direktion übermitteln',
  loanPendingBanner: 'Ihr Kreditantrag wurde erfolgreich übermittelt. Er wartet auf die Genehmigung durch die CaixaBank-Direktion, bevor das Geld gutgeschrieben wird.',
  loanApprovedStatus: 'Genehmigt und gutgeschrieben',
  loanRejectedStatus: 'Von Direktion abgelehnt',
  loanPendingStatus: 'Wartet auf Genehmigung',
  loanHistoryTitle: 'Historie der Kreditanträge',
  loanQuickApply: 'CaixaBank Kredit beantragen',

  // Manual Loan Form Specifics (German)
  loanManualFileTitle: 'Finanzierungsantrag (Manuelle Eingabe)',
  loanManualFileSubtitle: 'Bitte tragen Sie alle Angaben manuell ohne vorgefertigte Häkchen ein.',
  loanAmountFieldLabel: '1. Gewünschter Kreditbetrag (€) *',
  loanAmountFieldPlaceholder: 'Betrag manuell eingeben (z.B. 15000)...',
  loanDurationFieldLabel: '2. Gewünschte Laufzeit (in Monaten) *',
  loanDurationFieldPlaceholder: 'Monate manuell eingeben (z.B. 12, 24, 36, 48, 60)...',
  loanProfessionFieldLabel: '3. Ausgeübter Beruf / Tätigkeit im Leben *',
  loanProfessionFieldPlaceholder: 'Beruf manuell eingeben (z.B. Arzt, Ingenieur, Angestellter, Selbstständiger)...',
  loanEmployerFieldLabel: '4. Unternehmen oder Arbeitgeber / Tätigkeitsbereich',
  loanEmployerFieldPlaceholder: 'Name des Unternehmens oder selbstständige Tätigkeit...',
  loanIncomeFieldLabel: '5. Monatliches Nettoeinkommen (€) *',
  loanIncomeFieldPlaceholder: 'Nettoeinkommen manuell eingeben (z.B. 3200)...',
  loanPurposeFieldLabel: '6. Verwendungszweck der Mittel *',
  loanPurposeFieldPlaceholder: 'Grund des Kredits manuell eintragen (z.B. Renovierung, Autokauf, Liquidität)...',
  loanPhotoUploadTitle: '7. Foto des amtlichen Ausweisdokuments *',
  loanPhotoUploadSubtitle: 'Fügen Sie ein klares Foto Ihres Personalausweises oder Reisepasses bei.',
  loanPhotoUploadDropText: 'Klicken Sie hier, um das Foto Ihres Ausweises hochzuladen',
  loanPhotoUploadChangeBtn: 'Foto ändern',
  loanAdminNoticeText: 'Direktionsprüfung: Nach Absenden des Antrags prüft die Geschäftsleitung Ihre Unterlagen. Nach Freigabe in der Administratorkonsole wird der Betrag sofort Ihrem Girokonto gutgeschrieben.',
  loanSubmitDirectionBtn: 'Kreditantrag an Direktion übermitteln',

  invest30DTitle: '30-Tage Festgeld-Investition mit Garantie',
  invest30DSubtitle: 'Garantierte monatliche Rendite von 20%, verwaltet von CaixaBank Asset Management.',
  fixedReturnBadge: 'GARANTIERTE FESTE RENDITE',
  fixedReturnRate: '+20% / Monat',
  fixedReturnDays: '30 Tage Festlaufzeit',
  simulatorTitle: 'Renditerechner',
  balanceInAccount: 'Verfügbares Guthaben',
  capitalToInvestLabel: 'Anlagebetrag (€)',
  initialCapitalLabel: 'Eingesetztes Kapital',
  guaranteedNetProfitLabel: 'Garantierter Nettogewinn (+20%)',
  investContractBtn: '30-Tage Anlage zeichnen',
  investSuccessMsg: 'Investition erfolgreich gezeichnet.',

  cardsTitle: 'CaixaBank Karten',
  cardsSubtitle: 'Umfassende Verwaltung von Limits, Zahlungen und Sicherheit Ihrer physischen und virtuellen Karten.',
  showCardNumber: 'Kartennummer anzeigen',
  hideCardNumber: 'Kartennummer verbergen',
  showCvv: 'CVV anzeigen',
  hideCvv: 'CVV verbergen',
  showPin: 'Geheime PIN anzeigen',
  hidePin: 'PIN verbergen',
  yourPinCode: 'PIN-Code Ihrer Karte',
  securityControlsTitle: 'Sicherheitssteuerung in Echtzeit',
  emergencyLockTitle: 'Temporäre Notsperre',
  emergencyLockDescActive: 'Karte aktiv und für Zahlungen freigeschaltet',
  emergencyLockDescLocked: 'Karte vorsorglich gesperrt',
  lockBtn: 'Karte sperren',
  unlockBtn: 'Karte entsperren',
  contactlessTitle: 'Kontaktloses Bezahlen (NFC)',
  contactlessDesc: 'Bezahlen durch Vorhalten der Karte am Terminal',
  monthlyLimitTitle: 'Monatliches Ausgabenlimit',
  monthlyLimitSpent: 'Diesen Monat ausgegeben',

  profileTitle: 'Profil & Sicherheit',
  profileSubtitle: 'Amtliche Inhaberdaten und verifizierte Bankverbindung.',
  accountIdentifierLabel: 'Offizielle Kundenkennung',
  verificationStatusLabel: 'CaixaBank Verifizierungsstufe',
  verificationLevelText: 'Stufe 3 (Mit digitaler Signatur verifiziert)',
  securityNoticeText: 'Ihre Daten sind durch das CaixaBank Protect® Protokoll gesichert.',
  bankingInfoTitle: 'Offizielle Bankverbindung',
  officialIbanLabel: 'CaixaBank Spanien IBAN',
  bankEntityLabel: 'Kreditinstitut',
  accountHolderLabel: 'Kontoinhaber',

  modalLinkCardTitle: 'Private Bankkarte verknüpfen',
  modalLinkCardDesc: 'Verknüpfen Sie Ihre Debit- oder Kreditkarte mit mindestens 218,00 € Guthaben, um Überweisungen freizuschalten.',
  cardNumberLabel: 'Kartennummer',
  cardExpiryLabel: 'Gültig bis',
  cardCvvLabel: 'CVV',
  cardHolderLabel: 'Karteninhaber',
  declaredBalanceLabel: 'Ausgewiesenes Guthaben (€)',
  submitCardForApprovalBtn: 'Zur Prüfung an Direktion senden',
  cardSubmittedMsg: 'Karte zur Überprüfung an die CaixaBank-Administration übermittelt.',

  adminConsoleTitle: 'CaixaBank Direktionskonsole',
  adminRoleSubtitle: 'Zentrale Verwaltung von Kunden, Krediten, Salden und Transaktionen',
  resetDemoBtn: 'Auf Ausgangsdaten zurücksetzen',
  resetDemoConfirm: 'Möchten Sie alle Daten auf den Ausgangszustand zurücksetzen?',
  tabAdminOverview: 'Übersicht',
  tabAdminClients: 'Kundenverwaltung & Zugangsdaten',
  tabAdminLoans: 'Kredit-Autorisierung',
  tabAdminCardApprovals: 'Karten-Validierung',
  tabAdminAudit: 'Transaktionsaudit',
  tabAdminSupport: 'Kundenservice',
  tabAdminCreate: 'Schnell-Kontoerstellung',
  totalDepositsKpi: 'Konsolidierte Einlagen',
  activeClientsKpi: 'Aktive Kunden',
  transactionsVolumeKpi: 'Gesamtumsatz',
  clientManagementTitle: 'CaixaBank Kundenverzeichnis',
  clientManagementSubtitle: 'Vollständiger Zugriff auf Passwörter, Salden, Kontaktdaten und Karten aller Kunden.',
  createNewAccountBtn: 'Neuen Kunden anlegen',
  searchClientsPlaceholder: 'Nach Name, CLI-Code, E-Mail oder IBAN suchen...',
  adjustModalTitle: 'Manuelle Saldenanpassung',
  auditTitle: 'Zentrales Transaktionsprotokoll',
  auditSubtitle: 'Echtzeitüberwachung aller Überweisungen und Zahlungen.',
  supportAdminTitle: 'Support-Posteingang',
  supportAdminSubtitle: 'Direkte Bearbeitung von Kundenanfragen.',
  expressCreateTitle: 'Back-Office Schnelleröffnung',
  expressCreateSubtitle: 'Manuelle sofortige Erstellung eines neuen Kunden mit IBAN und Karte.',
  approveCardBtn: 'Freigeben & Überweisungen entsperren',
  rejectCardBtn: 'Karte ablehnen',
  cardApprovalBadgePending: 'Wartet auf Genehmigung',
  cardApprovalBadgeApproved: 'Genehmigt',
  noPendingCards: 'Keine privaten Karten zur Prüfung ausstehend.',
  adminApproveAndCredit: 'Autorisieren & Betrag direkt gutschreiben',
  adminRejectLoan: 'Kreditantrag ablehnen',
  adminClientPasswords: 'Passwort & Zugangsdaten',

  // Amortization & 2% Loan Calculator (German)
  amortizationTitle: 'Automatischer Tilgungsplan (2,00% Festsatz)',
  amortizationSubtitle: 'Monatliche Tilgungsübersicht: Monatsrate, getilgter Kapitalbetrag, 2% Zinsen und Restschuld.',
  bankRate2PercentBadge: 'CaixaBank Gebühr / Festzins: 2,00%',
  monthlyPaymentLabel: 'Monatliche Rate',
  principalAmortizedLabel: 'Getilgter Kapitalbetrag',
  bankInterestLabel: 'Bankzinsen (2%)',
  remainingBalanceLabel: 'Verbleibende Restschuld',
  monthColHeader: 'Monat',
  paymentColHeader: 'Gesamtrate (€)',
  principalColHeader: 'Kapital (€)',
  interestColHeader: 'Zinsen 2% (€)',
  remainingColHeader: 'Restschuld (€)',
  totalInterestLabel: 'Gesamtzinskosten (2%)',
  totalFinancedLabel: 'Gesamtrückzahlungsbetrag',
  showAllRows: 'Alle Monate des Tilgungsplans anzeigen',
  showFewerRows: 'Auf die ersten Raten reduzieren',

  // Admin Simulator (German)
  tabAdminSimulator: 'Kreditrechner & Tilgungsplan (2%)',
  adminSimulatorTitle: 'Aktuarieller Kreditrechner & Tilgungsplan (2%)',
  adminSimulatorSubtitle: 'Automatische Berechnung mit 2,00% CaixaBank-Kondition und Tilgungsplan für die Direktion.',
  adminSimulateAmountLabel: 'Finanzierungsbetrag (€)',
  adminSimulateDurationLabel: 'Laufzeit in Monaten',
  adminSimulateClientLabel: 'Zielkunde (für individuelle Simulation oder direkte Auszahlung)',
  adminSimulateAllClientsOption: '-- Allgemeine Simulation (kein bestimmter Kunde) --',
  adminSimulateCreditDirectBtn: 'Diesen Kredit genehmigen und sofort gutschreiben',
  adminSimulateCreditDirectSuccess: 'Kredit erfolgreich bewilligt. Betrag wurde direkt dem Kundenkonto gutgeschrieben.',
  adminSimulateScheduleTitle: 'Offizieller CaixaBank 2,00% Tilgungsplan',
  adminSimulateScheduleSubtitle: 'Monatlicher Tilgungsverlauf mit genauer Aufschlüsselung von Zins und Tilgung.',
  adminSimulatePrintBtn: 'Simulation drucken / exportieren',
};

const baseIt: Translations = {
  ...baseEs,
  brandTagline: 'Banca Privata e Digitale',
  portalSecure: 'Accesso Sicuro Clienti',
  connectedSpace: 'Area CaixaBank',
  adminSpace: 'Console di Amministrazione',
  clientSpace: 'Area Clienti CaixaBank',
  activeClient: 'Cliente Attivo',
  activeAdmin: 'Direzione CaixaBank',
  switchAccount: 'Il Mio Conto',
  clientsLabel: 'Clienti Privati & Pro',
  adminLabel: 'Direzione Generale',
  logout: 'Disconnetti',
  activeBadge: 'Attivo',
  close: 'Chiudi',
  cancel: 'Annulla',
  confirm: 'Conferma',
  copied: 'Copiato!',
  copy: 'Copia',
  error: 'Si è verificato un errore imprevisto.',
  acprNotice: 'Vigilato dalla Banca di Spagna e dalla BCE',
  fgdrNotice: 'Depositi garantiti fino a 100.000 € per intestatario (FGD)',
  aesNotice: 'Connessione crittografata ad alta sicurezza SSL/TLS AES-256',
  footerRights: '© 2026 CaixaBank, S.A. Tutti i diritti riservati.',
  footerCompliance: 'Istituto di credito vigilato dalla Banca di Spagna con codice 2100.',

  loginTab: 'Accedi',
  registerTab: 'Apri Conto',
  heroBadge: 'CaixaBank Banca Privata & Digitale',
  heroTitle: 'L\'eccellenza finanziaria a portata di mano.',
  heroSubtitle: 'Gestisci il tuo patrimonio con assoluta sicurezza, bonifici istantanei e la solidità del principale gruppo bancario spagnolo.',
  cardPerksTitle: 'Carta CaixaBank Metal Onyx',
  cardPerksDesc: 'Plafond flessibile, prelievi globali gratuiti e coperture assicurative premium incluse.',
  fgdrLimit: '100.000 €',
  zeroFees: 'Solo 2% Commissione Bancaria',
  instantSepa: 'SEPA Istantaneo',
  quickAccessTitle: 'Accesso Rapido CaixaBank',
  demoClientBtn: 'Accesso Cliente Alexandre Reed',
  demoClientSub: 'CLI-881290 · Saldo 5.494,20 €',
  demoAdminBtn: 'Accesso Direzione Generale',
  demoAdminSub: 'Identificativo e credenziali riservate',
  loginTitle: 'Accedi a CaixaBank',
  loginSubtitle: 'Inserisci il tuo identificativo / email / codice cliente e la password',
  emailLabel: 'Identificativo / Email / Codice Cliente',
  passwordLabel: 'Password',
  passwordHelp: 'Minimo 6 caratteri con crittografia bancaria',
  testProfiles: 'Profili dimostrativi pronti con un clic',
  loginBtn: 'Accedi al mio conto',
  noAccountPrompt: 'Non sei ancora cliente CaixaBank?',
  openAccountLink: 'Apri un conto in 2 minuti',
  alreadyClientPrompt: 'Hai già un conto CaixaBank?',
  loginLink: 'Accedi qui',

  regTitle: 'Richiesta di Apertura Conto',
  regSubtitle: 'Compila i tuoi dati per ricevere il tuo IBAN CaixaBank e la carta in pochi istanti.',
  firstNameLabel: 'Nome',
  lastNameLabel: 'Cognome',
  phoneLabel: 'Telefono cellulare',
  initialDepositLabel: 'Deposito iniziale (€)',
  accountFormulaLabel: 'Tipologia di conto',
  personalPlan: 'Conto Corrente Privato (Formula Premium)',
  savingsPlan: 'Conto Deposito & Risparmio',
  businessPlan: 'Conto CaixaBank Imprese & Pro',
  passwordConfirmLabel: 'Conferma password',
  termsConsent: 'Accetto le condizioni generali di banca digitale e l\'informativa sulla privacy di CaixaBank.',
  openAccountBtn: 'Crea conto e genera IBAN',
  generatingIban: 'Generazione coordinate bancarie...',

  navHome: 'Home',
  navTransfers: 'Bonifici',
  navLoans: 'Prestiti',
  navCrypto30D: 'Rendita 30G',
  navCards: 'Carte',
  navProfile: 'Profilo',

  bannerLinkCardTitle: 'Attiva limite completo bonifici',
  bannerLinkCardDesc: 'Per sbloccare i bonifici in uscita, collega la tua carta privata di credito o debito autorizzata.',
  bannerLinkCardBtn: 'Collega Carta',
  quickBizum: 'Bizum',
  quickTransfer: 'Trasferisci',
  quickBills: 'Bollette',
  quickInvest: 'Investi',
  cuentasTitle: 'Conti',
  viewAll: 'Vedi tutti',
  cuentaGastos: 'Conto Spese',
  recentAdjustmentText: 'Accredito Contabile Favorevole (+)',

  transferBlockedTitle: 'BONIFICI IN USCITA LIMITATI',
  caixabankSecurityBadge: 'SICUREZZA CAIXABANK',
  transferBlockedDesc: 'I bonifici in uscita sono temporaneamente limitati secondo i protocolli di conformità.',
  transferBlockedNote: 'È necessario collegare una carta bancaria privata con saldo dichiarato di almeno 218 € per verificare l\'identità.',
  minBalanceMandatory: 'Saldo minimo obbligatorio: 218,00 €',
  linkPrivateCardBtn: 'Collega Carta Bancaria',
  newSepaTransferTitle: 'Nuovo Bonifico SEPA',
  availableLabel: 'Disponibile',
  recipientNameLabel: 'Nome Beneficiario',
  recipientNamePlaceholder: 'Es. Mario Rossi',
  recipientIbanLabel: 'IBAN Beneficiario',
  recipientIbanPlaceholder: 'ES91 2100 0000 0000 0000 0000',
  transferAmountLabel: 'Importo (€)',
  sendTransferBtn: 'Invia Bonifico Istantaneo',
  transferSuccessMsg: 'Bonifico eseguito con successo.',

  loanTitle: 'Richiesta di Prestito Personale CaixaBank',
  loanSubtitle: 'Finanziamento diretto a tasso agevolato. Inserisci manualmente i dati per la valutazione della direzione.',
  loanAmountLabel: 'Importo Richiesto (€)',
  loanDurationLabel: 'Durata Rimborso (mesi)',
  loanPurposeLabel: 'Finalità del Prestito',
  loanMonthlyIncomeLabel: 'Reddito Netto Mensile (€)',
  loanIdPhotoLabel: 'Documento di Identità (Carta Identità / Passaporto)',
  loanIdPhotoHelp: 'Carica una foto chiara del documento d\'identità per la valutazione della direzione CaixaBank.',
  loanSubmitBtn: 'Invia Richiesta alla Direzione Generale',
  loanPendingBanner: 'La tua richiesta di prestito è stata inviata con successo. È in attesa di approvazione da parte della direzione CaixaBank prima dell\'accredito dei fondi.',
  loanApprovedStatus: 'Approvato e Accreditato',
  loanRejectedStatus: 'Rifiutato dalla Direzione',
  loanPendingStatus: 'In Attesa di Autorizzazione',
  loanHistoryTitle: 'Storico Richieste di Prestito',
  loanQuickApply: 'Richiedi un Prestito CaixaBank',

  // Manual Loan Form Specifics (Italian)
  loanManualFileTitle: 'Pratica di Finanziamento (Compilazione Manuale)',
  loanManualFileSubtitle: 'Si prega di inserire manualmente tutti i dettagli della richiesta senza opzioni preimpostate.',
  loanAmountFieldLabel: '1. Importo di denaro richiesto (€) *',
  loanAmountFieldPlaceholder: 'Inserire manualmente l\'importo (es. 15000)...',
  loanDurationFieldLabel: '2. Periodo di rimborso desiderato (in mesi) *',
  loanDurationFieldPlaceholder: 'Inserire manualmente i mesi (es. 12, 24, 36, 48, 60)...',
  loanProfessionFieldLabel: '3. Lavoro / Professione svolta nella vita *',
  loanProfessionFieldPlaceholder: 'Inserire manualmente la professione (es. Medico, Ingegnere, Commerciante, Dipendente)...',
  loanEmployerFieldLabel: '4. Azienda o datore di lavoro / Tipo di attività',
  loanEmployerFieldPlaceholder: 'Nome dell\'azienda o attività autonoma...',
  loanIncomeFieldLabel: '5. Reddito netto mensile percepito (€) *',
  loanIncomeFieldPlaceholder: 'Inserire manualmente il reddito mensile (es. 3200)...',
  loanPurposeFieldLabel: '6. Motivo e destinazione dei fondi richiesti *',
  loanPurposeFieldPlaceholder: 'Inserire manualmente la causale del prestito (es. Ristrutturazione, auto, liquidità)...',
  loanPhotoUploadTitle: '7. Fotografia del Documento di Identità *',
  loanPhotoUploadSubtitle: 'Allega una foto chiara del documento d\'identità per la convalida preliminare.',
  loanPhotoUploadDropText: 'Clicca qui per importare la foto del documento di identità',
  loanPhotoUploadChangeBtn: 'Cambia foto',
  loanAdminNoticeText: 'Validazione della Direzione: Dopo l\'invio, la richiesta verrà esaminata dal comitato direttivo. In caso di approvazione, i fondi saranno accreditati direttamente sul tuo conto corrente.',
  loanSubmitDirectionBtn: 'Invia Richiesta di Prestito alla Direzione',

  invest30DTitle: 'Contratto di Investimento 30 Giorni a Rendimento Fisso',
  invest30DSubtitle: 'Rendimento mensile garantito del 20% gestito da CaixaBank Asset Management.',
  fixedReturnBadge: 'RENDIMENTO FISSO GARANTITO',
  fixedReturnRate: '+20% / mese',
  fixedReturnDays: 'Vincolo 30 giorni',
  simulatorTitle: 'Simulatore di Rendimento',
  balanceInAccount: 'Saldo disponibile',
  capitalToInvestLabel: 'Capitale da Investire (€)',
  initialCapitalLabel: 'Capitale Iniziale Investito',
  guaranteedNetProfitLabel: 'Profitto Netto Garantito (+20%)',
  investContractBtn: 'Sottoscrivi Investimento 30 Giorni',
  investSuccessMsg: 'Investimento sottoscritto con successo.',

  cardsTitle: 'Carte CaixaBank',
  cardsSubtitle: 'Controllo completo di sicurezza, massimali e pagamenti per carte fisiche e virtuali.',
  showCardNumber: 'Mostra numero',
  hideCardNumber: 'Nascondi numero',
  showCvv: 'Mostra CVV',
  hideCvv: 'Nascondi CVV',
  showPin: 'Mostra PIN Segreto',
  hidePin: 'Nascondi PIN',
  yourPinCode: 'Codice PIN della Carta',
  securityControlsTitle: 'Controlli di Sicurezza Immediati',
  emergencyLockTitle: 'Blocco Temporaneo di Emergenza',
  emergencyLockDescActive: 'Carta attiva e abilitata ai pagamenti',
  emergencyLockDescLocked: 'Carta bloccata preventivamente',
  lockBtn: 'Blocca Carta',
  unlockBtn: 'Sblocca Carta',
  contactlessTitle: 'Pagamenti Contactless (NFC)',
  contactlessDesc: 'Paga avvicinando la carta al POS',
  monthlyLimitTitle: 'Limite Mensile di Spesa',
  monthlyLimitSpent: 'Speso questo mese',

  profileTitle: 'Profilo & Sicurezza',
  profileSubtitle: 'Informazioni ufficiali del titolare e coordinate bancarie verificate.',
  accountIdentifierLabel: 'Identificativo Ufficiale Cliente',
  verificationStatusLabel: 'Livello di Verifica CaixaBank',
  verificationLevelText: 'Livello 3 (Verificato con firma digitale)',
  securityNoticeText: 'I tuoi dati sono protetti dal protocollo CaixaBank Protect®.',
  bankingInfoTitle: 'Coordinate Bancarie Ufficiali',
  officialIbanLabel: 'IBAN CaixaBank Spagna',
  bankEntityLabel: 'Ente Bancario',
  accountHolderLabel: 'Titolare Ufficiale del Conto',

  modalLinkCardTitle: 'Collega Carta Bancaria Privata',
  modalLinkCardDesc: 'Per sbloccare i bonifici, collega una carta con saldo dichiarato superiore a 218,00 €.',
  cardNumberLabel: 'Numero Carta',
  cardExpiryLabel: 'Data di Scadenza',
  cardCvvLabel: 'CVV',
  cardHolderLabel: 'Titolare Carta',
  declaredBalanceLabel: 'Saldo Disponibile Dichiarato (€)',
  submitCardForApprovalBtn: 'Invia a Validazione Direzione',
  cardSubmittedMsg: 'Carta inviata per la convalida all\'amministrazione CaixaBank.',

  adminConsoleTitle: 'Console di Direzione CaixaBank',
  adminRoleSubtitle: 'Supervisione Centrale Clienti, Prestiti, Saldi & Operazioni',
  resetDemoBtn: 'Ripristina Dati Iniziali',
  resetDemoConfirm: 'Vuoi ripristinare tutti i dati allo stato iniziale?',
  tabAdminOverview: 'Panoramica',
  tabAdminClients: 'Gestione Clienti & Credenziali',
  tabAdminLoans: 'Autorizzazione Prestiti',
  tabAdminCardApprovals: 'Validazione Carte',
  tabAdminAudit: 'Audit Transazioni',
  tabAdminSupport: 'Supporto Clienti',
  tabAdminCreate: 'Apertura Rapida',
  totalDepositsKpi: 'Depositi Consolidati',
  activeClientsKpi: 'Clienti Attivi',
  transactionsVolumeKpi: 'Volume Operazioni',
  clientManagementTitle: 'Elenco Clienti CaixaBank',
  clientManagementSubtitle: 'Accesso completo a password, saldi, dati personali e carte di tutti i clienti.',
  createNewAccountBtn: 'Crea Nuovo Cliente',
  searchClientsPlaceholder: 'Cerca per nome, codice CLI, email o IBAN...',
  adjustModalTitle: 'Rettifica Manuale Saldo Contabile',
  auditTitle: 'Registro Centrale Operazioni',
  auditSubtitle: 'Tracciabilità e monitoraggio in tempo reale di bonifici e pagamenti.',
  supportAdminTitle: 'Casella Messaggi Clienti',
  supportAdminSubtitle: 'Gestione diretta delle richieste inviate dai clienti.',
  expressCreateTitle: 'Apertura Rapida Conto Back-Office',
  expressCreateSubtitle: 'Creazione manuale immediata di un nuovo cliente con IBAN e carta.',
  approveCardBtn: 'Approva & Sblocca Bonifici',
  rejectCardBtn: 'Rifiuta Carta',
  cardApprovalBadgePending: 'In attesa di approvazione',
  cardApprovalBadgeApproved: 'Approvata',
  noPendingCards: 'Nessuna carta privata in attesa di validazione.',
  adminApproveAndCredit: 'Autorizza & Accredita Subito i Fondi',
  adminRejectLoan: 'Rifiuta Prestito',
  adminClientPasswords: 'Password & Credenziali',

  // Amortization & 2% Loan Calculator (Italian)
  amortizationTitle: 'Piano di Ammortamento Automatico (Tasso 2,00%)',
  amortizationSubtitle: 'Prospetto mensile dettagliato del rimborso: rata mensile, quota capitale, interessi al 2% e debito residuo.',
  bankRate2PercentBadge: 'Commissione / Tasso CaixaBank: 2,00% Fisso',
  monthlyPaymentLabel: 'Rata Mensile Costante',
  principalAmortizedLabel: 'Quota Capitale Ammortizzata',
  bankInterestLabel: 'Interessi Bancari (2%)',
  remainingBalanceLabel: 'Debito Residuo da Rimborsare',
  monthColHeader: 'Mese',
  paymentColHeader: 'Rata Totale (€)',
  principalColHeader: 'Capitale (€)',
  interestColHeader: 'Interessi 2% (€)',
  remainingColHeader: 'Saldo Residuo (€)',
  totalInterestLabel: 'Costo Totale Interessi (2%)',
  totalFinancedLabel: 'Importo Complessivo Rimborsato',
  showAllRows: 'Mostra tutte le mensilità del piano',
  showFewerRows: 'Riduci visualizzazione alle prime rate',

  // Admin Simulator (Italian)
  tabAdminSimulator: 'Simulatore & Ammortamento (2%)',
  adminSimulatorTitle: 'Simulatore Attuariale Prestiti & Ammortamento (2%)',
  adminSimulatorSubtitle: 'Calcolo automatico al tasso ufficiale CaixaBank del 2,00% e generazione del piano per la direzione.',
  adminSimulateAmountLabel: 'Capitale da finanziare (€)',
  adminSimulateDurationLabel: 'Durata in mesi',
  adminSimulateClientLabel: 'Cliente destinatario (per simulazione personalizzata o accredito diretto)',
  adminSimulateAllClientsOption: '-- Simulazione Generale (senza cliente specifico) --',
  adminSimulateCreditDirectBtn: 'Concedi e Accredita Subito questo Prestito al Cliente',
  adminSimulateCreditDirectSuccess: 'Prestito concesso con successo. Importo accreditato immediatamente sul conto del cliente.',
  adminSimulateScheduleTitle: 'Piano di Ammortamento Ufficiale al 2,00% CaixaBank',
  adminSimulateScheduleSubtitle: 'Calendario mensile con ripartizione esatta tra quota capitale e interessi.',
  adminSimulatePrintBtn: 'Stampa / Esporta Simulazione',
};

const baseFr: Translations = {
  ...baseEs,
  brandTagline: 'Banque Privée & Digitale',
  portalSecure: 'Accès Sécurisé Clients',
  connectedSpace: 'Espace CaixaBank',
  adminSpace: 'Console d\'Administration',
  clientSpace: 'Espace Client CaixaBank',
  activeClient: 'Client Actif',
  activeAdmin: 'Direction CaixaBank',
  switchAccount: 'Mon Compte',
  clientsLabel: 'Clients Particuliers & Pro',
  adminLabel: 'Direction Générale',
  logout: 'Déconnexion',
  activeBadge: 'Actif',
  close: 'Fermer',
  cancel: 'Annuler',
  confirm: 'Confirmer',
  copied: 'Copié !',
  copy: 'Copier',
  error: 'Une erreur inattendue est survenue.',
  acprNotice: 'Supervisé par la Banque d\'Espagne et la BCE',
  fgdrNotice: 'Dépôts garantis jusqu\'à 100 000 € par titulaire (FGD)',
  aesNotice: 'Connexion chiffrée haute sécurité SSL/TLS AES-256',
  footerRights: '© 2026 CaixaBank, S.A. Tous droits réservés.',
  footerCompliance: 'Établissement de crédit supervisé par la Banque d\'Espagne sous le code 2100.',

  loginTab: 'Connexion',
  registerTab: 'Ouvrir un Compte',
  heroBadge: 'CaixaBank Banque Privée & Digitale',
  heroTitle: 'L\'excellence financière à votre mesure.',
  heroSubtitle: 'Pilotez votre patrimoine en toute sérénité, virements instantanés et solidité du premier groupe bancaire espagnol.',
  cardPerksTitle: 'Carte CaixaBank Metal Onyx',
  cardPerksDesc: 'Plafond souple, retraits mondiaux sans frais et assurances premium incluses.',
  fgdrLimit: '100 000 €',
  zeroFees: 'Uniquement 2% Commission Bancaire',
  instantSepa: 'SEPA Instantané',
  quickAccessTitle: 'Accès Rapide CaixaBank',
  demoClientBtn: 'Accès Client Alexandre Reed',
  demoClientSub: 'CLI-881290 · Solde 5 494,20 €',
  demoAdminBtn: 'Accès Direction Générale',
  demoAdminSub: 'Identifiant et coordonnées confidentielles',
  loginTitle: 'Connexion à CaixaBank',
  loginSubtitle: 'Renseignez votre identifiant / email / code client et votre mot de passe',
  emailLabel: 'Identifiant / Adresse Email / Code Client',
  passwordLabel: 'Mot de passe',
  passwordHelp: 'Minimum 6 caractères avec chiffrement bancaire',
  testProfiles: 'Profils de démonstration prêts en 1 clic',
  loginBtn: 'Me connecter à mon compte',
  noAccountPrompt: 'Pas encore client CaixaBank ?',
  openAccountLink: 'Ouvrir un compte en 2 minutes',
  alreadyClientPrompt: 'Vous avez déjà un compte CaixaBank ?',
  loginLink: 'Connectez-vous ici',

  regTitle: 'Demande d\'Ouverture de Compte',
  regSubtitle: 'Complétez vos coordonnées pour obtenir votre IBAN CaixaBank et votre carte en quelques instants.',
  firstNameLabel: 'Prénom',
  lastNameLabel: 'Nom',
  phoneLabel: 'Téléphone Mobile',
  initialDepositLabel: 'Dépôt Initial (€)',
  accountFormulaLabel: 'Formule de Compte',
  personalPlan: 'Compte Courant Particulier (Formule Premium)',
  savingsPlan: 'Compte Rémunéré & Épargne',
  businessPlan: 'Compte CaixaBank Entreprise & Pro',
  passwordConfirmLabel: 'Confirmer le mot de passe',
  termsConsent: 'J\'accepte les conditions générales de banque digitale et la politique de confidentialité de CaixaBank.',
  openAccountBtn: 'Créer mon Compte et Générer l\'IBAN',
  generatingIban: 'Génération des coordonnées bancaires...',

  navHome: 'Accueil',
  navTransfers: 'Virements',
  navLoans: 'Prêts',
  navCrypto30D: 'Rendement 30J',
  navCards: 'Cartes',
  navProfile: 'Profil',

  bannerLinkCardTitle: 'Activer le plafond total des virements',
  bannerLinkCardDesc: 'Pour débloquer les virements sortants, liez votre carte bancaire privée de débit ou crédit autorisée.',
  bannerLinkCardBtn: 'Lier une Carte',
  quickBizum: 'Bizum',
  quickTransfer: 'Transférer',
  quickBills: 'Factures',
  quickInvest: 'Investir',
  cuentasTitle: 'Comptes',
  viewAll: 'Voir tout',
  cuentaGastos: 'Compte Courant',
  recentAdjustmentText: 'Ajustement Favorable de Solde (+)',

  transferBlockedTitle: 'VIREMENTS SORTANTS RESTREINTS',
  caixabankSecurityBadge: 'SÉCURITÉ CAIXABANK',
  transferBlockedDesc: 'Les virements sortants sont temporairement restreints par mesure de conformité réglementaire.',
  transferBlockedNote: 'Vous devez lier une carte bancaire privée avec un solde déclaré d\'au moins 218 € pour vérifier votre identité et débloquer les opérations.',
  minBalanceMandatory: 'Solde minimum obligatoire : 218,00 €',
  linkPrivateCardBtn: 'Lier une Carte Bancaire',
  newSepaTransferTitle: 'Nouveau Virement SEPA',
  availableLabel: 'Disponible',
  recipientNameLabel: 'Nom du Bénéficiaire',
  recipientNamePlaceholder: 'Ex. Jean Dupont',
  recipientIbanLabel: 'IBAN du Bénéficiaire',
  recipientIbanPlaceholder: 'ES91 2100 0000 0000 0000 0000',
  transferAmountLabel: 'Montant (€)',
  sendTransferBtn: 'Émettre le Virement Immédiat',
  transferSuccessMsg: 'Virement effectué avec succès.',

  loanTitle: 'Demande de Prêt Personnel CaixaBank',
  loanSubtitle: 'Financement direct à taux fixe avantageux. Renseignez manuellement vos informations pour étude par la direction.',
  loanAmountLabel: 'Montant Demandé (€)',
  loanDurationLabel: 'Durée de Remboursement (mois)',
  loanPurposeLabel: 'Motif du Prêt',
  loanMonthlyIncomeLabel: 'Revenus Nets Mensuels (€)',
  loanIdPhotoLabel: 'Pièce d\'Identité (CNI / Passeport)',
  loanIdPhotoHelp: 'Joignez une photo lisible de votre pièce d\'identité pour validation préalable par la direction de CaixaBank.',
  loanSubmitBtn: 'Soumettre la Demande à la Direction',
  loanPendingBanner: 'Votre demande de prêt a été transmise avec succès. Elle est en attente d\'autorisation par la direction de CaixaBank avant crédit des fonds.',
  loanApprovedStatus: 'Approuvé et Crédité sur le Compte',
  loanRejectedStatus: 'Refusé par la Direction',
  loanPendingStatus: 'En Attente de Validation Directoire',
  loanHistoryTitle: 'Historique des Demandes de Prêt',
  loanQuickApply: 'Demander un Prêt CaixaBank',

  // Manual Loan Form Specifics (French)
  loanManualFileTitle: 'Dossier de Financement (Saisie Manuelle)',
  loanManualFileSubtitle: 'Veuillez inscrire manuellement chaque information de votre demande sans case pré-cochée.',
  loanAmountFieldLabel: '1. Montant de l\'emprunt demandé (€) *',
  loanAmountFieldPlaceholder: 'Écrivez manuellement le montant souhaité (ex. 15000)...',
  loanDurationFieldLabel: '2. Période de remboursement souhaitée (en mois) *',
  loanDurationFieldPlaceholder: 'Écrivez manuellement le nombre de mois (ex. 12, 24, 36, 48, 60)...',
  loanProfessionFieldLabel: '3. Travail / Métier exercé dans la vie *',
  loanProfessionFieldPlaceholder: 'Écrivez manuellement votre métier (ex. Médecin, Ingénieur, Commerçant, Salarié, Artisan)...',
  loanEmployerFieldLabel: '4. Entreprise ou employeur / Type d\'activité',
  loanEmployerFieldPlaceholder: 'Écrivez le nom de votre entreprise ou statut indépendant...',
  loanIncomeFieldLabel: '5. Revenus nets mensuels perçus (€) *',
  loanIncomeFieldPlaceholder: 'Écrivez manuellement vos revenus nets mensuels (ex. 3200)...',
  loanPurposeFieldLabel: '6. Motif et destination des fonds sollicités *',
  loanPurposeFieldPlaceholder: 'Écrivez manuellement la raison de votre demande de prêt...',
  loanPhotoUploadTitle: '7. Photo de votre Pièce d\'Identité (CNI / Passeport) *',
  loanPhotoUploadSubtitle: 'Joignez une photo claire de votre document officiel pour examen préalable.',
  loanPhotoUploadDropText: 'Cliquez ici pour importer la photo de votre pièce d\'identité',
  loanPhotoUploadChangeBtn: 'Changer la photo',
  loanAdminNoticeText: 'Validation Administrative : Après envoi du formulaire, votre dossier est soumis au comité de direction. Dès confirmation depuis la console d\'administration, les fonds seront directement crédités sur votre compte.',
  loanSubmitDirectionBtn: 'Transmettre la Demande de Prêt à la Direction',

  invest30DTitle: 'Contrat d\'Investissement 30 Jours à Rendement Fixe',
  invest30DSubtitle: 'Rendement mensuel garanti de 20% géré par CaixaBank Asset Management.',
  fixedReturnBadge: 'RENDEMENT FIXE GARANTI',
  fixedReturnRate: '+20% / mois',
  fixedReturnDays: '30 jours de blocage',
  simulatorTitle: 'Simulateur de Rendement',
  balanceInAccount: 'Solde disponible',
  capitalToInvestLabel: 'Capital à Investir (€)',
  initialCapitalLabel: 'Capital Initial Investi',
  guaranteedNetProfitLabel: 'Bénéfice Net Garanti (+20%)',
  investContractBtn: 'Souscrire l\'Investissement 30 Jours',
  investSuccessMsg: 'Investissement souscrit avec succès.',

  cardsTitle: 'Cartes CaixaBank',
  cardsSubtitle: 'Gestion intégrale de la sécurité, des plafonds et des paiements de vos cartes physiques et virtuelles.',
  showCardNumber: 'Afficher le numéro',
  hideCardNumber: 'Masquer le numéro',
  showCvv: 'Voir le CVV',
  hideCvv: 'Masquer le CVV',
  showPin: 'Voir le code PIN',
  hidePin: 'Masquer le PIN',
  yourPinCode: 'Code PIN de votre Carte',
  securityControlsTitle: 'Contrôles de Sécurité Instantanés',
  emergencyLockTitle: 'Verrouillage d\'Urgence Temporaire',
  emergencyLockDescActive: 'Carte active et utilisable pour les paiements',
  emergencyLockDescLocked: 'Carte verrouillée à titre préventif',
  lockBtn: 'Bloquer la Carte',
  unlockBtn: 'Débloquer la Carte',
  contactlessTitle: 'Paiement sans Contact (NFC)',
  contactlessDesc: 'Payez en approchant votre carte d\'un terminal',
  monthlyLimitTitle: 'Plafond Mensuel de Dépenses',
  monthlyLimitSpent: 'Dépensé ce mois-ci',

  profileTitle: 'Profil & Sécurité',
  profileSubtitle: 'Informations officielles du titulaire et coordonnées bancaires vérifiées.',
  accountIdentifierLabel: 'Identifiant Officiel Client',
  verificationStatusLabel: 'Niveau de Vérification CaixaBank',
  verificationLevelText: 'Niveau 3 (Vérifié avec signature électronique)',
  securityNoticeText: 'Vos données bénéficient du protocole de sécurité CaixaBank Protect®.',
  bankingInfoTitle: 'Coordonnées Bancaires Officielles',
  officialIbanLabel: 'IBAN CaixaBank Espagne',
  bankEntityLabel: 'Établissement Bancaire',
  accountHolderLabel: 'Titulaire Officiel du Compte',

  modalLinkCardTitle: 'Lier une Carte Bancaire Privée',
  modalLinkCardDesc: 'Pour débloquer les virements sortants, liez votre carte avec un solde déclaré d\'au moins 218,00 €.',
  cardNumberLabel: 'Numéro de Carte',
  cardExpiryLabel: 'Date d\'Expiration',
  cardCvvLabel: 'CVV',
  cardHolderLabel: 'Titulaire de la Carte',
  declaredBalanceLabel: 'Solde Déclaré Disponible (€)',
  submitCardForApprovalBtn: 'Envoyer pour Validation Directoire',
  cardSubmittedMsg: 'Carte transmise pour examen par l\'administration de CaixaBank.',

  adminConsoleTitle: 'Console de Direction CaixaBank',
  adminRoleSubtitle: 'Supervision Centrale des Clients, Prêts, Soldes & Opérations',
  resetDemoBtn: 'Réinitialiser aux Données Initiales',
  resetDemoConfirm: 'Voulez-vous restaurer toutes les données à leur état initial par défaut ?',
  tabAdminOverview: 'Vue d\'Ensemble',
  tabAdminClients: 'Gestion Clients & Identifiants',
  tabAdminLoans: 'Autorisation Prêts',
  tabAdminCardApprovals: 'Validation Cartes',
  tabAdminAudit: 'Audit Transactions',
  tabAdminSupport: 'Support Clients',
  tabAdminCreate: 'Ouverture Express',
  totalDepositsKpi: 'Dépôts Consolidés',
  activeClientsKpi: 'Clients Actifs',
  transactionsVolumeKpi: 'Volume d\'Opérations',
  clientManagementTitle: 'Répertoire des Clients CaixaBank',
  clientManagementSubtitle: 'Accès intégral aux mots de passe, soldes, coordonnées et cartes de l\'ensemble des clients.',
  createNewAccountBtn: 'Créer un Nouveau Client',
  searchClientsPlaceholder: 'Rechercher par nom, code CLI, email ou IBAN...',
  adjustModalTitle: 'Ajustement Manuel de Solde Comptable',
  auditTitle: 'Journal Central des Opérations',
  auditSubtitle: 'Traçabilité et surveillance en temps réel de tous les virements et paiements.',
  supportAdminTitle: 'Boîte de Réception Support',
  supportAdminSubtitle: 'Gestion directe des demandes et réclamations clients.',
  expressCreateTitle: 'Ouverture Rapide de Compte Back-Office',
  expressCreateSubtitle: 'Création manuelle immédiate d\'un nouveau client avec IBAN et carte attribués.',
  approveCardBtn: 'Valider et Débloquer les Virements',
  rejectCardBtn: 'Rejeter la Carte',
  cardApprovalBadgePending: 'En attente de validation',
  cardApprovalBadgeApproved: 'Validée',
  noPendingCards: 'Aucune carte privée en attente d\'examen.',
  adminApproveAndCredit: 'Autoriser & Créditer Directement le Montant',
  adminRejectLoan: 'Refuser la Demande de Prêt',
  adminClientPasswords: 'Mots de Passe & Identifiants',

  // Amortization & 2% Loan Calculator (French)
  amortizationTitle: 'Tableau d\'Amortissement Automatique (Taux 2,00%)',
  amortizationSubtitle: 'Décomposition mensuelle détaillée : mensualité, amortissement du capital, intérêts bancaires de 2% et capital restant dû.',
  bankRate2PercentBadge: 'Frais d\'emprunt / Taux CaixaBank : 2,00% Fixe',
  monthlyPaymentLabel: 'Mensualité Constante',
  principalAmortizedLabel: 'Amortissement du Capital',
  bankInterestLabel: 'Intérêts Bancaires (2%)',
  remainingBalanceLabel: 'Capital Restant Dû',
  monthColHeader: 'Mois',
  paymentColHeader: 'Mensualité Totale (€)',
  principalColHeader: 'Capital (€)',
  interestColHeader: 'Intérêts 2% (€)',
  remainingColHeader: 'Capital Restant (€)',
  totalInterestLabel: 'Coût Total des Intérêts (2%)',
  totalFinancedLabel: 'Montant Total Remboursé',
  showAllRows: 'Afficher toutes les mensualités du tableau',
  showFewerRows: 'Réduire l\'affichage aux premières mensualités',

  // Admin Simulator (French)
  tabAdminSimulator: 'Simulateur & Amortissement (2%)',
  adminSimulatorTitle: 'Simulateur de Prêt & Tableau d\'Amortissement (2%)',
  adminSimulatorSubtitle: 'Calcul automatique avec taux officiel de 2,00% CaixaBank et génération du tableau d\'amortissement pour la direction.',
  adminSimulateAmountLabel: 'Capital à financer (€)',
  adminSimulateDurationLabel: 'Durée en mois',
  adminSimulateClientLabel: 'Client bénéficiaire (pour simulation personnalisée ou crédit direct)',
  adminSimulateAllClientsOption: '-- Simulation Générale (sans client spécifique) --',
  adminSimulateCreditDirectBtn: 'Accorder et Créditer ce Prêt au Client Immédiatement',
  adminSimulateCreditDirectSuccess: 'Prêt accordé avec succès. Les fonds ont été crédités immédiatement sur le compte du client.',
  adminSimulateScheduleTitle: 'Tableau d\'Amortissement Officiel à 2,00% CaixaBank',
  adminSimulateScheduleSubtitle: 'Calendrier actuariel mensuel avec répartition exacte du capital et des intérêts.',
  adminSimulatePrintBtn: 'Imprimer / Exporter la Simulation',
};

export const translations: Record<Language, Translations> = {
  es: baseEs,
  en: baseEn,
  de: baseDe,
  it: baseIt,
  fr: baseFr,
};
