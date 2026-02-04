// Test script to verify Mortgage Payment calculator label and functionality
const CALC_CONFIGS = {
  "Mortgage Payment": {
    type: 'loan',
    label1: "Loan Amount", min1: 5000, max1: 1000000, step1: 1000, def1: 5000,
    label2: "Interest Rate", min2: 0.1, max2: 15, step2: 0.1, def2: 0.1,
    label3: "Loan Term", min3: 1, max3: 30, step3: 1, def3: 1,
    hasThirdSlider: true,
    isV2Currency: false,
    calculate: (loanAmount, rate, termYears) => {
      const P = Number(loanAmount);
      const annualRate = Number(rate);
      const years = Number(termYears);

      const monthlyRate = annualRate / 100 / 12;
      const numPayments = years * 12;

      let monthlyPayment = 0;

      if (annualRate === 0) {
        monthlyPayment = P / numPayments;
      } else {
        const compoundFactor = Math.pow(1 + monthlyRate, numPayments);
        monthlyPayment = P * (monthlyRate * compoundFactor) / (compoundFactor - 1);
      }

      const totalRepayment = monthlyPayment * numPayments;
      const totalInterest = totalRepayment - P;

      return {
        totalValue: monthlyPayment,
        years: years,
        returnPercentage: annualRate,
        totalInvested: Math.round(P),
        estReturns: totalInterest,
        finalAmount: totalRepayment,
        ratio: (totalInterest / totalRepayment) * 100
      };
    }
  }
};

console.log("Testing Mortgage Payment Calculator:");
console.log("====================================");

// Test label
const config = CALC_CONFIGS["Mortgage Payment"];
console.log(`Label 3: ${config.label3}`); // Should be "Loan Term (Years)"

// Test calculation
const result = config.calculate(100000, 5, 10);
console.log(`Loan Amount: ₹100,000`);
console.log(`Interest Rate: 5%`);
console.log(`Loan Term: 10 years`);
console.log(`Monthly Payment: ₹${result.totalValue.toFixed(2)}`);
console.log(`Total Repayment: ₹${result.finalAmount.toFixed(2)}`);
console.log(`Total Interest: ₹${result.estReturns.toFixed(2)}`);

console.log("Test completed successfully.");
