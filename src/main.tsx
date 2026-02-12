// Polyfill for structuredClone - required for TV browsers and older browsers
if (typeof structuredClone === 'undefined') {
  (globalThis as typeof globalThis & { structuredClone: <T>(obj: T) => T }).structuredClone = function structuredClone<T>(obj: T): T {
    // Handle primitives and null
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    
    try {
      // For objects and arrays, use JSON serialization
      const serialized = JSON.stringify(obj);
      return serialized ? JSON.parse(serialized) : obj;
    } catch (e) {
      // Fallback: return the original object if serialization fails
      console.warn('structuredClone fallback: unable to clone object', e);
      return obj;
    }
  };
}

// Force Chakra UI style injection for TV browsers
// TV browsers sometimes fail to inject dynamic CSS properly
if (typeof window !== 'undefined') {
  // Ensure emotion style cache is created before React renders
  const styleRoot = document.head || document.getElementsByTagName('head')[0];
  if (styleRoot && !document.getElementById('chakra-ui-inject')) {
    const meta = document.createElement('meta');
    meta.id = 'chakra-ui-inject';
    meta.name = 'chakra-ui-inject';
    styleRoot.insertBefore(meta, styleRoot.firstChild);
  }
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import ChakraAppProvider from './providers/ChakraProvider'
import './index.css'

const isDevelopment = import.meta.env.DEV;

const AppWrapper = isDevelopment ? StrictMode : ({ children }: { children: React.ReactNode }) => <>{children}</>;

createRoot(document.getElementById('root')!).render(
  <AppWrapper>
    <ChakraAppProvider>
      <App />
    </ChakraAppProvider>
  </AppWrapper>,
)