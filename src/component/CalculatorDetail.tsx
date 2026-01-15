import Navbar from './Navbar';
import React, { useState } from 'react';
import {
  ArrowLeft, Info, BookOpen,
  FileText, Zap, CircleCheck
} from 'lucide-react';

interface Props {
  calc?: any;
  onBack: () => void;
}

const CalculatorDetail: React.FC<Props> = ({ calc, onBack }) => {
  const [monthlyInv, setMonthlyInv] = useState<string>('500');
  const [interest, setInterest] = useState<string>('8');
  const [years, setYears] = useState<string>('10');
  const [isINR, setIsINR] = useState(false);

  // Calculation Logic
  const monthlyInvNum = Number(monthlyInv) || 500;
  const interestNum = Number(interest) || 8;
  const yearsNum = Number(years) || 10;
  const ratePerMonth = (interestNum / 100) / 12;
  const months = yearsNum * 12;
  
  const totalValue = Math.round(
    monthlyInvNum * ((Math.pow(1 + ratePerMonth, months) - 1) / ratePerMonth) * (1 + ratePerMonth)
  );

  const totalInvested = monthlyInvNum * months;
  const estReturns = totalValue - totalInvested;

  const formatCurrency = (amount: number) => {
    const convertedAmount = isINR ? amount * 83 : amount;
    const symbol = isINR ? '₹' : '$';
    return `${symbol} ${convertedAmount.toLocaleString()}`;
  };

  const circumference = 2 * Math.PI * 76;
  const returnPercentage = (estReturns / totalValue) * 100;
  const offset = circumference - (returnPercentage / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 pb-20 font-sans text-slate-900 dark:text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header: Improved spacing for mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-10 gap-4 mt-6">
          <div className="flex items-center gap-3 sm:gap-6">
            <button 
              onClick={onBack} 
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 hover:border-blue-500 cursor-pointer flex items-center justify-center transition-all"
            >
              <ArrowLeft size={18} className="text-slate-600 dark:text-slate-400" />
            </button>
            <div className="flex flex-col items-start text-left">
              <div className="text-blue-600 dark:text-blue-400 text-[10px] sm:text-[14px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] mb-1">
                {calc?.category || "INVESTMENT"}
              </div>
              <h1 className="text-xl sm:text-2xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                {calc?.title || "SIP Calculator"}
              </h1>
            </div>
          </div>
        </div>

        {/* Main Grid: Stacked on mobile, 12-col on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 mb-12">
          
          {/* Inputs Section */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="text-slate-400 text-[10px] mb-8 font-bold uppercase tracking-widest text-left">
              <Info size={14} className="inline mr-2" /> Adjust sliders or type values
            </div>

            <div className="space-y-10 sm:space-y-12">
              {/* Monthly Investment Input */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                  <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 sm:mb-0">Monthly Investment</label>
                  <div className="flex items-center bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg font-black text-sm border border-blue-100 dark:border-blue-800/50" onClick={() => setMonthlyInv('')}>
                    <span className="mr-1">$</span>
                    <input
                      type="number"
                      min="100"
                      max="10000"
                      value={monthlyInv}
                      onChange={(e) => setMonthlyInv(e.target.value)}
                      onBlur={(e) => {
                        const val = Number(e.target.value);
                        if (val < 100) setMonthlyInv('100');
                        else if (val > 10000) setMonthlyInv('10000');
                        else setMonthlyInv(e.target.value);
                      }}
                      className="bg-transparent w-12 outline-none border-none p-0 focus:ring-0"
                    />
                  </div>
                </div>
                <input
                  type="range" min="100" max="10000" step="100"
                  value={monthlyInv}
                  onChange={(e) => setMonthlyInv(e.target.value)}
                  className="w-full h-2 sm:h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-300 mt-2 uppercase"><span>$100</span><span>$10k</span></div>
              </div>

              {/* Interest Rate Input */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                  <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 sm:mb-0">Expected Rate (p.a)</label>
                  <div className="flex items-center bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg font-black text-sm border border-emerald-100 dark:border-emerald-800/50" onClick={() => setInterest('')}>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={interest}
                      onFocus={() => setInterest('')}
                      onChange={(e) => setInterest(e.target.value)}
                      onBlur={(e) => {
                        const val = Number(e.target.value);
                        if (val < 1) setInterest('1');
                        else if (val > 30) setInterest('30');
                        else setInterest(e.target.value);
                      }}
                      className="bg-transparent w-8 outline-none border-none p-0 focus:ring-0 text-right"
                    />
                    <span className="ml-1">%</span>
                  </div>
                </div>
                <input
                  type="range" min="1" max="30" step="0.5"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full h-2 sm:h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-300 mt-2 uppercase"><span>1%</span><span>30%</span></div>
              </div>

              {/* Duration Input */}
              <div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                  <label className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 sm:mb-0">Time period</label>
                  <div className="flex items-center bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg font-black text-sm border border-indigo-100 dark:border-indigo-800/50" onClick={() => setYears('')}>
                    <input
                      type="number"
                      min="1"
                      max="40"
                      value={years}
                      onFocus={() => setYears('')}
                      onChange={(e) => setYears(e.target.value)}
                      onBlur={(e) => {
                        const val = Number(e.target.value);
                        if (val < 1) setYears('1');
                        else if (val > 40) setYears('40');
                        else setYears(e.target.value);
                      }}
                      className="bg-transparent w-6 outline-none border-none p-0 focus:ring-0 text-right"
                    />
                    <span className="ml-1 text-[12px] uppercase">Yrs</span>
                  </div>
                </div>
                <input
                  type="range" min="1" max="40"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full h-2 sm:h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-300 mt-2 uppercase"><span>1 Yr</span><span>40 Yrs</span></div>
              </div>
            </div>
          </div>

          {/* Results Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">EXPECTED TOTAL VALUE</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 break-all">{formatCurrency(totalValue)}</h2>
              <p className="text-emerald-500 font-bold text-xs mb-4 italic">Projection for {years} years</p>

              {/* Donut Chart: Scale for mobile */}
              <div className="relative w-36 h-36 sm:w-48 sm:h-48 mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 192 192">
                  <circle cx="96" cy="96" r="76" fill="transparent" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="16" />
                  <circle
                    cx="96" cy="96" r="76" fill="transparent" stroke="#3b82f6" strokeWidth="16"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-in-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">EST. GAIN</p>
                  <p className="text-lg sm:text-xl font-black">{returnPercentage.toFixed(1)}%</p>
                </div>
              </div>

              {/* Currency Toggle: Center aligned for mobile */}
              <div className="w-full space-y-3">
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsINR(!isINR)}
                    className="px-4 py-2 rounded-full text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                  >
                    {isINR ? 'USD ($)' : 'INR (₹)'}
                  </button>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                  <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-slate-300" /><span className="text-xs font-bold text-slate-500">Invested</span></div>
                  <span className="text-sm font-black">{formatCurrency(totalInvested)}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#f8fafc] dark:bg-slate-800/50 rounded-2xl border border-slate-50 dark:border-slate-800">
                  <div className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-500" /><span className="text-xs font-bold text-slate-500">Returns</span></div>
                  <span className="text-sm font-black text-blue-600">{formatCurrency(estReturns)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Sections: Grid 1 col on mobile, 2 col on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          <div className="space-y-6 md:space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-8 border border-slate-100 dark:border-slate-800 text-left">
              <h3 className="font-bold mb-4 flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><BookOpen size={18} className="text-blue-600" /></div>
                Calculation Formula
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                This SIP (Systematic Investment Plan) calculator uses the future value of an annuity formula:
              </p>
              <div className="bg-slate-50 dark:bg-slate-950 p-3 sm:p-3 rounded-2xl border border-slate-100 dark:border-slate-800 text-left overflow-x-auto max-w-full">
                {/* LaTeX Formula Rendering */}
                <span className="text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm whitespace-nowrap inline-block min-w-max">
                  FV = P × [(1 + r)^n - 1] / r × (1 + r)
                </span>
              </div>
              <p className='text-slate-400 text-[11px] mt-4 leading-relaxed'>
                <b>P</b> = Monthly amount, <b>i</b> = Monthly rate, <b>n</b> = Months
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-8 border border-slate-100 dark:border-slate-800 text-left">
              <h3 className="font-bold mb-6 flex items-center gap-3">
                <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg"><Zap size={18} className="text-emerald-600" /></div>
                Best Use Cases
              </h3>
              <div className="space-y-4 text-left">
                {[
                  "Visualizing the power of compounding over 10-20 years.",
                  "Retirement planning through steady monthly savings.",
                  "Educational fund projection for children."
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CircleCheck size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 sm:p-10 border border-slate-100 dark:border-slate-800 text-left">
              <h3 className="font-bold mb-8 flex items-center gap-3">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg"><FileText size={18} className="text-indigo-600" /></div>
                Definitions
              </h3>
              <div className="space-y-8 text-left">
                {[
                  {
                    title: "Principal Amount",
                    desc: "The total sum of your monthly contributions over the duration of the investment."
                  },
                  {
                    title: "Compounding",
                    desc: "The process where the interest earned on an investment earns interest itself over time."
                  },
                  {
                    title: "Inflation Impact",
                    desc: "While projections show nominal value, inflation reduces the purchasing power of that future sum."
                  }
                ].map((term, i) => (
                  <div key={i}>
                    <p className="font-black text-blue-600 dark:text-blue-400 text-sm mb-2 uppercase tracking-wide text-left">{term.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{term.desc}</p>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorDetail;