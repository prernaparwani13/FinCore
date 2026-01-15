export interface CalculatorItem {
  title: string;
  description: string;
  category: "MORTGAGE" | "INVESTMENT" | "BUSINESS" | "RETIREMENT" | "TAX";
  icon: string;
  color: string;
}

export const calculatorData: CalculatorItem[] = [
  { title: "Mortgage Payment", description: "Estimate monthly payments including taxes, insurance, and PMI.", category: "MORTGAGE", icon: "🏠", color: "blue" },
  { title: "Loan Amortization", description: "Visualize how your loan principal and interest decrease over time.", category: "MORTGAGE", icon: "💳", color: "blue" },
  { title: "Compound Interest", description: "Calculate the future value of your investments with compounding.", category: "INVESTMENT", icon: "📈", color: "green" },
  { title: "Retirement Planner", description: "Determine how much you need to save to reach your retirement goals.", category: "RETIREMENT", icon: "🐷", color: "purple" },
  { title: "ROI Calculator", description: "Analyze the efficiency and profitability of an investment.", category: "BUSINESS", icon: "📊", color: "purple" },
  { title: "Inflation Impact", description: "See how inflation affects the purchasing power of your money over time.", category: "INVESTMENT", icon: "％", color: "green" },
  { title: "Income Tax Estimator", description: "Project your annual tax liability based on current global brackets.", category: "TAX", icon: "🏛️", color: "orange" },
  { title: "Auto Loan", description: "Calculate monthly car payments and total interest costs.", category: "MORTGAGE", icon: "📱", color: "blue" },
];