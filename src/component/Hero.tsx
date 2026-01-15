import React from 'react';
import { ArrowRight, CheckCircle2, Globe, Zap, TrendingUp, PieChart } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full py-7 px-4 sm:px-14 lg:px-14 md:py-10 overflow-hidden bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
      {/* Background decorative glow - Adjusted size for mobile */}
      <div className="absolute top-0 right-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-blue-50/50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left Content: Mobile-first centering, LG-first left-align */}
        <div className="flex flex-col space-y-6 z-10 text-left items-start order-2 lg:order-1">
          <div className="inline-flex items-center space-x-2 bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 px-3 py-1 rounded-full w-fit">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></div>
            <span className="text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-widest uppercase">
              Global Finance Hub
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Master Your <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Financial Future
            </span>
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-lg max-w-md leading-relaxed">
            Access professional-grade calculators for mortgage, investment, and retirement planning. Make smarter decisions with accurate projections.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
            <button className="bg-slate-900 dark:bg-blue-600 text-white px-7 py-3.5 rounded-xl font-bold flex items-center justify-center group hover:bg-slate-800 dark:hover:bg-blue-700 transition-all shadow-lg cursor-pointer">
              Explore Tools 
              <span className="ml-2 w-6 h-6 bg-white rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-4 h-4 text-slate-900" />
              </span>
            </button>
            <button className="bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 px-7 py-3.5 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
              Documentation
            </button>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            {['Free Forever', 'Privacy Focused'].map((text) => (
              <div key={text} className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-slate-400 dark:text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Visual Card */}
        <div className="relative flex justify-center w-full order-1 lg:order-2 mt-8 lg:mt-0">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-2xl border border-white dark:border-slate-800 relative z-20 w-full max-w-[320px] sm:max-w-[440px] lg:-rotate-2 hover:rotate-0 transition-transform duration-500">
            
            <div className="flex justify-between items-start mb-6 sm:mb-8">
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Savings</p>
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">$424,500</h2>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2 sm:p-2.5 rounded-xl">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
              </div>
            </div>
            
            {/* Bar Graph: Hidden on very small screens, shown on sm+ */}
            <div className="flex items-end justify-between gap-1.5 sm:gap-3 h-24 sm:h-36 mb-8 sm:mb-10">
                {[35, 60, 40, 85, 55, 75, 45].map((h, idx) => (
                  <div 
                    key={idx} 
                    style={{ height: `${h}%` }} 
                    className="flex-1 bg-blue-500/90 hover:bg-blue-600 rounded-md sm:rounded-lg transition-all duration-300"
                  ></div>
                ))}
            </div>

            {/* Progress Bars */}
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" style={{ width: '75%' }}></div>
                </div>
                <span className="text-[10px] font-black text-blue-600 w-8">75%</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-300 dark:bg-blue-400 rounded-full" style={{ width: '50%' }}></div>
                </div>
                <span className="text-[10px] font-black text-blue-300 dark:text-blue-400 w-8">50%</span>
              </div>
            </div>
            
            {/* Floating Elements: Hidden or scaled for mobile to avoid overflow */}
            <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-10 bg-white dark:bg-slate-800 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-xl z-30 border border-slate-50 dark:border-slate-700">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 fill-amber-400" />
            </div>
            <div className="absolute top-1 -right-4 sm:-right-15 bg-white dark:bg-slate-800 p-2 sm:p-3 rounded-xl shadow-xl z-30 border border-slate-50 dark:border-slate-700">
      <PieChart className="w-6 h-6 sm:w-10 sm:h-10 text-indigo-600" />
    </div>
    <div className='relative overflow-visible top left-13 transform -translate-x-1/2'>
            <div className="absolute -bottom-10 left-4 sm:-bottom-10 sm:left-0 bg-white dark:bg-slate-800 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-2xl z-40 border border-slate-100 dark:border-slate-700 flex items-center gap-2 sm:gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-1 sm:p-1.5 rounded-lg">
                <Globe className="w-5 h-5 sm:w-7 sm:h-7 text-blue-500" />
              </div>
              </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;