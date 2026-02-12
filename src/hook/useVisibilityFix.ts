import { useEffect, useRef } from 'react';

/**
 * Hook to fix TV browser rendering issues by forcing repaints
 * TV browsers sometimes fail to render content until triggered
 */
export const useVisibilityFix = () => {
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (hasTriggered.current) return;
    
    // Force multiple repaints for TV browsers
    const forceRepaint = () => {
      // Force synchronous layout
      void document.body.offsetHeight;
      
      // Trigger repaint using visibility change
      const rootElement = document.getElementById('root');
      if (rootElement) {
        rootElement.style.opacity = '0.9999';
        requestAnimationFrame(() => {
          if (rootElement) {
            rootElement.style.opacity = '1';
            // Force another layout
            void rootElement.offsetHeight;
          }
        });
      }
    };

    // Initial repaint after a short delay
    const timer1 = setTimeout(forceRepaint, 100);
    const timer2 = setTimeout(forceRepaint, 500);
    const timer3 = setTimeout(forceRepaint, 1000);
    
    // Also trigger on visibility change (for when TV wakes from sleep)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        forceRepaint();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    hasTriggered.current = true;
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
};
