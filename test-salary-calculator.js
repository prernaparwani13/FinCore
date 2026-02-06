// Test script for Salary Calculator
function calculateSalary(ctc, bonusValue, profTax, employerPf, employeePf, bonusType, bonusIncluded) {
  let bonusAmount = 0;
  if (bonusIncluded === 'No') {
    bonusAmount = bonusType === 'Fixed' ? bonusValue : (ctc * bonusValue / 100);
  }
  const totalCtc = ctc + bonusAmount;
  const monthlySalary = totalCtc / 12;
  const monthlyDeductions = profTax + employeePf;
  const takeHomeMonthly = monthlySalary - monthlyDeductions;
  const takeHomeAnnual = takeHomeMonthly * 12;
  const totalAnnualDeductions = monthlyDeductions * 12;

  return {
    totalValue: Math.round(takeHomeMonthly),
    takeHomeAnnual: Math.round(takeHomeAnnual),
    totalMonthlyDeductions: Math.round(monthlyDeductions),
    totalAnnualDeductions: Math.round(totalAnnualDeductions),
    monthlySalary: Math.round(monthlySalary),
    ctc: Math.round(totalCtc),
    bonusAmount: Math.round(bonusAmount),
    returnPercentage: 0,
    ratio: 0
  };
}

// Test cases
console.log("Testing Salary Calculator:");
console.log("=========================");

// Test 1: Default values (CTC=600000, Bonus=50000 Fixed Not Included, ProfTax=235, EmployerPF=1800, EmployeePF=1800)
const test1 = calculateSalary(600000, 50000, 235, 1800, 1800, 'Fixed', 'No');
console.log("Test 1 - Default (CTC=600000, Bonus=50000 Fixed Not Included, ProfTax=235, EmployerPF=1800, EmployeePF=1800):");
console.log(`Total CTC: ₹${test1.ctc}`);
console.log(`Monthly Salary: ₹${test1.monthlySalary}`);
console.log(`Take Home Monthly: ₹${test1.totalValue}`);
console.log(`Take Home Annual: ₹${test1.takeHomeAnnual}`);
console.log(`Total Monthly Deductions: ₹${test1.totalMonthlyDeductions}`);
console.log(`Total Annual Deductions: ₹${test1.totalAnnualDeductions}`);
console.log(`Bonus Amount: ₹${test1.bonusAmount}`);
console.log();

// Test 2: Bonus Included in CTC
const test2 = calculateSalary(600000, 50000, 235, 1800, 1800, 'Fixed', 'Yes');
console.log("Test 2 - Bonus Included (CTC=600000, Bonus=50000 Fixed Included, ProfTax=235, EmployerPF=1800, EmployeePF=1800):");
console.log(`Total CTC: ₹${test2.ctc}`);
console.log(`Monthly Salary: ₹${test2.monthlySalary}`);
console.log(`Take Home Monthly: ₹${test2.totalValue}`);
console.log(`Take Home Annual: ₹${test2.takeHomeAnnual}`);
console.log(`Total Monthly Deductions: ₹${test2.totalMonthlyDeductions}`);
console.log(`Total Annual Deductions: ₹${test2.totalAnnualDeductions}`);
console.log(`Bonus Amount: ₹${test2.bonusAmount}`);
console.log();

// Test 3: Percentage Bonus Not Included
const test3 = calculateSalary(600000, 10, 235, 1800, 1800, 'Percentage', 'No');
console.log("Test 3 - Percentage Bonus Not Included (CTC=600000, Bonus=10% Not Included, ProfTax=235, EmployerPF=1800, EmployeePF=1800):");
console.log(`Total CTC: ₹${test3.ctc}`);
console.log(`Monthly Salary: ₹${test3.monthlySalary}`);
console.log(`Take Home Monthly: ₹${test3.totalValue}`);
console.log(`Take Home Annual: ₹${test3.takeHomeAnnual}`);
console.log(`Total Monthly Deductions: ₹${test3.totalMonthlyDeductions}`);
console.log(`Total Annual Deductions: ₹${test3.totalAnnualDeductions}`);
console.log(`Bonus Amount: ₹${test3.bonusAmount}`);
console.log();

// Test 4: No Bonus
const test4 = calculateSalary(600000, 0, 235, 1800, 1800, 'Fixed', 'No');
console.log("Test 4 - No Bonus (CTC=600000, Bonus=0, ProfTax=235, EmployerPF=1800, EmployeePF=1800):");
console.log(`Total CTC: ₹${test4.ctc}`);
console.log(`Monthly Salary: ₹${test4.monthlySalary}`);
console.log(`Take Home Monthly: ₹${test4.totalValue}`);
console.log(`Take Home Annual: ₹${test4.takeHomeAnnual}`);
console.log(`Total Monthly Deductions: ₹${test4.totalMonthlyDeductions}`);
console.log(`Total Annual Deductions: ₹${test4.totalAnnualDeductions}`);
console.log(`Bonus Amount: ₹${test4.bonusAmount}`);
console.log();
