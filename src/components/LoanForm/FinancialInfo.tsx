import React from 'react'
import InputField from '../common/InputField'

export default function FinancialInfo() {
  return (
    <section className="max-w-md mx-auto flex flex-col gap-4">
  <h2 className="text-xl font-semibold tracking-wide text-center">
    Financial Info
  </h2>
  <InputField placeholder="Monthly Income" />
  <InputField placeholder="Monthly Expenses" />
  <InputField placeholder="Existing Debt" />
  <InputField placeholder="Credit Score" />
</section>
  )
}
