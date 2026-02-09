import React from 'react';

const Footer: React.FC = () => {
  const partners = [
    { name: 'Acme', icon: '■' },
    { name: 'Orbit', icon: '○' },
    { name: 'Vertex', icon: '◆' },
    { name: 'Solis', icon: '●' }
  ];

  return (
    <footer className="w-full  bg-slate-100 dark:bg-black py-8 sm:py-8  border-t border-slate-100 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8"> {/* Increased px-2 to px-4 for better mobile gutters */}
        

        {/* Trusted By Section */}
        <div className="flex flex-col items-center space-y-8">
          {/* Reduced text size on mobile (text-[11px]) to prevent wrapping on small screens */}
          <p className="text-[11px] sm:text-[15px] font-bold text-slate-400 dark:text-slate-500 tracking-[0.2em] uppercase text-center">
            Trusted by teams at high-growth companies
          </p>
          
          
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 opacity-90 dark:opacity-90 grayscale hover:grayscale-0 transition-all duration-500">
  {partners.map((partner) => (
    <div
      key={partner.name}
      className="group flex items-center space-x-2 cursor-default transition-colors duration-300"
    >
      {/* Icon */}
      <span className="text-xl text-slate-600 dark:text-slate-300 group-hover:text-blue-800 dark:group-hover:text-blue-500 transition-colors duration-300">
        {partner.icon}
      </span>

      {/* Text */}
      <span className="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-200 group-hover:text-black dark:group-hover:text-white tracking-tight transition-colors duration-300">
        {partner.name}
      </span>
    </div>
  ))}
</div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;