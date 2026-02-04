import { useState, useEffect } from 'react';
import Navbar from '../component/Navbar';
import Hero from '../component/Hero';
import BrowseSection from '../component/BrowseSection';
import CalculatorCard from '../component/CalculatorCard';
import CalculatorListItem from '../component/CalculatorListItem';

import Footer from '../component/Footer';
import { calculatorData } from '../Data/calculatorData';
import { useNavigate } from 'react-router-dom';

const Calculators = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lastSelectedCalc, setLastSelectedCalc] = useState<any>(null);
  const [cameFromDetail, setCameFromDetail] = useState(false);



  const categoryMapping: { [key: string]: string } = {
    "Mortgage & Loan": "MORTGAGE",
    "Retirement": "RETIREMENT",
    "Investment": "INVESTMENT",
    "Business": "BUSINESS",
    "Tax": "TAX"
  };

  const filteredData = calculatorData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === categoryMapping[selectedCategory];
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const cameFromDetailFlag = localStorage.getItem('cameFromDetail');
    if (cameFromDetailFlag === 'true') {
      setCameFromDetail(true);
      localStorage.removeItem('cameFromDetail');
    }
  }, []);

  useEffect(() => {
    if (cameFromDetail) {
      if (lastSelectedCalc) {
        const element = document.getElementById(`card-${lastSelectedCalc.title.replace(/\s+/g, '-').toLowerCase()}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        const element = document.getElementById('browse-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setCameFromDetail(false);
    }
  }, [cameFromDetail, lastSelectedCalc]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <BrowseSection 
          viewMode={viewMode} setViewMode={setViewMode}
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
        />
        <div className="bg-slate-200 dark:bg-slate-900/50 w-full pb-20 px-4 md:px-12">
          <div className="max-w-7xl">
            {filteredData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-500 dark:text-slate-400 text-lg">Not found</p>
              </div>
            ) : (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {filteredData.map((item) => (
                    <CalculatorCard key={item.title} {...item} onClick={() => { navigate(`/calculator/${encodeURIComponent(item.title)}`); setLastSelectedCalc(item); }} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {filteredData.map((item) => (
                    <CalculatorListItem key={item.title} {...item} onClick={() => { navigate(`/calculator/${encodeURIComponent(item.title)}`); setLastSelectedCalc(item); }} />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Calculators;