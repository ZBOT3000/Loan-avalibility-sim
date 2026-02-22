import { useState } from 'react';
import Button from './components/common/Button';
import PersonalInfo from './components/LoanForm/PersonalInfo';
import FinancialInfo from './components/LoanForm/FinancialInfo';
import LoanDetails from './components/LoanForm/LoanDetails';
import { type PersonalInfoType, type FinancialInfoType, type LoanDetailsType } from './components/LoanForm/loanForm.types';
import Modal from './components/Modal/Modal';
import { checkLoanEligibility } from './services/loanService';
import type { LoanResponse } from './types/loan.types';

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [personalInfo, setPersonalInfo] = useState<PersonalInfoType>({
    age: '',
    employmentStatus: '',
    employmentDuration: '',
  });

  const [financialInfo, setFinancialInfo] = useState<FinancialInfoType>({
    monthlyIncome: '',
    monthlyExpenses: '',
    existingDebt: '',
    creditScore: '',
});

const [loanDetails, setLoanDetails] = useState<LoanDetailsType>({
  requestedAmount: '',
  loanTerm: '',
  loanPurpose: '',
});

const [loading, setLoading] = useState(false);
const [result, setResult] = useState<LoanResponse | null>(null);

const handleSubmit = async () => {
  setLoading(true);

  try {
    const response = await checkLoanEligibility({
      personalInfo,
      financialInfo,
      loanDetails,
    });
    setResult(response);
    setIsModalOpen(true);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <h1
        className="fixed top-4 left-4 text-xl sm:top-6 sm:left-6 sm:text-3xl font-semibold font-mono tracking-wide z-50 text-white text-stroke-cyan-400"
      >
        Loan Simulator
      </h1>

      <div className="card mt-15">
        <div className="">
          <PersonalInfo 
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          />
        </div>
        <div className="mt-7">
          <FinancialInfo 
          financialInfo={financialInfo}
          setFinancialInfo={setFinancialInfo}
          />
        </div>
        <div className="mt-7">
          <LoanDetails 
          loanDetails={loanDetails}
          setLoanDetails={setLoanDetails}
          />
        </div>
        <div className="mt-7 flex gap-6 justify-center mb-10">
        <Button
            variant="primary"
            size="md"
            shadow="md"
            onClick={() => {
              setPersonalInfo({
                age: '',
                employmentStatus: '',
                employmentDuration: '',
              });
              setFinancialInfo({
                monthlyIncome: '',
                monthlyExpenses: '',
                existingDebt: '',
                creditScore: '',
              });
              setLoanDetails({
                requestedAmount: '',
                loanTerm: '',
                loanPurpose: '',
              });
            }}
          >
            Clear
          </Button>
          <Button
            variant="primary"
            size="md"
            shadow="md"
            disabled={loading}
            onClick={() => {
              handleSubmit()
            }}
          >
            {loading ? 'Calculating...' : 'Calculate'}
          </Button>
        </div>
      </div>
      <div>
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => {setIsModalOpen(false)}}
            title="Loan Simulator"
            results={result}
          />
        )}
      </div>
    </>
  );
}

export default App;
