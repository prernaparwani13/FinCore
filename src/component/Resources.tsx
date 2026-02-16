import React from 'react';
import { FileText, Download, PlayCircle, Clock, CheckCircle2, LayoutGrid , MessageCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const Resources: React.FC = () => {
  const articles = [
    { title: "Understanding Compound Interest", tag: "GUIDE", read: "5 min read", date: "Oct 12, 2024", image: "https://image.slidesharecdn.com/powerofcompounding-170303133136/75/Power-of-compounding-1-2048.jpg", link: "https://www.investopedia.com/terms/c/compoundinterest.asp" },
    { title: "How to Pay Off Mortgage Faster", tag: "TIPS", read: "8 min read", date: "Nov 05, 2024", image: "https://rightfinancial.com.au/wp-content/uploads/2018/11/right-pay-off-mortgage-faster-2.jpg", link: "https://moneysmart.gov.au/home-loans/pay-off-your-mortgage-faster" },
    { title: "2024 Tax Bracket Changes", tag: "TAX", read: "10 min read", date: "Dec 01, 2024", image: "https://ppgpartners.net/sites/default/files/2024-01/2024-Tax-Brackets.png", link: "https://www.referencer.in/Income_Tax/Income_Tax_Rates_AY_2025-26.aspx" },
    { title: "ETF vs Mutual Funds: A Comparison", tag: "INVESTING", read: "6 min read", date: "Jan 15, 2025", image: "https://cdn.prod.website-files.com/64b92362210c9c95c3459afc/6849182072adb6f2413f49c6_main%20copy.webp", link: "https://groww.in/blog/what-is-the-difference-between-etf-and-mutual-fund" },
    { title: "How Much Do You Really Need?", tag: "RETIREMENT", read: "12 min read", date: "Feb 20, 2025", image: "https://aarp.widen.net/content/q9stytif0n/png/retirementsavings-chart-02-01.png?crop=true&anchor=0,0&color=ffffffff&u=n1ks7w&w=2048&h=1320", link: "https://www.nism.ac.in/NISM%20Financial%20Calculators/Retirement%20Calc/index.html" },
    { title: "The Snowball Method Explained", tag: "DEBT", read: "4 min read", date: "Mar 10, 2025", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt406qQNfDchXWhVpCM3OqW17ZW4iyO74eAw&s", link: "https://www.investopedia.com/terms/s/snowball.asp" },
  ];

  const assets = [
    { name: "Budget Planner.xlsx", size: "2.4 MB", icon: <FileText className="text-blue-500" /> },
    { name: "Investment Checklist.pdf", size: "1.1 MB", icon: <CheckCircle2 className="text-blue-500" /> },
    { name: "Debt Tracker.xlsx", size: "1.6 MB", icon: <LayoutGrid className="text-blue-500" /> },
  ];

  

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 pb-1 font-sans text-slate-900 dark:text-white">
      <Navbar />
    <div className="min-h-screen bg-slate-100 dark:bg-[#0f172a] transition-colors  duration-300">
      {/* Header */}
      <section className="pt-10 pb-16 text-center px-33px">
        <h1 className="text-6xl font-bold text-[#0f172a] dark:text-white mb-6">Resources</h1>
        <p className="text-slate-500 dark:text-slate-300 text-xl max-w-2xl mx-auto leading-relaxed">
          Expert articles, guides, and tips to help you make smarter financial decisions.
        </p>
      </section>

      {/* Article Grid */}
      <section className="max-w-7xl mx-auto px-14 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art, i) => (
  <a key={i} href={art.link} target="_blank" rel="noopener noreferrer" className="block group cursor-pointer bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] overflow-hidden transition-all hover:shadow hover:shadow-slate-200/50">
    {/* 1. Reduced Aspect Ratio from 4/3 to 16/10 for a shorter image area */}
    <div className="aspect-[16/10] bg-slate-50 dark:bg-slate-800/50 m-3 rounded-[2rem] overflow-hidden transition-transform group-hover:scale-[1.01]">
      <img src={art.image} alt={art.title} className="w-full h-full object-cover object-center" />
    </div>

    {/* 2. Tightened Padding from p-8 to p-6 and reduced bottom margin */}
    <div className="px-7 pb-7 pt-2">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 tracking-[0.2em] uppercase">
          {art.tag}
        </span>
        <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-bold">
          <Clock size={12} /> {art.read}
        </span>
      </div>

      {/* 3. Reduced margin-bottom on title */}
      <h3 className="text-2xl font-bold mb-2 leading-tight transition-colors text-[#0f172a] dark:text-white group-hover:text-blue-600">
        {art.title}
      </h3>

      <p className="text-[10px] font-bold text-slate-300 dark:text-slate-500 uppercase">
        Published on {art.date}
      </p>
    </div>
  </a>
))}
        </div>
      </section>

      {/* Downloadable Assets */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-14 mb-32 -mt-[50px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#0f172a] dark:text-white mb-2 mr-15">Downloadable Assets</h2>
            <p className="text-slate-500 dark:text-slate-300 text-sm">Excel templates and PDF checklists to use offline.</p>
          </div>
          <button className="px-5 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-50 hover:bg-white dark:hover:bg-slate-800 transition-colors">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {assets.map((asset, i) => (
            <div key={i} className="flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                  {asset.icon}
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#0f172a] dark:text-white">{asset.name}</h4>
                  <p className="text-[11px] font-semibold text-slate-400">{asset.size}</p>
                </div>
              </div>
              <Download size={18} className="text-slate-300 dark:text-slate-600 cursor-pointer hover:text-blue-500 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* Webinars Section */}
      <section className="max-w-7xl mx-auto px-14 pb-32 -mt-[60px]">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-[#0f172a] dark:text-white mb-2">Webinars & Tutorials</h2>
          <p className="text-slate-500 dark:text-slate-300 text-sm">Learn directly from our financial experts.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <a href="https://www.youtube.com/watch?v=N6ZR98srOQU" target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden group cursor-pointer">
              <img src="https://media.licdn.com/dms/image/v2/D4E12AQEfKS76FG2umA/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1696809186392?e=2147483647&v=beta&t=QnUqRE3NLXOhQQiOFYLgqyPHkS6KtoiGyYsoiK2yBwE" alt="Mastering Your 401(k)" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div className="absolute bottom-10 left-10 z-20">
                <h3 className="text-2xl font-bold text-white mb-2">Mastering Your 401(k)</h3>
                <p className="text-white/70 text-sm font-medium">Live Workshop • 45 mins</p>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle size={64} className="text-white" />
              </div>
            </div>
          </a>

          <a href="https://www.youtube.com/watch?v=shJd65HpqDg" target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden group cursor-pointer">
              <img src="https://azflatfee.com/wp-content/uploads/2024/02/6-Steps-to-your-first-real-estate-investment.jpg" alt="Real Estate Investing 101" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div className="absolute bottom-10 left-10 z-20">
                <h3 className="text-2xl font-bold text-white mb-2">Real Estate Investing 101</h3>
                <p className="text-white/70 text-sm font-medium">Video Series • 6 Episodes</p>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle size={64} className="text-white" />
              </div>
            </div>
          </a>
        </div>
      </section>
      {/* 4. Newsletter Section */}
{/* 4. Newsletter Section*/}
<section
  className="
    w-full
    bg-white dark:bg-slate-900 py-14"
>
  <div className="px-15 md:px-15">     
    
  
    <div className="w-full bg-blue-50 dark:bg-blue-900/30
        border border-slate-100 dark:border-blue-800
        rounded-[3rem]
        py-12 px-8 md:px-16 
        text-center">

      {/* Icon */}
      <div className="w-14 h-14 bg-white dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <MessageCircle className="text-blue-600" size={26} />
      </div>

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] dark:text-white mb-4">
        Subscribe to our newsletter
        
      </h2>

      {/* Subtext */}
      <p className="text-slate-500 dark:text-slate-400 text-base mb-8 max-w-2xl mx-auto">
        Get the latest financial tips and calculator updates delivered straight to your inbox.
       
      </p>

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="
            flex-grow
            px-6 py-3          
            rounded-2xl
            border border-slate-200 dark:border-slate-700
            bg-white dark:bg-slate-800
            text-slate-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-blue-500/20
          "
        />
        <button
          className="
            bg-blue-600 text-white
            px-8 py-3          
            rounded-2xl
            font-bold
            hover:bg-blue-700
            transition-all
            shadow-lg shadow-blue-500/20
          "
        >
          Subscribe
        </button>
      </div>
    </div>
  </div>
</section>

    </div>

 

    <Footer/>
    </div>
  );
};

export default Resources;