import type { EmploymentStatus,  LoanPurpose } from "../../types/loanSim.types";

export interface PersonalInfoType {
    age: number | '';
    employmentStatus: EmploymentStatus;
    employmentDuration: number | '';
  }

export interface FinancialInfoType {
    monthlyIncome: number | '';
    monthlyExpenses: number | '';    
    existingDebt: number | '';
    creditScore: number | '';
}

export interface LoanDetailsType {
    requestedAmount: number | '';
    loanTerm: number | '';
    loanPurpose: LoanPurpose;
}