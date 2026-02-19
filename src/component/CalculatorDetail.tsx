import Navbar from './Navbar';
import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Info, BookOpen,
  FileText, Zap, CircleCheck
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import AutoResizeInput from './AutoResizeInput';
import { useLocation } from "react-router-dom";


interface Calc {
  title: string;
  category?: string;
}

interface Props {
  calc?: Calc;
  onBack: () => void;
  showNavbar?: boolean;
}



const CALC_CONFIGS: Record<string, any> = {
  "SIP Calculator": {
    label1: "Monthly Investment", min1: 100, max1: 100000, step1: 100, def1: 100,
    label2: "Expected return(p.a.)", min2: 1, max2: 30, step2: 0.1, def2: 1,
    label3: "Time period", min3: 1, max3: 40, step3: 1, def3: 1,
    hasThirdSlider: true,
    isV2Currency: false,

    calculate: (_monthly: number, _rate: number, _years: number) => {
        const monthly = Number(_monthly);
        const annualRate = Number(_rate) / 100;
        const years = Number(_years);
        const months = years * 12;

        const investedAmount = monthly * months;

        // 1. CALCULATE EFFECTIVE MONTHLY RATE
        // Most modern calculators use this to avoid over-inflating returns
        const r = Math.pow(1 + annualRate, 1/12) - 1;

        // 2. CALCULATE FUTURE VALUE (Annuity Due)
        // Formula: P * [((1 + r)^n - 1) / r] * (1 + r)
        const totalValue = monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);

        const estimatedReturns = totalValue - investedAmount;
        const returnPercentage = investedAmount === 0 ? 0 : (estimatedReturns / investedAmount) * 100;

        return {
            totalInvested: Math.round(investedAmount),
            estReturns: Math.round(estimatedReturns),
            totalValue: Math.round(totalValue),
            years: Math.trunc(years),
            returnPercentage: +returnPercentage.toFixed(2),
            ratio: +returnPercentage.toFixed(2),
        };
    },

    totalValueLabel: "TOTAL VALUE",
    gainLabel: "EST. RETURNS %",
    investedLabel: "Invested Amount",
    profitLabel: "Est. Returns",
    formulaText: "This calculator uses the future value of an annuity due with effective monthly compounding:",
    formulaLatex: "FV = P * ((1 + r)^n - 1) / r",
    formulaVars: "P = monthlyInvestment, r = effective monthly rate, n = number of months",
    useCases: [
        "Accurate projections matching major mutual fund platforms.",
        "Visualizing long-term wealth creation.",
        "Planning for specific financial goals."
    ],
    definitions: [
        { title: "Monthly Investment", desc: "Fixed amount you invest every month." },
        { title: "Effective Rate", desc: "The monthly rate required to achieve the target annual growth." }
    ]
},
  "Mortgage Payment": {
    type: 'loan',
    label1: "Loan Amount", min1: 5000, max1: 1000000, step1: 1000, def1: 5000,
    label2: "Interest Rate", min2: 0.1, max2: 15, step2: 0.1, def2: 0.1,
    label3: "Loan Term", min3: 1, max3: 30, step3: 1, def3: 1,
    hasThirdSlider: true,
    isV2Currency: false,
    calculate: (loanAmount: number, rate: number, termYears: number) => {
      // 1. Force conversion to Numbers to prevent string concatenation or NaN errors
      const P = Number(loanAmount);
      const annualRate = Number(rate);
      const years = Number(termYears);

      const monthlyRate = annualRate / 100 / 12;
      const numPayments = years * 12;

      let monthlyPayment = 0;

      // 2. Handle the edge case of 0% interest rate
      if (annualRate === 0) {
        monthlyPayment = P / numPayments;
      } else {
        // 3. The Formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n â€“ 1 ]
        const compoundFactor = Math.pow(1 + monthlyRate, numPayments);
        monthlyPayment = P * (monthlyRate * compoundFactor) / (compoundFactor - 1);
      }

      // 4. Derived totals for the summary and chart
      const totalRepayment = monthlyPayment * numPayments;
      const totalInterest = totalRepayment - P;

      return {
        // Main display: Monthly Payment (Rounded for clean UI)
        totalValue: Math.round(monthlyPayment),
        years: years,
        // Shows the annual rate (e.g., 6.5) so the label matches the slider
        returnPercentage: annualRate,
        totalInvested: Math.round(P),
        estReturns: Math.round(totalInterest),
        finalAmount: Math.round(totalRepayment),
        // Ratio used for the blue progress ring (Interest vs Total Cost)
        ratio: (totalInterest / totalRepayment) * 100
      };
    },
    totalValueLabel: "MONTHLY PAYMENTS",
    gainLabel: "INTEREST RATE %",
    investedLabel: "Total Amount",
    profitLabel: "Total Interest",
    formulaText: "This mortgage calculator uses the standard loan payment formula:",
    formulaLatex: "M=P×(1+r)n−1r(1+r)n​",
    formulaVars: "M = Monthly payment, P = Loan amount, i = Monthly interest rate, n = Number of payments",
    useCases: [
      "Planning home purchases and understanding affordability.",
      "Comparing different loan terms and interest rates.",
      "Budgeting for long-term financial commitments."
    ],
    definitions: [
      { title: "Loan Amount", desc: "The original amount borrowed that needs to be repaid." },
      { title: "Interest Rate", desc: "The annual percentage charged by the lender for borrowing money." },
      { title: "Loan Term", desc: "The duration over which the loan is repaid, typically in years." }
    ]
},


  "Loan Amortization": {
    type: 'loan',
    label1: "Loan Amount", min1: 5000, max1: 1000000, step1: 1000, def1: 5000,
    label2: "Interest Rate", min2: 0.1, max2: 15, step2: 0.1, def2: 0.1,
    label3: "Loan Term", min3: 1, max3: 30, step3: 1, def3: 1,
    hasThirdSlider: true,
    isV2Currency: false,
    calculate: (loanAmount: number, rate: number, termYears: number) => {
      const monthlyRate = rate / 100 / 12;
      const numPayments = termYears * 12;
      const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
      const totalPayments = monthlyPayment * numPayments;
      const interest = totalPayments - loanAmount;
      return {
        totalValue: Math.round(monthlyPayment),
        years: termYears,
        returnPercentage: +((interest / loanAmount) * 100).toFixed(2),
        totalInvested: Math.round(loanAmount),
        estReturns: Math.round(interest),
        finalAmount: Math.round(totalPayments),
        ratio: +((interest / loanAmount) * 100).toFixed(2)
      };
    },
    totalValueLabel: "MONTHLY PAYMENT",
    gainLabel: "INTEREST %",
    investedLabel: "Loan Amount",
    profitLabel: "Total Interest",
    formulaText: "This amortization calculator uses the standard loan payment formula:",
    formulaLatex: "M=P×(i(1+i)^n) / ((1+i)^n - 1)",
    formulaVars: "M = Monthly payment, P = Loan amount, i = Monthly interest rate, n = Number of payments",
    useCases: [
      "Understanding how loan payments are split between principal and interest.",
      "Planning debt payoff strategies.",
      "Comparing amortization schedules for different loans."
    ],
    definitions: [
      { title: "", desc: "The process of paying off a debt over time through regular payments." },
      { title: "Principal Payment", desc: "The portion of the payment that reduces the loan balance." },
      { title: "Interest Payment", desc: "The portion of the payment that covers the cost of borrowing." }
    ]
  },
  "Compound Interest": {
    label1: "Principal Amount", min1: 100, max1: 1000000, step1: 100, def1: 100,
    label2: "Annual Interest Rate (%)", min2: 1, max2: 20, step2: 0.1, def2: 1,
    label3: "Time Period (Years)", min3: 1, max3: 40, step3: 1, def3: 1,
    hasThirdSlider: true,
    isV2Currency: false,
    calculate: (principal: number, rate: number, years: number) => {
  const P = Number(principal);
  const r = Number(rate) / 100;
  const n = Number(years);

  const totalValue = P * Math.pow(1 + r, n);
  const interest = totalValue - P;

  return {
    totalValue: Math.round(interest), // Total Interest (for top display)
    years: n,
    returnPercentage: +(interest / P * 100).toFixed(2),
    totalInvested: P, // Principal Amount
    estReturns: Math.round(totalValue), // Total Amount (Future Value)
    ratio: +(interest / P * 100).toFixed(2)
  };
},

    totalValueLabel: "TOTAL INTEREST",
    gainLabel: "INTEREST %",
    investedLabel: "Principal Amount",
    profitLabel: "Total Amount",
    formulaText: "This calculator uses the standard compound interest formula for a lump sum investment:",
    
    formulaLatex: "FV = P(1 + r)^n", 
    formulaVars: "FV = Future Value, P = Principal, r = Annual Interest Rate, n = Number of Years",
    useCases: [
      "Visualizing how savings grow when interest is reinvested.",
      "Comparing long-term growth across different interest rates.",
      "Understanding the exponential nature of time in wealth building."
    ],
    definitions: [
      { title: "Compound Interest", desc: "Interest calculated on both the initial principal and the accumulated interest from previous periods." },
      { title: "Principal", desc: "The original sum of money invested or deposited." },
      { title: "Advantages", desc: "Ease of us,Reliability and accuracy,Data security." }
    ]
},
  "Retirement Planner": {
    type: 'loan',
    label1: "Monthly Contribution", min1: 100, max1: 10000, step1: 50, def1: 100,
    label2: "Expected Return (%)", min2: 1, max2: 20, step2: 0.1, def2: 1,
    label3: "Years to Retirement", min3: 1, max3: 40, step3: 1, def3: 1,
    hasThirdSlider: true,
    isV2Currency: false,
    calculate: (monthly: number, rate: number, years: number) => {
  const P = Number(monthly);
  const r = Number(rate) / 100 / 12;
  const n = Number(years) * 12;

  let futureValue = 0;

  if (r === 0) {
    futureValue = P * n;
  } else {
    futureValue =
      P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  }

  const totalInvested = P * n;
  const interestEarned = futureValue - totalInvested;

  return {
    totalValue: Math.round(futureValue),
    totalInvested: Math.round(totalInvested),
    estReturns: Math.round(interestEarned),
    years,
    returnPercentage:
      totalInvested > 0
        ? +((interestEarned / totalInvested) * 100).toFixed(2)
        : 0,
    ratio:
      totalInvested > 0
        ? +((interestEarned / totalInvested) * 100).toFixed(2)
        : 0
  };
},
    totalValueLabel: "ESTIMATED NEST EGG",
    investedLabel: "Total Principal",
    profitLabel: "Interest Earned",
    formulaText: "This retirement calculator uses the future value of an annuity due formula, assuming contributions are made at the start of each month:",
    formulaLatex: "FV = P x [((1 + r)^n - 1) / r] x (1 + r)",
    formulaVars: "FV = Future value, P = Monthly contribution, r = Monthly interest rate, n = Total number of months",
    useCases: [
      "Visualizing how consistent monthly saving builds wealth.",
      "Understanding the impact of compound interest over decades.",
      "Setting realistic monthly savings goals for retirement."
    ],
    definitions: [
      { title: "Monthly Contribution", desc: "The amount you plan to save or invest at the beginning of every month." },
      { title: "Expected Return", desc: "The estimated annual interest rate or stock market growth (expressed as a percentage)." },
      { title: "Nest Egg", desc: "The total amount of money you will have accumulated by the time you retire." }
    ]
},
  "ROI Calculator": {
    type: 'loan',
    label1: "Amount Invested", min1: 100, max1: 100000, step1: 100, def1: 100,
    label2: "Amount Returned", min2: 100, max2: 200000, step2: 100, def2: 100,
    label3: "Time Period", min3: 1, max3: 40, step3: 1, def3: 1,
    hasThirdSlider: true,
    isV2Currency: true,
    calculate: (invested: number, returned: number, years: number) => {
      const netProfit = returned - invested;
      const roi = (netProfit / invested) * 100;
      // Annualized ROI formula: ((Final Value / Initial Value)^(1/Years) - 1) * 100
      const annualizedROI = (Math.pow(returned / invested, 1 / years) - 1) * 100;
      return {
        totalValue: netProfit,
        years: years,
        returnPercentage: roi,
        annualizedROI: +annualizedROI.toFixed(2),
        totalInvested: Math.round(invested),
        estReturns: netProfit,
        finalAmount: returned,
        ratio: roi
      };
    },
    totalValueLabel: "PROFIT/LOSS",
    gainLabel: "ROI %",
    investedLabel: "Invested",
    profitLabel: "Profit",
    formulaText: "This ROI calculator uses the return on investment formula:",
    formulaLatex: "ROI = (Net Profit / Cost of Investment) x 100",
    formulaVars: "ROI = Return on investment percentage, Net Profit = Gain - Cost, Cost of Investment = Initial investment",
    useCases: [
      "Evaluating the efficiency of investments.",
      "Comparing profitability of different projects.",
      "Measuring performance of business ventures."
    ],
    definitions: [
      { title: "Return on Investment", desc: "A measure of the profitability of an investment." },
      { title: "Gain from Investment", desc: "The profit earned from the investment." },
      { title: "Cost of Investment", desc: "The initial amount invested." }
    ]
  },
  "GST Calculator": {
    label1: "Price", min1: 5000, max1: 500000, step1: 100, def1: 5000,
    label2: "GST Rate", min2: 5, max2: 30, step2: 1, def2: 5,
    hasThirdSlider: false,
    isV2Currency: false,
   calculate: (price: number, rate: number, mode: 'exclusive' | 'inclusive' = 'exclusive') => {
  let gstAmount, totalPrice, originalPrice;
  if (mode === 'exclusive') {
    gstAmount = price * (rate / 100);
    totalPrice = price + gstAmount;
    originalPrice = price;
  } else {
    totalPrice = price;
    originalPrice = price / (1 + rate / 100);
    gstAmount = totalPrice - originalPrice;
  }

  return {
    totalValue: mode === 'exclusive' ? totalPrice : +originalPrice.toFixed(2),
    totalInvested: price,
    estReturns: +gstAmount.toFixed(2),
    returnPercentage: rate,
    years: 1,
    ratio: rate
  };
},

    totalValueLabel: "TOTAL PRICE(Including GST)",
    gainLabel: "GST RATE %",
    investedLabel: "Actual Amount",
    profitLabel: "GST Amount",
    formulaText: "This GST calculator calculates the Goods and Services Tax:",
    formulaLatex: "GST Amount = Price x (GST Rate / 100)",
    formulaVars: "GST Amount = Tax amount, Price = Original price, GST Rate = Tax percentage, Total Price = Price including GST",
    useCases: [
      "Calculating GST for goods and services.",
      "Understanding tax implications on purchases.",
      "Planning budgets including GST."
    ],
    definitions: [
      { title: "GST", desc: "Goods and Services Tax, a value-added tax levied on most goods and services." },
      { title: "GST Rate", desc: "The percentage rate at which GST is applied." },
      { title: "Total Price", desc: "The original price plus the GST amount." }
    ]
  },
  "Simple Interest": {
    label1: "Principal Amount", min1: 100, max1: 1000000, step1: 100, def1: 100,
    label2: "Rate of Interest (%)", min2: 1, max2: 20, step2: 0.1, def2: 1,
    label3: "Time Period (Years)", min3: 1, max3: 30, step3: 1, def3: 1,
    hasThirdSlider: true,
    isV2Currency: false,
    calculate: (principal: number, rate: number, time: number) => {
      const interest = principal * rate * time / 100;
      const totalAmount = principal + interest;
      return {
        totalValue: Math.round(interest),
        years: time,
        returnPercentage: (interest / principal) * 100,
        totalInvested: principal,
        estReturns: Math.round(totalAmount),
        ratio: (interest / principal) * 100
      };
    },
    totalValueLabel: "TOTAL INTEREST",
    gainLabel: "INTEREST %",
    investedLabel: "Total Amount",
    profitLabel: "Principal Amount",
    formulaText: "This simple interest calculator uses the basic interest formula:",
    formulaLatex: "SI = P x R x T / 100, Total Amount = P + SI",
    formulaVars: "SI = Simple Interest, P = Principal Amount, R = Rate of Interest (%), T = Time Period (Years)",
    useCases: [
      "Calculating interest on loans or savings without compounding.",
      "Understanding basic interest calculations for short-term investments.",
      "Planning simple interest-based financial products."
    ],
    definitions: [
      { title: "Principal Amount", desc: "The original sum of money invested or borrowed." },
      { title: "Rate of Interest", desc: "The percentage rate at which interest is calculated annually." },
      { title: "Time Period", desc: "The duration over which the interest is calculated, in years." },
      { title: "Simple Interest", desc: "The interest calculated only on the principal amount." }
    ]
  },
  "Auto Loan": {
    type: 'loan',
    label1: "Loan Amount", min1: 100000, max1: 10000000, step1: 500, def1: 100000,
    label2: "Interest Rate", min2: 0.1, max2: 20, step2: 0.1, def2: 0.1,
    label3: "Loan Term", min3: 1, max3: 7, step3: 1, def3: 1,
    hasThirdSlider: true,
    isV2Currency: false,
    calculate: (loanAmount: number, rate: number, termYears: number) => {
  const monthlyRate = rate / 100 / 12;
  const numPayments = termYears * 12;

  const monthlyPayment =
    loanAmount *
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  const totalPayment = monthlyPayment * numPayments;
  const interest = totalPayment - loanAmount;

  return {
  totalValue: Math.round(monthlyPayment),
  years: termYears,
  returnPercentage: +((interest / loanAmount) * 100).toFixed(2),
  totalInvested: loanAmount,
  estReturns: Math.round(interest),
  finalAmount: Math.round(totalPayment),
  ratio: +((interest / totalPayment) * 100).toFixed(2)
};

},

    totalValueLabel: "Monthly PAYMENTS",

    investedLabel: "Total Amount",
    profitLabel: "Total Interest",
    formulaText: "This auto loan calculator uses the standard loan payment formula:",
    formulaLatex: "M=P x i(1+i)^n/((1+i)^n-1)",
    formulaVars: "M = Monthly payment, P = Loan amount, i = Monthly interest rate, n = Number of payments",
    useCases: [
      "Planning vehicle purchases and financing.",
      "Comparing auto loan terms and rates.",
      "Understanding total cost of car ownership."
    ],
    definitions: [
      { title: "Auto Loan", desc: "A loan specifically for purchasing a vehicle." },
      { title: "Down Payment", desc: "The initial payment made when purchasing a vehicle." },
      { title: "Loan Term", desc: "The duration over which the auto loan is repaid." }
    ]
  },
  "FD Calculator": {
    label1: "Total Investment", min1: 100, max1: 1000000, step1: 100, def1: 100,
    label2: "Rate of Interest (%)", min2: 1, max2: 20, step2: 0.1, def2: 1,
    label3: "Time Period (Years)", min3: 1, max3: 40, step3: 1, def3: 1,
    hasThirdSlider: true,
    isV2Currency: false,
    calculate: (principal: number, rate: number, years: number) => {
      const P = Number(principal);
      const r = Number(rate) / 100;
      const t = Number(years);
      const n = 4; // Quarterly compounding (standard FD)

      const totalValue = P * Math.pow(1 + r / n, n * t);
      const estReturns = totalValue - P;

      return {
        totalValue: Math.round(totalValue),
        years: t,
        returnPercentage: +((estReturns / P) * 100).toFixed(2),
        totalInvested: P,
        estReturns: Math.round(estReturns),
        ratio: +((estReturns / P) * 100).toFixed(2)
      };
},

    totalValueLabel: "TOTAL VALUE",
    gainLabel: "RETURN %",
    investedLabel: "Est Returns",
    profitLabel: "Total Investment",
    formulaText: "This investment calculator uses the simple interest formula:",
    formulaLatex: "SI = P x R x T / 100, Total Value = P + SI",
    formulaVars: "SI = Simple Interest, P = Principal, R = Rate of Interest (%), T = Time Period (Years)",
    useCases: [
      "Planning short-term investments.",
      "Estimating returns on fixed deposits.",
      "Comparing simple interest rates and time periods."
    ],
    definitions: [
      { title: "Total Investment", desc: "The initial amount invested." },
      { title: "Rate of Interest", desc: "The annual percentage rate at which interest is calculated." },
      { title: "Time Period", desc: "The duration over which the investment is held, in years." },
      { title: "Est Returns", desc: "The estimated interest earned from the investment." },
      { title: "Total Value", desc: "The total value of the investment including principal and interest." }
    ]
  },
  "Mutual Funds Returns": {
    label1: "Total Investment", min1: 100, max1: 1000000, step1: 100, def1: 100,
    label2: "Expected Rate (%)", min2: 1, max2: 20, step2: 0.1, def2: 1,
    label3: "Time Period (Years)", min3: 1, max3: 40, step3: 1, def3: 1,
    hasThirdSlider: true,
    isV2Currency: false,
    calculate: (principal: number, rate: number, years: number) => {
      const P = Number(principal);
      const r = Number(rate) / 100;
      const t = Number(years);

      const totalValue = P * Math.pow(1 + r, t);
      const estReturns = totalValue - P;

      return {
        totalValue: Math.round(totalValue),
        years: t,
        returnPercentage: +((estReturns / P) * 100).toFixed(2),
        totalInvested: P,
        estReturns: Math.round(estReturns),
        ratio: +((estReturns / P) * 100).toFixed(2)
      };
    },
    totalValueLabel: "TOTAL VALUE",
    gainLabel: "RETURN %",
    investedLabel: "Est. Returns",
    profitLabel: "Total Investment",
    formulaText: "This mutual funds calculator uses the compound interest formula:",
    formulaLatex: "FV = P x (1 + r)^t",
    formulaVars: "FV = Future Value, P = Principal, r = Annual Interest Rate, t = Time Period (Years)",
    useCases: [
      "Planning long-term investments in mutual funds.",
      "Estimating future value of lump-sum investments.",
      "Comparing different expected return rates."
    ],
    definitions: [
      { title: "Total Investment", desc: "The initial amount invested in mutual funds." },
      { title: "Expected Rate", desc: "The anticipated annual growth rate of the mutual fund." },
      { title: "Time Period", desc: "The duration over which the investment is held." },
      { title: "Est. Returns", desc: "The estimated profit from the investment." },
      { title: "Total Value", desc: "The total value of the investment including principal and returns." }
    ]
  },
  "Inflation Calculator": {
    label1: "Current Cost", min1: 100, max1: 1000000, step1: 100, def1: 100,
    label2: "Rate of Inflation (%)", min2: 1, max2: 20, step2: 0.1, def2: 1,
    label3: "Time Period (Years)", min3: 1, max3: 50, step3: 1, def3: 1,
    hasThirdSlider: true,
    isV2Currency: false,
    calculate: (currentCost: number, inflationRate: number, years: number) => {
      const P = Number(currentCost);
      const r = Number(inflationRate) / 100;
      const t = Number(years);

      const futureCost = P * Math.pow(1 + r, t);
      const costIncrease = futureCost - P;

      return {
        totalValue: Math.round(costIncrease),
        years: t,
        returnPercentage: inflationRate,
        totalInvested: P,
        estReturns: Math.round(futureCost),
        ratio: +((costIncrease / P) * 100).toFixed(2)
      };
    },
    totalValueLabel: "COST INCREASE",
    gainLabel: "",
    investedLabel: "Future Cost",
    profitLabel: "Current Cost",
    formulaText: "This inflation calculator uses the compound inflation formula:",
    formulaLatex: "FC = CC x (1 + r)^t, CI = FC - CC",
    formulaVars: "FC = Future Cost, CC = Current Cost, r = Annual Inflation Rate, t = Time Period (Years), CI = Cost Increase",
    useCases: [
      "Estimating the impact of inflation on future expenses.",
      "Planning for cost increases in budgeting and savings.",
      "Understanding purchasing power erosion over time."
    ],
    definitions: [
      { title: "Current Cost", desc: "The present value of the item or expense." },
      { title: "Rate of Inflation", desc: "The expected annual percentage increase in prices." },
      { title: "Time Period", desc: "The number of years over which inflation is applied." },
      { title: "Cost Increase", desc: "The additional amount needed due to inflation." },
      { title: "Future Cost", desc: "The projected cost after accounting for inflation." }
    ]
  },
  "NPS Calculator": {
    label1: "Investment per month", min1: 100, max1: 100000, step1: 100, def1: 100,
    label2: "Expected Return (p.a.)", min2: 1, max2: 20, step2: 0.1, def2: 1,
    label3: "Your age", min3: 18, max3: 59, step3: 1, def3: 18,
    hasThirdSlider: true,
    isV2Currency: false,
    calculate: (monthly: number, rate: number, age: number) => {
  const years = 60 - age;
  const numMonths = years * 12;

  const monthlyInvestment = Number(monthly);
  const annualRate = Number(rate);

  const totalInvested = monthlyInvestment * numMonths;

  // 🛑 Handle zero or invalid rate
  let maturityAmount = totalInvested;

  if (annualRate > 0 && numMonths > 0) {
    const monthlyRate = annualRate / 100 / 12;
    maturityAmount = Math.round(
      monthlyInvestment *
        ((Math.pow(1 + monthlyRate, numMonths) - 1) / monthlyRate)
    );
  }

  const interestEarned = maturityAmount - totalInvested;
  const minAnnuityInvestment = Math.round(0.4 * maturityAmount);

  return {
    totalValue: maturityAmount, // ✅ FIXED
    years,
    returnPercentage:
      totalInvested > 0 ? (interestEarned / totalInvested) * 100 : 0,
    totalInvested,
    estReturns: interestEarned,
    maturityAmount,
    minAnnuityInvestment,
    ratio:
      totalInvested > 0 ? (interestEarned / totalInvested) * 100 : 0
  };
},

    totalValueLabel: "MATURITY AMOUNT",
    gainLabel: "RETURN %",
    investedLabel: "Total Investment",
    profitLabel: "Interest Earned",
    formulaText: "This NPS calculator uses the future value of an annuity formula:",
    formulaLatex: "FV = P x [((1 + r)^n - 1) / r]",
    formulaVars: "FV = Future value, P = Monthly investment, r = Monthly interest rate, n = Number of months",
    useCases: [
      "Planning retirement savings through NPS.",
      "Estimating maturity amount and annuity requirements.",
      "Understanding the impact of monthly contributions and expected returns."
    ],
    definitions: [
      { title: "Investment per month", desc: "The amount contributed monthly to NPS." },
      { title: "Expected Return (p.a.)", desc: "The anticipated annual growth rate of NPS investments." },
      { title: "Your age", desc: "Current age, used to calculate years until retirement at 60." },
      { title: "Total Investment", desc: "Total amount invested over the period." },
      { title: "Interest Earned", desc: "Total returns generated from investments." },
      { title: "Maturity Amount", desc: "Total value at retirement." },
      { title: "Min. Annuity Investment", desc: "Minimum amount required for annuity purchase (40% of maturity)." }
    ]
  },
  "RD Calculator": {
    label1: "Monthly Investment", min1: 100, max1: 100000, step1: 100, def1: 100,
    label2: "Rate of Interest (p.a.)", min2: 1, max2: 20, step2: 0.1, def2: 1,
    label3: "Time Period", min3: 1, max3: 120, step3: 1, def3: 1,
    hasThirdSlider: true,
    hasFourthSlider: false,
    isV2Currency: false,
    timeUnit: 'Years',
  calculate: (
    monthly: number,
    rate: number,
    timePeriod: number,
    timeUnit: string
  ) => {
    const n = timeUnit === "Years" ? timePeriod * 12 : timePeriod;
    const P = Number(monthly);
    const R = Number(rate) / 100;

    if (!P || !R || !n) {
      return {
        totalValue: 0,
        totalInvested: 0,
        estReturns: 0,
        returnPercentage: 0,
        ratio: 0
      };
    }

    // Standard Bank RD Formula (Quarterly Compounding)
    // Maturity Value = P * [ (1 + r/4)^(n/3) - 1 ] / [ 1 - (1 + r/4)^(-1/3) ]
    const quarterlyRate = R / 4;
    const denominator = 1 - Math.pow(1 + quarterlyRate, -1/3);
    const numerator = Math.pow(1 + quarterlyRate, n/3) - 1;
    
    const maturity = P * (numerator / denominator);

    const totalInvested = P * n;
    const interest = maturity - totalInvested;

    return {
      totalValue: Math.round(maturity),
      totalInvested: Math.round(totalInvested),
      estReturns: Math.round(interest),
      returnPercentage: totalInvested > 0 ? (interest / totalInvested) * 100 : 0,
      ratio: totalInvested > 0 ? (interest / totalInvested) * 100 : 0
    };
  },
    totalValueLabel: "MATURITY VALUE",
    gainLabel: "EST. RETURNS %",
    investedLabel: "Total Invested",
    profitLabel: "Interest Earned",
    formulaText: "This RD calculator uses the future value of an annuity formula with monthly compounding:",
    formulaLatex: "FV = P x [((1 + r/12)^n - 1) / (r/12)] x (1 + r/12)",
    formulaVars: "FV = Future value, P = Monthly investment, r = Annual interest rate, n = Total months",
    useCases: [
      "Planning savings through recurring deposits.",
      "Estimating returns on fixed monthly investments.",
      "Comparing RD rates and time periods."
    ],
    definitions: [
      { title: "Monthly Investment", desc: "The amount deposited every month." },
      { title: "Rate of Interest (p.a.)", desc: "The annual interest rate offered on the RD." },
      { title: "Time Period", desc: "The duration for which the RD is held, in years and months." },
      { title: "Invested Amount", desc: "Total amount deposited over the period." },
      { title: "Est. Returns", desc: "Estimated interest earned." },
      { title: "Total Value", desc: "Maturity value including principal and interest." }
    ]
  },
"SSY Calculator": {
    label1: "Yearly Investment", min1: 250, max1: 150000, step1: 5000, def1: 250,
    label2: "Girl's Age", min2: 0, max2: 10, step2: 1, def2: 0,
    label3: "Start Year", min3: 2021, max3: 2030, step3: 1, def3: 2021,

    hasThirdSlider: true,
    isV2Currency: false,
  calculate: (yearly:number, age:number, startYear:number) => {
  // 1. Current official SSY interest rate (8.2%)
  const rate = 0.082;
  
  // 2. SSY Rules: 
  // Contribution Period: 15 years from start
  // Maturity Period: 21 years from start
  const contributionPeriod = 15;
  const maturityPeriod = 21;

  // Validation: SSY is only for girls aged 10 or below
  if (age > 10) return { error: "Girl must be 10 years or younger." };

  let balance = 0;
  let totalInvested = 0;

  for (let year = 1; year <= maturityPeriod; year++) {
    // Add deposit at the START of the year (only for first 15 years)
    if (year <= contributionPeriod) {
      balance += yearly;
      totalInvested += yearly;
    }

    // Apply interest at the END of the year (Annual Compounding)
    // Interest = (Balance * Rate) rounded to nearest whole number
    let annualInterest = (balance * rate);
    balance += annualInterest;
  }

  const maturityValue = Math.round(balance);
  const totalInterest = maturityValue - totalInvested;
  const maturityYear = startYear + maturityPeriod;

  return {
    totalValue: maturityValue,
    totalInvested,
    estReturns: totalInterest,
    maturityValue,
    maturityYear,
    returnPercentage: totalInvested > 0 ? +((totalInterest / totalInvested) * 100).toFixed(2) : 0,
    ratio: totalInvested > 0 ? +((totalInterest / totalInvested)).toFixed(2) : 0,
  };
},

    totalValueLabel: "Maturity Value",
    gainLabel: "RETURN %",
    investedLabel: "Total Investment",
    profitLabel: "Total Interest",
    formulaText: "This SSY calculator uses the future value of an annuity formula with annual compounding:",
    formulaLatex: "FV = P x [((1 + r)^n - 1) / r] x (1 + r)^m",
    formulaVars: "FV = Maturity Value, P = Yearly Investment, r = Annual Interest Rate (8.2%), n = Investment Years, m = Remaining Years to Maturity",
    useCases: [
      "Planning savings for girl child's education and marriage.",
      "Estimating maturity value of SSY investments.",
      "Comparing different investment amounts and periods."
    ],
    definitions: [
      { title: "Yearly Investment", desc: "The amount invested annually in the SSY account (â‚¹250 to â‚¹1.5 lakh)." },
      { title: "Girl's Age", desc: "Current age of the girl child (0-10 years)." },
      { title: "Start Year", desc: "The year when the investment starts (2021-2030)." },
      { title: "Total Investment", desc: "Total amount invested over the contribution period." },
      { title: "Total Interest", desc: "Total interest earned on the investment." },
      { title: "Maturity Year", desc: "The year when the account matures (at age 21)." },
      { title: "Maturity Value", desc: "The total amount available at maturity." }
  
    ]
  },
  "SWP Calculator": {
    label1: "Total Investment", min1: 10000, max1: 10000000, step1: 1000, def1: 10000,
    label2: "Withdraw per month", min2: 500, max2: 10000000, step2: 500, def2: 500,
    label3: "Expected return rate", min3: 0, max3: 30, step3: 0.5, def3: 0,
    label4: "Time period", min4: 5, max4: 30, step4: 1, def4: 5,
    hasThirdSlider: true,
    hasFourthSlider: true,
    isV2Currency: true,
    isV4Currency: false,
  calculate: (
  totalInvestment: number,
  withdrawPerMonth: number,
  expectedReturn: number,
  timePeriodYears: number
) => {
  const monthlyRate = expectedReturn / 100 / 12;
  const totalMonths = timePeriodYears * 12;

  let currentBalance = totalInvestment;
  let actualWithdrawals = 0;

  for (let i = 0; i < totalMonths; i++) {
    // 1. Withdrawal happens at the START of the month
    currentBalance -= withdrawPerMonth;
    actualWithdrawals += withdrawPerMonth;

    // 2. Interest is earned on the REMAINING balance
    currentBalance = currentBalance * (1 + monthlyRate);

    // 3. Allow negative values - don't cap at zero anymore
    // This allows the final value to display negative when withdrawals exceed the investment + returns
  }

  const finalValue = Math.round(currentBalance);
  const estReturns = actualWithdrawals + finalValue - totalInvestment;

  return {
    totalValue: Math.round(actualWithdrawals),
    totalInvested: totalInvestment,
    finalValue: finalValue,
    estReturns: Math.round(estReturns),
    returnPercentage: ((estReturns / totalInvestment) * 100).toFixed(2),
    years: timePeriodYears,
    ratio: (actualWithdrawals / totalInvestment).toFixed(2),
  };
},
    totalValueLabel: "TOTAL WITHDRAWAL",
    investedLabel: "Final Value",
    profitLabel: "Total Investment",
    formulaText: "This SWP calculator simulates monthly withdrawals from an investment with compound interest over a specified time period.",
    formulaLatex: "Balance = (Balance x (1 + r)) - W",
    formulaVars: "Balance = Current balance, r = Monthly interest rate, W = Monthly withdrawal, Time period = Specified years",
    useCases: [
      "Planning retirement income through systematic withdrawals.",
      "Estimating withdrawal amounts over a specific time period.",
      "Understanding the impact of withdrawal amounts and time horizons on investment longevity."
    ],
    definitions: [
      { title: "Final Value", desc: "The initial lump sum amount invested." },
      { title: "Withdraw per month", desc: "The fixed amount withdrawn every month." },
      { title: "Expected return rate", desc: "The anticipated annual growth rate of the investment." },
      { title: "Time period", desc: "The number of years over which withdrawals will be made." },
      { title: "Total Withdrawal", desc: "The total amount withdrawn over the specified period." },
      { title: "Total Investment", desc: "The remaining balance after the specified time period." }
    ]
  },
  "PPF Calculator": {
    label1: "Yearly Investment", min1: 500, max1: 150000, step1: 500, def1: 500,
    label2: "Time Period", min2: 15, max2: 50, step2: 1, def2: 15,
    label3: "Rate of Interest (%)", min3: 7.1, max3: 7.1, step3: 0.1, def3: 7.1,
    hasThirdSlider: true,
    isV2Currency: false,
    calculate: (yearlyInvestment: number, timePeriod: number, rate: number) => {
      const r = rate / 100;
      const n = timePeriod;

      const maturityValue = yearlyInvestment * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
      const totalInvested = yearlyInvestment * n;
      const estReturns = maturityValue - totalInvested;

      return {
        totalValue: Math.round(maturityValue),
        totalInvested,
        estReturns: Math.round(estReturns),
        maturityValue: Math.round(maturityValue),
        returnPercentage: +((estReturns / totalInvested) * 100).toFixed(2),
        ratio: (estReturns / totalInvested) * 100
      };
    },
    totalValueLabel: "MATURITY VALUE",
    gainLabel: "RETURN %",
    investedLabel: "Total Investment",
    profitLabel: "Total Interest",
    formulaText: "This PPF calculator uses the future value of an annuity formula with annual compounding at 7.1% interest rate:",
    formulaLatex: "FV = P x [((1 + r)^n - 1) / r] x (1 + r)",
    formulaVars: "FV = Maturity Value, P = Yearly Investment, r = Annual Interest Rate (7.1%), n = Number of Years",
    useCases: [
      "Planning long-term savings through PPF.",
      "Estimating maturity value and interest earned.",
      "Understanding the benefits of tax-free savings."
    ],
    definitions: [
      { title: "Yearly Investment", desc: "The amount invested annually in the PPF account (â‚¹500 to â‚¹1.5 lakh)." },
      { title: "Time Period", desc: "The duration for which the investment is held (15-50 years)." },
      { title: "Rate of Interest", desc: "The fixed annual interest rate offered on the PPF account (7.1%)." },
      { title: "Invested Amount", desc: "Total amount invested over the period." },
      { title: "Total Interest", desc: "Total interest earned on the investment." },
      { title: "Maturity Value", desc: "The total value available at maturity." }
    ]
  },
  "Lumpsum Calculator": {
    label1: "Total Investment", min1: 100, max1: 1000000, step1: 100, def1: 100,
    label2: "Expected Rate (p.a.)", min2: 1, max2: 20, step2: 0.1, def2: 1,
    label3: "Time period", min3: 1, max3: 40, step3: 1, def3: 1,
    hasThirdSlider: true,
    isV2Currency: false,
    calculate: (principal: number, rate: number, years: number) => {
      const P = Number(principal);
      const r = Number(rate) / 100;
      const t = Number(years);

      const totalValue = P * Math.pow(1 + r, t);
      const estReturns = totalValue - P;

      return {
        totalValue: Math.round(totalValue),
        years: t,
        returnPercentage: +((estReturns / P) * 100).toFixed(2),
        totalInvested: P,
        estReturns: Math.round(estReturns),
        ratio: +((estReturns / P) * 100).toFixed(2)
      };
    },
    totalValueLabel: "TOTAL VALUE",
    gainLabel: "RETURN %",
    investedLabel: "Est. Returns",
    profitLabel: "Invested Amount",
    formulaText: "This lumpsum calculator uses the compound interest formula for a lump sum investment:",
    formulaLatex: "FV = P x (1 + r)^t",
    formulaVars: "FV = Future Value, P = Principal, r = Annual Interest Rate, t = Time Period (Years)",
    useCases: [
      "Planning long-term investments with a single lump sum.",
      "Estimating future value of one-time investments.",
      "Comparing different expected return rates for lump sum investments."
    ],
    definitions: [
      { title: "Total Investment", desc: "The initial amount invested as a lump sum." },
      { title: "Expected Rate (p.a.)", desc: "The anticipated annual growth rate of the investment." },
      { title: "Time period", desc: "The duration over which the investment is held." },
      { title: "Est. Returns", desc: "The estimated profit from the investment." },
      { title: "Total Value", desc: "The total value of the investment including principal and returns." }
    ]
  },
  "SCSS Calculator": {
    label1: "Yearly Investment", min1: 100, max1: 100000, step1: 100, def1: 1000,
    label2: "Tenure", min2: 5, max2: 5, step2: 1, def2: 5,
    label3: "Rate of Interest", min3: 8.2, max3: 8.2, step3: 0.1, def3: 8.2,
    hasThirdSlider: true,
    isV2Currency: false,
    calculate: (yearlyInvestment: number, tenure: number, rate: number, sliderPercentage: number = 0) => {
  const P = Number(yearlyInvestment);
  const years = Number(tenure);
  const annualRate = Number(rate) / 100;
  const quarters = years * 4;
  // Quarterly interest (simple interest)
  const quarterlyInterest = (P * annualRate) / 4;
  // Total interest over entire tenure
  const totalInterest = quarterlyInterest * quarters;
  // Quarterly receivable interest = (P * annualRate) / 4
  const maturityValue = P + totalInterest;
  // Use slider position for dynamic donut chart effect (since tenure and rate are fixed)
  // The slider percentage gives us a value from 0-100 based on the investment amount
  const dynamicRatio = sliderPercentage;
  return {
    totalValue: Math.round(maturityValue), // maturity value
    years: years,
    returnPercentage: +((totalInterest / P) * 100).toFixed(2),
    totalInvested: Math.round(P),
    estReturns: Math.round(totalInterest),
    maturityValue: Math.round(maturityValue),
    quarterlyInterest: Math.round(quarterlyInterest),
    ratio: dynamicRatio > 0 ? dynamicRatio : 41 // Default to 41% if no slider input, fallback for initial render
  };
},
    totalValueLabel: "MATURITY VALUE",
    gainLabel: "RETURN %",
    investedLabel: "Total Interest",
    profitLabel: "Quarterly Receivable Interest",
    formulaText: "This SCSS calculator uses compound interest with quarterly compounding for yearly investments over a fixed tenure.",
    formulaLatex: "Total Interest=P×(R/100)xT",
    formulaVars: "FV = Maturity Value, P = Yearly Investment, r = Annual Interest Rate, quarters = Total quarters",
    useCases: [
      "Planning savings for senior citizens with fixed tenure and interest rate.",
      "Estimating quarterly interest and total returns on SCSS investments.",
      "Understanding the impact of yearly investments on maturity value."
    ],
    definitions: [
      { title: "Yearly Investment", desc: "The amount invested annually in the SCSS scheme." },
      { title: "Tenure", desc: "The fixed duration of the investment, set at 5 years." },
      { title: "Rate of Interest", desc: "The fixed annual interest rate, set at 8.2%." },
      { title: "Quarterly Receivable Interest", desc: "The interest earned and receivable each quarter." },
      { title: "Total Interest", desc: "The total interest earned over the tenure." },
      { title: "Quarterly Receivable Interest", desc: "The interest earned and receivable each quarter." }
    ]
  },
  "Post Office MIS Calculator": {
    label1: "Invested Amount", min1: 1000, max1: 450000, step1: 1000, def1: 1000,
    label2: "Interest Rate", min2: 1, max2: 12, step2: 0.1, def2: 1,
    label3: "Lock in period", min3: 5, max3: 5, step3: 1, def3: 5,
    hasThirdSlider: true,
    isV2Currency: false,
    calculate: (principal: number, rate: number, lockInPeriod: number) => {
      const P = Number(principal);
      const r = Number(rate) / 100;
      const years = Number(lockInPeriod);
      const monthlyIncome = (P * r) / 12;
      const totalInvested = P;
      const totalIncome = monthlyIncome * years * 12;
      const estReturns = totalIncome - P;

      return {
        totalValue: Math.round(monthlyIncome),
        totalInvested: P,
        estReturns: Math.round(estReturns),
        returnPercentage: rate,
        years: years,
        ratio: (totalIncome / P) * 100
      };
    },
    totalValueLabel: "MONTHLY Income",
    gainLabel: "INTEREST RATE %",
    investedLabel: "Interest Rate",
    profitLabel: "Invested Amount",
    formulaText: "This Post Office MIS calculator calculates monthly income based on invested amount and interest rate:",
    formulaLatex: "Monthly Income = (Principal xRate)/(100x12)",
    formulaVars: "Principal = Invested Amount, Rate = Annual Interest Rate (%), Monthly Income = Amount received monthly",
    useCases: [
      "Planning regular monthly income from Post Office investments.",
      "Understanding returns from Monthly Income Scheme.",
      "Comparing MIS with other fixed income options."
    ],
    definitions: [
      { title: "Invested Amount", desc: "The lump sum amount invested in Post Office MIS (â‚¹1,000 to â‚¹4.5 lakh)." },
      { title: "Interest Rate", desc: "The annual interest rate offered on the MIS investment." },
      { title: "Lock in period", desc: "The fixed duration for which the investment is locked in (5 years)." },
      { title: "Monthly Income", desc: "The monthly income received from the investment." }
    ]
  },
  "Gratuity Calculator": {
    label1: "Monthly Salary (Basic+DA)", min1: 10000, max1: 200000, step1: 1000, def1: 10000,
    label2: "Years of Service", min2: 5, max2: 30, step2: 1, def2: 1,
    hasThirdSlider: false,
    isV2Currency: false,
    calculate: (monthlySalary: number, years: number) => {
      const gratuity = (monthlySalary * 15 * years) / 26;
      return {
        totalValue: Math.round(gratuity),
        totalInvested: monthlySalary,
        estReturns: years,
        returnPercentage: 0,
        years: years,
        ratio: (years / 30) * 100
      };
    },
    totalValueLabel: "TOTAL GRATUITY PAYABLE",
    gainLabel: "",
    investedLabel: "Monthly Salary",
    profitLabel: "Years of Service",
    formulaText: "This Gratuity calculator calculates the gratuity amount based on monthly salary and years of service:",
    formulaLatex: "Gratuity = (Monthly Salary × 15 × Years of Service) / 26",
    formulaVars: "Monthly Salary = Basic + DA, Years of Service = Number of years worked",
    useCases: [
      "Calculating gratuity for employees upon retirement or resignation.",
      "Understanding gratuity benefits in employment contracts.",
      "Planning for retirement benefits."
    ],
    definitions: [
      { title: "Monthly Salary (Basic+DA)", desc: "The monthly basic salary plus dearness allowance." },
      { title: "Years of Service", desc: "The number of years the employee has served the organization." },
      { title: "Gratuity", desc: "A lump sum payment made to an employee upon retirement or resignation." }
    ]
  },
"NSC Calculator": {
    label1: "Amount Invested", min1: 100, max1: 1000000, step1: 100, def1: 100,
    label2: "Rate of interest(p.a.)", min2: 1, max2: 10, step2: 0.1, def2: 1,
    label3:"Compounding Frequency", options3: ["Yearly", "Half-yearly"], def3: "Half-yearly",
    hasThirdSlider: true,
    isV2Currency: false,
    calculate: (amountInvested: number, rate: number, compoundingFrequency: number) => {
  const P = Number(amountInvested);
  const r = Number(rate) / 100;
  const t = 5; // NSC fixed tenure (5 years)

  // compoundingFrequency: 1 = Yearly, 2 = Half-yearly
  const n = compoundingFrequency === 2 ? 2 : 1; // Number of compounding periods per year
  
  // Compound interest formula: A = P × (1 + r/n)^(n × t)
  const totalValue = P * Math.pow(1 + r / n, n * t);
  const estReturns = totalValue - P;

  return {
    totalValue: Math.round(totalValue),
    totalInvested: P,
    estReturns: Math.round(estReturns),
    returnPercentage: +((estReturns / P) * 100).toFixed(2),
    years: t,
    ratio: +((estReturns / P) * 100).toFixed(2)
  };
},

    totalValueLabel: "TOTAL AMOUNT",
    gainLabel: "RETURN %",
    investedLabel: "Amount Invested",
    profitLabel: "Total Interest",
    formulaText: "This NSC calculator uses compound interest formula with half-yearly compounding over 5 years:",
    formulaLatex: "FV = P x (1+r)^n",
    formulaVars: "FV = Future Value, P = Principal, r = Annual Interest Rate , n = Total Compounding Periods",
    useCases: [
      "Planning investments in National Savings Certificates.",
      "Estimating maturity value and interest earned.",
      "Comparing NSC returns with other investment options."
    ],
    definitions: [
      { title: "Amount Invested", desc: "The initial amount invested in NSC." },
      { title: "Rate of Interest (p.a.)", desc: "The annual interest rate offered on NSC." },
      { title: "Total Amount", desc: "The maturity value including principal and interest." },
      { title: "Total Interest", desc: "The total interest earned over 5 years." }
    ]
  },
  "Stock Average Calculator": {
    // Custom calculator with multiple share blocks
    calculate: (shares: {buyPrice: string, quantity: string}[]) => {
      const totalAmount = shares.reduce((sum, share) => {
        const buyPrice = parseFloat(share.buyPrice) || 0;
        const quantity = parseFloat(share.quantity) || 0;
        return sum + (buyPrice * quantity);
      }, 0);
      const totalShares = shares.reduce((sum, share) => {
        const quantity = parseFloat(share.quantity) || 0;
        return sum + quantity;
      }, 0);
      const averagePrice = totalShares > 0 ? totalAmount / totalShares : 0;
      
      // For Stock Average, we'll show a fixed ratio based on whether user has entered data
      // If no shares entered (totalAmount = 0), show empty donut
      // If shares entered, show a placeholder ratio for visualization
      const hasData = totalAmount > 0 && totalShares > 0;
      const displayRatio = hasData ? 50 : 0; // Show 50% filled when has data, else 0%
      
      return {
        totalValue: Math.round(totalAmount),
        averagePrice: Math.round(averagePrice * 100) / 100,
        totalShares: Math.round(totalShares),
        returnPercentage: 0, // Not applicable
        ratio: displayRatio,
        hasDonutChart: true // Flag to show donut chart
      };
    },
    totalValueLabel: "TOTAL AMOUNT",
    gainLabel: "",
    investedLabel: "Average Price",
    profitLabel: "Total Shares",
    hasDonutChart: true, // Show donut chart for Stock Average
    formulaText: "This stock average calculator computes the weighted average price based on multiple purchases:",
    formulaLatex: "Average Price = Total Amount / Total Shares",
    formulaVars: "Total Amount = Sum of (Buy Price × Quantity) for all shares, Total Shares = Sum of Quantities",
    useCases: [
      "Calculating average cost of stock purchases over time.",
      "Determining the break-even price for investments.",
      "Tracking portfolio performance with multiple buy-ins."
    ],
    definitions: [
      { title: "Buy Price", desc: "The price per share at the time of purchase." },
      { title: "Quantity", desc: "The number of shares purchased at that price." },
      { title: "Total Amount", desc: "The total money invested across all purchases." },
      { title: "Average Price", desc: "The weighted average price per share." },
      { title: "Total Shares", desc: "The total number of shares owned." }
    ]
  },
"Salary Calculator": {
    label1: "Cost to Company (CTC)", min1: 100000, max1: 50000000, step1: 10000, def1: 100000,
    label2: "Bonus Value (%)", min2: 0, max2: 100, step2: 0.1, def2: 0,
    label3: "Monthly Professional Tax", min3: 0, max3: 5000, step3: 50, def3: 0,
    label4: "Monthly Employer PF", min4: 0, max4: 15000, step4: 100, def4: 0,
    label5: "Monthly Employee PF", min5: 0, max5: 15000, step5: 100, def5: 0,
    hasThirdSlider: true,
    hasFourthSlider: true,
    hasFifthSlider: true,
    isV2Currency: false,
    calculate: (ctc: number, bonusPercent: number, profTax: number, employerPf: number, employeePf: number) => {
  const monthlyCTC = ctc / 12;
  
  // 1. Monthly Bonus (Part of CTC but not in monthly take-home)
  const monthlyBonusComponent = (monthlyCTC * bonusPercent) / 100;

  // 2. Take Home Monthly
  // Subtract everything that isn't cash-in-hand: Employer PF, Employee PF, Prof Tax, and the Bonus portion
  const takeHomeMonthly = monthlyCTC - employerPf - employeePf - profTax - monthlyBonusComponent;
  
  // 3. Total Monthly Deductions
  // This must equal: (Monthly CTC - Take Home Monthly)
  const totalMonthlyDeductions = monthlyCTC - takeHomeMonthly;
  
  // 4. Annual Values
  const takeHomeAnnual = takeHomeMonthly * 12;
  const totalAnnualDeductions = totalMonthlyDeductions * 12;

  // 5. Calculate ratio for donut chart (Deductions as percentage of gross salary)
  // Using monthlyCTC (which includes bonus) as the gross
  const grossSalary = monthlyCTC;
  const ratio = grossSalary > 0 ? (totalMonthlyDeductions / grossSalary) * 100 : 0;

  return {
    totalValue: Math.round(takeHomeMonthly),
    takeHomeAnnual: Math.round(takeHomeAnnual),
    totalMonthlyDeductions: Math.round(totalMonthlyDeductions),
    totalAnnualDeductions: Math.round(totalAnnualDeductions),
    monthlySalary: Math.round(monthlyCTC - employerPf - monthlyBonusComponent), // This is Gross Salary
    ctc: Math.round(ctc),
    returnPercentage: 0,
    ratio: +ratio.toFixed(2)
  };
},
    totalValueLabel: "TAKE HOME MONTHLY SALARY",
    gainLabel: "",
    investedLabel: "Take Home Annual Salary",
    profitLabel: "Total Monthly Deductions",
    formulaText: "This salary calculator computes take-home salary by deducting employee PF and professional tax from CTC plus bonus percentage.",
    formulaLatex: "Take Home Monthly = ((CTC + (CTC x Bonus% / 100)) / 12) - (Professional Tax + Employee PF)",
    formulaVars: "CTC = Cost to Company (annual), Bonus % = Bonus percentage of CTC, Professional Tax = Monthly deduction, Employee PF = Monthly deduction",
    useCases: [
      "Calculating net salary after deductions including bonus percentage.",
      "Planning personal finances based on CTC with bonus incentives.",
      "Understanding monthly and annual take-home pay with percentage-based bonuses."
    ],
    definitions: [
      { title: "Cost to Company (CTC)", desc: "The total cost of employment to the company, including base salary and benefits." },
      { title: "Bonus Value (%)", desc: "The bonus percentage of CTC added to total compensation." },
      { title: "Professional Tax", desc: "Monthly tax deducted based on salary slabs." },
      { title: "Employer PF", desc: "Monthly contribution by employer to Provident Fund (not deducted from employee salary)." },
      { title: "Employee PF", desc: "Monthly contribution by employee to Provident Fund." },
      { title: "Take Home Salary", desc: "Net salary received after deductions." }
    ]
  },
};

const CalculatorDetail: React.FC<Props> = ({ calc, onBack, showNavbar = true }) => {
  const location = useLocation();   
  const isSolutionPage = location.pathname.includes("/category");


  const { theme } = useTheme();
  const calculatorTitle = calc?.title || "";
  const config = CALC_CONFIGS[calculatorTitle] || CALC_CONFIGS["SIP Calculator"];

  // For SCSS Calculator, use min1 (initial position) instead of def1
  const getInitialV1 = () => {
    if (calculatorTitle === "SCSS Calculator") {
      return String(config.min1);
    }
    return String(config.def1 || config.min1);
  };

  const [v1, setV1] = useState<string>(getInitialV1());
  const [v2, setV2] = useState<string>(String(config.def2 || config.min2));
  const [v3, setV3] = useState<string>(String(config.def3 || config.min3 || 0));
  const [v4, setV4] = useState<string>(String(config.def4 || config.min4 || 0));
  const [v5, setV5] = useState<string>(String(config.def5 || config.min5 || 0));
  const [isINR, setIsINR] = useState(false);
  const [timeUnit, setTimeUnit] = useState(config.timeUnit || 'Years');
  const [gstMode, setGstMode] = useState<'exclusive' | 'inclusive'>('exclusive');

  const [frequency, setFrequency] = useState(2); // default half-yearly
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Income Tax Calculator specific state
  const [assessmentYear, setAssessmentYear] = useState('2025-2026');
  const [ageCategory, setAgeCategory] = useState('Below 60');
  const [deductions, setDeductions] = useState({
    deduction80C: 0,
    deduction80CCD1B: 0,
    deduction80D: 0,
    deduction80G: 0,
    deduction80E: 0,
    deduction80TTA: 0
  });
  const [hra, setHra] = useState({
    basicSalary: 0,
    da: 0,
    hraReceived: 0,
    rentPaid: 0
  });

  // Stock Average Calculator specific state
  const [shares, setShares] = useState<{buyPrice: string, quantity: string}[]>([
    { buyPrice: '0', quantity: '0' },
    { buyPrice: '0', quantity: '0' }
  ]);



  // Set defaults on mount
  useEffect(() => {
    setV1(String(config.def1 || config.min1));
    setV2(String(config.def2 || config.min2));
    setV3(String(config.def3 || config.min3 || 0));
    setV4(String(config.def4 || config.min4 || 0));
    setV5(String(config.def5 || config.min5 || 0));
  }, [config]);

  // Calculation
  const val1 = Number(v1) || (config.def1 || config.min1);
  const val2 = Number(v2) || (config.def2 || config.min2);
  const val3 = Number(v3) || (config.def3 || config.min3 || 0);
  const val4 = Number(v4) || (config.def4 || config.min4 || 0);
  const val5 = Number(v5) || (config.def5 || config.min5 || 0);

  // Calculate percentages for dynamic slider fills
  const percentage1 = config.min1 !== config.max1 ? ((val1 - config.min1) / (config.max1 - config.min1)) * 100 : 0;
  const percentage2 = config.min2 !== config.max2 ? ((val2 - config.min2) / (config.max2 - config.min2)) * 100 : 0;
  const percentage3 = config.min3 !== config.max3 ? ((val3 - config.min3) / (config.max3 - config.min3)) * 100 : 0;
  const percentage4 = config.min4 !== config.max4 ? ((val4 - config.min4) / (config.max4 - config.min4)) * 100 : 0;
  const percentage5 = config.min5 !== config.max5 ? ((val5 - config.min5) / (config.max5 - config.min5)) * 100 : 0;

  // Dynamic slider styles based on theme and slider index
  const getSliderStyle = (percentage: number, sliderIndex: number = 0) => {
    const fillColor = '#3b82f6'; // blue for all sliders
    return {
      background: `linear-gradient(to right, ${fillColor} 0%, ${fillColor} ${percentage}%, ${theme === 'dark' ? '#1e293b' : '#f1f5f9'} ${percentage}%, ${theme === 'dark' ? '#1e293b' : '#f1f5f9'} 100%)`
    };
  };

  let results: any = {};
  if (calc?.title === "Stock Average Calculator") {
    results = config.calculate(shares);
  } else if (calc?.title === "Salary Calculator") {
    results = config.calculate(val1, val2, val3, val4, val5);
  } else if (config.hasFourthSlider) {
    results = config.calculate(val1, val2, val3, val4);
  } else if (config.hasThirdSlider) {
    if (calc?.title === "RD Calculator") {
      results = config.calculate(val1, val2, val3, timeUnit);
    } else if (calc?.title === "SCSS Calculator") {
      results = config.calculate(val1, val2, val3, percentage1);
    } else if (calc?.title === "NSC Calculator") {
      results = config.calculate(val1, val2, val3);
    } else {
      results = config.calculate(val1, val2, val3);
    }
  } else if (calc?.title === "GST Calculator") {
    results = config.calculate(val1, val2, gstMode);
  } else {
    results = config.calculate(val1, val2);
  }

  const { totalInvested = 0, estReturns = 0, totalValue = 0, years = 0, returnPercentage = 0, ratio = 0, finalAmount = 0, maturityValue = 0, averagePrice = 0, totalShares = 0 } = results;

  // Trigger animation when ratio changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [ratio]);

  const formatCurrency = (amount: number) => {
    const convertedAmount = isINR ? amount * 83 : amount;
    const symbol = isINR ? '₹' : '$';
    return `${symbol} ${convertedAmount.toLocaleString()}`;
  };

  const circumference = 2 * Math.PI * 76;
  const offset = circumference - (Math.abs(ratio) / 100) * circumference;

  const dynamicConfig = {
    ...config,
    ...(calc?.title === "GST Calculator" ? {
      totalValueLabel: gstMode === 'exclusive' ? "TOTAL PRICE(Including GST)" : "ORIGINAL PRICE(Excluding GST)",
      investedLabel: "Actual Amount",
      profitLabel: "GST Amount",
      formulaText: gstMode === 'exclusive'
        ? "This GST calculator calculates the Goods and Services Tax:"
        : "This GST calculator calculates the Goods and Services Tax for inclusive pricing:",
      formulaLatex: gstMode === 'exclusive'
        ? "GST Amount = Price x (GST Rate / 100)"
        : "GST=(Price x GST Rate)/(100+GST Rate)​",
      formulaVars: gstMode === 'exclusive'
        ? "GST Amount = Tax amount, Price = Original price, GST Rate = Tax percentage, Total Price = Price including GST"
        : "Original Price = Price before GST, Total Price = Price including GST, GST Amount = Tax amount, GST Rate = Tax percentage"
    } : {})
  };
  

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 pb-20 font-sans text-slate-900 dark:text-white">
      {showNavbar && <Navbar />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 md:mb-3 gap-4 mt-5">
          <div className="flex items-center gap-3 sm:gap-6">
            <button 
              onClick={onBack} 
              className="w-10 h-10 sm:w-10 sm:h-10 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 hover:border-blue-500 cursor-pointer flex items-center justify-center transition-all -mt-[20px]"
            >
              <ArrowLeft size={18} className="text-slate-600 dark:text-slate-400" />
            </button>
            <div className="flex flex-col items-start text-left">
              <div
  className={`inline-block
    bg-blue-50 dark:bg-slate-900
    text-blue-500 dark:text-blue-300
    font-sans font-bold
    text-[13px]
    uppercase tracking-wider
    px-2 py-1
    rounded-md
    ${isSolutionPage ? "mt-4" : "-mt-[2px]"}
  `}
>
  {calc?.category || "INVESTMENT"}
</div>





              <h1 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
  {calc?.title || "Calculator"}
</h1>

            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 mb-12 -py-1">
          
          {/* Inputs Section */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-[1.5 rem] sm:rounded-[2.5rem] p-6 sm:p-6 md:p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="text-slate-400 text-[10px] mb-4 font-bold uppercase tracking-widest text-left">
              <Info size={14} className="inline mr-2 -mt-1" /> Adjust sliders or type values
            </div>

            <div className="space-y-1 sm:space-y-1">
              {/* GST Mode Radio Buttons */}
              {calc?.title === "GST Calculator" && (
                <div className="mt-4">
                  <label className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2  mr-139  block">GST Mode</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gstMode"
                        value="exclusive"
                        checked={gstMode === 'exclusive'}
                        onChange={(e) => setGstMode(e.target.value as 'exclusive' | 'inclusive')}
                        className="text-blue-600 focus:ring-blue-500 accent-blue-600"
                      />
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Exclusive</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gstMode"
                        value="inclusive"
                        checked={gstMode === 'inclusive'}
                        onChange={(e) => setGstMode(e.target.value as 'exclusive' | 'inclusive')}
                        className="text-blue-600 focus:ring-blue-500 accent-blue-600"
                      />
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Inclusive</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Stock Average Calculator Custom UI */}
              {calc?.title === "Stock Average Calculator" ? (
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4 mr-135">Share Blocks</div>
                  {shares.map((share, index) => (
                    <div key={index} className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-3">Share {index + 1}</span>
                        {shares.length > 2 && (
                          <button
                            onClick={() => setShares(shares.filter((_, i) => i !== index))}
                            className="text-red-500 hover:text-red-700 text-sm font-bold"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="flex items-end gap-4">
                        <div className="flex-1">
                          <label className="text-xs font-bold text-slate-500 mb-1 block">Buy Price</label>
                          <input
                            type="number"
                            value={share.buyPrice}
                            onFocus={() => {
                              setShares(prevShares => prevShares.map((s, i) =>
                                i === index ? { ...s, buyPrice: '' } : s
                              ));
                            }}
                            onChange={(e) => {
                              const val = e.target.value;
                              // Limit to 7 digits for Buy Price
                              if (val.length <= 7) {
                                setShares(prevShares => prevShares.map((s, i) =>
                                  i === index ? { ...s, buyPrice: val } : s
                                ));
                              }
                            }}
                            maxLength={7}
                            max={9999999}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm"
                            placeholder="0"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-xs font-bold text-slate-500 mb-1 block">Quantity</label>
                          <input
                            type="number"
                            value={share.quantity}
                            onFocus={() => {
                              setShares(prevShares => prevShares.map((s, i) =>
                                i === index ? { ...s, quantity: '' } : s
                              ));
                            }}
                            onChange={(e) => {
                              const val = e.target.value;
                              // Limit to 5 digits for Quantity
                              if (val.length <= 5) {
                                setShares(prevShares => prevShares.map((s, i) =>
                                  i === index ? { ...s, quantity: val } : s
                                ));
                              }
                            }}
                            maxLength={5}
                            max={99999}
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => setShares([...shares, { buyPrice: '0', quantity: '0' }])}
                    className="w-[180px] py-1 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
                  >
                    + Add Share Block
                  </button>
                </div>
              ) : (
                <>
                  {/* SSY Rate Display */}
{calc?.title === "SSY Calculator" && (
                    <div className="mb-4 mt-2">
                      <span className="text-sm font-bold text-slate-400 dark:text-slate-400 mr-[475px]">
                        Latest SSY Rate = 8.5%
                      </span>
                    </div>
                  )}
                  
                  {/* First Input */}
                  <div>
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center -mb-1 -mt-2">
    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 sm:mb-0">
      {config.label1}
    </label>
    {/* Added 'w-32' for uniform width and 'justify-center' to keep things neat */}
<div className="flex items-center justify-start w-26 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-2 rounded-lg font-black text-sm border border-blue-100 dark:border-blue-800/50">
  <AutoResizeInput
    value={v1}
    onChange={(val) => {
      if (val === '') {
        setV1(''); 
      } else {
        const numVal = Number(val);
        // Safety check: if the input isn't a valid number, don't update (prevents NaN)
        if (!isNaN(numVal)) {
          if (numVal > config.max1) setV1(String(config.max1));
          else setV1(val);
        }
      }
      setHasInteracted(true);
    }}
    onBlur={() => {
      const numVal = Number(v1);
      // Enhanced validation on exit
      if (v1 === '' || isNaN(numVal) || numVal < config.min1) {
        setV1(String(config.min1));
      }
    }}
    prefix={isINR ? '₹' : '$'}
    /* Added these to ensure the input centers itself inside the fixed div */
    className="text-center outline-none bg-transparent w-full"
    minWidth="20px" 
  />
</div>
  </div>

  {config.min1 !== config.max1 && (
    <>
      <input
        type="range"
        min={config.min1}
        max={config.max1}
        step={config.step1}
        // KEY FIX: Use config.min1 if v1 is empty so the slider resets
        value={v1 === '' ? config.min1 : v1} 
        onChange={(e) => setV1(e.target.value)}
        style={getSliderStyle(v1 === '' ? 0 : percentage1, 0)}
        className="w-full h-2 sm:h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600"
      />
      <div className="flex justify-between text-[10px] font-bold text-slate-300 mt-1 uppercase">
        <span>{config.min1.toLocaleString()}</span>
        <span>{config.max1.toLocaleString()}</span>
      </div>
    </>
  )}
</div>
                  
                </>
              )}

              {/* Second Input */}
              <div>
  {calc?.title !== "Stock Average Calculator" && (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center -mb-1 mt-3">
      <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 sm:mb-0">
        {config.label2}
      </label>

      {/* For SCSS Calculator, show fixed tenure as text instead of input */}
      {calc?.title === "SCSS Calculator" ? (
        <div className="text-sm font-bold text-slate-600 dark:text-slate-400">
          5 Years
        </div>
      ) : (
                  <div className="inline-flex items-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-2 rounded-lg font-black text-sm border border-blue-100 dark:border-blue-800/50 w-[105px]">
            <div className="flex items-center">
  {(config.isV2Currency || calc?.title === "HRA Calculator") && (
    <span className="mr-[3px]">
  {isINR ? "₹" : "$"}
</span>

  )}

  <input
    type="text"
    inputMode="decimal"
    value={v2}
    onChange={(e) => {
      const val = e.target.value.replace(/[^0-9.]/g, "");

      if (val === "" || val === "-") {
        setV2(val);
      } else {
        const numVal = Number(val);
        if (numVal > config.max2) setV2(String(config.max2));
        else setV2(val);
      }
    }}
    onBlur={() => {
      if (v2 === "" || isNaN(Number(v2)) || Number(v2) < config.min2) {
        setV2(String(config.def2 || config.min2));
      }
    }}
    style={{
      width: `${Math.max(v2?.length || 1, 1)}ch`
    }}
    className="bg-transparent outline-none border-none p-0 focus:ring-0 text-left appearance-none"
  />

  {!config.isV2Currency && calc?.title !== "HRA Calculator" && (
    <span className="shrink-0 ml-[2px]">
      {calc?.title === "SSY Calculator"
        ? "YRS"
        : calc?.title === "Gratuity Calculator"
        ? "YRS"
        : calc?.title === "EPF Calculator"
        ? "Yr"
        : calc?.title === "PPF Calculator"
        ? "YRS"
        : "%"}
    </span>
  )}
</div>

        </div>
      )}
    </div>
  )}

  {config.min2 !== config.max2 && (
    <>
      <input
        type="range"
        min={config.min2}
        max={config.max2}
        step={config.step2}
        // If v2 is empty, slider visually snaps to the min value
        value={v2 === '' || v2 === '-' ? config.min2 : v2}
        onChange={(e) => setV2(e.target.value)}
        // Ensure the filled track percentage also resets to 0 when empty
        style={getSliderStyle(v2 === '' || v2 === '-' ? 0 : percentage2, 1)}
        className="w-full h-2 sm:h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600"
      />
      <div className="flex justify-between text-[10px] font-bold text-slate-300 mt-1 uppercase">
        <span>
          {config.min2.toLocaleString()}
          {!config.isV2Currency && calc?.title !== "Salary Calculator" && 
          (calc?.title === "SSY Calculator" || calc?.title === "Gratuity Calculator" || calc?.title === "PPF Calculator" ? " YRS" : calc?.title === "EPF Calculator" ? " Yr" : "%")}
        </span>
        <span>
          {config.max2.toLocaleString()}
          {!config.isV2Currency && calc?.title !== "Salary Calculator" && 
          (calc?.title === "SSY Calculator" || calc?.title === "Gratuity Calculator" || calc?.title === "PPF Calculator" ? " YRS" : calc?.title === "EPF Calculator" ? " Yr" : "%")}
        </span>
      </div>
    </>
  )}
</div>





              {/* Fixed Time Period for NSC Calculator */}
              {calc?.title === "NSC Calculator" && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 sm:mb-0">Time Period</label>
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400">5 Years</span>
                  </div>
                </div>
              )}

              {/* Third Input */}
              {config.hasThirdSlider && (
  <div className={calc?.title === "SCSS Calculator" ? "mt-4" : ""}>
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
      <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 sm:mb-0">
        {config.label3}
      </label>
      <div className="flex items-center gap-2">
        {calc?.title === "RD Calculator" && (
          <select
            value={timeUnit}
            onChange={(e) => setTimeUnit(e.target.value)}
            className="px-2.5 py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-xs font-bold border border-blue-100 dark:border-blue-800/50"
          >
            <option value="Years">Years</option>
            <option value="Months">Months</option>
          </select>
        )}
        {calc?.title === "NSC Calculator" && (
          <select
            value={v3}
            onChange={(e) => setV3(e.target.value)}
            className="px-2.5 py-2 mt-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-extrabold border border-blue-100 dark:border-blue-800/50"
          >
            <option value="1">Yearly</option>
            <option value="2">Half-Yearly</option>
          </select>
        )}
{calc?.title === "PPF Calculator" ? (
          <span className="text-sm font-bold text-slate-600 dark:text-slate-400">7.1%</span>
        ) : calc?.title === "SCSS Calculator" ? (
          <div className="text-sm font-bold text-slate-600 dark:text-slate-400">
            8.2%
          </div>
        ) : calc?.title === "Post Office MIS Calculator" ? (
          <div className="text-sm font-bold text-slate-600 dark:text-slate-400">
            5 Years
          </div>
        ) : (
          calc?.title !== "NSC Calculator" && calc?.title !== "SCSS Calculator" && (
            <div className="inline-flex items-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-2 rounded-lg font-black text-sm border border-blue-100 dark:border-blue-800/50 w-[105px]">

  {/* PREFIX (₹ or $) */}
  {(calc?.title === "HRA Calculator" || calc?.title === "Salary Calculator") && (
    <span className="mr-[4px]">
      {isINR ? "₹" : "$"}
    </span>
  )}

  {/* INPUT FIELD */}
  <input
    type="number"
    value={v3}
    onChange={(e) => {
      const val = e.target.value;

      if (val === "" || val === "-") {
        setV3(val);
      } else {
        const numVal = Number(val);
        if (numVal > config.max3) setV3(String(config.max3));
        else setV3(val);
      }
    }}
    onBlur={() => {
      if (v3 === "" || isNaN(Number(v3)) || Number(v3) < config.min3) {
        setV3(String(config.def3 || config.min3));
      }
    }}
    style={{
      width: `${Math.max(v3?.length || 1, 1)}ch`
    }}
    className="bg-transparent outline-none border-none p-0 focus:ring-0 text-left appearance-none"
  />

  {/* SUFFIX % */}
  {(calc?.title === "SWP Calculator" || calc?.title === "EPF Calculator") && (
    <span className="ml-[4px] text-[12px] uppercase">
      %
    </span>
  )}

  {/* SUFFIX YRS */}
  {calc?.title !== "SSY Calculator" &&
   calc?.title !== "RD Calculator" &&
   calc?.title !== "HRA Calculator" &&
   calc?.title !== "Salary Calculator" &&
   calc?.title !== "SWP Calculator" &&
   calc?.title !== "EPF Calculator" && (
    <span className="ml-[4px] text-[12px] uppercase mt-[2px]">
      Yrs
    </span>
  )}

</div>

          )
        )}
      </div>
    </div>

    {config.min3 !== config.max3 && calc?.title !== "PPF Calculator" && calc?.title !== "SCSS Calculator" && (
      <>
        <input
          type="range"
          min={config.min3}
          max={config.max3}
          step={config.step3}
          // Force slider to min position if input is empty
          value={v3 === "" || v3 === "-" ? config.min3 : v3}
          onChange={(e) => setV3(e.target.value)}
          // Update style to show 0% fill when empty
          style={getSliderStyle(v3 === "" || v3 === "-" ? 0 : percentage3, 2)}
          className="relative -top-2 w-full h-2 sm:h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-[10px] font-bold text-slate-300 -mt-1 uppercase">
          <span>{config.min3}</span>
          <span>{config.max3}</span>
        </div>
      </>
    )}
  </div>
)}

              {/* Fourth Input (for SWP, EPF, HRA) */}
              {config.hasFourthSlider && (
  <div>
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
      <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 sm:mb-0">
        {config.label4}
      </label>
      <div className="flex items-left justify-start w-26 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-2 rounded-lg font-black text-sm border border-blue-100 dark:border-blue-800/50">
        <AutoResizeInput
          value={v4}
          onChange={(val) => {
            if (val === '' || val === '-') {
              setV4(val); // Allow empty so user can type
            } else {
              const numVal = Number(val);
              // Clamp only the upper bound during typing
              if (numVal > config.max4) setV4(String(config.max4));
              else setV4(val);
            }
          }}
          onBlur={() => {
            // Reset to default or min if left empty or below range
            if (v4 === '' || isNaN(Number(v4)) || Number(v4) < config.min4) {
              setV4(String(config.def4 || config.min4));
            }
          }}
          prefix={(calc?.title === "HRA Calculator" || calc?.title === "Salary Calculator") ? (isINR ? '₹' : '$') : ''}
          suffix={
            calc?.title === "EPF Calculator" 
              ? "%" 
              : (calc?.title === "HRA Calculator" || calc?.title === "Salary Calculator" 
                ? "" 
                : "Yrs")
          }
          minWidth="40px"
        />
      </div>
    </div>
    
    <input
      type="range"
      min={config.min4}
      max={config.max4}
      step={config.step4}
      // Slider snaps to min visually if field is empty
      value={v4 === '' || v4 === '-' ? config.min4 : v4}
      onChange={(e) => setV4(e.target.value)}
      // Percentage resets to 0 if field is empty
      style={getSliderStyle(v4 === '' || v4 === '-' ? 0 : percentage4, 3)}
      className="relative -top-2 w-full h-2 sm:h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600"
    />
    
    <div className="flex justify-between text-[10px] font-bold text-slate-300 -mt-1 uppercase">
      <span>
        {calc?.title === "HRA Calculator"
          ? config.min4.toLocaleString()
          : calc?.title === "EPF Calculator"
          ? `${config.min4}%`
          : calc?.title === "Salary Calculator"
          ? config.min4.toLocaleString()
          : `${config.min4} Yr`}
      </span>
      <span>
        {calc?.title === "HRA Calculator"
          ? config.max4.toLocaleString()
          : calc?.title === "EPF Calculator"
          ? `${config.max4}%`
          : calc?.title === "Salary Calculator"
          ? config.max4.toLocaleString()
          : `${config.max4} Yrs`}
      </span>
    </div>
  </div>
)}


              {/* Fifth Input (for EPF, Salary Calculator) */}
              {config.hasFifthSlider && (
  <div>
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center -mb-1 mt-2">
      <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 sm:mb-0">
        {config.label5}
      </label>
      <div className="flex items-left justify-start w-26 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-2 rounded-lg font-black text-sm border border-blue-100 dark:border-blue-800/50">
        {calc?.title === "EPF Calculator" ? (
          <span className="text-right">{config.def5}%</span>
        ) : (
          <AutoResizeInput
            value={v5}
            onChange={(val) => {
              if (val === '' || val === '-') {
                setV5(val); // Allow empty for typing
              } else {
                const numVal = Number(val);
                // Clamp only the upper bound while typing
                if (numVal > config.max5) setV5(String(config.max5));
                else setV5(val);
              }
            }}
            onBlur={() => {
              // Safety reset to default or min on exit
              if (v5 === '' || isNaN(Number(v5)) || Number(v5) < config.min5) {
                setV5(String(config.def5 || config.min5));
              }
            }}
            prefix={isINR ? '₹' : '$'}
             minWidth="40px"
          />
        )}
      </div>
    </div>
    
    {config.min5 !== config.max5 && calc?.title !== "EPF Calculator" && (
      <>
        <input
          type="range"
          min={config.min5}
          max={config.max5}
          step={config.step5}
          // Visual reset: Slider snaps to min if field is empty
          value={v5 === '' || v5 === '-' ? config.min5 : v5}
          onChange={(e) => setV5(e.target.value)}
          // Background fill resets to 0% if field is empty
          style={getSliderStyle(v5 === '' || v5 === '-' ? 0 : percentage5, 4)}
          className="relative top-0 w-full h-2 sm:h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-[10px] font-bold text-slate-300 mt-0 uppercase">
          <span>{config.min5.toLocaleString()}</span>
          <span>{config.max5.toLocaleString()}</span>
        </div>
      </>
    )}
  </div>
)}
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-6 border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center shadow-sm ">
              <p className={`text-[10px] font-sans  font-extrabold uppercase  tracking-[0.2em] text-black ${calc?.title === "ROI Calculator" ? (totalValue < 0 ? 'text-red-500' : 'text-green-500') : 'text-slate-400'} mb-1`}>
                {calc?.title === "ROI Calculator" ? (totalValue < 0 ? "LOSS" : "PROFIT") : dynamicConfig.totalValueLabel}
              </p>
              <h2 className="text-xl sm:text-4xl md:text-5xl font-black mb-1 break-all">
                {calc?.title === "ROI Calculator" && totalValue < 0 ? formatCurrency(Math.abs(totalValue)) : formatCurrency(totalValue)}
              </h2>
             

              {/* Donut Chart */}
              <div className="relative w-40 h-46 sm:w-40 sm:h-46 mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 192 192">
                  <circle cx="96" cy="96" r="76" fill="transparent" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="36" />
                  <circle
                    cx="96" cy="96" r="76" fill="transparent" stroke="#3b82f6" strokeWidth="36"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-1500 ease-in-out"
                  />
                </svg>
                {(calc?.title === "Loan Amortization" || calc?.title === "Auto Loan" || calc?.title === "Mortgage Payment") && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
{dynamicConfig.gainLabel || "RETURN" }
                    </p>
                    <p className="text-lg sm:text-xl font-black">{Math.abs(returnPercentage).toFixed(1)}%</p>
                  </div>
                )}
              </div>

              {/* Currency Toggle - Hidden for EPF Calculator */}
              {/* INR/USD Toggle button commented out as per requirement
              {calc?.title !== "EPF Calculator" && (
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      const conversionRate = 83;
                      if (!isINR) {
                        // Converting from USD to INR - multiply values
                        setV1(String(Math.round(Number(v1) * conversionRate)));
                        setV2(String(Math.round(Number(v2) * conversionRate)));
                        setV3(String(Math.round(Number(v3) * conversionRate)));
                        setV4(String(Math.round(Number(v4) * conversionRate)));
                        setV5(String(Math.round(Number(v5) * conversionRate)));
                      } else {
                        // Converting from INR to USD - divide values
                        setV1(String(Math.round(Number(v1) / conversionRate)));
                        setV2(String(Math.round(Number(v2) / conversionRate)));
                        setV3(String(Math.round(Number(v3) / conversionRate)));
                        setV4(String(Math.round(Number(v4) / conversionRate)));
                        setV5(String(Math.round(Number(v5) / conversionRate)));
                      }
                      setIsINR(!isINR);
                    }}
                    className="px-2 py-2 rounded-full text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer -mt-4 ml-90"
                  >
                    {isINR ? 'USD ($)' : 'INR (₹)'}
                  </button>
                </div>
              )}
              */}
              <div className="w-full space-y-1">
                
                
                {/* Conditional rendering based on calculator type */}
                {calc?.title === "Stock Average Calculator" ? (
                  <>
                    <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs font-bold text-slate-500">Average Price</span>
                      </div>
                      <span className="text-sm font-black text-blue-600 ">{formatCurrency(results.averagePrice)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs font-bold text-slate-500">Total Shares</span>
                      </div>
                      <span className="text-sm font-black text-green-600">{results.totalShares}</span>
                    </div>
                  </>
                ) : calc?.title === "NPS Calculator" ? (
                  <>
                    <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                        <span className="text-xs font-bold text-slate-500">Interest Earned</span>
                      </div>
                      <span className="text-sm font-black">{formatCurrency(estReturns)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs font-bold text-slate-500">Total Investment</span>
                      </div>
                      <span className="text-sm font-black text-blue-600">{formatCurrency(totalInvested)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs font-bold text-slate-500">Min. Annuity Investment</span>
                      </div>
                      <span className="text-sm font-black text-blue-600">{formatCurrency(results.minAnnuityInvestment)}</span>
                    </div>
                  </>
                ) : calc?.title === "SCSS Calculator" ? (
                  <>
                    <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs font-bold text-slate-500">Total Interest</span>
                      </div>
                      <span className="text-sm font-black text-blue-600">{formatCurrency(estReturns)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs font-bold text-slate-500">Quarterly Receivable Interest</span>
                      </div>
                      <span className="text-sm font-black text-blue-600">{formatCurrency(results.quarterlyInterest)}</span>
                    </div>
                  </>
                ) : calc?.title === "ROI Calculator" ? (
                  <>
                    <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs font-bold text-slate-500">Final Amount</span>
                      </div>
                      <span className="text-sm font-black text-blue-600">{formatCurrency(finalAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs font-bold text-slate-500">Annualized ROI</span>
                      </div>
                      <span className="text-sm font-black text-green-600">{results.annualizedROI}%</span>
                    </div>
                  </>
                ) : calc?.title === "SSY Calculator" ? (
                  <>
                    <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                        <span className="text-xs font-bold text-slate-500">Total Investment</span>
                      </div>
                      <span className="text-sm font-black">{formatCurrency(totalInvested)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs font-bold text-slate-500">Total Interest</span>
                      </div>
                      <span className="text-sm font-black text-blue-600">{formatCurrency(estReturns)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs font-bold text-slate-500">Maturity Year</span>
                      </div>
                      <span className="text-sm font-black text-green-600">{results.maturityYear}</span>
                    </div>
                  </>
                ) : calc?.title === "Gratuity Calculator" ? (
                  <>
                    <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                        <span className="text-xs font-bold text-slate-500">{dynamicConfig.investedLabel}</span>
                      </div>
                      <span className="text-sm font-black">{formatCurrency(totalInvested)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs font-bold text-slate-500">{dynamicConfig.profitLabel}</span>
                      </div>
                      <span className="text-sm font-black text-blue-600">{years} YRS</span>
                    </div>
                  </>
                ) : calc?.title === "EPF Calculator" ? (
                    <>
                      <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-slate-300" />
                          <span className="text-xs font-bold text-slate-500">Monthly Salary</span>
                        </div>
                        <span className="text-sm font-black">{formatCurrency(results.monthlySalary)}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <span className="text-xs font-bold text-slate-500">Annual Increase</span>
                        </div>
                        <span className="text-sm font-black text-blue-600">{results.annualIncreasePercent}%</span>
                      </div>
                    </>
                  ) : calc?.title === "Salary Calculator" ? (
                  <>
                    <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs font-bold text-slate-500">Take Home Annual Salary</span>
                      </div>
                      <span className="text-sm font-black text-blue-600">{formatCurrency(results.takeHomeAnnual)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-xs font-bold text-slate-500">Total Monthly Deductions</span>
                      </div>
                      <span className="text-sm font-black text-amber-500">{formatCurrency(results.totalMonthlyDeductions)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4  bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs font-bold text-slate-500">Total Annual Deductions</span>
                      </div>
                        <span className="text-sm font-black text-blue-600">{formatCurrency(results.totalAnnualDeductions)}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs font-bold text-slate-500">{dynamicConfig.profitLabel}</span>
                      </div>
                      <span className="text-sm font-black text-blue-600">
                        {formatCurrency(
                          calc?.title === "Mutual Funds Returns" ? totalInvested :
                          calc?.title === "SIP Calculator" ? estReturns :
                          calc?.title === "RD Calculator" ? estReturns :
                          calc?.title === "Compound Interest" ? estReturns :
                          calc?.title === "FD Calculator" ? totalInvested :
                          calc?.title === "Lumpsum Calculator" ? totalInvested :
                          calc?.title === "Inflation Calculator" ? totalInvested :
                          calc?.title === "Post Office MIS Calculator" ? totalInvested :
                          calc?.title === "PPF Calculator" ? estReturns :
                          calc?.title === "Simple Interest" ? totalInvested :
                          calc?.title === "SWP Calculator" ? totalInvested :
                          calc?.title === "Retirement Planner" ? estReturns :
                          estReturns
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 pt-3 pb-3 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                        <span className="text-xs font-bold text-slate-500">{dynamicConfig.investedLabel}</span>
                      </div>
                      <span className="text-sm font-black">
                        {calc?.title === "NSC Calculator" ? formatCurrency(totalInvested) :
                        calc?.title === "Post Office MIS Calculator" ? `${returnPercentage}%` : 
                        calc?.title === "RD Calculator" ? formatCurrency(totalInvested) : 
                        calc?.title === "PPF Calculator" ? formatCurrency(totalInvested) : formatCurrency(

                          calc?.title === "Simple Interest" ? estReturns :
                          calc?.title === "Compound Interest" ? totalInvested :
                          calc?.title === "SIP Calculator" ? totalInvested :
                          calc?.title === "Lumpsum Calculator" ? estReturns :
                          calc?.title === "Auto Loan" || calc?.title === "Mortgage Payment" || calc?.title === "Loan Amortization" ? finalAmount :
                          calc?.title === "SWP Calculator" ? results.finalValue :
                          calc?.title === "Inflation Calculator" ? estReturns :
                          calc?.title === "GST Calculator" ? totalInvested :
                          estReturns
                        )}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 -mt-[25px] items-stretch">
  {/* Left Column: Calculation + Best Use Cases */}
  {/* Added 'flex flex-col' and 'h-full' to ensure children can fill the space */}
  <div className="flex flex-col space-y-6 md:space-y-8 h-full">
    
    {/* Calculation Formula Box */}
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-8 border border-slate-100 dark:border-slate-800 text-left lg:-mr-[105px] mt-[6px]">
      <h3 className="font-bold mb-4 flex items-center gap-3">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <BookOpen size={18} className="text-blue-600" />
        </div>
        Calculation Formula
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
        {dynamicConfig.formulaText}
      </p>
      <div className="bg-slate-50 dark:bg-slate-950 p-3 sm:p-3 rounded-2xl border border-slate-100 dark:border-slate-800 text-left overflow-x-auto max-w-full">
        <span className="text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm whitespace-nowrap inline-block min-w-max">
          {dynamicConfig.formulaLatex}
        </span>
      </div>
      <p className="text-slate-400 text-[11px] mt-4 leading-relaxed">
        {dynamicConfig.formulaVars}
      </p>
    </div>

    {/* Best Use Cases Box - 'flex-grow' makes this box expand to match Definitions */}
    <div className="flex-grow bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-8 border border-slate-100 dark:border-slate-800 text-left lg:-mr-[105px]">
      <h3 className="font-bold mb-6 flex items-center gap-3">
        <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
          <Zap size={18} className="text-emerald-600" />
        </div>
        Best Use Cases
      </h3>
      <div className="space-y-4 text-left">
        {dynamicConfig.useCases &&
          dynamicConfig.useCases.map((text: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3">
              <CircleCheck size={18} className="text-emerald-500 mt-0.5 shrink-0" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {text}
              </span>
            </div>
          ))}
      </div>
    </div>
  </div>

  {/* Right Column: Definitions */}
  <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-10 border border-slate-100 dark:border-slate-800 text-left lg:ml-[105px] mt-[6px]">
    <h3 className="font-bold mb-8 flex items-center gap-3">
      <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
        <FileText size={18} className="text-indigo-600" />
      </div>
      Definitions
    </h3>
    <div className="space-y-8 text-left">
      {config.definitions &&
        config.definitions.map((term: { title: string; desc: string }, i: number) => (
          <div key={i}>
            <p className="font-bold text-blue-600 dark:text-blue-400 text-sm mb-2 uppercase tracking-wide text-left">
              {term.title}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {term.desc}
            </p>
            <hr className="my-5 -mx-3 border-t border-slate-200 dark:border-slate-700 mt-3" />
          </div>
        ))}
    </div>
  </div>
</div>
      </div>
    </div>
  );

};

export default CalculatorDetail;