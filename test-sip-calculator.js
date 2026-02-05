// Test script for SIP Calculator
function calculateSIP(monthly, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;

  // Invested Amount
  const investedAmount = monthly * months;

  // Total Value (Standard SIP Formula - Ordinary Annuity)
  const totalValueOrdinary = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  // Total Value (Annuity Due - contributions at beginning)
  const totalValueDue = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);

  // Estimated Returns
  const estimatedReturnsOrdinary = totalValueOrdinary - investedAmount;
  const estimatedReturnsDue = totalValueDue - investedAmount;

  return {
    investedAmount: Math.round(investedAmount),
    totalValueOrdinary: Math.round(totalValueOrdinary),
    totalValueDue: Math.round(totalValueDue),
    estimatedReturnsOrdinary: Math.round(estimatedReturnsOrdinary),
    estimatedReturnsDue: Math.round(estimatedReturnsDue),
    returnPercentageOrdinary: +((estimatedReturnsOrdinary / investedAmount) * 100).toFixed(2),
    returnPercentageDue: +((estimatedReturnsDue / investedAmount) * 100).toFixed(2)
  };
}

// Test cases
console.log("Testing SIP Calculator:");
console.log("=======================");

// Test 1: Default values (100 monthly, 1% p.a., 1 year)
const test1 = calculateSIP(100, 1, 1);
console.log("Test 1 - Default (₹100 monthly, 1% p.a., 1 year):");
console.log(`Invested Amount: ₹${test1.investedAmount}`);
console.log(`Total Value (Ordinary): ₹${test1.totalValueOrdinary}`);
console.log(`Total Value (Due): ₹${test1.totalValueDue}`);
console.log(`Est. Returns (Ordinary): ₹${test1.estimatedReturnsOrdinary}`);
console.log(`Est. Returns (Due): ₹${test1.estimatedReturnsDue}`);
console.log(`Return % (Ordinary): ${test1.returnPercentageOrdinary}%`);
console.log(`Return % (Due): ${test1.returnPercentageDue}%`);
console.log();

// Test 2: Higher investment
const test2 = calculateSIP(500, 12, 5);
console.log("Test 2 - Higher (₹500 monthly, 12% p.a., 5 years):");
console.log(`Invested Amount: ₹${test2.investedAmount}`);
console.log(`Total Value (Ordinary): ₹${test2.totalValueOrdinary}`);
console.log(`Total Value (Due): ₹${test2.totalValueDue}`);
console.log(`Est. Returns (Ordinary): ₹${test2.estimatedReturnsOrdinary}`);
console.log(`Est. Returns (Due): ₹${test2.estimatedReturnsDue}`);
console.log(`Return % (Ordinary): ${test2.returnPercentageOrdinary}%`);
console.log(`Return % (Due): ${test2.returnPercentageDue}%`);
console.log();

// Test 3: Longer period
const test3 = calculateSIP(1000, 10, 10);
console.log("Test 3 - Longer (₹1000 monthly, 10% p.a., 10 years):");
console.log(`Invested Amount: ₹${test3.investedAmount}`);
console.log(`Total Value (Ordinary): ₹${test3.totalValueOrdinary}`);
console.log(`Total Value (Due): ₹${test3.totalValueDue}`);
console.log(`Est. Returns (Ordinary): ₹${test3.estimatedReturnsOrdinary}`);
console.log(`Est. Returns (Due): ₹${test3.estimatedReturnsDue}`);
console.log(`Return % (Ordinary): ${test3.returnPercentageOrdinary}%`);
console.log(`Return % (Due): ${test3.returnPercentageDue}%`);
console.log();
