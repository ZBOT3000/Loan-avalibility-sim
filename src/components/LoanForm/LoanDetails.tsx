import React from 'react'
import InputField from '../common/InputField'

export default function LoanDetails() {
  return (
    <section className="max-w-md mx-auto flex flex-col gap-4">
  <h2 className="text-xl font-semibold tracking-wide text-center">
    Loan Details
  </h2>
  <InputField placeholder="Requested Amount" />
  <InputField placeholder="Loan Term (months)" />
  <InputField placeholder="Loan Purpose" />
</section>
  )
}
