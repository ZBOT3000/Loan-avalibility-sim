import type { LoanRequest, LoanResponse } from "../types/loan.types";
import {
  parseFinancials,
  calcDisposableIncome,
  calcDebtToIncomeRatio,
  calcLoanToIncomeRatio,
  checkEligibility,
  calcMonthlyPayment,
  calcTotalRepayment,
  determineRiskCategory,
  determineAffordabilityScore,
} from "../utils/calculations";

//Mock for the loan service

export const checkLoanEligibility = async (
  payload: LoanRequest
): Promise<LoanResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { monthlyIncome, monthlyExpenses, existingDebt, creditScore } =
        parseFinancials(payload.financialInfo);

      const requestedAmount = Number(payload.loanDetails.requestedAmount);
      const loanTerm = Number(payload.loanDetails.loanTerm);

      const disposableIncome = calcDisposableIncome(monthlyIncome, monthlyExpenses);
      const debtToIncomeRatio = calcDebtToIncomeRatio(existingDebt, monthlyIncome);
      const loanToIncomeRatio = calcLoanToIncomeRatio(requestedAmount, monthlyIncome);
      const isEligible = checkEligibility(disposableIncome, creditScore, debtToIncomeRatio);

      const interestRate = isEligible ? 12.5 : 18;
      const monthlyPayment = calcMonthlyPayment(requestedAmount, interestRate, loanTerm);
      const totalRepayment = calcTotalRepayment(monthlyPayment, loanTerm);

      resolve({
        eligibilityResult: {
          isEligible,
          approvalLikelihood: isEligible ? 85 : 40,
          riskCategory: determineRiskCategory(creditScore),
          decisionReason: isEligible
            ? "Strong income-to-expense ratio and manageable existing debt"
            : "Income or credit profile does not meet approval threshold",
        },
        recommendedLoan: {
          maxAmount: disposableIncome * 18,
          recommendedAmount: requestedAmount,
          interestRate,
          monthlyPayment: Number(monthlyPayment.toFixed(2)),
          totalRepayment: Number(totalRepayment.toFixed(2)),
        },
        affordabilityAnalysis: {
          disposableIncome,
          debtToIncomeRatio: Number(debtToIncomeRatio.toFixed(2)),
          loanToIncomeRatio: Number(loanToIncomeRatio.toFixed(2)),
          affordabilityScore: determineAffordabilityScore(disposableIncome),
        },
      });
    }, 1500);
  });
};
