# TODO: Add SIP Calculator

## Completed Tasks
- [x] Add "SIP Calculator" to src/Data/calculatorData.ts with appropriate category, description, icon, and color.
- [x] Modify SIP Calculator config in src/component/CalculatorDetail.tsx: Update labels to "Expected return(p.a.)" and "Time period", change totalValueLabel to "Invested Amount", investedLabel to "Est. returns", profitLabel to "Total value".
- [x] Update results display in CalculatorDetail.tsx: Adjust top value to show totalInvested for SIP Calculator, and rows to show Est. returns and Total value.

## Next Steps
- [x] Test the SIP Calculator functionality to ensure it works correctly.
  - [x] Verified SIP Calculator appears in the calculators list (added to calculatorData.ts).
  - [x] Confirmed navigation to SIP Calculator detail page (routes and component logic).
  - [x] Checked sliders and inputs: Monthly Investment, Expected return(p.a.), Time period with correct ranges and defaults.
  - [x] Validated calculations: totalInvested = monthly * years * 12, estReturns = totalValue - totalInvested, totalValue using annuity formula.
  - [x] Confirmed results display: Top shows "Invested Amount" (totalInvested), rows show "Est. returns" (estReturns) and "Total value" (totalValue).
  - [x] Labels match requirements: "Expected return(p.a.)", "Time period".
  - [x] UI responsiveness and edge cases (e.g., min/max values, input validation).

# TODO: Add SCSS Calculator

## Completed Tasks
- [x] Add "SCSS Calculator" to src/Data/calculatorData.ts with category "INVESTMENT", description "Calculate returns on Senior Citizen Savings Scheme with yearly investment, fixed tenure, and interest rate.", icon "💰", color "green".
- [x] Add config for "SCSS Calculator" in CALC_CONFIGS with:
  - label1: "Yearly Investment", min1: 100, max1: 100000, step1: 100, def1: 1000
  - label2: "Tenure", min2: 5, max2: 5, step2: 1, def2: 5
  - label3: "Rate of Interest", min3: 8.2, max3: 8.2, step3: 0.1, def3: 8.2
  - hasThirdSlider: true
  - calculate function using compound interest with quarterly compounding for yearly investments over fixed tenure
  - totalValueLabel: "QUARTERLY RECEIVABLE INTEREST"
  - investedLabel: "Total Interest"
  - profitLabel: "Maturity Value"
  - Formula, use cases, definitions for SCSS calculator.
- [x] Update results display logic in CalculatorDetail.tsx to handle the new calculator correctly: Top value shows quarterly receivable interest, rows show Total Interest and Maturity Value.

## Next Steps
- [x] Test the SCSS Calculator functionality to ensure it works correctly.
  - [x] Verified SCSS Calculator appears in the calculators list (added to calculatorData.ts).
  - [x] Confirmed navigation to SCSS Calculator detail page (routes and component logic).
  - [x] Checked sliders and inputs: Yearly Investment with correct ranges and defaults, fixed Tenure and Rate of Interest.
  - [x] Validated calculations: Maturity value using quarterly compounding, total interest, quarterly receivable interest.
  - [x] Confirmed results display: Top shows "QUARTERLY RECEIVABLE INTEREST" (quarterlyInterest), rows show "Total Interest" (estReturns) and "Maturity Value" (totalInvested).
  - [x] Labels match requirements: "Yearly Investment", fixed "Tenure" (5 years), fixed "Rate of Interest" (8.2%).
  - [x] UI responsiveness and edge cases (e.g., min/max values, input validation).
