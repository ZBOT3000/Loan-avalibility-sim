import type { FinancialInfoType } from "../components/LoanForm/loanForm.types";

export function parseFinancials(financialInfo: FinancialInfoType) {
  const monthlyIncome = Number(financialInfo.monthlyIncome) || 0;
  const monthlyExpenses = Number(financialInfo.monthlyExpenses) || 0;
  const existingDebt = Number(financialInfo.existingDebt) || 0;
  const creditScore = Number(financialInfo.creditScore) || 0;
  return { monthlyIncome, monthlyExpenses, existingDebt, creditScore };
}

export function calcDisposableIncome(
  monthlyIncome: number,
  monthlyExpenses: number,
) {
  return monthlyIncome - monthlyExpenses;
}

export function calcDebtToIncomeRatio(existingDebt: number, monthlyIncome: number) {
  return (existingDebt / monthlyIncome) * 100;
}

export function calcLoanToIncomeRatio(requestedAmount: number, monthlyIncome: number) {
  const annualIncome = monthlyIncome * 12;
  return (requestedAmount / annualIncome) * 100;
}

export function checkEligibility(
  disposableIncome: number,
  creditScore: number,
  debtToIncomeRatio: number,
) {
  return disposableIncome > 2000 && creditScore > 600 && debtToIncomeRatio < 40;
}

export function calcMonthlyPayment(
  requestedAmount: number,
  interestRate: number,
  loanTerm: number,
) {
  const monthlyRate = interestRate / 100 / 12;
  return (requestedAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm));
}

export function calcTotalRepayment(monthlyPayment: number, loanTerm: number) {
  return monthlyPayment * loanTerm;
}

export function determineRiskCategory(creditScore: number): "low" | "medium" | "high" {
  if (creditScore >= 650) return "low";
  if (creditScore >= 600) return "medium";
  return "high";
}

export function determineAffordabilityScore(
  disposableIncome: number,
): "excellent" | "good" | "fair" | "poor" {
  if (disposableIncome > 12000) return "excellent";
  if (disposableIncome > 8000) return "good";
  if (disposableIncome > 4000) return "fair";
  return "poor";
}
