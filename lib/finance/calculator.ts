/**
 * Financial Modeling SDK
 * Core math for ROI, Yield, and Amortization schedules.
 */

export interface MortgageParams {
  principal: number;
  annualInterestRate: number;
  years: number;
}

export interface ROIParams {
  purchasePrice: number;
  annualRent: number;
  serviceCharges: number;
  managementFeePercent?: number;
}

export function calculateMonthlyPayment(params: MortgageParams): number {
  const p = params.principal;
  const r = params.annualInterestRate / 100 / 12;
  const n = params.years * 12;

  if (r === 0) return p / n;

  return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function calculateNetYield(params: ROIParams): number {
  const managementFee = params.managementFeePercent
    ? params.annualRent * (params.managementFeePercent / 100)
    : 0;

  const netIncome = params.annualRent - params.serviceCharges - managementFee;
  return (netIncome / params.purchasePrice) * 100;
}
