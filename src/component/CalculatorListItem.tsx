import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CalculatorListItemProps {
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const CalculatorListItem: React.FC<CalculatorListItemProps> = ({ 
  title, 
  description, 
  category, 
  icon, 
  onClick 
}) => {
  return (
    <div
      id={`card-${title.replace(/\s+/g, '-').toLowerCase()}`}
      className="group bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 md:p-6 border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center md:justify-between cursor-pointer gap-4"
      onClick={onClick}
    >
      {/* Left Section: Icon & Text */}
      <div className="flex items-center gap-4 sm:gap-6 pointer-events-none">
        {/* Icon: Scales slightly from mobile to desktop */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-xl sm:text-2xl flex-shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
          {icon}
        </div>
        
        <div className="flex-grow min-w-0">
          {/* Title: Truncates on very small screens to prevent layout break */}
          <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white group-hover:text-blue-600 transition-colors text-left truncate sm:whitespace-normal">
            {title}
          </h3>
          {/* Description: 1 line on mobile, 2 lines max on larger screens */}
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium line-clamp-1 md:line-clamp-2 text-left">
            {description}
          </p>
        </div>
      </div>

      {/* Right Section: Category & Arrow */}
      <div className="flex items-center justify-between md:justify-end md:gap-8 pointer-events-none border-t border-slate-50 md:border-t-0 pt-3 md:pt-0 dark:border-slate-800">
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-blue-500/60">
          {category}
        </span>
        
        {/* Visual Indicator: Arrow moves right on hover */}
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-300 dark:text-slate-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:translate-x-1 transition-all">
          <ChevronRight size={18} className="sm:w-5 sm:h-5" />
        </div>
      </div>
    </div>
  );
};

export default CalculatorListItem;