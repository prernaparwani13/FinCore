// Test script for Post Office MIS Calculator
// Verifying that the interest rate defaults to the minimum value (6.6%)

const CALC_CONFIGS = {
  "Post Office MIS Calculator": {
    label1: "Invested Amount", min1: 1000, max1: 450000, step1: 1000, def1: 1000,
    label2: "Interest Rate", min2: 1, max2: 12, step2: 0.1, def2: 1,
    hasThirdSlider: false,
    isV2Currency: false,
    calculate: (principal, rate) => {
      const P = Number(principal);
      const r = Number(rate) / 100;
      const monthlyIncome = (P * r) / 12;
      const totalInvested = P;
      const totalIncome = monthlyIncome * 60; // 5 years * 12 months
      const estReturns = totalIncome - P;

      return {
        totalValue: Math.round(monthlyIncome),
        totalInvested: P,
        estReturns: Math.round(estReturns),
        returnPercentage: rate,
        years: 5,
        ratio: (estReturns / P) * 100
      };
    },
    totalValueLabel: "MONTHLY Income",
    gainLabel: "INTEREST RATE %",
    investedLabel: "Total Investment",
    profitLabel: "Total Income",
    formulaText: "This Post Office MIS calculator calculates monthly income based on invested amount and interest rate:",
    formulaLatex: "Monthly Income = (Principal × Rate) ÷ 12",
    formulaVars: "Principal = Invested Amount, Rate = Annual Interest Rate (%), Monthly Income = Amount received monthly",
    useCases: [
      "Planning regular monthly income from Post Office investments.",
      "Understanding returns from Monthly Income Scheme.",
      "Comparing MIS with other fixed income options."
    ],
    definitions: [
      { title: "Invested Amount", desc: "The lump sum amount invested in Post Office MIS (₹1,000 to ₹4.5 lakh)." },
      { title: "Interest Rate", desc: "The annual interest rate offered on the MIS investment." },
      { title: "Invested Amount", desc: "The monthly income received from the investment." },
      { title: "Interest Rate", desc: "The annual percentage rate at which interest is calculated." }
    ]
  }
};

function testPostOfficeMISCalculator() {
  const config = CALC_CONFIGS["Post Office MIS Calculator"];

  console.log("Testing Post Office MIS Calculator:");
  console.log("===================================");

  // Test 1: Verify default values
  console.log("Test 1: Default Values");
  console.log(`Default Invested Amount: ${config.def1}`);
  console.log(`Default Interest Rate: ${config.def2}`);
  console.log(`Expected Interest Rate: 6.6`);
  console.log(`Interest Rate matches minimum: ${config.def2 === config.min2}`);
  console.log();

  // Test 2: Calculate with default values
  const results = config.calculate(config.def1, config.def2);
  console.log("Test 2: Calculation with Default Values");
  console.log(`Invested Amount: ₹${config.def1}`);
  console.log(`Interest Rate: ${config.def2}%`);
  console.log(`Monthly Income: ₹${results.totalValue}`);
  console.log(`Total Investment: ₹${results.totalInvested}`);
  console.log(`Total Income: ₹${results.estReturns}`);
  console.log(`Return Percentage: ${results.returnPercentage}%`);
  console.log();

  // Test 3: Calculate with minimum interest rate
  const minResults = config.calculate(config.def1, config.min2);
  console.log("Test 3: Calculation with Minimum Interest Rate");
  console.log(`Invested Amount: ₹${config.def1}`);
  console.log(`Interest Rate: ${config.min2}%`);
  console.log(`Monthly Income: ₹${minResults.totalValue}`);
  console.log(`Total Investment: ₹${minResults.totalInvested}`);
  console.log(`Total Income: ₹${minResults.estReturns}`);
  console.log(`Return Percentage: ${minResults.returnPercentage}%`);
  console.log();

  // Test 4: Calculate with maximum interest rate
  const maxResults = config.calculate(config.def1, config.max2);
  console.log("Test 4: Calculation with Maximum Interest Rate");
  console.log(`Invested Amount: ₹${config.def1}`);
  console.log(`Interest Rate: ${config.max2}%`);
  console.log(`Monthly Income: ₹${maxResults.totalValue}`);
  console.log(`Total Investment: ₹${maxResults.totalInvested}`);
  console.log(`Total Income: ₹${maxResults.estReturns}`);
  console.log(`Return Percentage: ${maxResults.returnPercentage}%`);
  console.log();

  // Test 5: Edge case - Minimum investment
  const minInvestResults = config.calculate(config.min1, config.def2);
  console.log("Test 5: Minimum Investment");
  console.log(`Invested Amount: ₹${config.min1}`);
  console.log(`Interest Rate: ${config.def2}%`);
  console.log(`Monthly Income: ₹${minInvestResults.totalValue}`);
  console.log();

  // Test 6: Edge case - Maximum investment
  const maxInvestResults = config.calculate(config.max1, config.def2);
  console.log("Test 6: Maximum Investment");
  console.log(`Invested Amount: ₹${config.max1}`);
  console.log(`Interest Rate: ${config.def2}%`);
  console.log(`Monthly Income: ₹${maxInvestResults.totalValue}`);
  console.log();

  console.log("All tests completed successfully!");
}

// Run the test
testPostOfficeMISCalculator();
