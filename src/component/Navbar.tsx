import React from 'react';
import { Sun, Moon , ChevronDown } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { Link , useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = ['Solutions', 'Product', 'Pricing', 'Resources'];

  return (
    
    <nav className="flex items-center justify-between px-9 sm:px-9 md:px-9 lg:px-9 py-3.5 sm:py-3.5  bg-white dark:bg-black border-b border-gray-100 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      
      <div className="flex items-center  gap-10">
        {/* Logo Section */}
        <div
          className=" absolute top-0 left-4 sm:left-6 lg:left-15  flex items-center gap-2.5 sm:gap-3 cursor-pointer group" onClick={() => window.location.href = '/'}>
          
          <div className=" mt-[8px] w-9 h-9 sm:w-10 sm:h-10 bg-slate-900 dark:bg-slate-100 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 active:scale-95">
            <span className="text-white dark:text-slate-900 font-black text-lg sm:text-xl">F</span>
          </div>
          
          
          <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-[8px]">
            FinCore
          </span>
        </div>
      </div>
      {/* Navigation Links */}
<div className="hidden md:flex items-center gap-10 pb-1">
  {navLinks.map((link) => (
    <Link
      key={link}
      // This creates paths like /products, /solutions, etc.
      to={`/${link.toLowerCase()}`} 
      className={`text-[15px] font-medium transition-all duration-200 border-b-2 ${
        location.pathname === `/${link.toLowerCase()}`
          ? 'text-slate-900 dark:text-slate-100 border-slate-900 dark:border-slate-100'
          : 'text-slate-500 border-transparent hover:text-slate-900 dark:hover:text-slate-100'
      }`}
    >
      {link}
    </Link>
  ))}
</div>
      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        
        <button
  onClick={toggleTheme}

  /* ✅ Fixed width & height = exactly 40px */
  className="absolute top-2 right-0 left-295
             w-10 h-10
             flex items-center justify-center
             rounded-full
             bg-slate-50 dark:bg-slate-800
             hover:bg-slate-100 dark:hover:bg-slate-700
             transition-all duration-200
             active:scale-90
             border border-slate-100 dark:border-slate-700
             cursor-pointer"

  aria-label="Toggle theme"
>
  {theme === 'light' ? (
    <Moon className="w-5 h-5 text-slate-700" />
  ) : (
    <Sun className="w-5 h-5 text-amber-400" />
  )}
</button>

      </div>
    </nav>
  );
};

export default Navbar;