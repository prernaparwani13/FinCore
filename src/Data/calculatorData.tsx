import React from 'react';
import { Car, TrendingUp, Receipt, Wallet, Home, Building2, Building, CreditCard, PiggyBank, BarChart3, Calculator, Briefcase } from 'lucide-react';

export interface CalculatorItem {
  title: string;
  description: string;
  category: "MORTGAGE" | "INVESTMENT" | "BUSINESS" | "RETIREMENT" | "TAX";
  icon: React.ReactNode;
  color: string;
}

export const calculatorData: CalculatorItem[] = [
  { title: "Auto Loan", description: "Estimate your monthly car loan payments and total interest payable over the loan term.", category: "MORTGAGE", icon: <Car className="w-6 h-6" />, color: "blue" },

  { title: "Compound Interest", description: "See how your investment grows over time with the power of compounding.", category: "INVESTMENT", icon: <TrendingUp className="w-6 h-6" />, color: "green" },

  { title: "FD Calculator", description: "Check the maturity value and interest earned on your fixed deposit.", category: "INVESTMENT", icon: <TrendingUp className="w-6 h-6" />, color: "green" },

  { title: "GST Calculator", description: "Find GST amount and final price for both inclusive and exclusive tax values.", category: "TAX", icon: <Receipt className="w-6 h-6" />, color: "orange" },

  { title: "Gratuity Calculator", description: "Estimate the gratuity amount based on your salary and years of service.", category: "RETIREMENT", icon: <Wallet className="w-6 h-6" />, color: "purple" },

  { title: "Inflation Calculator", description: "Understand how inflation affects the future value of your money.", category: "INVESTMENT", icon: <TrendingUp className="w-6 h-6" />, color: "green" },

  { title: "Loan Amortization", description: "View a detailed breakdown of principal and interest payments over time.", category: "MORTGAGE", icon: <CreditCard className="w-6 h-6" />, color: "blue" },

  { title: "Lumpsum Calculator", description: "Project the future value of a one-time investment over a selected period.", category: "INVESTMENT", icon: <Wallet className="w-6 h-6" />, color: "green" },

  { title: "Mortgage Payment", description: "Estimate your home loan EMIs including taxes, insurance, and PMI.", category: "MORTGAGE", icon: <Home className="w-6 h-6" />, color: "blue" },

  { title: "Mutual Funds Returns", description: "Track potential returns and growth of your mutual fund investments.", category: "INVESTMENT", icon: <BarChart3 className="w-6 h-6" />, color: "green" },

  { title: "NPS Calculator", description: "Get an estimate of your NPS corpus, returns, and required annuity.", category: "RETIREMENT", icon: <Building2 className="w-6 h-6" />, color: "purple" },

  { title: "NSC Calculator", description: "Check maturity amount and interest earned on NSC.", category: "INVESTMENT", icon: <Building className="w-6 h-6" />, color: "green" },

  { title: "PPF Calculator", description: "Plan your Public Provident Fund savings with projected returns.", category: "INVESTMENT", icon: <Building2 className="w-6 h-6" />, color: "green" },

  { title: "Post Office MIS Calculator", description: "Estimate the monthly income generated from the Post Office MIS.", category: "INVESTMENT", icon: <Building className="w-6 h-6" />, color: "green" },

  { title: "RD Calculator", description: "Project returns from recurring deposits with regular.", category: "INVESTMENT", icon: <Wallet className="w-6 h-6" />, color: "green" },

  { title: "Retirement Planner", description: "Plan your savings strategy to achieve your retirement goals comfortably.", category: "RETIREMENT", icon: <PiggyBank className="w-6 h-6" />, color: "purple" },

  { title: "ROI Calculator", description: "Measure the profitability and performance of your investments", category: "BUSINESS", icon: <BarChart3 className="w-6 h-6" />, color: "purple" },

  { title: "SCSS Calculator", description: "Estimate returns from the Senior Citizen Savings Scheme over its fixed.", category: "INVESTMENT", icon: <Wallet className="w-6 h-6" />, color: "green" },

  { title: "Simple Interest", description: "Determine interest earned based on principal, rate, and time period.", category: "INVESTMENT", icon: <Calculator className="w-6 h-6" />, color: "green" },

  { title: "SIP Calculator", description: "Visualize wealth creation through systematic monthly investments.", category: "INVESTMENT", icon: <TrendingUp className="w-6 h-6" />, color: "green" },

  { title: "SSY Calculator", description: "Plan long-term savings for a girl child with projected SSY maturity benefits.", category: "INVESTMENT", icon: <PiggyBank className="w-6 h-6" />, color: "green" },

  { title: "Stock Average Calculator", description: "Find the average purchase price and total holdings across multiple stocks.", category: "INVESTMENT", icon: <TrendingUp className="w-6 h-6" />, color: "green" },

  { title: "SWP Calculator", description: "Estimate withdrawals and remaining balance under a SWP.", category: "INVESTMENT", icon: <Wallet className="w-6 h-6" />, color: "green" },

  { title: "Salary Calculator", description: "Break down your CTC into take-home salary, deductions, and net income.", category: "BUSINESS", icon: <Briefcase className="w-6 h-6" />, color: "purple" },
];
