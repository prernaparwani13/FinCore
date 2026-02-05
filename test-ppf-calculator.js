// Test script for PPF Calculator
function calculatePPF(yearlyInvestment, timePeriod, rate) {
  const r = rate / 100;
  const n = timePeriod;

  const maturityValue = yearlyInvestment * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
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
}

// Test cases
console.log("Testing PPF Calculator:");
console.log("=======================");

// Test 1: Default values (500 yearly, 15 years, 7.1% rate)
const test1 = calculatePPF(500, 15, 7.1);
console.log("Test 1 - Default (₹500 yearly, 15 years, 7.1% rate):");
console.log(`Total Invested: ₹${test1.totalInvested}`);
console.log(`Maturity Value: ₹${test1.maturityValue}`);
console.log(`Total Interest: ₹${test1.estReturns}`);
console.log(`Return %: ${test1.returnPercentage.toFixed(2)}%`);
console.log();

// Test 2: Higher investment
const test2 = calculatePPF(1000, 15, 7.1);
console.log("Test 2 - Higher investment (₹1000 yearly, 15 years, 7.1% rate):");
console.log(`Total Invested: ₹${test2.totalInvested}`);
console.log(`Maturity Value: ₹${test2.maturityValue}`);
console.log(`Total Interest: ₹${test2.estReturns}`);
console.log(`Return %: ${test2.returnPercentage.toFixed(2)}%`);
console.log();

// Test 3: Longer period
const test3 = calculatePPF(500, 30, 7.1);
console.log("Test 3 - Longer period (₹500 yearly, 30 years, 7.1% rate):");
console.log(`Total Invested: ₹${test3.totalInvested}`);
console.log(`Maturity Value: ₹${test3.maturityValue}`);
console.log(`Total Interest: ₹${test3.estReturns}`);
console.log(`Return %: ${test3.returnPercentage.toFixed(2)}%`);
console.log();

// Test 4: Maximum values
const test4 = calculatePPF(150000, 50, 7.1);
console.log("Test 4 - Maximum values (₹150000 yearly, 50 years, 7.1% rate):");
console.log(`Total Invested: ₹${test4.totalInvested}`);
console.log(`Maturity Value: ₹${test4.maturityValue}`);
console.log(`Total Interest: ₹${test4.estReturns}`);
console.log(`Return %: ${test4.returnPercentage.toFixed(2)}%`);
console.log();
