import type { FinancialInfoType, LoanDetailsType, PersonalInfoType } from "../components/LoanForm/loanForm.types";
import type { RiskCategory, Score } from "./loanSim.types";

export interface LoanRequest {
    personalInfo: PersonalInfoType;
    financialInfo: FinancialInfoType;
    loanDetails: LoanDetailsType;
  }

  export interface LoanResponse {
    eligibilityResult: {
      isEligible: boolean;
      approvalLikelihood: number;
      riskCategory: RiskCategory;
      decisionReason: string;
    };
    recommendedLoan: {
      maxAmount: number;
      recommendedAmount: number;
      interestRate: number;
      monthlyPayment: number;
      totalRepayment: number;
    };
    affordabilityAnalysis: {
      disposableIncome: number;
      debtToIncomeRatio: number;
      loanToIncomeRatio: number;
      affordabilityScore: Score;
    };
  }
  