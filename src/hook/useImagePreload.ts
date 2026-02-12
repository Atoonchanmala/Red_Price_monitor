import { useEffect, useState } from 'react';

// Import all images used in the app
import bar from '../assets/Bar.png';
import iconPv from '../assets/pv.png';
import iconKpv from '../assets/kpvlogo.png';
import iconEasyGold from '../assets/easy gold.png';
import jewelly from '../assets/jewelly.png';
import HeaderImage from '../assets/Layer_1 (1).png';
import Watermark from '../assets/watermark.png';

const criticalImages = [
  bar,
  iconPv,
  iconKpv,
  iconEasyGold,
  jewelly,
  HeaderImage,
  Watermark,
];

/**
 * Preload critical images for TV browsers
 * TV browsers can fail to render if images load too slowly
 */
export const useImagePreload = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    let mounted = true;
    let loadedCount = 0;

    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        
        img.onload = () => {
          if (mounted) {
            loadedCount++;
            setLoadProgress((loadedCount / criticalImages.length) * 100);
          }
          resolve();
        };
        
        img.onerror = () => {
          console.warn(`Failed to preload image: ${src}`);
          if (mounted) {
            loadedCount++;
            setLoadProgress((loadedCount / criticalImages.length) * 100);
          }
          resolve(); // Resolve anyway to not block
        };
        
        img.src = src;
      });
    };

    const preloadAllImages = async () => {
      await Promise.all(criticalImages.map(preloadImage));
      
      if (mounted) {
        // Add small delay to ensure TV browser has processed all images
        setTimeout(() => {
          if (mounted) {
            setImagesLoaded(true);
          }
        }, 100);
      }
    };

    preloadAllImages();

    return () => {
      mounted = false;
    };
  }, []);

  return { imagesLoaded, loadProgress };
};
