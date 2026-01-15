import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Calculators from './pages/Calculators'; 
import Products from './component/Products'; 
import Solutions from './component/Solutions';  
import Resources from './component/Resources';
import Pricing from './component/Pricing';


function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Calculators />} />
        
        {/* URL: /products -> Shows your Product component */}
        <Route path="/products" element={<Products />} />

        <Route path="/Solutions" element={<Solutions />} />
        <Route path="/Resources" element={<Resources />} />
        <Route path="/Pricing" element={<Pricing />} /> 
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;