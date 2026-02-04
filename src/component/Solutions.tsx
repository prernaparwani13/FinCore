import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, TrendingUp, GraduationCap, Briefcase, Target, BarChart3, ShieldCheck, Users, Star, Shield } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';


const Solutions: React.FC = () => {
  const navigate = useNavigate();

  const topCards = [
    { title: "For Homebuyers", desc: "Navigate mortgages, amortization, and affordability with confidence.", icon: <Home size={40} /> },
    { title: "For Investors", desc: "Project returns, understand inflation, and plan for long-term wealth.", icon: <TrendingUp size={40} /> },
    { title: "For Students", desc: "Manage loans, plan savings, and understand the cost of education.", icon: <GraduationCap size={40} /> },
    { title: "For Business", desc: "Calculate ROI, break-even points, and profit margins effectively.", icon: <Briefcase size={40} /> },
  ];

  const features = [
    { title: "Precision Accuracy", desc: "Algorithms verified by financial experts for penny-perfect calculations.", icon: <Target size={40} className="text-blue-600" /> },
    { title: "Visual Clarity", desc: "We turn complex data into intuitive, easy-to-understand charts and graphs.", icon: <BarChart3 size={40} className="text-blue-600" /> },
    { title: "Private & Secure", desc: "Your financial data stays on your device. We prioritize privacy above all else.", icon: <ShieldCheck size={40} className="text-blue-600" /> },
  ];

  const stats = [
    { value: "5M+", label: "CALCULATIONS RUN" },
    { value: "150k+", label: "ACTIVE USERS" },
    { value: "99.9%", label: "UPTIME" },
    { value: "4.9/5", label: "APP STORE RATING" },
  ];

  return (
    <div className="w-full bg-white font-sans text-slate-900">
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 pb-2 font-sans text-slate-900 dark:text-white">
      <Navbar />
      {/* Header Section */}
      <section className="pt-10 pb-16 text-center">
        <h1 className="text-6xl font-bold mb-6 text-slate-900 dark:text-white">Solutions</h1>
        <p className="text-slate-500 dark:text-slate-300 text-lg">Tailored financial guidance for every stage of your life.</p>
      </section>

      {/* Top 4-Column Grid */}
      <section className="max-w-[1200px] mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topCards.map((card, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 text-center flex flex-col items-center hover:shadow-md dark:hover:shadow-slate-800/50 transition-shadow border border-slate-100 dark:border-slate-800 cursor-pointer"
              onClick={() => navigate(`/category/${card.title.toLowerCase().replace('for ', '')}`)}
            >
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 text-slate-600 dark:text-slate-400">
                {card.icon}
              </div>
              <h3 className="font-bold text-2xl mb-4 text-slate-900 dark:text-white">{card.title}</h3>
              <p className="text-slate-500 dark:text-slate-300 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>



      {/* Why Choose Section */}
      <section className="text-center mb-18">
        <h2 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white">Why Choose FinCore?</h2>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-15 h-15 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h4 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{f.title}</h4>
              <p className="text-slate-500 dark:text-slate-300 text-sm leading-relaxed max-w-[360px]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise Feature Card */}
      <section className="max-w-[1500px] max-h-[1400px] mx-auto px-4 md:px-8 lg:px-13 py-20 mb-32 bg-white dark:bg-slate-900">
        <div className="relative bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-[2rem] p-6 md:p-14 overflow-hidden flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-md z-10">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold tracking-wider rounded-md mb-6 uppercase">
              Enterprise Solution
            </span>
            <h2 className="text-3xl font-bold mb-6">Financial Advisors & Teams</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Empower your clients with visual reports and real-time projections. Our white-label solution lets you brand every calculator with your firm's identity.
            </p>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors">
              Schedule Demo
            </button>
          </div>
          
          {/* Decorative Illustration Elements */}
          <div className="relative mt-12 md:mt-0">
  {/* Main Circle - Uses Flex to perfectly center the Shield */}
  <div className="w-64 h-64 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center relative shadow-inner">
    
    {/* Shield Icon - Now perfectly centered */}
    <div className="flex items-center justify-center text-white dark:text-white">
      <Shield size={120} strokeWidth={2.5} />
    </div>

    {/* Floating Badge: Users (Top Right) */}
    <div className="absolute -top-6 -right-2 w-14 h-14 bg-white dark:bg-slate-800 rounded-xl shadow-xl flex items-center justify-center text-slate-900 dark:text-white border border-slate-100 dark:border-slate-700">
      <Users size={24} />
    </div>

    {/* Floating Badge: Star (Bottom Left) */}
    <div className="absolute -bottom-6 -left-2 w-14 h-14 bg-white dark:bg-slate-800 rounded-xl shadow-xl flex items-center justify-center text-amber-400 border border-slate-100 dark:border-slate-700">
      <Star size={30} fill="currentColor" />
    </div>
    
  </div>
</div>
        </div>
      </section>
          {/* Stats Footer */}
      <div className="border-t border-white dark:border-slate-800 py-10 bg-slate-100 dark:bg-slate-900/50 -mt-40" >
  {/* Container width adjusted to max-w-7xl for a wider, more airy feel like the screenshot */}
  <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-y-16 lg:gap-x-8 text-center">
    {stats.map((s, i) => (
      <div key={i} className="flex flex-col items-center">
        {/* Increased to text-6xl and font-black for that heavy, impactful look */}
        <div className="text-5xl md:text-5xl font-black text-[#0f172a] dark:text-white tracking-tight mb-7">
          {s.value}
        </div>
        {/* Adjusted tracking and font weight for the small uppercase labels */}
        <div className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 tracking-[0.25em] uppercase whitespace-nowrap">
          {s.label}
        </div>
      </div>

    ))}
  </div>
</div>
      </div>

      <hr className="border-slate-200 dark:border-slate-700" />

      <Footer/>
    </div>
    
  );
};

export default Solutions;
