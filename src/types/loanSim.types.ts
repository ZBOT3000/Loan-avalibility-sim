export type EmploymentStatus =
  | "employed"
  | "self_employed"
  | "unemployed"
  | "student"
  | '';

export type LoanPurpose = 
    | 'home_improvement'
    | 'medical_expenses'
    | 'debt_consolidation'
    | 'education'
    | 'other'
    | '';

export type RiskCategory =
    | 'low'
    | 'medium'
    | 'high' 
    | '';

export type Score =
    | 'poor'
    | 'fair'
    | 'good'
    | 'excellent'
    | '';