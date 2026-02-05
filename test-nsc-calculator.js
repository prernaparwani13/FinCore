// Test script for NSC Calculator
function calculateNSC(amountInvested, rate, frequency) {
  const P = Number(amountInvested);
  const r = Number(rate) / 100;
  const n = Number(frequency); // 1 for yearly, 2 for half-yearly
  const t = 5; // Fixed 5 years

  const totalValue = P * Math.pow(1 + r / n, n * t);
  const estReturns = totalValue - P;

  return {
    totalValue: Math.round(totalValue),
    totalInvested: P,
    estReturns: Math.round(estReturns),
    returnPercentage: +((estReturns / P) * 100).toFixed(2),
    years: t,
    ratio: +((estReturns / P) * 100).toFixed(2)
  };
}

// Test cases
console.log("Testing NSC Calculator:");
console.log("=======================");

// Test 1: Default values (₹1000 invested, 6.8% p.a., Half-Yearly)
const test1 = calculateNSC(1000, 6.8, 2);
console.log("Test 1 - Default (₹1000 invested, 6.8% p.a., Half-Yearly):");
console.log(`Total Value: ₹${test1.totalValue}`);
console.log(`Total Invested: ₹${test1.totalInvested}`);
console.log(`Est. Returns: ₹${test1.estReturns}`);
console.log(`Return %: ${test1.returnPercentage}%`);
console.log();

// Test 2: Half-Yearly compounding
const test2 = calculateNSC(5000, 7.5, 2);
console.log("Test 2 - Half-Yearly (₹5000 invested, 7.5% p.a., Half-Yearly):");
console.log(`Total Value: ₹${test2.totalValue}`);
console.log(`Total Invested: ₹${test2.totalInvested}`);
console.log(`Est. Returns: ₹${test2.estReturns}`);
console.log(`Return %: ${test2.returnPercentage}%`);
console.log();

// Test 3: Yearly compounding
const test3 = calculateNSC(5000, 7.5, 1);
console.log("Test 3 - Yearly (₹5000 invested, 7.5% p.a., Yearly):");
console.log(`Total Value: ₹${test3.totalValue}`);
console.log(`Total Invested: ₹${test3.totalInvested}`);
console.log(`Est. Returns: ₹${test3.estReturns}`);
console.log(`Return %: ${test3.returnPercentage}%`);
console.log();

// Test 4: Higher investment with Yearly
const test4 = calculateNSC(10000, 8.0, 1);
console.log("Test 4 - Higher Yearly (₹10000 invested, 8.0% p.a., Yearly):");
console.log(`Total Value: ₹${test4.totalValue}`);
console.log(`Total Invested: ₹${test4.totalInvested}`);
console.log(`Est. Returns: ₹${test4.estReturns}`);
console.log(`Return %: ${test4.returnPercentage}%`);
console.log();

// Test 5: Edge case - Minimum values
const test5 = calculateNSC(100, 1, 1);
console.log("Test 5 - Minimum (₹100 invested, 1% p.a., Yearly):");
console.log(`Total Value: ₹${test5.totalValue}`);
console.log(`Total Invested: ₹${test5.totalInvested}`);
console.log(`Est. Returns: ₹${test5.estReturns}`);
console.log(`Return %: ${test5.returnPercentage}%`);
console.log();

// Test 6: Edge case - Maximum values
const test6 = calculateNSC(1000000, 10, 2);
console.log("Test 6 - Maximum (₹1000000 invested, 10% p.a., Half-Yearly):");
console.log(`Total Value: ₹${test6.totalValue}`);
console.log(`Total Invested: ₹${test6.totalInvested}`);
console.log(`Est. Returns: ₹${test6.estReturns}`);
console.log(`Return %: ${test6.returnPercentage}%`);
console.log();
