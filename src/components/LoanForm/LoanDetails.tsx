import InputField from '../common/InputField';
import SelectField from '../common/SelectField';
import type { ChangeEvent } from 'react';
import type { LoanDetailsType  } from './loanForm.types';
import type { LoanPurpose } from '../../types/loanSim.types';

export default function LoanDetails({
  loanDetails,
  setLoanDetails,
}: {
  loanDetails: LoanDetailsType;
  setLoanDetails: (personalInfo: LoanDetailsType) => void;
}) {
  const loanPurposeOptions: {
    value: LoanPurpose;
    label: string;
  }[] = [
    { value: 'home_improvement', label: 'Home Improvement' },
    { value: 'medical_expenses', label: 'Medical Expenses' },
    { value: 'debt_consolidation', label: 'Debt Consolidation' },
    { value: 'education', label: 'Education' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <section className="max-w-md mx-auto flex flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-wide text-center">
        Loan Details
      </h2>
      <InputField 
      placeholder="Requested Amount" 
      currency="R"
      value={loanDetails.requestedAmount}
      onChange={(e: ChangeEvent<HTMLInputElement>) => { const v = e.target.value; if (v === '' || !isNaN(Number(v))) setLoanDetails({ ...loanDetails, requestedAmount: v === '' ? '' : Number(v) }); }}
      />
      <InputField placeholder="Loan Term (months)" 
      value={loanDetails.loanTerm}
      onChange={(e: ChangeEvent<HTMLInputElement>) => { const v = e.target.value; if (v === '' || !isNaN(Number(v))) setLoanDetails({ ...loanDetails, loanTerm: v === '' ? '' : Number(v) }); }}
      />
      <SelectField
        label="Loan Purpose"
        value={loanDetails.loanPurpose}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setLoanDetails({ ...loanDetails, loanPurpose: e.target.value as LoanPurpose })}
        options={loanPurposeOptions}
      />
    </section>
  );
}
