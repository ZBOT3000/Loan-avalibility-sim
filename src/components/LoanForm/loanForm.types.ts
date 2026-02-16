import type { EmploymentStatus, LoanPurpose } from "../../types/loanSim.types";

export interface PersonalInfo {
    age: number;
    employmentStatus: EmploymentStatus;
    employmentDuration: number;
  }

export interface FinancialInfo {
    monthlyIncome: number;
    monthlyExpenses: number;
    existingDebt: number;
    creditScore: number;
}

export interface LoanDetails {
    requestedAmount: number;
    loanTerm: number;
    loanPurpose: LoanPurpose;

}