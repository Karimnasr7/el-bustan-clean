import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TagManager from 'react-gtm-module' 
import './index.css'
import App from './App.tsx'

// 2. إعداد الحاوية بالمعرف الخاص بك
const tagManagerArgs = {
  gtmId: 'GTM-K39QDH6M'
};

// 3. التشغيل
TagManager.initialize(tagManagerArgs);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)