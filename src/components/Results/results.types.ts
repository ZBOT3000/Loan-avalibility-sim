import type { RiskCategory, Score } from "../../types/loanSim.types";

export interface EligibilityResults {
    isEligible: boolean;
    approvalLikelihood: number;
    riskCategory: RiskCategory;
    decisionReason: string;
}

export interface RecommendedLoan {
    maxAmount: number;
    recommendedAmount: number;
    interestRate: number;
    monthlyPayment: number;
    totalRepayment: number;
}

export interface affordibilityAnalysis {
    disposableIncome: number;
    debtToIncomeRatio: number;
    loanToIncomeRatio: number;
    affordabilityScore: Score;
}