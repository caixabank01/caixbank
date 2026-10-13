/**
 * CaixaBank Automatic Translation Engine (French -> Spanish)
 * Translates administrative banking text, reasons, notifications, and client communications
 * from French into official Spanish before sending to clients.
 */

// Common banking phrases and templates
const PHRASE_MAPPINGS: [RegExp, string][] = [
  // Greetings & Courtesies
  [/^bonjour\b/i, 'Estimado/a cliente,'],
  [/^cher client\b/i, 'Estimado cliente,'],
  [/^chère cliente\b/i, 'Estimada cliente,'],
  [/^cordialement\b/i, 'Atentamente, Dirección CaixaBank.'],
  [/^l'équipe caixabank\b/i, 'El equipo de CaixaBank'],
  [/^la direction caixabank\b/i, 'La Dirección de CaixaBank'],

  // Loan decisions
  [/prêt accordé|demande de prêt validée|prêt accepté/i, 'préstamo aprobado y autorizado'],
  [/prêt refusé|demande de prêt rejetée|prêt rejeté/i, 'solicitud de préstamo denegada'],
  [/fonds versés sur votre compte|fonds disponibles/i, 'fondos abonados directamente en su cuenta'],
  [/capacité de remboursement insuffisante/i, 'capacidad de endeudamiento insuficiente según criterios de riesgo vigentes'],
  [/taux préférentiel de 2%/i, 'tasa de interés preferencial reducida del 2%'],
  [/justificatif manquant|pièce d'identité non conforme/i, 'documentación identificativa incompleta o no conforme'],

  // Account & Security
  [/votre compte est activé|compte vérifié/i, 'su cuenta ha sido activada y verificada con éxito'],
  [/votre compte a été bloqué|compte suspendu/i, 'su cuenta ha sido bloqueada temporalmente por motivos de seguridad'],
  [/virements débloqués|virements autorisés/i, 'transferencias salientes autorizadas y habilitadas'],
  [/virements bloqués/i, 'transferencias temporalmente bloqueadas por verificación de seguridad'],
  [/votre carte bancaire est activée/i, 'su tarjeta bancaria se encuentra activa y operativa'],
  [/votre carte est bloquée|carte gelée/i, 'su tarjeta bancaria ha sido bloqueada temporalmente'],
  [/ajustement comptable favorable/i, 'ajuste contable favorable CaixaBank'],
  [/ajustement comptable débit/i, 'ajuste contable cargo en cuenta'],

  // General Notification Types
  [/alerte de sécurité/i, 'Aviso de Seguridad'],
  [/information compte/i, 'Información de Cuenta'],
  [/accord de financement/i, 'Acuerdo de Financiación'],
  [/validation de virement/i, 'Validación de Transferencia'],
  [/avis officiel caixabank/i, 'Comunicación Oficial CaixaBank'],
];

// Single word & Banking vocabulary dictionary
const WORD_DICTIONARY: Record<string, string> = {
  // Verbs
  'bonjour': 'estimado cliente,',
  'merci': 'gracias',
  'veuillez': 'le rogamos',
  'consulter': 'consultar',
  'contacter': 'contactar con',
  'valider': 'validar',
  'confirmer': 'confirmar',
  'vérifier': 'verificar',
  'envoyer': 'enviar',
  'fournir': 'aportar',
  'recevoir': 'recibir',
  'verser': 'ingresar',
  'créditer': 'abonar',
  'débiter': 'cargar',
  'bloquer': 'bloquear',
  'débloquer': 'desbloquear',
  'activer': 'activar',
  'suspendre': 'suspender',
  'approuver': 'aprobar',
  'rejeter': 'denegar',
  'refuser': 'rechazar',
  'autoriser': 'autorizar',

  // Nouns
  'compte': 'cuenta',
  'comptes': 'cuentas',
  'solde': 'saldo',
  'virement': 'transferencia',
  'virements': 'transferencias',
  'prêt': 'préstamo',
  'prêts': 'préstamos',
  'crédit': 'crédito',
  'crédits': 'créditos',
  'carte': 'tarjeta',
  'cartes': 'tarjetas',
  'sécurité': 'seguridad',
  'banque': 'banco',
  'bancaire': 'bancario',
  'bancaires': 'bancarios',
  'client': 'cliente',
  'clients': 'clientes',
  'direction': 'dirección',
  'fonds': 'fondos',
  'montant': 'importe',
  'frais': 'comisiones',
  'commission': 'comisión',
  'taux': 'tasa',
  'intérêt': 'interés',
  'mensualité': 'cuota mensual',
  'mensualités': 'cuotas mensuales',
  'durée': 'plazo',
  'justificatif': 'documento justificativo',
  'pièce': 'documento',
  'identité': 'identidad',
  'notification': 'notificación',
  'message': 'mensaje',
  'avis': 'aviso',
  'opération': 'operación',
  'opérations': 'operaciones',
  'ajustement': 'ajuste',
  'succès': 'éxito',
  'immédiat': 'inmediato',
  'immédiate': 'inmediata',
  'disponible': 'disponible',
  'accord': 'acuerdo',
  'motif': 'motivo',
  'résolution': 'resolución',
  'gestionnaire': 'gestor',
  'conseiller': 'asesor',
  'épargne': 'ahorro',
  'courant': 'corriente',

  // Adjectives & adverbs
  'favorable': 'favorable',
  'officiel': 'oficial',
  'officielle': 'oficial',
  'important': 'importante',
  'urgente': 'urgente',
  'urgent': 'urgente',
  'actif': 'activo',
  'active': 'activa',
  'bloqué': 'bloqueado',
  'bloquée': 'bloqueada',
  'validé': 'validado',
  'validée': 'validada',
  'approuvé': 'aprobado',
  'approuvée': 'aprobada',
  'rejeté': 'denegado',
  'rejetée': 'denegada',
  'automatique': 'automático',
  'gratuit': 'gratuito',
  'réduit': 'reducido',
  'réduite': 'reducida',
  'nouveau': 'nuevo',
  'nouvelle': 'nueva',

  // Prepositions / conjunctions / pronouns
  'avec': 'con',
  'pour': 'para',
  'votre': 'su',
  'vos': 'sus',
  'notre': 'nuestro',
  'nos': 'nuestros',
  'dans': 'en',
  'sur': 'en',
  'par': 'por',
  'sans': 'sin',
  'sous': 'bajo',
  'très': 'muy',
  'plus': 'más',
  'bien': 'bien',
  'tout': 'todo',
  'tous': 'todos',
  'toute': 'toda',
  'toutes': 'todas',
  'est': 'está',
  'sont': 'están',
  'été': 'sido',
  'a': 'ha',
  'ont': 'han',
};

/**
 * Automatically translates French text to Spanish suitable for banking communication
 */
export function translateFrenchToSpanish(frenchText: string): string {
  if (!frenchText || !frenchText.trim()) return '';

  let text = frenchText.trim();

  // 1. First check phrase templates
  for (const [pattern, replacement] of PHRASE_MAPPINGS) {
    text = text.replace(pattern, replacement);
  }

  // 2. Tokenize and replace known vocabulary while preserving punctuation and numbers
  // Split on words while preserving delimiters
  const tokens = text.split(/([a-zA-ZÀ-ÿ0-9€$%,.:;!?'"()/\-\s]+)/g).filter(Boolean);

  const translatedTokens = tokens.map((segment) => {
    // If it's pure whitespace or symbols, preserve
    if (/^\s+$/.test(segment) || /^[\d€$%,.:;!?'"()/\-]+$/.test(segment)) {
      return segment;
    }

    // Split into words
    return segment.replace(/\b([a-zA-ZÀ-ÿ]+)\b/g, (match) => {
      const lower = match.toLowerCase();
      if (WORD_DICTIONARY[lower]) {
        const replacement = WORD_DICTIONARY[lower];
        // Preserve title case if original was capitalized
        if (match[0] === match[0].toUpperCase() && match.slice(1) === match.slice(1).toLowerCase()) {
          return replacement.charAt(0).toUpperCase() + replacement.slice(1);
        }
        return replacement;
      }
      return match;
    });
  });

  let result = translatedTokens.join('');

  // 3. Clean up common Spanish banking conventions
  result = result
    .replace(/\bsu compte\b/gi, 'su cuenta')
    .replace(/\bsu solde\b/gi, 'su saldo')
    .replace(/\ben el cuenta\b/gi, 'en la cuenta')
    .replace(/\bde el\b/gi, 'del')
    .replace(/\ba el\b/gi, 'al');

  // Capitalize first letter
  if (result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  return result;
}

/**
 * Predefined quick notification templates in French with their official Spanish translations
 */
export interface NotificationTemplate {
  id: string;
  category: string;
  categoryEs: string;
  titleFr: string;
  titleEs: string;
  messageFr: string;
  messageEs: string;
}

export const OFFICIAL_NOTIFICATION_TEMPLATES: NotificationTemplate[] = [
  {
    id: 'tpl_loan_approved',
    category: 'Financement',
    categoryEs: 'Financiación',
    titleFr: 'Demande de Prêt CaixaBank Accordée',
    titleEs: 'Préstamo Personal CaixaBank Concedido y Abonado',
    messageFr: 'La Direction CaixaBank a le plaisir de vous informer que votre demande de prêt a été approuvée avec succès au taux réduit préférentiel de 2%. Les fonds sont disponibles immédiatement sur votre compte.',
    messageEs: 'La Dirección de CaixaBank le comunica que su solicitud de préstamo ha sido aprobada favorablemente al tipo de interés preferencial reducido del 2%. Los fondos ya están disponibles en su cuenta.',
  },
  {
    id: 'tpl_account_verified',
    category: 'Sécurité & Accès',
    categoryEs: 'Seguridad y Cuenta',
    titleFr: 'Compte CaixaBank Vérifié & Certifié',
    titleEs: 'Cuenta CaixaBank Verificada y Certificada',
    messageFr: 'Votre dossier client a été validé par la Direction. Votre compte bénéficie du statut de Confiance Maximale. Vos virements et opérations sont pleinement autorisés sans restriction.',
    messageEs: 'Su expediente de cliente ha sido validado por la Dirección. Su cuenta disfruta de estado de Máxima Confianza. Sus transferencias y operativas están plenamente autorizadas.',
  },
  {
    id: 'tpl_card_approved',
    category: 'Carte Bancaire',
    categoryEs: 'Tarjeta Privada',
    titleFr: 'Carte Privée Validée avec Succès',
    titleEs: 'Tarjeta Privada Aprobada con Éxito',
    messageFr: 'Votre carte bancaire privée a été certifiée par notre service conformité. Les plafonds de virement ont été débloqués avec effet immédiat.',
    messageEs: 'Su tarjeta privada ha sido certificada por nuestro departamento de riesgos. Las transferencias y operativas han sido desbloqueadas con efecto inmediato.',
  },
  {
    id: 'tpl_transfer_completed',
    category: 'Virement',
    categoryEs: 'Transferencia',
    titleFr: 'Virement Exécuté avec Succès',
    titleEs: 'Transferencia Bancaria Ejecutada con Éxito',
    messageFr: 'Votre ordre de virement bancaire a été validé et télétransmis au réseau interbancaire avec accusé de réception officiel CaixaBank.',
    messageEs: 'Su orden de transferencia ha sido validada y emitida a través de la red bancaria con acuse de recibo oficial de CaixaBank.',
  },
  {
    id: 'tpl_security_notice',
    category: 'Sécurité',
    categoryEs: 'Aviso de Seguridad',
    titleFr: 'Information Importante sur Votre Sécurité',
    titleEs: 'Aviso Importante sobre la Seguridad de su Cuenta',
    messageFr: 'Pour votre protection, nous vous rappelons que vos identifiants sont strictement confidentiels. Votre conseiller reste à votre entière disposition.',
    messageEs: 'Por su seguridad, le recordamos que sus claves y credenciales son estrictamente confidenciales. Su gestor bancario queda a su entera disposición.',
  },
  {
    id: 'tpl_loan_rejected',
    category: 'Financement',
    categoryEs: 'Financiación',
    titleFr: 'Information relative à votre Demande de Financement',
    titleEs: 'Resolución sobre su Solicitud de Financiación',
    messageFr: 'Après examen technique de votre dossier, nous ne sommes pas en mesure de donner une suite favorable à votre demande à ce stade. Nous vous invitons à contacter votre conseiller.',
    messageEs: 'Tras el examen técnico de su solicitud, no ha sido posible autorizar la operación en este momento. Le invitamos a contactar con su gestor para nuevas opciones.',
  },
];
