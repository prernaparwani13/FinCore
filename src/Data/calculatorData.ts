export interface CalculatorItem {
  title: string;
  description: string;
  category: "MORTGAGE" | "INVESTMENT" | "BUSINESS" | "RETIREMENT" | "TAX";
  icon: string;
  color: string;
}

export const calculatorData: CalculatorItem[] = [
  { title: "Mortgage Payment", description: "Estimate monthly payments including taxes, insurance, and PMI.", category: "MORTGAGE", icon: "🏠", color: "blue" },
  { title: "ROI Calculator", description: "Analyze the efficiency and profitability of an investment.", category: "BUSINESS", icon: "📊", color: "purple" },
  { title: "Compound Interest", description: "Calculate the future value of your investments with compounding.", category: "INVESTMENT", icon: "📈", color: "green" },
  { title: "Retirement Planner", description: "Determine how much you need to save to reach your retirement goals.", category: "RETIREMENT", icon: "🐷", color: "purple" },
  { title: "Loan Amortization", description: "Visualize how your loan principal and interest decrease over time.", category: "MORTGAGE", icon: "💳", color: "blue" },
  { title: "GST Calculator", description: "Calculate GST amount and total price including GST.", category: "TAX", icon: "🧾", color: "orange" },
  { title: "Simple Interest", description: "Calculate simple interest and total amount based on principal, rate, and time.", category: "INVESTMENT", icon: "💰", color: "green" },
  { title: "Auto Loan", description: "Calculate monthly car payments and total interest costs.", category: "MORTGAGE", icon: "📱", color: "blue" },
  { title: "FD Calculator", description: "Calculate estimated returns and total value based on investment, interest rate, and time period.", category: "INVESTMENT", icon: "📈", color: "green" },
  { title: "Mutual Funds Returns", description: "Calculate the future value and estimated returns of your mutual fund investments.", category: "INVESTMENT", icon: "📊", color: "green" },
  { title: "Inflation Calculator", description: "Calculate the impact of inflation on your purchasing power over time.", category: "INVESTMENT", icon: "📈", color: "green" },
  { title: "NPS Calculator", description: "Calculate your NPS maturity amount, total investment, interest earned, and minimum annuity investment.", category: "RETIREMENT", icon: "🏦", color: "purple" },
  { title: "RD Calculator", description: "Calculate returns on Recurring Deposits with monthly investment, interest rate, and time period.", category: "INVESTMENT", icon: "💰", color: "green" },
  { title: "SSY Calculator", description: "Calculate Sukanya Samriddhi Yojana maturity value, total investment, and returns for girl child savings.", category: "INVESTMENT", icon: "👧", color: "green" },
  { title: "SWP Calculator", description: "Calculate total withdrawal and final value from systematic withdrawal plan.", category: "INVESTMENT", icon: "💰", color: "green" },
  { title: "SIP Calculator", description: "Calculate returns on Systematic Investment Plans with monthly investment, expected return, and time period.", category: "INVESTMENT", icon: "📈", color: "green" },
  { title: "PPF Calculator", description: "Calculate Public Provident Fund maturity value, total investment, and interest earned.", category: "INVESTMENT", icon: "🏦", color: "green" },
  { title: "Lumpsum Calculator", description: "Calculate the future value and returns of a lump sum investment.", category: "INVESTMENT", icon: "💰", color: "green" },
  { title: "SCSS Calculator", description: "Calculate returns on Senior Citizen Savings Scheme with yearly investment, fixed tenure, and interest rate.", category: "INVESTMENT", icon: "💰", color: "green" },
  { title: "Post Office MIS Calculator", description: "Calculate monthly income from Post Office Monthly Income Scheme with invested amount and interest rate.", category: "INVESTMENT", icon: "🏛️", color: "green" },
  { title: "Gratuity Calculator", description: "Calculate gratuity amount based on monthly salary and years of service.", category: "RETIREMENT", icon: "💰", color: "purple" },
  { title: "EPF Calculator", description: "Calculate your EPF maturity amount based on salary, age, contribution, and salary growth.", category: "RETIREMENT", icon: "🏦", color: "purple" },
  { title: "NSC Calculator", description: "Calculate National Savings Certificate maturity value, total investment, and interest earned.", category: "INVESTMENT", icon: "🏛️", color: "green" },
  { title: "Stock Average Calculator", description: "Calculate average stock price, total amount invested, and total shares across multiple purchases.", category: "INVESTMENT", icon: "📈", color: "green" },
  { title: "HRA Calculator", description: "Calculate taxable and exempted HRA based on salary, allowances, and rent paid.", category: "TAX", icon: "🏠", color: "orange" },
];
