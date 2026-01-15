import React from 'react';
import { Layout, Code2, Smartphone, Layers, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const Product: React.FC = () => {
  const products = [
    {
      title: "FinCore Web",
      description: "The complete suite of 15+ financial calculators for personal use.",
      icon: <Layout className="w-6 h-6 text-blue-500" />,
      iconBg: "bg-blue-50",
    },
    {
      title: "FinCore API",
      description: "Integrate our calculation engine directly into your own applications.",
      icon: <Code2 className="w-6 h-6 text-emerald-400" />,
      iconBg: "bg-emerald-50",
    },
    {
      title: "Mobile App",
      description: "Take your financial planning on the go with our iOS and Android apps.",
      icon: <Smartphone className="w-6 h-6 text-purple-500" />,
      iconBg: "bg-purple-50",
    },
    {
      title: "Widget Library",
      description: "Embeddable calculators for your blog or business website.",
      icon: <Layers className="w-6 h-6 text-amber-400" />,
      iconBg: "bg-amber-50",
    },
  ];

  return (
     <div className="min-h-screen bg-slate-100 dark:bg-slate-950 pb-1 font-sans text-slate-900 dark:text-white">
      <Navbar />
    <section className="py-10 bg-slate-100 dark:bg-slate-950 flex flex-col items-center">
      {/* Container with exact side margins using max-w and px */}
      <div className="w-full max-w-[1000px] px-1 md:px-1 lg:px-1">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-6xl font-bold text-[#0f172a] dark:text-white mb-6">
            Our Products
          </h2>
          <p className="text-slate-500 text-lg font-normal dark:text-slate-300">
            Powerful tools designed for individuals, developers, and businesses.
          </p>
        </div>

        {/* Product Grid - 2 columns with reduced card size via padding/gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-18 -mx-20">
          {products.map((product) => (
            <div
              key={product.title}
              // Fixed aspect ratio and rounded corners from screenshot
              className="group  p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:scale-105 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-500 transition-all flex flex-col">
              {/* Icon Container */}
              <div className={`${product.iconBg} dark:bg-slate-800 w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                {product.icon}
              </div>
              
              <div className="flex-grow">
                <h3 className="text-3xl font-bold text-[#0f172a] dark:text-white mb-3">
                  {product.title}
                </h3>
                
                <p className="text-slate-500 text-[15px] leading-relaxed max-w-[390px] dark:text-slate-300">
                  {product.description}
                </p>
              </div>
              
              <div className="mt-8">
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold text-[15px] hover:gap-3 transition-all"
                >
                  Learn more <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    
    <Footer/>
    </div>
  );
};

export default Product;