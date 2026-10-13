export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export interface LoanCalculationResult {
  amount: number;
  durationMonths: number;
  ratePercent: number; // 2%
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  schedule: AmortizationRow[];
}

/**
 * Calculates French/standard amortization schedule with exact 2% annual bank interest rate.
 * Formula: M = P * (i / (1 - (1+i)^-n)) where i = r / 12
 */
export function calculateLoanAmortization(
  amount: number,
  durationMonths: number,
  annualRatePercent: number = 2.0
): LoanCalculationResult {
  if (amount <= 0 || durationMonths <= 0) {
    return {
      amount: 0,
      durationMonths: 0,
      ratePercent: annualRatePercent,
      monthlyPayment: 0,
      totalInterest: 0,
      totalPayment: 0,
      schedule: [],
    };
  }

  const r = annualRatePercent / 100;
  const monthlyRate = r / 12;

  // Monthly annuity payment
  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = amount / durationMonths;
  } else {
    monthlyPayment =
      (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -durationMonths));
  }

  const schedule: AmortizationRow[] = [];
  let remainingBalance = amount;
  let totalInterest = 0;

  for (let m = 1; m <= durationMonths; m++) {
    const interest = remainingBalance * monthlyRate;
    let principal = monthlyPayment - interest;

    // Adjust last month rounding
    if (m === durationMonths || principal > remainingBalance) {
      principal = remainingBalance;
      remainingBalance = 0;
    } else {
      remainingBalance -= principal;
    }

    totalInterest += interest;

    schedule.push({
      month: m,
      payment: Number((principal + interest).toFixed(2)),
      principal: Number(principal.toFixed(2)),
      interest: Number(interest.toFixed(2)),
      remainingBalance: Number(Math.max(0, remainingBalance).toFixed(2)),
    });
  }

  return {
    amount,
    durationMonths,
    ratePercent: annualRatePercent,
    monthlyPayment: Number(monthlyPayment.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2)),
    totalPayment: Number((amount + totalInterest).toFixed(2)),
    schedule,
  };
}
