// Test script for SSY Calculator
function calculateSSY(yearly, age, startYear) {
  const rate = 0.085201075; // 8.5201% annual interest
  const maturityYears = 21 - age;
  const depositYears = Math.max(0, 15 - age);

  let balance = 0;
  let totalInvested = 0;

  for (let year = 1; year <= maturityYears; year++) {
    balance *= (1 + rate);

    if (year <= depositYears) {
      balance += yearly;
      totalInvested += yearly;
    }
  }

  const maturityValue = Math.round(balance);
  const totalInterest = maturityValue - totalInvested;
  const maturityYear = startYear + maturityYears;

  return {
    totalValue: totalInvested,
    totalInvested,
    estReturns: totalInterest,
    maturityValue,
    maturityYear,
    returnPercentage: +(totalInterest / totalInvested * 100).toFixed(2),
    ratio: +(totalInterest / totalInvested * 100).toFixed(2)
  };
}

// Test cases
console.log("Testing SSY Calculator:");
console.log("=======================");

// Test 1: Default values (250 yearly, 0 age, 2021 start)
const test1 = calculateSSY(250, 0, 2021);
console.log("Test 1 - Default (₹250 yearly, 0 age, 2021 start):");
console.log(`Investment Years: 15`);
console.log(`Total Invested: ₹${test1.totalInvested}`);
console.log(`Maturity Value: ₹${Math.round(test1.maturityValue)}`);
console.log(`Total Interest: ₹${Math.round(test1.estReturns)}`);
console.log(`Maturity Year: ${test1.maturityYear}`);
console.log(`Return %: ${test1.returnPercentage.toFixed(2)}%`);
console.log();

// Test 2: Age 5
const test2 = calculateSSY(1000, 5, 2021);
console.log("Test 2 - Age 5 (₹1000 yearly, 5 age, 2021 start):");
console.log(`Investment Years: ${15 - 5}`);
console.log(`Total Invested: ₹${test2.totalInvested}`);
console.log(`Maturity Value: ₹${Math.round(test2.maturityValue)}`);
console.log(`Total Interest: ₹${Math.round(test2.estReturns)}`);
console.log(`Maturity Year: ${test2.maturityYear}`);
console.log(`Return %: ${test2.returnPercentage.toFixed(2)}%`);
console.log();

// Test 3: Age 10
const test3 = calculateSSY(1500, 10, 2021);
console.log("Test 3 - Age 10 (₹1500 yearly, 10 age, 2021 start):");
console.log(`Investment Years: ${15 - 10}`);
console.log(`Total Invested: ₹${test3.totalInvested}`);
console.log(`Maturity Value: ₹${Math.round(test3.maturityValue)}`);
console.log(`Total Interest: ₹${Math.round(test3.estReturns)}`);
console.log(`Maturity Year: ${test3.maturityYear}`);
console.log(`Return %: ${test3.returnPercentage.toFixed(2)}%`);
console.log();
