import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import ScrollToTop from './component/ScrollToTop';
import Calculators from './pages/Calculators';
import CalculatorDetailPage from './pages/CalculatorDetailPage';
import CategoryPage from './pages/CategoryPage';
import Products from './component/Products';
import Solutions from './component/Solutions';
import Resources from './component/Resources';
import Pricing from './component/Pricing';


function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  
  useEffect(() => {
    localStorage.setItem('lastPath', location.pathname);
  }, [location.pathname]);


  useEffect(() => {
    const lastPath = localStorage.getItem('lastPath');
    if (lastPath && lastPath !== location.pathname) {
      navigate(lastPath, { replace: true });
    }
  }, []);



  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Calculators />} />
        <Route path="/calculator/:id" element={<CalculatorDetailPage />} />
        <Route path="/product" element={<Products />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
