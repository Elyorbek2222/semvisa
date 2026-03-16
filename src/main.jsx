import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppRu from './AppRu.jsx'

function Root() {
  const [lang, setLang] = useState(() => localStorage.getItem('semvisa_lang') || 'uz')

  const switchToRu = () => {
    localStorage.setItem('semvisa_lang', 'ru')
    setLang('ru')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const switchToUz = () => {
    localStorage.setItem('semvisa_lang', 'uz')
    setLang('uz')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (lang === 'ru') {
    return <AppRu onLangSwitch={switchToUz} />
  }
  return <App onLangSwitch={switchToRu} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
