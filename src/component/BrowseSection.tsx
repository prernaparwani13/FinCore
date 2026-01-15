import React from 'react';
import { Search, LayoutGrid, List, ChevronDown } from 'lucide-react';

interface BrowseSectionProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = ["All", "Mortgage & Loans", "Retirement", "Investment", "Business", "Tax & Salary"];

const BrowseSection: React.FC<BrowseSectionProps> = ({
  viewMode, setViewMode, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory
}) => {
  return (
    <>
    <style>
      {`
        select option {
          background: linear-gradient(to right, #ffffff, #dbeafe);
          color: #1e293b;
          padding: 16px 32px;
          font-weight: 700;
          font-size: 16px;
          border-radius: 12px;
          transition: all 0.3s ease;
          cursor: pointer;
          margin: 4px 0;
        }
        select option:hover {
          background: linear-gradient(to right, #bfdbfe, #d8b4fe);
          transform: scale(1.02);
        }
        select {
          border-radius: 16px;
        }
        select:focus {
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
        }
        @media (prefers-color-scheme: dark) {
          select option {
            background: linear-gradient(to right, #334155, #475569);
            color: #ffffff;
          }
          select option:hover {
            background: linear-gradient(to right, #2563eb, #7c3aed);
          }
          select:focus {
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5);
          }
        }
      `}
    </style>
    <div className="w-full bg-slate-200 dark:bg-slate-900/50 pt-12 sm:pt-16 pb-8 px-3 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-8 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl  md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mr-10">Browse Calculators</h2>
            <p className="text-slate-500 dark:text-slate-300 font-medium mt-2 text-sm:text-base">Find the perfect tool for your next financial move.</p>
            <div className="relative w-full sm:max-w-sm  md:max-w-md mt-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search calculators..."
                className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl py-3 pl-12 pr-4 shadow-sm focus:ring-4 focus:ring-blue-500/5 outline-none cursor-text dark:text-white text-sm text-left"
              />
              <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-300" size={20} />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Category buttons for medium and larger screens */}
          <div className="hidden md:flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 md:px-5 py-2.5 rounded-full text-sm font-bold transition-all  ${
                  selectedCategory === cat
                    ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-300 border border-slate-100 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Category dropdown for small screens */}
          <div className="md:hidden relative w-[100px] sm:max-w-">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800 dark:to-purple-800 border border-blue-300 dark:border-blue-500 rounded-2xl py-3 sm:py-4 px-4 sm:px-6 shadow-xl hover:shadow-2xl focus:ring-4 focus:ring-blue-500/20 outline-none cursor-pointer dark:text-white text-slate-900 appearance-none transition-all duration-300 [&>option]:bg-gradient-to-r [&>option]:from-white [&>option]:to-blue-50 [&>option]:dark:from-slate-700 [&>option]:dark:to-slate-600 [&>option]:text-slate-900 [&>option]:dark:text-white [&>option]:hover:bg-gradient-to-r [&>option]:hover:from-blue-200 [&>option]:hover:to-purple-200 [&>option]:dark:hover:from-blue-600 [&>option]:dark:hover:to-purple-600 [&>option]:py-3 [&>option]:px-6 [&>option]:font-semibold [&>option]:rounded-lg [&>option]:transition-all [&>option]:duration-300 [&>option]:cursor-pointer"
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                  className="bg-gradient-to-r from-white to-blue-50 dark:from-slate-700 dark:to-slate-600 text-slate-900 dark:text-white hover:bg-gradient-to-r hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-600 dark:hover:to-purple-600 py-3 px-6 font-semibold rounded-lg transition-all duration-200 cursor-pointer"
                >
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 sm:right-4 top-1/2  -translate-y-1/2 text-slate-500 dark:text-slate-300 pointer-events-none" size={20} />
          </div>

          {/* Toggle buttons */}
          <div className="relative">
  {/* Toggle Button – moved to upper right */}
  <div className="
    absolute
    -top-8
    -right-0
    flex items-center
    bg-white dark:bg-slate-800
    border border-slate-100 dark:border-slate-700
    rounded-xl
    p-1
    shadow-sm
  ">
    <button
      onClick={() => setViewMode('grid')}
      className={`p-2 rounded-lg transition-all cursor-pointer ${
        viewMode === 'grid'
          ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
          : 'text-slate-400 hover:text-slate-600'
      }`}
    >
      <LayoutGrid size={18} />
    </button>

    <button
      onClick={() => setViewMode('list')}
      className={`p-2 rounded-lg transition-all cursor-pointer ${
        viewMode === 'list'
          ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
          : 'text-slate-400 hover:text-slate-600'
      }`}
    >
      <List size={18} />
    </button>
  </div>
</div>

        </div>
      </div>
    </div>
    </>
  );
};

export default BrowseSection;
