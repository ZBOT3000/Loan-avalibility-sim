import type { LoanRequest, LoanResponse } from "../types/loan.types";

//Mock for the loan service

export const checkLoanEligibility = async (
  payload: LoanRequest
): Promise<LoanResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const {
        monthlyIncome,
        monthlyExpenses,
        existingDebt,
        creditScore,
      } = payload.financialInfo;

      const monthlyIncomeNum = Number(monthlyIncome) || 0;
      const monthlyExpensesNum = Number(monthlyExpenses) || 0;
      const existingDebtNum = Number(existingDebt) || 0;

      const { requestedAmount, loanTerm } = payload.loanDetails;

      const disposableIncome =
        monthlyIncomeNum - monthlyExpensesNum - existingDebtNum;

      const debtToIncomeRatio =
        (existingDebtNum / monthlyIncomeNum) * 100;

      const loanToIncomeRatio =
        (Number(requestedAmount) / monthlyIncomeNum) * 100;

      const isEligible =
        disposableIncome > 2000 &&
        Number(creditScore) > 600 &&
        debtToIncomeRatio < 40;

      const interestRate = isEligible ? 12.5 : 18;

      const monthlyRate = interestRate / 100 / 12;

      const monthlyPayment =
        (Number(requestedAmount)  * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -Number(loanTerm)));

      const totalRepayment = monthlyPayment * Number(loanTerm);

      resolve({
        eligibilityResult: {
          isEligible,
          approvalLikelihood: isEligible ? 85 : 40,
          riskCategory:
            Number(creditScore) > 700
              ? "low"
              : Number(creditScore) > 600
              ? "medium"
              : "high",
          decisionReason: isEligible
            ? "Strong income-to-expense ratio and manageable existing debt"
            : "Income or credit profile does not meet approval threshold"
          },
          recommendedLoan: {
            maxAmount: Number(disposableIncome) * 18,
            recommendedAmount: Number(requestedAmount),
            interestRate: Number(interestRate),
            monthlyPayment: Number(monthlyPayment.toFixed(2)),
            totalRepayment: Number(totalRepayment.toFixed(2)),
          },
        affordabilityAnalysis: {
          disposableIncome,
          debtToIncomeRatio: Number(debtToIncomeRatio.toFixed(2)),
          loanToIncomeRatio: Number(loanToIncomeRatio.toFixed(2)),
          affordabilityScore:
            disposableIncome > 8000
              ? "excellent"
              : disposableIncome > 4000
              ? "good"
              : disposableIncome > 2000
              ? "fair"
              : "poor",
        },
      });
    }, 1500);
  });
};
