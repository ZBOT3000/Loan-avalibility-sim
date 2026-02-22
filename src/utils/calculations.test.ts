import { describe, it, expect } from "vitest";
import {
  parseFinancials,
  calcDisposableIncome,
  calcDebtToIncomeRatio,
  calcLoanToIncomeRatio,
  checkEligibility,
  calcMonthlyPayment,
  calcTotalRepayment,
  determineRiskCategory,
  determineAffordabilityScore,
} from "./calculations";

describe("parseFinancials", () => {
  it("converts string values to numbers", () => {
    const result = parseFinancials({
      monthlyIncome: 30000,
      monthlyExpenses: 10000,
      existingDebt: 5000,
      creditScore: 700,
    });
    expect(result).toEqual({
      monthlyIncome: 30000,
      monthlyExpenses: 10000,
      existingDebt: 5000,
      creditScore: 700,
    });
  });

  it("defaults empty strings to 0", () => {
    const result = parseFinancials({
      monthlyIncome: "",
      monthlyExpenses: "",
      existingDebt: "",
      creditScore: "",
    });
    expect(result).toEqual({
      monthlyIncome: 0,
      monthlyExpenses: 0,
      existingDebt: 0,
      creditScore: 0,
    });
  });
});

describe("calcDisposableIncome", () => {
  it("returns income minus expenses and debt", () => {
    expect(calcDisposableIncome(30000, 10000)).toBe(15000);
  });

  it("can return a negative value", () => {
    expect(calcDisposableIncome(5000, 8000)).toBe(-6000);
  });
});

describe("calcDebtToIncomeRatio", () => {
  it("calculates the ratio as a percentage", () => {
    expect(calcDebtToIncomeRatio(5000, 25000)).toBe(20);
  });

  it("returns 0 when debt is 0", () => {
    expect(calcDebtToIncomeRatio(0, 25000)).toBe(0);
  });
});

describe("calcLoanToIncomeRatio", () => {
  it("calculates the ratio as a percentage", () => {
    expect(calcLoanToIncomeRatio(50000, 25000)).toBe(200);
  });
});

describe("checkEligibility", () => {
  it("returns true when all thresholds are met", () => {
    expect(checkEligibility(5000, 700, 30)).toBe(true);
  });

  it("returns false when disposable income is too low", () => {
    expect(checkEligibility(1500, 700, 30)).toBe(false);
  });

  it("returns false when credit score is too low", () => {
    expect(checkEligibility(5000, 550, 30)).toBe(false);
  });

  it("returns false when debt-to-income ratio is too high", () => {
    expect(checkEligibility(5000, 700, 45)).toBe(false);
  });

  it("returns false at exact boundary values (not strictly greater)", () => {
    expect(checkEligibility(2000, 600, 40)).toBe(false);
  });
});

describe("calcMonthlyPayment", () => {
  it("calculates the correct amortised monthly payment", () => {
    const payment = calcMonthlyPayment(100000, 12, 24);
    expect(payment).toBeCloseTo(4707.35, 0);
  });

  it("increases with a higher interest rate", () => {
    const low = calcMonthlyPayment(100000, 10, 24);
    const high = calcMonthlyPayment(100000, 18, 24);
    expect(high).toBeGreaterThan(low);
  });
});

describe("calcTotalRepayment", () => {
  it("multiplies monthly payment by term", () => {
    expect(calcTotalRepayment(5000, 12)).toBe(60000);
  });
});

describe("determineRiskCategory", () => {
  it("returns 'low' for credit score above 700", () => {
    expect(determineRiskCategory(750)).toBe("low");
  });

  it("returns 'medium' for credit score between 601 and 700", () => {
    expect(determineRiskCategory(650)).toBe("medium");
  });

  it("returns 'high' for credit score 600 or below", () => {
    expect(determineRiskCategory(600)).toBe("high");
    expect(determineRiskCategory(400)).toBe("high");
  });
});

describe("determineAffordabilityScore", () => {
  it("returns 'excellent' for disposable income above 8000", () => {
    expect(determineAffordabilityScore(10000)).toBe("excellent");
  });

  it("returns 'good' for disposable income between 4001 and 8000", () => {
    expect(determineAffordabilityScore(6000)).toBe("good");
  });

  it("returns 'fair' for disposable income between 2001 and 4000", () => {
    expect(determineAffordabilityScore(3000)).toBe("fair");
  });

  it("returns 'poor' for disposable income 2000 or below", () => {
    expect(determineAffordabilityScore(2000)).toBe("poor");
    expect(determineAffordabilityScore(500)).toBe("poor");
  });
});
