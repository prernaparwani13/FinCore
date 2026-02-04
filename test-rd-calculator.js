// Test script for RD Calculator
function calculateRD(monthly, rate, years, months) {
  const totalMonths = years * 12 + months;
  const P = monthly;
  const n = totalMonths;
  const r = rate;
  const totalValue = P * n + P * (n * (n + 1) / 2) * (r / 12) / 100;
  const totalInvested = P * n;
  const estReturns = totalValue - totalInvested;
  return {
    totalValue: Math.round(totalValue),
    years: years,
    months: months,
    returnPercentage: (estReturns / totalInvested) * 100,
    totalInvested: Math.round(totalInvested),
    estReturns: Math.round(estReturns),
    ratio: (estReturns / totalInvested) * 100
  };
}

// Test cases
console.log("Testing RD Calculator:");
console.log("=======================");

// Test 1: Default values (₹5000 monthly, 6% rate, 5 years, 0 months)
const test1 = calculateRD(5000, 6, 5, 0);
console.log("Test 1 - Default values (₹5,000 monthly, 6% rate, 5 years, 0 months):");
console.log(`Total Invested: ₹${test1.totalInvested}`);
console.log(`Est. Returns: ₹${test1.estReturns}`);
console.log(`Total Value: ₹${test1.totalValue}`);
console.log(`Return %: ${test1.returnPercentage.toFixed(2)}%`);
console.log();

// Test 2: With months (₹5000 monthly, 6% rate, 5 years, 6 months)
const test2 = calculateRD(5000, 6, 5, 6);
console.log("Test 2 - With months (₹5,000 monthly, 6% rate, 5 years, 6 months):");
console.log(`Total Invested: ₹${test2.totalInvested}`);
console.log(`Est. Returns: ₹${test2.estReturns}`);
console.log(`Total Value: ₹${test2.totalValue}`);
console.log(`Return %: ${test2.returnPercentage.toFixed(2)}%`);
console.log();

// Test 3: Different rate (₹10000 monthly, 8% rate, 3 years, 0 months)
const test3 = calculateRD(10000, 8, 3, 0);
console.log("Test 3 - Different rate (₹10,000 monthly, 8% rate, 3 years, 0 months):");
console.log(`Total Invested: ₹${test3.totalInvested}`);
console.log(`Est. Returns: ₹${test3.estReturns}`);
console.log(`Total Value: ₹${test3.totalValue}`);
console.log(`Return %: ${test3.returnPercentage.toFixed(2)}%`);
console.log();

// Manual verification for Test 1:
// Monthly Investment: 5000
// Rate: 6% p.a. (0.005 monthly)
// Total Months: 5 * 12 = 60
// Total Invested: 5000 * 60 = 300000
// Future Value = 5000 * [(1+0.005)^60 - 1] / 0.005 * (1+0.005)
// ≈ 5000 * [1.432 - 1] / 0.005 * 1.005 ≈ 5000 * 86.4 * 1.005 ≈ 434400
// Est. Returns: 434400 - 300000 = 134400

console.log("Manual verification for Test 1:");
const manualMonthly = 5000;
const manualRate = 6 / 100 / 12;
const manualMonths = 5 * 12;
const manualInvested = manualMonthly * manualMonths;
const manualFV = manualMonthly * ((Math.pow(1 + manualRate, manualMonths) - 1) / manualRate) * (1 + manualRate);
const manualReturns = manualFV - manualInvested;
console.log(`Manual Total Invested: ₹${manualInvested}`);
console.log(`Manual Total Value: ₹${Math.round(manualFV)}`);
console.log(`Manual Est. Returns: ₹${Math.round(manualReturns)}`);
console.log(`Matches calculated: ${Math.round(manualFV) === test1.totalValue && Math.round(manualReturns) === test1.estReturns}`);
