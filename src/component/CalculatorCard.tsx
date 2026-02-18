import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CalculatorCardProps {
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ 
  title, 
  description, 
  category, 
  icon, 
  onClick 
}) => {
  return (
    <div id={`card-${title.replace(/\s+/g, '-').toLowerCase()}`} onClick={onClick} className="group relative w-full bg-white dark:bg-slate-900/50 rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-transparent hover:border-blue-600 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer overflow-hidden ring-1 ring-slate-100 dark:ring-slate-800 min-h-[160px] sm:min-h-[180px]">
      <div className="flex justify-between items-start mb-3 sm:mb-4">
       
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center text-lg sm:text-xl text-blue-600 transition-colors group-hover:bg-blue-50 flex-shrink-0">
          {icon}
        </div>
        
       
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-all flex-shrink-0 group-hover:translate-x-1">
          <ChevronRight size={18} className="sm:w-5 sm:h-5" />
        </div>
      </div>

      <div className="flex-grow">
       
        <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mb-1 tracking-tight text-left line-clamp-1">
  {title}
</h3>

        
        
        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-normal leading-relaxed line-clamp-2 text-left">
          {description}
        </p>
      </div>

      <div className="mt-4 flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-800/50">
       
        <span className="text-[10px] font-bold font-sans uppercase tracking-widest text-blue-600">
  {category}
</span>

        <span className="inline-block text-[10px] font-bold uppercase
bg-slate-50 dark:bg-slate-800
text-slate-500 dark:text-slate-300
px-2 py-1 rounded-md">
  Free Tool
</span>

      </div>
    </div>
  );
};

export default CalculatorCard;