import { useEffect } from 'react';
import './App.css';
import PriceMonitorPage from './view/price-monitor';
import ErrorBoundary from './components/ErrorBoundary';
import { useVisibilityFix } from './hook/useVisibilityFix';
import { useImagePreload } from './hook/useImagePreload';

const DESIGN_W = 1920;
const DESIGN_H = 1080;

function App() {
  // Fix for TV browser rendering issues
  useVisibilityFix();
  
  // Preload images (non-blocking) for better TV browser performance
  useImagePreload();
  useEffect(() => {
    const root = document.getElementById('root')
    if (!root) return

    // Force hardware acceleration for TV browsers
    root.style.willChange = 'transform';
    root.style.backfaceVisibility = 'hidden';
    root.style.perspective = '1000px';

    const resize = () => {
      const scale = Math.min(
        window.innerWidth / DESIGN_W,
        window.innerHeight / DESIGN_H
      )
      
      // Use requestAnimationFrame for smoother rendering on TVs
      requestAnimationFrame(() => {
        root.style.transform = `scale(${scale})`
        root.style.transformOrigin = 'top left'
        root.style.marginLeft = `${(window.innerWidth - DESIGN_W * scale) / 2}px`;
        root.style.marginTop = `${(window.innerHeight - DESIGN_H * scale) / 2}px`;
        
        // Force reflow to ensure TV browser applies transform
        void root.offsetHeight;
      });
    };

    // Initial render with slight delay for TV browsers
    const initialTimer = setTimeout(() => {
      resize();
    }, 100);
    
    window.addEventListener('resize', resize);
    
    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <ErrorBoundary>
      <div>
        <PriceMonitorPage />
      </div>
    </ErrorBoundary>
  );
};
export default App;
