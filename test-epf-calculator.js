// Test script for EPF Calculator
function calculateEPF(monthlySalary, age, contributionPercent, annualIncreasePercent, interestRate) {
  const yearsToRetirement = 60 - age;
  const annualIncreaseRate = annualIncreasePercent / 100;
  const r = interestRate / 100;

  let totalInvested = 0;
  let futureValue = 0;
  let currentSalary = monthlySalary;

  for (let year = 0; year < yearsToRetirement; year++) {
    // Monthly contribution (Employee % + 3.67% Employer)
    const monthlyContribution = (currentSalary * (contributionPercent + 3.67)) / 100;
    const yearlyContribution = monthlyContribution * 12;

    totalInvested += yearlyContribution;

    // Calculate how many years this contribution will compound
    const yearsRemaining = yearsToRetirement - year;

    // Future value of this year's contribution
    futureValue += yearlyContribution * Math.pow(1 + r, yearsRemaining);

    // Apply salary hike for the next year
    currentSalary *= (1 + annualIncreaseRate);
  }

  const balance = futureValue;
  const estReturns = balance - totalInvested;

  return {
    totalValue: Math.round(balance),
    totalInvested: Math.round(totalInvested),
    estReturns: Math.round(estReturns),
    returnPercentage: totalInvested > 0 ? +((estReturns / totalInvested) * 100).toFixed(2) : 0,
    years: yearsToRetirement,
    ratio: totalInvested > 0 ? +((estReturns / totalInvested) * 100).toFixed(2) : 0,
    monthlySalary,
    annualIncreasePercent,
    interestRate
  };
}

// Test cases
console.log("Testing EPF Calculator:");
console.log("=======================");

// Test 1: Minimum values (10000 monthly, 15 age, 1% contribution, 1% increase, 8.25% interest)
const test1 = calculateEPF(10000, 15, 1, 1, 8.25);
console.log("Test 1 - Minimum values (₹10,000 monthly, 15 age, 1% contribution, 1% increase, 8.25% interest):");
console.log(`Total Value: ₹${test1.totalValue}`);
console.log(`Total Invested: ₹${test1.totalInvested}`);
console.log(`Est. Returns: ₹${test1.estReturns}`);
console.log(`Return %: ${test1.returnPercentage}%`);
console.log(`Years to Retirement: ${test1.years}`);
console.log(`Monthly Salary: ₹${test1.monthlySalary}`);
console.log(`Annual Increase: ${test1.annualIncreasePercent}%`);
console.log(`Interest Rate: ${test1.interestRate}%`);
console.log();

// Test 2: Compare with higher values
const test2 = calculateEPF(30000, 25, 12, 5, 8.25);
console.log("Test 2 - Default values (₹30,000 monthly, 25 age, 12% contribution, 5% increase, 8.25% interest):");
console.log(`Total Value: ₹${test2.totalValue}`);
console.log(`Total Invested: ₹${test2.totalInvested}`);
console.log(`Est. Returns: ₹${test2.estReturns}`);
console.log(`Return %: ${test2.returnPercentage}%`);
console.log(`Years to Retirement: ${test2.years}`);
console.log(`Monthly Salary: ₹${test2.monthlySalary}`);
console.log(`Annual Increase: ${test2.annualIncreasePercent}%`);
console.log(`Interest Rate: ${test2.interestRate}%`);
console.log();

// Test 3: Edge case - very low contribution
const test3 = calculateEPF(10000, 15, 1, 1, 8.25);
console.log("Test 3 - Edge case (₹10,000 monthly, 15 age, 1% contribution, 1% increase, 8.25% interest):");
console.log(`Total Value: ₹${test3.totalValue}`);
console.log(`Total Invested: ₹${test3.totalInvested}`);
console.log(`Est. Returns: ₹${test3.estReturns}`);
console.log(`Return %: ${test3.returnPercentage}%`);
console.log(`Years to Retirement: ${test3.years}`);
console.log(`Monthly Salary: ₹${test3.monthlySalary}`);
console.log(`Annual Increase: ${test3.annualIncreasePercent}%`);
console.log(`Interest Rate: ${test3.interestRate}%`);
console.log();
