// Test current SSY calculator logic
function calculateSSYCurrent(yearly, age, startYear) {
  const rate = 0.085; // 8.5%
  const depositYears = 15;
  const maturityYears = 21;
  let balance = 0;
  const totalInvested = yearly * depositYears;

  for (let year = 1; year <= maturityYears; year++) {
    if (year <= depositYears) {
      balance += yearly;
    }
    balance = balance * (1 + rate);
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
    ratio: (depositYears / maturityYears) * 100
  };
}

// Test cases matching the test script
console.log("Testing Current SSY Calculator:");
console.log("===============================");

// Test 1: Default values (250 yearly, 0 age, 2021 start) - but current code uses age=1, but let's test with age ignored
const test1 = calculateSSYCurrent(250, 0, 2021);
console.log("Test 1 - Default (₹250 yearly, 0 age, 2021 start):");
console.log(`Total Invested: ₹${test1.totalInvested}`);
console.log(`Maturity Value: ₹${test1.maturityValue}`);
console.log(`Total Interest: ₹${test1.estReturns}`);
console.log(`Return %: ${test1.returnPercentage}%`);
console.log();

// Test 2: Age 5 (1000 yearly, 5 age, 2021 start)
const test2 = calculateSSYCurrent(1000, 5, 2021);
console.log("Test 2 - Age 5 (₹1000 yearly, 5 age, 2021 start):");
console.log(`Total Invested: ₹${test2.totalInvested}`);
console.log(`Maturity Value: ₹${test2.maturityValue}`);
console.log(`Total Interest: ₹${test2.estReturns}`);
console.log(`Return %: ${test2.returnPercentage}%`);
console.log();

// Test 3: Age 10 (1500 yearly, 10 age, 2021 start)
const test3 = calculateSSYCurrent(1500, 10, 2021);
console.log("Test 3 - Age 10 (₹1500 yearly, 10 age, 2021 start):");
console.log(`Total Invested: ₹${test3.totalInvested}`);
console.log(`Maturity Value: ₹${test3.maturityValue}`);
console.log(`Total Interest: ₹${test3.estReturns}`);
console.log(`Return %: ${test3.returnPercentage}%`);
console.log();
