import React from 'react';
import { Check , Minus , Plus , Briefcase } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useState } from 'react';


const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Basic",
      price: "0",
      desc: "Essential tools for personal finance.",
      button: "Get Started",
      isPopular: false,
      features: ["Access to all 12+ calculators", "Basic visual reports", "Mobile responsive", "No account needed"]
    },
    {
      name: "Pro",
      price: "9",
      desc: "Advanced analysis for serious planners.",
      button: "Start Free Trial",
      isPopular: true,
      features: ["Save & export PDF reports", "Ad-free experience", "Investment comparisons", "Priority support", "Historical data tracking"]
    },
    {
      name: "Team",
      price: "29",
      desc: "For financial advisors & teams.",
      button: "Contact Sales",
      isPopular: false,
      features: ["Everything in Pro", "White-label reports", "API Access", "Team management", "Custom branding"]
    }
  ];
  const comparisonFeatures = [
    { name: "Calculator Access", basic: "All 12+", pro: "All 12+", team: "All 12+" },
    { name: "Export to PDF", basic: null, pro: true, team: true },
    { name: "Ad-Free Experience", basic: null, pro: true, team: true },
    { name: "Data Persistence", basic: "Local Only", pro: "Cloud Sync", team: "Cloud Sync" },
    { name: "API Access", basic: null, pro: null, team: true },
    { name: "White-Label Reports", basic: null, pro: null, team: true },
  ];
  const renderCell = (value: any) => {
  if (value === true) return <Check className="mx-auto text-emerald-500" size={18} strokeWidth={3} />;
  if (value === null) return <Minus className="mx-auto text-slate-200 dark:text-slate-700" size={18} />;
  return value;
};
const faqs = [
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period."
    },
    {
      question: "Is my financial data secure?",
      answer: "Absolutely. We use bank-level encryption (AES-256) to protect your data. We never sell your personal information to third parties."
    },
    {
      question: "Do you offer discounts for students?",
      answer: "Yes! Students with a valid .edu email address can get 50% off the Pro plan. Contact our support team to apply."
    }
  ];

  const [selectedCard, setSelectedCard] = useState<string | null>(null);
const [activeButton, setActiveButton] = useState<string | null>(null);


  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 pb-1 font-sans text-slate-900 dark:text-white">
      <Navbar />
    <div className="min-h-screen bg-slate-100 dark:bg-[#0f172a] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-13">
        
        {/* Header matched */}
        <div className="text-center mb-20">
          <h2 className="text-6xl font-bold text-[#0f172a] dark:text-white mt-9">
            Simple, Transparent Pricing
          </h2>
          <p className="text-slate-500 dark:text-slate-300 text-lg max-w-2xl mx-auto mt-8">
            Choose the perfect plan for your financial journey. No hidden fees, cancel anytime.
          </p>
        </div>

        
        {/* Pricing Cards Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center ">
  {plans.map((plan) => {
    const isCardActive = selectedCard === plan.name;
    const isButtonActive = activeButton === plan.name;

    return (
      <div
        key={plan.name}
        onClick={() => setSelectedCard(plan.name)}
        className={`
          relative p-6 md:p-10 rounded-[2.5rem] border cursor-pointer min-h-[450px] md:min-h-[500px]
          transition-all duration-300 dark:border-white
          ${
            isCardActive
              ? "bg-white dark:bg-slate-900 border-blue-500 shadow-xl shadow-blue-500/20 scale-[1.05]"
              : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:-translate-y-1 hover:shadow-lg hover:border-blue-400"
          }
        `}
      >
        <h3 className="text-xl font-bold mb-4">{plan.name}</h3>

        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-4xl font-black">${plan.price}</span>
          <span className="text-slate-300">/month</span>
        </div>

        <p className="text-slate-500 text-sm mb-8">{plan.desc}</p>

        {/* BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation(); 
            setActiveButton(plan.name);
          }}
          className={`
            w-full py-4 rounded-2xl font-bold text-sm mb-10
            transition-all duration-300 active:scale-95
            ${
              isButtonActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-white"
            }
          `}
        >
          {plan.button}
        </button>

        <div className="space-y-4">
          {plan.features.map((feature) => (
            <div key={feature} className="flex items-start gap-3">
              <Check size={12} className="text-blue-600 mt-1" />
              <span className="text-sm text-slate-500">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    );
  })}
</div>


        {/* 2. Compare Features Table  */}
        <section className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0f172a] dark:text-white mb-4">Compare Features</h2>
            <p className="text-slate-500 dark:text-slate-300">Detailed breakdown of what's included in each plan.</p>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-300 dark:border-slate-800">
                  <th className="p-8 text-sm font-bold text-[#0f172a] dark:text-white">Features</th>
                  <th className="p-8 text-sm font-bold text-[#0f172a] dark:text-white text-center">Basic</th>
<th className="p-8 text-sm font-bold text-[#0f172a] dark:text-white text-center">Pro</th>
                  <th className="p-8 text-sm font-bold text-[#0f172a] dark:text-white text-center">Team</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {comparisonFeatures.map((feature, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-8 text-[14px] font-medium text-slate-700 dark:text-slate-400">
                      {feature.name}
                    </td>
                    
                    {/* Basic Column */}
                    <td className={`p-8 text-center text-[13px] text-slate-400 transition-colors duration-300 ${selectedCard === 'Basic' ? 'bg-blue-100 dark:bg-blue-900/50' : ''}`}>
                      {renderCell(feature.basic)}
                    </td>

{/* Pro Column */}
                    <td className={`p-8 text-center text-[13px] text-slate-500 dark:text-slate-400 transition-colors duration-300 ${selectedCard === 'Pro' ? 'bg-blue-100 dark:bg-blue-900/50' : ''}`}>
                      {renderCell(feature.pro)}
                    </td>

                    {/* Team Column */}
                    <td className={`p-8 text-center text-[13px] text-slate-500 dark:text-slate-400 transition-colors duration-300 ${selectedCard === 'Team' ? 'bg-blue-100 dark:bg-blue-900/50' : ''}`}>
                      {renderCell(feature.team)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="mt-20 max-w-6xl mx-auto px-1">
  <div className="text-center mb-15 ">
    <h2 className="text-3xl font-bold text-[#0f172a] dark:text-white mb-4">
      Frequently Asked Questions
    </h2>
  </div>

  <div className="space-y-7">
    {faqs.map((faq, index) => (
      <div
        key={index}
        className="w-full bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white rounded-3xl px-10 py-6 transition-all hover:border-blue-800"
      >
        <h4 className="text-lg font-bold text-[#0f172a] dark:text-white mb-3">
          {faq.question}
        </h4>
        <p className="text-slate-500 dark:text-slate-300 text-[15px] leading-relaxed">
          {faq.answer}
        </p>
      </div>
    ))}
  </div>
</section>


        {/* 4. Enterprise CTA Section (NEW) */}
        <section className="max-w-[1400px] mx-auto px-15 py-20 mb-0 mt-20 -mr-13 -ml-14 bg-white dark:bg-slate-900">
          <div className="bg-blue-50 dark:bg-blue-800/30 border border-slate-100 dark:border-blue-800 rounded-[3rem] px-25 md:py-20 text-center -mt-[27px] -mb-[27px]">
            <div className="w-16 h-16 bg-white dark:bg-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Briefcase className="text-blue-600" size={28} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] dark:text-white mb-6 tracking-tight">
              Need a custom enterprise solution?
            </h2>
            <p className="text-slate-500 dark:text-slate-300 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              We offer tailored API integrations, dedicated support, and custom calculator development for large financial institutions.
            </p>
            <button className="bg-[#3a6bde] dark:bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:opacity-90 transition-all shadow-xl shadow-slate-900/10 dark:shadow-blue-500/20">
              Get a Custom Quote
            </button>
          </div>
        </section>
      </div>
    </div>

  

    <Footer/>
    </div>
  );
};

export default Pricing;