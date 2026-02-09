import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import ChakraAppProvider from './providers/ChakraProvider'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraAppProvider>
      <App />
    </ChakraAppProvider>
  </StrictMode>,
)