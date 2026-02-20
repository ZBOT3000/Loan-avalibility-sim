import type { LoanResponse } from '../../types/loan.types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  results: LoanResponse | null;
}

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between py-1.5 border-b border-white/10 last:border-0">
      <span className="text-white/60 text-sm">{label}</span>
      <span className="text-white text-sm font-medium">{value}</span>
    </div>
  );
}

export default function Modal({ isOpen, onClose, title, results }: ModalProps) {
  if (!isOpen || !results) return null;

  const { eligibilityResult, recommendedLoan, affordabilityAnalysis } = results;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg mx-4 max-h-[85vh] overflow-y-auto rounded-2xl border border-white/20 bg-gray-900/90 p-6 shadow-lg shadow-cyan-400/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors text-xl leading-none cursor-pointer"
        >
          &times;
        </button>

        {title && (
          <h2 className="mb-4 text-xl font-semibold tracking-wide text-white">
            {title}
          </h2>
        )}

        <div className="flex flex-col gap-5">
          <section>
            <h3 className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-2">
              Eligibility
            </h3>
            <div className="rounded-xl bg-white/5 p-4">
              <Row label="Eligible" value={eligibilityResult.isEligible ? "Yes" : "No"} />
              <Row label="Approval Likelihood" value={`${eligibilityResult.approvalLikelihood}%`} />
              <Row label="Risk Category" value={eligibilityResult.riskCategory} />
              <Row label="Reason" value={eligibilityResult.decisionReason} />
            </div>
          </section>

          <section>
            <h3 className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-2">
              Recommended Loan
            </h3>
            <div className="rounded-xl bg-white/5 p-4">
              <Row label="Max Amount" value={`R ${recommendedLoan.maxAmount.toLocaleString()}`} />
              <Row label="Requested Amount" value={`R ${recommendedLoan.recommendedAmount.toLocaleString()}`} />
              <Row label="Interest Rate" value={`${recommendedLoan.interestRate}%`} />
              <Row label="Monthly Payment" value={`R ${recommendedLoan.monthlyPayment.toLocaleString()}`} />
              <Row label="Total Repayment" value={`R ${recommendedLoan.totalRepayment.toLocaleString()}`} />
            </div>
          </section>

          <section>
            <h3 className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-2">
              Affordability Analysis
            </h3>
            <div className="rounded-xl bg-white/5 p-4">
              <Row label="Disposable Income" value={`R ${affordabilityAnalysis.disposableIncome.toLocaleString()}`} />
              <Row label="Debt-to-Income Ratio" value={`${affordabilityAnalysis.debtToIncomeRatio}%`} />
              <Row label="Loan-to-Income Ratio" value={`${affordabilityAnalysis.loanToIncomeRatio}%`} />
              <Row label="Affordability Score" value={affordabilityAnalysis.affordabilityScore} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
