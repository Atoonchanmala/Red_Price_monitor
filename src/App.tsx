import { useEffect } from 'react';
import './App.css';
import PriceMonitorPage from './view/price-monitor';

const DESIGN_W = 1920;
const DESIGN_H = 1080;

function App() {
  useEffect(() => {
    const root = document.getElementById('root')
    if (!root) return

    const resize = () => {
      const scale = Math.min(
        window.innerWidth / DESIGN_W,
        window.innerHeight / DESIGN_H
      )
      root.style.transform = `scale(${scale})`
      root.style.marginLeft = `${(window.innerWidth - DESIGN_W * scale) / 2}px`;
      root.style.marginTop = `${(window.innerHeight - DESIGN_H * scale) / 2}px`;
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div>
      <PriceMonitorPage />
    </div>
  );
};
export default App;
