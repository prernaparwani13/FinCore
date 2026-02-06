// Test script for current SWP Calculator implementation
function calculateSWPCurrent(totalInvestment, withdrawPerMonth, expectedReturn, timePeriodYears) {
  const monthlyRate = expectedReturn / 100 / 12;
  const totalMonths = timePeriodYears * 12;

  let currentBalance = totalInvestment;
  let actualWithdrawals = 0;

  for (let i = 0; i < totalMonths; i++) {
    // 1. Withdrawal happens at the START of the month
    currentBalance -= withdrawPerMonth;
    actualWithdrawals += withdrawPerMonth;

    // 2. Interest is earned on the REMAINING balance
    currentBalance += currentBalance * monthlyRate;

    // 3. If balance hits zero, undo the last withdrawal and stop
    if (currentBalance < 0) {
      currentBalance = 0;
      actualWithdrawals -= withdrawPerMonth;
      break;
    }
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
}

// Test cases
console.log("Testing Current SWP Calculator Implementation:");
console.log("==============================================");

// Test 1: Default values (100000 investment, 1000 withdraw/month, 5% return, 10 years)
const test1 = calculateSWPCurrent(100000, 1000, 5, 10);
console.log("Test 1 - Default (₹100000 investment, ₹1000/month withdraw, 5% return, 10 years):");
console.log(`Total Withdrawal: ₹${test1.totalValue}`);
console.log(`Final Value: ₹${test1.finalValue}`);
console.log(`Total Investment: ₹${test1.totalInvested}`);
console.log(`Years: ${test1.years}`);
console.log();

// Test 2: Higher withdrawal
const test2 = calculateSWPCurrent(100000, 2000, 5, 10);
console.log("Test 2 - Higher withdrawal (₹100000 investment, ₹2000/month withdraw, 5% return, 10 years):");
console.log(`Total Withdrawal: ₹${test2.totalValue}`);
console.log(`Final Value: ₹${test2.finalValue}`);
console.log(`Total Investment: ₹${test2.totalInvested}`);
console.log(`Years: ${test2.years}`);
console.log();

// Test 3: Lower return
const test3 = calculateSWPCurrent(100000, 1000, 3, 10);
console.log("Test 3 - Lower return (₹100000 investment, ₹1000/month withdraw, 3% return, 10 years):");
console.log(`Total Withdrawal: ₹${test3.totalValue}`);
console.log(`Final Value: ₹${test3.finalValue}`);
console.log(`Total Investment: ₹${test3.totalInvested}`);
console.log(`Years: ${test3.years}`);
console.log();

// Test 4: Shorter time period
const test4 = calculateSWPCurrent(100000, 1000, 5, 5);
console.log("Test 4 - Shorter period (₹100000 investment, ₹1000/month withdraw, 5% return, 5 years):");
console.log(`Total Withdrawal: ₹${test4.totalValue}`);
console.log(`Final Value: ₹${test4.finalValue}`);
console.log(`Total Investment: ₹${test4.totalInvested}`);
console.log(`Years: ${test4.years}`);
console.log();

// Test 5: Edge case - very high withdrawal that depletes quickly
const test5 = calculateSWPCurrent(100000, 5000, 5, 10);
console.log("Test 5 - High withdrawal (₹100000 investment, ₹5000/month withdraw, 5% return, 10 years):");
console.log(`Total Withdrawal: ₹${test5.totalValue}`);
console.log(`Final Value: ₹${test5.finalValue}`);
console.log(`Total Investment: ₹${test5.totalInvested}`);
console.log(`Years: ${test5.years}`);
console.log();

// Test 6: Edge case - withdrawal equals investment
const test6 = calculateSWPCurrent(100000, 100000, 5, 10);
console.log("Test 6 - Full withdrawal (₹100000 investment, ₹100000/month withdraw, 5% return, 10 years):");
console.log(`Total Withdrawal: ₹${test6.totalValue}`);
console.log(`Final Value: ₹${test6.finalValue}`);
console.log(`Total Investment: ₹${test6.totalInvested}`);
console.log(`Years: ${test6.years}`);
console.log();
