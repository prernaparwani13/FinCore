// Test script for SWP Calculator
function calculateSWP(totalInvestment, withdrawPerMonth, expectedReturn, timePeriodYears) {
  let balance = totalInvestment;
  const monthlyRate = expectedReturn / 100 / 12;
  const totalMonths = timePeriodYears * 12;

  let months = 0;
  let totalWithdrawal = 0;

  while (months < totalMonths && balance >= withdrawPerMonth) {
    // Withdraw first
    balance -= withdrawPerMonth;
    totalWithdrawal += withdrawPerMonth;

    // Then apply interest
    balance += balance * monthlyRate;

    months++;
  }

  // If balance went negative, adjust the last withdrawal
  if (balance < 0) {
    const excess = Math.abs(balance);
    totalWithdrawal -= excess;
    balance = 0;
  }

  return {
    totalValue: Math.round(totalWithdrawal),
    totalInvested: totalInvestment,
    finalValue: Math.round(balance),
    estReturns: Math.round(
      totalWithdrawal + balance - totalInvestment
    ),
    returnPercentage:
      ((totalWithdrawal + balance - totalInvestment) /
        totalInvestment) *
      100,
    years: timePeriodYears,
    ratio: totalWithdrawal / totalInvestment
  };
}

// Test cases
console.log("Testing SWP Calculator:");
console.log("=======================");

// Test 1: Default values (100000 investment, 1000 withdraw/month, 5% return, 10 years)
const test1 = calculateSWP(100000, 1000, 5, 10);
console.log("Test 1 - Default (₹100000 investment, ₹1000/month withdraw, 5% return, 10 years):");
console.log(`Total Withdrawal: ₹${test1.totalValue}`);
console.log(`Final Value: ₹${test1.finalValue}`);
console.log(`Total Investment: ₹${test1.totalInvested}`);
console.log(`Years: ${test1.years}`);
console.log();

// Test 2: Higher withdrawal
const test2 = calculateSWP(100000, 2000, 5, 10);
console.log("Test 2 - Higher withdrawal (₹100000 investment, ₹2000/month withdraw, 5% return, 10 years):");
console.log(`Total Withdrawal: ₹${test2.totalValue}`);
console.log(`Final Value: ₹${test2.finalValue}`);
console.log(`Total Investment: ₹${test2.totalInvested}`);
console.log(`Years: ${test2.years}`);
console.log();

// Test 3: Lower return
const test3 = calculateSWP(100000, 1000, 3, 10);
console.log("Test 3 - Lower return (₹100000 investment, ₹1000/month withdraw, 3% return, 10 years):");
console.log(`Total Withdrawal: ₹${test3.totalValue}`);
console.log(`Final Value: ₹${test3.finalValue}`);
console.log(`Total Investment: ₹${test3.totalInvested}`);
console.log(`Years: ${test3.years}`);
console.log();

// Test 4: Shorter time period
const test4 = calculateSWP(100000, 1000, 5, 5);
console.log("Test 4 - Shorter period (₹100000 investment, ₹1000/month withdraw, 5% return, 5 years):");
console.log(`Total Withdrawal: ₹${test4.totalValue}`);
console.log(`Final Value: ₹${test4.finalValue}`);
console.log(`Total Investment: ₹${test4.totalInvested}`);
console.log(`Years: ${test4.years}`);
console.log();
