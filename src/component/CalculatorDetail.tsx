import Navbar from './Navbar';
import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Info, BookOpen,
  FileText, Zap, CircleCheck
} from 'lucide-react';

interface Props {
  calc?: any;
  onBack: () => void;
  showNavbar?: boolean;
}

const CALC_CONFIGS: Record<string, any> = {
  "SIP Calculator": {
    label1: "Monthly Investment", min1: 100, max1: 100000, step1: 100, def1: 100,
    label2: "Expected return(p.a.)", min2: 1, max2: 20, step2: 0.1, def2: 1,
    label3: "Time period", min3: 1, max3: 40, step3: 1, def3: 1,
    hasThirdSlider: true,
    isV2Currency: false,
  calculate: (_monthly: number, _rate: number, _years: number) => {
  const monthly = Number(_monthly);        // SIP amount
  const annualRate = Number(_rate);        // % p.a.
  const years = Number(_years);

  const months = years * 12;
  const monthlyRate = annualRate / 100 / 12;

  // 1ï¸âƒ£ Invested Amount
  const investedAmount = monthly * months;

  // 2ï¸âƒ£ Total Value (Standard SIP Formula)
  const totalValue =
    monthly *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
    (1 + monthlyRate);

  // 3ï¸âƒ£ Estimated Returns
  const estimatedReturns = totalValue - investedAmount;

  return {
    totalInvested: Math.round(investedAmount),
    estReturns: Math.round(estimatedReturns),
    totalValue: Math.round(totalValue),
    years: Math.trunc(years),
    returnPercentage: +((estimatedReturns / investedAmount) * 100).toFixed(2),
    ratio: +((estimatedReturns / investedAmount) * 100).toFixed(2)
  };
},
    totalValueLabel: "Invested Amount",
    gainLabel: "TOTAL RETURN %",
    investedLabel: "Est. returns",
    profitLabel: "Total value",
    formulaText: "This SIP calculator uses the future value of an annuity formula:",
    formulaLatex: "FV = P Ã— [((1 + r)^n - 1) / r]",
    formulaVars: "FV = Future value, P = Monthly investment, r = Monthly interest rate, n = Number of months",
    useCases: [
      "Planning long-term savings through regular investments.",
      "Understanding the power of compounding with monthly contributions.",
      "Estimating future value of systematic investment plans."
    ],
    definitions: [
      { title: "Monthly Investment", desc: "The amount invested every month." },
      { title: "Expected return(p.a.)", desc: "The anticipated annual growth rate of the investment." },
      { title: "Time period", desc: "The duration over which investments are made." }
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
    formulaLatex: "M = P [ i(1 + i)^n ] / [ (1 + i)^n â€“ 1 ]",
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
    label3: "Loan Term", min3: 1, max3: 30, step3: 1, def3: 30,
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
    formulaLatex: "M = P [ i(1 + i)^n ] / [ (1 + i)^n â€“ 1 ]",
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
    label1: "Principal Amount", min1: 100, max1: 10000, step1: 100, def1: 100,
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
    totalValue: Math.round(totalValue),
    years: n,
    returnPercentage: +(interest / P * 100).toFixed(2),
    totalInvested: P,
    estReturns: Math.round(interest),
    ratio: +(interest / P * 100).toFixed(2)
  };
},

    totalValueLabel: "TOTAL INTEREST",
    gainLabel: "INTEREST %",
    investedLabel: "Initial Principal",
    profitLabel: "Principal Amount",
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
      { title: "Future Value", desc: "The total value of your investment at the end of the specified term." }
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
    formulaLatex: "FV = P Ã— [((1 + r)^n - 1) / r] Ã— (1 + r)",
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
    hasThirdSlider: false,
    isV2Currency: true,
    calculate: (invested: number, returned: number) => {
      const netProfit = returned - invested;
      const roi = (netProfit / invested) * 100;
      return {
        totalValue: netProfit,
        years: 1,
        returnPercentage: roi,
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
    totalValue: mode === 'exclusive' ? totalPrice : originalPrice,
    totalInvested: originalPrice,
    estReturns: gstAmount,
    returnPercentage: rate,
    years: 1,
    ratio: rate
  };
},

    totalValueLabel: "TOTAL PRICE(Including GST)",
    gainLabel: "GST RATE %",
    investedLabel: "Price Excluding GST",
    profitLabel: "GST Amount",
    formulaText: "This GST calculator calculates the Goods and Services Tax:",
    formulaLatex: "GST Amount = Price Ã— (GST Rate / 100), Total Price = Price + GST Amount",
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
        totalValue: totalAmount,
        years: time,
        returnPercentage: (interest / principal) * 100,
        totalInvested: Math.round(principal),
        estReturns: interest,
        ratio: (interest / principal) * 100
      };
    },
    totalValueLabel: "TOTAL AMOUNT",
    gainLabel: "INTEREST %",
    investedLabel: "Total Interest",
    profitLabel: "Principal Amount",
    formulaText: "This simple interest calculator uses the basic interest formula:",
    formulaLatex: "SI = P Ã— R Ã— T / 100, Total Amount = P + SI",
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
    label1: "Loan Amount", min1: 5000, max1: 150000, step1: 500, def1: 5000,
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
    formulaLatex: "M = P [ i(1 + i)^n ] / [ (1 + i)^n â€“ 1 ]",
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
    formulaLatex: "SI = P Ã— R Ã— T / 100, Total Value = P + SI",
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
    formulaLatex: "FV = P Ã— (1 + r)^t",
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
    formulaLatex: "FC = CC Ã— (1 + r)^t, CI = FC - CC",
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

    totalValueLabel: "TOTAL INVESTMENT",
    gainLabel: "RETURN %",
    investedLabel: "Total Investment",
    profitLabel: "Interest Earned",
    formulaText: "This NPS calculator uses the future value of an annuity formula:",
    formulaLatex: "FV = P Ã— [((1 + r)^n - 1) / r]",
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
  const months =
    timeUnit === "Years" ? timePeriod * 12 : timePeriod;

  const P = Number(monthly);
  const r = Number(rate) / 100;
  const n = 4; // quarterly compounding

  let maturity = 0;

  for (let m = 0; m < months; m++) {
    const exponent = (n * (months - m)) / 12;
    maturity += P * Math.pow(1 + r / n, exponent);
  }

  const totalInvested = P * months;
  const estReturns = maturity - totalInvested;

  return {
    totalValue: Math.floor(maturity),
    totalInvested,
    estReturns: Math.floor(estReturns),
    returnPercentage:
      totalInvested > 0 ? (estReturns / totalInvested) * 100 : 0,
    ratio:
      totalInvested > 0 ? (estReturns / totalInvested) * 100 : 0
  };
},
    totalValueLabel: "Total Value",
    gainLabel: "RETURN %",
    investedLabel: "Invested Amount",
    profitLabel: "Est. Returns",
    formulaText: "This RD calculator uses the future value of an annuity formula with monthly compounding:",
    formulaLatex: "FV = P Ã— [((1 + r/12)^n - 1) / (r/12)] Ã— (1 + r/12)",
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
    label2: "Girl's Age", min2: 1, max2: 10, step2: 1, def2: 1,
    label3: "Start Year", min3: 2021, max3: 2030, step3: 1, def3: 2021,

    hasThirdSlider: true,
    isV2Currency: false,
    calculate: (yearly:number, age:number, startYear:number) => {
  const rate = 0.085201075;   // 8.5201%

  const maturityYears = 21 - age;
  const depositYears = Math.max(0, 15 - age);

  let balance = 0;
  let totalInvested = 0;

  for (let year = 1; year <= maturityYears; year++) {
    if (year <= depositYears) {
      balance += yearly;
      totalInvested += yearly;
    }

    balance *= (1 + rate);
  }

  const maturityValue = Math.round(balance);
  const totalInterest = maturityValue - totalInvested;

  return {
    totalValue: maturityValue,
    totalInvested,
    estReturns: totalInterest,
    maturityValue,
    maturityYear: startYear + maturityYears,
    returnPercentage: +((totalInterest / totalInvested) * 100).toFixed(2),
    ratio: (depositYears / 15) * 100  // Use deposit years as ratio for dynamic chart
  };
},
    totalValueLabel: "MATURITY VALUE",
    gainLabel: "RETURN %",
    investedLabel: "Total Investment",
    profitLabel: "Total Interest",
    formulaText: "This SSY calculator uses the future value of an annuity formula with annual compounding:",
    formulaLatex: "FV = P Ã— [((1 + r)^n - 1) / r] Ã— (1 + r)^m",
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
    label2: "Withdraw per month", min2: 500, max2: 50000, step2: 500, def2: 1000,
    label3: "Expected return rate", min3: 0, max3: 30, step3: 0.5, def3: 5,
    label4: "Time period", min4: 5, max4: 30, step4: 1, def4: 10,
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

  const totalWithdrawal = withdrawPerMonth * totalMonths;

  const growthFactor = Math.pow(1 + monthlyRate, totalMonths);

  const finalValue =
  totalInvestment * growthFactor -
  withdrawPerMonth * ((growthFactor - 1) / monthlyRate);


  const estReturns =
    totalWithdrawal + finalValue - totalInvestment;

  return {
    totalValue: Math.round(totalWithdrawal),
    totalInvested: totalInvestment,
    finalValue: Math.max(0, Math.round(finalValue)),
    estReturns: Math.round(estReturns),
    returnPercentage:
      ((estReturns / totalInvestment) * 100).toFixed(2),
    years: timePeriodYears,
    ratio: (totalWithdrawal / totalInvestment).toFixed(2),
  };
},
    totalValueLabel: "TOTAL WITHDRAWAL",
    investedLabel: "Final value",
    profitLabel: "Total Investment",
    formulaText: "This SWP calculator simulates monthly withdrawals from an investment with compound interest over a specified time period.",
    formulaLatex: "Balance = (Balance Ã— (1 + r)) - W",
    formulaVars: "Balance = Current balance, r = Monthly interest rate, W = Monthly withdrawal, Time period = Specified years",
    useCases: [
      "Planning retirement income through systematic withdrawals.",
      "Estimating withdrawal amounts over a specific time period.",
      "Understanding the impact of withdrawal amounts and time horizons on investment longevity."
    ],
    definitions: [
      { title: "Total Investment", desc: "The initial lump sum amount invested." },
      { title: "Withdraw per month", desc: "The fixed amount withdrawn every month." },
      { title: "Expected return rate", desc: "The anticipated annual growth rate of the investment." },
      { title: "Time period", desc: "The number of years over which withdrawals will be made." },
      { title: "Total Withdrawal", desc: "The total amount withdrawn over the specified period." },
      { title: "Final Value", desc: "The remaining balance after the specified time period." }
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

  const maturityValue =
    yearlyInvestment * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));

  const totalInvested = yearlyInvestment * n;
  const estReturns = maturityValue - totalInvested;

  return {
    totalValue: totalInvested,       
    totalInvested,                    
    estReturns: Math.round(estReturns),
    maturityValue: Math.round(maturityValue),
    returnPercentage: +((estReturns / totalInvested) * 100).toFixed(2),
    ratio: (estReturns / totalInvested) * 100
  };
},

    totalValueLabel: "Invested Amount",
    gainLabel: "RETURN %",
    investedLabel: "Total Interest",
    profitLabel: "Maturity Value",
    formulaText: "This PPF calculator uses the future value of an annuity formula with annual compounding at 7.1% interest rate:",
    formulaLatex: "FV = P Ã— [((1 + r)^n - 1) / r] Ã— (1 + r)",
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
    formulaLatex: "FV = P Ã— (1 + r)^t",
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
    calculate: (yearlyInvestment: number, tenure: number, rate: number) => {
  const P = Number(yearlyInvestment);
  const years = Number(tenure); 
  const annualRate = Number(rate) / 100;

  const quarters = years * 4;

  // Quarterly interest (simple interest)
  const quarterlyInterest = (P * annualRate) / 4;

  // Total interest over entire tenure
  const totalInterest = quarterlyInterest * quarters;

  // Maturity value = Principal + total interest
  const maturityValue = P + totalInterest;

  return {
    totalValue: Math.round(quarterlyInterest), // quarterly payout
    years: years,
    returnPercentage: +((totalInterest / P) * 100).toFixed(2),
    totalInvested: Math.round(P),
    estReturns: Math.round(totalInterest),
    maturityValue: Math.round(maturityValue),
    ratio: +((totalInterest / P) * 100).toFixed(2)
  };
},

    totalValueLabel: "QUARTERLY RECEIVABLE INTEREST",
    gainLabel: "RETURN %",
    investedLabel: "Total Interest",
    profitLabel: "Maturity Value",
    formulaText: "This SCSS calculator uses compound interest with quarterly compounding for yearly investments over a fixed tenure.",
    formulaLatex: "FV = âˆ‘ P Ã— (1 + r/4)^{quarters remaining}",
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
      { title: "Maturity Value", desc: "The total value at the end of the tenure including principal and interest." }
    ]
  },
  "Post Office MIS Calculator": {
    label1: "Invested Amount", min1: 1000, max1: 450000, step1: 1000, def1: 10000,
    label2: "Interest Rate", min2: 1, max2: 12, step2: 0.1, def2: 6.6,
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
        ratio: (estReturns / P) * 100
      };
    },
    totalValueLabel: "MONTHLY Income",
    gainLabel: "INTEREST RATE %",
    investedLabel: "Total Investment",
    profitLabel: "Invested Amount",
    formulaText: "This Post Office MIS calculator calculates monthly income based on invested amount and interest rate:",
    formulaLatex: "Monthly Income = (Principal Ã— Rate) Ã· 12",
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
    label1: "Monthly Salary (Basic+DA)", min1: 10000, max1: 200000, step1: 1000, def1: 30000,
    label2: "Years of Service", min2: 1, max2: 30, step2: 1, def2: 5,
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
    formulaLatex: "Gratuity = (Monthly Salary Ã— 15 Ã— Years of Service) Ã· 26",
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
  "Income Tax Calculator": {
    calculate: (grossSalary: number, otherSources: number, interestIncome: number, rentalIncome: number, homeLoanInterestSelf: number, homeLoanInterestLetOut: number, deduction80C: number, deduction80CCD1B: number, deduction80D: number, deduction80G: number, deduction80E: number, deduction80TTA: number, basicSalary: number, da: number, hraReceived: number, rentPaid: number, isMetro: number, ageCategory: number) => {
      // Calculate total income
      const totalIncome = grossSalary + otherSources + interestIncome + rentalIncome;

      // Calculate deductions
      const totalDeductions = deduction80C + deduction80CCD1B + deduction80D + deduction80G + deduction80E + deduction80TTA;

      // Calculate HRA exemption
      const hraExemption = Math.min(hraReceived, rentPaid - (basicSalary + da) * 0.1, (basicSalary + da) * (isMetro ? 0.5 : 0.4));

      // Calculate taxable income (after standard deduction of â‚¹50,000)
      const taxableIncome = Math.max(0, totalIncome - totalDeductions - hraExemption - 50000);

      // Helper function to calculate tax
      const calculateTax = (income: number, slabs: number[][]) => {
        let tax = 0;
        for (const [limit, rate] of slabs) {
          if (income > limit) {
            tax += (income - limit) * rate;
            break;
          }
        }
        return tax;
      };

      // New regime slabs (2023 onwards)
      const newRegimeSlabs = [
        [300000, 0],
        [700000, 0.05],
        [1000000, 0.1],
        [1200000, 0.15],
        [1500000, 0.2],
        [Infinity, 0.3]
      ];

      // Old regime slabs
      const oldRegimeSlabs = [
        [250000, 0],
        [500000, 0.05],
        [1000000, 0.2],
        [Infinity, 0.3]
      ];

      const newRegimeTax = calculateTax(taxableIncome, newRegimeSlabs) + calculateTax(taxableIncome, newRegimeSlabs) * 0.04; // 4% cess
      const oldRegimeTax = calculateTax(taxableIncome, oldRegimeSlabs) + calculateTax(taxableIncome, oldRegimeSlabs) * 0.04; // 4% cess

      return {
        totalValue: Math.round(newRegimeTax),
        totalInvested: Math.round(oldRegimeTax),
        estReturns: Math.round(taxableIncome),
        returnPercentage: 0,
        years: 0,
        ratio: 0
      };
    },
    totalValueLabel: "TOTAL TAX (NEW REGIME)",
    gainLabel: "",
    investedLabel: "Total Tax (Old Regime)",
    profitLabel: "Taxable Income",
    formulaText: "This calculator computes income tax under new and old regimes based on Indian tax laws.",
    formulaLatex: "",
    formulaVars: "",
    useCases: [
      "Calculate tax liability for salaried individuals.",
      "Compare tax under new and old regimes.",
      "Plan deductions and exemptions."
    ],
    definitions: [
      { title: "New Tax Regime", desc: "Simplified tax slabs with lower rates but fewer deductions." },
      { title: "Old Tax Regime", desc: "Traditional tax slabs with more deductions available." },
      { title: "Taxable Income", desc: "Income after deductions and exemptions." }
    ]
  },
};

const CalculatorDetail: React.FC<Props> = ({ calc, onBack, showNavbar = true }) => {
  const calculatorTitle = calc?.title || "";
  const config = CALC_CONFIGS[calculatorTitle] || CALC_CONFIGS["SIP Calculator"];

  const [v1, setV1] = useState<string>(String(config.min1));
  const [v2, setV2] = useState<string>(String(config.min2));
  const [v3, setV3] = useState<string>(String(config.min3 || 0));
  const [v4, setV4] = useState<string>(String(config.min4 || 0));
  const [isINR, setIsINR] = useState(false);
  const [timeUnit, setTimeUnit] = useState(config.timeUnit || 'Years');
  const [gstMode, setGstMode] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculation
  const val1 = Number(v1) || (config.def1 || config.min1);
  const val2 = Number(v2) || (config.def2 || config.min2);
  const val3 = Number(v3) || (config.def3 || config.min3 || 0);
  const val4 = Number(v4) || (config.def4 || config.min4 || 0);

  let results: any = {};
  if (config.hasFourthSlider) {
    results = config.calculate(val1, val2, val3, val4);
  } else if (config.hasThirdSlider) {
    if (calc?.title === "RD Calculator") {
      results = config.calculate(val1, val2, val3, timeUnit);
    } else {
      results = config.calculate(val1, val2, val3);
    }
  } else if (calc?.title === "GST Calculator") {
    results = config.calculate(val1, val2, gstMode);
  } else if (config.isV2Currency) {
    results = config.calculate(val1, val2);
  } else {
    results = config.calculate(val1, val2);
  }

  const { totalInvested = 0, estReturns = 0, totalValue = 0, years = 0, returnPercentage = 0, ratio = 0, finalAmount = 0, maturityValue = 0 } = results;

  // Trigger animation when ratio changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
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
      investedLabel: "Price Excluding GST",
      profitLabel: "GST Amount",
      formulaText: gstMode === 'exclusive'
        ? "This GST calculator calculates the Goods and Services Tax:"
        : "This GST calculator calculates the Goods and Services Tax for inclusive pricing:",
      formulaLatex: gstMode === 'exclusive'
        ? "GST Amount = Price Ã— (GST Rate / 100), Total Price = Price + GST Amount"
        : "Original Price = Total Price / (1 + GST Rate / 100), GST Amount = Total Price - Original Price",
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-10 gap-4 mt-6">
          <div className="flex items-center gap-3 sm:gap-6">
            <button 
              onClick={onBack} 
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 hover:border-blue-500 cursor-pointer flex items-center justify-center transition-all"
            >
              <ArrowLeft size={18} className="text-slate-600 dark:text-slate-400" />
            </button>
            <div className="flex flex-col items-start text-left">
              <div className="text-blue-600 dark:text-blue-400 text-[10px] sm:text-[14px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-1">
                {calc?.category || "INVESTMENT"}
              </div>
              <h1 className="text-xl sm:text-2xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                {calc?.title || "Calculator"}
              </h1>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 mb-12 -py-1">
          
          {/* Inputs Section */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-6 md:p-6 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="text-slate-400 text-[10px] mb-4 font-bold uppercase tracking-widest text-left">
              <Info size={14} className="inline mr-2" /> Adjust sliders or type values
            </div>

            <div className="space-y-1 sm:space-y-1">
              {/* First Input */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 -mt-1">
                  <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 sm:mb-0">{config.label1}</label>
                  <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-2 rounded-lg font-black text-sm border border-blue-100 dark:border-blue-800/50">
                    {!config.isV2Currency && <span className="mr-1">$</span>}
                    <input
                      type="number"
                      min={config.min1}
                      max={config.max1}
                      value={v1}
                      onChange={(e) => setV1(e.target.value)}
                      onBlur={(e) => {
                        const val = Number(e.target.value);
                        if (val < config.min1) setV1(String(config.min1));
                        else if (val > config.max1) setV1(String(config.max1));
                        else setV1(e.target.value);
                      }}
                      className="bg-transparent w-16 outline-none border-none p-0 focus:ring-0"
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
                      value={v1}
                      onChange={(e) => setV1(e.target.value)}
                      className="w-full h-2 sm:h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-slate-300 mt-2 uppercase">
                      <span>{config.min1.toLocaleString()}</span>
                      <span>{config.max1.toLocaleString()}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Second Input */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                  <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 sm:mb-0">{config.label2}</label>
                  <div className="flex items-center bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-3 py-2 rounded-lg font-black text-sm border border-emerald-100 dark:border-emerald-800/50">
                    {config.isV2Currency && <span className="mr-1">$</span>}
                    <input
                      type="number"
                      min={config.min2}
                      max={config.max2}
                      value={v2}
                      onChange={(e) => setV2(e.target.value)}
                      onBlur={(e) => {
                        const val = Number(e.target.value);
                        if (val < config.min2) setV2(String(config.min2));
                        else if (val > config.max2) setV2(String(config.max2));
                        else setV2(e.target.value);
                      }}
                      className="bg-transparent w-12 outline-none border-none p-0 focus:ring-0 text-right"
                    />
                    {!config.isV2Currency && <span className="ml-1">{calc?.title === "SSY Calculator" ? "yr" : calc?.title === "Gratuity Calculator" ? "YRS" : "%"}</span>}
                  </div>
                </div>
                {config.min2 !== config.max2 && (
                  <>
                    <input
                      type="range"
                      min={config.min2}
                      max={config.max2}
                      step={config.step2}
                      value={v2}
                      onChange={(e) => setV2(e.target.value)}
                      className="w-full h-2 sm:h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-slate-300 mt-2 uppercase">
                      <span>{config.min2.toLocaleString()}{!config.isV2Currency && (calc?.title === "Gratuity Calculator" ? "YRS" : "%")}</span>
                      <span>{config.max2.toLocaleString()}{!config.isV2Currency && (calc?.title === "Gratuity Calculator" ? "YRS" : "%")}</span>
                    </div>
                  </>
                )}
              </div>

              {/* GST Mode Radio Buttons */}
              {calc?.title === "GST Calculator" && (
                <div className="mt-4">
                  <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 block">GST Mode</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gstMode"
                        value="exclusive"
                        checked={gstMode === 'exclusive'}
                        onChange={(e) => setGstMode(e.target.value as 'exclusive' | 'inclusive')}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Exclusive</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="gstMode"
                        value="inclusive"
                        checked={gstMode === 'inclusive'}
                        onChange={(e) => setGstMode(e.target.value as 'exclusive' | 'inclusive')}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Inclusive</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Third Input */}
              {config.hasThirdSlider && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 sm:mb-0">{config.label3}</label>
                    <div className="flex items-center gap-2">
                      {calc?.title === "RD Calculator" && (
                        <select
                          value={timeUnit}
                          onChange={(e) => setTimeUnit(e.target.value)}
                          className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded text-xs font-bold border border-purple-100 dark:border-purple-800/50"
                        >
                          <option value="Years">Years</option>
                          <option value="Months">Months</option>
                        </select>
                      )}
                      {calc?.title === "PPF Calculator" ? (
                        <div className="flex items-center bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-3 py-2 rounded-lg font-black text-sm border border-indigo-100 dark:border-indigo-800/50">
                          <span className="text-right">7.1%</span>
                        </div>
                      ) : (
                        <div className="flex items-center bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-3 py-2 rounded-lg font-black text-sm border border-indigo-100 dark:border-indigo-800/50">
                          <input
                            type="number"
                            min={config.min3}
                            max={config.max3}
                            value={v3}
                            onChange={(e) => setV3(e.target.value)}
                            onBlur={(e) => {
                              const val = Number(e.target.value);
                              if (val < config.min3) setV3(String(config.min3));
                              else if (val > config.max3) setV3(String(config.max3));
                              else setV3(e.target.value);
                            }}
                            className="bg-transparent w-12 outline-none border-none p-0 focus:ring-0 text-right"
                          />
                          {calc?.title === "SWP Calculator" ? <span className="ml-1 text-[12px] uppercase">%</span> : (calc?.title !== "SSY Calculator" && calc?.title !== "RD Calculator" && <span className="ml-1 text-[12px] uppercase">Yrs</span>)}
                        </div>
                      )}
                    </div>
                  </div>
                  {config.min3 !== config.max3 && calc?.title !== "PPF Calculator" && (
                    <>
                      <input
                        type="range"
                        min={config.min3}
                        max={config.max3}
                        step={config.step3}
                        value={v3}
                        onChange={(e) => setV3(e.target.value)}
                        className="w-full h-2 sm:h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-600"
                      />
                      <div className="flex justify-between text-[10px] font-bold text-slate-300 mt-2 uppercase">
                        <span>{config.min3}</span>
                        <span>{config.max3}</span>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Fourth Input (for SWP) */}
              {config.hasFourthSlider && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                    <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 sm:mb-0">{config.label4}</label>
                    <div className="flex items-center bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-3 py-2 rounded-lg font-black text-sm border border-purple-100 dark:border-purple-800/50">
                      <input
                        type="number"
                        min={config.min4}
                        max={config.max4}
                        value={v4}
                        onChange={(e) => setV4(e.target.value)}
                        onBlur={(e) => {
                          const val = Number(e.target.value);
                          if (val < config.min4) setV4(String(config.min4));
                          else if (val > config.max4) setV4(String(config.max4));
                          else setV4(e.target.value);
                        }}
                        className="bg-transparent w-12 outline-none border-none p-0 focus:ring-0 text-right"
                      />
                      <span className="ml-1 text-[12px] uppercase">Yrs</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={config.min4}
                    max={config.max4}
                    step={config.step4}
                    value={v4}
                    onChange={(e) => setV4(e.target.value)}
                    className="w-full h-2 sm:h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-purple-600"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-300 mt-2 uppercase">
                    <span>{config.min4} Yr</span>
                    <span>{config.max4} Yrs</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-6 border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center shadow-sm">
              <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${calc?.title === "ROI Calculator" && totalValue < 0 ? 'text-red-500' : 'text-slate-400'} mb-1`}>
                {calc?.title === "ROI Calculator" ? (totalValue < 0 ? "LOSS" : "PROFIT") : dynamicConfig.totalValueLabel}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-1 break-all">
                {calc?.title === "ROI Calculator" && totalValue < 0 ? formatCurrency(Math.abs(totalValue)) : formatCurrency(totalValue)}
              </h2>
             

              {/* Donut Chart */}
              <div className="relative w-50 h-36 sm:w-50 sm:h-48 mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 192 192">
                  <circle cx="96" cy="96" r="76" fill="transparent" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="36" />
                  <circle
                    cx="96" cy="96" r="76" fill="transparent" stroke="#3b82f6" strokeWidth="36"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className={`transition-all duration-700 ease-in-out ${isAnimating ? 'animate-pulse' : ''}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    {dynamicConfig.gainLabel || "RETURN %"}
                  </p>
                  <p className="text-lg sm:text-xl font-black">{Math.abs(returnPercentage).toFixed(1)}%</p>
                </div>
              </div>

              {/* Currency Toggle */}
              <div className="w-full space-y-1">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsINR(!isINR)}
                    className="px-4 py-2 rounded-full text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer -mt-12"
                  >
                    {isINR ? 'USD ($)' : 'INR (₹)'}
                  </button>
                </div>
                
                {/* Conditional rendering based on calculator type */}
                {calc?.title === "NPS Calculator" ? (
                  <>
                    <div className="flex justify-between items-center p-4 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                        <span className="text-xs font-bold text-slate-500">Interest Earned</span>
                      </div>
                      <span className="text-sm font-black">{formatCurrency(estReturns)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs font-bold text-slate-500">Maturity Amount</span>
                      </div>
                      <span className="text-sm font-black text-blue-600">{formatCurrency(maturityValue)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs font-bold text-slate-500">Min. Annuity Investment</span>
                      </div>
                      <span className="text-sm font-black text-blue-600">{formatCurrency(results.minAnnuityInvestment)}</span>
                    </div>
                  </>
                ) : calc?.title === "SCSS Calculator" ? (
                  <>
                    <div className="flex justify-between items-center p-4 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs font-bold text-slate-500">Total Interest</span>
                      </div>
                      <span className="text-sm font-black text-blue-600">{formatCurrency(estReturns)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs font-bold text-slate-500">Maturity Value</span>
                      </div>
                      <span className="text-sm font-black text-blue-600">{formatCurrency(maturityValue)}</span>
                    </div>
                  </>
                ) : calc?.title === "ROI Calculator" ? (
                  <>
                    <div className="flex justify-between items-center p-4 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs font-bold text-slate-500">Final Amount</span>
                      </div>
                      <span className="text-sm font-black text-blue-600">{formatCurrency(finalAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                        <span className="text-xs font-bold text-slate-500">Amount Invested</span>
                      </div>
                      <span className="text-sm font-black">{formatCurrency(totalInvested)}</span>
                    </div>
                  </>
                ) : calc?.title === "SSY Calculator" ? (
                  <>
                    <div className="flex justify-between items-center p-4 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                        <span className="text-xs font-bold text-slate-500">Total Investment</span>
                      </div>
                      <span className="text-sm font-black">{formatCurrency(totalInvested)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs font-bold text-slate-500">Total Interest</span>
                      </div>
                      <span className="text-sm font-black text-blue-600">{formatCurrency(estReturns)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs font-bold text-slate-500">Maturity Year</span>
                      </div>
                      <span className="text-sm font-black text-green-600">{results.maturityYear}</span>
                    </div>
                  </>
                ) : calc?.title === "Gratuity Calculator" ? (
                  <>
                    <div className="flex justify-between items-center p-4 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                        <span className="text-xs font-bold text-slate-500">{dynamicConfig.investedLabel}</span>
                      </div>
                      <span className="text-sm font-black">{formatCurrency(totalInvested)}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs font-bold text-slate-500">{dynamicConfig.profitLabel}</span>
                      </div>
                      <span className="text-sm font-black text-blue-600">{years} YRS</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center p-4 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                        <span className="text-xs font-bold text-slate-500">{dynamicConfig.investedLabel}</span>
                      </div>
                      <span className="text-sm font-black">
                        {calc?.title === "Post Office MIS Calculator" ? `${returnPercentage}%` : formatCurrency(

                          calc?.title === "Simple Interest" ? estReturns :
                          calc?.title === "Compound Interest" ? totalInvested :
                          calc?.title === "SIP Calculator" || calc?.title === "Lumpsum Calculator" ? estReturns :
                          calc?.title === "Auto Loan" || calc?.title === "Mortgage Payment" || calc?.title === "Loan Amortization" ? finalAmount :
                          calc?.title === "SWP Calculator" ? results.finalValue :
                          calc?.title === "Inflation Calculator" ? estReturns :
                          estReturns
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs font-bold text-slate-500">{dynamicConfig.profitLabel}</span>
                      </div>
                      <span className="text-sm font-black text-blue-600">
                        {formatCurrency(
                          calc?.title === "Mutual Funds Returns" ? totalInvested :
                          calc?.title === "SIP Calculator" || calc?.title === "RD Calculator" ? totalValue :
                          calc?.title === "Compound Interest" ? totalInvested :
                          calc?.title === "FD Calculator" ? totalInvested :
                          calc?.title === "Lumpsum Calculator" ? totalInvested :
                          calc?.title === "Inflation Calculator" ? totalInvested :
                          calc?.title === "Post Office MIS Calculator" ? totalInvested :
                          calc?.title === "PPF Calculator" ? maturityValue :
                          calc?.title === "Simple Interest" ? totalInvested :
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          <div className="space-y-6 md:space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-8 border border-slate-100 dark:border-slate-800 text-left">
              <h3 className="font-bold mb-4 flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><BookOpen size={18} className="text-blue-600" /></div>
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
              <p className='text-slate-400 text-[11px] mt-4 leading-relaxed'>
                {dynamicConfig.formulaVars}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-8 border border-slate-100 dark:border-slate-800 text-left">
              <h3 className="font-bold mb-6 flex items-center gap-3">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg"><Zap size={18} className="text-emerald-600" /></div>
                Best Use Cases
              </h3>
              <div className="space-y-4 text-left">
                {dynamicConfig.useCases && dynamicConfig.useCases.map((text: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CircleCheck size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-10 border border-slate-100 dark:border-slate-800 text-left">
            <h3 className="font-bold mb-8 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg"><FileText size={18} className="text-indigo-600" /></div>
              Definitions
            </h3>
            <div className="space-y-8 text-left">
              {config.definitions && config.definitions.map((term: { title: string; desc: string }, i: number) => (
                <div key={i}>
                  <p className="font-black text-blue-600 dark:text-blue-400 text-sm mb-2 uppercase tracking-wide text-left">{term.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{term.desc}</p>
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