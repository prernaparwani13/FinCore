import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import CalculatorDetail from '../component/CalculatorDetail';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const categoryHeadings: { [key: string]: string[] } = {
    "homebuyers": ["Mortgage", "Loan Amortization", "Auto Loan"],
    "investors": ["Compound Interest", "Retirement Planner", "Simple Interest"],
    "students": ["Auto Loan", "Simple Interest", "Compound Interest"],
    "business": ["ROI", "GST"],
  };

  const categoryTitles: { [key: string]: string } = {
    "homebuyers": "For Homebuyers",
    "investors": "For Investors",
    "students": "For Students",
    "business": "For Business",
  };

  const headings = category ? categoryHeadings[category.toLowerCase()] : [];
  const title = category ? categoryTitles[category.toLowerCase()] : '';

  // Mapping from heading to calculator title in CalculatorDetail
  // Ensure these values match the keys in CALC_CONFIGS exactly
const headingToCalcTitle: { [key: string]: string } = {
  "Mortgage": "Mortgage Payment",
  "Loan Amortization": "Loan Amortization",
  "Auto Loan": "Auto Loan",
  "Compound Interest": "Compound Interest",
  "Retirement Planner": "Retirement Planner",
  "Simple Interest": "Simple Interest", 
  "ROI": "ROI Calculator",             
  "GST": "GST Calculator",              
};

  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);

  useEffect(() => {
    // Set default calculator based on category
    if (category && headings.length > 0) {
      const defaultCalc = headingToCalcTitle[headings[0]];
    setSelectedCalculator(defaultCalc);

    }
  }, [category]);

  const handleCalculatorClick = (heading: string) => {
    const newCalcTitle = headingToCalcTitle[heading];
  console.log("Switching to:", newCalcTitle); 
  setSelectedCalculator(newCalcTitle);
  };

  const handleBack = () => {
    if (category === 'homebuyers' || category === 'investors' || category === 'students' || category === 'business') {
      navigate('/Solutions');
    } else if (category && headings.length > 0) {
      setSelectedCalculator(headingToCalcTitle[headings[0]]);
    } else {
      setSelectedCalculator(null);
    }
  };

  return (
    <div className="w-full bg-white font-sans text-slate-900">
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 pb-1 font-sans text-slate-900 dark:text-white">
        <Navbar />
        <section className="pt-8 pb-8 text-center">
          <h1 className="text-6xl font-bold mb-6 text-slate-900 dark:text-white">{title}</h1>
          <p className="text-slate-500 dark:text-slate-300 text-lg">Explore the calculators tailored for you.</p>
        </section>
        <section className={`max-w-[1500px] mx-auto px-4 ${selectedCalculator ? 'mb-8' : 'mb-32'}`}>
          <div className="flex justify-center gap-3 mr-195">
            {headings.map((heading, i) => (
              <div
                key={i}
                onClick={() => handleCalculatorClick(heading)}
                className={`px-4 md:px-5 py-2.5 rounded-full text-sm font-bold cursor-pointer transition-all  ${
                  selectedCalculator === headingToCalcTitle[heading]
                    ? 'bg-blue-100 dark:bg-blue-600 text-white shadow-lg hover:bg-slate-100 dark:hover:bg-blue-200'
                    : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-white border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-500'
                }`}
              >
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{heading}</h4>
              </div>
            ))}
          </div>
        </section>
       {selectedCalculator && (
  <div className="mt-8">
    <CalculatorDetail
      key={selectedCalculator}
      calc={{ title: selectedCalculator, category: title }}
      onBack={handleBack}
      showNavbar={false}
    />
  </div>
)}
        <Footer />
      </div>
    </div>
  );
};

export default CategoryPage;  
