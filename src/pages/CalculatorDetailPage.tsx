import { useParams, useNavigate } from 'react-router-dom';
import CalculatorDetail from '../component/CalculatorDetail';
import { calculatorData } from '../Data/calculatorData';

const CalculatorDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const calc = calculatorData.find(item => item.title === decodeURIComponent(id || ''));

  if (!calc) {
    navigate('/');
    return null;
  }

  const handleBack = () => {
    localStorage.setItem('cameFromDetail', 'true');
    navigate('/');
  };

  return <CalculatorDetail calc={calc} onBack={handleBack} />;
};

export default CalculatorDetailPage;
