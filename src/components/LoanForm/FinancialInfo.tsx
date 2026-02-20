import InputField from '../Common/InputField';
import { type FinancialInfoType } from './loanForm.types';

export default function FinancialInfo({
    financialInfo,
    setFinancialInfo,
  }: {
    financialInfo: FinancialInfoType;
    setFinancialInfo: (financialInfo: FinancialInfoType) => void;
  }) {

  return (
    <section className="max-w-md mx-auto flex flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-wide text-center">
        Financial Information
      </h2>
      <InputField placeholder="Monthly Income" 
      currency="R"
      value={financialInfo.monthlyIncome} onChange={(e) => {
        const v = e.target.value;
        if (v === '' || !isNaN(Number(v))) 
        setFinancialInfo({ ...financialInfo, monthlyIncome: v === '' ? '' : Number(v) })} 
      }/>
      <InputField placeholder="Monthly Expenses" 
      currency="R"
      value={financialInfo.monthlyExpenses} onChange={(e) => {
        const v = e.target.value;
        if (v === '' || !isNaN(Number(v))) 
        setFinancialInfo({ ...financialInfo, monthlyExpenses: v === '' ? '' : Number(v) })} 
      }/>
      <InputField placeholder="Existing Debt" 
      currency="R"
      value={financialInfo.existingDebt} onChange={(e) => {
        const v = e.target.value;
        if (v === '' || !isNaN(Number(v))) 
        setFinancialInfo({ ...financialInfo, existingDebt: v === '' ? '' : Number(v) })} 
      }/>
      <InputField placeholder="Credit Score" 
      value={financialInfo.creditScore} onChange={(e) => {
        const v = e.target.value;
        if (v === '' || !isNaN(Number(v))) 
        setFinancialInfo({ ...financialInfo, creditScore: v === '' ? '' : Number(v) })} 
      }/>
    </section>
  );
}
